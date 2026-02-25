import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TiendaService } from '../services/tienda.service';
import { CertificadoModel } from '../models/certificado.model';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  records: (CertificadoModel & { nombre?: string })[] = [];
  filteredRecords: (CertificadoModel & { nombre?: string })[] = [];
  certificadosProximos: (CertificadoModel & { nombre?: string; diasRestantes?: number })[] = [];
  certificadosVencidos: (CertificadoModel & { nombre?: string; diasRestantes?: number })[] = [];
  alertaVisible = true;
  search = '';
  sortType = 'newest';

  private readonly tiendasMap: Map<string, string> = new Map(); // id → nombre

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly dashboardService = inject(DashboardService);
  private readonly tiendaService = inject(TiendaService);

  ngOnInit(): void {
    this.loadData();
  }
  
  exportToCSV(): void {
    const rows = this.filteredRecords.length > 0 ? this.filteredRecords : this.records;

    if (rows.length === 0) {
      alert('No hay registros para exportar');
      return;
    }

    const headers = [
      'Tienda',
      'Tipo',
      'Cantidad',
      'Fecha Emisión',
      'Fecha Vencimiento',
      'Registrado el'
    ];

    const csvRows = rows.map(record => [
      this.toCsvValue(record.nombre || 'Tienda desconocida'),
      this.toCsvValue(record.tipo),
      this.toCsvValue(record.cantidad),
      this.toCsvValue(this.formatDate(record.fechaEmision)),
      this.toCsvValue(this.formatDate(record.fechaVencimiento)),
      this.toCsvValue(this.formatDateTime(record.createdAt))
    ].join(','));

    const csvContent = ['\uFEFF' + headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `certificados_${this.formatFileDate(new Date())}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }
  loadData(): void {
    this.cdr.markForCheck();

    // 1. Cargar todas las tiendas primero (una sola llamada)
    this.tiendaService.getAll().subscribe({
      next: (tiendas) => {
        // Crear mapa rápido id → nombre
        tiendas.forEach(t => {
          this.tiendasMap.set(t.id, t.nombre);
        });

        // 2. Ahora cargar los certificados / records
        this.dashboardService.getRecords().subscribe({
          next: (data: CertificadoModel[]) => {
            // Enriquecer cada record con el nombre de la tienda

            this.records = data.map(record => ({
              ...record,
              nombre: this.tiendasMap.get(record.tiendaId) || 'Tienda desconocida'
            }));
            console.log("RECORDS", this.records)
            this.filteredRecords = [...this.records];
            this.buildAlertas();
            this.applySort();
            this.cdr.markForCheck();
          },
          error: () => {
            alert('No se pudieron cargar los registros');
            this.cdr.markForCheck();
          }
        });
      },
      error: () => {
        alert('No se pudieron cargar las tiendas');
        this.cdr.markForCheck();
      }
    });
  }

  onSearch(query: string): void {
    const q = query.trim().toLowerCase();

    this.filteredRecords = this.records.filter(r =>
      (r.nombre?.toLowerCase().includes(q) || false) ||
      r.tiendaId.toLowerCase().includes(q) ||
      r.tipo.toLowerCase().includes(q)
    );

    this.applySort();
  }

  applySort(): void {
    switch (this.sortType) {
      case 'newest':
        this.filteredRecords.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'oldest':
        this.filteredRecords.sort((a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case 'name':
        this.filteredRecords.sort((a, b) =>
          (a.nombre || '').localeCompare(b.nombre || '')
        );
        break;
      case 'lights':
        this.filteredRecords.sort((a, b) =>
          (Number(b.cantidad) || 0) - (Number(a.cantidad) || 0)
        );
        break;
    }
    this.cdr.markForCheck();
  }


  get totalRecords(): number {
    return this.records.length;
  }

  get totalLights(): number {
    return this.records.filter(t => t.tipo === "LE").reduce((sum, r) => sum + (Number(r.cantidad) || 0), 0);
  }

  get totalDh(): number {
    return this.records.filter(t => t.tipo === "DH").reduce((sum, r) => sum + (Number(r.cantidad) || 0), 0);
  }

  get last24h(): number {
    const limit = Date.now() - 24 * 60 * 60 * 1000;
    return this.records.filter(r =>
      new Date(r.createdAt).getTime() > limit
    ).length;
  }

  isProximoAVencer(certificado: CertificadoModel): boolean {
    const hoy = new Date();
    const vencimiento = new Date(certificado.fechaVencimiento);

    const diferenciaMs = vencimiento.getTime() - hoy.getTime();
    const diasRestantes = diferenciaMs / (1000 * 60 * 60 * 24);

    return diasRestantes <= 30 && diasRestantes > 0;
  }

  isVencido(certificado: CertificadoModel): boolean {
    const hoy = new Date();
    const vencimiento = new Date(certificado.fechaVencimiento);
    return vencimiento.getTime() < hoy.getTime();
  }

  getDiasRestantes(certificado: CertificadoModel): number {
    const hoy = new Date();
    const vencimiento = new Date(certificado.fechaVencimiento);
    const diferenciaMs = vencimiento.getTime() - hoy.getTime();
    return Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
  }

  dismissAlert(): void {
    this.alertaVisible = false;
  }

  private buildAlertas(): void {
    const proximos: (CertificadoModel & { nombre?: string; diasRestantes?: number })[] = [];
    const vencidos: (CertificadoModel & { nombre?: string; diasRestantes?: number })[] = [];

    this.records.forEach(certificado => {
      const diasRestantes = this.getDiasRestantes(certificado);

      if (diasRestantes <= 0) {
        vencidos.push({ ...certificado, diasRestantes });
        return;
      }

      if (diasRestantes <= 30) {
        proximos.push({ ...certificado, diasRestantes });
      }
    });

    this.certificadosProximos = proximos.sort((a, b) => (a.diasRestantes || 0) - (b.diasRestantes || 0));
    this.certificadosVencidos = vencidos.sort((a, b) => (a.diasRestantes || 0) - (b.diasRestantes || 0));
    this.alertaVisible = this.certificadosProximos.length > 0 || this.certificadosVencidos.length > 0;
  }

  private formatDate(value: string | Date | null | undefined): string {
    if (!value) {
      return '';
    }
    const date = new Date(value);
    return isNaN(date.getTime()) ? '' : date.toLocaleDateString('es-PE');
  }

  private formatDateTime(value: string | Date | null | undefined): string {
    if (!value) {
      return '';
    }
    const date = new Date(value);
    return isNaN(date.getTime()) ? '' : date.toLocaleString('es-PE');
  }

  private formatFileDate(value: Date): string {
    const year = value.getFullYear();
    const month = `${value.getMonth() + 1}`.padStart(2, '0');
    const day = `${value.getDate()}`.padStart(2, '0');
    return `${year}${month}${day}`;
  }

  private toCsvValue(value: unknown): string {
    const text = String(value ?? '');
    const escaped = text.replace(/"/g, '""');
    return `"${escaped}"`;
  }
}
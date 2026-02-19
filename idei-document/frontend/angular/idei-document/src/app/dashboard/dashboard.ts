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
  search = '';
  sortType = 'newest';

  private readonly tiendasMap: Map<string, string> = new Map(); // id → nombre

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly dashboardService = inject(DashboardService);
  private readonly tiendaService = inject(TiendaService);

  ngOnInit(): void {
    this.loadData();
  }
  exportToCSV() {
    
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
}
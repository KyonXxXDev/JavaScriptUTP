import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CertificadoModel } from '../models/certificado.model';
import { CertificadoDialog } from './components/certificado-dialog/certificado-dialog';
import { CertificadoService } from '../services/certificado.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-certificado',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './certificado.html',
  styleUrl: './certificado.css',
})
export class Certificado implements OnInit {
  title = "Certificados";

  private readonly certificadoService = inject(CertificadoService);
  private readonly dialog = inject(MatDialog);
  private readonly cdr = inject(ChangeDetectorRef);

  certificados: CertificadoModel[] = [];
  certificadosFiltrados: CertificadoModel[] = [];
  isLoadingResults = false;
  totalItems = 0;

  displayedColumns: string[] = [
    'id', 'tipo', 'tiendaId', 'cantidad', 'fechaEmision', 'estado', 'actions'
  ];

  filterValue = '';

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoadingResults = true;
    this.cdr.markForCheck();

    this.certificadoService.getAll().subscribe({  // Asume que tienes getAll en el service
      next: (data) => {
        this.certificados = data;
        this.certificadosFiltrados = data;
        this.totalItems = data.length;
        this.isLoadingResults = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al cargar certificados:', err);
        this.isLoadingResults = false;
        this.cdr.markForCheck();
      }
    });
  }

  createCertificado() {
    const dialogRef = this.dialog.open(CertificadoDialog, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
        this.cdr.markForCheck();
      }
    });
  }

  editCertificado(certificado: CertificadoModel) {
    const dialogRef = this.dialog.open(CertificadoDialog, {
      width: '600px',
      data: certificado
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
        this.cdr.markForCheck();
      }
    });
  }

  deleteCertificado(certificado: CertificadoModel) {
    if (confirm(`¿Eliminar Certificado ${certificado.tipo} - Cantidad: ${certificado.cantidad}?`)) {
      this.certificadoService.delete(certificado.id).subscribe({
        next: () => {
          this.loadData();
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Error al eliminar certificado:', err);
          alert('No se pudo eliminar el certificado');
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue.trim().toLowerCase();

    this.certificadosFiltrados = this.certificados.filter(c => 
      c.tipo.toLowerCase().includes(this.filterValue) ||
      c.cantidad.toString().includes(this.filterValue) ||
      c.fechaEmision.includes(this.filterValue)
    );
  }
}
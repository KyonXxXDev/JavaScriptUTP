import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CertificadoService } from '../../../services/certificado.service';
import { TiendaService } from '../../../services/tienda.service';
import { TiendaModel } from '../../../models/tienda.model';
import { CertificadoModel } from '../../../models/certificado.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-certificado-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIcon
  ],
  templateUrl: './certificado-dialog.html',
  styleUrl: './certificado-dialog.css',
})
export class CertificadoDialog implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly certificadoService = inject(CertificadoService);
  private readonly tiendaService = inject(TiendaService);

  form: FormGroup;
  isEditMode: boolean = false;

  tiendas: TiendaModel[] = [];
  loadingTiendas = false;

  constructor(
    public dialogRef: MatDialogRef<CertificadoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CertificadoModel | null
  ) {
    this.isEditMode = !!data;

    this.form = this.fb.group({
      tiendaId: [data?.tiendaId || '', Validators.required],
      tipo: [data?.tipo || 'LE', Validators.required],
      cantidad: [data?.cantidad || 1, [Validators.required, Validators.min(1)]],
      fechaEmision: [data?.fechaEmision ? new Date(data.fechaEmision) : new Date(), Validators.required],
      // template se genera automáticamente según tipo
    });
  }

  ngOnInit(): void {
    this.cargarTiendas();
  }

  private cargarTiendas(): void {
    this.loadingTiendas = true;
    this.tiendaService.getAll().subscribe({
      next: (data) => {
        this.tiendas = data;
        this.loadingTiendas = false;
      },
      error: (err) => {
        console.error('Error cargando tiendas:', err);
        this.loadingTiendas = false;
      }
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    // Preparar payload exacto para el endpoint /generar
    const payload = {
      tiendaId: formValue.tiendaId,
      tipo: formValue.tipo,
      cantidad: Number(formValue.cantidad),
      fechaEmision: this.formatDateForBackend(formValue.fechaEmision),
      // template: lo puedes generar aquí o dejar que el backend lo maneje
      // template: formValue.tipo === 'LE' ? './src/template/certificado-le.html' : './src/template/certificado-dh.html'
    };

    this.certificadoService.generar(payload).subscribe({
      next: (certificado) => {
        this.dialogRef.close(true); // éxito → recargar lista
      },
      error: (err) => {
        console.error('Error al generar certificado:', err);
        alert('No se pudo generar el certificado. Intenta nuevamente.');
      }
    });
  }

  // Formato que espera tu backend (ej: "04-02-2026")
  private formatDateForBackend(date: Date): string {
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear();
    return `${d}-${m}-${y}`;
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

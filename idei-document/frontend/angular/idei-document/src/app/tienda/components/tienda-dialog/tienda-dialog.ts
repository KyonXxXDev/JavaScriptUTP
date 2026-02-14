import { ChangeDetectorRef, Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TiendaService } from '../../../services/tienda.service';
import { TiendaModel } from '../../../models/tienda.model';
import { DepartamentoModel, DistritoModel, ProvinciaModel } from '../../../models/ubicacion.model';
import { UbicacionService } from '../../../services/ubicacion.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { finalize } from 'rxjs';
import { AsociacionModel } from '../../../models/asociacion.model';
import { AsociacionService } from '../../../services/asociacion.service';

@Component({
  selector: 'app-tienda-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './tienda-dialog.html',
  styleUrl: './tienda-dialog.css',
})
export class TiendaDialog implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly tiendaService = inject(TiendaService);
  private readonly ubicacionService = inject(UbicacionService);
  private readonly asociacionService = inject(AsociacionService);

  form: FormGroup;
  isEditMode: boolean = false;

  asociaciones: AsociacionModel[] = [];
  departamentos: DepartamentoModel[] = [];
  provincias: ProvinciaModel[] = [];
  distritos: DistritoModel[] = [];

  loadingAsociaciones = false;
  loadingDepartamentos = false;
  loadingProvincias = false;
  loadingDistritos = false;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<TiendaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TiendaModel | null
  ) {
    this.isEditMode = !!data;

    this.form = this.fb.group({
      nombre: [
        data?.nombre || '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(150)],
      ],
      direccion: [
        data?.direccion || '',
        [Validators.required, Validators.maxLength(200)],
      ],
      departamento: [data?.departamento || '', Validators.required],
      provincia: [data?.provincia || '', Validators.required],
      distrito: [data?.distrito || '', Validators.required],
      asociacionId: [data?.asociacionId || '', Validators.required],
      // estado: [data?.estado ?? true],
    });
  }

  ngOnInit(): void {
    this.cargarDepartamentos();
    this.cargarAsociaciones();

    // Si estamos editando, cargar las listas dependientes
    if (this.isEditMode && this.data) {
      this.cargarDatosDependientesAlEditar();
    }
  }

  private cargarDepartamentos(): void {
    this.loadingDepartamentos = true;
    this.cdr.markForCheck();
    this.ubicacionService
      .getDepartamentos()
      .pipe(finalize(() => (this.loadingDepartamentos = false)))
      .subscribe({
        next: (data) => {
          this.departamentos = data;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Error al cargar departamentos', err);
          this.cdr.markForCheck();
          // Aquí podrías mostrar un mensaje al usuario con MatSnackBar
        },
      });
  }

  private cargarAsociaciones(): void {
    this.cdr.markForCheck();
    this.loadingAsociaciones = true;
    this.asociacionService
      .getAll()
      .pipe(finalize(() => (this.loadingAsociaciones = false)))
      .subscribe({
        next: (data) => {
          this.asociaciones = data;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Error al cargar departamentos', err);
          this.cdr.markForCheck();
          // Aquí podrías mostrar un mensaje al usuario con MatSnackBar
        },
      });
  }

  onDepartamentoChange(departamentoId: string): void {
    if (!departamentoId) {
      this.provincias = [];
      this.distritos = [];
      this.form.patchValue({ provincia: '', distrito: '' });
      return;
    }
    this.cdr.markForCheck();
    this.loadingProvincias = true;
    this.form.patchValue({ provincia: '', distrito: '' });
    this.distritos = [];

    this.ubicacionService
      .getProvincias(departamentoId)
      .pipe(finalize(() => (this.loadingProvincias = false)))
      .subscribe({
        next: (data) => {
          this.provincias = data;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Error al cargar provincias', err);
          this.cdr.markForCheck();
        }
      });
  }

  onProvinciaChange(provinciaId: string): void {
    if (!provinciaId) {
      this.distritos = [];
      this.form.patchValue({ distrito: '' });
      return;
    }
    this.cdr.markForCheck();
    this.loadingDistritos = true;
    this.form.patchValue({ distrito: '' });

    this.ubicacionService
      .getDistritos(provinciaId)
      .pipe(finalize(() => (this.loadingDistritos = false)))
      .subscribe({
        next: (data) => {
          this.distritos = data;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Error al cargar distritos', err);
          this.cdr.markForCheck();
        }
      });
  }

  private cargarDatosDependientesAlEditar(): void {

    const departamentoId = this.data?.departamento;
    const provinciaId = this.data?.provincia;

    if (!departamentoId) return;

    this.loadingProvincias = true;

    this.ubicacionService.getProvincias(departamentoId).subscribe({
      next: (provincias) => {
        this.provincias = provincias;
        this.loadingProvincias = false;

        if (provinciaId) {
          this.loadingDistritos = true;

          this.ubicacionService.getDistritos(provinciaId).subscribe({
            next: (distritos) => {
              this.distritos = distritos;
              this.loadingDistritos = false;
              this.cdr.markForCheck();
            }
          });
        }

        this.cdr.markForCheck();
      }
    });
  }


  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const tiendaData: Partial<TiendaModel> = this.form.value;
    this.cdr.markForCheck();
    if (this.isEditMode && this.data?.id) {
      this.tiendaService.update(this.data.id, tiendaData).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => {
          console.error('Error al actualizar tienda:', err);
          this.cdr.markForCheck();
          // Aquí podrías mostrar error al usuario
        },
      });
    } else {
      this.tiendaService.create(tiendaData).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => {
          console.error('Error al crear tienda:', err);
          this.cdr.markForCheck();
          // Aquí podrías mostrar error al usuario
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

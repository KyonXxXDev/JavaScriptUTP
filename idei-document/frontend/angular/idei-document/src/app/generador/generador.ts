import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GeneradorService } from './generador.service';
import { Data } from './models/certificado-data';

@Component({
  selector: 'app-generador',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './generador.html',
  styleUrl: './generador.css',
})
export class Generador implements OnInit {
  private readonly generadorService = inject(GeneradorService);
  visible = false;
  departamentos: any[] = [];
  provincias: any[] = [];
  distritos: any[] = [];

  ngOnInit(): void {
    this.generadorService.getDepartamentos().subscribe({
      next: data => this.departamentos = data,
      error: err => console.error(err)
    });
  }

  onDepartamentoChange(): void {
    const departamentoId = this.generadorForm.get('departamento')?.value;
    this.provincias = [];
    this.distritos = [];
    this.generadorForm.patchValue({
      provincia: '',
      distrito: ''
    });

    if (!departamentoId) return;

    this.generadorService.getProvincias(departamentoId).subscribe({
      next: data => this.provincias = data,
      error: err => console.error(err)
    });
  }

  onProvinciaChange(): void {
    const provinciaId = this.generadorForm.get('provincia')?.value;

    this.distritos = [];
    this.generadorForm.patchValue({ distrito: '' });

    if (!provinciaId) return;

    this.generadorService.getDistritos(provinciaId).subscribe({
      next: data => this.distritos = data,
      error: err => console.error(err)
    });
  }

  generadorForm = new FormGroup({
    cantidad: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    departamento: new FormControl('', Validators.required),
    provincia: new FormControl('', Validators.required),
    distrito: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
  });

  // showFramework() {
  //   this.visible = !this.visible;
  // }

  onCreateSubmit() {
    if (this.generadorForm.invalid) {
      this.generadorForm.markAllAsTouched();
      return;
    }

    const value = this.generadorForm.value;

    const payload: Data = {
      cantidad: Number(value.cantidad),
      nombre: value.nombre ?? '',
      direccion: value.direccion ?? '',
      departamento: value.departamento ?? '',
      provincia: value.provincia ?? '',
      distrito: value.distrito ?? '',
      fecha: this.formatDate(value.fecha ?? '')
    };

    this.generadorService.create(payload).subscribe({
      next: res => console.log('OK:', res),
      error: err => console.error(err)
    });
  }

  private formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  }
}

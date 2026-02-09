import { Component, inject, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AsociacionService } from './services/asociacion.service';
import { AsociacionModel } from './models/asociacion.model';
import { MatDialog } from '@angular/material/dialog';
import { AsociacionDialog } from './components/asociacion-dialog/asociacion-dialog';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-asociacion',
  imports: [RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule, DatePipe],
  templateUrl: './asociacion.html',
  styleUrl: './asociacion.css',
})
export class Asociacion implements OnInit {
  private readonly asociacionService = inject(AsociacionService);

  title = "Asociaciones";
  asociaciones: AsociacionModel[] = [];
  asociacionesFiltradas: AsociacionModel[] = [];
  isLoadingResults = false;
  totalItems = 0;

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.isLoadingResults = true;

    this.asociacionService.getAll().subscribe({
      next: (data) => {
        this.asociaciones = data;
        this.asociacionesFiltradas = data;
        this.totalItems = data.length;
        this.isLoadingResults = false;
      },
      error: () => {
        this.isLoadingResults = false;
      }
    });
  }

  createAsociacion() {
    const dialogRef = this.dialog.open(AsociacionDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.asociacionService.create(result).subscribe(() => {
        this.loadData();
      });
    });
  }

  editAsociacion(row: AsociacionModel) {
    const dialogRef = this.dialog.open(AsociacionDialog, {
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.asociacionService.update(row.id, result).subscribe(() => {
        this.loadData();
      });
    });
  }

  deleteAsociacion(row: AsociacionModel) {
    this.asociacionService.delete(row.id).subscribe(() => {
      this.loadData();
    });
  }

  applyFilter(value: string) {
    const filter = value.trim().toLowerCase();

    this.asociacionesFiltradas = this.asociaciones.filter(a =>
      a.nombre.toLowerCase().includes(filter) ||
      a.nDocumento.includes(filter)
    );
  }
}

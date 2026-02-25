import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TiendaService } from '../services/tienda.service';
import { MatDialog } from '@angular/material/dialog';
import { TiendaDialog } from './components/tienda-dialog/tienda-dialog';
import { TiendaModel } from '../models/tienda.model';

@Component({
  selector: 'app-tienda',
  imports: [RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule],
  templateUrl: './tienda.html',
  styleUrl: './tienda.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Tienda implements AfterViewInit, OnInit {
  title: string = "Tiendas";
  private readonly tiendaService = inject(TiendaService);
  isLoadingResults = false;
  totalItems: number = 0;

  displayedColumns: string[] = ['id', 'nombre', 'direccion', 'distrito', 'provincia', 'departamento', 'estado', 'actions'];

  data: TiendaModel[] = [];
  dataSource = new MatTableDataSource<TiendaModel>(this.data);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly cdr: ChangeDetectorRef, private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
    this.cdr.markForCheck();
  }

  loadData() {
    this.isLoadingResults = true;
    this.cdr.markForCheck();

    this.tiendaService.getAll().subscribe({
      next: (data) => {
        this.data = data;
        this.dataSource.data = data;
        this.totalItems = data.length;
        this.isLoadingResults = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading tiendas:', err);
        this.isLoadingResults = false;
        this.cdr.markForCheck();
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.cdr.markForCheck();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.cdr.markForCheck();  // Marca si el filtro cambia algo visible
  }

  createTienda() {
    console.log('Crear nueva tienda');
    const dialogRef = this.dialog.open(TiendaDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.loadData();
      this.cdr.markForCheck();
    });
  }

  editTienda(row: TiendaModel) {
    console.log('Editar tienda:', row);
    const dialogRef = this.dialog.open(TiendaDialog, {
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.loadData();
      this.cdr.markForCheck();
    });
  }

  deleteTienda(row: TiendaModel) {  // Tipa el parámetro + usa API real
    if (confirm(`¿Eliminar tienda ${row.nombre}?`)) {
      this.tiendaService.delete(row.id).subscribe({
        next: () => {
          this.loadData();
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Error deleting tienda:', err);
        }
      });
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  records: any[] = [];
  filteredRecords: any[] = [];
  search = '';
  sortType = 'newest';
  constructor(private readonly dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(): void {
    this.dashboardService.getRecords().subscribe({
      next: data => {
        this.records = data;
        this.filteredRecords = [...data];
        this.applySort();
      },
      error: () => alert('No se pudieron cargar los registros')
    });
  }
  onSearch(query: string): void {
    const q = query.toLowerCase();

    this.filteredRecords = this.records.filter(r =>
      r.nombre.toLowerCase().includes(q) ||
      r.direccion?.toLowerCase().includes(q)
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
          a.nombre.localeCompare(b.nombre)
        );
        break;
      case 'lights':
        this.filteredRecords.sort((a, b) =>
          Number(b.cantidad) - Number(a.cantidad)
        );
        break;
    }
  }

  get totalRecords(): number {
    return this.records.length;
  }

  get totalLights(): number {
    return this.records.reduce((s, r) => s + Number(r.cantidad || 0), 0);
  }

  get last24h(): number {
    const limit = Date.now() - 86400000;
    return this.records.filter(r =>
      new Date(r.createdAt).getTime() > limit
    ).length;
  }
}

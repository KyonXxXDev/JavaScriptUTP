import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly apiUrl = 'http://localhost:9000';

  constructor(private readonly http: HttpClient) {}

  getRecords(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tienda`);
  }
}
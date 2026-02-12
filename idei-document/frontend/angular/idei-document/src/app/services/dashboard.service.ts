import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";

@Injectable({ providedIn: 'root' })
export class DashboardService extends ApiService {
  private readonly API_URL = this.baseUrl;

  getRecords(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/certificado`);
  }
}
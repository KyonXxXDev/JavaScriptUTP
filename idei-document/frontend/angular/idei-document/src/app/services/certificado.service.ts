import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CertificadoModel } from '../models/certificado.model';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService extends ApiService {

  private readonly API_URL = `${this.baseUrl}/certificado`;

  getAll(): Observable<CertificadoModel[]> {
    return this.http.get<CertificadoModel[]>(`${this.API_URL}`);
  }

  getByTiendaId(id: string): Observable<CertificadoModel> {
    return this.http.get<CertificadoModel>(`${this.API_URL}/${id}`);
  }

  generar(data: Partial<CertificadoModel>): Observable<CertificadoModel> {
    return this.http.post<CertificadoModel>(`${this.API_URL}/generar`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
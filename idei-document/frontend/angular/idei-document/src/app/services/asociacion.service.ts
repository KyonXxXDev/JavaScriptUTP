import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsociacionModel } from '../models/asociacion.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AsociacionService extends ApiService {

  private readonly API_URL = `${this.baseUrl}/asociacion`;

  getAll(): Observable<AsociacionModel[]> {
    return this.http.get<AsociacionModel[]>(`${this.API_URL}`);
  }

  getById(id: string): Observable<AsociacionModel> {
    return this.http.get<AsociacionModel>(`${this.API_URL}/${id}`);
  }

  create(data: Partial<AsociacionModel>): Observable<AsociacionModel> {
    return this.http.post<AsociacionModel>(this.API_URL, data);
  }

  update(id: string, data: Partial<AsociacionModel>): Observable<AsociacionModel> {
    return this.http.put<AsociacionModel>(`${this.API_URL}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
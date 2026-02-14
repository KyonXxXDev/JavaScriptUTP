import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DepartamentoModel, DistritoModel, ProvinciaModel } from '../models/ubicacion.model';

@Injectable({
    providedIn: 'root'
})
export class UbicacionService {
    private readonly API_URL = 'http://localhost:9000/ubicacion';
    constructor(private readonly http: HttpClient) { }
    getDepartamentos(): Observable<DepartamentoModel[]> {
        return this.http.get<DepartamentoModel[]>(`${this.API_URL}/departamentos`);
    }

    getProvincias(departamentoId: string): Observable<ProvinciaModel[]> {
        return this.http.get<ProvinciaModel[]>(`${this.API_URL}/departamentos/${departamentoId}/provincias`);
    }

    getDistritos(provinciaId: string): Observable<DistritoModel[]> {
        return this.http.get<DistritoModel[]>(`${this.API_URL}/provincias/${provinciaId}/distritos`);
    }
}
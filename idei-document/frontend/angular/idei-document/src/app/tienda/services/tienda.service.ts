import { Injectable } from "@angular/core";
import { TiendaModel } from "../models/tienda.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class TiendaService {
    private readonly API_URL = 'http://localhost:9000/tienda';
    constructor(private readonly http: HttpClient) { }
    getAll(): Observable<TiendaModel[]> {
        return this.http.get<TiendaModel[]>(`${this.API_URL}`);
    }

    getById(id: string): Observable<TiendaModel> {
        return this.http.get<TiendaModel>(`${this.API_URL}/${id}`);
    }

    create(data: Partial<TiendaModel>): Observable<TiendaModel> {
        return this.http.post<TiendaModel>(this.API_URL, data);
    }

    update(id: string, data: Partial<TiendaModel>): Observable<TiendaModel> {
        return this.http.put<TiendaModel>(`${this.API_URL}/${id}`, data);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
}
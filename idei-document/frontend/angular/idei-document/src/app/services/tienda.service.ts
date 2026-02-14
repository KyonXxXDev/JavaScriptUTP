import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { TiendaModel } from "../models/tienda.model";

@Injectable({
    providedIn: 'root'
})

export class TiendaService {
    private readonly API_URL = 'http://localhost:9000/tienda';
    httpOptions;
    constructor(private readonly http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/json'
                }
            )
        }
    }
    getAll(): Observable<TiendaModel[]> {
        return this.http.get<TiendaModel[]>(`${this.API_URL}`);
    }

    getById(id: string): Observable<TiendaModel> {
        return this.http.get<TiendaModel>(`${this.API_URL}/${id}`);
    }

    create(data: Partial<TiendaModel>): Observable<TiendaModel> {
        return this.http.post<TiendaModel>(this.API_URL, data, this.httpOptions);
    }

    update(id: string, data: Partial<TiendaModel>): Observable<TiendaModel> {
        return this.http.put<TiendaModel>(`${this.API_URL}/${id}`, data, this.httpOptions);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
}
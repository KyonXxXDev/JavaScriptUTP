import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from './models/certificado-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class GeneradorService {
  apiUrl = "http://localhost:9000/tienda";
  apiUrlDPD = "http://localhost:9000";
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


  create(certificado: Data): Observable<Data> {
    return this.http.post<Data>(this.apiUrl, certificado, this.httpOptions);
  }

  /** GET departamentos */
  getDepartamentos(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrlDPD}/ubicacion/departamentos`
    );
  }

  /** GET provincias por departamento */
  getProvincias(departamentoId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrlDPD}/ubicacion/departamentos/${departamentoId}/provincias`
    );
  }

  /** GET distritos por provincia */
  getDistritos(provinciaId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrlDPD}/ubicacion/provincias/${provinciaId}/distritos`
    );
  }

}
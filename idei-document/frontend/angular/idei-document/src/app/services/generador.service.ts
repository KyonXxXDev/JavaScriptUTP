import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CertificadoModel } from '../models/certificado.model';

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


  create(certificado: CertificadoModel): Observable<CertificadoModel> {
    return this.http.post<CertificadoModel>(this.apiUrl, certificado, this.httpOptions);
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
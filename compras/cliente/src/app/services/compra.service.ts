import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compra } from '../models/compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  url = 'http://localhost:4001/api/compras/';

  constructor(private http: HttpClient) { }

getCompras(): Observable<any>{
    return this.http.get(this.url);
  }

eliminarCompra(id: string): Observable<any> {
  return this.http.delete(this.url + id);
}

guardarCompra(compra: Compra): Observable<any> {
  return this.http.post(this.url, compra);
}

obtenerCompra(id: string): Observable<any> {
  return this.http.get(this.url + id);
}

editarCompra(id: string, compra: Compra): Observable<any> {
  return this.http.put(this.url + id, compra);
}

}

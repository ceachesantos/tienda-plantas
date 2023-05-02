import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'http://localhost:4002/api/usuarios/';

  constructor(private http: HttpClient) { }

getUsuarios(): Observable<any>{
    return this.http.get(this.url);
  }

eliminarUsuario(id: string): Observable<any> {
  return this.http.delete(this.url + id);
}

guardarUsuario(usuario: Usuario): Observable<any> {
  return this.http.post(this.url, usuario);
}

obtenerUsuario(id: string): Observable<any> {
  return this.http.get(this.url + id);
}

editarUsuario(id: string, usuario: Usuario): Observable<any> {
  return this.http.put(this.url + id, usuario);
}

}

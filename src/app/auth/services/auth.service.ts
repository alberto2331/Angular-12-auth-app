import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';//no importar el de produccion
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string= environment.baseUrl;
  private _usuario!: Usuario
  get usuario(){
    return {...this._usuario}
    /*las {... } evitan de que mi usuario sea
    accidentalmente manipulado en otra parte de mi app.
    Usar el get me permite mas seguridad y una mejor detección de cambios*/
  }
  constructor( private http:HttpClient) { }

  login(email:string, password:string){
    const http = `${this.baseUrl}/auth`; //Este es el endpoint para el login, con el "/auth"
    const body = {email, password};

    return this.http.post<AuthResponse>(http, body)
        .pipe(
          tap(respuesta => {
           if(respuesta.ok){
             localStorage.setItem('token',respuesta.token!)
           }}),    
          map(respuesta => respuesta.ok), 
          catchError(err => of(err.error.mensaje)) //Cambie el booleano por el error entero
        )
  }
  validarToken():Observable<boolean>{
    const url = `${this.baseUrl}/auth/renew`; //Este es el endpoint para el "Renovar token", con el "/auth/renew"
    const cabeceras = new HttpHeaders()
        .set('x-token', localStorage.getItem('token') || 'no hay nada en el local storage con ese token')
    return this.http.get<AuthResponse>(url , {headers: cabeceras})
        .pipe(
          map(resp=>{
            //La siguiente linea es para persistir en el localStorage cada vez que validamos el token:
            localStorage.setItem('token',resp.token!)
            //Las siguientes linea es para obtener la info del usuario en "_usuario":
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!,
              email: resp.email!// esto se implementó para que se guarde el email en el usuario
            }
            return resp.ok;
          }),
          catchError(err => of(false))
        )}

logout(){
  //localStorage.removeItem('token');//Con esto solo borro ese token del local
  localStorage.clear();//Borra todo lo que hay en el localStorage        
}

registro(name:string,email:string,password:string){
  const http = `${this.baseUrl}/auth/new`; //Este es el endpoint para el registro, con el "/auth/new"
  //Recordemos que "auth/new" es el url de nuestro back 
  const body = {name , email , password};
  return this.http.post<AuthResponse>(http, body)
        .pipe(
          tap(({ ok, token })=> { //descompuso o desestructuró la respuesta en "ok" y en token
           if(ok){
             localStorage.setItem('token',token!);
           }
          }),    
          map(respuesta => respuesta.ok), 
          catchError(err => of(err.error.mensaje)) //Cambie el booleano por el error entero
        )
}

}



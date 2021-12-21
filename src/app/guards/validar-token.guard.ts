import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad  {
  //
  constructor(private aS:AuthService,
              private ruta:Router
    ){}

  canActivate(): Observable<boolean> | boolean {
    console.log('canActivate');
    return this.aS.validarToken()
        .pipe(
          tap( valido =>{
            if(!valido){
              console.log('can´t Activate');
              this.ruta.navigateByUrl('/auth');
            }
          }));
  }
  canLoad(): Observable<boolean> | boolean {
    console.log('canLoad');
    return this.aS.validarToken()
        .pipe(
          tap( valido =>{
            if(!valido){
              console.log('can´t Load');
              this.ruta.navigateByUrl('/auth');
            }
          }));
  }
}

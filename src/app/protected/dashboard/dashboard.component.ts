import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  `*{margin:15px;}`
  ]
})
export class DashboardComponent {

  constructor( private router: Router,
               private aS:AuthService ) { }

  
  logout(){
    this.router.navigateByUrl('/auth')
    this.aS.logout();
  }

  get usuario(){ 
    //Con esto voy a obtener la info del usuario desde mi service.
    return this.aS.usuario;
  }
}

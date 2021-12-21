import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    //colocaremos los mismos nombres que espera mi app-server:  "email", "password":
    email:['test1@gmail.com',[Validators.required, Validators.email]],
    password:['123456',[Validators.required, Validators.minLength(6)]], 
    //como podemos ver el minLength coincide con el del back, ambos son de 6 digitos
  });
  constructor(private fb: FormBuilder,
             private route:Router,
             private authService: AuthService//para usar los metodos del servicio
             ) { }
  
  login(){
    console.log(this.miFormulario.value);
    const {email, password}=this.miFormulario.value; //-->por medio de la desestructuracion obtenemos "name" y "password"
    this.authService.login(email, password)
        .subscribe(ok=>{
          console.log(ok)
          if(ok === true){
           this.route.navigateByUrl('/dashboard')//si la respuesta es verdad entonces puedo navegar a dashboard sino NO.
          }else{
            console.log(ok)
            Swal.fire('Error Pa', ok, 'error')
          }
        });    
  }
}

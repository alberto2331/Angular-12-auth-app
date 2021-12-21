import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})

export class RegisterComponent {

  miFormularioRegistro: FormGroup = this.fb.group({
    //colocaremos los mismos nombres que espera mi app-server: "name", "email", "password":
    name:['Alberto Saiz Guidarelli',[Validators.required]],
    email:['saizguidarelli@gmail.com',[Validators.required, Validators.email]],
    password:['123456',[Validators.required, Validators.minLength(6)]], 
    //como podemos ver el minLength coincide con el del back, ambos son de 6 digitos
  });
  constructor(private fb: FormBuilder,
              private route:Router,
              private aS: AuthService) { }
  
  registro(){
    console.log(this.miFormularioRegistro.value);    
    const{ name , email , password } = this.miFormularioRegistro.value;
    this.aS.registro(name , email , password)
    .subscribe(ok=>{
      if(ok === true){
        console.log(ok)
        this.route.navigateByUrl('/dashboard');//si la respuesta es verdad entonces puedo navegar a dashboard sino NO.
      }else{        
        Swal.fire('Error viejo', ok, 'error')
      }
    });    
  }
}

import { Component, OnInit, VERSION } from '@angular/core';
import { ObjectUnsubscribedError } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {

  constructor(private autservice:AuthService){}
  title = 'PROYECTO COVID';
  mostrar_login = true
  hide_errors = true
  hide_errors_sign = true
  hide_user = true
  error = ''
  user = ''

  model = {email:'',password1:'',password2:''}
  model_login = {email:'', password:''}
  formulario

  checkPassword()
  {
    return this.model.password1 === this.model.password2
  }

  private loginCorrecto(token)
  {
    this.mostrar_login = false
    this.autservice.setLogin(true)
    if (token['token'] != undefined)
      localStorage.setItem('token',token['token'])
    let pos_at = this.model_login.email.indexOf('@')
    this.user = this.model_login.email.substr(0, pos_at)
    this.hide_user = false
  }

  onSubmit(signupform)
  {
    this.autservice.signup(this.model.email, this.model.password1).subscribe((token:Object)=>{
      if (Object.keys(token).indexOf('error') < 0) this.loginCorrecto(token)


      else {
        this.hide_errors = false
        this.error = token['error']
        this.formulario = signupform
        this.formulario.reset()
      }


    })
  }

  onDissmis(event){
    console.log('dismisando')
    this.hide_errors = true
    this.formulario.reset()
    console.log(event)
  }



  onLoginSubmit(loginForm)
  {
    console.log(loginForm)
    this.autservice.login(this.model_login.email, this.model_login.password).subscribe((token:Object)=>{
      if(Object.keys(token).indexOf('error') < 0) this.loginCorrecto(token)
      else {
        this.hide_errors = false
        this.error = token['error']
        console.log(token['error'])
        if (Object.keys(this.error).indexOf('auth') >= 0) this.error = "Usuario/Contraseña incorrectos"
        this.formulario = loginForm
      }


    })
  }

  logout()
  {    
      this.autservice.logout().subscribe(()=>{
      localStorage.removeItem('token')
      this.model_login = {email:'',password:''}
      this.autservice.setLogin(false)
      this.user = ''
      this.mostrar_login = true
    })
    
  }

  ngOnInit()
  {
    let token = localStorage.getItem('token')
    if (token == undefined || token == '') this.autservice.setLogin(false)
    else this.autservice.me(token).subscribe((data)=>{
      console.log(data)
      this.model_login.email = data['email']
      this.loginCorrecto(token)
    })
  }


}
    
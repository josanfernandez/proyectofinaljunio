import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {catchError} from 'rxjs/operators'
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url_base = 'https://userapijunio.herokuapp.com/api/auth'
  is_loged = false
  subject = new Subject<any>()
  
  constructor(private http:HttpClient) { }

  login(email:String, password:String)
  {
    const url = this.url_base+'/login'
    let data = {email:email, password:password}
    return this.http.post(url,data).pipe(
      catchError(this.handleError("login", data))
    )

  }

  logout()
  {
    return this.http.get(this.url_base+'/logout')
  }

  public setLogin(status)  
  {
    this.is_loged = status
    this.sendMessage()
  }

  signup(email:String, password:String)
  {
    const url = this.url_base+'/signup'
    let data = {email:email, password:password}
    console.log(data)
    return this.http.post(url, data).pipe(
      catchError(this.handleError('signup', data))
    )
   
  }

  me(token:string)
  {
    const url = this.url_base+'/me'

    const headers = new HttpHeaders().set('x-access-token',token)
    return this.http.get(url,{'headers':headers})
  }

  sendMessage()
  {
    this.subject.next({is_loged:this.is_loged})
  }

  getMessage()
  {
    return this.subject.asObservable()
  }

  

  private handleError<T>(operation="operation", result?:T)
  {
      return (error:any):Observable<T> => {
        console.error(error.error)
        let dict_error:Object = {'error':error.error}
        return of(dict_error as T)
        
      }

  }

}

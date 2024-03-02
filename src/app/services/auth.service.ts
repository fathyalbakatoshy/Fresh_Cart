import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient:HttpClient, private _router:Router) {

    if(localStorage.getItem('token')) {
      this.userToken.next(JSON.stringify(localStorage.getItem("token")))
    }

    window.addEventListener("storage", (e) => {
      const newToken : any = e.newValue
      this.userToken.next(newToken)
    })
  }

  userToken : BehaviorSubject<string> = new BehaviorSubject('')


  setToken(token: string) {
    localStorage.setItem("token", token);
    this.userToken.next(token);
  }


  signUp(data : FormGroup) :Observable<any> {
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data)
  }

  signIn(data : FormGroup) :Observable<any> {
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data)
  }

  signOut() {
    localStorage.removeItem('token')
    this.userToken.next('')
    this._router.navigate(['/login'])
  }


  forgetEmail(data : FormGroup) :Observable<any> {
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', data)
  }


  verifyCode(data: FormGroup):Observable<any> {
    return this._httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", data)
  }


  resetPassword(data: FormGroup):Observable<any> {
    return this._httpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', data)
  }

  newPassword(data: FormGroup) :Observable<any> {
    return this._httpClient.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, data)
  }

  getProfileUser(id: string) :Observable<any> {
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/users/${id}`)
  }

  updataProfile(data: FormGroup) :Observable<any> {
    return this._httpClient.put(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`, data)
  }

}

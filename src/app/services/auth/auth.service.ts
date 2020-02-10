import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token;
  isAuth = new EventEmitter();
  user;
  loginLoad = new EventEmitter();
  constructor(private http: HttpClient, private snackbar: MatSnackBar, private router: Router) { }

  createUser(data) {
    return this.http.post(environment.API_URL+"/api/users/signup", data)
  }



  loginUser(data) {
    this.loginLoad.emit(true)
    return this.http.post(environment.API_URL+"/api/users/login", data).subscribe((data: any) => {
      console.log(data)
      this.user = data
      const expiresIn = data.expiresIn
      console.log(expiresIn)
      setTimeout(() => {
        this.logout()
      }, expiresIn * 1000)
      this.token = data.token
      const now = new Date().getTime();
      const expireIn = new Date(now + expiresIn * 1000)
      console.log(expireIn)
      this.saveAuthData(this.token, expireIn, this.user)
      this.isAuth.emit(true)
      this.loginLoad.emit(false)
      this.router.navigate(['/'])
    }, error => {
      console.log(error)
      this.loginLoad.emit(false)
      this.snackbar.open(error.error.message, 'Ok', {
        duration: 3000
      });
    })
  }

  isAuthenticated() {
    console.log(this.token)
    return this.token != null
  }

  // getUser(){
  //   return this.user
  // }

  autoAuthUser() {
    console.log('Auto Auth')
    const token = localStorage.getItem('token')
    const expiresIn = localStorage.getItem('expiresIn')
    const user = localStorage.getItem('userData')
    const now = new Date()
    console.log(token)
    if (expiresIn > now.toString()) {
      this.token = token
      this.user = JSON.parse(user)
      this.isAuth.emit(true)
    }
  }

  logout() {
    this.token = null
    this.isAuth.emit(false)
    this.clearAuthData()
    this.router.navigate(['/login'])
  }


  saveAuthData(token, expiresIn, user) {
    delete user.user.password
    delete user.token
    delete user.expiresIn
    localStorage.setItem('token', token)
    localStorage.setItem('expiresIn', expiresIn)
    localStorage.setItem('userData', JSON.stringify(user))
  }

  clearAuthData() {
    localStorage.removeItem('token')
    localStorage.removeItem('expiresIn')
    localStorage.removeItem('userData')
  }

}

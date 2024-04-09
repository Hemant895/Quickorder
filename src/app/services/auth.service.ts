import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient , private router:Router) { }
  
  singupApi(data:any){
    return this.httpClient.post("https://quickorder-backend.vercel.app/user/signUp" ,data)
  }
  loginApi(data:any){
    return this.httpClient.post("https://quickorder-backend.vercel.app/user/login" ,data)
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.router.navigate(['/'])
}
}

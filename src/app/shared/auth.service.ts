import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Account } from '../account/account';
import { JwtToken } from './jwt-token';

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   private baseUrl: string = "http://localhost:3000/api";

   constructor(private router: Router, public http: HttpClient) { }

   //LOGIN
   //S'enregistrer
   public addNewUser(user: Account): Observable<HttpResponse<Account[]>> {
      return this.http.post<Account[]>(`${this.baseUrl}/users`, user, { observe: 'response' });
   }
   //Se connecter
   public sendUserToCompare(user: Account): Observable<HttpResponse<JwtToken>> {
      return this.http.post<JwtToken>(`${this.baseUrl}/users/login`, user,{ observe: 'response' });
   }

   sendToken(token: string) {
      localStorage.setItem("LoggedInUser", token)
   }
   getToken() {
      return localStorage.getItem("LoggedInUser")
   }
   isLoggedIn() {
      return this.getToken() !== null;
   }
   logout() {
      localStorage.removeItem("LoggedInUser");
      this.router.navigate(["login"]);
   }
   
}

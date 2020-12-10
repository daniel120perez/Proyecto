import { Injectable } from '@angular/core';
import { Account } from '../models/Account';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private conn: HttpClient) { }

  /*Account Management*/
  private Key: any;
  private account: Account;



  private API = 'http://127.0.0.1:8000/api/v1/auth';


  LoginReq(user: Account): Observable<any> {
    try {
      return this.conn.post('http://localhost:8000/api/v1/auth/login/', user).pipe(tap(
        (res: any) => {
          if (res) {
            this.encriptar(user);
            localStorage.setItem('Account_Private_Key', res.key);
            localStorage.setItem('User_Private_Account', JSON.stringify(user));
            this.Key = res.key;
            this.account = user;
          }
        })
      );
    } catch (error) {

    }
  }

  RegisterRequest(user: Account): Observable<any> {
    try {
      return this.conn.post('http://localhost:8000/api/v1/auth/register/', user).pipe(tap(
        (res: any) => {
          if (res) {
            this.encriptar(user);
            localStorage.setItem('Account_Private_Key', res.key);
            localStorage.setItem('User_Private_Account', JSON.stringify(user));
            this.Key = res.key;
            this.account = user;
          }
        })
      );
    } catch (error) {

    }
  }

  LogoutRequest() { 
    this.Key = '';
    this.account = null;
    localStorage.removeItem("Account_Private_Key");
    localStorage.removeItem("User_Private_Account");
    return this.conn.post('http://localhost:8000/api/v1/auth/logout/',{})
  }

  encriptar(user: Account) {
    //Apply HashJS Method
    user.password1 = '••••••••••••';
    user.password2 = '••••••••••••';
  }

}

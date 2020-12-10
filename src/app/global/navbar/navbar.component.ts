import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { Account } from '../../models/Account';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService],
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  Key:any;
  account:Account;
  user:boolean;

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    let token = localStorage.getItem('Account_Private_Key');
    let user = JSON.parse(localStorage.getItem('User_Private_Account'));
    if (user && token) {
      this.account = user;
      this.Key = token;
      this.user = true;
    }
  }

  async handleLogOut() {
    try {
      let Response = await this.auth.LogoutRequest().subscribe();
      this.user = false;
      await this.router.navigate(['/home']);
    } catch (error) {
    }
  }


}

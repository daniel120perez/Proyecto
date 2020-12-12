import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../../models/Account'
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {

  newAcc: Account;
  Acc: Account;

  FormularioLogin = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private auth:AuthService ,private router: Router) { }


  ngOnInit(): void {
  }

  async handleLogin() {
    try {
      this.Acc = {} = await this.FormularioLogin.value;
      this.Acc.password2 = this.Acc.password1; 
      let a = this.auth.LoginReq(this.Acc).subscribe(async data => {
        await this.router.navigate(['/home']);
        await window.location.reload();
      });
    } catch (error) {
    }
  }

  async handleLoginGoogle(){
    this.auth.LoginReqGoogle().subscribe(data =>{
      console.log('Component Data : ',data);
    });
  }

}

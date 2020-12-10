import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/Account';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {


  newAcc: Account;
  Acc: Account;

  CuentaRegistro = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password1: new FormControl(''),
    password2: new FormControl(''),
  })

  constructor(private auth: AuthService,  private router: Router) { }

  ngOnInit(): void {
  }

  async handleRegister() {
    try {
      this.newAcc = {} = await this.CuentaRegistro.value;
      let a = this.auth.RegisterRequest(this.newAcc).subscribe(async data =>{
        await this.router.navigate(['/home']);
      });
    } catch (error) {
    }
  }

}

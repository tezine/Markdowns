import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Defines} from '../../codes/defines';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email?:string;
  password?:string;
  errorMsg?:string;
  @ViewChild('errorDiv') errorDiv?: HTMLDivElement;

  constructor(protected router: Router) { }

  ngOnInit(): void {}

  async onBtnLoginClicked():Promise<void>{
    //if(!await this.authenticateUser()) return;
    await this.router.navigate(['home/dashboard']);
  }

  // async authenticateUser():Promise<boolean>{
  //   // this.errorMsg=undefined;
  //   // let ok=await this.usersService.authenticate(this.email,this.password);
  //   // if(ok)return true;;
  //   // this.errorMsg = 'Email ou senha inválidos';
  //   // return false;
  // }

}

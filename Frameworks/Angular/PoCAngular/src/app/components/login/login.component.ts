import {Component, OnInit, ViewChild} from '@angular/core';
import {Defines} from '../../codes/defines';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';

@Component({
  selector: Defines.routeLogin,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email?:string;
  password?:string;
  errorMsg?:string;
  @ViewChild('errorDiv') errorDiv?: HTMLDivElement;

  constructor(protected router: Router, private usersService:UsersService) { }

  ngOnInit(): void {}

  async onBtnLoginClicked():Promise<void>{
    if(!await this.authenticateUser()) return;
    else await this.router.navigate([Defines.routeUsers]);
  }

  async authenticateUser():Promise<boolean>{
    this.errorMsg=undefined;
    let ok=await this.usersService.authenticate(this.email,this.password);
    if(ok)return true;;
    this.errorMsg = 'Email ou senha inválidos';
    return false;
  }
}

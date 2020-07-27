import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Defines} from '../../codes/Defines';
import {ClientesService, ECliente} from '../../../../../users-api';

@Component({
  selector: 'lib-clientes',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  clientes?:ECliente[];

  constructor(private clientesService:ClientesService,protected router: Router, private activatedRoute: ActivatedRoute) {
  }

  async ngOnInit() {
    this.clientes= await this.clientesService.getAll("1",100).toPromise();
  }

  async onBtnEditClicked(eCliente:ECliente){
    await this.router.navigate(['edit'],{relativeTo: this.activatedRoute});
  }

}

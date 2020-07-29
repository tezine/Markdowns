import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Defines} from '../../codes/Defines';
import {MyLibService} from '../../services/my-lib.service';
import {EBozo} from '../../entities/EBozo';

@Component({
  selector: 'lib-clientes',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  employees?:EBozo[];
  displayedColumns: string[] = ['id', 'employee_name'];

  constructor(private employeesService:MyLibService, protected router: Router, private activatedRoute: ActivatedRoute) {
  }

  async ngOnInit() {
    this.employees= await this.employeesService.getEmployees();
  }

  async onBtnEditClicked(eCliente:any){
    await this.router.navigate(['edit'],{relativeTo: this.activatedRoute});
  }

}

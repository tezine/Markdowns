import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Defines} from '../../codes/Defines';
import {MyLibService} from '../../services/my-lib.service';
import {EEmployee} from '../../entities/EEmployee';

@Component({
  selector: 'lib-clientes',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  employees?:EEmployee[];
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

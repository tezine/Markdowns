import { Component, OnInit } from '@angular/core';
import {GlobalsService} from '../../codes/globals.service';
import {EmployeesService} from 'users-lib/src/lib/services/employees.service';
import {EEmployee} from 'users-lib/src/lib/entities/EEmployee';
import {LoggerService} from "../../services/logger.service";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  employees:EEmployee[]=[];

  constructor(public globals:GlobalsService, protected  employeesService:EmployeesService, private loggerService:LoggerService) { }

  async ngOnInit() {
    this.loggerService.logDebug(this,'hello from service');
    this.employees= await this.employeesService.getEmployees();
  }

}

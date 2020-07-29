import { Component, OnInit } from '@angular/core';
import {GlobalsService} from '../../codes/globals.service';
import {LoggerService} from "../../services/logger.service";
import {EmployeesService} from "../../services/employees.service";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  employees:any[]=[];

  constructor(public globals:GlobalsService, protected  employeesService:EmployeesService, private loggerService:LoggerService) { }

  async ngOnInit() {
    this.loggerService.logDebug(this,'hello from service');
    this.employees= await this.employeesService.getEmployees();
  }

}

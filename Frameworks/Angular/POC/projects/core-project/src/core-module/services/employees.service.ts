import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private httpClient:HttpClient) { }

  public async getEmployees(): Promise<any[]>{
    let result=await this.httpClient.get<any>('http://dummy.restapiexample.com/api/v1/employees').toPromise();
    return result.data;
  }
}

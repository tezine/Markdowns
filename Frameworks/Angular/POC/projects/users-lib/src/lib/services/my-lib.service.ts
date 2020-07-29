import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EBozo} from '../entities/EBozo';

@Injectable({
  providedIn: 'root'
})
export class MyLibService {

  constructor(private httpClient:HttpClient) { }

  public async getEmployees(): Promise<EBozo[]>{
    let result=await this.httpClient.get<any>('http://dummy.restapiexample.com/api/v1/employees').toPromise();
    return result.data;
  }
}

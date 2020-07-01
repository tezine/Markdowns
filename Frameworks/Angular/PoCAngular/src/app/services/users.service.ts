import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Defines} from '../codes/defines';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpclient:HttpClient) { }

  async authenticate(email?:string, password?:string):Promise<boolean>{
      if(!email || !password) return false;
     let result=await this.httpclient.get<any>(Defines.mockAPIBaseUrl).toPromise();
     //console.log('result:',result);
     return true;
  }
}

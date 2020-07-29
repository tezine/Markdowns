import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  logDebug(caller:object, content:any){
    console.log('('+caller.constructor.name+')'+ content);
  }

  logWarn(caller:object, content:any){
    console.warn('('+caller.constructor.name+')'+ content);
  }

  lodError(caller:object, content:any){
    console.error('('+caller.constructor.name+')'+ content);
  }
}

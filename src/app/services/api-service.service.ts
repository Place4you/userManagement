import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Constant } from '../core/Constant';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  http = inject(HttpClient);


  createUser(url:string,data:any){
    return this.http.post(`${Constant.API_URL}` +url, data);

  }

  loginUser(url:string,data:{emailId:any, Password:any}){
    return this.http.post(`${Constant.API_URL}` +url, data);
  }

  getallapi(getdept:any){

    return this.http.get(getdept);
  }

  
}

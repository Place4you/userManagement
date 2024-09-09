import { IUser } from './../core/Interface/IUsers';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Constant } from '../core/Constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  http = inject(HttpClient);


  createUser(url:string,data:any){
    return this.http.post(`${Constant.API_URL}` +url, data);

  }

  addUser(url:string,data:any){
    return this.http.post(`${Constant.ADD_USER}` +url, data);

  }

  upadteUser(url:string,data:any){
    return this.http.post(`${Constant.UPDATE_USER}` +url, data);

  }

  loginUser(url:string,data:{emailId:any, Password:any}){
    return this.http.post(`${Constant.API_URL}` +url, data);
  }

  getallapi(url: string): Observable<{ data: IUser[] }> {
    return this.http.get<{ data: IUser[] }>(url);
  }
  
  
}

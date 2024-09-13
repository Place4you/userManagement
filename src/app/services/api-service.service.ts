import { IVideo } from './../core/Interface/IVideo';
import { IUser } from './../core/Interface/IUsers';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Constant } from '../core/Constant';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ILoginResponse } from '../core/Interface/ILoginResponse';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  http = inject(HttpClient);

  // User API
  createUser(url: string, data: any) {
    return this.http.post(`${Constant.API_URL}` + url, data);
  }

  addUser(url: string, data: any) {
    return this.http.post(`${Constant.ADD_USER}` + url, data);
  }

  updateUser(url: string, data: any) {
    return this.http.post(`${Constant.UPDATE_USER}` + url, data);
  }

  loginUser(data: { userName: string; password: string }): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${Constant.LOGIN_URL}`, data);
  }

  // Get all users, with caching in localStorage
  getallapi(url: string): Observable<{ data: IUser[] }> {
    const cachedUserData = localStorage.getItem('userData'); // Check for cached data in localStorage
    
    if (cachedUserData) {
      // If data is found in localStorage, return it
      return new Observable(observer => {
        const userData = JSON.parse(cachedUserData); // Parse the cached data
        observer.next({ data: userData });
        observer.complete();
      });
    } else {
      // No data in localStorage, fetch from API
      return this.http.get<{ data: IUser[] }>(url).pipe(
        tap(response => {
          localStorage.setItem('userData', JSON.stringify(response.data)); // Cache API response in localStorage
        })
      );
    }
  }

  // Video API - Same logic as getallapi, but for videos
  getallvideos(url: string): Observable<{ data: IVideo[] }> {
    const cachedVideoData = localStorage.getItem('videoData'); // Check for cached video data
    
    if (cachedVideoData) {
      // If data is found in localStorage, return it
      return new Observable(observer => {
        const videoData = JSON.parse(cachedVideoData); // Parse the cached video data
        observer.next({ data: videoData });
        observer.complete();
      });
    } else {
      // No cached video data, fetch from API
      return this.http.get<{ data: IVideo[] }>(url).pipe(
        tap(response => {
          localStorage.setItem('videoData', JSON.stringify(response.data)); // Cache API response in localStorage
        })
      );
    }
  }

  addVideo(url: string, data: any) {
    return this.http.post(`${Constant.ADD_VIDEO}` + url, data);
  }

  // Clear localStorage (e.g., on logout)
  clearCache() {
    localStorage.removeItem('userData');
    localStorage.removeItem('videoData');
  }
}

  


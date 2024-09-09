import { AlertsComponent } from './../../core/reuseable components/alerts/alerts.component';
import { Component, inject, ViewChild, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';  // Ensure this import is correct
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../../services/api-service.service';
import { AlertSrvService } from '../../services/alert-srv.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, SignupComponent, AlertsComponent, SignupComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userObj: any = {
    emailId: '',
    Password: ''
  };
  loginurl = "/login";
  login:boolean=true;
  errorMessage: string | null = null;
  isLoading:boolean = false;

  constructor(private userSrv: ApiServiceService, private router: Router, private alertService: AlertSrvService) {}

  onApiLogin() {
    this.isLoading = true;

    const loginUser = {
      emailId: this.userObj.emailId,
      Password: this.userObj.Password
    };
    this.userSrv.loginUser('/login', loginUser).subscribe(
      response => {
        this.isLoading = false;
        localStorage.setItem('loggedUser', JSON.stringify(response));
        this.alertService.showSuccess('Login successful!');
        this.router.navigateByUrl('/dashboard');
      },
      error => {
        this.alertService.showError('Login Failed. Invalid Details');
      }
    );
  }

  // onHardLogin() {
  //   const loginUser = {
  //     emailId: this.userObj.emailId,
  //     Password: this.userObj.Password
  //   };
  //   if (loginUser.emailId === 'sadi' && loginUser.Password === '123') {
  //     const userData = {
  //       user: loginUser.emailId,
  //       pass: loginUser.Password
  //     };
  //     localStorage.setItem('data', JSON.stringify(userData));
  //     this.router.navigateByUrl('/layout/user-list');
  //     alert('Login successful!');
  //   } else {
  //     alert('Login after signup failed. Please try logging in manually.');
  //   }
  // }
  }
      


  
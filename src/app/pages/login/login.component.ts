import { ILoginResponse } from './../../core/Interface/ILoginResponse';
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
    Username: '',
    Password: ''
  };
  login:boolean=true;
  errorMessage: string | null = null;
  isLoading:boolean = false;

  constructor(private apiService: ApiServiceService, private router: Router, private alertService: AlertSrvService) {}

 

  onApiLogin() {
    this.isLoading = true;

    const loginUser = {
      userName: this.userObj.Username,
      password: this.userObj.Password
    };
    this.apiService.loginUser(loginUser).subscribe(
      (response: ILoginResponse) => {  // Use the ILoginResponse interface here
        this.isLoading = false;
  
        // Check if 'result' is true
        if (response.result) {
          localStorage.setItem('loggedUser', JSON.stringify(response.data));  // Store the user data, not the entire response
          this.alertService.showSuccess('Login successful!');
          this.login= false;
          this.router.navigateByUrl('/dashboard');
        } else {
          // Show error message from the response
          this.alertService.showError(response.message || 'Login failed. Invalid credentials.');
        }
      },
      error => {
        this.isLoading = false;
        // Handle any errors from the API
        this.alertService.showError('Login Failed. Please try again.');

      }

    );
    this.alertService.clear();

  }


  }
      


  
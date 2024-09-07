import { AlertsComponent } from './../../core/reuseable components/alerts/alerts.component';
import { Component, inject, ViewChild, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';  // Ensure this import is correct
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, SignupComponent, AlertsComponent, SignupComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild(AlertsComponent) alertComponent!: AlertsComponent;
  
  userSrv = inject(ApiServiceService);
  router = inject(Router);
  loginurl = "/login";
  login:boolean=true;

  userObj: any = {
    emailId: '',
    Password: ''
  };

  errorMessage: string | null = null;

  onApiLogin() {
      const loginUser = {
        emailId: this.userObj.emailId,
        Password: this.userObj.Password
      };
      this.userSrv.loginUser('/login', loginUser).subscribe(
        response => {
          localStorage.setItem('loggedUser', JSON.stringify(response)); // Assuming response contains user details
          // Simulate login API call
          
          this.alertComponent.showSuccessAlert('login'); // Show login success alert
          this.router.navigateByUrl('/user-list');
        },
        error => {
          this.errorMessage = 'Login Failed. Invalid Details';

        })

      }

      onError() {
        this.alertComponent.showErrorAlert('An error occurred during login.');
      }

      onHardLogin() {
        const loginUser = {
          emailId: this.userObj.emailId,
          Password: this.userObj.Password
        };
      
        if (loginUser.emailId === "sadi" && loginUser.Password === "123") {
          const userData = {
            user: loginUser.emailId,
            pass: loginUser.Password
          };
      
          // Convert the object to a JSON string and store it in localStorage
          localStorage.setItem('data', JSON.stringify(userData));
          this.router.navigateByUrl('/layout/user-list');
          alert('Login successful!');
        } else {
          alert('Login after signup failed. Please try logging in manually.');
        }
      }
      


  }
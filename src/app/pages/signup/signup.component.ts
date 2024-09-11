import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiServiceService } from '../../services/api-service.service';
import { Constant } from '../../core/Constant';
import { AlertSrvService } from '../../services/alert-srv.service';
import { LoginComponent } from '../login/login.component';
import { ILoginResponse } from '../../core/Interface/ILoginResponse';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  router = inject(Router);
  http = inject(HttpClient);
  userSrv = inject(ApiServiceService);
  errorMessage: string | null = null;
  isLoading:boolean = false;

  constructor(private alertService:AlertSrvService, private apiService:ApiServiceService){}

  newUserobj: any = {
    userId: 0,
    emailId: '',
    fullName: '',
    password: ''
  };

  onSignup() {
    if (this.newUserobj.emailId && this.newUserobj.fullName && this.newUserobj.password) {
      this.userSrv.createUser(Constant.SIGNUP_URL, this.newUserobj).subscribe(
        response => {
          this.autoLogin();  // Automatically log in after successful signup
        },
        error => {
          this.errorMessage = 'Signup failed. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please fill all the fields.';
    }
  }
  

  autoLogin() {
    const loginUser = {
      userName: this.newUserobj.emailId, // Assuming emailId is used as the username
      password: this.newUserobj.password
    };
  
    this.apiService.loginUser(loginUser).subscribe(
      (response: ILoginResponse) => {
        if (response.result) {
          localStorage.setItem('loggedUser', JSON.stringify(response.data));
          this.alertService.showSuccess('Signup and login successful!');
          this.router.navigateByUrl('/dashboard');  // Redirect to the dashboard
        } else {
          this.alertService.showError('Auto login failed. Please try logging in manually.');
        }
      },
      error => {
        this.alertService.showError('Auto login failed. Please try again.');
      }
    );
  }
  


}
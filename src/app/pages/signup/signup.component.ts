import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiServiceService } from '../../services/api-service.service';
import { Constant } from '../../core/Constant';
import { AlertSrvService } from '../../services/alert-srv.service';


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

  constructor(private alertService:AlertSrvService){}

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
          alert('Signup successful!');
          localStorage.setItem('signupUser', JSON.stringify(this.newUserobj));
          this.autoLogin();
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
    this.isLoading = true;

    const loginUser = {
      emailId: this.newUserobj.emailId,
      Password: this.newUserobj.Password
    };
    setTimeout(('hello'),4000);
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
}
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiServiceService } from '../../services/api-service.service';
import { Constant } from '../../core/Constant';

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
    const loginUser = {
      emailId: this.newUserobj.emailId,
      Password: this.newUserobj.password
    };
    this.userSrv.loginUser('/login', loginUser).subscribe(
      response => {
        localStorage.setItem('loggedUser', JSON.stringify(response)); // Assuming response contains user details
        alert('Login successful!');
        this.router.navigateByUrl('/layout/add-header');
      },
      error => {
        this.errorMessage = 'Login after signup failed. Please try logging in manually.';
      }
    );
  }
}
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';  // Ensure this import is correct
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, SignupComponent, SignupComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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
          alert('Login successful!');
          this.router.navigateByUrl('/user-list');
        },
        error => {
          this.errorMessage = 'Login after signup failed. Please try logging in manually.';

        })

      }

  onHardLogin(){
    const loginUser = {
      emailId: this.userObj.emailId,
      Password: this.userObj.Password
    };

    if(loginUser.emailId == "sadi" && loginUser.Password == "123")
    {
        // localStorage.setItem( 'loggedUser', loginUser.emailId + loginUser.Password);
        this.router.navigateByUrl('/layout/add-header');
        alert('Login successful!');
      }
      else{
        alert('Login after signup failed. Please try logging in manually.');

      }
  }


  }
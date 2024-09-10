import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiServiceService } from '../../services/api-service.service';
import { Constant } from '../../core/Constant';
import { AlertSrvService } from '../../services/alert-srv.service';
import { LoginComponent } from '../login/login.component';

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

  constructor(private alertService:AlertSrvService, private login:LoginComponent){}

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
          this.login.onApiLogin();

        },
        error => {
          
          this.errorMessage = 'Signup failed. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please fill all the fields.';
    }
  }


}
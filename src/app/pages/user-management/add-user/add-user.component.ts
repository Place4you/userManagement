import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule , Validators } from '@angular/forms';
import { Constant } from '../../../core/Constant';
import { AlertsComponent } from "../../../core/reuseable components/alerts/alerts.component";
import { TitleService } from '../../../services/title.service';
import { AlertSrvService } from '../../../services/alert-srv.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, AlertsComponent],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit, OnDestroy {
  isLoading:boolean=false;
  addUserForm!: FormGroup;
  title:string='Form to Add Student';


  constructor(private fb: FormBuilder, private http: HttpClient, private titlesrv:TitleService, private alertService:AlertSrvService) {}

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      userName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // subscribing to Title service
    this.titlesrv.setTitle(this.title);
  }

  onSubmit(): void {
    if (this.addUserForm.valid) {
      this.isLoading = true;
      const userPayload = {
        ...this.addUserForm.value,
        role: 'Student', // Always "Student"
        createdDate: new Date().toISOString(),
        projectName: 'YourProjectName',
        refreshToken: '',
        refreshTokenExpiryTime: new Date().toISOString()
      };

      this.http.post(Constant.ADD_USER, userPayload).subscribe(
        response => {
          this.isLoading= false;
          this.alertService.showSuccess('New Student ADDED successfuly!');
          // Clear the localStorage key for users
          localStorage.removeItem('users');
        },
        error => {
          this.isLoading= false;
          this.alertService.showError('Failed! Check Again');

        }
      );
    }
  }
  ngOnDestroy(){
    this.alertService.clear();
  }
}
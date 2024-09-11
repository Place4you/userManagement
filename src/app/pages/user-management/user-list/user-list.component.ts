import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ApiServiceService } from '../../../services/api-service.service';
import { Constant } from '../../../core/Constant';
import { IUser } from '../../../core/Interface/IUsers'; // Assuming IUser is correctly imported
import { TitleService } from '../../../services/title.service';
import { AlertSrvService } from '../../../services/alert-srv.service';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'] // Corrected this to `styleUrls`
})
export class UserListComponent implements OnInit {

  constructor(private apisrc: ApiServiceService, private titlesrv: TitleService, private alertService:AlertSrvService) {}
  
  title: string="User list of all users.";
  false:boolean= false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading: boolean = false;
  update: boolean = false;
  editableRow: number | null = null; // To track the row being edited
  // Function to enable editing for the selected row
  editRow(index: number) {
    this.editableRow = index;
    console.log('edit clicked');
    console.log(index);
  }

  // Function to update user data (you can add API logic here)
  updateUser(index:number) {
    const updatedUser = this.userInfo[index];
    console.log('update clicked');
    console.log(index);
    
    
    this.http.post(Constant.UPDATE_USER, updatedUser).subscribe(
      response => {
        this.alertService.showSuccess('New Student ADDED successfuly!');
        this.alertService.clear();

      },
      error => {
        this.false= false;
        this.alertService.showError('Failed! Check Again');
        this.alertService.clear();

      }
    );
    console.log('Updated User:', updatedUser);
    // Call your update API function here
    this.editableRow = null; // Reset to normal view after update
  }

  userInfo: IUser[] = []; // Holds the user data from the API


  http = inject(HttpClient);

  ngOnInit() {
    this.getAllUsers();
    this.titlesrv.setTitle(this.title);

  }

  // Fetch user data
  getAllUsers() {
    this.loading = true;
    this.apisrc.getallapi(Constant.GET_USERS).subscribe(
      (res: { data: IUser[] }) => {
        this.userInfo = res.data;
        
        this.errorMessage = null;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch data. Please try again later.';
        this.loading = false;
      }
    );
  }

  // `trackBy` function to optimize rendering
  trackById(index: number, user: IUser) {
    return user.userId; // Assumes `userId` is the unique identifier
  }
}

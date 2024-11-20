import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ApiServiceService } from '../../../services/api-service.service';
import { Constant } from '../../../core/Constant';
import { IUser } from '../../../core/Interface/IUsers'; // Assuming IUser is correctly imported
import { TitleService } from '../../../services/title.service';
import { AlertSrvService } from '../../../services/alert-srv.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'] // Corrected this to `styleUrls`
})
export class UserListComponent implements OnInit{

  title: string = "User list of all users.";
  userInfo: IUser[] = []; // Holds the user data from localStorage
  private subscriptions = new Subscription();
  errorMessage: string | null = null;
  loading: boolean = false;
  editableRow: number | null = null; // To track the row being edited

  constructor(
    private apisrc: ApiServiceService, 
    private titlesrv: TitleService, 
    private alertService: AlertSrvService
  ) {}

  ngOnInit(): void {
    this.titlesrv.setTitle(this.title);

    // Check if user data is available in localStorage
    const storedUserData = localStorage.getItem('users');

    if (storedUserData) {
      // If user data exists in localStorage, parse and assign it to userInfo
      this.userInfo = JSON.parse(storedUserData);
      this.loading = false;
    } else {
      // If no data in localStorage, make an API call to fetch and store the data
      this.loading = true;
      this.subscriptions.add(this.apisrc.getAllUsers(Constant.GET_USERS).subscribe(
        (data) => {
          this.userInfo = data.data;
          localStorage.setItem('users', JSON.stringify(this.userInfo)); // Save data to localStorage
          this.loading = false;
        },
        (error) => {
          this.errorMessage = 'Failed to fetch data. Please try again later.';
          this.loading = false;
        }
      ));
    }
  }


  

  // Function to enable editing for the selected row
  editRow(index: number) {
    this.editableRow = index;
    console.log(index);
  }

  private sortByLatest(a: IUser, b: IUser): number {
    // Adjust property name to match your data structure
    return new Date(b.userId).getTime() - new Date(a.userId).getTime();
  
  }
  // Function to update user data
  updateUser(index: number) {
    const updatedUser = this.userInfo[index];
    console.log(index);

    this.subscriptions.add(this.apisrc.updateUser(Constant.UPDATE_USER, updatedUser).subscribe(
      response => {
        this.alertService.showSuccess('User updated successfully!');
        
        // Update the user in the list
        const updatedUserList = [...this.userInfo];
        updatedUserList[index] = updatedUser;
    
        // Sort the list from latest to oldest (assumes `createdAt` or similar property exists)
        this.userInfo = updatedUserList.sort(this.sortByLatest);
    
        // Update local storage with the sorted list
        localStorage.setItem('users', JSON.stringify(this.userInfo));
    
        console.log('Updated User:', updatedUser);
      },
      error => {
        this.alertService.showError('Failed to update user. Please try again.');
      }
    ));
    
    this.editableRow = null; // Reset to normal view after update
  }

  // `trackBy` function to optimize rendering
  trackById(index: number, user: IUser) {
    return user.userId; // Assumes `userId` is the unique identifier
  }


}



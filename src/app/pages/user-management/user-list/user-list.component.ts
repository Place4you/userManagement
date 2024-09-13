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
export class UserListComponent implements OnInit, OnDestroy {

  title: string = "User list of all users.";
  userInfo: IUser[] = []; // Holds the user data from the BehaviorSubject
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

    // Subscribe to the user data from BehaviorSubject
    this.subscriptions.add(this.apisrc.userData$.subscribe(
      (data) => {
        if (data) {
          this.userInfo = data;
        } else {
          this.errorMessage = 'No data available';
        }
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch data. Please try again later.';
        this.loading = false;
      }
    ));

    // Trigger loading of data if it's not already loaded
    if (!this.userInfo.length) {
      this.loading = true;
      this.apisrc.getallapi('user-endpoint-url').subscribe(); // Replace with your actual endpoint
    }
  }

  // Function to enable editing for the selected row
  editRow(index: number) {
    this.editableRow = index;
    console.log('edit clicked');
    console.log(index);
  }

  // Function to update user data
  updateUser(index: number) {
    const updatedUser = this.userInfo[index];
    console.log('update clicked');
    console.log(index);

    this.apisrc.upadteUser('update-user-endpoint-url', updatedUser).subscribe(
      response => {
        this.alertService.showSuccess('User updated successfully!');
        // Trigger refresh of user data if needed
      },
      error => {
        this.alertService.showError('Failed to update user. Please try again.');
      }
    );
    console.log('Updated User:', updatedUser);
    this.editableRow = null; // Reset to normal view after update
  }

  // `trackBy` function to optimize rendering
  trackById(index: number, user: IUser) {
    return user.userId; // Assumes `userId` is the unique identifier
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.alertService.clear();
  }
}

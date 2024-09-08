import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ApiServiceService } from './../../services/api-service.service';
import { Constant } from '../../core/Constant';
import { IUser } from './../../core/Interface/IUsers'; // Assuming IUser is correctly imported
import { TitleService } from '../../services/title.service';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'] // Corrected this to `styleUrls`
})
export class UserListComponent implements OnInit {
  title: string="User list of all users.";
  flase:boolean= false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading: boolean = false;
  update: boolean = false;

  userInfo: IUser[] = []; // Holds the user data from the API

  constructor(private apisrc: ApiServiceService, private titlesrv: TitleService) {}

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

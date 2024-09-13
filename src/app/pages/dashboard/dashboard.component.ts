import { AlertSrvService } from './../../services/alert-srv.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TitleService } from '../../services/title.service';
import { AlertsComponent } from "../../core/reuseable components/alerts/alerts.component";
import { ApiServiceService } from '../../services/api-service.service';
import { IUser } from '../../core/Interface/IUsers';
import { Subscription } from 'rxjs';
import { Constant } from '../../core/Constant';
import { IVideo } from '../../core/Interface/IVideo';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AlertsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {

  title: string = "Latest Analytics";
  users: IUser[] = []; // Data from the user API
  videos: IVideo[] = []; // Data from the video API
  private subscriptions: Subscription = new Subscription(); // For managing multiple subscriptions

  constructor(
    private titlesrv: TitleService, 
    private alertService: AlertSrvService, 
    private apiService: ApiServiceService
  ) { }

  ngOnInit(): void {
    // Set the title
    this.titlesrv.setTitle(this.title);

    // Fetch user data on dashboard load
    this.subscriptions.add(this.apiService.getallapi(Constant.GET_USERS).subscribe({
      next: (response) => {
        this.users = response.data; // Store the API response
        console.log('User data:', this.users);
      },
      error: (err) => {
        console.error('User API error:', err);
        this.alertService.showError('Failed to load user data'); // Handle error with alert service
      }
    }));

    // Fetch video data on dashboard load
    this.subscriptions.add(this.apiService.getallvideos(Constant.GET_VIDEO).subscribe({
      next: (response) => {
        this.videos = response.data; // Store the API response
        console.log('Video data:', this.videos);
      },
      error: (err) => {
        console.error('Video API error:', err);
        this.alertService.showError('Failed to load video data'); // Handle error with alert service
      }
    }));
  }

  ngOnDestroy(): void {
    // Clear alerts and unsubscribe from all API calls
    this.alertService.clear();
    this.subscriptions.unsubscribe(); // Unsubscribe from all subscriptions
  }

}

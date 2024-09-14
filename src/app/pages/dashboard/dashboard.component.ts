import { AlertSrvService } from './../../services/alert-srv.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TitleService } from '../../services/title.service';
import { AlertsComponent } from "../../core/reuseable components/alerts/alerts.component";
import { ApiServiceService } from '../../services/api-service.service';
import { IUser } from '../../core/Interface/IUsers';
import { Subscription } from 'rxjs';
import { Constant } from '../../core/Constant';
import { IVideo } from '../../core/Interface/IVideo';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AlertsComponent, AgCharts],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {

  title: string = "Latest Analytics";
  userInfo: IUser[] = []; // Data from the user API
  videoInfo: IVideo[] = []; // Data from the video API
  loading:boolean= false;
  errorMessage: string | null = null;

  private subscriptions: Subscription = new Subscription(); // For managing multiple subscriptions
  public chartOptions: AgChartOptions;

  constructor(
    private titlesrv: TitleService, 
    private alertService: AlertSrvService, 
    private apiService: ApiServiceService,

  ) { 
    // Chart Options
    this.chartOptions = {
      // Data: Data to be displayed in the chart
      data: [
        { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
        { month: 'Mar', avgTemp: 6.3, iceCreamSales: 302000 },
        { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
        { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
        { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
        { month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 },
      ],
      // Series: Defines which chart type and data to use
      series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales' }]
    };
  }

  

  ngOnInit(): void {
    // Set the title
    this.titlesrv.setTitle(this.title);

         // Check if user data is available in localStorage

  {
     const storedUserData = localStorage.getItem('users');

     if (storedUserData) {
       // If user data exists in localStorage, parse and assign it to userInfo
       this.userInfo = JSON.parse(storedUserData);
       this.loading = false;
     } else {
       // If no data in localStorage, make an API call to fetch and store the data
       this.loading = true;
       this.subscriptions.add(this.apiService.getAllUsers(Constant.GET_USERS).subscribe(
         (data: { data: IUser[]; }) => {
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

        // Check if video data is available in localStorage

  {
      const storedVideoData = localStorage.getItem('videos');

      if (storedVideoData) {
        // If user data exists in localStorage, parse and assign it to userInfo
        this.userInfo = JSON.parse(storedVideoData);
        this.loading = false;
      } else {
        // If no data in localStorage, make an API call to fetch and store the data
        this.loading = true;
        this.subscriptions.add(this.apiService.getallvideos(Constant.GET_VIDEO).subscribe(
          (data: { data: IVideo[]; }) => {
            this.videoInfo = data.data;
            localStorage.setItem('videos', JSON.stringify(this.videoInfo)); // Save data to localStorage
            this.loading = false;
          },
          (error) => {
            this.errorMessage = 'Failed to fetch data. Please try again later.';
            this.loading = false;
          }
        ));
      }
  }
  }
  

  ngOnDestroy(): void {
this.alertService.clear();
  }
}


import { ICourse } from './../../core/Interface/ICourse';
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
import { ChartServiceService } from '../../chart-service.service';
import { HttpErrorResponse } from '@angular/common/http';
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
  courses : ICourse[] = [];
  loading:boolean= false;
  errorMessage: string | null = null;
  public chartLoader = {
    a: true,  // Chart A loader
    b: true,  // Chart B loader
    c: true,  // Chart C loader
    d: true   // Chart D loader
  };

  private subscriptions: Subscription = new Subscription(); // For managing multiple subscriptions
  public lineChartOptions!: AgChartOptions;
  public pieChartOptions!: AgChartOptions;
  public donutChartOptions!: AgChartOptions;
  public barChartOptions!: AgChartOptions;


  constructor(
    private titlesrv: TitleService, 
    private alertService: AlertSrvService, 
    private apiService: ApiServiceService,
    public chartService:ChartServiceService
    ) {}

    ngOnInit(): void {
      // Set the title
      this.titlesrv.setTitle(this.title);
    
      // Load user data and charts
      this.loadUserDataAndCharts();
    
      // Load video data and charts
      this.loadVideoDataAndCharts();

      // Load Course data and charts
      this.loadCourseDataAndCharts();
    }

    loadUserDataAndCharts(): void {
      const storedUserData = localStorage.getItem('users');
    
      if (storedUserData) {
        // Load user data from localStorage
        this.userInfo = JSON.parse(storedUserData);
    
        // Generate charts
        this.lineChartOptions = this.chartService.generateChart1(this.userInfo);
        this.pieChartOptions = this.chartService.generatePieChart2(this.userInfo);
    
        // Set loaders to false once data is loaded
        this.chartLoader.a = false;
        this.chartLoader.b = false;
    
      } else {
        // Fetch user data from API if not available in localStorage
        this.subscriptions.add(
          this.apiService.getAllUsers(Constant.GET_USERS).subscribe(
            (data: { data: IUser[] }) => {
              this.userInfo = data.data;
              localStorage.setItem('users', JSON.stringify(this.userInfo));
    
              // Generate charts
              this.lineChartOptions = this.chartService.generateChart1(this.userInfo);
              this.pieChartOptions = this.chartService.generatePieChart2(this.userInfo);
    
              // Set loaders to false once data is loaded
              this.chartLoader.a = false;
              this.chartLoader.b = false;
            },
            (error) => {
              this.errorMessage = 'Failed to fetch user data. Please try again later.';
              this.chartLoader.a = false;
              this.chartLoader.b = false;
            }
          )
        );
      }
    }



    loadCourseDataAndCharts():void {
    // Check if course data is available in localStorage
      this.subscriptions.add(
        this.apiService.getAllCourses(Constant.GET_COURSE).subscribe(
          (data: { data: ICourse[] }) => {
            this.courses = data.data;
            this.donutChartOptions = this.chartService.generateDonutChart3(this.courses);
            this.chartLoader.c = false; // Hide loader for chart D
          },
          (error: HttpErrorResponse) => {
            this.errorMessage = 'Failed to fetch data. Please try again later.';
            console.error('Error fetching courses:', error); // Log the error for debugging
            this.chartLoader.c = false; // Hide loader for chart D
          }
        )
  );
  }
    

    loadVideoDataAndCharts(): void {
      const storedVideoData = localStorage.getItem('videos');
    
      if (storedVideoData) {
        // Load video data from localStorage
        const videoInfo = JSON.parse(storedVideoData);
    
        // Generate charts
        this.barChartOptions = this.chartService.generateBarChart4(videoInfo);
    
        // Set loaders for video charts (if applicable)
        this.chartLoader.d = false;
    
      } else {
        // Fetch video data from API if not available in localStorage
        this.subscriptions.add(
          this.apiService.getallvideos(Constant.GET_VIDEO).subscribe(
            (data: { data: IVideo[] }) => {
              const videoInfo = data.data;
              localStorage.setItem('videos', JSON.stringify(videoInfo));
    
              // Generate charts
              this.barChartOptions = this.chartService.generateBarChart4(videoInfo);
    
              // Set loaders for video charts (if applicable)
              this.chartLoader.d = false;
            },
            (error) => {
              this.errorMessage = 'Failed to fetch video data. Please try again later.';
              this.chartLoader.d = false;
            }
          )
        );
      }
    }
    




 
  
  

  ngOnDestroy(): void {
this.alertService.clear();
  }
}


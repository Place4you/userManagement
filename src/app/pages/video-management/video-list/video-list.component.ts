import { Component, inject, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../services/api-service.service';
import { TitleService } from '../../../services/title.service';
import { AlertSrvService } from '../../../services/alert-srv.service';
import { Constant } from '../../../core/Constant';
import { HttpClient } from '@angular/common/http';
import { IVideo } from '../../../core/Interface/IVideo';
import { NgFor } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [ NgFor, NgxPaginationModule],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.css'
})
export class VideoListComponent implements OnInit {

  constructor(private apisrc: ApiServiceService, private titlesrv: TitleService, private alertService:AlertSrvService) 
  {
        // Set items per page based on screen size
        this.itemsPerPage = window.innerWidth <= 640 ? 5 : 9; // 5 for mobile, 9 for desktop
        window.addEventListener('resize', this.onResize.bind(this)); // Update on resize
  }

  p: number = 1; // Current page
  itemsPerPage: number;

  onResize(): void {
    this.itemsPerPage = window.innerWidth <= 640 ? 5 : 9; // Adjust based on screen size
  }

  title: string="Video list";
  false:boolean= false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading: boolean = false;
  update: boolean = false;
  editableRow: number | null = null; // To track the row being edited
  http = inject(HttpClient);
  videoInfo: IVideo[] = []; // Holds the user data from the API

    ngOnInit() {
      this.getAllVideos();
      this.getRandomYouTubeVideo();
      this.titlesrv.setTitle(this.title);
    }

  // Fetch video data
    getAllVideos() {
      this.loading = true;
      this.apisrc.getallvideos(Constant.GET_VIDEO).subscribe(
        (res: { data: IVideo[] }) => {
          this.videoInfo = res.data;
          
          // Assign random YouTube URLs and thumbnails to each video
          this.videoInfo.forEach((video) => {
            const { videoUrl, videoThumbnail } = this.getRandomYouTubeVideo();
            video.videoUrl = videoUrl;
            video.videoThumbnail = videoThumbnail;
          });

          this.errorMessage = null;
          this.loading = false;
        },
        (error) => {
          this.errorMessage = 'Failed to fetch Videos. Please try again later.';
          this.loading = false;
        }
      );
    }


  // Function to enable editing for the selected row
  // editRow(index: number) {
  //   this.editableRow = index;
  //   console.log('edit clicked');
  //   console.log(index);
  // }

  // Function to update user data (you can add API logic here)
  // updateVideo(index:number) {
  //   const updatedVideo = this.vieoInfo[index];
  //   console.log('update clicked');
  //   console.log(index);
    
    
  //   this.http.post(Constant.UPDATE_VIDEO, updatedUser).subscribe(
  //     response => {
  //       debugger;
  //       this.alertService.showSuccess('New Student ADDED successfuly!');
  //     },
  //     error => {
  //       debugger;
  //       this.false= false;
  //       this.alertService.showError('Failed! Check Again');
  //     }
  //   );
  //   console.log('Updated User:', updatedUser);
  //   // Call your update API function here
  //   this.editableRow = null; // Reset to normal view after update
  // }



// Random youtube video and thumnail
  getRandomYouTubeVideo(): { videoUrl: string, videoThumbnail: string } {
    const videoIds = [
      'rfscVS0vtbw', // Learn Python - Full Course for Beginners [Tutorial]
      'PkZNo7MFNFg', // Learn JavaScript - Full Course for Beginners
      'f02mOEt11OQ', // Learn React JS - Full Course for Beginners - Tutorial 2019
      'UB1O30fR-EE', // Learn HTML5 and CSS3 From Scratch - Full Course
      'Q33KBiDriJY', // Learn Java 8 - Full Tutorial for Beginners
      'jS4aFq5-91M', // Learn C++ - Full Course for Beginners - Tutorial 2019
      'pKd0Rpw7O48', // Learn SQL in 1 Hour - SQL Basics for Beginners
      'u62xhKq5kSE', // Learn Node.js - Full Tutorial for Beginners
      'zOjov-2OZ0E', // Learn Python OOP - Object Oriented Programming
      'Z1Yd7upQsXY', // Learn Data Structures and Algorithms with Python
      'HhGIWf2ROaE', // Learn Git In 15 Minutes
      '3JluqTojuME', // Learn Docker in 7 Easy Steps - Full Beginner's Tutorial
      '8aGhZQkoFbQ', // Learn JavaScript Promises (Pt.1)
      'Oe421EPjeBE', // Learn TypeScript in 50 Minutes - A Beginner's Guide
      'kUMe1FH4CHE', // Learn Python Flask - Full Tutorial for Beginners
      'u6gSSpfsoOQ', // Learn Django - Full Course for Beginners
      'fBNz5xF-Kx4', // Learn Express.js - Full Course for Beginners
      'yfoY53QXEnI', // Learn CSS Grid in 20 Minutes
      '1Rs2ND1ryYc', // Learn Flexbox in 15 Minutes
      'W6NZfCO5SIk'  // Learn JavaScript in 12 Minutes
    ];
    
    

    // Generate a random index to select a video ID
    const randomIndex = Math.floor(Math.random() * videoIds.length);
    const selectedVideoId = videoIds[randomIndex];

    // Construct YouTube video URL and thumbnail URL
    const youtubeUrl = `https://www.youtube.com/watch?v=${selectedVideoId}`;
    const videoThumbnail = `https://img.youtube.com/vi/${selectedVideoId}/mqdefault.jpg`;

    return {
      videoUrl: youtubeUrl,
      videoThumbnail: videoThumbnail
    };
  }



  // `trackBy` function to optimize rendering
  trackById(index: number, video: IVideo) {
    return video.videoId; // Assumes `userId` is the unique identifier
  }
}


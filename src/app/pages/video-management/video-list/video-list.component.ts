import { Component, inject, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../services/api-service.service';
import { TitleService } from '../../../services/title.service';
import { AlertSrvService } from '../../../services/alert-srv.service';
import { Constant } from '../../../core/Constant';
import { HttpClient } from '@angular/common/http';
import { IVideo } from '../../../core/Interface/IVideo';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [ NgFor],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.css'
})
export class VideoListComponent implements OnInit {

  constructor(private apisrc: ApiServiceService, private titlesrv: TitleService, private alertService:AlertSrvService) {}
  
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

    // Fetch user data
    getAllVideos() {
      this.loading = true;
      this.apisrc.getallvideos(Constant.GET_VIDEO).subscribe(
        (res: { data: IVideo[] }) => {
          this.videoInfo = res.data;
          // Assign random YouTube URLs to each video
          this.videoInfo.forEach((video) => {
              video.videoUrl = this.getRandomYouTubeVideo();
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



// Random youtube video
  getRandomYouTubeVideo(): string {
    const videoIds = [
      'dQw4w9WgXcQ', // Example YouTube video ID
      '9bZkp7q19f0',
      '3JZ_D3ELwOQ',
      'eVTXPUF4Oz4',
      'kJQP7kiw5Fk'
    ];
  
    // Generate a random index to select a video ID
    const randomIndex = Math.floor(Math.random() * videoIds.length);
  
    // Construct YouTube video URL
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoIds[randomIndex]}`;
    return youtubeUrl;
  }


  // `trackBy` function to optimize rendering
  trackById(index: number, video: IVideo) {
    return video.videoId; // Assumes `userId` is the unique identifier
  }
}


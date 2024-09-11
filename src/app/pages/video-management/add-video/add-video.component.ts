import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TitleService } from '../../../services/title.service';
import { AlertSrvService } from '../../../services/alert-srv.service';
import { ApiServiceService } from '../../../services/api-service.service';
import { Constant } from '../../../core/Constant';
@Component({
  selector: 'app-add-video',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule],
  templateUrl: './add-video.component.html',
  styleUrl: './add-video.component.css'
})
export class AddVideoComponent implements OnInit {
  isLoading: boolean = false;
  addVideoForm!: FormGroup;
  title: string = 'Add New Video';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private titlesrv: TitleService,
    private alertService: AlertSrvService
  ) {}

  ngOnInit(): void {
    this.addVideoForm = this.fb.group({
      videoTitle: ['', Validators.required],
      videoDescription: ['', Validators.required],
      totalDuration: ['', Validators.required],
    });

    // Set the page title
    this.titlesrv.setTitle(this.title);
  }

  onSubmit(): void {
    if (this.addVideoForm.valid) {
      this.isLoading = true;

      const videoPayload = {
        videoId: 0, // Default value
        videoUrl: 'default_url', // Default value
        videoTitle: this.addVideoForm.value.videoTitle,
        videoDescription: this.addVideoForm.value.videoDescription,
        videoThumbnail: 'default_thumbnail', // Default value
        totalDuration: this.addVideoForm.value.totalDuration,
      };

      this.http.post(Constant.ADD_VIDEO, videoPayload).subscribe(
        response => {
          
          this.isLoading = false;
          this.alertService.showSuccess('New Video Added Successfully!');
          this.alertService.clear();

        },
        error => {
          
          this.isLoading = false;
          this.alertService.showError('Failed to Add Video. Please Check Again.');
          this.alertService.clear();

        }
      );
    }
  }
}

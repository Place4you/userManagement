import { Component } from '@angular/core';
import { AlertSrvService } from '../../services/alert-srv.service';
import { VideoListComponent } from './video-list/video-list.component';
import { AddVideoComponent } from './add-video/add-video.component';

@Component({
  selector: 'app-video-management',
  standalone: true,
  imports: [ VideoListComponent , AddVideoComponent ],
  templateUrl: './video-management.component.html',
  styleUrl: './video-management.component.css'
})
export class VideoManagementComponent {

}

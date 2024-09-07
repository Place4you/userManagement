// alerts.component.ts
import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertSrvService } from '../../../services/alert-srv.service';
@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  showAlert = false;
  alertType: 'success' | 'error' = 'success';
  message: string = '';

  constructor(private alertService: AlertSrvService) {}

  ngOnInit() {
    this.alertService.alert$.subscribe(alert => {
      if (alert) {
        this.alertType = alert.type;
        this.message = alert.message;
        this.showAlert = true;
        setTimeout(() => this.closeAlert(), 2000); // Automatically close after 3 seconds
      } else {
        this.showAlert = false;
      }
    });
  }

  closeAlert() {
    this.showAlert = false;
  }
}

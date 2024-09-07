import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export class AlertsComponent {

  showAlert = false;
  alertType: 'success' | 'error' = 'success';
  message: string = '';
  errorMessage: string = '';
  title: string = '';
  iconClass: string = '';
  iconBgColor: string = '';
  alertClass: string = '';
  messageColor: string = '';

  constructor() { }

  // Show success alert (login/logout)
  showSuccessAlert(type: 'login' | 'logout') {
    this.alertType = 'success';
    this.showAlert = true;
    if (type === 'login') {
      this.title = 'Success';
      this.message = 'Login successful!';
      this.iconClass = 'fas fa-check-circle text-white text-xl';
      this.iconBgColor = 'bg-green-500';
      this.messageColor = 'text-green-500';
    } else if (type === 'logout') {
      this.title = 'Success';
      this.message = 'Logout successful!';
      this.iconClass = 'fas fa-sign-out-alt text-white text-xl';
      this.iconBgColor = 'bg-blue-500';
      this.messageColor = 'text-blue-500';
    }

    setTimeout(() => this.closeAlert(), 3000); // Automatically close after 3 seconds
  }

  // Show error alert
  showErrorAlert(errorMessage: string) {
    this.alertType = 'error';
    this.showAlert = true;
    this.errorMessage = errorMessage;

    setTimeout(() => this.closeAlert(), 3000); // Automatically close after 3 seconds
  }

  // Function to close alert
  closeAlert() {
    this.showAlert = false;
  }
}

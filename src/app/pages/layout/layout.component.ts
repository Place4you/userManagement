// layout.component.ts
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AlertSrvService } from '../../services/alert-srv.service';
import { AlertsComponent } from "../../core/reuseable components/alerts/alerts.component";
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AlertsComponent , RouterLink, AlertsComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  isMenuOpen: boolean = false;
  isAnimatingIn: boolean = true;

  constructor(private router: Router, private alertService: AlertSrvService) {}

  MobileMenu() {
    this.isAnimatingIn = true; // Prepare for sliding in animation
    this.isMenuOpen = true;    // Open the menu
  }

  closeMenu() {
    this.isAnimatingIn = false; // Prepare for sliding out animation
    setTimeout(() => {
      this.isMenuOpen = false;
    }, 300); // 300ms matches the animation duration
  }


  onLogout() {
    localStorage.removeItem('loggedUser');
    this.alertService.showSuccess('Logout successful!');
    this.router.navigateByUrl('/login');
  }

  onError() {
    this.alertService.showError('An error occurred during logout.');
  }
}

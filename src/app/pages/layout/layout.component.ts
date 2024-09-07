import { CommonModule } from '@angular/common';
import { Component, HostListener, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AlertsComponent } from '../../core/reuseable components/alerts/alerts.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, AlertsComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isMenuOpen : Boolean = false;
  isAnimatingIn:boolean= true;
  isSticky: boolean = false;
  @ViewChild(AlertsComponent) alertComponent!: AlertsComponent;


  constructor( private router: Router){}

  MobileMenu() {
    this.isAnimatingIn = true; // Prepare for sliding in animation
    this.isMenuOpen = true;    // Open the menu
  }

  closeMenu() {
    this.isAnimatingIn = false; // Prepare for sliding out animation
    // Delay setting isMenuOpen to false to allow the slide-out animation to complete
    setTimeout(() => {
      this.isMenuOpen = false;
    }, 300); // 300ms matches the animation duration
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isSticky = scrollPosition > 0;
  }

  onLogout() {

    // Remove user details from localStorage
    localStorage.removeItem('loggedUser');
    this.alertComponent.showSuccessAlert('logout'); // Show logout success alert
    // Navigate back to the login page
    this.router.navigateByUrl('/login');
  }

  onError() {
    this.alertComponent.showErrorAlert('An error occurred during logout.');
  }
  

}

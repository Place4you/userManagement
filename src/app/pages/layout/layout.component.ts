import { ApiServiceService } from './../../services/api-service.service';
// layout.component.ts
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AlertSrvService } from '../../services/alert-srv.service';
import { AlertsComponent } from "../../core/reuseable components/alerts/alerts.component";
import { TitleService } from '../../services/title.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Title } from '@angular/platform-browser';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive, DashboardComponent, RouterLink, AlertsComponent, NavbarComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isMenuOpen: boolean = false;
  isAnimatingIn: boolean = true;
  isSticky: boolean = false;
  currentTitle: string='';
  loggedInUserName :string = '';
  openIndex: number | null = null;
  menuOpen = false;

  constructor(private apiService: ApiServiceService, private router: Router, private alertService: AlertSrvService, public titlesrv: TitleService) {

  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  // Close the menu on click anywehre on screen
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const clickedInside = (event.target as HTMLElement).closest('.relative');
    if (!clickedInside) {
      this.menuOpen = false;
    }
  }

toggleDropdown(index: number) {
  this.openIndex = this.openIndex === index ? null : index;
}

  // Define navigation links in an array
    navLinks = [
      { path: '/dashboard', icon: 'fa-house', title: 'Dashboard' },
      { 
        title: 'User Management', 
        icon: 'fa-user', 
        children: [
          { path: '/user-list', title: 'All Users' },
          { path: '/add-user', title: 'Add Student' },
        ] 
      },
      { 
        title: 'Video Management', 
        icon: 'fa-video', 
        children: [
          { path: '/video-list', title: 'Video List' },
        { path: '/add-video', title: 'Add Video' },
        ] 
      },
      { path: '/settings', icon: 'fa-cog', title: 'Settings' },
      { action: 'logout', icon: 'fa-right-from-bracket', title: 'Logout' } // Changed to action
    ];

 

  ngOnInit(): void {
    // Username function
    this.getUserFromLocalStorage();
    
    // Give Title to Service for this component
    this.titlesrv.setTitle(this.currentTitle);
  }

  private getUserFromLocalStorage(): void {
     // Get name of user to display in Navbar

    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        this.loggedInUserName = parsedUser?.userName || 'Guest';
      } catch (e) {
        console.error('Error parsing user data:', e);
        this.loggedInUserName = 'Guest';
      }
    } else {
      this.loggedInUserName = 'Guest';
    }
  }

  onLinkClick(link: any): void {
    if (link.action === 'logout') {
      this.onLogout();
    }
    // Close the menu
    this.closeMenu();
  }
  

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

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isSticky = scrollPosition > 0;
  }

  onLogout() {
    // remove user info from localStorage
    localStorage.removeItem('loggedUser');
    this.apiService.clearCache();
    this.alertService.showSuccess('Logout successful!');
    this.alertService.clear();
    this.router.navigateByUrl('/login');

  }

  onError() {
    this.alertService.showError('An error occurred during logout.');
  }
}

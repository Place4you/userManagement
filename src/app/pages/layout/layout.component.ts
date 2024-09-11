// layout.component.ts
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AlertSrvService } from '../../services/alert-srv.service';
import { AlertsComponent } from "../../core/reuseable components/alerts/alerts.component";
import { TitleService } from '../../services/title.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive ,  DashboardComponent , RouterLink, AlertsComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isMenuOpen: boolean = false;
  isAnimatingIn: boolean = true;
  isSticky: boolean = false;
  currentTitle: string | null = null;
  loggedInUserName :string = '';
  openIndex: number | null = null;

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
        icon: 'fa-media', 
        children: [
          { path: '/video-list', title: 'Video List' },
          { path: '/add-video', title: 'Add Video' },
        ] 
      },
      { path: '/settings', icon: 'fa-cog', title: 'Settings' },
      { action: 'logout', icon: 'fa-right-from-bracket', title: 'Logout' } // Changed to action
    ];

  constructor(private router: Router, private alertService: AlertSrvService, private titlesrv: TitleService) {

  }

  ngOnInit(): void {
    // Username function
    this.getUserFromLocalStorage();

    // Give Title to Service for this component
    this.titlesrv.title$.subscribe(title=>{
      this.currentTitle = title;
    })
  }

  private getUserFromLocalStorage(): void {
     // Get name of user to display in Navbar

    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        this.loggedInUserName = parsedUser?.data?.emailId|| 'Guest';
      } catch (e) {
        console.error('Error parsing user data:', e);
        this.loggedInUserName = 'Guest';
      }
    } else {
      this.loggedInUserName = 'Guest';
    }
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
    this.alertService.showSuccess('Logout successful!');
    this.router.navigateByUrl('/login');
  }

  onError() {
    this.alertService.showError('An error occurred during logout.');
  }
}

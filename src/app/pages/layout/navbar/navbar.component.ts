import { NgClass, CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiServiceService } from '../../../services/api-service.service';
import { AlertSrvService } from '../../../services/alert-srv.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isMenuOpen: boolean = false;
  isAnimatingIn: boolean = true;
  isSticky: boolean = false;
  openIndex: number | null = null;

  constructor(private apiService: ApiServiceService, private router: Router, private alertService: AlertSrvService) {}


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
    { action: 'logout', icon: 'fa-right-from-bracket', title: 'Logout' }
  ];


  ngOnInit(): void {}

  toggleDropdown(index: number): void {
    this.openIndex = this.openIndex === index ? null : index;
  }

  MobileMenu(): void {
    this.isAnimatingIn = true;
    this.isMenuOpen = true;
  }

  closeMenu(): void {
    this.isAnimatingIn = false;
    setTimeout(() => {
      this.isMenuOpen = false;
    }, 300);
  }

  onLinkClick(link: any): void {
    if (link.action === 'logout') {
      this.onLogout();
    }
    this.closeMenu();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isSticky = scrollPosition > 0;
  }

  onLogout(): void {
    // Implement logout logic
  }
}

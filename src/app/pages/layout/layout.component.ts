import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isMenuOpen : Boolean = false;
  isAnimatingIn:boolean= true;
  isSticky: boolean = false;


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
  

}

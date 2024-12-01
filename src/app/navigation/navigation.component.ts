import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavItem {
  number: number;
  text: string;
  isActive: boolean;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class NavigationComponent {
  navItems: NavItem[] = [
    { number: 1, text: 'Welcome', isActive: false },
    { number: 2, text: 'Hello, Friend', isActive: false },
    { number: 3, text: 'Thank you', isActive: false },
    { number: 4, text: 'Come on, Together', isActive: false },
    { number: 5, text: 'Leaderboard', isActive: false }
  ];

  setActive(index: number): void {
    this.navItems.forEach((item, i) => {
      item.isActive = i === index;
    });
  }

  clearActive(): void {
    this.navItems.forEach(item => item.isActive = false);
  }
} 

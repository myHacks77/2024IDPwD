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
    { number: 1, text: 'THE FUTURE OF REALITY', isActive: false },
    { number: 2, text: 'EXPERIENCE SPACE LIVING', isActive: false },
    { number: 3, text: 'A BOOMING SPACE ECONOMY', isActive: false },
    { number: 4, text: 'ABOARD YOUR STARSHIP', isActive: true },
    { number: 5, text: 'YOUR INTERGALACTIC FUTURE AWAITS', isActive: false }
  ];

  setActive(index: number): void {
    this.navItems.forEach((item, i) => {
      item.isActive = i === index;
    });
  }
} 
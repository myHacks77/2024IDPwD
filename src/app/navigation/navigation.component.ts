import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
    number: number;
    text: string;
    route: string;
}

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class NavigationComponent {
    @Output() navigationClicked = new EventEmitter<void>();

    navItems: NavItem[] = [
        { number: 1, text: 'Welcome', route: '/welcome'},
        { number: 2, text: '"Hello, Friend"', route: '/hello-friend' },
        { number: 3, text: '"Thank you"', route: '/thank-you'},
        { number: 4, text: '"Come on, Together"', route: '/come-together' },
        { number: 5, text: 'Leaderboard', route: '/leaderboard' }
    ];

} 

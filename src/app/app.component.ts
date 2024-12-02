import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    NavigationComponent,
  ],
  standalone: true
})
export class AppComponent {
  isTransitioning = false;

  triggerTransition() {
    this.isTransitioning = true;
    setTimeout(() => {
      this.isTransitioning = false;
    }, 1500);
  }
}

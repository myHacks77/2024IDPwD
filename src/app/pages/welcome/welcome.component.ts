import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  imports: [
    FormsModule,
  ],
  standalone: true
})
export class WelcomeComponent {
  name: string | undefined;

  constructor(
    private router: Router
  ) { }

  enterGame() {
    this.router.navigate(['/hello-friend']);
  }
}

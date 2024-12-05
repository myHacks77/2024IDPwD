import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ScoreService } from '../../services/score.service';
import { SupportersService } from '../leaderboard/services/supporters.service';

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
    private router: Router,
    private supportersService: SupportersService
  ) { }

  enterGame() {
    if (!this.name) {
      return;
    }
    this.supportersService.setUser(this.name);
    this.router.navigate(['/hello-friend']);
  }
}

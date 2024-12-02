import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { HelloFriendComponent } from './pages/hello-friend/hello-friend.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { ComeTogetherComponent } from './pages/come-together/come-together.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'hello-friend', component: HelloFriendComponent },
  { path: 'thank-you', component: ThankYouComponent },
  { path: 'come-together', component: ComeTogetherComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: '**', redirectTo: 'welcome' }
];

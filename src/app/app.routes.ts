import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ProgressGuard } from './guards/progress.guard';

export const routes: Routes = [
  {
    path: 'welcome',
    loadComponent: () => import('./pages/welcome/welcome.component')
      .then(c => c.WelcomeComponent)
  },
  {
    path: 'hello-friend',
    loadComponent: () => import('./pages/hello-friend/hello-friend.component')
      .then(c => c.HelloFriendComponent),
    canActivate: [AuthGuard],
    data: { requiredStep: 1 }
  },
  {
    path: 'thank-you',
    loadComponent: () => import('./pages/thank-you/thank-you.component')
      .then(c => c.ThankYouComponent),
    canActivate: [AuthGuard, ProgressGuard],
    data: { requiredStep: 2 }
  },
  {
    path: 'did-you-eat',
    loadComponent: () => import('./pages/come-together/come-together.component')
      .then(c => c.ComeTogetherComponent),
    canActivate: [AuthGuard, ProgressGuard],
    data: { requiredStep: 3 }
  },
  {
    path: 'leaderboard',
    loadComponent: () => import('./pages/leaderboard/leaderboard.component')
      .then(c => c.LeaderboardComponent),
    canActivate: [AuthGuard, ProgressGuard],
    data: { requiredStep: 4 }
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  }
];

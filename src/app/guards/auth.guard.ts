import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { SupportersService } from '../pages/leaderboard/services/supporters.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private supportersService: SupportersService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    if (!this.supportersService.currentUser) {
      return this.router.createUrlTree(['/welcome']);
    }
    return true;
  }
} 
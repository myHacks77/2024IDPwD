import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { SupportersService } from '../pages/leaderboard/services/supporters.service';

@Injectable({
  providedIn: 'root'
})
export class ProgressGuard implements CanActivate {
  constructor(
    private supportersService: SupportersService,
    private router: Router
  ) {}

  canActivate(route: any): boolean | UrlTree {
    const requiredStep = route.data?.requiredStep;
    const currentStep = this.supportersService.currentStep;

    if (currentStep < requiredStep) {
      // 重定向到适当的页面
      switch (currentStep) {
        case 0:
          return this.router.createUrlTree(['/welcome']);
        case 1:
          return this.router.createUrlTree(['/hello-friend']);
        case 2:
          return this.router.createUrlTree(['/thank-you']);
        default:
          return this.router.createUrlTree(['/welcome']);
      }
    }
    return true;
  }
}
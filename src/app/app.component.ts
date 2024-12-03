import { Component, ElementRef, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
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
  isAnimating = false;
  name: string | undefined;
  private multiple = 25;
  private element: HTMLElement | undefined;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.startAnimation();
      }
    })

    if (isPlatformBrowser(this.platformId)) {
      this.element = this.el.nativeElement.querySelector('.glass-container');
      
      this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
        window.requestAnimationFrame(() => {
          this.transformElement(e.clientX, e.clientY);
        });
      });

      this.renderer.listen('document', 'mouseleave', () => {
        if (this.element) {
          this.renderer.setStyle(this.element, 'transform', 'rotateX(0) rotateY(0)');
        }
      });
    }
  }

  startAnimation() {
    this.isAnimating = true;
    setTimeout(() => {
      this.isAnimating = false;
    }, 2000);
  }

  private transformElement(x: number, y: number) {
    if (!this.element) return;
    
    const box = this.element.getBoundingClientRect();
    let calcX = -(y - box.y - (box.height / 2)) / this.multiple;
    let calcY = (x - box.x - (box.width / 2)) / this.multiple;
   
    calcX = calcX > 10 ? 10 : calcX;
    calcY = calcY > 10 ? 10 : calcY;

    calcX = calcX < -10 ? -10 : calcX;
    calcY = calcY < -10 ? -10 : calcY;

    this.renderer.setStyle(
      this.element, 
      'transform', 
      `rotateX(${calcX}deg) rotateY(${calcY}deg)`
    );
  }
}

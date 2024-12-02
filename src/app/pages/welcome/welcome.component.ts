import { Component, OnInit, ElementRef, Renderer2, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
export class WelcomeComponent implements OnInit {
  name: string | undefined;
  private multiple = 25;
  private element: HTMLElement | undefined;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit() {
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

  enterGame() {
    this.router.navigate(['/hello-friend']);
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

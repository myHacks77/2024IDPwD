import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  private multiple = 25;
  private element: HTMLElement | undefined;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.element = this.el.nativeElement.querySelector('.welcome-container');
    document.addEventListener('mousemove', (e) => {
      window.requestAnimationFrame(() => {
        this.transformElement(e.clientX, e.clientY);
      });
    });
    document.addEventListener('mouseleave', () => {
      if (this.element) {
        this.element.style.transform = "rotateX(0) rotateY(0)";
      }
    });
  }
  private transformElement(x: number, y: number) {
    if (!this.element) return;
    const box = this.element.getBoundingClientRect();
    const calcX = -(y - box.y - (box.height / 2)) / this.multiple;
    const calcY = (x - box.x - (box.width / 2)) / this.multiple;
    
    this.element.style.transform = `rotateX(${calcX}deg) rotateY(${calcY}deg)`;
  }
}

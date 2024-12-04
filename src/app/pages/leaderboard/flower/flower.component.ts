import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flower',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flower.component.html',
  styleUrls: ['./flower.component.scss']
})
export class FlowerComponent implements OnInit {
  @Input() name: string = '';
  
  // 随机变化参数
  petalScale!: number;
  stemHeight!: number;
  leafCount!: number;
  leafPosition!: number;
  leafPositionRight!: number;
  leafRotation!: number;
  flowerScale!: number;

  ngOnInit() {
    this.petalScale = 0.7 + Math.random() * 0.2;  // 0.7-0.9 (比之前小)
    this.stemHeight = 35 + Math.random() * 10;    // 35-45px (比之前短)
    this.leafCount = Math.floor(Math.random() * 3 );
    this.leafPosition = -20 - Math.random() * 10;  // -25 to -35px
    this.leafPositionRight = -20 - Math.random() * 10;
    this.leafRotation = 15 + Math.random() * 25;   // 15 to 40度
    this.flowerScale = 0.7 + Math.random() * 0.2;  // 0.7-0.9 (整体更小)
  }
}
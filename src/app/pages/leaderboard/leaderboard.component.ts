import { Component, OnInit } from '@angular/core';
import { FlowerComponent } from './flower/flower.component';
import { CommonModule } from '@angular/common';

interface FlowerPosition {
  name: string;
  x: number;
  y: number;
}

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [FlowerComponent, CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  flowers: FlowerPosition[] = [];
  names = ['Amory', 'Jenny', 'John', 'Jane', 'Tom', 'Jerry', 'Amy', 'Lily', 'Lucy', 'Lily', 'Lucy', 'Lily', 'Lucy'];
  
  ngOnInit() {
    // 为每个名字生成随机位置
    this.flowers = this.names.map(name => ({
      name,
      x: Math.random() * 80, // 0-80%，留出边距
      y: Math.random() * 80
    }));
  }
}

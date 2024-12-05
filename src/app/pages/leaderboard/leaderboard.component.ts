import { Component, OnInit } from '@angular/core';
import { FlowerComponent } from './flower/flower.component';
import { CommonModule } from '@angular/common';
import { SupportersService } from './services/supporters.service';
import { Supporter } from './data/supporters';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [FlowerComponent, CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  flowers: Supporter[] = [];
  
  constructor(private supportersService: SupportersService) {}

  ngOnInit() {
    this.flowers = this.supportersService.currentSupporters;
    const currentUser = this.supportersService.currentUser;
    if (currentUser) {
      this.addSupporter(currentUser);
    }
  }

  addSupporter(name: string) {
    const newSupporter: Supporter = {
      name,
      joinDate: new Date(),
      position: {
        x: 3 + Math.random() * 90,
        y: 3 + Math.random() * 90
      },
      isNew: true
    };
    this.flowers.push(newSupporter);
   
    // 延长动画时间到3秒
    setTimeout(() => {
      newSupporter.isNew = false;
      this.supportersService.addSupporter(newSupporter);
      this.supportersService.clearUser();
    }, 3000);
  }
}

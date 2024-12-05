import { Component, OnInit } from '@angular/core';
import { FlowerComponent } from './flower/flower.component';
import { CommonModule } from '@angular/common';

import { SupportersService } from './services/supporters.service';
import { ScoreService } from '../../services/score.service';
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
  
  constructor(
    private supportersService: SupportersService, 
    private scoreService: ScoreService
  ) {}

  ngOnInit() {
    this.flowers = this.supportersService.currentSupporters;
    this.addSupporter(this.scoreService.getUser());
  }

  addSupporter(name: string) {
    this.supportersService.addSupporter(name);
  }
}

import { Component, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HandGesturesComponent } from '../hand-gestures/hand-gestures.component';
import { CommonModule } from '@angular/common';
import { PredefinedHandposes } from '../hand-gestures/handpose.types';
import { distinctUntilChanged, map, throttleTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SupportersService } from '../../pages/leaderboard/services/supporters.service';


export interface GameSetting {
  levelTitle: string;
  nextStepLink: string;
  requiredGestures: GameWord[];
}

export interface GameWord {
  word: string;
  gestures: PredefinedHandposes[];
  isCorrect?: boolean;
}

@Component({
  selector: 'app-sign-language-game',
  standalone: true,
  imports: [
    CommonModule,
    HandGesturesComponent
  ],
  templateUrl: './sign-language-game.component.html',
  styleUrl: './sign-language-game.component.scss'
})
export class SignLanguageGameComponent implements AfterViewInit {
  @ViewChild(HandGesturesComponent) handGesturesComponent!: HandGesturesComponent;
  @Input() gameSetting!: GameSetting;
  progress: number = 0;
  isWon: boolean = false

  constructor(private router: Router, private supportersService: SupportersService  ) {}

  ngAfterViewInit(): void {
    this.handGesturesComponent?.handpose$?.pipe(
      throttleTime(1000),
      distinctUntilChanged(),
      map(hands => hands.map(hand => hand.handpose)),
    ).subscribe((hands) => {
      console.log(hands);
      if(!this.gameSetting.requiredGestures.length)return;
      if(this.isWon)return;
      
      const targetGesture = this.gameSetting.requiredGestures[this.progress];
      if (hands.some(hand => targetGesture.gestures.includes(hand))) {
        this.progress++;
        console.log(this.progress);
      }

      if (this.progress === this.gameSetting.requiredGestures.length) {
        this.isWon = true;
      }
    });
  }

  nextLevel(): void {
    if (!this.gameSetting.nextStepLink) return;
    this.supportersService.completeCurrentStep();
    this.router.navigate([this.gameSetting.nextStepLink]);
  }

}

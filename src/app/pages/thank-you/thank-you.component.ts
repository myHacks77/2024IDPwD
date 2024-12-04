import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PredefinedHandposes } from '../../shared/hand-gestures/handpose.types';
import { GameSetting, SignLanguageGameComponent } from '../../shared/sign-language-game/sign-language-game.component';

@Component({
  selector: 'app-thank-you',
  imports: [
    SignLanguageGameComponent,
    CommonModule
  ],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss'
})
export class ThankYouComponent {
  isEntered = false;
  gameSetting: GameSetting = {
    levelTitle: 'Thank You',
    nextStepLink: '/did-you-eat',
    requiredGestures: [
      { gestures: [PredefinedHandposes.ThumbUp], word: 'Xie' },
      { gestures: [PredefinedHandposes.HalfThumbUp], word: 'Xie' },
      { gestures: [PredefinedHandposes.ThumbUp], word: 'Xie' },
      { gestures: [PredefinedHandposes.HalfThumbUp], word: 'Xie' },
    ]
  };

  startGame() {
    this.isEntered = true;
  }
}

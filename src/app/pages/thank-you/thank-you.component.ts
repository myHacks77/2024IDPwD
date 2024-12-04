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
      { gestures: [PredefinedHandposes.ThumbUp], word: '谢(Thank you) - Part 1' },
      { gestures: [PredefinedHandposes.HalfThumbUp], word: '谢(Thank you) - Part 2' },
      { gestures: [PredefinedHandposes.ThumbUp], word: '谢(Thank you) - Part 1' },
      { gestures: [PredefinedHandposes.HalfThumbUp], word: '谢(Thank you) - Part 2' },
    ]
  };

  startGame() {
    this.isEntered = true;
  }
}

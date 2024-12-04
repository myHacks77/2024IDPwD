import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameSetting, SignLanguageGameComponent } from '../../shared/sign-language-game/sign-language-game.component';
import { PredefinedHandposes } from '../../shared/hand-gestures/handpose.types';

@Component({
  selector: 'app-hello-friend',
  imports: [
    SignLanguageGameComponent,
    CommonModule
  ],
  templateUrl: './hello-friend.component.html',
  styleUrl: './hello-friend.component.scss'
})
export class HelloFriendComponent {
  isEntered = false;
  gameSetting: GameSetting = {
    levelTitle: 'Hello Friend',
    nextStepLink: '/thank-you',
    requiredGestures: [
      { gestures: [PredefinedHandposes.PointToOther], word: '你(You)' },
      { gestures: [PredefinedHandposes.ThumbUp], word: '好(Good)' },
    ]
  };

  startGame() {
    this.isEntered = true;
  }
}

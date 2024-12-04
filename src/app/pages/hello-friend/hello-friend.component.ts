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
      { gestures: [PredefinedHandposes.PointToOther], word: 'Ni' },
      { gestures: [PredefinedHandposes.ThumbUp], word: 'Hao' },
    ]
  };

  startGame() {
    this.isEntered = true;
  }
}

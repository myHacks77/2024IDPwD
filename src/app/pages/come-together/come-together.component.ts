import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PredefinedHandposes } from '../../shared/hand-gestures/handpose.types';
import { GameSetting, SignLanguageGameComponent } from '../../shared/sign-language-game/sign-language-game.component';

@Component({
  selector: 'app-come-together',
  imports: [
    SignLanguageGameComponent,
    CommonModule
  ],
  templateUrl: './come-together.component.html',
  styleUrl: './come-together.component.scss'
})
export class ComeTogetherComponent {

  isEntered = false;
  gameSetting: GameSetting = {
    levelTitle: 'Come Together',
    nextStepLink: '/leaderboard',
    requiredGestures: [
      { gestures: [PredefinedHandposes.PointToOther], word: 'Ni' },
      { gestures: [PredefinedHandposes.TwoFingers], word: 'Chi' },
      { gestures: [PredefinedHandposes.TwoFingers], word: 'Fan' },
      { gestures: [PredefinedHandposes.PointDiagonalUp], word: 'le' },
      { gestures: [PredefinedHandposes.PointDiagonalDown], word: 'ma' },
      { gestures: [PredefinedHandposes.PointDiagonalUp], word: 'le' },
      { gestures: [PredefinedHandposes.PointDiagonalDown], word: 'ma' },  
    ]
  };

  startGame() {
    this.isEntered = true;
  }
}

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
    levelTitle: 'Did you eat?',
    nextStepLink: '/leaderboard',
    requiredGestures: [
      { gestures: [PredefinedHandposes.PointToOther], word: '你(You)' },
      { gestures: [PredefinedHandposes.TwoFingers], word: '吃(Eat)饭(Food) - I' },
      { gestures: [PredefinedHandposes.TwoFingers], word: '吃(Eat)饭(Food)-II' },
      { gestures: [PredefinedHandposes.PointDiagonalDown], word: '了吗(Did?) - I' },
      { gestures: [PredefinedHandposes.PointDiagonalDown], word: '了吗(Did?) - II' } 
    ]
  };

  startGame() {
    this.isEntered = true;
  }
}

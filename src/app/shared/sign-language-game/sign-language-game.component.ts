import { Component } from '@angular/core';
import { HandGesturesComponent } from '../hand-gestures/hand-gestures.component';

@Component({
  selector: 'app-sign-language-game',
  imports: [
    HandGesturesComponent
  ],
  templateUrl: './sign-language-game.component.html',
  styleUrl: './sign-language-game.component.scss'
})
export class SignLanguageGameComponent {

}

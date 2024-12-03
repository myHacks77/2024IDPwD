import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignLanguageGameComponent } from '../../shared/sign-language-game/sign-language-game.component';

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

  startGame() {
    this.isEntered = true;
  }
}

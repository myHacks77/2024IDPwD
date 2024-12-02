import { Component } from '@angular/core';
import { HandGesturesComponent } from '../../shared/hand-gestures/hand-gestures.component';

@Component({
  selector: 'app-hello-friend',
  imports: [
    HandGesturesComponent
  ],
  templateUrl: './hello-friend.component.html',
  styleUrl: './hello-friend.component.scss'
})
export class HelloFriendComponent {

}

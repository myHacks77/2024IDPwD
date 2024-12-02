import { Component } from '@angular/core';
import { HandGesturesComponent } from '../../shared/hand-gestures/hand-gestures.component';

@Component({
  selector: 'app-thank-you',
  imports: [
    HandGesturesComponent
  ],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss'
})
export class ThankYouComponent {

}

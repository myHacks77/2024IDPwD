import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { HandposeService } from './handpose.service';
import { BehaviorSubject, fromEvent, interval, map, Observable, skip, Subscription, switchMap, tap } from 'rxjs';
import { IdentifitedHand, PredefinedHandposes } from './handpose.types';
import { HandposeUtils } from './handpose.utils';
import { Hand } from '@tensorflow-models/hand-pose-detection';
import { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { maxBy as _maxBy } from 'lodash';
import { GestureEstimator } from 'fingerpose';
import { POINT_TO_OTHER_GESTURE } from './gestures/point-to-other';
import { THUMB_UP_GESTURE } from './gestures/thumb-up';
import { HALF_THUMB_UP_GESTURE } from './gestures/half-thumb-up';
import { TWO_FINGER_GESTURE } from './gestures/two-fingers';
import { POINT_DIAGONAL_UP_GESTURE } from './gestures/point-diagonal-up';
import { POINT_DIAGONAL_DOWN_GESTURE } from './gestures/point-diagonal-down';
@Component({
  selector: 'app-hand-gestures',
  imports: [],
  templateUrl: './hand-gestures.component.html',
  styleUrl: './hand-gestures.component.scss'
})
export class HandGesturesComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() width: number = 320;
  widthRatio: number = 4;
  heightRatio: number = 3;
  height: number = (this.width / this.widthRatio) * this.heightRatio;

  @ViewChild('video', { static: true }) video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D | null = null;

  gestureEstimator!: GestureEstimator;

  handposes$$: BehaviorSubject<IdentifitedHand[]> = new BehaviorSubject<IdentifitedHand[]>([]);
  handpose$: Observable<IdentifitedHand[]> = this.handposes$$.asObservable();

  private videoStream$!: Subscription;

  @Output() gestureDetected = new EventEmitter<PredefinedHandposes>();

  constructor(private handposeService: HandposeService) {
  }

  ngOnInit(): void {
    this.gestureEstimator = new GestureEstimator([
      // PINCH_GESTURE,
      // HOVER_GESTURE,
      POINT_TO_OTHER_GESTURE,
      THUMB_UP_GESTURE,
      HALF_THUMB_UP_GESTURE,
      TWO_FINGER_GESTURE,
      POINT_DIAGONAL_UP_GESTURE,
      POINT_DIAGONAL_DOWN_GESTURE,
      // //STOP_GESTURE,
      // MOVE_GESTURE,
      // RAISED_HAND_GESTURE,
      // ROTATION_GESTURE,
      // SPLAYED_GESTURE,
      // PERFECT_GESTURE,
      // ROCK_GESTURE,
      // Gestures.ThumbsUpGesture,
      // Gestures.VictoryGesture,
      // THUMB_DOWN_GESTURE,
      // FIST_GESTURE
    ]);
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['width']) {
      this.width = changes['width'].currentValue;
      this.height = (this.width / this.widthRatio) * this.heightRatio;
    }
  }

  ngAfterViewInit(): void {
    // this.processHandsNoise();
    this.initializeVideoStream();
  } 

  ngOnDestroy(): void {
    if (!this.videoStream$) return;
    this.videoStream$.unsubscribe();
  }

  processHandsNoise() {
    let prevHands: any[] = [];
    this.handpose$ = this.handposes$$.pipe(
      skip(1),
      map((hands) => {
        if (!prevHands[0] || !prevHands[1]) {
          (prevHands[0] = hands.find(hand => hand.handedness === 'Left'));
          (prevHands[1] = hands.find(hand => hand.handedness === 'Right'));
          return hands;
        }

        ['Left', 'Right'].forEach(
          (handness, prevHandIdx) => {
            const prevHand = prevHands[prevHandIdx];
            const currHandIdx = hands.findIndex(hand => hand.handedness === handness);
            const currHand = hands[currHandIdx];

            if (!prevHand || !currHand) return;
            if (HandposeUtils.isHandSimilar(prevHand, currHand)) {
              hands[currHandIdx] = prevHand;
            } else {
              prevHands[prevHandIdx] = currHand;
            }
          }
        );

        return hands;
      }),
      tap(hands => {
        // this.drawVideo();
        this.drawHands(hands);
        console.log(hands);
      })
    );
  }

  initializeVideoStream() {
    const videoConfig: MediaStreamConstraints = {
      audio: false,
      video: {
        width: this.width,
        height: this.height,

        frameRate: {
          ideal: 30
        }
      }
    };
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia(videoConfig)
        .then((stream) => {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();

          this.videoStream$ = fromEvent(this.video.nativeElement, 'play')
            .pipe(
              switchMap(() => interval(100)),
              tap(() => {
                this.handposeService
                  .detectV2(this.video.nativeElement)
                  .then((handResult) => {
                    if (handResult) {
                      this.handleV2Result(handResult);
                    } else {
                      console.error('No hand result detected');
                    }
                  })
                  .catch((err) => console.error('Error for video stream V2'));
              })
            )
            .subscribe();
        })
        .catch((error) => {
          console.error('Error accessing video stream:', error);
        });
    }
  }

  handleResults(hands: Hand[]) {
    this.drawVideo();

    const identifiedHands: IdentifitedHand[] = [];

    for (let hand of hands) {
      if (hand.score < 0.85) {
        console.log('hand', hand.score, hand);
        return;
      }

      HandposeUtils.drawHandLandmarks(this.canvas.nativeElement, hand.keypoints);
      const handpose = this.estimateFingerpose(hand);
      if (!handpose) return;
      identifiedHands.push({ handpose, ...hand });
    }

    this.handposes$$.next(identifiedHands);
  }

  handleV2Result(results: HandLandmarkerResult): void {
    this.drawVideo();
    if (!results.handedness.length) return;
    const hands = HandposeUtils.convertHandLandmarkResultToHand(results, this.width, this.height);
    this.drawHands(hands);
    const identifiedHands = this.estimateGestures(hands);
    if (!identifiedHands?.length) return;
    this.handposes$$.next(identifiedHands);
  }

  drawVideo(): void {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    this.ctx.save();
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(this.video.nativeElement, -this.width, 0, this.width, this.height);
    this.ctx.restore();
  }

  drawHands(hands: Hand[]): void {
    if (!hands?.length) return;

    for (let hand of hands) {
      HandposeUtils.drawHandLandmarks(this.canvas.nativeElement, hand.keypoints);
    }
  }

  estimateGestures(hands: Hand[]): IdentifitedHand[] | undefined {
    if (!hands?.length) return;

    const identifiedHands: IdentifitedHand[] = [];
    for (let hand of hands) {
      const handpose = this.estimateFingerpose(hand);
      if (!handpose) continue;
      identifiedHands.push({ ...hand, handpose });
    }
    return identifiedHands;
  }
  estimateFingerpose(hand: Hand): PredefinedHandposes | undefined {
    if (!hand.keypoints3D) return undefined;
    const newKeypoints = hand.keypoints3D.map((point) => {
      const { x, y, z, name } = point;
      return [x, y, z];
    });

    const gesture = this.gestureEstimator?.estimate(newKeypoints as any[], 9);
    if (gesture.gestures?.length) {
      const mostPossibleGesture = _maxBy(gesture.gestures, (gesture) => gesture?.score);

      // console.log('Gesture detected', mostPossibleGesture?.name, mostPossibleGesture?.score);

      return mostPossibleGesture?.name as PredefinedHandposes;
    }

    return undefined;
  }

}

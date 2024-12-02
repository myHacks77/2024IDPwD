import { Injectable } from '@angular/core';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import '@tensorflow/tfjs-backend-webgl';

@Injectable({
  providedIn: 'root'
})
export class HandposeService {
  private detector!: handPoseDetection.HandDetector;
  private handLandmarker!: HandLandmarker;

  constructor() {
    // this.initHandpose();
    this.initHandposeV2();
  }

  // @ts-ignore
  private async initHandpose() {
    try {
      const model = handPoseDetection.SupportedModels.MediaPipeHands;
      const detectorConfig = {
        runtime: 'mediapipe',
        solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands`,
        modelType: 'full',
        maxHands: 2
      } as any;

      this.detector = await handPoseDetection.createDetector(model, detectorConfig);
      console.log('Handpose model loaded successfully');
    } catch (error) {
      console.error('Error initializing handpose model:', error);
    }
  }

  private async initHandposeV2() {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm'
    );
    this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
        delegate: 'GPU'
      },
      runningMode: 'VIDEO',
      numHands: 2,
      minHandDetectionConfidence: 0.66,
      minHandPresenceConfidence: 0.66,
      minTrackingConfidence: 0.66
    });
  }

  public async detect(video: HTMLVideoElement) {
    if (!this.detector) return null;

    try {
      return await this.detector.estimateHands(video, {
        flipHorizontal: true,
        staticImageMode: false
      });
    } catch (error) {
      console.error('Error detecting hands:', error);
      return null;
    }
  }

  setCanvasForV2(canvas: HTMLCanvasElement) {
    if (!this.handLandmarker) return;
    this.handLandmarker.setOptions({
      canvas: canvas
    })
  }

  public async detectV2(video: HTMLVideoElement) {
    if (!this.handLandmarker) return null;

    try {
      return await this.handLandmarker.detectForVideo(video, performance.now());
    } catch (error) {
      console.error('Error detecting hands:', error);
      return null;
    }
  }
}

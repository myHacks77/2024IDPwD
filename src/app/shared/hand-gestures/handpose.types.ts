import { Hand, Keypoint } from '@tensorflow-models/hand-pose-detection';

export enum PredefinedHandposes {
  Pinch = 'pinch',
  Stop = 'stop',
  Rotate = 'rotate',
  Move = 'move',
  Hover = 'hover',
  ThumbUp = 'thumbs_up',
  Splayed = 'splayed',
  Perfect = 'perfect',
  Rock = 'rock',
  ThumbDown = 'thumbs_down',
  FIST = 'fist',
  RAISED_HAND = 'raised_hand',
}

export interface HandposeResult {
  pose: PredefinedHandposes;
  confidence: number;
  keyPoints: Keypoint[];
  keyPoints3D: Keypoint[];
}

export interface IdentifitedHand extends Hand {
  handpose: PredefinedHandposes;
}

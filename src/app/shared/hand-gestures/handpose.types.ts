import { Hand, Keypoint } from '@tensorflow-models/hand-pose-detection';

export enum PredefinedHandposes {
  Pinch = 'pinch',
  Stop = 'stop',
  Rotate = 'rotate',
  Move = 'move',
  Hover = 'hover',
  PointToOther = 'point_to_other',
  PointDiagonalUp = 'point_diagonal_up',
  PointDiagonalDown = 'point_diagonal_down',
  ThumbUp = 'thumbs_up',
  HalfThumbUp = 'half_thumb_up',
  TwoFingers = 'two_fingers',
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

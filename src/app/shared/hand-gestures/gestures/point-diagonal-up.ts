import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';
import { PredefinedHandposes } from '../handpose.types';

export const POINT_DIAGONAL_UP_GESTURE = new GestureDescription(PredefinedHandposes.PointDiagonalUp);

for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  POINT_DIAGONAL_UP_GESTURE.addCurl(finger, FingerCurl.NoCurl, 1.0);
  POINT_DIAGONAL_UP_GESTURE.addDirection(finger, FingerDirection.DiagonalUpRight, .8);
  POINT_DIAGONAL_UP_GESTURE.addDirection(finger, FingerDirection.DiagonalUpLeft, .8);
}

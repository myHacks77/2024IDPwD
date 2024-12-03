import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';
import { PredefinedHandposes } from '../handpose.types';

export const POINT_DIAGONAL_DOWN_GESTURE = new GestureDescription(PredefinedHandposes.PointDiagonalDown);

for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  POINT_DIAGONAL_DOWN_GESTURE.addCurl(finger, FingerCurl.NoCurl, 1.0);
  POINT_DIAGONAL_DOWN_GESTURE.addDirection(finger, FingerDirection.DiagonalDownRight, 1);
  POINT_DIAGONAL_DOWN_GESTURE.addDirection(finger, FingerDirection.DiagonalDownLeft, 1);
}

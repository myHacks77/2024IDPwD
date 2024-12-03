import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';
import { PredefinedHandposes } from '../handpose.types';

export const POINT_TO_OTHER_GESTURE = new GestureDescription(PredefinedHandposes.PointToOther);

for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  POINT_TO_OTHER_GESTURE.addCurl(finger, FingerCurl.NoCurl, 1.0);
  POINT_TO_OTHER_GESTURE.addDirection(finger, FingerDirection.VerticalUp, 0.8);
  POINT_TO_OTHER_GESTURE.addDirection(finger, FingerDirection.VerticalDown, 0.8);
  POINT_TO_OTHER_GESTURE.addDirection(finger, FingerDirection.DiagonalUpRight, 0.4);
  POINT_TO_OTHER_GESTURE.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.4);
  POINT_TO_OTHER_GESTURE.addDirection(finger, FingerDirection.DiagonalDownRight, 0.4);
  POINT_TO_OTHER_GESTURE.addDirection(finger, FingerDirection.DiagonalDownLeft, 0.4);
}

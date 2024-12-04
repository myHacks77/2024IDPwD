import { Finger, FingerCurl, GestureDescription } from 'fingerpose';
import { PredefinedHandposes } from '../handpose.types';

export const POINT_TO_OTHER_GESTURE = new GestureDescription(PredefinedHandposes.PointToOther);

for (let finger of [Finger.Thumb,Finger.Middle, Finger.Ring, Finger.Pinky]) {
  POINT_TO_OTHER_GESTURE.addCurl(finger, FingerCurl.FullCurl, 1.0);
  POINT_TO_OTHER_GESTURE.addCurl(finger, FingerCurl.HalfCurl, 1.0);
}
POINT_TO_OTHER_GESTURE.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
POINT_TO_OTHER_GESTURE.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
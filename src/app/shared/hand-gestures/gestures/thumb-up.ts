import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';
import { PredefinedHandposes } from '../handpose.types';

export const THUMB_UP_GESTURE = new GestureDescription(PredefinedHandposes.ThumbUp);

THUMB_UP_GESTURE.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
THUMB_UP_GESTURE.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);

THUMB_UP_GESTURE.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
THUMB_UP_GESTURE.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
THUMB_UP_GESTURE.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
THUMB_UP_GESTURE.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);

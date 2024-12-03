import { Finger, FingerCurl, GestureDescription } from 'fingerpose';
import { PredefinedHandposes } from '../handpose.types';

export const TWO_FINGER_GESTURE = new GestureDescription(PredefinedHandposes.TwoFingers);

TWO_FINGER_GESTURE.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.7);
TWO_FINGER_GESTURE.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.7);
TWO_FINGER_GESTURE.addCurl(Finger.Thumb, FingerCurl.FullCurl, 0.2);

TWO_FINGER_GESTURE.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
TWO_FINGER_GESTURE.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
TWO_FINGER_GESTURE.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
TWO_FINGER_GESTURE.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
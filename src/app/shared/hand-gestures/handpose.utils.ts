import { Category, HandLandmarkerResult, NormalizedLandmark } from '@mediapipe/tasks-vision';
import { Hand, Keypoint } from '@tensorflow-models/hand-pose-detection';
import { IdentifitedHand } from './handpose.types';

export class HandposeUtils {
  static readonly ANCHOR_POINTS = [
    [0, 0, 0],
    [0, 0.1, 0],
    [-0.1, 0, 0],
    [-0.1, -0.1, 0]
  ];

  static readonly fingerLookupIndices = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20]
  }; // for rendering each finger as a polyline

  static readonly connections = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [0, 5],
    [5, 6],
    [6, 7],
    [7, 8],
    [0, 9],
    [9, 10],
    [10, 11],
    [11, 12],
    [0, 13],
    [13, 14],
    [14, 15],
    [15, 16],
    [0, 17],
    [17, 18],
    [18, 19],
    [19, 20]
  ];


  static isHandSimilar(prevHand: Hand, curHand: Hand, threshold: number = 0.005): boolean {
    if (prevHand.handedness !== curHand.handedness) return false;

    const mae = HandposeUtils.calculateKeyPointsDifference(prevHand.keypoints3D ?? [], curHand.keypoints3D ?? []);
    console.log('MAE', mae);
    return mae < threshold;
  }

  static calculateKeyPointsDifference(prevKeypoints: Keypoint[], currKeypoints: Keypoint[]): number {
    let differences: number[] = [];
    prevKeypoints.forEach(
      (point, index) => {
        differences.push(this.calculatePointDIfference(point, currKeypoints[index]));
      }
    );

    this.removeOutliers(differences);
    const sum = differences.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum / differences.length;
  }

  static calculatePointDIfference(prevKeypoint: Keypoint, currKeypoint: Keypoint): number {
    const differenceX = prevKeypoint.x && currKeypoint.x ? Math.abs(prevKeypoint.x - currKeypoint.x) : 0;
    const differenceY = prevKeypoint.y && currKeypoint.y ? Math.abs(prevKeypoint.y - currKeypoint.y) : 0;
    const differenceZ = prevKeypoint.z && currKeypoint.z ? Math.abs(prevKeypoint.z - currKeypoint.z) : 0;

    return (differenceX + differenceY + differenceZ) / 3;
  }

  static removeOutliers(differences: number[]) {
    const maxIndex = differences.indexOf(Math.max(...differences));
    differences.splice(maxIndex, 1);

    const minIndex = differences.indexOf(Math.min(...differences));
    differences.splice(minIndex, 1);
  }

  static convertHandLandmarkResultToHand(result: HandLandmarkerResult, width: number, height: number, isFlipped: boolean = true): Hand[] {
    const hands = [];
    const { handedness, landmarks, worldLandmarks } = result;
    const leftHand = handedness.find((hand) => hand?.[0]?.categoryName === 'Left');
    const rightHand = handedness.find((hand) => hand?.[0]?.categoryName === 'Right');
    if (leftHand?.length) {
      const handness = leftHand[0];
      const landmarkIndex = handness.index < result.landmarks.length ? handness.index : result.landmarks.length - 1;
      hands.push(this.convertHandnessToHand(handness, result.landmarks[landmarkIndex], width, height, isFlipped));
    }

    if (rightHand?.length) {
      const handness = rightHand[0];
      const landmarkIndex = handness.index < result.landmarks.length ? handness.index : result.landmarks.length - 1;
      hands.push(this.convertHandnessToHand(handness, result.landmarks[landmarkIndex], width, height, isFlipped));
    }
    return hands;
  }

  static convertHandnessToHand(handness: Category, landmark: NormalizedLandmark[], width: number, height: number, isFlipped: boolean = true): Hand {
    const processedLandMarks = isFlipped ? landmark.map(l => ({
      x: (1 - l.x) * width,
      y: l.y * height
    })) : landmark.map(l => ({ x: l.x * width, y: l.y * height }));
    const processedNormalizedLandMarks3D = isFlipped ? landmark.map(l => ({
      ...l,
      x: (1 - l.x),
      y: l.y
    })) : landmark;
    return {
      handedness: handness.categoryName as any,
      score: handness.score,
      keypoints: processedLandMarks,
      keypoints3D: processedNormalizedLandMarks3D
    };
  }
  static drawHandLandmarks(canvas: HTMLCanvasElement, keypoints: Keypoint[], isNormalizedPoints: boolean = false): void {
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = canvas;

    for (let i = 0; i < keypoints.length; i++) {
      const x = isNormalizedPoints ? keypoints[i].x * width : keypoints[i].x;
      const y = isNormalizedPoints ? keypoints[i].y * height : keypoints[i].y;

      this.drawPoint(ctx, x, y, 2, '#ff0000');
    }

    const fingers = Object.keys(HandposeUtils.fingerLookupIndices);
    for (let i = 0; i < fingers.length; i++) {
      const finger = fingers[i] as keyof typeof HandposeUtils.fingerLookupIndices;
      const points = HandposeUtils.fingerLookupIndices[finger].map((idx) => keypoints[idx]);
      this.drawPath(canvas, points, false, '#0014dc', isNormalizedPoints);
    }
  }

  static drawPoint(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: string
  ): void {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }

  static drawPath(
    canvas: HTMLCanvasElement,
    points: Keypoint[],
    closePath: boolean,
    color?: string,
    isNormalizedPoints: boolean = false
  ) {
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = color || '#000000'; // Default color if undefined
    const region = new Path2D();
    const { width, height } = canvas;
    const xStart = isNormalizedPoints ? points[0].x * width : points[0].x;
    const yStart = isNormalizedPoints ? points[0].y * height : points[0].y;
    region.moveTo(xStart, yStart);
    for (let i = 1; i < points.length; i++) {
      let { x, y } = points[i];
      x = isNormalizedPoints ? x * width : x;
      y = isNormalizedPoints ? y * height : y;
      region.lineTo(x, y);
    }

    if (closePath) {
      region.closePath();
    }
    ctx.stroke(region);
  }

  static isContinuousGesture(
    prevHands: IdentifitedHand[],
    currentHands: IdentifitedHand[]
  ): boolean {
    if (prevHands?.length !== currentHands?.length) return false;
    let result = true;
    for (let i = 0; i < prevHands.length; i++) {
      result &&= prevHands[i].handedness === currentHands[i].handedness;
      result &&= !!prevHands[i].handpose;
      result &&= prevHands[i].handpose === currentHands[i].handpose;
    }
    return result;
  }

  static getMove3DVector(
    prevHand: IdentifitedHand,
    currentHand: IdentifitedHand
  ): [number, number, number] {
    const prevThumbFingerTip = prevHand.keypoints3D?.[4];
    const currThumbFingerTip = currentHand.keypoints3D?.[4];
    if (!prevThumbFingerTip || !currThumbFingerTip) return [0, 0, 0];

    const x = (currThumbFingerTip?.x || 0) - (prevThumbFingerTip?.x || 0);
    const y = (currThumbFingerTip?.y || 0) - (prevThumbFingerTip?.y || 0);
    const z = (currThumbFingerTip?.z || 0) - (prevThumbFingerTip?.z || 0);

    console.log(x, y, z);
    return [x, y, z];
  }

  static getMove2DVector(
    prevHand: IdentifitedHand,
    currentHand: IdentifitedHand
  ): [number, number] {
    const prevThumbFingerTip = prevHand.keypoints[4];
    const currThumbFingerTip = currentHand.keypoints[4];

    const x = currThumbFingerTip.x - prevThumbFingerTip.x;
    const y = currThumbFingerTip.y - prevThumbFingerTip.y;

    return [x, y];
  }
}

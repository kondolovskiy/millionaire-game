export function findAngle(adjacent: number, opposite: number): number {
  let angleRadians = Math.atan(opposite / adjacent);
  let angleDegrees = angleRadians * (180 / Math.PI);
  return 180 - angleDegrees;
}

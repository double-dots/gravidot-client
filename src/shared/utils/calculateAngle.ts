export const calculateAngle = (
  point1: { x: number; y: number },
  point2: { x: number; y: number }
) => Math.atan2(point2.y - point1.y, point2.x - point1.x);

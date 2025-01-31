export const calculateDistance = (
  point1: { x: number; y: number },
  point2: { x: number; y: number }
) => Math.hypot(point2.x - point1.x, point2.y - point1.y);

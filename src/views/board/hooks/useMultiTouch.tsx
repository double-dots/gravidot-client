import {
  Color,
  ColorType,
  GravidotNode,
  ShapeTypeConst,
} from "@/entities/node/model";
import { calculateAngle } from "@/shared/utils/calculateAngle";
import { calculateDistance } from "@/shared/utils/calculateDistance";
import { OnNodesChange } from "@xyflow/react";
import { useCallback, useRef, useState } from "react";

export function useMultiTouch(
  isActive: boolean,
  selectedNodeId: string | null,
  nodes: GravidotNode[],
  onNodesChange: OnNodesChange<GravidotNode>
) {
  const isMultiTouchActive = useRef(false);
  const initialDistance = useRef<number | null>(null);
  const initialAngle = useRef<number | null>(null);
  const [touchPoints, setTouchPoints] = useState<{ x: number; y: number }[]>(
    []
  );
  const activeTouchType = useRef<string | null>(null);
  const endTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateTouchPoints = (event: TouchEvent) => {
    const points = Array.from(event.touches).map((touch) => ({
      x: touch.clientX,
      y: touch.clientY,
    }));
    setTouchPoints(points);
    return points;
  };

  const resetMultiTouch = () => {
    initialDistance.current = null;
    initialAngle.current = null;
    setTouchPoints([]);
    activeTouchType.current = null;
  };

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (!isActive || !selectedNodeId) return;

      const touchCount = event.touches.length;
      activeTouchType.current = `${touchCount}touch`;

      if (touchCount >= 2) {
        isMultiTouchActive.current = true;
      }

      const points = updateTouchPoints(event);
      const previousNode = nodes.find((node) => node.id === selectedNodeId);

      if (!previousNode) return;

      if (touchCount === 2) {
        const [touch1, touch2] = points;

        const currentDistance = calculateDistance(touch1, touch2);
        const currentAngle = calculateAngle(touch1, touch2);

        if (!initialDistance.current || !initialAngle.current) {
          initialDistance.current = currentDistance;
          initialAngle.current = currentAngle;
          return;
        }

        const scale = Math.max(
          0.5,
          Math.min(3, currentDistance / initialDistance.current)
        );
        const rotation =
          ((currentAngle - initialAngle.current) * 180) / Math.PI;

        onNodesChange([
          {
            id: selectedNodeId,
            type: "replace",
            item: {
              ...previousNode,
              data: {
                ...previousNode.data,
                scale: scale,
                rotation,
              },
            },
          },
        ]);
      } else if (touchCount === 3) {
        const [touch1, , touch3] = points;

        const currentAngle = calculateAngle(touch1, touch3);
        const angleDeg = Math.min(
          30,
          Math.abs(((currentAngle * 180) / Math.PI) % 360)
        );

        let selectedVertex;

        if (angleDeg <= 3) selectedVertex = ShapeTypeConst.circle;
        else if (angleDeg <= 6) selectedVertex = ShapeTypeConst.roundRectangle;
        else if (angleDeg <= 9) selectedVertex = ShapeTypeConst.rectangle;
        else if (angleDeg <= 12) selectedVertex = ShapeTypeConst.pentagon;
        else if (angleDeg <= 15) selectedVertex = ShapeTypeConst.hexagon;
        else if (angleDeg <= 18) selectedVertex = ShapeTypeConst.arrowRectangle;
        else if (angleDeg <= 21) selectedVertex = ShapeTypeConst.cylinder;
        else if (angleDeg <= 24) selectedVertex = ShapeTypeConst.triangle;
        else if (angleDeg <= 27) selectedVertex = ShapeTypeConst.parallelogram;
        else if (angleDeg <= 30) selectedVertex = ShapeTypeConst.star;
        else selectedVertex = ShapeTypeConst.plus;

        onNodesChange([
          {
            id: selectedNodeId,
            type: "replace",
            item: {
              ...previousNode,
              data: {
                ...previousNode.data,
                type: selectedVertex,
              },
            },
          },
        ]);
      } else if (touchCount === 4) {
        const minX = Math.min(...points.map((p) => p.x));
        const maxX = Math.max(...points.map((p) => p.x));
        const minY = Math.min(...points.map((p) => p.y));
        const maxY = Math.max(...points.map((p) => p.y));

        const size = {
          w: Math.max(100, maxX - minX),
          h: Math.max(100, maxY - minY),
        };

        onNodesChange([
          {
            id: selectedNodeId,
            type: "replace",
            item: {
              ...previousNode,
              data: {
                ...previousNode.data,
                size,
              },
            },
          },
        ]);
      } else if (touchCount === 5) {
        const [touch1, , , , touch5] = points;

        const d = calculateDistance(touch1, touch5);

        const colorThresholds: {
          threshold: number;
          color: Color;
        }[] = [
          { threshold: 150, color: ColorType.red },
          { threshold: 200, color: ColorType.yellow },
          { threshold: 250, color: ColorType.blue },
          { threshold: 300, color: ColorType.skyBlue },
          { threshold: 340, color: ColorType.lime },
          { threshold: 380, color: ColorType.pink },
          { threshold: 420, color: ColorType.purple },
          { threshold: 500, color: ColorType.brown },
          { threshold: Infinity, color: ColorType.transparent },
        ];

        const selectedColor =
          colorThresholds.find((threshold) => d < threshold.threshold)?.color ||
          ColorType.transparent;

        onNodesChange([
          {
            id: selectedNodeId,
            type: "replace",
            item: {
              ...previousNode,
              data: {
                ...previousNode.data,
                color: selectedColor,
              },
            },
          },
        ]);
      }
    },
    [isActive, selectedNodeId, nodes, onNodesChange]
  );

  const handleTouchEnd = useCallback(() => {
    if (endTimer.current) clearTimeout(endTimer.current);

    endTimer.current = setTimeout(resetMultiTouch, 500);
  }, []);

  return {
    handleTouchMove,
    handleTouchEnd,
    touchPoints,
    isMultiTouchActive,
  };
}

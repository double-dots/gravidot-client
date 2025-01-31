import { GravidotNode } from "@/entities/node/model";
import { getStraightPath, useInternalNode } from "@xyflow/react";
import React from "react";
import { getEdgeParams } from "../utils";

interface FloatingEdgeProps {
  id: string;
  source: string;
  target: string;
  markerEnd?: string;
  style?: React.CSSProperties;
}

export function FloatingEdge({
  id,
  source,
  target,
  markerEnd,
  style,
}: FloatingEdgeProps): JSX.Element | null {
  const sourceNode = useInternalNode<GravidotNode>(source);
  const targetNode = useInternalNode<GravidotNode>(target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

  const [edgePath] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });

  return <path id={id} d={edgePath} markerEnd={markerEnd} style={style} />;
}

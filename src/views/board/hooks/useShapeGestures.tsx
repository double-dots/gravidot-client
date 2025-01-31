import {
  ColorType,
  GravidotEdge,
  GravidotNode,
  ShapeTypeConst,
} from "@/entities/node/model";
import { getRandomValue } from "@/shared/utils/getRandomValue";
import {
  OnInit,
  ReactFlowInstance,
  useNodesState,
  Viewport,
} from "@xyflow/react";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useMultiTouch } from "./useMultiTouch";

const DOUBLE_CLICK_TIME_THRESHOLD = 250;

export const useShapeGestures = ({
  isActive,
  divBoardRef,
  selectedNodeId,
}: {
  isActive: boolean;
  divBoardRef: RefObject<HTMLDivElement>;
  selectedNodeId: string | null;
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<GravidotNode>([]);
  const [lastClickTime, setLastClickTime] = useState<number>(0);

  const deletedNodesHistory = useRef<GravidotNode[]>([]);
  const createdNodesHistory = useRef<GravidotNode[]>([]);

  const reactFlowInstance = useRef<ReactFlowInstance<
    GravidotNode,
    GravidotEdge
  > | null>(null);

  const { handleTouchMove, handleTouchEnd, touchPoints } = useMultiTouch(
    isActive,
    selectedNodeId,
    nodes,
    onNodesChange
  );

  useEffect(() => {
    if (!isActive) return;

    const board = divBoardRef.current;
    if (!board) return;

    board.addEventListener("touchmove", handleTouchMove);
    board.addEventListener("touchend", handleTouchEnd);
    board.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      board.removeEventListener("touchmove", handleTouchMove);
      board.removeEventListener("touchend", handleTouchEnd);
      board.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [isActive, divBoardRef, handleTouchMove, handleTouchEnd]);

  const handleUndo = useCallback(() => {
    if (!isActive) return;

    if (createdNodesHistory.current.length > 0) {
      const createdNode = createdNodesHistory.current.pop()!;

      setNodes((prev) => prev.filter((node) => node.id !== createdNode.id));
      return;
    }

    if (deletedNodesHistory.current.length > 0) {
      const node = deletedNodesHistory.current.pop()!;

      setNodes((prev) => [...prev, node]);
    }
  }, [setNodes, isActive]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isActive) return;

      const isUndoShortcut =
        (event.ctrlKey && event.key === "z") ||
        (event.metaKey && event.key === "z");

      if (isUndoShortcut) {
        event.preventDefault();
        handleUndo();
        return;
      }
    },
    [isActive, handleUndo]
  );

  useEffect(() => {
    if (!isActive) return;
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isActive]);

  const handlePaneDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      const currentTime = new Date().getTime();

      if (currentTime - lastClickTime < DOUBLE_CLICK_TIME_THRESHOLD) {
        if (!reactFlowInstance.current) return;

        const viewport: Viewport =
          reactFlowInstance.current.toObject().viewport;

        const size = { w: 140, h: 140 };

        const position = {
          x: (event.clientX - viewport.x - size.w / 2) / viewport.zoom,
          y: (event.clientY - viewport.y - size.h / 2) / viewport.zoom,
        };

        const randomType = getRandomValue(ShapeTypeConst)().value;

        const newNode: GravidotNode = {
          id: `${nodes.length + 1}`,
          type: "shape",
          position,
          internals: { positionAbsolute: position },
          data: {
            type: randomType,
            content: `Add text!`,
            size,
            color: getRandomValue(ColorType)().value,
            scale: 1,
            rotation: 0,
          },
        };

        createdNodesHistory.current.push(newNode);

        setNodes((prevNodes) => [...prevNodes, newNode]);
      }

      setLastClickTime(currentTime);
    },
    [lastClickTime, nodes, setNodes]
  );

  const onDelete = useCallback(
    (nodeId: string | null) => {
      if (!nodeId) return;

      setNodes((prevNodes) => {
        const nodeToDelete = prevNodes.find((node) => node.id === nodeId);
        if (!nodeToDelete) return prevNodes;

        deletedNodesHistory.current.push(nodeToDelete);
        return prevNodes.filter((node) => node.id !== nodeId);
      });
    },
    [setNodes]
  );

  const handleStoreDeleteHistory = async ({
    nodes,
    edges,
  }: {
    nodes: GravidotNode[];
    edges: GravidotEdge[];
  }): Promise<boolean | { nodes: GravidotNode[]; edges: GravidotEdge[] }> => {
    const nodeToDelete = nodes.find((node) => node.id === selectedNodeId);

    if (!nodeToDelete) return false;

    deletedNodesHistory.current.push(nodeToDelete);
    return { nodes, edges };
  };

  const onInit: OnInit<GravidotNode, GravidotEdge> = useCallback((instance) => {
    reactFlowInstance.current = instance;
  }, []);

  return {
    nodes,
    touchPoints,
    handlePaneDoubleClick,
    handleStoreDeleteHistory,
    onInit,
    onNodesChange,
    onDelete,
  };
};

"use client";

import { useBoardStore } from "@/entities/board/store";
import { fetchNodesByBoardId } from "@/entities/node/api";
import { GravidotEdge, Shape } from "@/entities/node/model";
import { Controls } from "@/features/controls";
import { FloatingEdge } from "@/features/edge/ui";
import { CustomConnectionLine } from "@/features/edge/ui/CustomConnectionLine";
import { ShapeNodeComponent } from "@/features/node/ui/ShapeNode";
import { useDarkMode } from "@/shared/hooks/useDarkMode";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  ConnectionMode,
  MarkerType,
  MiniMap,
  OnSelectionChangeParams,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useShapeGestures } from "../hooks/useShapeGestures";
import { GestureMode } from "../types";
import { TouchPoint } from "./TouchPoint";

const LIGHT_MODE = "#dedede";
const DARK_MODE = "#363636";

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true, reconnectable: true },
];

const edgeTypes = { floating: FloatingEdge };

export function BoardPage() {
  const [mode, setMode] = useState<GestureMode>("shape");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [backgroundPattern, setBackgroundPattern] = useState<BackgroundVariant>(
    BackgroundVariant.Dots
  );

  const divBoardRef = useRef<HTMLDivElement>(null);
  const boardId = useBoardStore.getState().id;

  const isDarkMode = useDarkMode();

  useEffect(() => {
    if (boardId) {
      fetchNodesByBoardId(boardId);
    }
  }, [boardId]);

  const {
    nodes,
    touchPoints,
    handlePaneDoubleClick,
    handleStoreDeleteHistory,
    onInit,
    onNodesChange,
    onDelete,
  } = useShapeGestures({
    isActive: mode === "shape",
    divBoardRef,
    selectedNodeId,
  });

  const onModeChange = () => {
    setMode((prev) => (prev === "board" ? "shape" : "board"));
  };

  const onSelectionChange = useCallback(
    ({ nodes: selectedNodes }: OnSelectionChangeParams) => {
      if (selectedNodes.length > 0) {
        setSelectedNodeId(selectedNodes[0].id);
      } else {
        setSelectedNodeId(null);
      }
    },
    []
  );

  const onPatternChange = () => {
    setBackgroundPattern((prev) =>
      prev === BackgroundVariant.Dots
        ? BackgroundVariant.Lines
        : BackgroundVariant.Dots
    );
  };

  const [edges, setEdges, onEdgesChange] =
    useEdgesState<GravidotEdge>(initialEdges);

  const nodeTypes = useMemo(
    () => ({
      shape: ({
        id,
        data,
        selected,
      }: {
        id: string;
        data: Shape;
        selected?: boolean;
      }) => {
        return (
          <ShapeNodeComponent
            id={id}
            data={data}
            selected={selected ?? false}
            onDelete={onDelete}
          />
        );
      },
    }),
    [onDelete]
  );

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const defaultEdgeOptions = {
    type: "floating",
    markerEnd: {
      type: MarkerType.Arrow,
      width: 20,
      height: 20,
      color: "#949494",
    },
    style: {
      stroke: "#949494",
    },
  };

  return (
    <div className="h-dvh w-dvw touch-none">
      <ReactFlowProvider>
        <TouchPoint touchPoints={touchPoints} />
        <Controls
          mode={mode}
          onModeChange={onModeChange}
          pattern={backgroundPattern}
          onPatternChange={onPatternChange}
        />
        <ReactFlow
          ref={divBoardRef}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineComponent={CustomConnectionLine}
          className="touch-flow"
          zoomOnDoubleClick={false}
          zoomOnPinch={mode === "board"}
          zoomOnScroll={mode === "board"}
          panOnDrag={mode === "board"}
          panOnScroll={mode === "board"}
          nodes={nodes}
          edges={edges}
          onlyRenderVisibleElements
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          connectionMode={ConnectionMode.Loose}
          onPaneClick={handlePaneDoubleClick}
          onSelectionChange={onSelectionChange}
          onInit={onInit}
          minZoom={0.2}
          maxZoom={3}
          proOptions={{ hideAttribution: true }}
          onBeforeDelete={handleStoreDeleteHistory}
        >
          <MiniMap
            pannable
            inversePan
            zoomable
            zoomStep={2}
            position="top-right"
            style={{ top: 50, width: 100, height: 100 }}
            nodeColor={isDarkMode ? "black" : "white"}
            bgColor={isDarkMode ? DARK_MODE : LIGHT_MODE}
            nodeBorderRadius={10}
          />
          <Background
            gap={24}
            size={3}
            lineWidth={0.5}
            bgColor="transparent"
            variant={backgroundPattern}
            color={isDarkMode ? DARK_MODE : LIGHT_MODE}
          />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

import { create } from "zustand";
import { GravidotNode, Shape } from "../model";

type NodesState = {
  nodes: GravidotNode[];
  addNode: (node: GravidotNode) => void;
  addAllNodes: (nodes: GravidotNode[]) => void;
  updateNode: (updatedNode: GravidotNode) => void;
  removeNode: (nodeId: string) => void;
  updateNodeShape: (nodeId: string, newContent: Partial<Shape>) => void;
  clearNode: () => void;
};

export const useNodesStore = create<NodesState>()((set) => ({
  nodes: [],
  addNode: (node: GravidotNode) => {
    set((state) => ({ nodes: [...state.nodes, node] }));
  },
  addAllNodes: (nodes: GravidotNode[]) => {
    set({ nodes });
  },
  updateNode: (updatedNode: GravidotNode) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === updatedNode.id ? { ...updatedNode } : { ...node }
      ),
    }));
  },
  removeNode: (nodeId: string) => {
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
    }));
  },
  updateNodeShape: (id, updates) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: { ...node.data, ...updates },
            }
          : { ...node }
      ),
    }));
  },
  clearNode: () => {
    set(() => ({
      nodes: [],
    }));
  },
}));

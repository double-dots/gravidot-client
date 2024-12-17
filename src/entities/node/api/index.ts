import { DBTable, supabase } from "@/shared/api/supabaseClient";
import log from "@/shared/log";
import { Position } from "../model";
import { Shape } from "../model/shape";
import { useNodesStore } from "../store";

const getCurrentTimestamp = () => new Date().toISOString();

export async function createNode(boardId: string, shape: Shape): Promise<void> {
  const now = getCurrentTimestamp();

  const { data: nodeData, error: nodeError } = await supabase
    .from(DBTable.DotNode)
    .insert([{ board_id: boardId, shape, created_at: now, updated_at: now }])
    .select("id")
    .maybeSingle();

  if (nodeError && nodeError.code !== "PGRST116") {
    throw new Error(`🚑 putNode Error: ${nodeError.message}`);
  }

  if (!nodeData) {
    throw new Error("🚑 putNode Error: Node data is null");
  }

  const newNode = { id: nodeData.id, boardId: boardId, shape: shape };

  useNodesStore.getState().addNode(newNode);
  log.info(`✅🎶 putNode: ${nodeData.id}`);
}

export const fetchNodesByBoardId = async (boardId: string): Promise<void> => {
  const { data, error } = await supabase
    .from(DBTable.DotNode)
    .select("id, shape")
    .eq("board_id", boardId);

  if (error) {
    useNodesStore.setState({ nodes: [] });
  }

  if (data) {
    useNodesStore.getState().addAllNodes(data);
    log.info(`✅🎶 Node fetched successfully: ${JSON.stringify(data)}`);
  }
};

export async function deleteNode(nodeId: string): Promise<void> {
  const { error } = await supabase
    .from(DBTable.DotNode)
    .delete()
    .eq("id", nodeId);

  if (error) {
    throw new Error(`🚑 deleteNode Error: ${error.message}`);
  }

  useNodesStore.getState().removeNode(nodeId);
  log.info(`✅🗑️ deleteNode: Node ${nodeId} deleted successfully`);
}

export async function updateNodeShape(
  nodeId: string,
  updates: Partial<{ position: Position; content: string }>
): Promise<void> {
  const { data: currentNode, error: fetchError } = await supabase
    .from(DBTable.DotNode)
    .select("shape")
    .eq("id", nodeId)
    .maybeSingle();

  if (fetchError) {
    throw new Error(`🚑 Fetch Node Error: ${fetchError.message}`);
  }

  if (!currentNode || !currentNode.shape) {
    throw new Error("🚑 Node or shape data is missing");
  }

  const updatedShape = {
    ...currentNode.shape,
    ...updates,
  };

  const { error: updateError } = await supabase
    .from(DBTable.DotNode)
    .update({ shape: updatedShape })
    .eq("id", nodeId);

  if (updateError) {
    throw new Error(`🚑 updateNodeShape Error: ${updateError.message}`);
  }

  useNodesStore.getState().updateNodeShape(nodeId, updates);
  log.info(`✅📍 Node ${nodeId} updated to: ${JSON.stringify(updates)}`);
}

import { Role } from "@/entities/user/model";
import { DBTable, supabase } from "@/shared/api/supabaseClient";
import log from "@/shared/log";
import { Board } from "../model";
import { useBoardStore } from "../store";

const getCurrentTimestamp = () => new Date().toISOString();

export async function fetchOrCreateBoard(
  userId: string,
  boardId?: string,
  boardName?: string
): Promise<Board> {
  if (boardId && boardName) {
    useBoardStore.setState({ id: boardId, name: boardName });
    log.info(`🔄 START TO GET: boardId=${boardId}, boardName=${boardName}`);

    const board = await fetchBoardById(boardId);

    if (board) {
      log.info(`✅📋 Board fetched successfully: ${board.id}`);
      useBoardStore.getState().updateBoard(board);
      return board;
    }
  }

  const newBoard = await createBoard(userId);
  useBoardStore.getState().updateBoard(newBoard);
  return newBoard;
}

async function createBoard(userId: string): Promise<Board> {
  const now = getCurrentTimestamp();
  const { id, name } = useBoardStore.getState();

  if (id) {
    log.info(`✅📋 Board already exists in storage: ${id}`);
    return { id, name };
  }

  const { data: boardData, error: boardError } = await supabase
    .from(DBTable.Board)
    .insert([{ name, created_at: now }])
    .select("id, name")
    .maybeSingle();

  if (boardError && boardError.code !== "PGRST116") {
    throw new Error(`🚑 createBoard Error: ${boardError.message}`);
  }

  if (!boardData) {
    throw new Error("🚑 createBoard Error: Board data is null");
  }

  log.info(`✅📋 createBoard: ${boardData.id}`);

  const { error: junctionError } = await supabase
    .from(DBTable.User_Board)
    .insert({
      user_id: userId,
      board_id: boardData.id,
      role: Role.Owner,
      created_at: now,
    });

  if (junctionError) {
    throw new Error(`🚑 createBoard Error: ${junctionError.message}`);
  }

  return boardData;
}

async function fetchBoardById(boardId: string): Promise<Board | null> {
  const { data, error } = await supabase
    .from(DBTable.Board)
    .select("id, name")
    .eq("id", boardId)
    .maybeSingle();

  if (error) {
    throw new Error(`🚑 fetchBoardById Error: ${error.message}`);
  }

  log.info(
    `✅📋 fetchBoardById: ${data ? JSON.stringify(data) : "No board found"}`
  );

  return data;
}

export async function updateBoard(boardId: string, board: Partial<Board>) {
  const { data, error } = await supabase
    .from(DBTable.Board)
    .update({ ...board, updated_at: getCurrentTimestamp() })
    .eq("id", boardId)
    .select("id, name")
    .single();

  if (error) {
    throw new Error(`🚑 updateBoard Error: ${error.message}`);
  }

  log.info(`✅📋 Board updated: ${JSON.stringify(data)}`);

  return data;
}

export async function fetchBoardsByUserId(
  userId: string
): Promise<Record<string, string>[]> {
  const { data, error } = await supabase
    .from(DBTable.User_Board)
    .select("board (id, name)")
    .eq("user_id", userId);

  if (error) {
    throw new Error(`🚑 fetchBoardsByUserId Error: ${error.message}`);
  }

  log.info(`✅📋 Boards fetched for userId=${userId}: ${JSON.stringify(data)}`);

  return data.flatMap((entry) => entry.board);
}

export async function addUserToBoardIfNotExists(
  userId: string,
  boardId: string
): Promise<void> {
  const { data: existingEntries, error: selectError } = await supabase
    .from(DBTable.User_Board)
    .select("user_id, board_id")
    .eq("user_id", userId)
    .eq("board_id", boardId);

  if (selectError) {
    throw new Error(`🚑 Select Error: ${selectError.message}`);
  }

  if (existingEntries && existingEntries.length > 0) {
    log.info(
      `✅📋😃 User ${userId} is already associated with board ${boardId}`
    );
    return;
  }

  const { error: insertError } = await supabase
    .from(DBTable.User_Board)
    .upsert([{ user_id: userId, board_id: boardId, role: Role.Editor }]);

  if (insertError) {
    throw new Error(`🚑 User Upsert Error: ${insertError.message}`);
  }

  log.info(`✅📋😃 User ${userId} successfully added to board ${boardId}`);
}

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Board } from "../model";

type BoardState = Board & {
  updateBoard: (boardData: Partial<Board>) => void;
  setName: (name: string) => void;
  clearBoard: () => void;
};

const initialBoardState = {
  name: "Untitled",
};

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      ...initialBoardState,

      updateBoard: (boardData: Partial<Board>) => {
        set((state) => ({
          ...state,
          ...boardData,
        }));
      },

      setName: (name) => {
        set((state) => ({
          ...state,
          name,
        }));
      },

      clearBoard: () => {
        set(() => ({
          id: undefined,
          ...initialBoardState,
        }));
      },
    }),
    {
      name: "board-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

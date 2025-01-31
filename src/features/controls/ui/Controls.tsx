import { GestureMode } from "@/views/board/types";
import { BackgroundVariant } from "@xyflow/react";
import BackgroundPatternToggle from "./BackgroundPatternToggle";
import { BoardController } from "./BoardController";
import { DeleteAllCacheButton } from "./DeleteAllCacheButton";
import EditingToggle from "./EditingToggle";
import { NameController } from "./NameController";

export function Controls({
  mode,
  onModeChange,
  pattern,
  onPatternChange,
}: {
  mode: GestureMode;
  onModeChange: (mode: GestureMode) => void;
  pattern: BackgroundVariant;
  onPatternChange: (pattern: BackgroundVariant) => void;
}) {
  return (
    <>
      <div className="fixed left-0 top-0 z-50 m-4 flex flex-row gap-1 rounded-2xl border border-neutral-200 bg-white py-2 pl-3 pr-4 text-xs drop-shadow-2xl dark:border-zinc-700 dark:bg-black">
        <BoardController />
        <NameController />
      </div>

      <div className="fixed right-0 top-0 z-50 m-4 flex flex-row gap-2 rounded-2xl border border-neutral-200 bg-white px-3 py-2 text-xs drop-shadow-2xl dark:border-zinc-700 dark:bg-black">
        <BackgroundPatternToggle
          pattern={pattern}
          onPatternChange={onPatternChange}
        />
        <EditingToggle mode={mode} onModeChange={onModeChange} />
        <div className="mx-1 h-4 w-1 bg-neutral-200 dark:bg-neutral-500"></div>
        <DeleteAllCacheButton />
      </div>
    </>
  );
}

import { CircleIcon } from "@/shared/ui/CircleIcon";
import { ControlButton } from "@/shared/ui/ControlButton";
import { LineIcon } from "@/shared/ui/LineIcon";
import { BackgroundVariant } from "@xyflow/react";

export default function BackgroundPatternToggle({
  pattern,
  onPatternChange,
}: {
  pattern: BackgroundVariant;
  onPatternChange: (pattern: BackgroundVariant) => void;
}) {
  return (
    <div className="z-20 flex items-center text-black dark:text-white">
      <ControlButton onClick={() => onPatternChange(pattern)}>
        {pattern === BackgroundVariant.Dots ? <CircleIcon /> : <LineIcon />}
      </ControlButton>
    </div>
  );
}

import { Shape } from "@/entities/node/model";
import { useDarkMode } from "@/shared/hooks/useDarkMode";
import { AutoResizeInput } from "@/shared/ui/AutoResizeInput";
import { DeleteButton } from "@/shared/ui/DeleteButton";
import { darkenColor } from "@/shared/utils/darkenColor";
import { Handle, Position, useConnection } from "@xyflow/react";
import { useMemo, useState } from "react";
import { SvgShape } from "./SvgShape";

export function ShapeNodeComponent({
  id,
  data: { type, content, size, color, scale, rotation },
  selected,
  onDelete,
}: {
  id: string;
  data: Shape;
  selected: boolean;
  onDelete: (nodeId: string) => void;
}) {
  const connection = useConnection();
  const isTarget = connection.inProgress && connection.fromNode.id !== id;

  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);
  const [text, setText] = useState(content);

  const isDarkMode = useDarkMode();

  const toggleDeleteButton = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();

    setIsDeleteButtonVisible((prevState) => !prevState);
  };

  const handleDelete = () => isDeleteButtonVisible && onDelete(id);

  const style = {
    width: size.w,
    height: size.h,
    color: color.fill,
    darkenColor: darkenColor(color.fill, isDarkMode),
  };

  const transformStyle = useMemo(
    () => ({
      transform: `rotate(${rotation}deg) scale(${scale})`,
    }),
    [rotation, scale]
  );

  return (
    <div
      className={`${isDeleteButtonVisible && "animate-wiggle"} ${isTarget && "animate-sparkle"} relative will-change-transform`}
      style={{
        ...style,
        transform: transformStyle.transform,
      }}
      onDoubleClick={toggleDeleteButton}
    >
      <SvgShape type={type} style={style} selected={selected} />
      {!connection.inProgress && (
        <Handle
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "50px",
            height: "80%",
            transform: "translate(-50%, -50%)",
            borderRadius: 0,
            border: "none",
            backgroundColor: "black",
            opacity: 0,
          }}
          position={Position.Right}
          type="source"
        />
      )}
      {(!connection.inProgress || isTarget) && (
        <Handle
          style={{
            overflow: "hidden",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "50px",
            height: "80%",
            borderRadius: 0,
            border: "none",
            backgroundColor: "black",
            opacity: 0,
          }}
          position={Position.Left}
          type="target"
          isConnectableStart={false}
        />
      )}
      <AutoResizeInput
        content={text}
        width={size.w}
        height={size.h}
        setContent={setText}
      />
      {isDeleteButtonVisible && (
        <DeleteButton
          onClick={handleDelete}
          className="color-red absolute -right-2 -top-2"
        />
      )}
    </div>
  );
}

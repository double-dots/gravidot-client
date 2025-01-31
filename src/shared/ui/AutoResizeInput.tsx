import { useCallback, useRef } from "react";

interface AutoResizeInputProps {
  content: string;
  width: number;
  height: number;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

export function AutoResizeInput({
  content,
  width,
  height,
  setContent,
}: AutoResizeInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, []);

  return (
    <input
      ref={inputRef}
      value={content}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
      }}
      onPointerDown={(event: React.MouseEvent | React.TouchEvent) => {
        event.stopPropagation();
      }}
      onPointerMove={(event: React.MouseEvent | React.TouchEvent) => {
        event.stopPropagation();
      }}
      onPointerUp={(event: React.MouseEvent | React.TouchEvent) => {
        event.stopPropagation();
      }}
      onDoubleClick={(event: React.MouseEvent | React.TouchEvent) => {
        event.stopPropagation();
      }}
      onDrag={(event: React.MouseEvent | React.TouchEvent) => {
        event.stopPropagation();
      }}
      className="spellchecker:words absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform cursor-text resize-none overflow-hidden bg-transparent py-2 text-center text-base text-black focus:outline-none"
      style={{
        width: width - 16,
        maxHeight: height - 16,
      }}
      onInput={handleInput}
    />
  );
}

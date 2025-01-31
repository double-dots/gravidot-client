const LIGHT_MODE = "#606060";
const DARK_MODE = "#d4d4d4";

export function TouchPoint({
  touchPoints,
}: {
  touchPoints: { x: number; y: number }[];
}) {
  return (
    <svg
      className="absolute left-0 top-0 z-50 h-dvh w-dvw"
      style={{ pointerEvents: "none" }}
    >
      {touchPoints.map((point, index) => (
        <g key={index} className="mix-blend-multiply">
          <circle
            cx={point.x}
            cy={point.y}
            r={35}
            fill="none"
            stroke={LIGHT_MODE}
            strokeWidth={5}
            strokeOpacity={0.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              stroke: window.matchMedia("(prefers-color-scheme: dark)").matches
                ? DARK_MODE
                : LIGHT_MODE,
            }}
          />
          <text
            x={point.x}
            y={point.y - 50}
            textAnchor="middle"
            fill={LIGHT_MODE}
            fillOpacity={0.8}
            fontSize="14px"
            style={{
              fill: window.matchMedia("(prefers-color-scheme: dark)").matches
                ? DARK_MODE
                : LIGHT_MODE,
            }}
          >
            {`#${index + 1}`}
          </text>
        </g>
      ))}
    </svg>
  );
}

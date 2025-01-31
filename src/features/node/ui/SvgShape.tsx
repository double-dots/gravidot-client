import { ShapeType } from "@/entities/node/model";

const strokeWidth = 1;

interface SvgProps {
  width: number;
  height: number;
  color: string;
  darkenColor: string;
}

const shapeComponentMap: Record<
  ShapeType,
  React.FC<SvgProps & { strokeWidth: number }>
> = {
  circle: SvgEllipse,
  roundRectangle: SvgRoundRectangle,
  rectangle: SvgRectangle,
  pentagon: SvgPentagon,
  hexagon: SvgHexagon,
  arrowRectangle: SvgArrowRectangle,
  cylinder: SvgCylinder,
  triangle: SvgTriangle,
  parallelogram: SvgParallelogram,
  star: SvgStar,
  plus: SvgPlus,
};

export function SvgShape({
  type,
  style,
  selected,
}: {
  type: ShapeType;
  style: SvgProps;
  selected: boolean;
}) {
  const ShapeComponent = shapeComponentMap[type];

  if (!ShapeComponent) {
    return null;
  }

  const strokeWidthWithSelected = selected ? strokeWidth * 3 : strokeWidth;

  return <ShapeComponent {...style} strokeWidth={strokeWidthWithSelected} />;
}

function SvgEllipse({
  width,
  height,
  color,
  darkenColor,
  strokeWidth,
}: SvgProps & { strokeWidth: number }) {
  const wRadius = width / 2;
  const hRadius = height / 2;

  return (
    <svg width={width} height={height}>
      <g>
        <ellipse
          cx={wRadius}
          cy={hRadius}
          rx={Math.min(wRadius, hRadius)}
          ry={Math.min(wRadius, hRadius)}
          fill={color}
          fillOpacity="0.8"
        />
        <ellipse
          cx={wRadius}
          cy={hRadius}
          rx={Math.min(wRadius, hRadius) - strokeWidth / 2}
          ry={Math.min(wRadius, hRadius) - strokeWidth / 2}
          stroke={darkenColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
      </g>
    </svg>
  );
}

function SvgRoundRectangle({
  width,
  height,
  color,
  strokeWidth,
  darkenColor,
}: SvgProps & { strokeWidth: number }) {
  const innerOffset = strokeWidth / 2;
  const adjustedWidth = width - strokeWidth;
  const adjustedHeight = height - strokeWidth;

  return (
    <svg width={width} height={height}>
      <g>
        <rect
          x="0"
          y="0"
          rx="14"
          width={width}
          height={height}
          fill={color}
          fillOpacity="0.8"
        />
        <rect
          x={innerOffset}
          y={innerOffset}
          rx="14"
          width={adjustedWidth}
          height={adjustedHeight}
          fill="none"
          stroke={darkenColor}
          strokeWidth={strokeWidth}
        />
      </g>
    </svg>
  );
}

function SvgRectangle({
  width,
  height,
  color,
  strokeWidth,
  darkenColor,
}: SvgProps & { strokeWidth: number }) {
  return (
    <svg width={width} height={height}>
      <g>
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill={color}
          fillOpacity="0.8"
        />
        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={width - strokeWidth}
          height={height - strokeWidth}
          fill="none"
          stroke={darkenColor}
          strokeWidth={strokeWidth}
        />
      </g>
    </svg>
  );
}

function calculatePolygonPoints(
  sides: number,
  width: number,
  height: number
): string {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2;
  const angle = (2 * Math.PI) / sides;

  return Array.from({ length: sides })
    .map((_, i) => {
      const x = centerX + radius * Math.cos(i * angle - Math.PI / 2);
      const y = centerY + radius * Math.sin(i * angle - Math.PI / 2);
      return `${x},${y}`;
    })
    .join(" ");
}

export function SvgPentagon({
  width,
  height,
  color,
  strokeWidth,
  darkenColor,
}: SvgProps & { strokeWidth: number }) {
  const points = calculatePolygonPoints(5, width, height);

  return (
    <svg width={width} height={height}>
      <polygon points={points} fill={color} fillOpacity="0.8" />
      <polygon
        points={points}
        fill="none"
        stroke={darkenColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

function SvgHexagon({
  width,
  height,
  color,
  strokeWidth,
  darkenColor,
}: SvgProps & { strokeWidth: number }) {
  const calculateHexagonPath = (width: number, height: number): string => {
    const w = width / 2;
    const h = height / 2;

    return `
      M${w - strokeWidth},${strokeWidth}
      L${width - strokeWidth},${h / 2}
      L${width - strokeWidth},${h + h / 2}
      L${w},${height - strokeWidth}
      L${strokeWidth},${h + h / 2}
      L${strokeWidth},${h / 2}
      Z
    `;
  };

  const path = calculateHexagonPath(width, height);

  return (
    <svg width={width} height={height}>
      <g>
        <path
          d={path}
          fill={color}
          strokeWidth={strokeWidth}
          stroke={darkenColor}
          fillOpacity="0.8"
        ></path>
      </g>
    </svg>
  );
}

function SvgArrowRectangle({
  width,
  height,
  color,
  darkenColor,
  strokeWidth,
}: SvgProps & { strokeWidth: number }) {
  const calculateArrowPath = (width: number, height: number): string => {
    const arrowHeadWidth = width * 0.2;
    const arrowBodyWidth = width - arrowHeadWidth;

    return `
      M${strokeWidth},${strokeWidth}
      L${arrowBodyWidth},${strokeWidth}
      L${width - strokeWidth},${height / 2}
      L${arrowBodyWidth},${height - strokeWidth}
      L${strokeWidth},${height - strokeWidth}
      Z
    `;
  };

  const path = calculateArrowPath(width, height);

  return (
    <svg width={width} height={height}>
      <g>
        <path
          d={path}
          fill={color}
          strokeWidth={strokeWidth}
          stroke={darkenColor}
          fillOpacity="0.8"
        ></path>
      </g>
    </svg>
  );
}

function SvgCylinder({
  width,
  height,
  color,
  darkenColor,
  strokeWidth,
}: SvgProps & { strokeWidth: number }) {
  const calculateCylinderPath = (width: number, height: number): string => {
    const rx = width / 2;
    const ry = height * 0.1;
    const topY = ry;
    const bottomY = height - ry;

    return `
      M${strokeWidth},${topY} 
      L${strokeWidth},${bottomY} 
      A${rx - strokeWidth} ${ry - strokeWidth} 0 1 0 ${width - strokeWidth},${bottomY - strokeWidth} 
      L${width - strokeWidth},${topY} 
      A${rx - strokeWidth} ${ry - strokeWidth} 0 1 1 ${strokeWidth},${topY + strokeWidth} 
      Z
    `;
  };

  const calculateTopEllipsePath = (width: number, height: number): string => {
    const rx = width / 2;
    const ry = height * 0.1;
    const topY = ry;

    return `
    M${strokeWidth},${topY + strokeWidth}
    A${rx - strokeWidth} ${ry - strokeWidth} 0 1 1 ${width - strokeWidth},${topY}
    A${rx - strokeWidth} ${ry - strokeWidth} 0 1 1 ${strokeWidth},${topY + strokeWidth}
    Z
  `;
  };

  const cylinderPath = calculateCylinderPath(width, height);
  const topEllipsePath = calculateTopEllipsePath(width, height);

  return (
    <svg width={width} height={height}>
      <g>
        <path d={cylinderPath} fill={color} fillOpacity="0.8" />
        <path
          d={cylinderPath}
          fill="none"
          stroke={darkenColor}
          strokeWidth={strokeWidth}
        />
        <path d={topEllipsePath} fill={color} fillOpacity="0.8" />
        <path
          d={topEllipsePath}
          fill="none"
          stroke={darkenColor}
          strokeWidth={strokeWidth}
        />
      </g>
    </svg>
  );
}

function SvgTriangle({
  width,
  height,
  color,
  darkenColor,
  strokeWidth,
}: SvgProps & { strokeWidth: number }) {
  const points = `
    ${strokeWidth},${height - strokeWidth} 
    ${width / 2},${strokeWidth} 
    ${width - strokeWidth},${height - strokeWidth}
  `;

  return (
    <svg width={width} height={height}>
      <g>
        <polygon points={points} fill={color} fillOpacity="0.8" />

        <polygon
          points={points}
          fill="none"
          stroke={darkenColor}
          strokeWidth={strokeWidth}
        />
      </g>
    </svg>
  );
}

function SvgParallelogram({
  width,
  height,
  color,
  darkenColor,
  strokeWidth,
}: SvgProps & { strokeWidth: number }) {
  const offset = width * 0.25;

  const pathD = `
    M${strokeWidth},${height - strokeWidth} 
    L${offset},${strokeWidth} 
    L${width - strokeWidth},${strokeWidth}
    L${width - offset},${height - strokeWidth} 
    Z
  `;

  return (
    <svg width={width} height={height}>
      <g>
        <path
          d={pathD}
          fill={color}
          strokeWidth={strokeWidth}
          stroke={darkenColor}
          fillOpacity="0.8"
        ></path>
      </g>
    </svg>
  );
}

function SvgStar({
  width,
  height,
  color,
  darkenColor,
  strokeWidth,
}: SvgProps & { strokeWidth: number }) {
  const points = 5;
  const outerRadius = Math.min(width, height) / 2;
  const innerRadius = outerRadius * 0.5;
  const centerX = width / 2;
  const centerY = height / 2;

  const pathData = Array.from({ length: points * 2 })
    .map((_, i) => {
      const angle = (Math.PI / points) * i;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = centerX + radius * Math.cos(angle - Math.PI / 2);
      const y = centerY + radius * Math.sin(angle - Math.PI / 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height}>
      <polygon
        points={pathData}
        fill={color}
        stroke={darkenColor}
        strokeWidth={strokeWidth}
        fillOpacity="0.8"
      />
    </svg>
  );
}

export function SvgPlus({
  width,
  height,
  color,
  darkenColor,
  strokeWidth,
}: SvgProps & { strokeWidth: number }) {
  const calculatePlusPath = (width: number, height: number): string => {
    const horizontalBarHeight = height * 0.3;
    const verticalBarWidth = width * 0.3;
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    return `
      M${halfWidth - verticalBarWidth / 2},${strokeWidth}
      L${halfWidth + verticalBarWidth / 2},${strokeWidth}
      L${halfWidth + verticalBarWidth / 2},${halfHeight - horizontalBarHeight / 2}
      L${width - strokeWidth},${halfHeight - horizontalBarHeight / 2}
      L${width - strokeWidth},${halfHeight + horizontalBarHeight / 2}
      L${halfWidth + verticalBarWidth / 2},${halfHeight + horizontalBarHeight / 2}
      L${halfWidth + verticalBarWidth / 2},${height - strokeWidth}
      L${halfWidth - verticalBarWidth / 2},${height - strokeWidth}
      L${halfWidth - verticalBarWidth / 2},${halfHeight + horizontalBarHeight / 2}
      L${strokeWidth},${halfHeight + horizontalBarHeight / 2}
      L${strokeWidth},${halfHeight - horizontalBarHeight / 2}
      L${halfWidth - verticalBarWidth / 2},${halfHeight - horizontalBarHeight / 2}
      Z
    `;
  };

  const path = calculatePlusPath(width, height);

  return (
    <svg width={width} height={height}>
      <g>
        <path d={path} fill={color} fillOpacity="0.8" />
        <path
          d={path}
          fill="none"
          stroke={darkenColor}
          strokeWidth={strokeWidth}
        />
      </g>
    </svg>
  );
}

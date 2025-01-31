export interface GravidotNode {
  id: string;
  type: string;
  position: Position;
  measured?: { width: number; height: number };
  internals: {
    positionAbsolute: Position;
  };
  data: Shape;
}

export interface Shape {
  [key: string]: unknown;
  type: ShapeType;
  content: string;
  size: Size;
  color: Color;
  scale: number;
  rotation: number;
}

export interface GravidotEdge {
  id: string;
  source: string;
  target: string;
  reconnectable: boolean;
  animated: boolean;
}

export const ColorType = {
  red: { fill: "rgb(255, 135, 120)" },
  yellow: { fill: "rgb(255, 240, 140)" },
  blue: { fill: "rgb(170, 235, 240)" },
  skyBlue: { fill: "rgb(115, 195, 255)" },
  lime: { fill: "rgb(215, 255, 165)" },
  pink: { fill: "rgb(255, 180, 215)" },
  purple: { fill: "rgb(200, 200, 250)" },
  brown: { fill: "rgb(158, 122, 104)" },
  transparent: { fill: "rgba(230, 230, 230, 0.25)" },
} as const;

export type Color = (typeof ColorType)[keyof typeof ColorType];

export const ShapeTypeConst = {
  circle: "circle",
  roundRectangle: "roundRectangle",
  rectangle: "rectangle",
  pentagon: "pentagon",
  hexagon: "hexagon",
  arrowRectangle: "arrowRectangle",
  cylinder: "cylinder",
  triangle: "triangle",
  parallelogram: "parallelogram",
  star: "star",
  plus: "plus",
} as const;

export type ShapeType = (typeof ShapeTypeConst)[keyof typeof ShapeTypeConst];

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  w: number;
  h: number;
}

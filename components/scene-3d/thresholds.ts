import { Transformation } from "./transformation";

type Threshold = {
  from: number;
  to: number;
  transformations: Transformation[];
};

export const thresholds: Threshold[] = [
  {
    from: 0,
    to: 0.25,
    transformations: [
      {
        object: "blueBall",
        type: "scale",
        from: { value: 1 },
        to: { value: 0.1 },
      },
      {
        object: "blueBall",
        type: "translate",
        from: { value: { x: 0, y: 0, z: 3 } },
        to: { value: { x: -1, y: -1, z: 2 } },
      },
      {
        object: "redBall",
        type: "scale",
        from: { value: 1 },
        to: { value: 0.1 },
      },
    ],
  },
  {
    from: 0.25,
    to: 0.75,
    transformations: [
      {
        object: "blueBall",
        type: "translate",
        from: { value: { x: -1, y: -1, z: 2 } },
        to: { value: { x: -3, y: -1, z: 2 } },
      },
    ],
  },
];

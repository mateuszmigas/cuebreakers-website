import { Transformation } from "./transformation";

type Threshold = {
  from: number;
  to: number;
  transformations: Transformation[];
};

const tableHeight = 1.45;
export const thresholds: Threshold[] = [
  {
    from: 0,
    to: 0.25,
    transformations: [
      {
        object: "whiteBall",
        type: "position",
        from: { value: { x: 0, y: tableHeight, z: 0 } },
        to: { value: { x: 0, y: tableHeight, z: 0 } },
      },
      {
        object: "whiteBall",
        type: "scale",
        from: { value: 0.1 },
        to: { value: 0.1 },
      },
      {
        object: "camera",
        type: "position",
        from: { value: { x: 6, y: 3, z: 0 } },
        to: { value: { x: 0.5, y: 2, z: 0.25 } },
      },
      {
        object: "camera",
        type: "lookAt",
        from: { value: { x: 0, y: tableHeight, z: 0 } },
        to: { value: { x: 0, y: tableHeight + 0.2, z: 0 } },
      },
      {
        object: "blueBall",
        type: "scale",
        from: { value: 1 },
        to: { value: 0.1 },
      },
      {
        object: "blueBall",
        type: "position",
        from: { value: { x: 0, y: 2 * tableHeight, z: 0 } },
        to: { value: { x: -2.5, y: tableHeight, z: -1.2 } },
      },
    ],
  },
  {
    from: 0.25,
    to: 0.5,
    transformations: [
      {
        object: "whiteBall",
        type: "position",
        from: { value: { x: 0, y: tableHeight, z: 0 } },
        to: { value: { x: -2.5, y: tableHeight, z: -1.2 } },
      },
      {
        object: "camera",
        type: "lookAt",
        from: { value: { x: 0, y: tableHeight + 0.2, z: 0 } },
        to: { value: { x: -2.5, y: tableHeight + 0.2, z: -1.2 } },
      },
      {
        object: "camera",
        type: "position",
        from: { value: { x: 0.5, y: 2, z: 0.25 } },
        to: { value: { x: -2, y: 2, z: 0.25 - 1.2 } },
      },
      // {
      //   object: "blueBall",
      //   type: "position",
      //   from:{ x: -2.5, y: tableHeight, z: -1.2 } },
      //   to: { value: { x: 3, y: tableHeight, z: 0 } },
      // },
    ],
  },
];

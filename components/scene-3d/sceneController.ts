import { TransformedObject } from "./transformedObject";

export type SceneController = {
  render: () => void;
  objects: Record<TransformedObject, THREE.Object3D>;
  dispose: () => void;
};

import { SceneController } from "./sceneController";
import { TransformedObject } from "./transformedObject";

type Vector3 = { x: number; y: number; z: number };

export type Transformation = { object: TransformedObject } & (
  | {
      type: "scale";
      from: { value: number };
      to: { value: number };
    }
  | {
      type: "translate";
      from: { value: Vector3 };
      to: { value: Vector3 };
    }
);

export const applyTransformations = (
  objects: SceneController["objects"],
  transformations: Transformation[],
  progress: number
) => {
  transformations.forEach(t => {
    if (t.type === "scale") {
      const object = objects[t.object];
      const newScale = t.from.value + (t.to.value - t.from.value) * progress;
      object.scale.x = newScale;
      object.scale.y = newScale;
      object.scale.z = newScale;
    }
    if (t.type === "translate") {
      const object = objects[t.object];
      console.log("apply translate");

      object.position.x =
        t.from.value.x + (t.to.value.x - t.from.value.x) * progress;
      object.position.y =
        t.from.value.y + (t.to.value.y - t.from.value.y) * progress;
      object.position.z =
        t.from.value.z + (t.to.value.z - t.from.value.z) * progress;
    }
  });
};

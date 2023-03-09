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
      type: "position";
      from: { value: Vector3 };
      to: { value: Vector3 };
    }
  | {
      type: "lookAt";
      from: { value: Vector3 };
      to: { value: Vector3 };
    }
);

export const applyTransformation = (
  objects: SceneController["objects"],
  transformation: Transformation,
  progress: number
) => {
  if (transformation.type === "scale") {
    const object = objects[transformation.object];
    const newScale =
      transformation.from.value +
      (transformation.to.value - transformation.from.value) * progress;
    object.scale.x = newScale;
    object.scale.y = newScale;
    object.scale.z = newScale;
  }
  if (transformation.type === "position") {
    const object = objects[transformation.object];
    object.position.set(
      transformation.from.value.x +
        (transformation.to.value.x - transformation.from.value.x) * progress,
      transformation.from.value.y +
        (transformation.to.value.y - transformation.from.value.y) * progress,
      transformation.from.value.z +
        (transformation.to.value.z - transformation.from.value.z) * progress
    );
  }
  if (transformation.type === "lookAt") {
    const object = objects[transformation.object];
    object.lookAt(
      transformation.from.value.x +
        (transformation.to.value.x - transformation.from.value.x) * progress,
      transformation.from.value.y +
        (transformation.to.value.y - transformation.from.value.y) * progress,
      transformation.from.value.z +
        (transformation.to.value.z - transformation.from.value.z) * progress
    );
  }
};

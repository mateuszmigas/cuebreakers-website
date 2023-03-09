import { useEffect, useRef } from "react";
import { createScene } from "./scene-3d/createScene";
import { SceneController } from "./scene-3d/sceneController";
import { TransformedObject } from "./scene-3d/transformedObject";

type Vector3 = { x: number; y: number; z: number };

type Transformation = { object: TransformedObject } & (
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

type Threshold = {
  from: number;
  to: number;
  transformations: Transformation[];
};

const transformations: Threshold[] = [
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

export const MainSectionNew = (props: { pageProgress: number }) => {
  const htmlRef = useRef<HTMLDivElement>(null);
  const sceneControllerRef = useRef<SceneController | null>(null);
  const currentThreshold = transformations.find(
    t => t.from <= props.pageProgress && t.to > props.pageProgress
  );

  useEffect(() => {
    if (!htmlRef.current) {
      return;
    }

    sceneControllerRef.current = createScene(htmlRef.current);
  }, []);

  useEffect(() => {
    if (!sceneControllerRef.current || !currentThreshold) return;

    const { render, objects } = sceneControllerRef.current;
    const thresholdDistance = currentThreshold.to - currentThreshold.from;
    const progressInThreshold = props.pageProgress - currentThreshold.from;
    const percentage = progressInThreshold / thresholdDistance;

    currentThreshold.transformations.forEach(t => {
      if (t.type === "scale") {
        const object = objects[t.object];
        const newScale =
          t.from.value + (t.to.value - t.from.value) * percentage;
        object.scale.x = newScale;
        object.scale.y = newScale;
        object.scale.z = newScale;
      }
      if (t.type === "translate") {
        const object = objects[t.object];
        console.log("apply translate");

        object.position.x =
          t.from.value.x + (t.to.value.x - t.from.value.x) * percentage;
        object.position.y =
          t.from.value.y + (t.to.value.y - t.from.value.y) * percentage;
        object.position.z =
          t.from.value.z + (t.to.value.z - t.from.value.z) * percentage;
      }
    });

    render();
  }, [currentThreshold, props.pageProgress]);

  return (
    <div
      ref={htmlRef}
      style={{ zIndex: 3 }}
      className={`absolute flex h-screen w-full flex-col border-2 border-red-400 text-fuchsia-500`}
    ></div>
  );
};

export const MainSection = MainSectionNew;

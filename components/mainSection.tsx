import { useEffect, useRef } from "react";
import { createScene } from "./scene-3d/createScene";
import { SceneController } from "./scene-3d/sceneController";
import { TransformedObject } from "./scene-3d/transformedObject";

type Threshold = {
  from: number;
  to: number;
  transformations: {
    object: TransformedObject;
    type: "scale" | "translate";
    from: { value: number };
    to: { value: number };
  }[];
};

const transformations: Threshold[] = [
  {
    from: 0,
    to: 0.25,
    transformations: [
      {
        object: "redBall",
        type: "scale",
        from: { value: 1 },
        to: { value: 2 },
      },
    ],
  },
  {
    from: 0.25,
    to: 0.5,
    transformations: [],
  },
];

export const MainSectionNew = (props: { pageProgress: number }) => {
  const htmlRef = useRef<HTMLDivElement>(null);
  const sceneControllerRef = useRef<SceneController | null>(null);

  console.log("pageProgress", props.pageProgress);
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
    if (!sceneControllerRef.current) return;

    const { render, objects } = sceneControllerRef.current;
    const newScale = Math.max(1 - props.pageProgress, 0.1);
    objects.blueBall.scale.x = newScale;
    objects.blueBall.scale.y = newScale;
    objects.blueBall.scale.z = newScale;
    console.log("updagint");

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

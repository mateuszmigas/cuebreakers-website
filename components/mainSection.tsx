import { useEffect, useRef } from "react";
import { createScene } from "./scene-3d/createScene";
import { SceneController } from "./scene-3d/sceneController";
import { thresholds } from "./scene-3d/thresholds";
import { applyTransformations } from "./scene-3d/transformation";

export const MainSectionNew = (props: { pageProgress: number }) => {
  const htmlRef = useRef<HTMLDivElement>(null);
  const sceneControllerRef = useRef<SceneController | null>(null);
  const currentThreshold = thresholds.find(
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
    const progress = progressInThreshold / thresholdDistance;
    applyTransformations(objects, currentThreshold.transformations, progress);
    render();
  }, [currentThreshold, props.pageProgress]);

  return (
    <div
      ref={htmlRef}
      style={{ zIndex: 3 }}
      className={`absolute flex h-full w-full flex-col border-2 border-red-400 text-fuchsia-500`}
    ></div>
  );
};

export const MainSection = MainSectionNew;

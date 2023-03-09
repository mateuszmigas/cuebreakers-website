import { useCallback, useEffect, useRef } from "react";
import { createScene } from "./scene-3d/createScene";
import { SceneController } from "./scene-3d/sceneController";
import { thresholds } from "./scene-3d/defaults";
import { applyTransformation } from "./scene-3d/transformation";

export const MainSectionNew = (props: {
  containerRef: React.RefObject<HTMLElement>;
}) => {
  const parentRef = props.containerRef;
  const elementRef = useRef<HTMLDivElement>(null);
  console.log("rendering main section");
  const sceneControllerRef = useRef<SceneController | null>(null);

  useEffect(() => {
    const parentElement = parentRef.current;
    if (!parentElement || !elementRef.current) return;

    const calculateScroll = () => {
      const total = parentElement.scrollHeight - parentElement.clientHeight;
      const pageProgress = parentElement.scrollTop / total;
      const currentThreshold = thresholds.find(
        t => t.from <= pageProgress && t.to > pageProgress
      );

      if (!sceneControllerRef.current || !currentThreshold) return;
      const { render, objects } = sceneControllerRef.current;
      const thresholdDistance = currentThreshold.to - currentThreshold.from;
      const progressInThreshold = pageProgress - currentThreshold.from;
      const progress = progressInThreshold / thresholdDistance;
      currentThreshold.transformations.forEach(transformation =>
        applyTransformation(objects, transformation, progress)
      );
      render();
    };

    sceneControllerRef.current = createScene(elementRef.current);
    const element = parentRef.current;
    element.addEventListener("scroll", calculateScroll, { passive: true });
    calculateScroll();

    return () => {
      element.removeEventListener("scroll", calculateScroll);
    };
  }, [parentRef]);

  return (
    <div
      ref={elementRef}
      style={{ zIndex: 3 }}
      className={`absolute flex h-full w-full flex-col overflow-hidden border-2 border-red-400 text-fuchsia-500`}
    ></div>
  );
};

export const MainSection = MainSectionNew;

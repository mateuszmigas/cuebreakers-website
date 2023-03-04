import { useCallback, useState } from "react";
import { useParallax } from "react-scroll-parallax";

const defaultHeight = "h-screen";

export const MainSection = () => {
  const [progress, setProgress] = useState(0);
  const { ref } = useParallax<HTMLDivElement>({
    onProgressChange: setProgress,
  });

  const normalizedProgress = (progress - 0.5) * 2;
  const scale = 1 - 0.9 * normalizedProgress;

  const transformRed = `translate3d(${-normalizedProgress * 100}px, ${
    normalizedProgress * 50
  }px, 0) scale(${scale})`;
  const transformBlue = `translate3d(${-normalizedProgress * 250}px, ${
    normalizedProgress * 0
  }px, 0) scale(${scale})`;
  const transformYellow = `translate3d(${-normalizedProgress * 400}px, ${
    normalizedProgress * 100
  }px, 0) scale(${scale})`;

  return (
    <div
      ref={ref}
      style={{ zIndex: 3 }}
      className={`${defaultHeight} sticky top-0 flex w-full flex-col items-center justify-center border-2 border-red-400`}
    >
      <div className="flex h-[400px] w-[800px] flex-col items-center justify-center gap-10 ">
        <div className="flex flex-row">
          <svg style={{ transform: transformRed }} height="200" width="200">
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="black"
              strokeWidth="3"
              fill="red"
            />
          </svg>
          <svg style={{ transform: transformBlue }} height="200" width="200">
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="black"
              strokeWidth="3"
              fill="blue"
            />
          </svg>
          <svg style={{ transform: transformYellow }} height="200" width="200">
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="black"
              strokeWidth="3"
              fill="yellow"
            />
          </svg>
        </div>
        <div
          style={{ opacity: 1 - normalizedProgress }}
          className="text-6xl text-white"
        >
          CUE BREAKERS
        </div>
      </div>
    </div>
  );
};

import { useCallback, useState } from "react";

const defaultHeight = "h-screen";

export const MainSection = (props: { pageProgress: number }) => {
  const { pageProgress } = props;

  const scale = 1 - 0.9 * pageProgress;

  const transformRed = `translate3d(${-pageProgress * 100}px, ${
    pageProgress * 50
  }px, 0) scale(${scale})`;
  const transformBlue = `translate3d(${-pageProgress * 250}px, ${
    pageProgress * 0
  }px, 0) scale(${scale})`;
  const transformYellow = `translate3d(${-pageProgress * 400}px, ${
    pageProgress * 100
  }px, 0) scale(${scale})`;

  return (
    <div
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
          style={{ opacity: 1 - pageProgress }}
          className="text-6xl text-white"
        >
          CUE BREAKERS
        </div>
      </div>
    </div>
  );
};

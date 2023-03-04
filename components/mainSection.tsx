const defaultHeight = "h-screen";

export const MainSection = () => {
  return (
    <div
      style={{ zIndex: 3 }}
      className={`${defaultHeight} sticky top-0 flex w-full flex-col items-center justify-center border-2 border-red-400`}
    >
      <div className="flex h-[400px] w-[800px] flex-col items-center justify-center gap-10 ">
        <div className="flex flex-row">
          <svg height="200" width="200">
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="black"
              strokeWidth="3"
              fill="red"
            />
          </svg>
          <svg height="200" width="200">
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="black"
              strokeWidth="3"
              fill="blue"
            />
          </svg>
          <svg height="200" width="200">
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
        <div className="text-6xl text-white">CUE BREAKERS</div>
      </div>
    </div>
  );
};

const defaultHeight = "h-screen";
const baseX = 500;
const baseY = 50;
const calculatePos = (progress: number) => {
  return {
    x: baseX - progress * 2 * 400,
    y: baseY + progress * 2 * 0,
  };
};

export const TableSection = (props: { sectionProgress: number }) => {
  const { sectionProgress } = props;

  console.log("table section", sectionProgress);

  const normalizedProgress = sectionProgress;

  // console.log(normalizedPro/ress);

  const pos = calculatePos(normalizedProgress);

  const transformWhite = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${0.1})`;

  return (
    <div
      style={{ zIndex: 2 }}
      className={`${defaultHeight} sticky top-0 flex w-full items-center justify-center  border-2 border-red-400 `}
    >
      <div className="h-[400px] w-[800px] border-[40px] border-orange-900 bg-green-800">
        <svg style={{ transform: transformWhite }} height="200" width="200">
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="black"
            strokeWidth="3"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

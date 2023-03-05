import { useState, useEffect } from "react";

export const usePageScrollPercentage = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const handle = () => {
    const percentage =
      window.scrollY / (document.body.scrollHeight - window.innerHeight);
    setScrollPercentage(percentage);
  };

  useEffect(() => {
    window.addEventListener("scroll", handle, { passive: true });
    window.addEventListener("resize", handle, { passive: true });

    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
  }, []);

  return scrollPercentage;
};

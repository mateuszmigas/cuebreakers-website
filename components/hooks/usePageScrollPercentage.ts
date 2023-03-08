import { useState, useEffect, Ref, useCallback } from "react";

export const usePageScrollPercentage = (
  elementRef: React.RefObject<HTMLElement>
) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const calculateScroll = useCallback(() => {
    if (!elementRef.current) return;

    const total =
      elementRef.current.scrollHeight - elementRef.current.clientHeight;
    const percentage = elementRef.current.scrollTop / total;
    setScrollPercentage(percentage);
  }, [elementRef]);

  useEffect(() => {
    if (!elementRef.current) return;
    const element = elementRef.current;

    element.addEventListener("scroll", calculateScroll, { passive: true });
    // element.addEventListener("resize", handle, { passive: true });

    return () => {
      element.removeEventListener("scroll", calculateScroll);
      // element.removeEventListener("resize", handle);
    };
  }, [calculateScroll, elementRef]);

  return scrollPercentage;
};

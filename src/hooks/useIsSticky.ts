import React, { useEffect, useState } from "react";

type targetElement = React.MutableRefObject<HTMLDivElement | null>;
const useIsSticky = (targetElement: targetElement) => {
  const [isSticky, setIsSticky] = useState<boolean>(false);

  const scrollHandler = () => {
    if (!targetElement.current) return;

    if (window.scrollY > targetElement?.current?.offsetHeight) {
      return setIsSticky(true);
    }

    return setIsSticky(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return isSticky;
};

export default useIsSticky;

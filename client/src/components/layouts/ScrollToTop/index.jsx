import React, { useEffect, useState } from "react";
import { useWindowScroll } from "react-use";

const ScrollToTop = () => {
  const { y: pageYOffset } = useWindowScroll();
  const [visible, setVisiblity] = useState(false);

  useEffect(() => {
    if (pageYOffset > 100) {
      setVisiblity(true);
    } else {
      setVisiblity(false);
    }
  }, [pageYOffset]);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  if (!visible) return false;
  return (
    <div
      className="scroll-to-top text-center"
      onClick={scrollTop}
    >
      <i className="icon fas fa-chevron-up"></i>
    </div>
  );
}

export default ScrollToTop;



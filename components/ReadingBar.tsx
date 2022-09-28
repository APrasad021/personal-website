import { CSSProperties, useEffect, useState } from "react";

import styles from "../styles/readingbar.module.css";

function ReadingBar() {
  const [width, setWidth] = useState(0);
  // scroll function
  const scrollHeight = () => {
    var el = document.documentElement,
      ScrollTop = el.scrollTop || document.body.scrollTop,
      ScrollHeight = el.scrollHeight || document.body.scrollHeight;
    var percent = (ScrollTop / (ScrollHeight - el.clientHeight)) * 100;
    // store percentage in state
    setWidth(percent);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeight);
    return () => window.removeEventListener("scroll", scrollHeight);
  });

  const barStyle: CSSProperties = {
    width: `${width}%`,
    visibility: width > 2 && width < 98 ? "visible" : "hidden",
    opacity: width > 2 && width < 99 ? 0.75 : 0,
  };

  return <div className={styles.bar} style={barStyle} />;
}

export default ReadingBar;

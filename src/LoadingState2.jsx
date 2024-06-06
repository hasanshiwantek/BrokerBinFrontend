import React from "react";
import css from "./styles/LoadingState2.module.css";

const LoadingState2 = () => {
  return (
    <div className={css.body}>
      <div className={css.loadingSpinner}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {/* <span></span> */}
      </div>
    </div>
  );
};

export default LoadingState2;

import React from "react";
import css from "./styles/LoadingState.module.css";

const LoadingState = () => {
  return (
    <div className={css.body}>
      <div className={css.loadingSpinner}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default LoadingState;

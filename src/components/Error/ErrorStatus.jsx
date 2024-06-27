import React from "react";
import css from "../../styles/LoginRegister/Authentication/NotFound.module.css";

const ErrorStatus = ({ error }) => {
  return (
    <div className={css.notFound}>
      <div className={css.face}>
        <span></span>
        <span></span>
        <span></span>
        <div>
          <span></span>
        </div>
      </div>
      <div className={css.text}>
        <h1>{error}</h1>
      </div>
    </div>
  );
};

export default ErrorStatus;

import React from "react";
import css from "../../../styles/LoginRegister/Authentication/NotFound.module.css";
import face_404 from "../../../imgs/face_404.png";
const NotFound = () => {
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
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFound;

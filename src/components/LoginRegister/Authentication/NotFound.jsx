import React from "react";
import css from "../../../styles/LoginRegister/Authentication/NotFound.module.css";

const NotFound = () => {
  return (
    <div className={css.notFound}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;

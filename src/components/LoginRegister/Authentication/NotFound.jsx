import React from "react";
import css from "../../../styles/LoginRegister/Authentication/NotFound.module.css";
import face_404 from "../../../imgs/face_404.png";
import errorPage from "../../../assets/BrokerCell 404 Page.svg"
import { NavLink } from "react-router-dom";
const NotFound = () => {
  return (
    <div className={css.notFound}>
      {/* <div className={css.face}>
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
      </div> */}
      <div  className="flex items-center justify-center flex-col gap-16">
        <img src={errorPage} alt="Error 404 Not Found" className="w-[40rem]" srcset="" />
        <h1 className="text-4xl">Return to <NavLink to={"/"}><span className="text-blue-700 text-4xl border-b-2 border-blue-700">Home</span></NavLink>  page</h1>
      </div>
    </div>
  );
};

export default NotFound;

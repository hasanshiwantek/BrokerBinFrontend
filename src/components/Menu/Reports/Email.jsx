import React from "react";
import css from "../../../styles/Menu/Reports/Email.module.css";
import style from "../../../styles/Menu/Reports/Company.module.css";
import { Link } from "react-router-dom";

const Email = () => {
  return (
    <div className={style.container}>
      {/* Navigation Tabs */}
      <div className={style.navTabs}>
        <ul>
          <li>
            <Link to={"/reports/Company"}>Company</Link>
          </li>
          <li>
            <Link to={"/reports/sitewide"}>Site Wide</Link>
          </li>
          <li>
            <Link to={"/reports/email"}>Email</Link>
          </li>
          <li>
            <Link>Stats</Link>
          </li>
        </ul>
      </div>

      <div className={style.mainBody}></div>
    </div>
  );
};

export default Email;

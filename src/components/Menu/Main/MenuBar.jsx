import React from "react";
import "./MenuBar.css";
import helpimg from "../../../assets/help.png";
import { Link, NavLink } from "react-router-dom";
import css from "../../../styles/Menu/Manage/MyProfile.module.css";

const MenuBar = () => {
  return (
    <>
      <nav className="menu-bar">
        <div className={css.profileInfo_links}>
          <ul>
            <li>
              <NavLink
                to="/help"
                end // This ensures the exact match for /myprofile
                className={({ isActive }) => (isActive ? css.active : "")}
              >
                <span>Help</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/feedback"
                className={({ isActive }) => (isActive ? css.active : "")}
              >
                <span>Contact</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ethics"
                className={({ isActive }) => (isActive ? css.active : "")}
              >
                <span>Ethics</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sitemap"
                className={({ isActive }) => (isActive ? css.active : "")}
              >
                <span>Site Map</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/badges"
                className={({ isActive }) => (isActive ? css.active : "")}
              >
                <span>Badges</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <div className="help-container">  
        <div>
          <h2
            style={{
              backgroundColor: "#bfbfbf",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              padding: "8px",
            }}
          >
            BrokerCell Help Topics
          </h2>
        </div>

        <div className="help-sec">
          <img src={helpimg} alt="help" srcSet="" />
          <div className="help-content">
            <h2 style={{ fontSize: "1.5em", fontWeight: "bold" }}>
              BrokerCell.com Support Center
            </h2>
            <p>
              Explore the BrokerCell.com Support Center to discover tips on
              maximizing your site experience and addressing any inquiries you
              might have. We're here for you—don't hesitate to reach out. Call
              ********** or Toll-Free at ***********.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuBar;

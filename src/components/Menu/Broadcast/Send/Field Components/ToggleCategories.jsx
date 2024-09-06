import React, { useState } from "react";
import Computer from "./Computer";
import css from "../Send.module.css";
import Telecom from "./Telecom";
import MobileDevices from "./MobileDevices";

const ToggleCategories = () => {
  const [categories, setCategories] = useState({
    computer: false,
    telecom: false,
    mobiledevices: false,
  });

  const handleToggle = (category) => {
    setCategories((prevCategories) => {
      const updatedCategories = { ...prevCategories }; // Create a copy of the previous state

      // Toggle the clicked category and set others to false
      Object.keys(updatedCategories).forEach((key) => {
        updatedCategories[key] =
          key === category ? !prevCategories[key] : false;
      });

      return updatedCategories;
    });
  };
  return (
    <div>
      <div className={css.toggleCategories_btn}>
        <button type="button" onClick={() => handleToggle("computer")}>
          Computer
        </button>
        <button type="button" onClick={() => handleToggle("telecom")}>
          Telecom
        </button>
        <button type="button" onClick={() => handleToggle("mobiledevices")}>
          Mobile Devices
        </button>
      </div>
      {categories.computer && <Computer />}
      {categories.telecom && <Telecom />}
      {categories.mobiledevices && <MobileDevices />}
    </div>
  );
};

export default ToggleCategories;

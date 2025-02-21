import React from "react";
import css from "../Send.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setMobileDevicesSelection } from "../../../../../ReduxStore/BroadCast";

const MobileDevices = () => {
  const mobileDevicesCategories = [
    "Smartphones",
    "Tablets",
    "Smartwatches",
    "Mobile Accessories",
    "Mobile Chargers",
    "Mobile Cases",
    "Bluetooth Devices",
    "Wireless Earbuds",
    "Power Banks",
    "Other Mobile Devices",
  ];
  const dispatch = useDispatch();

  const { mobileDevicesSelection } = useSelector(
    (state) => state.broadcastStore
  );

  // Handle checkbox selection
  const handleCheckboxChange = (computer) => {
    const newSelection = mobileDevicesSelection.includes(computer)
      ? mobileDevicesSelection.filter((item) => item !== computer) // Deselect
      : [...mobileDevicesSelection, computer]; // Select

    dispatch(setMobileDevicesSelection(newSelection)); // Pass the updated selection to the parent
  };
  return (
    <div className={css.toggleFieldsLayout}>
      {mobileDevicesCategories.map((item) => {
        return (
          <span>
            <label htmlFor={item}>{item}</label>
            <input
              type="checkbox"
              name={item}
              id={item}
              value={item}
              onChange={() => handleCheckboxChange(item)}
              checked={mobileDevicesSelection.includes(item)}
               className="w-12 h-6"
            />
          </span>
        );
      })}
    </div>
  );
};

export default MobileDevices;

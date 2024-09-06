import React from "react";
import css from "../Send.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setTelecomSelection } from "../../../../../ReduxStore/BroadCast";

const Telecom = () => {
  const telecomCategories = [
    "Antennas",
    "Cell Phones",
    "Cellular Infrastructure",
    "Fiber Optics",
    "PBX Equipment",
    "Satellite Equipment",
    "Switching Equipment",
    "Telecom Towers",
    "VoIP Equipment",
    "Other Telecom",
  ];

  const dispatch = useDispatch();
  const { telecomSelection } = useSelector((store) => store.broadcastStore);
  const handleCheckboxChanges = (tele) => {
    const newSelection = telecomSelection.includes(tele)
      ? telecomSelection.filter((item) => item !== tele)
      : [...telecomSelection, tele];

    dispatch(setTelecomSelection(newSelection));
  };

  return (
    <div className={css.toggleFieldsLayout}>
      {telecomCategories.map((item) => {
        return (
          <span>
            <label htmlFor={item}>{item}</label>
            <input
              type="checkbox"
              name={item}
              id={item}
              value={item}
              onChange={() => handleCheckboxChanges(item)}
              checked={telecomSelection.includes(item)}
            />
          </span>
        );
      })}
    </div>
  );
};

export default Telecom;

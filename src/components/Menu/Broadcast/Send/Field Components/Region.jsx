import React from "react";
import css from "../Send.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setRegionSelection } from "../../../../../ReduxStore/BroadCast";

const Region = () => {
  const regions = [
    "North America",
    "South America",
    "Europe",
    "Africa",
    "Middle East",
    "Oceania",
    "Asia",
  ];

  const { regionSelection } = useSelector((store) => store.broadcastStore);

  const dispatch = useDispatch();

  const handleCheckboxChange = (region) => {
    const updatedRegionSelection = regionSelection.includes(region)
      ? regionSelection.filter((region) => region !== region)
      : [...regionSelection, region];

    dispatch(setRegionSelection(updatedRegionSelection));
  };

  return (
    <div className={css.toggleFieldsLayout}>
      {regions.map((item) => {
        return (
          <span key={item} >
            <label htmlFor={item}>{item}</label>
            <input
              type="checkbox"
              name={item}
              id={item}
              value={item}
              onChange={() => handleCheckboxChange(item)}
              checked={regionSelection.includes(item)}
                className="w-12 h-6"
            />
          </span>
        );
      })}
    </div>
  );
};

export default Region;

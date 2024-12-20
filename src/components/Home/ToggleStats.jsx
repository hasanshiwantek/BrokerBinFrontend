import React, { useState } from "react";
import { inventoryData, inventoryDataTotalParts } from "../../data/tableData";
import css from "../../styles/Home/Home.module.css";
import { Link } from "react-router-dom";

const ToggleStats = () => {
  const [toggleStats, setToggleStats] = useState(true);
  return (
    <div className={css.gridHome2_Details_Bottom_Stats}>
      <div className={css.gridHome2_Details_Bottom_Stats_toggle}>
        <p onClick={() => setToggleStats((prev) => !prev)} style={!toggleStats ? {} : { borderBottom: "2px solid red" }} >my 24hr stats</p>
        <p onClick={() => setToggleStats((prev) => !prev)} style={toggleStats ? {} : { borderBottom: "2px solid red" }} >24hr site stats</p>
      </div>
      {toggleStats && (
        <div className={css.gridHome2_Details_Bottom_Stats_list}>
          {inventoryData.map((e) => {
            return (
              <div key={e.name}>
                <a href="#">{e.name}</a>
                <a href="#">{e.data.toLocaleString('en-US')}</a>
              </div>
            );
          })}
          {/* <Link to={"/reports/sitewide"}>more...</Link> */}
        </div>
      )}
      {!toggleStats && (
        <div className={css.gridHome2_Details_Bottom_Stats_list}>
          {inventoryDataTotalParts.map((e) => {
            return (
              <div key={e.name}>
                <a href="#">{e.name}</a>
                <a href="#">{e.data.toLocaleString('en-US')}</a>
              </div>
            );
          })}
          <Link to={"/reports/sitewide"}>more...</Link>
        </div>
      )}
    </div>
  );
};

export default ToggleStats;

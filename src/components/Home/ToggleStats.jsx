import React, { useState } from "react";
import css from "../../styles/Home/Home.module.css";
import { Link, useNavigate } from "react-router-dom";

const ToggleStats = ({ data }) => {
  const [toggleStats, setToggleStats] = useState(true);
  const navigate = useNavigate();

  const backendData = [
    { name: "Inventory:", value: data?.inventoryUser || 0, route: "/inventory" },
    { name: "Uploaded:", value: `${data?.lastUploaded || 0} day[s] ago`, route: "/inventory" },
    // { name: "Expires:", value: "+9 Days" },
    { name: "Want to Sell:", value: data?.wtsUser || 0, val: "wts" },
    { name: "Want to Buy:", value: data?.wtbUser || 0, val: "wtb" },
  ];

  const siteStatsData = [
    { name: "Total parts:", value: data?.inventoryCount, route: "/search/Inventory" }, // Replace with backend data if available
    { name: "Total companies:", value: data?.companyCount, route: "/search/Company" || 0 },
    // { name: "Shield Companies:", value: 117 }, 
    { name: "Who's New:", value: data?.whoseNew || 0 }, // Example static value
  ];

  // const handleNavigation = (path, params = {}) => {
  //   const query = new URLSearchParams(params).toString();
  //   navigate(`${path}${query ? `?${query}` : ""}`);
  // };
  const handleClick = (item) => {
    if (item.name.includes("Inventory") || item.name.includes("Uploaded")) {
      navigate("/inventory"); // Always navigate to the inventory page
    } else if (item.route) {
      navigate(item.route);
    } else {
      navigate(`/broadcasthistory?type=${item.val.toLowerCase()}`);
    }
  };



  return (
    <div className={css.gridHome2_Details_Bottom_Stats}>
      <div className={css.gridHome2_Details_Bottom_Stats_toggle}>
        <p
          onClick={() => setToggleStats(true)}
          className={`hover:text-blue-700 cursor-pointer ${toggleStats ? "border-b-2 border-blue-600" : ""
            }`}
        >
          My 24hr Stats
        </p>
        <p
          onClick={() => setToggleStats(false)}
          className={`hover:text-blue-700 cursor-pointer ${!toggleStats ? "border-b-2 border-blue-600" : ""
            }`}
        >
          24hr Site Stats
        </p>
      </div>

      {toggleStats && (
        <div className={css.gridHome2_Details_Bottom_Stats_list}>
          {backendData.map((item, index) => (
            <div key={index}>
              <a onClick={() => handleClick(item)} className="cursor-pointer hover:border-b-[1px] border-blue-400">
                {item.name}
              </a>
              <a onClick={() => handleClick(item)} className=" ml-6 cursor-pointer !whitespace-nowrap !lowercase">
                {item.value?.toLocaleString("en-US")}
              </a>
            </div>
          ))}
        </div>
      )}
      {!toggleStats && (
        <div className={css.gridHome2_Details_Bottom_Stats_list}>
          {siteStatsData.map((item, index) => (
            <div key={index}>
              <a href={item.route} className="cursor-pointer hover:border-b-[1px] border-blue-400 ">{item.name}</a>
              <a href={item.route}  >{item.value.toLocaleString("en-US")}</a>
            </div>
          ))}
          {/* <Link to={"/reports/sitewide"}>more...</Link> */}
        </div>
      )}
    </div>
  );
};

export default ToggleStats;


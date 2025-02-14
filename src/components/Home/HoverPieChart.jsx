import React, { useState } from "react";
import { pieChartData } from "../../data/tableData";
import css from "../../styles/Home/Home.module.css";
import MyPieChart from "./MyPieChart";
import { FaRegCircle } from "react-icons/fa";
import zIndex from "@mui/material/styles/zIndex";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
const HoverPieChart = ({ data }) => {
  // Transform backend data into the required structure
  const transformedData = {
    labels: ["WTB", "WTS", "RFQ", "SVC"],
    name: ["Want To Buy", "Want To Sell", "Request For Quote", "Service Broadcasts"],
    datasets: [
      {
        data: [
          parseInt(data.wtbCount || 0),
          parseInt(data.wtsCount || 0),
          parseInt(data.rfqCount || 0),
          parseInt(data.serviceCount || 0),
        ],
        backgroundColor: ["rgb(64, 120, 190)", "rgb(210, 64, 64)", "rgb(64, 160, 64)", "rgb(255, 140, 40)"],
        hoverOffset: 5,
      },
    ],
  };

  const navigate = useNavigate();
  const pieColor = transformedData.datasets[0].backgroundColor;
  const [activeIndex, setActiveIndex] = useState(null);

  const handleLabelMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleLabelMouseLeave = () => {
    setActiveIndex(null);
  };

  const handleClick = (type) => {
    navigate(`/broadcasts?type=${type.toLowerCase()}`);
  };

  const arrow=">>>"
  const totalData = transformedData.datasets[0].data
    .reduce((sum, acc) => sum + acc, 0)
    .toLocaleString("en-US");

  return (
    <>
      <div className={css.gridHome2_Details_Bottom_Chart}>
        <MyPieChart chartData={transformedData} />
        <span className={css.gridHome2_Details_Bottom_Chart_totalData}>
          <p>{totalData}</p>
          <p>total</p>
        </span>
      </div>
      <div className={css.gridHome2_Details_Bottom_Chart_data}>
        {transformedData.name.map((label, index) => (
          <div
            key={label}
            onMouseEnter={() => handleLabelMouseEnter(index)}
            onMouseLeave={handleLabelMouseLeave}
            onClick={() => handleClick(transformedData.labels[index])} // Navigate on click
            className={
              activeIndex === null
                ? ""
                : activeIndex === index
                ? css.activeIndexLabel
                : css.inactiveIndexLabel
            }
          >
            <span>
              <FaRegCircle style={{ color: pieColor[index] }} />
              <a className="cursor-pointer">{label}</a>
            </span>

            <a href="#">
              {transformedData.datasets[0].data[index].toLocaleString("en-US")} total
            </a>
      
          </div>
       
        ))}
        {/* <NavLink to={"/sendbroad"}>
                <button className="bg-blue-500 p-2 text-white mb-20 rounded-md w-[15vw] ">
                  SEND BROADCAST{arrow}
                </button>
        </NavLink> */}

      </div>

    </>
  );
};

export default HoverPieChart;





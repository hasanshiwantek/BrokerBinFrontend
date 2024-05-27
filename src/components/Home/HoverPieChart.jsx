import React, { useState } from "react";
import { pieChartData } from "../../data/tableData";
import css from "../../styles/Home/Home.module.css";
import MyPieChart from "./MyPieChart";
import { FaRegCircle } from "react-icons/fa";
import zIndex from "@mui/material/styles/zIndex";

const HoverPieChart = () => {
  const pieColor = pieChartData.datasets[0].backgroundColor;
  const [chartData, setChartData] = useState(pieChartData);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleLabelMouseEnter = (index) => {
    setActiveIndex(index);
    const newDataset = { ...pieChartData.datasets[0] };
    newDataset.backgroundColor = pieChartData.datasets[0].backgroundColor.map(
      (color) => "rgba(0, 0, 0, 0.1)" // apply low opacity color
    );
    newDataset.backgroundColor[index] =
      pieChartData.datasets[0].backgroundColor[index];
    setChartData({
      ...pieChartData,
      datasets: [newDataset],
    });
  };

  const handleLabelMouseLeave = () => {
    setActiveIndex(null);
    setChartData(pieChartData);
  };

  // let formattedNumberWithLocale = myNumber.toLocaleString('en-US');
  const totalData = chartData.datasets[0].data.reduce((sum, acc) => sum + acc).toLocaleString('en-US');
  return (
    <>
      <div className={css.gridHome2_Details_Bottom_Chart}>
        <MyPieChart chartData={chartData} />
        <span className={css.gridHome2_Details_Bottom_Chart_totalData}>
          <p>
          {totalData}
          </p>
          <p>total</p>
        </span>
      </div>
      <div className={css.gridHome2_Details_Bottom_Chart_data}>
        {chartData.name.map((label, index) => {
          return (
            <div
              key={label}
              onMouseEnter={() => handleLabelMouseEnter(index)}
              onMouseLeave={handleLabelMouseLeave}
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
                <a href="#">{label}</a>
              </span>
              <a href="#">{chartData.datasets[0].data[index].toLocaleString('en-US')} total</a>
            </div>
          );
        })}
        <a href="#" className={css.gridHome2_Details_Bottom_Chart_data_btn}>
          SEND BROADCAST
        </a>
      </div>
    </>
  );
};

export default HoverPieChart;

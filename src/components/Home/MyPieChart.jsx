import React from "react";
import { Chart, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
Chart.register(Tooltip, ArcElement, Title);

function MyPieChart({chartData}) {
  const options = {
    maintainAspectRatio: false, // Add this to maintain the aspect ratio
  };
  return (
    <Doughnut data={chartData} height={130} width={130} options={options} />
  );
}

export default MyPieChart;

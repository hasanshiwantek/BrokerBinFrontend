import React, { useRef, useEffect, useState } from "react";
import { Chart, Tooltip, Title, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(Tooltip, ArcElement, Title);

function MyPieChart({ chartData }) {
  
  const chartRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) return;

    const handleHover = (event, elements) => {
      if (elements.length) {
        setHoveredIndex(elements[0].index); // Set hovered segment index
        event.native.target.style.cursor = "pointer"; // ✅ Add cursor pointer on hover
      } else {
        setHoveredIndex(null); // Reset when not hovering
        event.native.target.style.cursor = "default";
      }
    };

    const handleLeave = () => {
      setHoveredIndex(null); // Reset when the mouse leaves the chart
    };

    chart.options.onHover = handleHover;
    chart.options.onLeave = handleLeave;
    chart.update();

    return () => {
      chart.options.onHover = null;
      chart.options.onLeave = null;
    };
  }, []);

  const total = chartData.datasets[0].data.reduce((acc, value) => acc + value, 0);

  const options = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        bodyFont: { size: 16 }, // ✅ Increased font size for tooltip
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const percentage = ((value / total) * 100).toFixed(1) + "%";
            return `${tooltipItem.label}: ${percentage}`;
          },
        },
      },
    },
  };

  // ✅ Adjust opacity of non-hovered segments while keeping them visible
  const updatedChartData = {
    ...chartData,
    datasets: [
      {
        ...chartData.datasets[0],
        backgroundColor: chartData.datasets[0].backgroundColor.map((color, index) =>
          hoveredIndex === null ? color : index === hoveredIndex ? color : "rgba(0, 0, 0, 0.2)"
        ),
      },
    ],
  };

  return <Doughnut ref={chartRef} data={updatedChartData} options={options} />;
}

export default MyPieChart;

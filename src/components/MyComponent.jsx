import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';

const initialDataset = {
  labels: ['Want To Buy', 'Want To Sell', 'Request For Quote', 'Service Broadcasts'],
  datasets: [
    {
      data: [331, 842, 87, 136],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    },
  ],
};

const MyComponent = () => {
  const [chartData, setChartData] = useState(initialDataset);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleLabelMouseEnter = (index) => {
    setActiveIndex(index);
    const newDataset = { ...initialDataset.datasets[0] };
    newDataset.backgroundColor = [...initialDataset.datasets[0].backgroundColor];
    newDataset.backgroundColor[index] = 'rgba(0, 0, 0, 0.1)'; // Some hover color
    setChartData({
      ...initialDataset,
      datasets: [newDataset]
    });
  };

  const handleLabelMouseLeave = () => {
    setActiveIndex(null);
    setChartData(initialDataset);
  };

  return (
    <div>
      <Pie data={chartData} height={120} width={120} />
      <div>
        {chartData.labels.map((label, index) => (
          <div
            key={label}
            onMouseEnter={() => handleLabelMouseEnter(index)}
            onMouseLeave={handleLabelMouseLeave}
            className={activeIndex === index ? 'active' : ''}
          >
            {label} {chartData.datasets[0].data[index]} Total
          </div>
        ))}
      </div>
      <button>SEND BROADCAST</button>
    </div>
  );
};

export default MyComponent;

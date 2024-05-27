import { React, memo } from "react";
import css from "../styles/ProductsPieChart.module.css";
import { PieChart, Pie, Tooltip } from "recharts";
import { breakdown } from "../data/tableData";
import { FaWindowClose } from "react-icons/fa";

const ProductsPieChart = ({ setGraphToggle }) => {
  const renderCustomizedLabel = ({ name }) => {
    return name;
  };

  return (
    <div className={css.pieChartBg}>
      {/* <div className={css.closeGraph}> */}
      {/* <p>Graph</p> */}
      <button
        type="button"
        className={css.closeGraph}
        onClick={() => setGraphToggle((prev) => !prev)}
      >
        <p>Graph</p>
        <FaWindowClose />
      </button>
      {/* </div> */}
      <div className={css.pieChart}>
        <div>
          <h1>Manufacturer Breakdown</h1>
          <PieChart width={200} height={200}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={breakdown.mfgGroups}
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
              label={renderCustomizedLabel}
            />
            <Tooltip />
          </PieChart>
        </div>
        <div>
          <h1>Condition Breakdown</h1>
          <PieChart width={200} height={200}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={breakdown.condBreakdown}
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
              label={renderCustomizedLabel}
            />
            <Tooltip />
          </PieChart>
        </div>
        <div>
          <h1>Country Breakdown</h1>
          <PieChart width={200} height={200}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={breakdown.mfgGroups}
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
              label={renderCustomizedLabel}
            />
            <Tooltip />
          </PieChart>
        </div>
        <div>
          <h1>Total Qty by Mfg</h1>
          <PieChart width={200} height={200}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={breakdown.condBreakdown}
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
              label={renderCustomizedLabel}
            />
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductsPieChart);

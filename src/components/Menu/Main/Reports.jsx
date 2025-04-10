import React from "react";

const Reports = () => {
  return (
    <>
      <div style={{ padding: "15px" }} id="reports">
        <h5>Reports</h5>

        <div className="report-sec box">
          <p className="text-[8pt] font-[500]">D = Day Last 24 hours</p>
          <p className="text-[8pt] font-[500]">W = Week Last 7 days</p>
          <p className="text-[8pt] font-[500]">M = Month Last 30 days</p>
        </div>
      </div>
    </>
  );
};

export default Reports;

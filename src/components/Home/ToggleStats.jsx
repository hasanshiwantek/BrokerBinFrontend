// import React, { useState } from "react";
// // import { inventoryData, inventoryDataTotalParts } from "../../data/tableData";
// import css from "../../styles/Home/Home.module.css";
// import { Link } from "react-router-dom";

// const ToggleStats = ({data}) => {
//   const [toggleStats, setToggleStats] = useState(true);
//   return (
//     <div className={css.gridHome2_Details_Bottom_Stats}>
//       <div className={css.gridHome2_Details_Bottom_Stats_toggle}>
//         <p onClick={() => setToggleStats((prev) => !prev)} style={!toggleStats ? {} : { borderBottom: "2px solid red" }} >my 24hr stats</p>
//         <p onClick={() => setToggleStats((prev) => !prev)} style={toggleStats ? {} : { borderBottom: "2px solid red" }} >24hr site stats</p>
//       </div>
//       {toggleStats && (
//         <div className={css.gridHome2_Details_Bottom_Stats_list}>
//           {inventoryData.map((e) => {
//             return (
//               <div key={e.name}>
//                 <a href="#">{e.name}</a>
//                 <a href="#">{e.data.toLocaleString('en-US')}</a>
//               </div>
//             );
//           })}
//           {/* <Link to={"/reports/sitewide"}>more...</Link> */}
//         </div>
//       )}
//       {!toggleStats && (
//         <div className={css.gridHome2_Details_Bottom_Stats_list}>
//           {inventoryDataTotalParts.map((e) => {
//             return (
//               <div key={e.name}>
//                 <a href="#">{e.name}</a>
//                 <a href="#">{e.data.toLocaleString('en-US')}</a>
//               </div>
//             );
//           })}
//           <Link to={"/reports/sitewide"}>more...</Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ToggleStats;



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
    { name: "Want to Sell:", value: data?.wtsCount || 0 },
    { name: "Want to Buy:", value: data?.wtbCount || 0 },
  ];

  const siteStatsData = [
    { name: "Total Parts:", value: data?.inventoryCount }, // Replace with backend data if available
    { name: "Total Companies:", value: data?.companyCount || 0 },
    // { name: "Shield Companies:", value: 117 }, 
    { name: "Who's New:", value: data?.whoseNew || 0 }, // Example static value
  ];

  // const handleNavigation = (path, params = {}) => {
  //   const query = new URLSearchParams(params).toString();
  //   navigate(`${path}${query ? `?${query}` : ""}`);
  // };

  return (
    <div className={css.gridHome2_Details_Bottom_Stats}>
      <div className={css.gridHome2_Details_Bottom_Stats_toggle}>
        <p
          onClick={() => setToggleStats(true)}
          style={toggleStats ? { borderBottom: "2px solid red" } : {}}
        >
          my 24hr stats
        </p>
        <p
          onClick={() => setToggleStats(false)}
          style={!toggleStats ? { borderBottom: "2px solid red" } : {}}
        >
          24hr site stats
        </p>
      </div>
      {toggleStats && (
        <div className={css.gridHome2_Details_Bottom_Stats_list}>
          {backendData.map((item, index) => (
            <div key={index}>
              <a href="#" onClick={() => navigate(item.route)}> {item.name}</a>
              <a href="#" onClick={() => navigate(item.route)}> {item.value.toLocaleString("en-US")}</a>
            </div>
          ))}
        </div>
      )}
      {!toggleStats && (
        <div className={css.gridHome2_Details_Bottom_Stats_list}>
          {siteStatsData.map((item, index) => (
            <div key={index}>
              <a href="#">{item.name}</a>
              <a href="#">{item.value.toLocaleString("en-US")}</a>
            </div>
          ))}
          {/* <Link to={"/reports/sitewide"}>more...</Link> */}
        </div>
      )}
    </div>
  );
};

export default ToggleStats;


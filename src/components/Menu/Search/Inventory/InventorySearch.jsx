// import React, { useEffect, useState } from "react";
// import css from "../../../../styles/Menu/Manage/MyProfile.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import styles from "../../../../styles/Menu/Search/Person.module.css";
// import FiltersSearchCompanyInventory from "../../Reports/FiltersSearchCompanyInventory";
// import CompanySearch from "./CompanySearch";
// import { submitUserSearch } from "../../../../ReduxStore/ProfleSlice";
// import { inventorySearch } from "../../../../ReduxStore/InventorySlice";
// import Cookies from "js-cookie";
// import { countriesList, regionsList } from "../../../../data/services";
// import CompanySearchInventory from "./CompanySearchInventory";

// const InventorySearch = () => {
//   const [loading, setLoading] = useState(false); // To track API call status
//   const [buttonText, setButtonText] = useState("Submit");
//   const token = Cookies.get("token");
//   const { inventorySearchData } = useSelector((state) => state.inventoryStore);
//   console.log("Searchg Inventory Data: ", inventorySearchData);
//   const [formData, setFormData] = useState({
//     part: "",
//     heci: "",
//     description: "",
//     manufacturer: "",
//     partHeci: "",
//     keyword: "",
//     condition: "",
//     company: "",
//     state: "",
//     country: "",
//     region: "",
//     shipDeadline: "", // Ensure this key exists
//     deadlinePeriod: "PM", // New key for AM/PM selection
//     multiplePartSearch: "",
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData, // Preserve other field values
//       [name]: value, // Update current field
//     });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   console.log("Form Data Submitted:", formData); // Check the values being sent
//   //   setButtonText("Processing..."); // Set the button text to "Processing..."
//   //   setLoading(true); // Start loading

//   //   try {
//   //     // Include page and pageSize in the formData
//   //     const updatedFormData = { ...formData, page: 1, pageSize: 20 };

//   //     const result = await dispatch(
//   //       inventorySearch({ data: updatedFormData, token })
//   //     ).unwrap();

//   //     console.log("API Result:", result);
//   //     if (result.length === 0) {
//   //       alert("No matching records found.");
//   //       resetHandler(); // Reset form data if no results
//   //     } else {
//   //       const pagination = result.pagination;
//   //       console.log("pagination", pagination);

//   //       // Pass the updated formData and results to the results page
//   //       // navigate("/inventorysearch", {
//   //       //   state: {
//   //       //     searchResults: result,
//   //       //     pagination,
//   //       //     filters: updatedFormData,
//   //       //   },
//   //       // });

//   //       const params = new URLSearchParams();
//   //       if (updatedFormData.company) {
//   //         params.append("company", updatedFormData.company)
//   //       }

//   //       // else {params.append("page", updatedFormData.page)}
//   //       navigate(`/inventorysearch?${params.toString()}`, {
//   //         state: {
//   //           searchResults: result,
//   //           pagination,
//   //           filters: updatedFormData,
//   //         },
//   //       });

//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching user search data:", error);
//   //     alert("An error occurred while fetching data.");
//   //   } finally {
//   //     setLoading(false); // End loading
//   //     setButtonText("Submit"); // Reset the button text
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setButtonText("Processing...");
//     setLoading(true);

//     try {
//       const updatedFormData = { ...formData, page: 1, pageSize: 20 };

//       const result = await dispatch(
//         inventorySearch({ data: updatedFormData, token })
//       ).unwrap();

//       if (result.length === 0) {
//         alert("No matching records found.");
//         resetHandler();
//       } else {
//         const pagination = result.pagination;

//         const params = new URLSearchParams();
//         // if (updatedFormData.company) {
//         //   params.append("company", updatedFormData.company);
//         // }
//         Object.entries(updatedFormData).forEach(([key, value]) => {
//           if (value) params.append(key, value);
//         });
//         params.append("page", updatedFormData.page);

//         navigate(`/inventorysearch?${params.toString()}`, {
//           state: {
//             searchResults: result,
//             pagination,
//             filters: updatedFormData,
//           },
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching user search data:", error);
//       alert("An error occurred while fetching data.");
//     } finally {
//       setLoading(false);
//       setButtonText("Submit");
//     }
//   };

//   const resetHandler = () => {
//     setFormData({
//       part: "",
//       heci: "",
//       description: "",
//       manufacturer: "",
//       keyword: "",
//       condition: "",
//       partHeci: "",
//       company: "",
//       state: "",
//       country: "",
//       region: "",
//       shipDeadline: "",
//       multiplePartSearch: "",
//     });
//   };

//   return (
//     <>
//       <div className={css.profileLayout}>
//         <form onSubmit={handleSubmit} className={`${styles.personForm}`}>
//           <div className={css.profileInfo}>
//             <div className={css.profileInfo_links}>
//               <ul>
//                 <li>
//                   <NavLink
//                     to="/search/Inventory"
//                     end // This ensures the exact match for /myprofile
//                     className={({ isActive }) => (isActive ? css.active : "")}
//                   >
//                     <span>Inventory</span>
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/search/Company"
//                     className={({ isActive }) => (isActive ? css.active : "")}
//                   >
//                     <span>Company</span>
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/person"
//                     className={({ isActive }) => (isActive ? css.active : "")}
//                   >
//                     <span>Person</span>
//                   </NavLink>
//                 </li>
//               </ul>
//             </div>

//             <div className={`${css.profileInfo_form} !flex !flex-col`}>
//               <h2 style={{ margin: "" }}>Inventory Search</h2>
//               <div className={"!flex !flex-col "}>
//                 <div className={`!flex !flex-col  !px-[5vw] !gap-[.5vw] `}>
//                   <span className={styles.formRow}>
//                     <label htmlFor="part">Part#</label>
//                     <input
//                       type="text"
//                       name="part"
//                       id="firstName"
//                       onChange={handleChange}
//                       value={formData.part}
//                     />
//                   </span>
//                   <span className={styles.formRow}>
//                     <label htmlFor="part">Multiple Part Search</label>
//                     <input
//                       type="text"
//                       name="multiplePartSearch"
//                       id="multiplePartSearch"
//                       onChange={handleChange}
//                       value={formData.multiplePartSearch}
//                     />
//                   </span>
//                   <span className={styles.formRow}>
//                     <label htmlFor="heci">HECI</label>
//                     <input
//                       type="text"
//                       name="heci"
//                       id="lastName"
//                       onChange={handleChange}
//                       value={formData.heci}
//                     />
//                   </span>
//                   <span className={styles.formRow}>
//                     <label htmlFor="Description">Description</label>
//                     <input
//                       type="text"
//                       name="description"
//                       id="position"
//                       onChange={handleChange}
//                       value={formData.description}
//                     />
//                   </span>
//                   <span className={styles.formRow}>
//                     <label htmlFor="manufacturer">Manufacturer</label>
//                     <input
//                       type="text"
//                       name="manufacturer"
//                       id="specialty"
//                       onChange={handleChange}
//                       value={formData.manufacturer}
//                     />
//                   </span>

//                   <h2>Keyword Searches</h2>
//                   <span className={styles.formRow}>
//                     <label htmlFor="partHeci">Part #/HECI</label>
//                     <input
//                       type="text"
//                       name="partHeci"
//                       id="email"
//                       onChange={handleChange}
//                       value={formData.partHeci}
//                     />
//                   </span>
//                   <span className={styles.formRow}>
//                     <label htmlFor="keyword">Keyword</label>
//                     <input
//                       type="text"
//                       name="keyword"
//                       id="email"
//                       onChange={handleChange}
//                       value={formData.keyword}
//                     />
//                   </span>

//                   <div className={styles.formRow}>
//                     <label htmlFor="condition">Condition</label>
//                     <select
//                       name="condition"
//                       id="region"
//                       value={formData.condition}
//                       onChange={handleChange}
//                     >
//                       <option value="">All</option>
//                       <option value="NEW">NEW</option>
//                       <option value="ASIS">ASIS</option>
//                       <option value="EXC">EXC</option>
//                       <option value="F/S">F/S</option>
//                       <option value="NOB">NOB</option>
//                       <option value="REF">REF</option>
//                       <option value="OEMREF">OEMREF</option>
//                       <option value="REP">REP</option>
//                       <option value="USED">USED</option>
//                     </select>
//                   </div>
//                   <div className={styles.formRow}>
//                     <span>
//                       <CompanySearch
//                         setFormData={setFormData}
//                         formData={formData}
//                       />
//                     </span>
//                   </div>

//                   <div className={styles.formRow}>
//                     <label htmlFor="Country">Country</label>
//                     <select
//                       name="country"
//                       id="region"
//                       value={formData.country}
//                       onChange={handleChange}
//                     >
//                       {countriesList.map((country) => (
//                         <option key={country.value} value={country.value}>
//                           {country.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className={styles.formRow}>
//                     <label htmlFor="Region">Region</label>
//                     <select
//                       name="region"
//                       id="region"
//                       value={formData.region}
//                       onChange={handleChange}
//                     >
//                       {regionsList.map((region) => (
//                         <option key={region.value} value={region.value}>
//                           {region.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className={styles.formRow}>
//                     <label htmlFor="shipDeadline">ShipDeadline</label>
//                     <select
//                       name="shipDeadline" // Corrected name
//                       id="shipDeadline"
//                       value={formData.shipDeadline} // Corrected value binding
//                       onChange={handleChange} // Ensure state updates
//                       className="!w-60"
//                     >
//                       <option value="">Open</option>
//                       <option value="1">1</option>
//                       <option value="2">2</option>
//                       <option value="3">3</option>
//                       <option value="4">4</option>
//                       <option value="5">5</option>
//                       <option value="6">6</option>
//                       <option value="7">7</option>
//                       <option value="8">8</option>
//                       <option value="9">9</option>
//                       <option value="10">10</option>
//                       <option value="11">11</option>
//                       <option value="12">12</option>
//                     </select>

//                     <select
//                       name="deadlinePeriod" // New name for AM/PM selection
//                       value={formData.deadlinePeriod || "PM"} // Default to "PM"
//                       onChange={handleChange} // Ensure it updates state
//                       className="!w-60"
//                     >
//                       <option value="PM">PM</option>
//                       <option value="AM">AM</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-between">
//               <button
//                 className="transform active:scale-90 transition-all duration-100 cursor-pointer p-3 text-white border rounded-lg bg-[#2c83ec]"
//                 onClick={resetHandler}
//                 type="button"
//               >
//                 Reset
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading} // Disable the button while processing
//                 className={`transform active:scale-90 transition-all duration-100 cursor-pointer p-3 text-white border rounded-lg ${
//                   loading ? "bg-[#2c83ec] opacity-50 " : "bg-[#2c83ec]"
//                 }`}
//               >
//                 {buttonText}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default InventorySearch;

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../../../../styles/Menu/Search/Person.module.css";
import css from "../../../../styles/Menu/Manage/MyProfile.module.css";
import CompanySearch from "./CompanySearch";
import { inventorySearch } from "../../../../ReduxStore/InventorySlice";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { countriesList, regionsList } from "../../../../data/services";

const InventorySearch = () => {
  const [buttonText, setButtonText] = useState("Submit");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    part: "",
    heci: "",
    description: "",
    manufacturer: "",
    partHeci: "",
    keyword: "",
    condition: "",
    company: "",
    country: "",
    region: "",
    shipDeadline: "",
    deadlinePeriod: "PM",
    multiplePartSearch: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetHandler = () => {
    setFormData({
      part: "",
      heci: "",
      description: "",
      manufacturer: "",
      partHeci: "",
      keyword: "",
      condition: "",
      company: "",
      country: "",
      region: "",
      shipDeadline: "",
      deadlinePeriod: "PM",
      multiplePartSearch: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Processing...");
    setLoading(true);

    try {
      const updatedFormData = { ...formData, page: 1, pageSize: 20 };
      const result = await dispatch(
        inventorySearch({ data: updatedFormData, token })
      ).unwrap();

      if (result.length === 0) {
        alert("No matching records found.");
        resetHandler();
      } else {
        const pagination = result.pagination;
        const params = new URLSearchParams();
        Object.entries(updatedFormData).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });
        params.append("page", updatedFormData.page);

        navigate(`/inventorysearch?${params.toString()}`, {
          state: {
            searchResults: result,
            pagination,
            filters: updatedFormData,
          },
        });
      }
    } catch (error) {
      alert("An error occurred while fetching data.");
    } finally {
      setLoading(false);
      setButtonText("Submit");
    }
  };

  return (
    <main className={styles.main}>
      <div className={css.profileInfo_links}>
        <ul className="!bg-[#e5e7eb]">
          <li>
            <NavLink
              to="/search/Inventory"
              className={({ isActive }) => (isActive ? css.active : "")}
            >
              <span>Inventory</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/search/Company"
              className={({ isActive }) => (isActive ? css.active : "")}
            >
              <span>Company</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/person"
              className={({ isActive }) => (isActive ? css.active : "")}
            >
              <span>Person</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <h2 style={{ margin: "15px" }}>Inventory Search</h2>
      <div className={styles.formContainer}>
        <form className={styles.personForm} onSubmit={handleSubmit}>
          {[
            "part",
            "multiplePartSearch",
            "heci",
            "description",
            "manufacturer",
          ].map((field) => (
            <div key={field} className={styles.formRow}>
              <label>{field.replace(/([A-Z])/g, " $1")}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="">
            <h2 className="text-2xl my-5">Keyword Searches</h2>
            <div className={styles.formRow}>
              <label htmlFor="partHeci">Part #/HECI</label>
              <input
                type="text"
                name="partHeci"
                id="partHeci"
                onChange={handleChange}
                value={formData.partHeci}
              />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="keyword">Keyword</label>
              <input
                type="text"
                name="keyword"
                id="keyword"
                onChange={handleChange}
                value={formData.keyword}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <label>Condition</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
            >
              <option value="">All</option>
              {[
                "NEW",
                "ASIS",
                "EXC",
                "F/S",
                "NOB",
                "REF",
                "OEMREF",
                "REP",
                "USED",
              ].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formRow}>
            <CompanySearch setFormData={setFormData} formData={formData} />
          </div>

          <div className={styles.formRow}>
            <label>Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">All</option>
              {countriesList.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formRow}>
            <label>Region</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
            >
              <option value="">All</option>
              {regionsList.map((region) => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formRow}>
            <label>Ship Deadline</label>
            <select
              name="shipDeadline"
              value={formData.shipDeadline}
              onChange={handleChange}
              className="!w-52"
            >
              <option value="">Open</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              name="deadlinePeriod"
              value={formData.deadlinePeriod}
              onChange={handleChange}
              className="!w-52"
            >
              <option value="PM">PM</option>
              <option value="AM">AM</option>
            </select>
          </div>

          <div className="flex justify-between mt-10  items-center">
            <button
              className="transform active:scale-90 transition-all duration-100 cursor-pointer p-3 text-white border rounded-lg bg-[#2c83ec]"
              onClick={resetHandler}
              type="button"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={loading} // Disable the button while processing
              className={`transform active:scale-90 transition-all duration-100 cursor-pointer p-3 text-white border rounded-lg ${
                loading ? "bg-[#2c83ec] opacity-50 " : "bg-[#2c83ec]"
              }`}
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default InventorySearch;

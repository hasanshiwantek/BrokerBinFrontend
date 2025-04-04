// import React, { useEffect, useState } from "react";
// import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
// import css from "../../../styles/Menu/Tools/MyVendors.module.css";
// import { companyList } from "../../../data/tableData";
// import { AiFillMail } from "react-icons/ai";
// import { MdPeople, MdPersonAddAlt1, MdPersonRemove } from "react-icons/md";
// import { BsGlobeAmericas } from "react-icons/bs";
// import { Link, NavLink } from "react-router-dom";
// import SearchCompany from "../Main/SearchCompany";
// import SearchMyVendor from "./SearchMyVendor";
// import { useDispatch, useSelector } from "react-redux";
// import { getMyVendors, removeMyVendors } from "../../../ReduxStore/ToolsSlice";
// import Cookies from "js-cookie";
// import { FaUsers } from "react-icons/fa";
// import { CiSquareRemove } from "react-icons/ci";
// import venIcon from "../../../assets/my-vendors.svg";
// import Footer from "../../Footer/Footer";

// const MyVendors = () => {
//   const token = Cookies.get("token");
//   let [viewAsCompany, setViewAsCompany] = useState(false);
//   let [viewAsShow, setViewAsShow] = useState(true);
//   let [viewAsCountry, setViewAsCountry] = useState(false);
//   let [viewAsState, setViewAsState] = useState(false);
//   const { myVendor, loading } = useSelector((store) => store.toolsStore);

//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     if (e.target.value === "company") {
//       setViewAsCompany(true);
//       setViewAsShow(false);
//       setViewAsCountry(false);
//       setViewAsState(false);
//     } else if (e.target.value === "show") {
//       setViewAsCompany(false);
//       setViewAsShow(true);
//       setViewAsCountry(false);
//       setViewAsState(false);
//     } else if (e.target.value === "country") {
//       setViewAsCompany(false);
//       setViewAsShow(false);
//       setViewAsCountry(true);
//       setViewAsState(false);
//     } else if (e.target.value === "state") {
//       setViewAsCompany(false);
//       setViewAsShow(false);
//       setViewAsCountry(false);
//       setViewAsState(true);
//     }
//   };

//   const removeFromMyVendors = (id) => {
//     const companyId = { company_id: id };
//     dispatch(removeMyVendors({ companyId, token }));
//   };

//   useEffect(() => {
//     dispatch(getMyVendors({ token }));
//     // if (myVendor.length === 0) {
//     //   setViewAsCompany(true);
//     // }
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <>
//       <div className={css.inventory}>
//         <div className={css.vendor_vanLink}>
//           <div className={myProfile.profileInfo_links}>
//             <ul>
//               <li>
//                 <NavLink
//                   to="/myprofile"
//                   end  // This ensures the exact match for /myprofile
//                   className={({ isActive }) => (isActive ? myProfile.active : '')}
//                 >
//                   <span>Personal Info</span>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/myprofile/Options"
//                   className={({ isActive }) => (isActive ? myProfile.active : '')}
//                 >
//                   <span>Options</span>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/myprofile/MyVendors"
//                   className={({ isActive }) => (isActive ? myProfile.active : '')}
//                 >
//                   <span>My Vendors</span>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/myprofile/MyContact"
//                   className={({ isActive }) => (isActive ? myProfile.active : '')}
//                 >
//                   <span>My Contacts</span>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/myprofile/broadcastfilter"
//                   className={({ isActive }) => (isActive ? myProfile.active : '')}
//                 >
//                   <span>Broadcast Filters</span>
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className={css.vendor_p}>
//           <p>My Vendors</p>
//         </div>
//         <div className={css.vendor}>
//           <div className={css.vendor_view}>
//             <div className={css.searchVendor}>
//               <div className={css.searchVendor_search}>
//                 <SearchMyVendor />
//               </div>
//             </div>
//             <div>
//               <p>view by</p>
//               <select onChange={handleChange}>
//                 <option value="show">Display</option>
//                 <option value="company">Company</option>
//                 <option value="country">Country</option>
//                 <option value="state">State</option>
//               </select>
//             </div>
//           </div>
//           <div className={css.myVendor}>
//             {viewAsCompany && (
//               <>
//                 <div className={css.myVendor_link}>
//                   <div>
//                     <Link to={"##"}>#</Link>
//                     <Link to={"#A"}>A</Link>
//                     <Link to={"#B"}>B</Link>
//                     <Link to={"#C"}>C</Link>
//                     <Link to={"#D"}>D</Link>
//                     <Link to={"#E"}>E</Link>
//                     <Link to={"#F"}>F</Link>
//                     <Link to={"#G"}>G</Link>
//                     <Link to={"#H"}>H</Link>
//                     <Link to={"#I"}>I</Link>
//                     <Link to={"#J"}>J</Link>
//                     <Link to={"#K"}>K</Link>
//                     <Link to={"#L"}>L</Link>
//                     <Link to={"#M"}>M</Link>
//                     <Link to={"#N"}>N</Link>
//                     <Link to={"#O"}>O</Link>
//                     <Link to={"#P"}>P</Link>
//                     <Link to={"#Q"}>Q</Link>
//                     <Link to={"#R"}>R</Link>
//                     <Link to={"#S"}>S</Link>
//                     <Link to={"#T"}>T</Link>
//                     <Link to={"#U"}>U</Link>
//                     <Link to={"#V"}>V</Link>
//                     <Link to={"#W"}>W</Link>
//                     <Link to={"#X"}>X</Link>
//                     <Link to={"#Y"}>Y</Link>
//                     <Link to={"#Z"}>Z</Link>
//                   </div>
//                 </div>
//                 <div className={css.myVendor_company}>
//                   {myVendor?.map((vendor) => {
//                     return (
//                       <div
//                         className={css.myVendor_company_list}
//                         key={vendor.company.id}
//                       >
//                         <div className={css.myVendor_company_list_main}>
//                           <div className={css.myVendor_company_list_main_img}>
//                             <img src={vendor.company.image} alt="vendor logo" />
//                             <span>
//                               <AiFillMail />
//                               <p>{vendor.company.name}</p>
//                               <BsGlobeAmericas />
//                             </span>
//                           </div>
//                           <div className={css.myVendor_company_list_main_info}>
//                             <span>
//                               <strong>company:</strong>
//                               <p>{vendor.company.name}</p>
//                             </span>
//                             <span>
//                               <strong>fax:</strong>
//                               <p>{vendor.company.phone_num}</p>
//                             </span>
//                             <span>
//                               <strong>phone:</strong>
//                               <p>{vendor.company.phone_num}</p>
//                             </span>


//                             <span>
//                               <strong>hours:</strong>
//                               <p>
//                                 {vendor.company.open_timing} to{" "}
//                                 {vendor.company.close}
//                               </p>
//                             </span>
//                             <span>
//                               <strong>ship by:</strong>
//                               <p>4pm</p>
//                             </span>
//                             <span>
//                               <strong>location:</strong>
//                               <p>{vendor.company.address}</p>
//                             </span>
//                           </div>
//                           <div
//                             className={css.myVendor_company_list_main_display}
//                           >
//                             <FaUsers />
//                             <button type="button">never</button>
//                           </div>
//                           <div className={css.myVendor_company_list_main_notes}>
//                             <span>
//                               <strong>Notes:</strong>
//                             </span>
//                             <span>
//                               <textarea
//                                 name="notes"
//                                 id="notes"
//                                 cols={10}
//                                 rows={6}
//                               ></textarea>
//                             </span>
//                             <span>
//                               <button type="button">save</button>
//                             </span>
//                           </div>
//                           <div
//                             className={css.myVendor_company_list_main_actions}
//                           >
//                             <MdPersonRemove />
//                             <CiSquareRemove
//                               onClick={() =>
//                                 removeFromMyVendors(vendor.company.id)
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </>
//             )}
//             {viewAsShow && (
//               <div className={css.myVendor_company_display}>
//                 <h1>Display: Normal</h1>
//                 {companyList.map((group, index) => {
//                   const companyName = Object.keys(group)[0]; // Get the company group name (e.g., 'Company A')
//                   const companies = group[companyName]; // Get the array of companies in this group
//                   return (
//                     <div key={index} className={css.myVendor_company_name}>
//                       <div className={css.myVendor_company_name_list}>
//                         {companies.map((company, index) => {
//                           return (
//                             <section className={css.companyCard}>
//                               {/* Left Section: Company Information */}
//                               <div className={css.companyInfo}>
//                                 <div className={css.companyLogo}>
//                                   <img src={company.img} alt="company logo" />
//                                   <span style={{ display: "flex", gap: "5px" }}>
//                                     <AiFillMail />
//                                     <p>{company.name}</p>
//                                     <BsGlobeAmericas />
//                                   </span>
//                                 </div>
//                                 <div className={css.companyDetails}>

//                                   <strong>{company.name}</strong>
//                                   <p>{company.address}</p>
//                                   <p>
//                                     <strong>Phone: </strong>
//                                     {company.phone}
//                                   </p>
//                                   <div
//                                     className={
//                                       css.myVendor_company_name_list_specified_feedback
//                                     }
//                                   >
//                                     <img src={company.feedbackImg} alt="feedback" />
//                                     <span>
//                                       <p>{company.ratingCount[0]}%</p>
//                                       <p>({company.ratingCount[1]})</p>
//                                     </span>
//                                     <p>{company.ratingMember}</p>
//                                   </div>

//                                   <p>
//                                     <strong>Fax: </strong>
//                                     {company.fax}
//                                   </p>
//                                   <p>
//                                     <strong>Hours: </strong>
//                                     {company.hours}
//                                   </p>
//                                   <p>
//                                     <strong>Ship By: </strong>
//                                     {company.shipBy}
//                                   </p>
//                                   <div className={css.rating}>
//                                     {/* <span>({company.reviews})</span> */}
//                                     <p>{company.membership}</p>
//                                   </div>
//                                 </div>
//                               </div>

//                               {/* Middle Section: Action Button */}
//                               <div className={css.companySec}>

//                                 <div className={css.companyAction}>
//                                   <img src={venIcon} alt="vendorIcon" srcset="" style={{ width: "30px" }} />
//                                   <button type="button" className={css.firstButton}>First</button>
//                                 </div>
//                               </div>

//                               {/* Right Section: Notes Section */}
//                               <div className={css.companyNotes}>
//                                 <label htmlFor="notes">My Notes:</label>
//                                 <textarea id="notes" name="notes" rows="5" placeholder="Enter your personal notes about this vendor here."></textarea>
//                                 <button type="button" className={css.saveButton}>Save</button>
//                                 <MdPersonRemove />
//                               </div>
//                             </section>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyVendors;

import React, { useEffect, useState } from "react";
import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
import css from "../../../styles/Menu/Tools/MyContact.module.css";
import { companyList } from "../../../data/tableData";
import { AiFillMail } from "react-icons/ai";
import { MdPeople, MdPersonAddAlt1, MdPersonRemove } from "react-icons/md";
import { BsGlobeAmericas } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import SearchMyContact from "./SearchMyContact";
import { useDispatch, useSelector } from "react-redux";
import { getMyVendors, removeMyVendors } from "../../../ReduxStore/ToolsSlice";
import Cookies from "js-cookie";
import { FaUsers } from "react-icons/fa";
import { CiSquareRemove } from "react-icons/ci";
import Footer from "../../Footer/Footer";
import { fetchUserData } from "../../../ReduxStore/ProfleSlice";
import { brokerAPI } from "../../api/BrokerEndpoint";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { setTogglePopUp } from "@/ReduxStore/SearchProductSlice";
import CompanyDetails from "../../Popups/CompanyDetails/CompanyDetails";
import { setPopupCompanyDetail } from "@/ReduxStore/SearchProductSlice";
import { AiOutlineUserDelete } from "react-icons/ai";
import { Tooltip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const MyVendors = () => {
  const token = Cookies.get("token");
  let [viewAsCompany, setViewAsCompany] = useState(true);
  let [viewAsShow, setViewAsShow] = useState(false);
  let [viewAsCountry, setViewAsCountry] = useState(false);
  let [viewAsState, setViewAsState] = useState(false);
  const { myVendor, loading } = useSelector((store) => store.toolsStore);
  console.log("MY Vendors", myVendor);

  const dispatch = useDispatch();

  const user_id = Cookies.get("user_id");

  const { blurWhileLoading, initialData, user, error } = useSelector(
    (state) => state.profileStore
  );

  console.log("Initial Data ", initialData);
  const id = user?.user?.id || user_id;

  useEffect(() => {
    console.log(id);
    dispatch(fetchUserData({ id, token }));
  }, []);

  const companyId = initialData?.company?.id;
  console.log("Company ID", companyId);

  const [feedbackData, setFeedbackData] = useState(null);
  const [headingWord, setHeadingWord] = useState("Company:");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${brokerAPI}feedback/ratings/${companyId}`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         }
  //       })
  //       setFeedbackData(response.data);
  //       console.log("RATINGDATA", feedbackData);
  //     } catch (error) {
  //       console.log("ERRORRATIMG", error)
  //     }
  //   }
  //   fetchData();
  // }, [companyId])

  // Extract ratings and counts for each company

  const companyRatings =
    myVendor?.map((vendor) => vendor?.company?.rating) || [];
  const ratingCounts =
    myVendor?.map((vendor) => vendor?.company?.ratingCount) || [];

  console.log(
    "Company Ratings in %:",
    companyRatings.map((rating) => (rating / 5) * 100)
  );

  console.log("Rating Counts:", ratingCounts);
  const handleHover = (index) => {
    // Tooltip logic
    return index <= rating ? "View Comments" : "";
  };

  // const handleChange = (e) => {
  //   if (e.target.value === "company") {
  //     setViewAsCompany(true);
  //     setViewAsShow(false);
  //     setViewAsCountry(false);
  //     setViewAsState(false);
  //   } else if (e.target.value === "show") {
  //     setViewAsCompany(false);
  //     setViewAsShow(true);
  //     setViewAsCountry(false);
  //     setViewAsState(false);
  //   } else if (e.target.value === "country") {
  //     setViewAsCompany(false);
  //     setViewAsShow(false);
  //     setViewAsCountry(true);
  //     setViewAsState(false);
  //   } else if (e.target.value === "state") {
  //     setViewAsCompany(false);
  //     setViewAsShow(false);
  //     setViewAsCountry(false);
  //     setViewAsState(true);
  //   }
  // };


  const handleChange = (e) => {
    setHeadingWord(e.target.selectedOptions[0].dataset.label);

    const value = e.target.value;
  
    if (value.startsWith("company")) {
      setViewAsCompany(true);
      setViewAsShow(false);
      setViewAsCountry(false);
      setViewAsState(false);
    } else if (value.startsWith("show")) {
      setViewAsCompany(false);
      setViewAsShow(true);
      setViewAsCountry(false);
      setViewAsState(false);
    } else if (value === "country") {
      setViewAsCompany(false);
      setViewAsShow(false);
      setViewAsCountry(true);
      setViewAsState(false);
    } else if (value === "state") {
      setViewAsCompany(false);
      setViewAsShow(false);
      setViewAsCountry(false);
      setViewAsState(true);
    }
  };
  
  const removeFromMyVendors = (id) => {
    const companyId = { company_id: id };
    console.log(companyId);
    dispatch(removeMyVendors({ companyId, token }));
  };

   const theme = createTheme({
      components: {
        MuiTooltip: {
          styleOverrides: {
            tooltip: {
              fontSize: "1.2rem", // Adjust font size
              width: "11rem",
              textAlign: "center",
              backgroundColor: "var(--primary-color)",
            },
            arrow: {
              color: "var(--primary-color)",
            },
          },
        },
      },
    });

  useEffect(() => {
    dispatch(getMyVendors({ token }));
    // if (myVendor.length === 0) {
    //   setViewAsCompany(true);
    // }
  }, []);

  const { togglePopUp, popupCompanyDetail } = useSelector(
    (state) => state.searchProductStore
  );
  // Company Modal Logic
  const openCompanyModal = (company) => {
    console.log("Opening Company Modal with Company:", company);
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUp()); // Show company modal
  };

  if (loading) {
    return <p>Loading...</p>;
  }



  return (
    <>
      <div className={css.inventory}>
        <div className={css.vendor_vanLink}>
          <div className={myProfile.profileInfo_links}>
            <ul>
              <li>
                <NavLink
                  to="/myprofile"
                  end // This ensures the exact match for /myprofile
                  className={({ isActive }) =>
                    isActive ? myProfile.active : ""
                  }
                >
                  <span>Personal Info</span>
                </NavLink>
              </li>
              {/* <li>
                  <NavLink
                    to="/myprofile/Options"
                    className={({ isActive }) => (isActive ? myProfile.active : '')}
                  >
                    <span>Options</span>
                  </NavLink>
                </li> */}
              <li>
                  <NavLink
                    to="/myprofile/MyVendors"
                    className={({ isActive }) => (isActive ? myProfile.active : '')}
                  >
                    <span>My Vendors</span>
                  </NavLink>
                </li>
              <li>
                <NavLink
                  to="/myprofile/MyContact"
                  className={({ isActive }) =>
                    isActive ? myProfile.active : ""
                  }
                >
                  <span>My Contacts</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/myprofile/broadcastfilter"
                  className={({ isActive }) =>
                    isActive ? myProfile.active : ""
                  }
                >
                  <span>Broadcast Filters</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className={css.vendor_p}>
          <p>My Vendors</p>
        </div>
        <div className={css.vendor}>
          <div className={css.vendor_view}>
            <div className={css.searchVendor}>
              <div className={css.searchVendor_search}>
                <SearchMyContact />
              </div>
            </div>
            <div className="!flex !justify-center !items-center !gap-5">
              <p className="!text-xl">view by</p>
              <select onChange={handleChange}>
                <option value="company">Company</option>
                <option value="show: First ">Display</option>
                <option value="country">Country</option>
                <option value="state">State</option>
              </select>
            </div>
          </div>
          <h1 className="ml-[2vw]">{headingWord}</h1>
          <div className={css.myVendor}>
            {viewAsCompany && (
              <>
                <div className={css.myVendor_link}>
                  <div>
                    <Link to={"##"}>#</Link>
                    <Link to={"#A"}>A</Link>
                    <Link to={"#B"}>B</Link>
                    <Link to={"#C"}>C</Link>
                    <Link to={"#D"}>D</Link>
                    <Link to={"#E"}>E</Link>
                    <Link to={"#F"}>F</Link>
                    <Link to={"#G"}>G</Link>
                    <Link to={"#H"}>H</Link>
                    <Link to={"#I"}>I</Link>
                    <Link to={"#J"}>J</Link>
                    <Link to={"#K"}>K</Link>
                    <Link to={"#L"}>L</Link>
                    <Link to={"#M"}>M</Link>
                    <Link to={"#N"}>N</Link>
                    <Link to={"#O"}>O</Link>
                    <Link to={"#P"}>P</Link>
                    <Link to={"#Q"}>Q</Link>
                    <Link to={"#R"}>R</Link>
                    <Link to={"#S"}>S</Link>
                    <Link to={"#T"}>T</Link>
                    <Link to={"#U"}>U</Link>
                    <Link to={"#V"}>V</Link>
                    <Link to={"#W"}>W</Link>
                    <Link to={"#X"}>X</Link>
                    <Link to={"#Y"}>Y</Link>
                    <Link to={"#Z"}>Z</Link>
                  </div>
                </div>
                <div className={css.myVendor_company}>
                  {myVendor?.map((vendor, index) => {
                    return (
                      <div
                        className={css.myVendor_company_list}
                        key={vendor.company.id}
                      >
                        <div className={css.myVendor_company_list_main}>
                          <div className={css.myVendor_company_list_main_img}>
                            <img
                              src={vendor.company.image}
                              alt="vendor logo"
                              className="cursor-pointer"
                              onClick={() => openCompanyModal(vendor.company)}
                            />
                            <span>
                              <p>{vendor.company.name}</p>
                            </span>
                          </div>
                          <div className={css.myVendor_company_list_main_info}>
                            <span onClick={() => openCompanyModal(vendor.company)} className="cursor-pointer">
                              <p>{vendor.company.name}</p>
                              {/* Ratings Display */}

                              <div
                                className={
                                  css.gridHome1_MemberDetail_reviews_stars
                                }
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {[...Array(5)].map((_, starIndex) => {
                                    const rating = companyRatings?.[index] || 0; // Get company-specific rating
                                    const isFilled =
                                      starIndex + 1 <= Math.floor(rating);
                                    const isPartial =
                                      starIndex < rating &&
                                      starIndex + 1 > Math.floor(rating);

                                    return (
                                      <FaStar
                                        key={starIndex}
                                        size={24}
                                        color={
                                          isFilled
                                            ? "#FFD700"
                                            : isPartial
                                            ? "rgba(255, 215, 0, 0.5)"
                                            : "#CCC"
                                        }
                                        style={{
                                          cursor: "pointer",
                                          marginRight: 4,
                                          width: "15px",
                                        }}
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                            </span>

                            {/* Display Rating Value & Count */}
                            <span>
                              <p
                                className="cursor-pointer"
                                onClick={() => openCompanyModal(vendor.company)}
                              >
                                {/* {vendor.company.name} */}
                                Rating:
                              </p>
                              <p>
                                (
                                {companyRatings[index] == null ||
                                isNaN(companyRatings[index])
                                  ? "N/A"
                                  : (
                                      (Math.min(
                                        Math.max(companyRatings[index], 0),
                                        5
                                      ) /
                                        5) *
                                      100
                                    ).toFixed(1) + "%"}
                                )
                              </p>
                            </span>
                            {/* <span>
                              <p>Rating:</p>
                              <p>{vendor.company.name}</p>
                            </span> */}
                            <span>
                              <p>Location:</p>
                              <p>{vendor.company.city} {vendor.company.state} {vendor.company.country}</p>
                            </span>
                            <span>
                              <p>Phone:</p>
                              <p>{vendor.company.phone_num}</p>
                            </span>
                            <span>
                              <p>Fax:</p>
                              <p>{vendor.company.fax}</p>
                            </span>
                            <span>
                              <p>Hours:</p>
                              <p>
                                {vendor.company.open_timing} to{" "}
                                {vendor.company.close}
                              </p>
                            </span>
                            <span>
                              <p>Ship by:</p>
                              <p>{vendor.company.shipBy}</p>
                            </span>
                        
                          </div>
                          <div
                            className={
                              css.myVendor_company_list_main_notesRating
                            }
                          >
                            <div
                              className={css.myVendor_company_list_main_notes}
                            >
                              <span>
                                <p>Notes:</p>
                              </span>
                              <span>
                                <textarea
                                  name="notes"
                                  id="notes"
                                  cols={10}
                                  rows={6}
                                  className="!w-80"
                                ></textarea>
                              </span>
                              <span>
                                <button
                                  type="button"
                                  className={
                                    css.myVendor_company_list_main_notes_btn
                                  }
                                >
                                  save
                                </button>
                              </span>
                            </div>
                            {/* <div
                              className={css.myVendor_company_list_main_rating}
                            >
                              <input
                                type="range"
                                name="ratingContact"
                                id="ratingContact"
                                min={0}
                                max={5}
                              />
                              <span>My Rating: 4</span>
                            </div> */}
                          </div>
                          <div
                            className={css.myVendor_company_list_main_actions}
                          >
                            <ThemeProvider theme={theme}>
                              <Tooltip title="Remove from my vendors" arrow placement="right">
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeFromMyVendors(vendor.company.id)
                                  }
                                >
                                  X
                                </button>
                              </Tooltip>
                            </ThemeProvider>
                          </div>
                          <div className="cursor-pointer">
                          <ThemeProvider theme={theme}>
                            <Tooltip title="Block this vendor from vewing my inventory" arrow placement="right">
                              <span><AiOutlineUserDelete /></span>
                            </Tooltip>
                          </ThemeProvider>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            {viewAsShow && (
              <div className={css.myVendor_company_display}>
                <h1>Display: Normal</h1>
                {companyList.map((group, index) => {
                  const companyName = Object.keys(group)[0]; // Get the company group name (e.g., 'Company A')
                  const companies = group[companyName]; // Get the array of companies in this group
                  return (
                    <div key={index} className={css.myVendor_company_name}>
                      <div className={css.myVendor_company_name_list}>
                        {companies.map((company, index) => {
                          return (
                            <div
                              key={company.name}
                              className={
                                css.myVendor_company_name_list_specified
                              }
                            >
                              <div
                                className={
                                  css.myVendor_company_name_list_specified_main
                                }
                              >
                                <div
                                  className={
                                    css.myVendor_company_name_list_specified_img
                                  }
                                >
                                  <img src={company.img} alt="company logo" />
                                  <span>
                                    <AiFillMail />
                                    <p>{company.name}</p>
                                    <BsGlobeAmericas />
                                  </span>
                                </div>
                                <div
                                  className={
                                    css.myVendor_company_name_list_specified_desc
                                  }
                                >
                                  <div>
                                    <div>
                                      <strong>{company.name}</strong>
                                      <p>{company.address}</p>
                                    </div>
                                    <p>
                                      <strong>phone: </strong>
                                      {company.phone}
                                    </p>
                                  </div>
                                  <p>{company.description}</p>
                                </div>
                              </div>
                              <div
                                className={
                                  css.myVendor_company_name_list_specified_feedback
                                }
                              >
                                <img src={company.feedbackImg} alt="feedback" />
                                <span>
                                  <p>{company.ratingCount[0]}%</p>
                                  <p>({company.ratingCount[1]})</p>
                                </span>
                                <p>{company.ratingMember}</p>
                              </div>
                              <div
                                className={
                                  css.myVendor_company_name_list_specified_add
                                }
                              >
                                <MdPersonAddAlt1 />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      {togglePopUp && (
        <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />
      )}
    </>
  );
};

export default MyVendors;

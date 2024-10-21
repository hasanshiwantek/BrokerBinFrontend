// import React, { useEffect, useState } from "react";
// import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
// import css from "../../../styles/Menu/Tools/MyVendors.module.css";
// import { companyList } from "../../../data/tableData";
// import { AiFillMail } from "react-icons/ai";
// import { MdPeople, MdPersonAddAlt1, MdPersonRemove } from "react-icons/md";
// import { BsGlobeAmericas } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import SearchCompany from "../Main/SearchCompany";
// import SearchMyVendor from "./SearchMyVendor";
// import { useDispatch, useSelector } from "react-redux";
// import { getMyVendors, removeMyVendors } from "../../../ReduxStore/ToolsSlice";
// import Cookies from "js-cookie";
// import { FaUsers } from "react-icons/fa";
// import { CiSquareRemove } from "react-icons/ci";

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
//     console.log(companyId);
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
//                 <Link to={"/myprofile"}>
//                   <span>Personal Info</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to={"/myprofile/Options"}>
//                   <span>Options</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to={"/myprofile/MyVendors"}>
//                   <span>My Vendors</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to={"/myprofile/MyContact"}>
//                   <span>My Contacts</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to={"/myprofile/broadcastfilter"}>
//                   <span>Broadcast Filters</span>
//                 </Link>
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
//                               <div className={css.companyFirstSection}>

//                               </div>
//                             <div
//                               key={company.name}
//                               className={
//                                 css.myVendor_company_name_list_specified
//                               }
//                             >
//                               <div
//                                 className={
//                                   css.myVendor_company_name_list_specified_main
//                                 }
//                               >
//                                 <div
//                                   className={
//                                     css.myVendor_company_name_list_specified_img
//                                   }
//                                 >
//                                   <img src={company.img} alt="company logo" />
//                                   <span>
//                                     <AiFillMail />
//                                     <p>{company.name}</p>
//                                     <BsGlobeAmericas />
//                                   </span>
//                                 </div>
//                                 <div
//                                   className={
//                                     css.myVendor_company_name_list_specified_desc
//                                   }
//                                 >
//                                   <div>
//                                     <div>
//                                       <strong>{company.name}</strong>
//                                       <p>{company.address}</p>
//                                     </div>


//                                     <p>
//                                       <strong>phone: </strong>
//                                       {company.phone}
//                                     </p>
//                                   </div>
//                                   <p>{company.description}</p>
//                                 </div>
//                               </div>
//                               <div
//                                 className={
//                                   css.myVendor_company_name_list_specified_feedback
//                                 }
//                               >
//                                 <img src={company.feedbackImg} alt="feedback" />
//                                 <span>
//                                   <p>{company.ratingCount[0]}%</p>
//                                   <p>({company.ratingCount[1]})</p>
//                                 </span>
//                                 <p>{company.ratingMember}</p>
//                               </div>
//                               <div
//                                 className={
//                                   css.myVendor_company_name_list_specified_add
//                                 }
//                               >
//                                 <MdPersonAddAlt1 />
//                               </div>
//                             </div>
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

//       <footer>
//                 <div className={css.footerlinks}>
//                     <li><a href="/">Advertising Programs</a></li>
//                     <li><a href="/">Business Solutions</a></li>
//                     <li><a href="/">About BrokerBin.com</a></li>
//                     <li>©2024 Privacy</li>
//                 </div>
//             </footer>
//     </>
//   );
// };

// export default MyVendors;


















import React, { useEffect, useState } from "react";
import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
import css from "../../../styles/Menu/Tools/MyVendors.module.css";
import { companyList } from "../../../data/tableData";
import { AiFillMail } from "react-icons/ai";
import { MdPeople, MdPersonAddAlt1, MdPersonRemove } from "react-icons/md";
import { BsGlobeAmericas } from "react-icons/bs";
import { Link,NavLink } from "react-router-dom";
import SearchCompany from "../Main/SearchCompany";
import SearchMyVendor from "./SearchMyVendor";
import { useDispatch, useSelector } from "react-redux";
import { getMyVendors, removeMyVendors } from "../../../ReduxStore/ToolsSlice";
import Cookies from "js-cookie";
import { FaUsers } from "react-icons/fa";
import { CiSquareRemove } from "react-icons/ci";
import venIcon from "../../../assets/my-vendors.svg";
const MyVendors = () => {
  const token = Cookies.get("token");
  let [viewAsCompany, setViewAsCompany] = useState(false);
  let [viewAsShow, setViewAsShow] = useState(true);
  let [viewAsCountry, setViewAsCountry] = useState(false);
  let [viewAsState, setViewAsState] = useState(false);
  const { myVendor, loading } = useSelector((store) => store.toolsStore);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.value === "company") {
      setViewAsCompany(true);
      setViewAsShow(false);
      setViewAsCountry(false);
      setViewAsState(false);
    } else if (e.target.value === "show") {
      setViewAsCompany(false);
      setViewAsShow(true);
      setViewAsCountry(false);
      setViewAsState(false);
    } else if (e.target.value === "country") {
      setViewAsCompany(false);
      setViewAsShow(false);
      setViewAsCountry(true);
      setViewAsState(false);
    } else if (e.target.value === "state") {
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

  useEffect(() => {
    dispatch(getMyVendors({ token }));
    // if (myVendor.length === 0) {
    //   setViewAsCompany(true);
    // }
  }, []);

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
                    end  // This ensures the exact match for /myprofile
                    className={({ isActive }) => (isActive ? myProfile.active : '')}
                  >
                    <span>Personal Info</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/myprofile/Options"
                    className={({ isActive }) => (isActive ? myProfile.active : '')}
                  >
                    <span>Options</span>
                  </NavLink>
                </li>
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
                    className={({ isActive }) => (isActive ? myProfile.active : '')}
                  >
                    <span>My Contacts</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/myprofile/broadcastfilter"
                    className={({ isActive }) => (isActive ? myProfile.active : '')}
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
                <SearchMyVendor />
              </div>
            </div>
            <div>
              <p>view by</p>
              <select onChange={handleChange}>
                <option value="show">Display</option>
                <option value="company">Company</option>
                <option value="country">Country</option>
                <option value="state">State</option>
              </select>
            </div>
          </div>
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
                  {myVendor?.map((vendor) => {
                    return (
                      <div
                        className={css.myVendor_company_list}
                        key={vendor.company.id}
                      >
                        <div className={css.myVendor_company_list_main}>
                          <div className={css.myVendor_company_list_main_img}>
                            <img src={vendor.company.image} alt="vendor logo" />
                            <span>
                              <AiFillMail />
                              <p>{vendor.company.name}</p>
                              <BsGlobeAmericas />
                            </span>
                          </div>
                          <div className={css.myVendor_company_list_main_info}>
                            <span>
                              <strong>company:</strong>
                              <p>{vendor.company.name}</p>
                            </span>
                            <span>
                              <strong>fax:</strong>
                              <p>{vendor.company.phone_num}</p>
                            </span>
                            <span>
                              <strong>phone:</strong>
                              <p>{vendor.company.phone_num}</p>
                            </span>

                         
                            <span>
                              <strong>hours:</strong>
                              <p>
                                {vendor.company.open_timing} to{" "}
                                {vendor.company.close}
                              </p>
                            </span>
                            <span>
                              <strong>ship by:</strong>
                              <p>4pm</p>
                            </span>
                            <span>
                              <strong>location:</strong>
                              <p>{vendor.company.address}</p>
                            </span>
                          </div>
                          <div
                            className={css.myVendor_company_list_main_display}
                          >
                            <FaUsers />
                            <button type="button">never</button>
                          </div>
                          <div className={css.myVendor_company_list_main_notes}>
                            <span>
                              <strong>Notes:</strong>
                            </span>
                            <span>
                              <textarea
                                name="notes"
                                id="notes"
                                cols={10}
                                rows={6}
                              ></textarea>
                            </span>
                            <span>
                              <button type="button">save</button>
                            </span>
                          </div>
                          <div
                            className={css.myVendor_company_list_main_actions}
                          >
                            <MdPersonRemove />
                            <CiSquareRemove
                              onClick={() =>
                                removeFromMyVendors(vendor.company.id)
                              }
                            />
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
                            <section className={css.companyCard}>
                              {/* Left Section: Company Information */}
                              <div className={css.companyInfo}>
                                <div className={css.companyLogo}>
                                  <img src={company.img} alt="company logo" />
                                  <span style={{ display: "flex", gap: "5px" }}>
                                    <AiFillMail />
                                    <p>{company.name}</p>
                                    <BsGlobeAmericas />
                                  </span>
                                </div>
                                <div className={css.companyDetails}>
                                  <strong>{company.name}</strong>
                                  <p>{company.address}</p>
                                  <p>
                                    <strong>Phone: </strong>
                                    {company.phone}
                                  </p>
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

                                  <p>
                                    <strong>Fax: </strong>
                                    {company.fax}
                                  </p>
                                  <p>
                                    <strong>Hours: </strong>
                                    {company.hours}
                                  </p>
                                  <p>
                                    <strong>Ship By: </strong>
                                    {company.shipBy}
                                  </p>
                                  <div className={css.rating}>
                                    {/* <span>({company.reviews})</span> */}
                                    <p>{company.membership}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Middle Section: Action Button */}
                              <div className={css.companySec}>

                                <div className={css.companyAction}>
                                  <img src={venIcon} alt="vendorIcon" srcset="" style={{ width: "30px" }} />
                                  <button type="button" className={css.firstButton}>First</button>
                                </div>
                              </div>

                              {/* Right Section: Notes Section */}
                              <div className={css.companyNotes}>
                                <label htmlFor="notes">My Notes:</label>
                                <textarea id="notes" name="notes" rows="5" placeholder="Enter your personal notes about this vendor here."></textarea>
                                <button type="button" className={css.saveButton}>Save</button>
                                <MdPersonRemove />
                              </div>
                            </section>
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

      <footer>
        <div className={css.footerlinks}>
          <li><a href="/">Advertising Programs</a></li>
          <li><a href="/">Business Solutions</a></li>
          <li><a href="/">About BrokerBin.com</a></li>
          <li>©2024 Privacy</li>
        </div>
      </footer>
    </>
  );
};

export default MyVendors;



























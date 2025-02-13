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

const MyContact = () => {
  const token = Cookies.get("token");
  let [viewAsCompany, setViewAsCompany] = useState(true);
  let [viewAsShow, setViewAsShow] = useState(false);
  let [viewAsCountry, setViewAsCountry] = useState(false);
  let [viewAsState, setViewAsState] = useState(false);
  const { myVendor, loading } = useSelector((store) => store.toolsStore);
  console.log("MY Vendors", myVendor)

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

  const companyId = initialData?.company?.id
  console.log("Company ID", companyId)

  const [feedbackData, setFeedbackData] = useState(null);


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

  const companyRatings = myVendor?.map((vendor) => vendor?.company?.rating) || [];
  const ratingCounts = myVendor?.map((vendor) => vendor?.company?.ratingCount) || [];

  console.log("Company Ratings in %:", companyRatings.map(rating => (rating / 5) * 100));

  console.log("Rating Counts:", ratingCounts);
  const handleHover = (index) => {
    // Tooltip logic
    return index <= rating ? "View Comments" : "";
  };

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
              {/* <li>
                  <NavLink
                    to="/myprofile/Options"
                    className={({ isActive }) => (isActive ? myProfile.active : '')}
                  >
                    <span>Options</span>
                  </NavLink>
                </li> */}
              {/* <li>
                  <NavLink
                    to="/myprofile/MyVendors"
                    className={({ isActive }) => (isActive ? myProfile.active : '')}
                  >
                    <span>My Vendors</span>
                  </NavLink>
                </li> */}
              <li>
                <NavLink
                  to="/myprofile/MyContact"
                  className={({ isActive }) => (isActive ? myProfile.active : '')}
                >
                  <span>My Vendors</span>
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
                <SearchMyContact />
              </div>
            </div>
            <div>
              <p>view by</p>
              <select onChange={handleChange}>
                <option value="company">Company</option>
                {/* <option value="show">Display</option>
                <option value="country">Country</option>
                <option value="state">State</option> */}
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
                  {myVendor?.map((vendor, index) => {
                    return (
                      <div
                        className={css.myVendor_company_list}
                        key={vendor.company.id}
                      >
                        <div className={css.myVendor_company_list_main}>
                          <div className={css.myVendor_company_list_main_img}>
                            <img src={vendor.company.image} alt="vendor logo" />
                            <span>
                              <p>{vendor.company.name}</p>
                            </span>
                          </div>
                          <div className={css.myVendor_company_list_main_info}>
                            <span>
                              <p >{vendor.company.name}</p>
                              {/* Ratings Display */}
                              <div className={css.gridHome1_MemberDetail_reviews_stars}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                  {[...Array(5)].map((_, starIndex) => {
                                    const rating = companyRatings?.[index] || 0; // Get company-specific rating
                                    const isFilled = starIndex + 1 <= Math.floor(rating);
                                    const isPartial = starIndex < rating && starIndex + 1 > Math.floor(rating);

                                    return (
                                      <FaStar
                                        key={starIndex}
                                        size={24}
                                        color={isFilled ? "#FFD700" : isPartial ? "rgba(255, 215, 0, 0.5)" : "#CCC"}
                                        style={{ cursor: "pointer", marginRight: 4 }}
                                      />
                                    );
                                  })}
                                </div>

                                {/* Display Rating Value & Count */}
                                <p>
                                  Average Rating: (
                                  {companyRatings[index] == null || isNaN(companyRatings[index])
                                    ? "N/A"
                                    : ((Math.min(Math.max(companyRatings[index], 0), 5) / 5) * 100).toFixed(1) + "%"}
                                  )
                                </p>

                                <p>Total Reviews: {ratingCounts?.[index] || "0"}</p>
                              </div>
                            </span>
                            <span>
                              <p>company:</p>
                              <p>{vendor.company.name}</p>
                            </span>
                            <span>
                              <p>fax:</p>
                              <p>{vendor.company.phone_num}</p>
                            </span>
                            <span>
                              <p>phone:</p>
                              <p>{vendor.company.phone_num}</p>
                            </span>
                            <span>
                              <p>hours:</p>
                              <p>
                                {vendor.company.open_timing} to{" "}
                                {vendor.company.close}
                              </p>
                            </span>
                            <span>
                              <p>ship by:</p>
                              <p>4pm</p>
                            </span>
                            <span>
                              <p>location:</p>
                              <p>{vendor.company.address}</p>
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
                            <button
                              type="button"
                              onClick={() =>
                                removeFromMyVendors(vendor.company.id)
                              }
                            >
                              X
                            </button>
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
    </>
  );
};

export default MyContact;

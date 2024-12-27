import React, { useCallback, useEffect, useRef, useState } from "react";
import css from "../../styles/Home/Home.module.css";
import person from "../../imgs/logo/shadow.png";
import spares from "../../imgs/logo/spares.png";
import { MdContactPage, MdHandshake, MdManageAccounts } from "react-icons/md";
import { BsStarFill } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import ToggleStats from "./ToggleStats";
import HoverPieChart from "./HoverPieChart";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../ReduxStore/ProfleSlice";
import LoadingState from "../../LoadingState";
import ErrorStatus from "../Error/ErrorStatus";
import Cookies from "js-cookie";
import { searchProductHistory, searchProductQuery, setSelectedProducts } from "../../ReduxStore/SearchProductSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchBroadCastCount } from "../../ReduxStore/BroadCast";
import { setTogglePopUp } from "../../ReduxStore/SearchProductSlice";
import CompanyDetails from "../Popups/CompanyDetails/CompanyDetails";
import { setPopupCompanyDetail } from "../../ReduxStore/SearchProductSlice";


const Home = () => {
  const token = Cookies.get("token");
  const user_id = Cookies.get("user_id");

  const navigate = useNavigate();

  const { blurWhileLoading, initialData, user, error } = useSelector(
    (state) => state.profileStore
  );

  console.log("Initial Data ", initialData);

  const { page, pageSize } = useSelector((store) => store.searchProductStore);

  const { broadcastCount, loading } = useSelector((state) => state.broadcastStore)

  // console.log("Broadcast Count ",broadcastCount)
  const id = user?.user?.id || user_id;

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(id);
    dispatch(fetchUserData({ id, token }));
  }, []);

  useEffect(() => {
    dispatch(fetchBroadCastCount({ token }))
  }, [])


  const bomFileRef = useRef(null);
  // <----------------------------------------------------- Access uploaded file name ------------------------------------------------------->
  const handleFileChange = (e) => {
    console.log(e.target.files[0].name);
  };
  const handleBOMButtonClick = (e) => {
    bomFileRef.current.click();
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  if (error) {
    return <ErrorStatus error={error} />;
  }

  const searchProduct = (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    const searchString = formData.searchStrings.trim();
    const searchBy = formData.searchBy; // Get selected radio button value (part, heciClei, keyword)

    if (searchString === "") {
      alert("Blank search is not allowed");
      return;
    }
    let url = '';
    if (searchBy === "part") {
      // If 'Part#' is selected
      url = `/inventory/search?page=1&query=${encodeURIComponent(searchString)}`;
    } else if (searchBy === "heciClei") {
      // If 'HECI / CLEI' is selected
      url = `/inventory/search?page=1&query=${encodeURIComponent(searchString)}`;
    } else if (searchBy === "keyword") {
      // If 'Keyword' is selected
      url = `/inventory/search?page=1&partModel=${encodeURIComponent(searchString)}`;
    }

    // Clear selected products
    dispatch(setSelectedProducts([]));

    // Navigate to the URL with appropriate parameters
    navigate(url, { replace: true });
  };

  const handleNavigation = (path, params = {}) => {
    const query = new URLSearchParams(params).toString();
    navigate(`${path}${query ? `?${query}` : ""}`);
  };



  const { togglePopUp, popupCompanyDetail } = useSelector((state) => state.searchProductStore)
  const company = initialData?.company;
  console.log("COMPANY ", company);

  // Company Modal Logic
  const openCompanyModal = (company) => {
    console.log("Opening Company Modal with Company:", company);
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUp()); // Show company modal
  };
  console.log("popupCompanyDetail", popupCompanyDetail);
  console.log("togglePopUp", togglePopUp);




  return (
    <>
      {!blurWhileLoading ? (
        <LoadingState />
      ) : (
        <>
          <div className={css.gridHome}>
            <div className={css.gridHome1}>

              <div className={`mailSection ${css.mailSection}`}>
                <div className={css.gridHome1_Bar}>
                  <MdContactPage />
                  <p>Service Directory</p>
                  <div style={{ color: "var(--primary-color)" }}>
                    <BiDotsHorizontalRounded />
                  </div>

                  <div className={css.manageDropdown}>
                    <ul>
                      <Link to={"/search"}> <li>Search</li></Link>
                      <Link to={"/manage/my-services"}> <li>Manage my Services</li></Link>

                    </ul>
                  </div>
                </div>
              </div>



              <div className={css.gridHome1_MemberDetail}>
                <div className={css.gridHome1_MemberDetail_profile}>
                  <img
                    src={
                      initialData?.profileImage
                        ? initialData.profileImage
                        : person
                    }
                    alt="person"
                  />
                  <h3>
                    
                    Welcome back,
                    {initialData.firstName}
                  </h3>
                  <div style={{ color: "var(--primary-color)" }}>
                    <BiDotsHorizontalRounded />
                  </div>
                </div>
                <div className={css.gridHome1_MemberDetail_list}>
                  <ul>
                    {/* <li className={css.gridHome1_MemberDetail_list_options}>
                      <a href="#">MYH</a>
                      <ul>
                        <li className={css.gridHome1_MemberDetail_list_numbers}>
                          <a href="#">
                            {(11)
                              .toLocaleString("en-US")
                              .toString()
                              .padStart(2, "0")}
                            /
                          </a>
                          <a href="#">
                            {(25)
                              .toLocaleString("en-US")
                              .toString()
                              .padStart(2, "0")}
                            /
                          </a>
                          <a href="#">
                            {(7)
                              .toLocaleString("en-US")
                              .toString()
                              .padStart(2, "0")}
                          </a>
                        </li>
                      </ul>
                    </li> */}
                    <li className={css.gridHome1_MemberDetail_list_options}>
                      <a href="/rfq">RFQ</a>
                      <ul>
                        <li className={css.gridHome1_MemberDetail_list_numbers}>
                          <a onClick={() => handleNavigation("/rfq", { filter: "unread" })}>
                            {(broadcastCount?.data?.unRead || 0)
                              .toLocaleString("en-US")
                              .toString()
                              .padStart(2, "0")}
                            /
                          </a>
                          <a onClick={() => handleNavigation("/rfq")}>
                            {(broadcastCount?.data?.received || 0)
                              .toLocaleString("en-US")
                              .toString()
                              .padStart(2, "0")}
                            /
                          </a>
                          <a onClick={() => handleNavigation("/rfqSent")}>
                            {(broadcastCount?.data?.sent || 0)
                              .toLocaleString("en-US")
                              .toString()
                              .padStart(2, "0")}

                          </a>
                        </li>
                      </ul>
                    </li>
                    {/* <li className={css.gridHome1_MemberDetail_list_options}>
                      <Link to="/feedback">my contacts</Link>
                      <ul>
                        <li className={css.gridHome1_MemberDetail_list_numbers}>
                          <a href="#">
                            {(51)
                              .toLocaleString("en-US")
                              .toString()
                              .padStart(2, "0")}
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className={css.gridHome1_MemberDetail_list_options}>
                      <Link to="/myprofile/MyVendors">my vendors</Link>
                      <ul>
                        <li className={css.gridHome1_MemberDetail_list_numbers}>
                          <a href="#">
                            {(6)
                              .toLocaleString("en-US")
                              .toString()
                              .padStart(2, "0")}
                          </a>
                        </li>
                      </ul>
                    </li> */}
                    <li className={css.gridHome1_MemberDetail_list_options}>
                      <Link to="/hotlist/view">hot list</Link>
                      <ul>
                        <li className={css.gridHome1_MemberDetail_list_numbers}>
                          <a onClick={() => handleNavigation("/hotList/view")}>
                            {(broadcastCount?.data?.hotList || 0)
                              .toLocaleString("en-US")
                              .toString()
                              .padStart(2, "0")}

                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className={css.gridHome1_MemberDetail_logo} >
                  <img src={initialData.company.image} alt="spares" onClick={() => openCompanyModal(company)} className="cursor-pointer !mt-28" width={"60%"} height={"60%"} />
                </div>
                <div className={css.gridHome1_MemberDetail_reviews}>
                  {/* <div className={css.gridHome1_MemberDetail_reviews_stars}>
                    <div data-v-217e3916="" class="vue-rate-it-rating">
                      <div data-v-217e3916="" class="vue-rate-it-rating-item">
                        <div data-v-217e3916="" step="50" style={{ display: "inline-block", marginRight: "1px" }}>
                          <svg width="17" height="17" viewBox="0 0 179 179" style={{ overflow: "visible" }}>
                            <linearGradient id="vgnr2v" x1="-2%" x2="100%" y1="0%" y2="0%">
                              <stop offset="102%" stop-color="#FFD700"></stop>
                              <stop offset="102%" stop-color="#CCC"></stop>
                            </linearGradient>
                            <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="url(#vgnr2v)" stroke="#999" stroke-width="2" vector-effect="non-scaling-stroke" transform="scale(0.1)"></path>
                            <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="url(#vgnr2v)" transform="scale(0.1)"></path>
                          </svg>
                        </div>
                      </div>
                      <div data-v-217e3916="" class="vue-rate-it-rating-item">
                        <div data-v-217e3916="" step="50" style={{ display: "inline-block", marginRight: "1px" }}>
                          <svg width="17" height="17" viewBox="0 0 179 179" style={{ overflow: "visible" }}>
                            <linearGradient id="sjx8c" x1="-2%" x2="100%" y1="0%" y2="0%">
                              <stop offset="102%" stop-color="#FFD700"></stop>
                              <stop offset="102%" stop-color="#CCC"></stop>
                            </linearGradient>
                            <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="url(#sjx8c)" stroke="#999" stroke-width="2" vector-effect="non-scaling-stroke" transform="scale(0.1)"></path>
                            <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="url(#sjx8c)" transform="scale(0.1)"></path>
                          </svg>
                        </div>
                      </div>
                      <div data-v-217e3916="" class="vue-rate-it-rating-item">
                        <div data-v-217e3916="" step="50" style={{ display: "inline-block", marginRight: "1px" }}>
                          <svg width="17" height="17" viewBox="0 0 179 179" style={{ overflow: "visible" }}>
                            <linearGradient id="ax5l1m" x1="-2%" x2="100%" y1="0%" y2="0%">
                              <stop offset="102%" stop-color="#FFD700"></stop>
                              <stop offset="102%" stop-color="#CCC"></stop>
                            </linearGradient>
                            <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="url(#ax5l1m)" stroke="#999" stroke-width="2" vector-effect="non-scaling-stroke" transform="scale(0.1)"></path>
                            <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="url(#ax5l1m)" transform="scale(0.1)"></path>
                          </svg>
                        </div>
                      </div>
                      <div data-v-217e3916="" class="vue-rate-it-rating-item">
                        <div data-v-217e3916="" step="50" style={{ display: "inline-block", marginRight: "1px" }}>
                          <svg width="17" height="17" viewBox="0 0 179 179" style={{ overflow: "visible" }}>
                            <linearGradient id="19xik" x1="-2%" x2="100%" y1="0%" y2="0%">
                              <stop offset="102%" stop-color="#FFD700"></stop>
                              <stop offset="102%" stop-color="#CCC"></stop>
                            </linearGradient>
                            <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="url(#19xik)" stroke="#999" stroke-width="2" vector-effect="non-scaling-stroke" transform="scale(0.1)"></path>
                            <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="url(#19xik)" transform="scale(0.1)"></path>
                          </svg>
                        </div>
                      </div>
                      <div data-v-217e3916="" class="vue-rate-it-rating-item">
                        <div data-v-217e3916="" step="50" style={{ display: "inline-block", marginRight: "1px" }}>
                          <svg width="17" height="17" viewBox="0 0 179 179" style={{ overflow: "visible" }}>
                            <linearGradient id="wiiipk" x1="-2%" x2="100%" y1="0%" y2="0%">
                              <stop offset="102%" stop-color="#FFD700"></stop>
                              <stop offset="102%" stop-color="#CCC"></stop>
                            </linearGradient>
                            <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="url(#wiiipk)" stroke="#999" stroke-width="2" vector-effect="non-scaling-stroke" transform="scale(0.1)"></path>
                            <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="url(#wiiipk)" transform="scale(0.1)"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <a href="#">100%</a>
                  </div> */}

                  {/* <div className={css.gridHome1_MemberDetail_reviews_watchList}>
                    <a href="#">
                      Watch List Companies{" "}
                      <span className={css.newW}>
                        (
                        {(3)
                          .toLocaleString("en-US")
                          .toString()
                          .padStart(2, "0")}{" "}
                        New)
                      </span>
                    </a>
                  </div> */}
                  {/* </div> */}
                  {/* <div className={css.gridHome1_MemberDetail_comments}>
                    <Link to={"/feedbackprofile"}>
                      Comments{" "}
                      <span>
                        {(1)
                          .toLocaleString("en-US")
                          .toString()
                          .padStart(2, "0")}
                      </span>
                    </Link>
                    <a href="#" className={css.newW}>
                      New
                      <span>
                        {(0)
                          .toLocaleString("en-US")
                          .toString()
                          .padStart(2, "0")}
                      </span>
                    </a>
                    <a href="#">
                      Who's New:{" "}
                      <span>
                        {(43)
                          .toLocaleString("en-US")
                          .toString()
                          .padStart(2, "0")}
                      </span>
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
            <div className={css.gridHome2}>
              <div className={css.gridHome2_Bar}>
                {/* <div >
                  <MdMail />
                  <p>manage</p>
                  <BiDotsHorizontalRounded />
                </div> */}

                <div className={`mailSection ${css.mailSection}`}>
                  <MdManageAccounts />
                  <p>Manage</p>
                  <div style={{ color: "var(--primary-color)" }}>
                    <BiDotsHorizontalRounded />
                  </div>
                  <div className={css.manageDropdown}>
                    <ul>
                      <Link to={"/inventory"}> <li>Inventory</li></Link>
                      <Link to={"/rfq"}> <li>My RFQs</li></Link>
                      <Link> <li>My BOM</li></Link>
                      <Link to={"/myprofile"}> <li>My Profile</li></Link>
                      <Link> <li>My Company</li></Link>
                      <Link to={"/manage/my-services"}> <li>My Services</li></Link>
                      <Link to={"/venprice"}> <li>Vendor Pricing</li></Link>

                    </ul>
                  </div>
                </div>





                <div className={`mailSection ${css.mailSection}`}>
                  <MdHandshake />
                  <p>Safe Trading Center</p>
                  <div style={{ color: "var(--primary-color)" }}>
                    <BiDotsHorizontalRounded />
                  </div>
                  <div className={css.manageDropdown}>
                    <ul>
                      <Link to={"/ethics"}> <li>Ethics Complaint</li></Link>
                      <Link to={"/feedback"}> <li>Report an Issue</li></Link>
                      <Link> <li>Watch List Companies</li></Link>

                    </ul>
                  </div>
                </div>


              </div>
              <div className={css.gridHome2_Details}>
                <div className={css.gridHome2_Details_Upper}>
                  {/* <div className={css.gridHome2_Details_Upper_Ad}></div> */}
                  <div className={css.gridHome2_Details_Upper_Right}>
                    <div
                      className={css.gridHome2_Details_Upper_Right_PartSearch}
                    >
                      <form method="post" onSubmit={searchProduct}>
                        <h1>Parts Search</h1>
                        <textarea
                          name="searchStrings"
                          id="dashboard-searchbox"
                          cols="30"
                          rows="10"
                          placeholder="(List multiple search strings separated by returns for the same search category)"
                          style={{ height: "10rem" }}
                        ></textarea>

                        <div>
                          <input
                            id={css.gridHome2_Details_Upper_Right_PartSearch_btn}
                            type="submit"
                            value="SUBMIT"
                            className="cursor-pointer"
                          />
                          <div>
                            <label>
                              Part#
                              <input type="radio" name="searchBy" value="part" />
                            </label>
                            <label>
                              HECI / CLEI
                              <input type="radio" name="searchBy" value="heciClei" />
                            </label>
                            <label>
                              Keyword
                              <input type="radio" name="searchBy" value="keyword" />
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* <div className={css.gridHome2_Details_Upper_Right_Bom}>
                      <div>
                        <h3>BOM Utility</h3>
                        <p>(Bill of Materials)</p>
                      </div>
                      <div>
                        <input
                          type="file"
                          name="bomFile"
                          id="uploadBomFile"
                          hidden
                          ref={bomFileRef}
                          onChange={handleFileChange}
                        />
                        <button type="file" onClick={handleBOMButtonClick}>
                          LOAD BOM FILE
                        </button>
                        <a href="#">Load test file .xls</a>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className={css.gridHome2_Details_Bottom}>
                  <ToggleStats data={broadcastCount.data} />


                  {loading || !broadcastCount?.data ? (
                    <p>Loading...</p>
                  ) : (
                    <HoverPieChart data={broadcastCount.data} />
                  )}

                </div>
              </div>
            </div>
          </div>


        </>
      )}
      {togglePopUp && <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />}

    </>
  );
};

export default Home;

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
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

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





  // const searchProduct = (event) => {
  //   event.preventDefault();

  //   const form = new FormData(event.target);
  //   const formData = Object.fromEntries(form.entries());

  //   let searchString = formData.searchStrings.trim(); // User's search input
  //   const searchBy = formData.searchBy; // Selected search type (part, heciClei, keyword)

  //   if (!searchString) {
  //     alert("Blank search is not allowed");
  //     return;
  //   }

  //   // Replace spaces with commas
  //   searchString = searchString.replace(/\s+/g, ",");

  //   // Build the correct URL based on searchBy
  //   let url = '/inventory/search?page=1';
  //   if (searchBy === 'part' || searchBy === 'heciClei') {
  //     // Use `query` for 'Part#' and 'HECI / CLEI'
  //     url += `&query=${encodeURIComponent(searchString)}`;
  //   } else if (searchBy === 'keyword') {
  //     // Use `partModel` for 'Keyword'
  //     url += `&partModel=${encodeURIComponent(searchString)}`;
  //   }

  //   // Clear selected products before navigating
  //   dispatch(setSelectedProducts([]));

  //   // Navigate to the SearchProduct page with the constructed URL
  //   navigate(url, { replace: true });

  //   console.log("Navigated to URL:", url); // Debug log to verify the URL
  // };



  // State for search input and selected searchBy option
  const [searchString, setSearchString] = useState("");
  const [searchBy, setSearchBy] = useState("part"); // Default: "Part#"

  const handleSearchInputChange = (event) => {
    setSearchString(event.target.value);
  };

  const handleSearchTypeChange = (event) => {
    setSearchBy(event.target.value);
  };

  const searchProduct = (event) => {
    event.preventDefault();

    let formattedSearch = searchString.trim();
    if (!formattedSearch) {
      alert("Blank search is not allowed");
      return;
    }

    // Replace spaces with commas
    formattedSearch = formattedSearch.replace(/\s+/g, ",");

    // Determine the correct query parameter based on searchBy selection
    let queryParam;
    if (searchBy === "keyword" || searchBy === "heciClei") {
        queryParam = "partModel"; // Use 'partModel' for both 'keyword' and 'heciClei'
    } else {
        queryParam = "query"; // Default for 'part'
    }

    let url = `/inventory/search?page=1&${queryParam}=${encodeURIComponent(formattedSearch)}`;

    // Clear selected products before navigating
    dispatch(setSelectedProducts([]));

    // Navigate to search results page
    navigate(url, { replace: true });

    console.log("Navigated to URL:", url); // Debugging log
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
            color: "var(--primary-color)"
          }
        },
      },
    },
  });


  const ratingCount = initialData?.company?.ratingCount;



  const companyRatings = initialData?.company?.rating || [];
  const ratingCounts = initialData?.company?.ratingCount || [];

  console.log("Company Ratings ", companyRatings);

  console.log("Rating Counts:", ratingCounts);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} color="gold" size={20} />); // Full Star
      } else if (i - 0.5 === rating) {
        stars.push(<FaStarHalfAlt key={i} color="gold" size={20} />); // Half Star
      } else {
        stars.push(<FaRegStar key={i} color="gray" size={20} />); // Empty Star
      }
    }
    return stars;
  };



  const companyRatingsPer = ((companyRatings / 5) * 100).toFixed(1)
  console.log("Company Ratings in %:", companyRatingsPer);




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
                  <MdManageAccounts />
                  <p>Manage</p>
                  <div style={{ color: "var(--primary-color)" }}>
                    <BiDotsHorizontalRounded />
                  </div>
                  <div className={`${css.manageDropdown} ${css.mgDrop}`}>
                    <ul>
                      <Link to={"/inventory"}> <li>Inventory</li></Link>
                      <Link to={"/rfq"}> <li>My RFQs</li></Link>
                      {/* <Link> <li>My BOM</li></Link> */}
                      <Link to={"/myprofile"}> <li>My Profile</li></Link>
                      <Link to={"/mycompany"} > <li>My Company</li></Link>
                      {/* <Link to={"/manage/my-services"}> <li>My Services</li></Link> */}
                      {/* <Link to={"/venprice"}> <li>Vendor Pricing</li></Link> */}

                    </ul>
                  </div>
                </div>
              </div>



              <div className={css.gridHome1_MemberDetail}>
                <div className={`${css.gridHome1_MemberDetail_profile} ${css.mailSection} `}>
                  <div >
                    <Link to={"/myprofile"} className="flex items-center justify-center gap-5">
                      <img
                        src={
                          initialData?.profileImage
                            ? initialData.profileImage
                            : person
                        }
                        alt="person"
                      />
                      <h3 className="whitespace-nowrap">
                        Welcome back,
                        {initialData.firstName}
                      </h3>
                    </Link>
                  </div>
                  <div style={{ color: "var(--primary-color)" }}>
                    <BiDotsHorizontalRounded />
                  </div>
                  <div className={`${css.manageDropdown} ${css.profileMgDrop}`}>
                    <ul >
                      <Link to={"/myprofile"}> <li>My Profile</li></Link>
                      <Link onClick={() => openCompanyModal(company)}> <li>My Company</li></Link>

                    </ul>
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
                          <ThemeProvider theme={theme}>
                            <Tooltip title="Total Unread" arrow placement="top" >
                              <a onClick={() => handleNavigation("/rfq", { filter: "unread" })}>
                                {(broadcastCount?.data?.unRead || 0)
                                  .toLocaleString("en-US")
                                  .toString()
                                  .padStart(2, "0")}
                                /
                              </a>
                            </Tooltip>
                          </ThemeProvider>
                          <ThemeProvider theme={theme}>
                            <Tooltip title="Total Received" arrow placement="top" >
                              <a onClick={() => handleNavigation("/rfq")}>
                                {(broadcastCount?.data?.received || 0)
                                  .toLocaleString("en-US")
                                  .toString()
                                  .padStart(2, "0")}
                                /
                              </a>
                            </Tooltip>
                          </ThemeProvider>
                          <ThemeProvider theme={theme}>
                            <Tooltip title="Total Sent" arrow placement="top" >
                              <a onClick={() => handleNavigation("/rfqSent")}>
                                {(broadcastCount?.data?.sent || 0)
                                  .toLocaleString("en-US")
                                  .toString()
                                  .padStart(2, "0")}
                              </a>
                            </Tooltip>
                          </ThemeProvider>
                        </li>
                      </ul>
                    </li>




                    <li className={css.gridHome1_MemberDetail_list_options}>
                      <Link to="/myprofile/myContact">My Vendors</Link>
                      <ul>
                        <li className={css.gridHome1_MemberDetail_list_numbers}>
                          <ThemeProvider theme={theme}>
                            <Tooltip title="Vendors" arrow placement="top" >
                              <a onClick={() => handleNavigation("/myprofile/myContact")}>
                                {(broadcastCount?.data?.myVendors || 0)
                                  .toLocaleString("en-US")
                                  .toString()
                                  .padStart(2, "0")}

                              </a>
                            </Tooltip>
                          </ThemeProvider>
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
                      <Link to="/hotlist/view">Hot List</Link>
                      <ul>
                        <li className={css.gridHome1_MemberDetail_list_numbers}>
                          <ThemeProvider theme={theme}>
                            <Tooltip title="Total Hotlists" arrow placement="top" >
                              <a onClick={() => handleNavigation("/hotList/view")}>
                                {(broadcastCount?.data?.hotList || 0)
                                  .toLocaleString("en-US")
                                  .toString()
                                  .padStart(2, "0")}

                              </a>
                            </Tooltip>
                          </ThemeProvider>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className={css.gridHome1_MemberDetail_logo} >
                  <img src={initialData?.company?.image} alt="Company Logo" onClick={() => openCompanyModal(company)} className="cursor-pointer !mt-28" width={"60%"} height={"60%"} />
                </div>
                <div className={css.gridHome1_MemberDetail_reviews}>
                  <div className={css.gridHome1_MemberDetail_reviews_stars}>


                    <div className='flex items-center'>
                      <a href="/feedbackprofile">
                        <span className='flex items-center'>{renderStars(initialData?.company?.rating || 0)}</span>
                      </a>
                    </div>
                    <a href="/feedbackprofile">{companyRatingsPer}%</a>
                  </div>

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
                  <div className={css.gridHome1_MemberDetail_comments}>
                    <Link to={"/feedbackprofile"}>
                      Comments{" "}
                      <span>
                        {ratingCount}
                      </span>
                    </Link>
                    {/* <a href="#" className={css.newW}>
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
                    </a> */}
                  </div>
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

                {/* <div className={`mailSection ${css.mailSection}`}>
                  <MdManageAccounts />
                  <p>Manage</p>
                  <div style={{ color: "var(--primary-color)" }}>
                    <BiDotsHorizontalRounded />
                  </div>
                  <div className={`${css.manageDropdown} ${css.mgDrop}`}>
                    <ul>
                      <Link to={"/inventory"}> <li>Inventory</li></Link>
                      <Link to={"/rfq"}> <li>My RFQs</li></Link>
                       <Link> <li>My BOM</li></Link>
                      <Link to={"/myprofile"}> <li>My Profile</li></Link>
                      <Link to={"/mycompany"}> <li>My Company</li></Link>
                       <Link to={"/manage/my-services"}> <li>My Services</li></Link>
                      <Link to={"/venprice"}> <li>Vendor Pricing</li></Link>

                    </ul>
                  </div>
                </div> */}





                <div className={`mailSection ${css.mailSection}`}>
                  <MdHandshake />
                  <Link to={"/safe_trading"}>
                    <p>Safe Trading Center</p>
                  </Link>
                  <div style={{ color: "var(--primary-color)" }}>
                    <BiDotsHorizontalRounded />
                  </div>
                  <div className={`${css.manageDropdown} ${css.mgDrop}`}>
                    <ul>
                      <Link to={"/ethics"}> <li>Ethics Complaint</li></Link>
                      <Link to={"/feedback"}> <li>Report an Issue</li></Link>
                      {/* <Link> <li>Watch List Companies</li></Link> */}

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
                          value={searchString}
                          onChange={handleSearchInputChange}
                          placeholder="(List multiple search strings separated by returns for the same search category)"
                          rows="5"
                          required
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
                              <input
                                type="radio"
                                name="searchBy"
                                value="part"
                                checked={searchBy === "part"}
                                onChange={handleSearchTypeChange}
                              />
                            </label>
                            <label>
                              HECI / CLEI
                              <input
                                type="radio"
                                name="searchBy"
                                value="heciClei"
                                checked={searchBy === "heciClei"}
                                onChange={handleSearchTypeChange}
                              />
                            </label>
                            <label>
                              Keyword
                              <input
                                type="radio"
                                name="searchBy"
                                value="keyword"
                                checked={searchBy === "keyword"}
                                onChange={handleSearchTypeChange}
                              />
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
import React, { useEffect, useState, useLayoutEffect } from "react";
import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
import css from "../../../styles/Menu/Tools/MyContact.module.css";
import { Link, NavLink } from "react-router-dom";
import SearchMyContact from "./SearchMyContact";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyVendors,
  removeMyVendors,
  addMyVendorNotes,
  fetchMyVendorNotes,
  fetchMyViewByVendors,
} from "../../../ReduxStore/ToolsSlice";
import Cookies from "js-cookie";
import { fetchUserData } from "../../../ReduxStore/ProfleSlice";
import { FaStar } from "react-icons/fa";
import {
  setTogglePopUp,
  setHoverCompanyDetail,
} from "@/ReduxStore/SearchProductSlice";
import CompanyDetails from "../../Popups/CompanyDetails/CompanyDetails";
import { setPopupCompanyDetail } from "@/ReduxStore/SearchProductSlice";
import { AiOutlineUserDelete } from "react-icons/ai";
import { Tooltip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { alphabets } from "@/data/services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const MyVendors = () => {
  const token = Cookies.get("token");
  let [viewAsCompany, setViewAsCompany] = useState(true);
  const [viewBy, setViewBy] = useState("company");
  let [viewAsShow, setViewAsShow] = useState(false);
  let [viewAsCountry, setViewAsCountry] = useState(false);
  let [viewAsState, setViewAsState] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const { myVendor, loading, vendorNoteData } = useSelector(
    (store) => store.toolsStore
  );
  console.log("MY Vendors", myVendor);
  console.log("Vendor Note Data", vendorNoteData);

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
  const [clicked, setClicked] = useState(false);

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

  const removeFromMyVendors = async (id) => {
    try {
      const companyId = { company_id: id };
      console.log(companyId);
      const resultAction = await dispatch(
        removeMyVendors({ companyId, token })
      );
      const result = resultAction.payload;

      if (result?.success) {
        toast.info(result?.message || "Vendor Removed From Favourites!");
      } else {
        toast.info(result?.message || "Failed to remove contact.");
      }
    } catch (err) {
      toast.error("Error removing Vendor: " + err.message);
    }
  };

  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "1.2rem", // Adjust font size
            width: "10rem",
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

  useLayoutEffect(() => {
    if (!clicked) window.scrollTo(0, 0);
  }, [clicked]);

  // Company Modal Logic
  const openCompanyModal = (company) => {
    console.log("Opening Company Modal with Company:", company);
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUp()); // Show company modal
  };

  const handleHoverCompanyDetail = (company) => {
    dispatch(setHoverCompanyDetail(company)); // Dispatch company details to Redux store}
  };

  // NOTES LOGIC

  const [notes, setNotes] = useState({});

  const noteSaveHandler = async (vendorId) => {
    const note = notes[vendorId] || "";

    try {
      const result = await dispatch(
        addMyVendorNotes({ company_id: vendorId, note, token })
      );
      const payload = result?.payload;
      console.log("RESULT", payload);
      if (payload?.success) {
        toast.success("Note saved!");
      } else {
        toast.info(payload?.message || "Failed to save note .");
      }
    } catch (err) {
      toast.error("Error saving: " + err.message);
    }
  };

  useEffect(() => {
    dispatch(fetchMyVendorNotes({ token }));
  }, []);

  const fetchVendorViewBy = () => {
    if (["company", "show", "country", "state"].includes(viewBy)) {
      console.log("Fetching from API with viewBy:", viewBy);
      setLoadingData(true);
      dispatch(
        fetchMyViewByVendors({
          token,
          sortBy: viewBy,
        })
      )
        .unwrap()
        .then((response) => {
          console.log("Response from API:", response);
          let data = response?.data;
          console.log("API response:", data);
          // setContactData(data || []);
        })
        .catch((error) => {
          console.error("API error:", error);
          alert("Failed to fetch filtered data.");
        })
        .finally(() => setLoadingData(false));
    }
  };

  useEffect(() => {
    if (viewBy) {
      fetchVendorViewBy();
    }
  }, [viewBy]);

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
                  className={({ isActive }) =>
                    isActive ? myProfile.active : ""
                  }
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
              <select
                value={viewBy}
                onChange={(e) => setViewBy(e.target.value)}
              >
                <option value="company">Company</option>
                <option value="show">Display</option>
                <option value="country">Country</option>
                <option value="state">State</option>
              </select>
            </div>
          </div>
          <h1 className="ml-[2vw]">{headingWord}</h1>

          <div className={css.myVendor}>
            {viewAsCompany && (
              <>
                <div className={""}>
                  <div className="flex flex-col sticky top-[31vh]">
                    {alphabets.map((letter, index) => {
                      const isActive = myVendor.some(
                        (item) =>
                          item.company?.name?.charAt(0).toUpperCase() === letter
                      );
                      return (
                        <Link
                          to={`#letter-${letter}`}
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById(
                              `letter-${letter}`
                            );
                            if (element) {
                              element.scrollIntoView({
                                behavior: "smooth",
                                block: "center",
                              });
                            }
                          }}
                          className={`cursor-pointer font-medium pl-3 leading-none ${
                            isActive
                              ? "text-black font-bold"
                              : "opacity-50 text-black"
                          }`}
                        >
                          {letter}
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <div className={css.myVendor_company}>
                  {myVendor.map((vendor, index) => {
                    const vendorId = vendor?.company?.id;
                    // console.log("COMPANYID", vendorId);
                    const companyNote =
                      vendorNoteData?.notes?.find(
                        (n) => n.company?.id === vendorId
                      )?.note || "";
                    // console.log(`COMPANYNOTE`, companyNote);
                    return (
                      <div
                        className={css.myVendor_company_list}
                        key={vendor.company.id}
                        id={`letter-${vendor.company.name
                          .charAt(0)
                          .toUpperCase()}`}
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
                              <p
                                className="cursor-pointer"
                                onClick={() => openCompanyModal(vendor.company)}
                                onMouseEnter={() =>
                                  handleHoverCompanyDetail(vendor.company)
                                }
                              >
                                {vendor.company.name}
                              </p>
                            </span>
                          </div>
                          <div className={css.myVendor_company_list_main_info}>
                            <span
                              className="cursor-pointer"
                              onClick={() => openCompanyModal(vendor.company)}
                              onMouseEnter={() =>
                                handleHoverCompanyDetail(vendor.company)
                              }
                            >
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
                              <p>
                                {vendor.company.city} {vendor.company.state}{" "}
                                {vendor.company.country}
                              </p>
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
                                  id={`notes-${companyId}`}
                                  cols={10}
                                  rows={8}
                                  placeholder="Enter notes here..."
                                  className="!w-80 text-[8pt] border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-400 resize-none"
                                  value={notes[vendorId] ?? companyNote}
                                  onChange={(e) =>
                                    setNotes((prevNotes) => ({
                                      ...prevNotes,
                                      [vendorId]: e.target.value,
                                    }))
                                  }
                                />
                              </span>
                              <span>
                                <button
                                  type="button"
                                  className={
                                    css.myVendor_company_list_main_notes_btn
                                  }
                                  onClick={() => noteSaveHandler(vendorId)}
                                  title="Save Note"
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
                              <Tooltip
                                title="Remove from my vendors"
                                arrow
                                placement="right"
                              >
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
                              <Tooltip
                                title="Block this vendor from vewing my inventory"
                                arrow
                                placement="right"
                              >
                                <span>
                                  <AiOutlineUserDelete />
                                </span>
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
            {/* {viewAsShow && (
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
            )} */}
          </div>
        </div>
      </div>
      {togglePopUp && (
        <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />
      )}

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default MyVendors;

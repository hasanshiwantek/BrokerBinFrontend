import React, { useEffect, useState, useLayoutEffect } from "react";
import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
import css from "../../../styles/Menu/Tools/MyContact.module.css";
import { Link, NavLink, useParams } from "react-router-dom";
import SearchMyContact from "./SearchMyContact";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyVendors,
  removeMyVendors,
  addMyVendorNotes,
  fetchMyVendorNotes,
  fetchMyViewByVendors,
  blockMyVendor,
  addToMyVendorsBadge,
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
import { AiOutlineUserDelete, AiOutlineUserAdd } from "react-icons/ai";
import { Tooltip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { alphabets } from "@/data/services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import emailIcon from "@/assets/email-icon.svg";
import webIcon from "@/assets/web.svg";
import defaultCompanyLogo from "@/assets/defaultComp.png";
import PaginationControls from "@/components/pagination/PaginationControls";
const MyVendors = () => {
  const token = Cookies.get("token");
  let [viewAsCompany, setViewAsCompany] = useState(true);
  const [viewBy, setViewBy] = useState("company");
  let [viewAsShow, setViewAsShow] = useState(false);
  let [viewAsCountry, setViewAsCountry] = useState(false);
  let [viewAsState, setViewAsState] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const { myVendor, loading, vendorNoteData, vendorPagination } = useSelector(
    (store) => store.toolsStore
  );

  const [currentPage, setCurrentPage] = useState(1);

  console.log("My Vendors: ", myVendor);
  console.log("My Vendor Pagination: ", vendorPagination);
  const totalCount = vendorPagination?.total;
  const lastPage = vendorPagination?.lastPage;
  const totalPages = vendorPagination?.lastPage || 1;

  console.log("Vendor Note Data", vendorNoteData);

  const dispatch = useDispatch();

  const user_id = Cookies.get("user_id");

  const { blurWhileLoading, initialData, user, error } = useSelector(
    (state) => state.profileStore
  );

  const id = user?.user?.id || user_id;

  useEffect(() => {
    dispatch(fetchUserData({ id, token }));
  }, []);

  const companyId = initialData?.company?.id;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cid = params.get("cid");
    if (cid) {
      const decodedId = atob(cid); // your decode logic
      dispatch(addToMyVendorsBadge({ company_id: decodedId, token }));
      console.log("CID", decodedId);
    }
  }, []);

  const [feedbackData, setFeedbackData] = useState(null);
  const [headingWord, setHeadingWord] = useState("Company:");
  const [clicked, setClicked] = useState(false);

  const vendorList = Array.isArray(myVendor?.data) ? myVendor.data : [];

  const companyRatings = vendorList.map((vendor) => vendor?.company?.rating);
  console.log("Company Ratings", companyRatings);

  const ratingCounts = vendorList.map((vendor) => vendor?.company?.ratingCount);
  console.log("Rating Counts", ratingCounts);

  const handleHover = (index) => {
    // Tooltip logic
    return index <= rating ? "View Comments" : "";
  };

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
    const confirmed = window.confirm(
      "Are you sure you want to remove this vendor from your favorites?"
    );
    if (!confirmed) return;

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
        toast.info(result?.message || "Failed to remove vendor.");
      }
    } catch (err) {
      toast.error("Error removing vendor: " + err.message);
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
    dispatch(getMyVendors({ token, page: currentPage }));
  }, [token, currentPage]);

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
      setLoadingData(true);
      dispatch(
        fetchMyViewByVendors({
          token,
          sortBy: viewBy,
          page: currentPage,
        })
      )
        .unwrap()
        .then((response) => {
          let data = response?.data;
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

  // BLOCK VENDOR LOGIC

  const [vendorStatus, setVendorStatus] = useState({});
  console.log("Vendor Status", vendorStatus);

  useEffect(() => {
    if (myVendor && myVendor.length > 0) {
      const initialStatus = {};
      myVendor.forEach((vendor) => {
        const id = vendor.company.id;
        initialStatus[id] = Number(vendor.company.status) ?? 0; // backend  blockedStatus
        console.log("Initial Status", initialStatus);
      });
      setVendorStatus(initialStatus);
    }
  }, [myVendor]);

  const blockVendorHandler = (companyId) => {
    const currentStatus = vendorStatus[companyId] ?? 1;
    console.log("Sending Status..", vendorStatus[companyId]);

    const newStatus = currentStatus === 1 ? 0 : 1;

    dispatch(blockMyVendor({ company_id: companyId, status: newStatus, token }))
      .unwrap()
      .then((result) => {
        console.log("Server Result:", result);

        if (result?.status === "success") {
          toast.success(result?.message || "Vendor status updated!");
          setVendorStatus((prev) => ({
            ...prev,
            [companyId]: newStatus,
          }));
        } else {
          toast.info(result?.message || "Failed to update vendor status.");
        }
      })
      .catch((error) => {
        console.error("Block error:", error);
        toast.error(
          error?.message || "Something went wrong. Please try again."
        );
      })
      .finally(() => {
        dispatch(getMyVendors({ token }));
      });
  };

  // COPMANY ORDER LOGIC

  // const companyFirstLetter = myVendor?.map((vendor) =>
  //   vendor?.company?.name.charAt(0).toUpperCase()
  // );

  const groupVendorsByKey = (vendors, key) => {
    return vendors?.reduce((acc, vendor) => {
      let groupKey = "";

      switch (key) {
        case "company":
          groupKey = vendor.company.name.charAt(0).toUpperCase();
          break;
        case "show":
          groupKey = vendor.company.display || "First";
          break;
        case "country":
          groupKey = vendor.company.country || "Unknown Country";
          break;
        case "state":
          groupKey = vendor.company.state || "Unknown State";
          break;
        default:
          groupKey = "Unknown";
      }

      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(vendor);
      return acc;
    }, {});
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(getMyVendors({ token, page }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        <span className="ml-4 text-blue-600 text-lg font-medium"></span>
      </div>
    );
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
              <li>
                <NavLink
                  to="/myprofile/Options"
                  className={({ isActive }) =>
                    isActive ? myProfile.active : ""
                  }
                >
                  <span>Options</span>
                </NavLink>
              </li>
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
              <p className="!text-xl">View By</p>
              <select
                value={viewBy}
                onChange={(e) => {
                  setViewBy(e.target.value);
                  setHeadingWord(e.target.selectedOptions[0].dataset.label);
                }}
              >
                <option value="company" data-label="Company:">
                  Company
                </option>
                <option value="show" data-label="Show:">
                  Display
                </option>
                <option value="country" data-label="Country:">
                  Country
                </option>
                <option value="state" data-label="State:">
                  State
                </option>
              </select>
            </div>
          </div>
          {/* <h1 className="ml-[2vw]">{headingWord}</h1> */}
          {/* <p></p> */}

          <div className={css.myVendor}>
            {viewAsCompany && (
              <>
                <div className={""}>
                  <div className="flex flex-col sticky top-[31vh] p-2 mr-6">
                    {alphabets.map((letter, index) => {
                      const isActive = myVendor?.some(
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
                  {myVendor && myVendor.length > 0 ? (
                    Object.entries(groupVendorsByKey(myVendor, viewBy))
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([group, vendors]) => (
                        <div key={group} id={`letter-${group}`}>
                          <h2 className="text-2xl font-bold my-4 border-b-2">
                            {headingWord} {group}
                          </h2>

                          {vendors.map((vendor) => {
                            const vendorId = vendor?.company?.id;
                            const rating = vendor?.company?.rating ?? 0;
                            const ratingCount =
                              vendor?.company?.ratingCount ?? 0;
                            const companyNote =
                              vendorNoteData?.notes?.find(
                                (n) => n.company?.id === vendorId
                              )?.note || "";

                            return (
                              <div
                                className={css.myVendor_company_list}
                                key={vendor.company.id}
                                id={`letter-${vendor.company.name
                                  .charAt(0)
                                  .toUpperCase()}`}
                              >
                                <div className={css.myVendor_company_list_main}>
                                  <div
                                    className={
                                      css.myVendor_company_list_main_img
                                    }
                                  >
                                    <img
                                      src={
                                        vendor?.company?.image
                                          ? vendor?.company?.image
                                          : defaultCompanyLogo
                                      }
                                      alt="vendor logo"
                                      className="cursor-pointer"
                                      onClick={() =>
                                        openCompanyModal(vendor?.company)
                                      }
                                    />
                                    <span className="!flex !items-center !gap-6 !justify-between">
                                      <i>
                                        <a
                                          href={`mailto:${vendor.company?.primaryContact?.email}`}
                                        >
                                          <img
                                            src={emailIcon}
                                            alt="email icon"
                                            className="!border-none w-7 !h-7"
                                          />
                                        </a>
                                      </i>
                                      <p
                                        className="cursor-pointer"
                                        onClick={() =>
                                          openCompanyModal(vendor?.company)
                                        }
                                        onMouseEnter={() =>
                                          handleHoverCompanyDetail(
                                            vendor?.company
                                          )
                                        }
                                      >
                                        {vendor.company.name}
                                      </p>
                                      <i>
                                        <a
                                          href={vendor.company?.website}
                                          target="_blank"
                                        >
                                          <img
                                            src={webIcon}
                                            alt="web icon"
                                            className="!border-none w-7 !h-7"
                                          />
                                        </a>
                                      </i>
                                    </span>
                                  </div>

                                  <div
                                    className={
                                      css.myVendor_company_list_main_info
                                    }
                                  >
                                    <span
                                      className="cursor-pointer"
                                      onClick={() =>
                                        openCompanyModal(vendor?.company)
                                      }
                                      onMouseEnter={() =>
                                        handleHoverCompanyDetail(
                                          vendor?.company
                                        )
                                      }
                                    >
                                      <p>{vendor.company.name}</p>
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
                                            const isFilled =
                                              starIndex + 1 <=
                                              Math.floor(rating);
                                            const isPartial =
                                              starIndex < rating &&
                                              starIndex + 1 >
                                                Math.floor(rating);

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
                                                  stroke: "black",
                                                  strokeWidth: "10",
                                                }}
                                              />
                                            );
                                          })}
                                        </div>
                                      </div>
                                    </span>

                                    <span>
                                      <p
                                        className="cursor-pointer"
                                        onClick={() =>
                                          openCompanyModal(vendor.company)
                                        }
                                      >
                                        Rating:
                                      </p>
                                      <p>
                                        (
                                        {rating === 0 || isNaN(rating)
                                          ? "N/A"
                                          : (
                                              (Math.min(
                                                Math.max(rating, 0),
                                                5
                                              ) /
                                                5) *
                                              100
                                            ).toFixed(1) + "%"}
                                        ){" "}
                                      </p>
                                    </span>

                                    <span>
                                      <p>Location:</p>
                                      <p>
                                        {vendor.company.city}{" "}
                                        {vendor.company.state}{" "}
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
                                      <p>{vendor.company.shipping_deadline}</p>
                                    </span>
                                  </div>

                                  <div
                                    className={
                                      css.myVendor_company_list_main_notesRating
                                    }
                                  >
                                    <div
                                      className={
                                        css.myVendor_company_list_main_notes
                                      }
                                    >
                                      <span>
                                        <p>Notes:</p>
                                      </span>
                                      <span>
                                        <textarea
                                          name="notes"
                                          id={`notes-${vendorId}`}
                                          cols={10}
                                          rows={8}
                                          placeholder="This section is only visible to you by your log-in. Enter your personal notes about this vendor here."
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
                                          onClick={() =>
                                            noteSaveHandler(vendorId)
                                          }
                                          title="Save Note"
                                        >
                                          Save
                                        </button>
                                      </span>
                                    </div>
                                  </div>

                                  <div
                                    className={
                                      css.myVendor_company_list_main_actions
                                    }
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
                                            removeFromMyVendors(
                                              vendor.company.id
                                            )
                                          }
                                        >
                                          X
                                        </button>
                                      </Tooltip>
                                    </ThemeProvider>
                                  </div>

                                  <div className="cursor-pointer">
                                    <div className="cursor-pointer">
                                      <ThemeProvider theme={theme}>
                                        <Tooltip
                                          title={
                                            vendorStatus[vendor.company.id] ===
                                            1
                                              ? "Unblock this vendor"
                                              : "Block this vendor from viewing my inventory"
                                          }
                                          arrow
                                          placement="right"
                                        >
                                          <span
                                            onClick={() =>
                                              blockVendorHandler(
                                                vendor.company.id
                                              )
                                            }
                                          >
                                            {vendorStatus[vendor.company.id] ===
                                            1 ? (
                                              <AiOutlineUserAdd size={20} />
                                            ) : (
                                              <AiOutlineUserDelete size={20} />
                                            )}
                                          </span>
                                        </Tooltip>
                                      </ThemeProvider>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))
                  ) : (
                    <div className="text-center text-red-500 text-2xl mt-10">
                      No vendors found.
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        {/* PAGINATION */}
        <div className="flex justify-end ">
          <PaginationControls
            currPage={currentPage}
            totalPages={totalPages}
            visiblePages={[1, totalPages]}
            onPageChange={handlePageChange}
            onPrev={() => handlePageChange(Math.max(1, currentPage - 1))}
            onNext={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
          />
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

import React, { memo, useEffect, useState, useRef } from "react";
import css from "../../../styles/Popup/CompanyDetails.module.css";
import TabContent from "./TabContent";
import TabInformation from "./TabInformation";
import {
  FaEnvelope,
  FaEyeSlash,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaPrint,
  FaRegListAlt,
} from "react-icons/fa";
import { FaRegWindowClose, FaUserMinus } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoPersonAdd, IoPersonRemove, IoEye } from "react-icons/io5";

import { IoMdEyeOff } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyContact } from "../../../ReduxStore/SearchProductSlice";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { brokerAPI } from "../../api/BrokerEndpoint";
import axios from "axios";
import { Tooltip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  blockMyVendor,
  showFirstVendor,
  neverShowVendor,
  showFirstNeverShowCount,
} from "@/ReduxStore/ToolsSlice";
import { FaUserXmark, FaUserCheck } from "react-icons/fa6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  handleVendorStatusUpdate,
  initializeStatus,
} from "./HandleVendorStatusUpdate";

const CompanyDetails = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { popupCompanyDetail } = useSelector(
    (store) => store.searchProductStore
  );
  // Loading state
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal initially open
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState(null);
  const [feedbackData, setFeedbackData] = useState("");
  const [toggleTabs, setToggleTabs] = useState(1);
  const [vendorCount, setVendorCount] = useState(null);

  if (!popupCompanyDetail || !popupCompanyDetail[0]) {
    return <p>Loading company details...</p>;
  }

  const { initialData } = useSelector((state) => state.profileStore);
  console.log(`initialData`, initialData);

  const currentUserCompanyId = initialData?.company?.id;
  // Get the first company object passed to the modal
  const company = popupCompanyDetail ? popupCompanyDetail[0] : null;

  // Log the company to check the details
  console.log("Company Data in Modal:", company);
  const companyId = company?.id;
  const { companyContactData } = useSelector(
    (store) => store.searchProductStore
  );
  const token = Cookies.get("token");

  console.log("CompanyId ", companyId);
  console.log("COMPANY CONTACT DATA FROM FRONTEND", companyContactData);

  // Handle empty company array or error
  if (!company || !companyId) {
    return <h2>No company data available.</h2>; // Show a message if no company is selected
  }

  useEffect(() => {
    if (companyId && token) {
      setLoading(true); // Set loading to true when fetching data
      dispatch(getCompanyContact({ id: companyId, token }))
        .then((data) => {
          setCompanyData(data);
          setLoading(false); // Set loading to false when data is fetched
        })
        .catch((error) => {
          console.error("Error fetching company data:", error);
          setLoading(false); // Set loading to false on error
        });
    } else {
      console.log("Company ID or Token is missing");
      setLoading(false); // In case no company ID or token is found
    }
  }, [dispatch, companyId, token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${brokerAPI}feedback/ratings/${companyId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Rating Response: ", response?.data);
        const data = response?.data;
        setFeedbackData(data);
        console.log("RATINGDATA", feedbackData);
      } catch (error) {
        console.log("ERRORRATIMG", error);
      }
    };
    fetchData();
  }, [companyId]);

  const fetchVendorCount = async () => {
    try {
      const res = await dispatch(
        showFirstNeverShowCount({ id: companyId, token })
      );
      setVendorCount(res.payload);
    } catch (err) {
      console.error("Error fetching count", err);
    }
  };

  useEffect(() => {
    if (companyId && token) {
      fetchVendorCount();
    }
  }, [companyId, token]);

  const printCompanyModal = () => {
    window.print();
  };

  const [rating, setRating] = useState(0);

  const handleHover = (index) => {
    // Tooltip logic
    return index <= rating ? "View Comments" : "";
  };

  const handleClick = () => {
    // Redirect to feedbacks tab
    window.location.href = "/feedbacks"; // Adjust the link as needed
  };

  const ratings = parseFloat(feedbackData?.rating?.averageRating || 5);


  
  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.querySelector(`.${css.Popup_Info}`);
      if (modal && !modal.contains(event.target)) {
        closeModal(); 
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeModal(); // Close modal on Escape key press
      }
    };

    if (isModalOpen) {
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", handleEscapeKey);
      }, 200); // Add delay to avoid detecting the opening click
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isModalOpen]); // ✅ Removed `closeModal` from dependencies

  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "1.1rem", // Adjust font size
            width: "15rem",
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

  // BLOCK VENDOR FUNCTION
  const [vendorStatus, setVendorStatus] = useState({});
  console.log("Vendor status", vendorStatus);
  const blockVendorHandler = (companyId) => {
    const currentStatus =
      typeof vendorStatus[companyId] !== "undefined"
        ? vendorStatus[companyId]
        : 0;

    handleVendorStatusUpdate({
      type: "Block",
      companyId,
      currentStatus,
      setStatus: setVendorStatus,
      action: blockMyVendor,
      statusKey: "status",
      dispatch,
      token,
      toast,
    });
  };

  // SHOW FIRST FUNCTION
  const [showFirstStatus, setShowFirstStatus] = useState({});
  console.log("Show First status", showFirstStatus);

  const showFirstHandler = (companyId) => {
    const currentStatus =
      typeof showFirstStatus[companyId] !== "undefined"
        ? showFirstStatus[companyId]
        : 0;

    if (currentStatus === 0) {
      setneverShowStatus((prev) => ({ ...prev, [companyId]: 0 }));
    }

    handleVendorStatusUpdate({
      type: "Show First",
      companyId,
      currentStatus,
      setStatus: setShowFirstStatus,
      action: showFirstVendor,
      statusKey: "show_first",
      dispatch,
      token,
      toast,
    });
    fetchVendorCount();
  };

  const [neverShowStatus, setneverShowStatus] = useState({});
  console.log("Never Show status", neverShowStatus);

  const neverShowHandler = (companyId) => {
    const currentStatus =
      typeof neverShowStatus[companyId] !== "undefined"
        ? neverShowStatus[companyId]
        : 0;

    if (currentStatus === 0) {
      setShowFirstStatus((prev) => ({ ...prev, [companyId]: 0 }));
    }

    handleVendorStatusUpdate({
      type: "Never Show",
      companyId,
      currentStatus,
      setStatus: setneverShowStatus,
      action: neverShowVendor,
      statusKey: "never_show",
      dispatch,
      token,
      toast,
    });
    fetchVendorCount();
  };

  useEffect(() => {
    if (companyContactData?.data?.company) {
      initializeStatus({
        companyContactData,
        statusKey: "status",
        setStatus: setVendorStatus,
      });
      initializeStatus({
        companyContactData,
        statusKey: "show_first",
        setStatus: setShowFirstStatus,
      });
      initializeStatus({
        companyContactData,
        statusKey: "never_show",
        setStatus: setneverShowStatus,
      });
    }
  }, [companyContactData]);

  // While loading, show loading indicator
  if (loading) {
    return (
      <div className={css.Popup}>
        <div className={css.Popup_Info}>
          <div className={css.Popup_Info_height}>
            <div className={css.Popup_Info_header}>
              <h1>Loading company details...</h1>
            </div>
            <div className={css.Popup_Info_Main}>
              <div className={css.Popup_Info_Main_left}>
                <div className={css.loader}></div> {/* Spinner here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={css.Popup}>
        <div className={css.Popup_Info}>
          <div className={css.Popup_Info_height}>
            <div className={css.Popup_Info_header}>
              <h1>{companyContactData.data?.company?.name}</h1>
              <div className="!-mt-2 ">
                {/* <button type="button" className="">
                <FaExternalLinkAlt />

              </button> */}
                <ThemeProvider theme={theme}>
                  <Tooltip title="Close Profile" arrow placement="top">
                    <button
                      type="button"
                      onClick={() => closeModal()}
                      className="transform active:scale-95 transition-all duration-100  "
                    >
                      <FaRegWindowClose />
                    </button>
                  </Tooltip>
                </ThemeProvider>
              </div>
            </div>
            <div className={css.Popup_Info_Main}>
              <div className={css.Popup_Info_Main_left}>
                <div className={css.Popup_Info_Main_left_img}>
                  <a
                    href={companyContactData.data?.company?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={companyContactData.data?.company?.image} />
                  </a>
                </div>
                <div className={css.Popup_Info_Main_left_actions}>
                  <div>
                    <div className="cursor-pointer">
                      <ThemeProvider theme={theme}>
                        <Tooltip
                          title={
                            showFirstStatus[
                              companyContactData.data.company?.id
                            ] === 1
                              ? "Show First Disabled"
                              : "Show this Vendor First"
                          }
                          arrow
                          placement="top"
                        >
                          <div
                            className="flex flex-col items-center justify-center"
                            onClick={() =>
                              showFirstHandler(
                                companyContactData.data?.company?.id
                              )
                            }
                          >
                            {showFirstStatus[
                              companyContactData.data.company?.id
                            ] === 1 ? (
                              <FaUserMinus size={30} />
                            ) : (
                              <IoPersonAdd size={30} />
                            )}
                            <p className="whitespace-nowrap">
                              {showFirstStatus[
                                companyContactData.data.company?.id
                              ] === 1
                                ? `Show First (${vendorCount?.show_first_count})`
                                : `Show First (${vendorCount?.show_first_count})`}
                            </p>
                          </div>
                        </Tooltip>
                      </ThemeProvider>
                    </div>

                    <div>
                      <div className="cursor-pointer">
                        <ThemeProvider theme={theme}>
                          <Tooltip
                            title={
                              vendorStatus[
                                companyContactData.data.company?.id
                              ] === 1
                                ? "Unblock this vendor"
                                : "Block this vendor from viewing my inventory"
                            }
                            arrow
                            placement="top"
                          >
                            <div
                              className="flex flex-col items-center justify-center"
                              onClick={() =>
                                blockVendorHandler(
                                  companyContactData.data.company?.id
                                )
                              }
                            >
                              {vendorStatus[
                                companyContactData.data.company?.id
                              ] === 1 ? (
                                <FaUserCheck size={30} />
                              ) : (
                                <FaUserXmark size={30} />
                              )}
                              <p>
                                {vendorStatus[
                                  companyContactData.data.company?.id
                                ] === 1
                                  ? "Unblock Vendor"
                                  : "Block Vendor"}
                              </p>
                            </div>
                          </Tooltip>
                        </ThemeProvider>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>
                        <div className="cursor-pointer">
                          <ThemeProvider theme={theme}>
                            {/* <Tooltip
                              title={
                                neverShowStatus[
                                  companyContactData.data.company?.id
                                ] === 1
                                  ? "Show this vendor in search results"
                                  : "Never Show this vendor in search result"
                              }
                              arrow
                              placement="top"
                            >
                              <div
                                className="flex flex-col items-center justify-center"
                                onClick={() =>
                                  neverShowHandler(
                                    companyContactData.data.company?.id
                                  )
                                }
                              >
                                {neverShowStatus[
                                  companyContactData.data.company?.id
                                ] === 1 ? (
                                  <IoEye size={30} />
                                ) : (
                                  <IoMdEyeOff size={30} />
                                )}
                                <p className="whitespace-nowrap">
                                  {`Never Show (${vendorCount?.never_show_count})`}
                                </p>
                              </div>
                            </Tooltip> */}
                            {companyContactData.data.company?.id ===
                            currentUserCompanyId ? (
                              <Tooltip
                                title="This is your company, Show Never toggle is disabled via the company profile viewer"
                                arrow
                                placement="top"
                              >
                                <div className="flex flex-col items-center justify-center text-red-600 cursor-not-allowed">
                                  <IoMdEyeOff size={30} />
                                  <p className="whitespace-nowrap">
                                    {`Never Show (${vendorCount?.never_show_count})`}
                                  </p>
                                </div>
                              </Tooltip>
                            ) : (
                              <Tooltip
                                title={
                                  neverShowStatus[
                                    companyContactData.data.company?.id
                                  ] === 1
                                    ? "Show this vendor in search results"
                                    : "Never Show this vendor in search result"
                                }
                                arrow
                                placement="top"
                              >
                                <div
                                  className="flex flex-col items-center justify-center"
                                  onClick={() =>
                                    neverShowHandler(
                                      companyContactData.data.company?.id
                                    )
                                  }
                                >
                                  {neverShowStatus[
                                    companyContactData.data.company?.id
                                  ] === 1 ? (
                                    <IoEye size={30} />
                                  ) : (
                                    <IoMdEyeOff size={30} />
                                  )}
                                  <p className="whitespace-nowrap">
                                    {`Never Show (${vendorCount?.never_show_count})`}
                                  </p>
                                </div>
                              </Tooltip>
                            )}
                          </ThemeProvider>
                        </div>
                      </div>
                    </div>
                    {/* <div>
                    <FaMoneyBill />
                    <p>give discount</p>
                  </div> */}
                  </div>
                </div>
                <div className={css.Popup_Info_Main_left_comments}>
                  <ThemeProvider theme={theme}>
                    <Tooltip title="View Comments" arrow placement="top">
                      <div>
                        <div
                          className={css.gridHome1_MemberDetail_reviews_stars}
                        >
                          <div
                            data-v-217e3916=""
                            class="vue-rate-it-rating"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                              onClick={() => setToggleTabs(5)}
                            >
                              {[...Array(5)].map((_, index) => {
                                const isFilled =
                                  index + 1 <= Math.floor(ratings); // Full yellow stars
                                const isPartial =
                                  index < ratings &&
                                  index + 1 > Math.floor(ratings); // Partial yellow star

                                return (
                                  <FaStar
                                    key={index}
                                    size={24}
                                    color={
                                      isFilled
                                        ? "#FFD700"
                                        : isPartial
                                        ? "rgba(255, 215, 0, 0.5)"
                                        : "#CCC"
                                    } // Partial star is dim yellow
                                    style={{
                                      cursor: "pointer",
                                      marginRight: 4,
                                      stroke: "black",
                                      strokeWidth: "10",
                                    }}
                                    onMouseEnter={() => setRating(index + 1)}
                                    // onClick={handleClick}
                                    title={handleHover(index + 1)} // Tooltip text
                                  />
                                );
                              })}
                            </div>
                            <a href="#">
                              {feedbackData?.rating?.averageRating
                                ? `${(
                                    (feedbackData.rating.averageRating / 5) *
                                    100
                                  ).toFixed(1)}%`
                                : "100%"}
                            </a>
                          </div>
                          <h1
                            className="text-center pt-2 cursor-pointer"
                            onClick={() => setToggleTabs(5)}
                          >
                            ({feedbackData?.rating?.totalFeedbacks || 0})
                            Feedbacks
                          </h1>
                        </div>
                      </div>
                    </Tooltip>
                  </ThemeProvider>
                  {/* <div>
                  <span>(3) comments</span>
                  <span>(0) new</span>
                </div> */}
                </div>
                <div
                  className={css.Popup_Info_Main_left_companySideInformation}
                >
                  <TabInformation companyId={companyId} />
                </div>
              </div>
              <div className={css.Popup_Info_Main_right}>
                <p className={css.Popup_Info_Main_right_description}>
                  {companyContactData.data?.company?.description ||
                    "No company description available."}
                </p>
                <div className={css.Popup_Info_Main_right_productInfo}>
                  <div>
                    <strong className="font-semibold">
                      Product Categories:
                    </strong>
                    <p>{companyContactData.data?.company?.categories}</p>
                  </div>
                  <div>
                    <strong className="font-semibold">Mfg(s) We Carry:</strong>
                    <p>{companyContactData.data?.company?.brands}</p>
                  </div>
                </div>
                <div className={css.Popup_Info_Main_right_contact}>
                  <div>
                    <span>
                      <strong className="font-semibold">Address:</strong>
                      <p>{companyContactData.data?.company?.address}</p>
                    </span>
                    <span>
                      <strong className="font-semibold">Phone:</strong>
                      <a
                        className="text-[8pt]  "
                        href={`tel:${companyContactData.data?.company?.phone_num}`}
                      >
                        {companyContactData.data?.company?.phone_num}
                      </a>
                    </span>
                    <span>
                      <strong className="font-semibold">Website:</strong>
                      <ThemeProvider theme={theme}>
                        <Tooltip title="View Website" arrow placement="top">
                          <a
                            className="text-[8pt] hover:border-b-2 hover:border-blue-600 outline-none "
                            href={companyContactData.data?.company?.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {companyContactData.data?.company?.website}
                          </a>
                        </Tooltip>
                      </ThemeProvider>
                    </span>
                  </div>
                  <div className={css.inventorySecSvgs}>
                    {/* <span>
                    <FaMapMarkerAlt />
                    map
                  </span> */}
                    <ThemeProvider theme={theme}>
                      <Tooltip title="Show Inventory" arrow placement="top">
                        <span>
                          <FaRegListAlt />
                          <NavLink to={"/inventory"} className="cursor-pointer">
                            inventory
                          </NavLink>
                        </span>
                      </Tooltip>
                    </ThemeProvider>
                    {/* <span>
                    <FaEnvelope />
                    email
                  </span> */}
                    <ThemeProvider theme={theme}>
                      <Tooltip title="Print Profile" arrow placement="top">
                        <span
                          className="cursor-pointer"
                          onClick={printCompanyModal}
                        >
                          <FaPrint />
                          Print
                        </span>
                      </Tooltip>
                    </ThemeProvider>
                  </div>
                </div>

                <div className={css.Popup_Info_Main_right_tabs_layout}>
                  <TabContent
                    companyId={companyId}
                    toggleTabs={toggleTabs}
                    setToggleTabs={setToggleTabs}
                  />
                </div>
              </div>
            </div>
            <div className={css.Popup_Info_Main_bottom}>
              <a href="/feedback" target="_blank" rel="noopener noreferrer">
                Questions, Comments, or Concerns?
              </a>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default memo(CompanyDetails);

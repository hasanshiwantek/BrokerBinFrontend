import React, { useEffect, useState } from "react";
import css from "../../../styles/Popup/CompanyDetails.module.css";
import shadow from "../../../imgs/logo/shadow.png";
import { useSelector, useDispatch } from "react-redux";
import {
  getCompanyContact,
  deleteCompanyContact,
} from "../../../ReduxStore/SearchProductSlice";
import Cookies from "js-cookie";
import { deleteCompanyUser } from "../../../ReduxStore/RfqSlice";
import FeedbackModal from "../FeedBackModal";
import { brokerAPI } from "../../api/BrokerEndpoint";
import axios from "axios";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { Tooltip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import shadowImage from "../../../imgs/logo/shadow.png";
import {
  addMyNotes,
  fetchMyNotes,
  removeMyFavouriteContacts,
} from "../../../ReduxStore/ToolsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { HiUserRemove } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { deleteCompanyPhotos } from "@/ReduxStore/ProfleSlice";
const TabContent = ({ companyId, setToggleTabs, toggleTabs }) => {
  // const [toggleTabs, setToggleTabs] = useState(1);
  // Loading state
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [filteredContacts, setFilteredContacts] = useState([]); // Filtered contacts
  const [companyData, setCompanyData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const { noteData } = useSelector((store) => store.toolsStore);
  console.log("MY Notes Data From Frontend", noteData);

  const dispatch = useDispatch();
  const { companyContactData } = useSelector(
    (store) => store.searchProductStore
  );
  console.log("Company Contact Data From Tab Content Page", companyContactData);

  const { initialData } = useSelector((state) => state.profileStore);
  console.log(`initialData`, initialData);

  const currentUserCompanyId = initialData?.company?.id;

  const contactInfo = companyContactData?.data?.contacts;
  const contactProfileImgs = contactInfo?.map(
    (contact) => contact.profileImage
  );
  console.log("Profile Images: ", contactProfileImgs);

  const companyImages = companyContactData?.data?.company?.imageGallery;

  console.log("Company images: ", companyImages);

  const [visibleFeedbacks, setVisibleFeedbacks] = useState(10);
  const token = Cookies.get("token");

  console.log("CompanyId From Tab Content Page", companyId);

  const companyUserId = companyContactData.data.contacts.map((item) => item.id);
  console.log("User Id from Comapny Modal", companyUserId);

  const compId = companyContactData.data.company.id;
  const companyName = companyContactData.data.company.name;
  console.log("COMPANYNAME", companyName);

  const companyUsersCount = companyContactData.data.contacts.length;
  useEffect(() => {
    if (companyId && token) {
      setLoading(true);
      dispatch(getCompanyContact({ id: companyId, token }))
        .then((data) => {
          setFilteredContacts(data.payload.data.contacts); // Initialize filteredContacts
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching company data:", error);
          setLoading(false);
        });
    }
  }, [dispatch, companyId, token]);

  const fetchCompanyContacts = () => {
    if (companyId && token) {
      setLoading(true);
      dispatch(getCompanyContact({ id: companyId, token }))
        .then((data) => {
          setFilteredContacts(data.payload.data.contacts);
        })
        .catch((error) => {
          console.error("Error fetching company data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  // Filter contacts dynamically based on the search query
  useEffect(() => {
    if (companyContactData?.data?.contacts) {
      const contacts = companyContactData?.data?.contacts;
      if (!searchQuery) {
        // Show all contacts if the search query is empty
        setFilteredContacts(contacts);
      } else {
        // Filter contacts based on the search query
        const filtered = contacts.filter((contact) =>
          `${contact.firstName} ${contact.lastName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
        setFilteredContacts(filtered);
      }
    }
  }, [searchQuery, companyContactData]);

  const loggedInUserId = Cookies.get("user_id");
  console.log("Logged In User Id", Number(loggedInUserId));

  const primaryContactId =
    companyContactData?.data?.company?.primaryContact?.id;
  console.log("Primary Contact Id: ", primaryContactId);

  const userDeleteHandler = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (isConfirmed) {
      // Dispatch the delete action
      dispatch(deleteCompanyUser({ token, id }))
        .then(() => {
          // Refresh the page after successful deletion
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    } else {
      console.log(`User with ID ${id} was not deleted.`);
    }
  };

  useEffect(() => {
    if (toggleTabs === 5) {
      handleFetchData(); // API call function
    }
  }, [toggleTabs]);

  const handleFetchData = async () => {
    try {
      const response = await axios.get(
        `${brokerAPI}feedback/company/${compId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      console.log("DATA", data);
      setFeedbacks(data.feedbacks);
    } catch (error) {
      console.log("Error", error);
    }
  };

  // NOTES AND RATING LOIGIC

  const [notes, setNotes] = useState({});
  const [ratings, setRatings] = useState({});
  console.log("Notes ", notes);

  const handleNotes = async (contactId) => {
    const note = notes[contactId] || "";
    const rating = ratings[contactId] || 0;

    try {
      const result = await dispatch(
        addMyNotes({ user_id: contactId, note, rating, token })
      );
      const payload = result?.payload;
      if (payload?.success) {
        toast.success("Note and rating saved!");
      } else {
        toast.info(payload?.message || "Failed to save note and rating.");
      }
    } catch (err) {
      toast.error("Error saving: " + err.message);
    }
  };

  useEffect(() => {
    dispatch(fetchMyNotes({ token }));
  }, []);

  // REMOVE CONTACT LOGIC
  const removeCompanyContacts = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!isConfirmed) return;

    try {
      const result = await dispatch(
        deleteCompanyContact({ ids: [id], token })
      ).unwrap();

      console.log(result); // { status: true, message: 'Contact deleted successfully.' }

      if (result?.status) {
        console.log("User Deleted with id: ", id);
        toast.info(result?.message || "User Deleted From Company!");
        fetchCompanyContacts(); // Optional refresh
      } else {
        toast.info(result?.message || "Failed to remove contact.");
      }
    } catch (err) {
      toast.error("Error removing contact: " + err.message);
    }
  };

  const loadMore = () => {
    setVisibleFeedbacks((prev) => prev + 10);
  };

  // DELETE IMAGE HANDLER

  const deleteImageHandler = async (id) => {
    console.log(id);
    const confirmation = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmation) return;
    try {
      const result = await dispatch(
        deleteCompanyPhotos({ token, imageId: id })
      ).unwrap();
      if (result?.status) {
        console.log("Image Deleted with id: ", id);
        toast.info(result?.message || "Image Deleted From Company!");
        fetchCompanyContacts();
      } else {
        toast.info(result?.message || "Failed to remove Image.");
      }
    } catch (err) {
      toast.error("Error removing Image: " + err.message);
    }
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

  const navigate = useNavigate();

  const showFeedbackHandler = (id, primaryId) => {
    navigate("/feedbackprofile", {
      state: { companyId: id, primaryId: primaryId },
    });
  };

  if (loading) {
    return (
      <div className={css.Popup}>
        <div className={css.Popup_Info}>
          <div className={css.Popup_Info_height}>
            <div className={css.Popup_Info_header}>
              <h1>Loading company details...</h1>
            </div>
            <div className={css.Popup_Info_Main_left}>
              <div className={css.loader}></div> {/* Spinner here */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={css.Popup_Info_Main_right_tabs}>
        <ul className={css.Popup_Info_Main_right_tabs_toggle}>
          <li
            onClick={() => setToggleTabs(1)}
            className={toggleTabs === 1 ? css.activeTab : ""}
          >
            Contacts ({companyUsersCount})
          </li>
          <li
            onClick={() => setToggleTabs(2)}
            className={toggleTabs === 2 ? css.activeTab : ""}
          >
            Photos
          </li>
          {/* <li
            onClick={() => setToggleTabs(3)}
            className={toggleTabs === 3 ? css.activeTab : ""}
          >
            Credentials
          </li> */}
          <li
            onClick={() => setToggleTabs(4)}
            className={toggleTabs === 4 ? css.activeTab : ""}
          >
            Terms / Conditions
          </li>
          <li
            onClick={() => {
              setToggleTabs(5);
              handleFetchData();
            }}
            className={toggleTabs === 5 ? css.activeTab : ""}
          >
            Feedback
          </li>
        </ul>
        <div className={toggleTabs === 1 ? css.showContent : css.content}>
          <div className={css.Popup_Info_Main_right_tabs_contact}>
            <div className={css.Popup_Info_Main_right_tabs_contact_left}>
              <ul>
                <li>#</li>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li>
                <li>F</li>
                <li>G</li>
                <li>H</li>
                <li>I</li>
                <li>J</li>
                <li>K</li>
                <li>L</li>
                <li>M</li>
                <li>N</li>
                <li>O</li>
                <li>P</li>
                <li>Q</li>
                <li>R</li>
                <li>S</li>
                <li>T</li>
                <li>U</li>
                <li>V</li>
                <li>W</li>
                <li>X</li>
                <li>Y</li>
                <li>Z</li>
              </ul>
            </div>

            <div className={css.Popup_Info_Main_right_tabs_contact_right}>
              <h1>Company Contacts</h1>
              <div
                className={css.Popup_Info_Main_right_tabs_contact_right_search}
              >
                <p>Quick search:</p>
                <input
                  type="text"
                  placeholder="Search Contacts"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="focus:ring-1 focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-lg p-2 w-full focus:outline-none transition text-lg"
                />
              </div>
              {/* <h1>Contact: O</h1> */}

              {filteredContacts.map((user, id) => {
                return (
                  <div key={id}>
                    <div
                      className={
                        css.Popup_Info_Main_right_tabs_contact_right_companies
                      }
                    >
                      <div
                        className={
                          css.Popup_Info_Main_right_tabs_contact_right_companies_list
                        }
                      >
                        <img
                          src={
                            user.profileImage ? user.profileImage : shadowImage
                          }
                          alt="User Profile"
                        />
                        <div
                          className={
                            css.Popup_Info_Main_right_tabs_contact_right_companies_list_details
                          }
                        >
                          <h2>
                            {user.firstName} {user.lastName}
                          </h2>
                          <div>
                            <span>
                              <strong>Title:</strong>
                              <strong>{user.specialty}</strong>
                            </span>
                            <span>
                              <strong>Phone:</strong>
                              <strong className="hover:border-b-2 hover:border-blue-600 outline-none ">
                                {user.phoneNumber}
                              </strong>
                            </span>
                            <span>
                              <strong>Fax:</strong>
                              <strong>{user.faxNumber}</strong>
                            </span>
                            <span>
                              <strong>Email:</strong>
                              <ThemeProvider theme={theme}>
                                <Tooltip
                                  title={`Contact ${user.firstName}`}
                                  arrow
                                  placement="top"
                                >
                                  <strong>
                                    <a
                                      href={`mailto:${user.email}`}
                                      className="!lowercase text-[9pt]  hover:border-b-2 hover:border-blue-600 outline-none "
                                    >
                                      {user.email}
                                    </a>
                                  </strong>
                                </Tooltip>
                              </ThemeProvider>
                            </span>
                          </div>
                        </div>

                        {loggedInUserId == primaryContactId ? (
                          <>
                            <div
                              className="flex flex-col items-center"
                              onClick={() => removeCompanyContacts(user.id)}
                            >
                              <ThemeProvider theme={theme}>
                                <Tooltip
                                  title="Remove from your contacts"
                                  arrow
                                  placement="top"
                                >
                                  <button className="cursor-pointer  text-black ">
                                    <HiUserRemove size={30} />
                                  </button>
                                  <span className="hover:border-b-blue-500 border-transparent border-2 cursor-pointer text-[8pt]">
                                    Remove Contact
                                  </span>
                                </Tooltip>
                              </ThemeProvider>
                            </div>
                          </>
                        ) : null}
                      </div>
                      <div
                        className={
                          css.Popup_Info_Main_right_tabs_contact_right_companies_myNotes
                        }
                      >
                        <div>
                          <div className="flex items-center justify-center">
                            <strong className="p-2 text-lg">My Notes:</strong>
                            <button
                              className="text-blue-500 hover:underline text-base"
                              onClick={() => handleNotes(user.id)}
                            >
                              Save Notes
                            </button>
                          </div>
                          <span>
                            <strong>My Rating</strong>
                            <div className="columns">
                              <div className="column">
                                <div className="vue-rate-it-rating vue-rate-it-rating-container">
                                  <div className="vue-rate-it-rating flex gap-1">
                                    <div className="vue-rate-it-rating-item">
                                      <div
                                        step="50"
                                        style={{
                                          display: "inline-block",
                                          marginRight: "1px",
                                        }}
                                      >
                                        <svg
                                          width="18"
                                          height="18"
                                          viewBox="0 0 179 179"
                                          style={{ overflow: "visible" }}
                                        >
                                          <linearGradient
                                            id="ywy42"
                                            x1="-2%"
                                            x2="100%"
                                            y1="0%"
                                            y2="0%"
                                          >
                                            <stop
                                              offset="0%"
                                              stopColor="#FFD700"
                                            ></stop>
                                            <stop
                                              offset="0%"
                                              stopColor="#CCC"
                                            ></stop>
                                          </linearGradient>
                                          <path
                                            d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                            fill="url(#ywy42)"
                                            stroke="#999"
                                            strokeWidth="2"
                                            vectorEffect="non-scaling-stroke"
                                            transform="scale(0.1)"
                                          ></path>
                                          <path
                                            d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                            fill="url(#ywy42)"
                                            transform="scale(0.1)"
                                          ></path>
                                        </svg>
                                      </div>
                                    </div>
                                    <div className="vue-rate-it-rating-item">
                                      <div
                                        step="50"
                                        style={{
                                          display: "inline-block",
                                          marginRight: "1px",
                                        }}
                                      >
                                        <svg
                                          width="18"
                                          height="18"
                                          viewBox="0 0 179 179"
                                          style={{ overflow: "visible" }}
                                        >
                                          <linearGradient
                                            id="ac6umj"
                                            x1="-2%"
                                            x2="100%"
                                            y1="0%"
                                            y2="0%"
                                          >
                                            <stop
                                              offset="0%"
                                              stopColor="#FFD700"
                                            ></stop>
                                            <stop
                                              offset="0%"
                                              stopColor="#CCC"
                                            ></stop>
                                          </linearGradient>
                                          <path
                                            d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                            fill="url(#ac6umj)"
                                            stroke="#999"
                                            strokeWidth="2"
                                            vectorEffect="non-scaling-stroke"
                                            transform="scale(0.1)"
                                          ></path>
                                          <path
                                            d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                            fill="url(#ac6umj)"
                                            transform="scale(0.1)"
                                          ></path>
                                        </svg>
                                      </div>
                                    </div>
                                    <div className="vue-rate-it-rating-item">
                                      <div
                                        step="50"
                                        style={{
                                          display: "inline-block",
                                          marginRight: "1px",
                                        }}
                                      >
                                        <svg
                                          width="18"
                                          height="18"
                                          viewBox="0 0 179 179"
                                          style={{ overflow: "visible" }}
                                        >
                                          <linearGradient
                                            id="vd5hxa"
                                            x1="-2%"
                                            x2="100%"
                                            y1="0%"
                                            y2="0%"
                                          >
                                            <stop
                                              offset="0%"
                                              stopColor="#FFD700"
                                            ></stop>
                                            <stop
                                              offset="0%"
                                              stopColor="#CCC"
                                            ></stop>
                                          </linearGradient>
                                          <path
                                            d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                            fill="url(#vd5hxa)"
                                            stroke="#999"
                                            strokeWidth="2"
                                            vectorEffect="non-scaling-stroke"
                                            transform="scale(0.1)"
                                          ></path>
                                          <path
                                            d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                            fill="url(#vd5hxa)"
                                            transform="scale(0.1)"
                                          ></path>
                                        </svg>
                                      </div>
                                    </div>
                                    <div className="vue-rate-it-rating-item">
                                      <div
                                        step="50"
                                        style={{
                                          display: "inline-block",
                                          marginRight: "1px",
                                        }}
                                      >
                                        <svg
                                          width="18"
                                          height="18"
                                          viewBox="0 0 179 179"
                                          style={{ overflow: "visible" }}
                                        >
                                          <linearGradient
                                            id="ejvlvq"
                                            x1="-2%"
                                            x2="100%"
                                            y1="0%"
                                            y2="0%"
                                          >
                                            <stop
                                              offset="0%"
                                              stopColor="#FFD700"
                                            ></stop>
                                            <stop
                                              offset="0%"
                                              stopColor="#CCC"
                                            ></stop>
                                          </linearGradient>
                                          <path
                                            d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                            fill="url(#ejvlvq)"
                                            stroke="#999"
                                            strokeWidth="2"
                                            vectorEffect="non-scaling-stroke"
                                            transform="scale(0.1)"
                                          ></path>
                                          <path
                                            d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                            fill="url(#ejvlvq)"
                                            transform="scale(0.1)"
                                          ></path>
                                        </svg>
                                      </div>
                                    </div>
                                    <div className="vue-rate-it-rating-item">
                                      <div
                                        step="50"
                                        style={{
                                          display: "inline-block",
                                          marginRight: "1px",
                                        }}
                                      >
                                        <svg
                                          width="18"
                                          height="18"
                                          viewBox="0 0 179 179"
                                          style={{ overflow: "visible" }}
                                        >
                                          <linearGradient
                                            id="u53qwl"
                                            x1="-2%"
                                            x2="100%"
                                            y1="0%"
                                            y2="0%"
                                          >
                                            <stop
                                              offset="0%"
                                              stopColor="#FFD700"
                                            ></stop>
                                            <stop
                                              offset="0%"
                                              stopColor="#CCC"
                                            ></stop>
                                          </linearGradient>
                                          <path
                                            d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                            fill="url(#u53qwl)"
                                            stroke="#999"
                                            strokeWidth="2"
                                            vectorEffect="non-scaling-stroke"
                                            transform="scale(0.1)"
                                          ></path>
                                          <path
                                            d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                            fill="url(#u53qwl)"
                                            transform="scale(0.1)"
                                          ></path>
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </span>
                        </div>
                        <div>
                          <textarea
                            placeholder="This section is only visible to you by your login. Enter your personal notes about this here"
                            className="focus:ring-1 focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-lg p-2 w-full focus:outline-none transition"
                            value={
                              notes[user.id] ??
                              (noteData?.notes?.find(
                                (n) => n.user?.id === user.id
                              )?.note ||
                                "")
                            }
                            onChange={(e) =>
                              setNotes((prevNotes) => ({
                                ...prevNotes,
                                [user.id]: e.target.value,
                              }))
                            }
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={toggleTabs === 2 ? css.showContent : css.content}>
          <div className={css.Popup_Info_Main_right_tabs_photos}>
            <h1>Company photos</h1>
            <div className={css.Popup_Info_Main_right_tabs_photos_img}>
              {Array.isArray(companyImages) && companyImages.length > 0 ? (
                companyImages.map((img) => (
                  <div key={img?.id} className="flex justify-start gap-2">
                    <img
                      src={img?.imageGallery || shadow} // Fallback if the image is empty/null
                      alt="Company Photos"
                      className="border rounded-xl p-2 w-44 h-44 object-cover"
                    />
                    <div>
                      <button
                        className=" text-4xl font-bold   text-gray-600 hover:text-red-500"
                        onClick={() => deleteImageHandler(img?.id)}
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm italic">
                  No company photos available
                </p>
              )}
            </div>
          </div>
        </div>
        <div className={toggleTabs === 3 ? css.showContent : css.content}>
          <div className={css.Popup_Info_Main_right_tabs_credentials}></div>
        </div>
        <div className={toggleTabs === 4 ? css.showContent : css.content}>
          <div className={css.Popup_Info_Main_right_tabs_terms}>
            <div>
              <h1>Terms</h1>
              <p>Pofile Incomplete</p>
            </div>
            <div>
              <h1>Return Policy</h1>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    companyContactData?.data?.company?.returnPolicy ||
                    "<p>Profile Incomplete</p>",
                }}
              />
            </div>
            <div>
              <h1>Legal Files</h1>
              <p>Profile Incomplete</p>
            </div>
          </div>
        </div>

        <div className={toggleTabs === 5 ? css.showContent : css.content}>
          <div className={css.Popup_Info_Main_right_tabs_photos}>
            <div className={`flex justify-between border-b`}>
              <h1 className="font-bold">Feedback Received</h1>
              <span className={`flex space-x-4 cursor-pointer`}>
                <span
                  // onClick={() => {
                  //   if (currentUserCompanyId === companyId) {
                  //     toast.info(`You can't give feedback to your own company`)
                  //     return;
                  //   }
                  //   console.log("Icon clicked!");
                  //   setIsOpen(true);
                  // }}
                  onClick={() =>
                    showFeedbackHandler(companyId, primaryContactId)
                  }
                  className={`hover:text-[#2c83ec] cursor-pointer ${
                    currentUserCompanyId === companyId
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                >
                  <BiSolidMessageRoundedDots size={20} />
                </span>

                {isOpen && (
                  <FeedbackModal
                    company={{ id: compId, name: companyName }}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    onSucces={handleFetchData}
                  />
                )}

                {/* <span><LiaWindowClose /></span> */}
              </span>
            </div>
            <div className={`flex flex-col`}>
              <div className={`flex justify-between px-4 font-bold`}>
                <div>
                  <h1>Comment</h1>
                </div>
                <div>
                  <h1>Commenter</h1>
                </div>
                <div>
                  <h1>Date</h1>
                </div>
              </div>

              {feedbacks.slice(0, visibleFeedbacks).map((feedback, index) => (
                <div
                  key={index}
                  className={`flex justify-between px-4 border-b py-2 text-balance`}
                >
                  <div className="w-[5.1vw] text-balance">
                    <p className="font-bold">
                      {" "}
                      {feedback.feedbackIssue || "Option"}
                    </p>
                    <p>PO #: {feedback.poNumber || "N/A"}</p>
                    <p className="break-words  w-[21vw]">
                      {feedback.feedbackPost || "No Feedback Provided"}
                    </p>
                  </div>

                  <div className="md:pl-10 2xl:pl-0 text-center">
                    <p className="font-bold">
                      {feedback.fromUsername || "Anonymous"}
                    </p>
                    <p>{feedback.fromCompanyName || "No Company Name"}</p>
                  </div>

                  <div className="w-[]">
                    <p>{feedback.date.split(" ")[0]}</p>
                    <p>{feedback.date.split(" ")[1]}</p>
                  </div>
                </div>
              ))}
              <div className="justify-center flex">
                {visibleFeedbacks < feedbacks.length && (
                  <button
                    onClick={loadMore}
                    className="mt-4 p-2 bg-blue-500 text-white rounded w-[10vw] "
                  >
                    Load More
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabContent;

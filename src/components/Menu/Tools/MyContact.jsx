import React, { useEffect, useState, useLayoutEffect } from "react";
import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
import css from "../../../styles/Menu/Tools/MyContact.module.css";
import { companyList } from "../../../data/tableData";
import { AiFillMail } from "react-icons/ai";
import { MdPeople, MdPersonAddAlt1, MdPersonRemove } from "react-icons/md";
import { BsGlobeAmericas } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyContacts,
  removeMyFavouriteContacts,
  addMyNotes,
  fetchMyNotes,
  fetchMyViewByContacts,
} from "../../../ReduxStore/ToolsSlice";
import Cookies from "js-cookie";
import { fetchUserData } from "../../../ReduxStore/ProfleSlice";
import { FaStar } from "react-icons/fa";
import { setTogglePopUp } from "@/ReduxStore/SearchProductSlice";
import CompanyDetails from "../../Popups/CompanyDetails/CompanyDetails";
import { setPopupCompanyDetail } from "@/ReduxStore/SearchProductSlice";
import { alphabets } from "@/data/services";
import SearchMyFavouriteContact from "./SearchMyFavouriteContacts";
import { Tooltip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import shadowImage from "../../../imgs/logo/shadow.png";

const MyContact = () => {
  const token = Cookies.get("token");
  let [viewAsCompany, setViewAsCompany] = useState(true);
  let [viewAsShow, setViewAsShow] = useState(false);
  let [viewAsCountry, setViewAsCountry] = useState(false);
  let [viewAsState, setViewAsState] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const { myVendor, loading, myContactsData, noteData } = useSelector(
    (store) => store.toolsStore
  );
  console.log("MY Contacts Data From Frontend", myContactsData);
  console.log("MY Notes Data From Frontend", noteData);
  // const [contactData, setContactData] = useState(myContactsData);
  const [headingWord, setHeadingWord] = useState("last");
  const [viewBy, setViewBy] = useState("last");

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

  const [feedbackData, setFeedbackData] = useState(null);

  const companyRatings =
    myContactsData?.map((vendor) => vendor?.contact?.company?.rating) || [];
  const ratingCounts =
    myVendor?.map((vendor) => vendor?.contact?.company?.ratingCount) || [];

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

  const removeFavouriteContacts = async (id) => {
    try {
      const resultAction = await dispatch(
        removeMyFavouriteContacts({ contact_id: id, token })
      );
      const result = resultAction.payload;

      if (result?.success) {
        toast.info(result?.message || "Contact Removed From Favourites!");
      } else {
        toast.info(result?.message || "Failed to remove contact.");
      }
    } catch (err) {
      toast.error("Error removing contact: " + err.message);
    }
  };

  useEffect(() => {
    dispatch(fetchMyContacts({ token }));
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

  const fetchContactViewBy = () => {
    if (
      [
        "company",
        "first",
        "last",
        "rating",
        "show",
        "country",
        "state",
      ].includes(viewBy)
    ) {
      console.log("Fetching from API with viewBy:", viewBy);
      setLoadingData(true);
      dispatch(
        fetchMyViewByContacts({
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
          console.log("Contact View By Data:", myContactsData);
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
      fetchContactViewBy();
    }
  }, [viewBy]);

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

  const [clicked, setClicked] = useState(false);

  useLayoutEffect(() => {
    if (!clicked) window.scrollTo(0, 0);
  }, [clicked]);

  // NOTES AND RATING LOIGIC

  const [notes, setNotes] = useState({});
  const [ratings, setRatings] = useState({});
  console.log("Notes ", notes);

  const noteSaveHandler = async (contactId) => {
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

  const handleChange = (e) => {
    const value = e.target.value;
    setViewBy(value);
    const label = e.target.selectedOptions[0]?.dataset?.label || "Company:";
    setHeadingWord(label);
  };

  const groupContactsByKey = (contacts, key) => {
    return contacts.reduce((acc, item) => {
      const contact = item.contact;
      let groupKey = "";
      switch (key) {
        case "company":
          groupKey =
            contact?.company?.name?.charAt(0)?.toUpperCase() || "Unknown";
          break;
        case "first":
          groupKey = contact?.firstName?.charAt(0)?.toUpperCase() || "Unknown";
          break;
        case "last":
          groupKey = contact?.lastName?.charAt(0)?.toUpperCase() || "Unknown";
          break;
        case "country":
          groupKey = contact?.country || "Unknown Country";
          break;
        case "rating":
          groupKey = contact?.rating || "My Rating";
          break;
        case "state":
          groupKey = contact?.state || "Unknown State";
          break;
        default:
          groupKey = "Unknown";
      }
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(item);
      return acc;
    }, {});
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
        <div className={`${css.vendor_vanLink}`}>
          <div className={`${myProfile.profileInfo_links}`}>
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
                    className={({ isActive }) => (isActive ? myProfile.active : '')}
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
          <p>My Contacts</p>
        </div>
        <div className={css.vendor}>
          <div className={css.vendor_view}>
            <div className={css.searchVendor}>
              <div className={css.searchVendor_search}>
                <SearchMyFavouriteContact />
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
                <option value="last" data-label="last">
                  Contact Last
                </option>
                <option value="first" data-label="first">
                  Contact First
                </option>
                <option value="company" data-label="company">
                  Company
                </option>

                <option value="rating" data-label="rating">
                  My Rating
                </option>
                <option value="country" data-label="country">
                  Country
                </option>
                <option value="state" data-label="state">
                  State
                </option>
              </select>
            </div>
          </div>

          <div className={css.myVendor}>
            {viewAsCompany && (
              <>
                <div className={""}>
                  <div className="flex flex-col sticky top-[31vh] p-4">
                    {alphabets.map((letter, index) => {
                      const isActive = myContactsData.some(
                        (item) =>
                          item.contact?.firstName?.charAt(0).toUpperCase() ===
                          letter
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
                  {Object.entries(groupContactsByKey(myContactsData, viewBy))
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([group, contacts]) => (
                      <div key={group} id={`letter-${group}`}>
                        <h2 className="text-2xl capitalize font-bold my-4 border-b-2">
                          {headingWord}: {group}
                        </h2>

                        {contacts.map((vendor, index) => {
                          const contactId = vendor?.contact?.id;
                          const noteEntry = noteData?.notes?.find(
                            (n) => n.user?.id === contactId
                          );
                          const contactNote = noteEntry?.note || "";
                          const savedRating = noteEntry?.rating ?? 0;
                          const firstLetter =
                            vendor?.contact?.firstName
                              ?.charAt(0)
                              ?.toUpperCase() || "X";

                          return (
                            <div
                              className={css.myVendor_company_list}
                              key={vendor?.contact?.id}
                              id={`letter-${firstLetter}`}
                            >
                              <div className={css.myVendor_company_list_main}>
                                <div
                                  className={css.myVendor_company_list_main_img}
                                >
                                  <img
                                    src={
                                      vendor?.contact?.profileImage
                                        ? vendor?.contact?.profileImage
                                        : shadowImage
                                    }
                                    alt="Contact Person Image"
                                    className="cursor-pointer"
                                    onClick={() =>
                                      openCompanyModal(vendor?.contact?.company)
                                    }
                                  />
                                  <span>
                                    <p>
                                      {vendor?.contact?.firstName}{" "}
                                      {vendor?.contact?.lastName}
                                    </p>
                                  </span>
                                </div>
                                <div
                                  className={
                                    css.myVendor_company_list_main_info
                                  }
                                >
                                  <span>
                                    <p>{vendor?.contact?.company.name}</p>

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
                                          const rating =
                                            companyRatings?.[index] || 0;
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
                                        openCompanyModal(
                                          vendor?.contact?.company
                                        )
                                      }
                                    >
                                      {vendor?.contact?.company.name}
                                    </p>
                                    <p>
                                      (
                                      {companyRatings[index] == null ||
                                      isNaN(companyRatings[index])
                                        ? "N/A"
                                        : (
                                            (Math.min(
                                              Math.max(
                                                companyRatings[index],
                                                0
                                              ),
                                              5
                                            ) /
                                              5) *
                                            100
                                          ).toFixed(1) + "%"}
                                      )
                                    </p>
                                  </span>

                                  <span>
                                    <p>fax:</p>
                                    <p>{vendor?.contact?.phone_num}</p>
                                  </span>
                                  <span>
                                    <p>Email:</p>
                                    <p>{vendor?.contact?.email}</p>
                                  </span>
                                  <span>
                                    <p>phone:</p>
                                    <p>{vendor?.contact?.phoneNumber}</p>
                                  </span>
                                  <span>
                                    <p>location:</p>
                                    <p>{vendor?.contact?.company?.address}</p>
                                  </span>
                                  <span>
                                    <p>Country:</p>
                                    <p>{vendor?.contact?.country}</p>
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
                                        id={`notes-${contactId}`}
                                        cols={10}
                                        rows={8}
                                        placeholder="Enter notes here..."
                                        className="!w-80 text-[8pt] border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-400 resize-none"
                                        value={notes[contactId] ?? contactNote}
                                        onChange={(e) =>
                                          setNotes((prevNotes) => ({
                                            ...prevNotes,
                                            [contactId]: e.target.value,
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
                                          noteSaveHandler(contactId)
                                        }
                                        title="Save Note"
                                      >
                                        Save
                                      </button>
                                    </span>
                                  </div>

                                  <div
                                    className={
                                      css.myVendor_company_list_main_rating
                                    }
                                  >
                                    <div className={`${css.ratingWrapper}`}>
                                      <p
                                        className={`${css.ratingLabel} p-1 !text-[1.2rem]`}
                                      >
                                        My Rating
                                      </p>

                                      <p
                                        className={`${css.ratingValue} p-1 font-bold  !text-[1.5rem] text-blue-600`}
                                      >
                                        {ratings[contactId] ?? savedRating}
                                      </p>

                                      <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        step="0.1"
                                        className={`${css.slider} p-0`}
                                        value={
                                          ratings[contactId] ?? savedRating
                                        }
                                        onChange={(e) =>
                                          setRatings((prev) => ({
                                            ...prev,
                                            [contactId]: parseFloat(
                                              e.target.value
                                            ),
                                          }))
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className={
                                    css.myVendor_company_list_main_actions
                                  }
                                >
                                  <ThemeProvider theme={theme}>
                                    <Tooltip
                                      title="Remove from my Contacts"
                                      arrow
                                      placement="bottom"
                                    >
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeFavouriteContacts(
                                            vendor.contact.id
                                          )
                                        }
                                      >
                                        X
                                      </button>
                                    </Tooltip>
                                  </ThemeProvider>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
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
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default MyContact;

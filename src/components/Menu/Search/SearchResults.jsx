import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import "./SearchResults.css";
import profileImg from "../../../assets/shadow.png";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  setPopupCompanyDetail,
  setTogglePopUp,
} from "../../../ReduxStore/SearchProductSlice";
import CompanyDetails from "@/components/Popups/CompanyDetails/CompanyDetails";
import css from "../../../styles/Menu/Tools/MyContact.module.css";
import { alphabets } from "@/data/services";
import { FaUserPlus } from "react-icons/fa";
import { Tooltip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { setHoverCompanyDetail } from "../../../ReduxStore/SearchProductSlice";
import { addMyContacts, fetchMyNotes } from "@/ReduxStore/ToolsSlice";
import {
  fetchUserData,
  submitUserSearchViewBy,
} from "../../../ReduxStore/ProfleSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const SearchResults = () => {
  const results = useSelector((state) => state.profileStore);
  console.log(results);

  const location = useLocation();
  const { searchResults } = location.state;
  console.log("Search Results: ", searchResults);
  const profileImage = searchResults?.map((val) => val?.profileImage);
  console.log("Profile Image: ", profileImage);

  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(searchResults);

  const { togglePopUp, popupCompanyDetail } = useSelector(
    (state) => state.searchProductStore
  );

  const openCompanyModal = (company) => {
    console.log("Opening Company Modal with Company:", company);
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUp()); // Show company modal
  };

  const [viewBy, setViewBy] = useState("last");

  const company = searchResults
    .map((results) => results?.company)
    .filter(Boolean);
  console.log("COMPANY", company);

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

  useLayoutEffect(() => {
    if (!clicked) window.scrollTo(0, 0);
  }, [clicked]);

  const handleHoverCompanyDetail = (company) => {
    dispatch(setHoverCompanyDetail(company)); // Dispatch company details to Redux store}
  };

  const fetchPersonViewBy = () => {
    if (
      ["last", "first", "company", "rating", "country", "state"].includes(
        viewBy
      )
    ) {
      console.log("Fetching from API with viewBy:", viewBy);
      setLoading(true);
      dispatch(
        submitUserSearchViewBy({
          token,
          sortBy: viewBy,
          sortOrder: "asc",
        })
      )
        .unwrap()
        .then((response) => {
          console.log("Response from API:", response);
          let data = response;
          console.log("API response:", data);
          setResultData(data || []);
          console.log("Result Data:", resultData);
        })
        .catch((error) => {
          console.error("API error:", error);
          alert("Failed to fetch filtered data.");
        })
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (viewBy) fetchPersonViewBy();
  }, [viewBy]);

  const user_id = Cookies.get("user_id");
  console.log("user_id", user_id);

  const token = Cookies.get("token");
  const addToContacts = async (id) => {
    try {
      const result = await dispatch(
        addMyContacts({ contact_id: id, token })
      ).unwrap();
      toast.success(result?.message || "Contact marked as Favourite!", {
        style: { fontSize: "17px", marginTop: "-10px" },
      });
    } catch (err) {
      console.error("Error adding contact:", err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to add contact.";
      toast.error(errorMessage, {
        style: { fontSize: "17px", marginTop: "-10px" },
      });
    }
  };

  useEffect(() => {
    console.log("Updated resultData:", resultData);
  }, [resultData]);

  // NOTE DATA LOGIC
  useEffect(() => {
    dispatch(fetchMyNotes({ token }));
  }, []);

  const { noteData } = useSelector((store) => store.toolsStore);

  console.log("NOTE DATA", noteData);
  const userId = noteData?.notes?.map((val) => val.user.id);
  console.log("USER ID", userId);

  return (
    <main className="mainSec w-[60%]">
      <nav className="menu-bar">
        <ul>
          <li>
            <Link to={"/search/Inventory"}>Inventory</Link>
          </li>
          <li>
            <Link to={"/search/Company"}>Company</Link>
          </li>
          <li>
            <Link to={"/person"} className="!text-blue-500">
              Person
            </Link>
          </li>
        </ul>
      </nav>

      <div className="!flex !justify-end !items-center !gap-5">
        <p className="!text-xl">view by</p>
        <select value={viewBy} onChange={(e) => setViewBy(e.target.value)}>
          <option value="last">Contact: Last</option>
          <option value="first">Contact: First</option>
          <option value="company">Company</option>
          <option value="rating">My Rating</option>
          <option value="country">Country</option>
          <option value="state">State</option>
        </select>
      </div>
      <h1 className="pl-[2.3vw] font-bold">Contact {`(${viewBy})`}</h1>
      <div className="flex flex-row w-auto">
        <div>
          <div className="flex flex-col sticky top-[35vh]">
            {alphabets.map((letter, index) => {
              const isActive = resultData.some(
                (item) => item.firstName?.charAt(0).toUpperCase() === letter
              );
              return (
                <Link
                  to={`#letter-${letter}`}
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(`letter-${letter}`);
                    if (element) {
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }
                  }}
                  className={`cursor-pointer font-medium pl-3 leading-none ${
                    isActive ? "text-black font-bold" : "opacity-50 text-black"
                  }`}
                >
                  {letter}
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : resultData.length > 0 ? (
            resultData.map((val, index) => {
              const profileImage = val.profileImage || profileImg;
              const firstLetter = val.firstName?.charAt(0).toUpperCase() || "";

              return (
                <div
                  className="search-results-container !w-auto"
                  key={index}
                  id={`letter-${firstLetter}`}
                >
                  <div className="contact-info">
                    <div className="profile-image">
                      <img
                        src={profileImage}
                        alt="profile"
                        onError={(e) => (e.target.src = profileImg)}
                      />
                      <p
                        className="font-semibold cursor-pointer text-center"
                        onClick={() => openCompanyModal(val.company)}
                        onMouseEnter={() =>
                          handleHoverCompanyDetail(val.company)
                        }
                      >
                        {viewBy.includes("first")
                          ? val.firstName
                          : viewBy.includes("last")
                          ? val.lastName
                          : ""}
                      </p>
                    </div>

                    <div className="profile-details font-medium">
                      <p className="flex justify-between">
                        Company: <p>{val.company?.name || ""}</p>
                      </p>
                      <p className="flex justify-between">
                        Title: <p>{val.position || ""}</p>
                      </p>
                      <p className="flex justify-between">
                        Phone: <p>{val.phoneNumber || ""}</p>
                      </p>
                      <p className="flex justify-between">
                        Specialty: <p>{val.specialty || ""}</p>
                      </p>
                      <p className="flex justify-between">
                        Toll: <p>{val.tollFree || ""}</p>
                      </p>
                      <p className="flex justify-between">
                        Fax:{" "}
                        <p>{val?.company?.primaryContact?.faxNumber || ""}</p>
                      </p>
                      <p className="flex justify-between">
                        Email: <p>{val.email || ""}</p>
                      </p>
                      <p className="flex justify-between">
                        City: <p>{val.city || ""}</p>
                      </p>
                      <p className="flex justify-between">
                        State: <p>{val.state || ""}</p>
                      </p>
                      <p className="flex justify-between">
                        Country: <p>{val.country || ""}</p>
                      </p>
                    </div>
                  </div>

                  <div className="notes-rating">
                    <div className="notes">
                      <h3>My Notes:</h3>
                      <p>
                        {userId?.includes(val.id)
                          ? noteData?.notes?.find(
                              (note) => note.user.id === val.id
                            )?.note
                          : ""}
                      </p>
                    </div>
                    <div className=" flex  gap-5 items-center">
                      <h3>My Rating:</h3>
                      <p>
                        {userId?.includes(val.id)
                          ? Number(
                              noteData?.notes?.find(
                                (note) => note.user.id === val.id
                              )?.rating || 0
                            ).toFixed(2)
                          : "N/R"}
                      </p>
                    </div>
             
                  </div>
                  <ThemeProvider theme={theme}>
                      <Tooltip title="Add to Contacts" arrow placement="top"> 
                        <div className="cursor-pointer p-2">
                          <FaUserPlus onClick={() => addToContacts(val.id)} />
                        </div>
                      </Tooltip>
                    </ThemeProvider>
                </div>
              );
            })
          ) : (
            <p className="text-center mt-5 font-bold">
              No search results found.
            </p>
          )}
        </div>
      </div>

      {togglePopUp && (
        <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />
      )}
      <ToastContainer position="top-center" autoClose={2000} />
    </main>
  );
};

export default SearchResults;

import React, {useState} from "react";
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

const SearchResults = () => {
  const results = useSelector((state) => state.profileStore);
  console.log(results);

  const location = useLocation();
  const { searchResults } = location.state;
  console.log("Search Results: ", searchResults);
  const profileImage = searchResults?.map((val) => val?.profileImage);
  console.log("Profile Image: ", profileImage);

  const dispatch = useDispatch();

  const { togglePopUp, popupCompanyDetail } = useSelector(
    (state) => state.searchProductStore
  );

  const openCompanyModal = (company) => {
    console.log("Opening Company Modal with Company:", company);
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUp()); // Show company modal
  };

  const [viewBy, setViewBy] = useState("Last");

  const company = searchResults.map(results => results?.company).filter(Boolean);
  console.log("COMPANY", company)

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

  return (
    <main className="mainSec w-[50%]">
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
        <select onChange={(e) => setViewBy(e.target.value.split(":")[1]?.trim().toLowerCase() || e.target.value)}>
          <option value="Last">Contact: Last</option>
          <option value="First">Contact: First</option>
          <option value="Company">Company</option>
          <option value="Rating">My Rating</option>
          <option value="country">Country</option>
          <option value="State">State</option>
        </select>
      </div>
      <h1 className="pl-[2.3vw] font-bold">Contact {`(${viewBy})`}</h1>
      <div className="flex flex-row w-auto ">
        {/* Render the Alphabet List ONCE */}
        <div >
          <div className="flex flex-col opacity-50 ">
            {alphabets.map((letter, index) => (
              <Link
                to={`#letter-${letter.toUpperCase()}`}
                key={index}
                onClick={(e) => {
                  console.log("Clicked on letter: ", letter);
                  e.preventDefault();
                  const element = document.getElementById(
                    `letter-${letter.toUpperCase()}`
                  );
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }
                }}
                className="cursor-pointer text-black font-medium pl-3 leading-none"
              >
                {letter}
              </Link>
            ))}
          </div>
        </div>

        

        <div>
          {searchResults && searchResults.length > 0 ? (
            searchResults.map((val, index) => {
              // Use profileImg as a fallback if val.profileImage is null
              const profileImage = val.profileImage || profileImg;
              const firstLetter = val.firstName
                ? val.firstName.charAt(0).toUpperCase()
                : "";

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
                        alt="profile-image"
                        onError={(e) => (e.target.src = profileImg)} // If image fails to load, use fallback
                      />
                      <p
                        className="font-semibold cursor-pointer text-center "
                        onClick={() => openCompanyModal(val.company)}
                      >
                        {val.firstName || ""} 
                      </p>
                    </div>

                    <div className="profile-details font-medium">
                      {/* <p>
                        Company:
                        <button
                          className="text-black"
                          onClick={() => openCompanyModal(val.company)}
                        >
                          {val.company?.name || ""}
                        </button>
                      </p>
                      <p className="">Title: {val.specialty || ""}</p>
                      <p>Phone: {val.phoneNumber || ""}</p>
                      <p>Toll: {val.tollFree || ""}</p>
                      <p>
                        Fax: {val?.company?.primaryContact?.faxNumber || ""}
                      </p>
                      <p>Email: {val.email || ""}</p>
                      <p>City: {val.city || ""}</p>
                      <p>State: {val.state || ""}</p>
                      <p>Country: {val.country || ""}</p> */}
                      <p className="flex justify-between">
                        Company:
                        <button
                          className="text-black"
                          onClick={() => openCompanyModal(val.company)}
                        >
                          <p>{val.company?.name || ""}</p>
                        </button>
                      </p>
                      <p className="flex justify-between ">Title: <p >{val.specialty || ""} </p></p>
                      <p className="flex justify-between">Phone: <p>{val.phoneNumber || ""} </p></p>
                      <p className="flex justify-between">Toll: <p>{val.tollFree || ""} </p></p>
                      <p className="flex justify-between">Fax: <p>{val?.company?.primaryContact?.faxNumber || ""} </p></p>
                      <p className="flex justify-between">Email: <p>{val.email || ""} </p></p>
                      <p className="flex justify-between">City: <p>{val.city || ""} </p></p>
                      <p className="flex justify-between">State: <p>{val.state || ""} </p></p>
                      <p className="flex justify-between">Country: <p>{val.country || ""} </p></p>
                    </div>

                    <div className="notes-rating">
                      <div className="notes">
                        <h3>My Notes:</h3>
                      </div>
                      <div className="rating flex items-center gap-4">
                        <h3>My Rating:</h3>
                        <select>
                          <option value="N/R">N/R</option>
                        </select>
                      </div>
                      <ThemeProvider theme={theme}>
                        <Tooltip title="Add to Contacts">
                          <div className="cursor-pointer">
                            <FaUserPlus />
                          </div>
                        </Tooltip>
                      </ThemeProvider>
                    </div>
                  </div>
                </div>
                
              );
            })
          ) : (
            <p
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            >
              No search results found.
            </p>
          )}
        </div>
      </div>

      {togglePopUp && (
        <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />
      )}
    </main>
  );
};

export default SearchResults;

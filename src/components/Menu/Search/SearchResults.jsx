import React from "react";
import { Link } from "react-router-dom";
import "./SearchResults.css";
import profileImg from "../../../assets/shadow.png";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setPopupCompanyDetail, setTogglePopUp } from "../../../ReduxStore/SearchProductSlice";
import CompanyDetails from "@/components/Popups/CompanyDetails/CompanyDetails";


const SearchResults = () => {
  const results = useSelector((state) => state.profileStore);
  console.log(results);

  const location = useLocation();
  const { searchResults } = location.state;
  console.log("Search Results: ", searchResults);
  const profileImage = searchResults?.map((val) => val?.profileImage);
  console.log("Profile Image: ", profileImage);

  const dispatch = useDispatch();

  const { togglePopUp, popupCompanyDetail } = useSelector((state) => state.searchProductStore)

  const openCompanyModal = (company) => {
      console.log("Opening Company Modal with Company:", company);
      dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
      dispatch(setTogglePopUp()); // Show company modal
    };
  
  const company = searchResults.map(results => results?.company).filter(Boolean);
  console.log("COMPANY", company)

  
  return (
    <main className="mainSec">
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
      {searchResults && searchResults.length > 0 ? (
        searchResults.map((val, index) => {
          // Use profileImg as a fallback if val.profileImage is null
          const profileImage = val.profileImage || profileImg;

          return (
            <div className="search-results-container" key={index}>
              <div className="contact-info">
                <div className="profile-image">
                  <img
                    src={profileImage}
                    alt="profile-image"
                    onError={(e) => (e.target.src = profileImg)} // If image fails to load, use fallback
                  />
                  <p 
                  style={{ textAlign: "center" }} 
                  className="font-semibold cursor-pointer"
                  onClick={() => openCompanyModal(val.company)}
                  >
                      {val.firstName || ""} 
                  </p>
                </div>

                <div className="profile-details font-medium">
                  <p 
                  >
                    Company: <button className="text-black"
                    onClick={() => openCompanyModal(val.company)}> {val.company?.name || ""}</button>
                  </p>
                  <p>
                    Title: {val.specialty || ""}
                  </p>
                  <p>
                    Phone: {val.phoneNumber || ""}
                  </p>
                  <p>
                    Toll: {val.tollFree || ""}
                  </p>
                  <p>
                    Email: {val.email || ""}
                  </p>
                  <p>
                    City: {val.city || ""}
                  </p>
                  <p>
                    State: {val.state || ""}
                  </p>
                  <p>
                    Country: {val.country || ""}
                  </p>
                </div>

                <div className="notes-rating">
                  <div className="notes">
                    <h3>My Notes:</h3>
                  </div>
                  <div className="rating">
                    <h3>My Rating:</h3>
                    <select>
                      <option value="N/R">N/R</option>
                    </select>
                  </div>
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
      {togglePopUp && <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />}
    </main>
  );
};

export default SearchResults;
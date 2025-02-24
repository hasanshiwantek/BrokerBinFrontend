import React from "react";
import { Link } from "react-router-dom";
import "./SearchResults.css";
import profileImg from "../../../assets/shadow.png";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const results = useSelector((state) => state.profileStore);
  console.log(results);

  const location = useLocation();
  const { searchResults } = location.state;
  console.log("Search Results: ", searchResults);
  const profileImage = searchResults?.map((val) => val?.profileImage);
  console.log("Profile Image: ", profileImage);

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

          {/* <li><Link to={"/"}>TechSpecs</Link></li>
                    <li><Link to={'/'}>NSN</Link></li>
                    <li><Link to={'/'}>Alt#</Link></li> */}
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
                  <p style={{ textAlign: "center" }}>
                    <strong>
                      {val.firstName || "Unknown"} {val.lastName || ""}
                    </strong>
                  </p>
                </div>

                <div className="profile-details">
                  <p>
                    <strong>Company:</strong> {val.company?.name || "N/A"}
                  </p>
                  <p>
                    <strong>Title:</strong> {val.specialty || "N/A"}
                  </p>
                  <p>
                    <strong>Phone:</strong> {val.phoneNumber || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong> {val.email || "N/A"}
                  </p>
                  <p>
                    <strong>City:</strong> {val.company?.region || "N/A"}
                  </p>
                  <p>
                    <strong>State:</strong> {val.state || "N/A"}
                  </p>
                  <p>
                    <strong>Country:</strong> {val.company?.country || "N/A"}
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
    </main>
  );
};

export default SearchResults;

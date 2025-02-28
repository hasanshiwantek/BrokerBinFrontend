import React, { useState } from "react";
import "../../Main/MenuBar.css";
import { Link, useNavigate, NavLink } from "react-router-dom";
import styles from "../../../../styles/Menu/Search/Person.module.css";
import { submitUserSearch } from "../../../../ReduxStore/ProfleSlice";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import css from "../../../../styles/Menu/Manage/MyProfile.module.css";
import CompanySearch from "../Inventory/CompanySearch";
import axios from "axios";
import { brokerAPI } from "@/components/api/BrokerEndpoint";
import { countriesList, regionsList, statesList } from "@/data/services";

const SearchCompany = () => {
  const [loading, setLoading] = useState(false); // To track API call status
  const [buttonText, setButtonText] = useState("Submit");

  // State variables to track input values
  const [formData, setFormData] = useState({
    company: "",
    newMembers: null,
    city: "",
    zip: "",
    country: "",
    region: "",
    areaCode: "",
    manufacturer: "",
    products: "",
    categories: "",
    keywords: "",
  });

  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const navigate = useNavigate(); // Initialize useNavigate
  // Handle change in input/select fields

  // const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({
  //         ...formData, // Preserve other field values
  //         [name]: value // Update current field
  //     });
  // };

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev, // Preserve other field values
      [name]: type === "checkbox" ? checked : value, // Update current field
    }));
  };

  const resetHandler = () => {
    setFormData({
      company: "",
      newMembers: null,
      city: "",
      zip: "",
      country: "",
      region: "",
      areaCode: "",
      manufacturer: "",
      products: "",
      categories: "",
      keywords: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data Submitted:", formData);
    setButtonText("Processing...");
    setLoading(true);
    // const data=formData

    try {
      // Mock API Call - Replace with actual API URL
      const { data: result } = await axios.post(
        `${brokerAPI}company/company-search`,
        { data: formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("API Result:", result);

      if (result.length === 0) {
        alert("No matching records found.");
        resetHandler();
      } else {
        navigate("/search/company-searchresults", {
          state: { searchResults: result },
        });
      }
    } catch (error) {
      console.error("Error fetching user search data:", error);
      alert("An error occurred while fetching data.");
      resetHandler();
    } finally {
      setLoading(false);
      setButtonText("Submit");
    }
  };

  const selectedCountries = ["USA", "CAN"];

  const combineStates = selectedCountries.flatMap(
    (country) => statesList[country] || []
  );

  return (
    <>
      <main className={styles.main}>
        <div className={css.profileInfo_links}>
          <ul className="!bg-[#e5e7eb]">
            <li>
              <NavLink
                to="/search/Inventory"
                end // This ensures the exact match for /myprofile
                className={({ isActive }) => (isActive ? css.active : "")}
              >
                <span>Inventory</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/search/Company"
                className={({ isActive }) => (isActive ? css.active : "")}
              >
                <span>Company</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/person"
                className={({ isActive }) => (isActive ? css.active : "")}
              >
                <span>Person</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <h2 style={{ margin: "15px" }}>Company Search</h2>
        <div className={styles.formContainer}>
          <form
            className={`${styles.personForm} !gap-[.4vw]`}
            onSubmit={handleSubmit}
          >
            <div className={`${styles.formRow}`}>
              <span>
                <CompanySearch setFormData={setFormData} formData={formData} />
              </span>
            </div>

            <div className={styles.formRow}>
              <label htmlFor="newMembers">New Members</label>
              <input
                type="checkbox"
                id="newMembers"
                name="newMembers"
                value={formData.newMembers}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formRow}>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formRow}>
              <label htmlFor="state">State</label>
              <select
                name="state"
                id="state"
                value={formData.state}
                onChange={handleInputChange}
              >
                <option value="">All</option>
                {combineStates.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formRow}>
              <label htmlFor="zip">Zip</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formRow}>
              <label htmlFor="Country">Country</label>
              <select
                name="country"
                id="country"
                value={formData.country}
                onChange={handleInputChange}
              >
                <option value="">All</option>
                {countriesList
                  .filter((country) => country.label !== "N/A")
                  .map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
              </select>
            </div>

            <div className={styles.formRow}>
              <label htmlFor="region">Region</label>
              <select
                name="region"
                id="region"
                value={formData.region}
                onChange={handleInputChange}
              >
                <option value="">All</option>
                {regionsList
                  .filter((region) => region.label !== "N/A")
                  .map((region) => (
                    <option key={region.value} value={region.value}>
                      {region.label}
                    </option>
                  ))}
              </select>
            </div>

            <div className={styles.formRow}>
              <label htmlFor="areaCode">Area Code</label>
              <input
                type="text"
                id="areaCode"
                name="areaCode"
                value={formData.areaCode}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formRow}>
              <label htmlFor="manufacturer">Manufacturer</label>
              <select
                name="manufacturer"
                id="manufacturer"
                value={formData.manufacturer}
                onChange={handleInputChange}
              >
                <option value="">All</option>
              </select>
            </div>

            <div className={styles.formRow}>
              <label htmlFor="products">Products</label>
              <select
                name="products"
                id="products"
                value={formData.products}
                onChange={handleInputChange}
              >
                <option value="">All</option>
              </select>
            </div>

            <div className={styles.formRow}>
              <label htmlFor="categories">Categories</label>
              <select
                name="categories"
                id="categories"
                value={formData.categories}
                onChange={handleInputChange}
              >
                <option value="">All</option>
              </select>
            </div>

            <div className={styles.formRow}>
              <label htmlFor="keywords">Keywords</label>
              <input
                type="keywords"
                id="keywords"
                name="keywords"
                value={formData.keywords}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.buttonContainer}>
              <button
                type="submit"
                disabled={loading} // Disable the button while processing
                className={`transform active:scale-90 transition-all duration-100 cursor-pointer p-4 text-white border rounded-lg ${
                  loading ? "bg-[#2c83ec] opacity-35 cursor-not-allowed" : "bg-[#2c83ec] "
                }`}
              >
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default SearchCompany;

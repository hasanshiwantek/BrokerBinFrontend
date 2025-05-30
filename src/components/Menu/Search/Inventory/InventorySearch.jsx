import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../../../../styles/Menu/Search/Person.module.css";
import css from "../../../../styles/Menu/Manage/MyProfile.module.css";
import CompanySearch from "./CompanySearch";
import { inventorySearch } from "../../../../ReduxStore/InventorySlice";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { countriesList, regionsList } from "../../../../data/services";

const InventorySearch = () => {
  const [buttonText, setButtonText] = useState("Submit");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    part: "",
    heci: "",
    description: "",
    manufacturer: "",
    partHeci: "",
    keyword: "",
    condition: "",
    company: "",
    country: "",
    region: "",
    shipDeadline: "",
    deadlinePeriod: "PM",
    multiplePartSearch: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetHandler = () => {
    setFormData({
      part: "",
      heci: "",
      description: "",
      manufacturer: "",
      partHeci: "",
      keyword: "",
      condition: "",
      company: "",
      country: "",
      region: "",
      shipDeadline: "",
      deadlinePeriod: "PM",
      multiplePartSearch: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Processing...");
    setLoading(true);

    try {
      const updatedFormData = { ...formData, page: 1, pageSize: 20 };
      const result = await dispatch(
        inventorySearch({ data: updatedFormData, token })
      ).unwrap();

      if (result.length === 0) {
        alert("No matching records found.");
        resetHandler();
      } else {
        const pagination = result.pagination;
        const params = new URLSearchParams();
        Object.entries(updatedFormData).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });
        params.append("page", updatedFormData.page);

        navigate(`/inventorysearch?${params.toString()}`, {
          state: {
            searchResults: result,
            pagination,
            filters: updatedFormData,
          },
        });
      }
    } catch (error) {
      alert("An error occurred while fetching data.");
    } finally {
      setLoading(false);
      setButtonText("Submit");
    }
  };

  return (
    <main className={styles.main}>
      <div className={css.profileInfo_links}>
        <ul className="!bg-[#e5e7eb]">
          <li>
            <NavLink
              to="/search/Inventory"
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

      <h2 style={{ margin: "15px" }}>Inventory Search</h2>
      <div className={styles.formContainer}>
        <form className={styles.personForm} onSubmit={handleSubmit}>
          {[
            "part",
            "multiplePartSearch",
            "heci",
            "description",
            "manufacturer",
          ].map((field) => (
            <div key={field} className={styles.formRow}>
              <label>{field.replace(/([A-Z])/g, " $1")}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="">
            <h2 className="text-2xl my-5">Keyword Searches</h2>
            <div className={styles.formRow}>
              <label htmlFor="partHeci">Part #/HECI</label>
              <input
                type="text"
                name="partHeci"
                id="partHeci"
                onChange={handleChange}
                value={formData.partHeci}
              />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="keyword">Keyword</label>
              <input
                type="text"
                name="keyword"
                id="keyword"
                onChange={handleChange}
                value={formData.keyword}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <label>Condition</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
            >
              <option value="">All</option>
              {[
                "NEW",
                "ASIS",
                "EXC",
                "F/S",
                "NOB",
                "REF",
                "OEMREF",
                "REP",
                "USED",
              ].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formRow}>
            <CompanySearch setFormData={setFormData} formData={formData} />
          </div>

          <div className={styles.formRow}>
            <label>Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">All</option>
              {countriesList.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formRow}>
            <label>Region</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
            >
              <option value="">All</option>
              {regionsList.map((region) => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formRow}>
            <label>Ship Deadline</label>
            <select
              name="shipDeadline"
              value={formData.shipDeadline}
              onChange={handleChange}
              className="!w-52"
            >
              <option value="">Open</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              name="deadlinePeriod"
              value={formData.deadlinePeriod}
              onChange={handleChange}
              className="!w-52"
            >
              <option value="PM">PM</option>
              <option value="AM">AM</option>
            </select>
          </div>

          <div className="flex justify-between mt-10  items-center">
            <button
              className="transform active:scale-90 transition-all duration-100 cursor-pointer p-3 text-white border rounded-lg bg-[#2c83ec]"
              onClick={resetHandler}
              type="button"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={loading} // Disable the button while processing
              className={`transform active:scale-90 transition-all duration-100 cursor-pointer p-3 text-white border rounded-lg ${
                loading ? "bg-[#2c83ec] opacity-50 " : "bg-[#2c83ec]"
              }`}
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default InventorySearch;

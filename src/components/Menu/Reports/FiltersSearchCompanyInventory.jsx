import React, { useState, useEffect, useRef } from "react";
import css from "../../../styles/Menu/Tools/MyVendors.module.css";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  searchCompany,
  setSearchCompanyData,
} from "../../../ReduxStore/Reports";

const FiltersSearchCompanyInventory = () => {
  const token = Cookies.get("token");
  const [searchTerm, setSearchTerm] = useState("");
  const [showList, setShowList] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [dropdownSelections, setDropdownSelections] = useState({});
  const [companyToAdd, setCompanyToAdd] = useState(null); // Track the selected company

  const inputRef = useRef();
  const listRef = useRef();

  const dispatch = useDispatch();
  const { searchCompanyData } = useSelector((store) => store.reports);

  // Debounce function for optimized search
  function debounce(func, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }

  const handleFocus = () => setShowList(true);

  // Search function with debounce
  const debounceSearch = debounce((term) => {
    if (term) {
      dispatch(searchCompany({ name: term, token }));
    }
  }, 500);

  const handleBlur = () => {
    setTimeout(() => setShowList(false), 200);
  };

  // Effect to handle search term changes
  useEffect(() => {
    if (searchTerm) {
      debounceSearch(searchTerm);
    } else {
      dispatch(setSearchCompanyData()); // Clear search results when input is empty
    }
  }, [searchTerm, dispatch, token]);

  // Handle input change
  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setShowList(true);
  };

  // Select a company from suggestions
  const handleCompanySelect = (company) => {
    setCompanyToAdd(company); // Store the selected company
    setSearchTerm(company.name); // Populate the full name in the input field
    setShowList(false); // Hide the suggestion list
  };

  // Add selected company to display list
  const handleAddCompany = () => {
    if (companyToAdd && !selectedCompanies.some((c) => c.id === companyToAdd.id)) {
      setSelectedCompanies([...selectedCompanies, companyToAdd]);
      setCompanyToAdd(null); // Clear the selected company
      setSearchTerm(""); // Clear the input field
    }
  };

  // Handle dropdown selection for each company
  const handleCompanyOption = (companyId, option) => {
    if (option === "remove") {
      setSelectedCompanies(selectedCompanies.filter((company) => company.id !== companyId));
      setDropdownSelections((prev) => {
        const updated = { ...prev };
        delete updated[companyId];
        return updated;
      });
    } else {
      setDropdownSelections((prev) => ({
        ...prev,
        [companyId]: option,
      }));
    }
  };

  return (
    <div className={css.searchCompanyInventory}>


    {/* Display selected companies with dropdown options */}
    <div className={css.selectedCompanies}>
        {selectedCompanies.map((company) => (
          <div key={company.id} className={css.selectedCompany}>
            <span>{company.name}</span>
            <select
              onChange={(e) => handleCompanyOption(company.id, e.target.value)}
              value={dropdownSelections[company.id] || ""}
            >
              <option value="send">Send</option>
              <option value="remove">Remove</option>
              <option value="omit">Omit</option>
            </select>
          </div>
        ))}
      </div>

      <div>
        <span>
          <label htmlFor="company">Company Search:</label>
        </span>
        <br />
        <span ref={inputRef}>
          <input
            type="search"
            name="company"
            id="company"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
            <span className={css.addBtn} onClick={handleAddCompany} style={{ marginLeft: "10px" }}>
        Add
      </span>
          <div className={css.compnaySearch} ref={listRef}>
            {showList && (
              <ul>
                {searchCompanyData?.length > 0 ? (
                  searchCompanyData.map((company) => (
                    <li
                      key={company.id}
                      onClick={() => handleCompanySelect(company)}
                      className={css.companyItem}
                    >
                      <p>{company.name}</p>
                      {company.region && company.country && (
                        <p>
                          <span>{company.region},</span>
                          <span>{company.country}</span>
                        </p>
                      )}
                    </li>
                  ))
                ) : (
                  <li key="no-results">No results found</li>
                )}
              </ul>
            )}
          </div>
        </span>
      </div>
   

  
    </div>
  );
};

export default FiltersSearchCompanyInventory;

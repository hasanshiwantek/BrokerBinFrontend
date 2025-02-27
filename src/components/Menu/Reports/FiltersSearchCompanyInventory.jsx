import React, { useState, useEffect, useRef } from "react";
import css from "../../../styles/Menu/Tools/MyVendors.module.css";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  searchCompany,
  setSearchCompanyData,

} from "../../../ReduxStore/Reports";
import { setSelectedCompanyNames } from "@/ReduxStore/BroadCast";
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
  const { searchCompanyData} = useSelector(
    (store) => store.reports
  );
  const {selectedCompanyNames} = useSelector((store) => store.broadcastStore);
  console.log("Search Company Data Names", searchCompanyData);
  console.log("Selected Company Name from Redux,", selectedCompanyNames);

  const companyNames = selectedCompanies.map((company) => company.name);
  console.log("Selected Companies", companyNames);
  // Debounce function for optimized search
  function debounce(func, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }

  useEffect(() => {
    if (JSON.stringify(selectedCompanyNames) !== JSON.stringify(companyNames)) {
      dispatch(setSelectedCompanyNames(companyNames));
    }
  }, [companyNames, dispatch, selectedCompanyNames]);

  useEffect(() => {
    if (selectedCompanyNames.length > 0) {
      setSelectedCompanies(selectedCompanyNames.map((name) => ({ name })));
    }
  }, [selectedCompanyNames]);

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
    if (
      companyToAdd &&
      !selectedCompanies.some((c) => c.id === companyToAdd.id)
    ) {
      setSelectedCompanies([...selectedCompanies, companyToAdd]);
      setCompanyToAdd(null); // Clear the selected company
      setSearchTerm(""); // Clear the input field
    }
  };

  // Handle dropdown selection for each company
  const handleCompanyOption = (index, option) => {
    setDropdownSelections((prev) => ({
      ...prev, // Keep previous selections
      [index]: option, // Update only the selected company
    }));

    // If the option is "remove", remove the company from the selected list
    if (option === "remove") {
      setSelectedCompanies((prevCompanies) =>
        prevCompanies.filter((company,ind) => ind !== index)
      );

      // Also remove from dropdownSelections to prevent stale state
      setDropdownSelections((prev) => {
        const updated = { ...prev };
        delete updated[index];
        return updated;
      });
    }
  };

  return (
    <div className={css.searchCompanyInventory}>
      {/* Display selected companies with dropdown options */}
      <div className={css.selectedCompanies}>
        {selectedCompanies.map((company,index) => (
          <div key={index} className={css.selectedCompany}>
            <span>{company.name}</span>
            <select
              className="border border-gray-300 rounded-md"
              onChange={(e) => handleCompanyOption(index, e.target.value)}
              value={dropdownSelections[index] || ""}
            >
              <option value="send">Send</option>
              <option value="remove">Remove</option>
              {/* <option value="omit">Omit</option> */}
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
          <span
            className={css.addBtn}
            onClick={handleAddCompany}
            style={{ marginLeft: "10px" }}
          >
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
                      className={`${css.companyItem} `}
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

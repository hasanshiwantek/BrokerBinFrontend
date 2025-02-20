import React, { useState, useEffect, useRef } from "react";
import css from "../../../styles/Menu/Main/Ethics.module.css";
import { searchCompanyName } from "../../../ReduxStore/ToolsSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const SearchCompany = ({ setFormData }) => {
  const token = Cookies.get("token");
  const [searchTerm, setSearchTerm] = useState("");
  const [showList, setShowList] = useState(false);

  const inputRef = useRef();
  const listRef = useRef();

  const dispatch = useDispatch();
  const { searchCompanies } = useSelector((store) => store.toolsStore);

  function debounce(func, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }

  // Debounce function
  const debounceSearch = debounce((term) => {
    if (term) {
      dispatch(searchCompanyName({ search: term, token }));
    }
  }, 500); // Adjust the debounce delay as needed

  useEffect(() => {
    if (searchTerm) {
      // Fetch companies that match the input
      debounceSearch(searchTerm);
    }
  }, [searchTerm, dispatch, token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log(event.target);

      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        listRef.current &&
        !listRef.current.contains(event.target)
      ) {
        setShowList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setShowList(true);
    // if (!newSearchTerm) {
    // setSelectedCompany(null); // Clear selected company if the search term is empty
    // }
  };

  const handleCompanySelect = (company) => {
    // console.log(company.id);
    // setSelectedCompany(company);
    setSearchTerm(company.name); // Optionally, set the search input to the selected company's name
    setFormData((prev) => {
      return { ...prev, company_id: company.id };
    });

    setShowList(false);
  };

  const handleFocus = () => setShowList(true);

  const handleBlur = () => {
    // Delay hiding the list to allow click events to register
    setTimeout(() => setShowList(false), 200);
  };

  return (
    <>
      <span>
        <label htmlFor="company">"Which company is this about?<span className="text-red-500">*</span></label>
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
          required
        />
        <div className={css.compnaySearch} ref={listRef}>
          {showList && (
            <ul>
              {searchCompanies.length > 0 ? (
                searchCompanies.map((company) => (
                  <li
                    key={company.id}
                    onClick={() => handleCompanySelect(company)}
                    className={css.companyItem}
                  >
                    <p>{company.name}</p>
                    {company.region && company.region && (
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
    </>
  );
};

export default SearchCompany;

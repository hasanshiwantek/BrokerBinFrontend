import React, { useState, useEffect, useRef } from "react";
import css from "../../../../styles/Menu/Tools/MyVendors.module.css";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  getCompanyInventory,
  searchCompany,
  setSearchCompanyData,
} from "../../../../ReduxStore/Reports";
import { useNavigate } from "react-router-dom";

const SearchCompanyInventory = () => {
  const token = Cookies.get("token");
  const [searchTerm, setSearchTerm] = useState("");
  const [showList, setShowList] = useState(false);

  const inputRef = useRef();
  const listRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchCompanyData } = useSelector((store) => store.reports);

  console.log(searchCompanyData);

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
      dispatch(searchCompany({ name: term, token }));
    }
  }, 500); // Adjust the debounce delay as needed

  useEffect(() => {
    if (searchTerm) {
      // Fetch companies that match the input
      debounceSearch(searchTerm);
    } else {
      dispatch(setSearchCompanyData());
    }
  }, [searchTerm, dispatch, token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
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
  };

  const handleCompanySelect = (company) => {
    // dispatch(setMyVendor(company));
    const id = company.id;
    const page = 1; // Replace with the desired page number
    console.log(id, page);
    dispatch(getCompanyInventory({ token, id, page }));
    setSearchTerm(company.name); // Optionally, set the search input to the selected company's name
    setShowList(false);
  };

  const handleFocus = () => setShowList(true);

  const handleBlur = () => {
    // Delay hiding the list to allow click events to register
    setTimeout(() => setShowList(false), 200);
  };

  const goToCompanyInventory = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      alert("Please enter a company name");
      return;
    }
    const id = searchCompanyData[0].id;
    const page = 1;
    console.log(id, page);

    navigate(`/reports/companyInventory?id=${id}&page=${page}`, {
      replace: true,
    });
  };

  return (
    <div className={css.searchCompanyInventory}>
      <div className="w-full max-w-md">
        <label
          htmlFor="company"
          className="block mb-1 font-medium text-gray-700"
        >
          Company Search:
        </label>

        <div className="relative" ref={inputRef}>
          <input
            type="search"
            name="company"
            id="company"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {showList && (
            <div
              className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto"
              ref={listRef}
            >
              <ul className="divide-y divide-gray-200">
                {searchCompanyData?.length > 0 ? (
                  searchCompanyData.map((company) => (
                    <li
                      key={company.id}
                      onClick={() => handleCompanySelect(company)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <p className="font-medium">{company.name}</p>
                      {company.region && company.country && (
                        <p className="text-sm text-gray-500">
                          <span>{company.region}, </span>
                          <span>{company.country}</span>
                        </p>
                      )}
                    </li>
                  ))
                ) : (
                  <li
                    key="no-results"
                    className="px-4 py-2 text-gray-500 italic"
                  >
                    No results found
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={css.Searchbutton}>
        <button
          className={`${css.orangeButton} !m-5`}
          onClick={(e) => goToCompanyInventory(e)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SearchCompanyInventory;

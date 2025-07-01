import React, { useState, useEffect, useRef } from "react";
import css from "../../../styles/Menu/Tools/MyVendors.module.css";
import {
  addMyVendors,
  getMyVendors,
  searchMyVendors,
  setEmptySearchCompanies,
  setMyVendor,
} from "../../../ReduxStore/ToolsSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const SearchMyContact = () => {
  const token = Cookies.get("token");
  const [searchTerm, setSearchTerm] = useState("");
  const [showList, setShowList] = useState(false);

  const inputRef = useRef();
  const listRef = useRef();

  const dispatch = useDispatch();
  const { searchMyVendor, myVendor } = useSelector((store) => store.toolsStore);

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
      dispatch(searchMyVendors({ search: term, token }));
    }
  }, 500); // Adjust the debounce delay as needed

  useEffect(() => {
    if (searchTerm) {
      // Fetch companies that match the input
      debounceSearch(searchTerm);
    } else {
      dispatch(setEmptySearchCompanies());
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
    const companyId = { company_id: company.id };
    dispatch(addMyVendors({ companyId, token }));
    setSearchTerm(company.name);
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
        <label htmlFor="company" className="whitespace-nowrap">Quick Add:</label>
      </span>
      <br />
      <span ref={inputRef} className="relative inline-block w-full ">
        <input
          type="search"
          name="company"
          id="company"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          placeholder="Search company..."
          className="  w-full p-2 border border-gray-300 rounded shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        />

        {showList && (
          <div
            ref={listRef}
            className={`${css.compnaySearch} absolute z-10 mt-1 w-full overflow-x-auto  bg-white border border-gray-300 rounded shadow-md`}
          >
            <ul  className="max-h-72 overflow-y-auto">
              {searchMyVendor?.length > 0 ? (
                searchMyVendor.map((company) => (
                  <li
                    key={company.id}
                    onClick={() => handleCompanySelect(company)}
                    className={`${css.companyItem} px-3 py-2  cursor-pointer hover:bg-blue-500 hover:text-white transition duration-150 ease-in-out`}
                  >
                    <p className="font-semibold">{company.name}</p>
                    {(company.state || company.country) && (
                      <p className="text-sm opacity-80">
                        <span>{company.state}</span>
                        {company.state && company.country && <span>, </span>}
                        <span>{company.country}</span>
                      </p>
                    )}
                  </li>
                ))
              ) : (
                <li
                  className="px-3 py-2 text-sm text-gray-500"
                  key="no-results"
                >
                  No results found
                </li>
              )}
            </ul>
          </div>
        )}
      </span>
    </>
  );
};

export default SearchMyContact;

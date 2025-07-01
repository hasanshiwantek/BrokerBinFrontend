import React, { useState, useEffect, useRef } from "react";
import css from "../../../styles/Menu/Tools/MyVendors.module.css";
import {
  addMyVendors,
  getMyVendors,
  searchMyVendors,
  addMyContacts,
  searchMyFavouriteContacts,
  setEmptySearchContacts,
  fetchMyContacts,
  setMyVendor,
} from "../../../ReduxStore/ToolsSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const SearchMyFavouriteContact = () => {
  const token = Cookies.get("token");
  const [searchTerm, setSearchTerm] = useState("");
  const [showList, setShowList] = useState(false);

  const inputRef = useRef();
  const listRef = useRef();

  const dispatch = useDispatch();
  const { searchMyVendor, myVendor, searchMyContact } = useSelector(
    (store) => store.toolsStore
  );
  console.log("searchMyContact From Frontend", searchMyContact);

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
      dispatch(searchMyFavouriteContacts({ search: term, token }));
    }
  }, 500); // Adjust the debounce delay as needed

  useEffect(() => {
    if (searchTerm) {
      // Fetch companies that match the input
      debounceSearch(searchTerm);
    } else {
      dispatch(setEmptySearchContacts());
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
  const handleContactSelect = async (firstName, id) => {
    try {
      const result = await dispatch(
        addMyContacts({ contact_id: id, token })
      ).unwrap();
      toast.success(result.message || "Contact added successfully!");
      dispatch(fetchMyContacts({ token }));
      setSearchTerm("");
      setShowList(false);
    } catch (error) {
      toast.error(error.message || "Failed to add contact.");
    }
  };

  const handleFocus = () => setShowList(true);

  const handleBlur = () => {
    // Delay hiding the list to allow click events to register
    setTimeout(() => setShowList(false), 200);
  };

  return (
    <>
      <span className="block mb-1">
        <label htmlFor="company" className="font-semibold whitespace-nowrap">
          Quick Add:
        </label>
      </span>

      <span ref={inputRef} className="relative inline-block w-full">
        <input
          type="search"
          name="company"
          id="company"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          placeholder="Type contact name..."
          className="p-2 w-full border border-gray-300 rounded outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        />

        {showList && (
          <div
            ref={listRef}
            className={`${css.compnaySearch} absolute z-10 mt-1 max-h-52 overflow-y-auto bg-white border border-gray-300 rounded shadow-md w-fit`}
          >
            <ul>
              {searchMyContact?.length > 0 ? (
                searchMyContact.map((company, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleContactSelect(company.firstName, company.id)
                    }
                    className={`${css.companyItem} px-3 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition duration-150 ease-in-out`}
                  >
                    <p className="text-base font-semibold">
                      {company.firstName} {company.lastName}
                    </p>
                    {company.email && (
                      <p className="text-sm !lowercase opacity-90">
                        {company.email}
                      </p>
                    )}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-sm text-gray-500">
                  No results found
                </li>
              )}
            </ul>
          </div>
        )}
      </span>

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default SearchMyFavouriteContact;

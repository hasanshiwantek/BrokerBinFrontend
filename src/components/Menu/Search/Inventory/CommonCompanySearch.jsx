import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchCompany } from "../../../../ReduxStore/Reports";
import Cookies from "js-cookie";

const CommonCompanySearch = ({ formData, setFormData }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [companies, setCompanies] = useState([]); // Local state for companies
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (formData.company && !dropdownVisible) {
        dispatch(
          searchCompany({ name: formData.company, token: token }) // Pass "name" and "token"
        )
          .unwrap()
          .then((results) => {
            setCompanies(results); // Limit results to 3
            setDropdownVisible(true);
            setHighlightIndex(-1);
          })
          .catch(() => setDropdownVisible(false)); // Handle errors
      } else {
        setDropdownVisible(false);
      }
    }, 300); // Debounce for API calls

    return () => clearTimeout(debounce);
  }, [formData.company, dispatch, token]);

  const handleSelect = (company) => {
    setFormData({ ...formData, company });
    setDropdownVisible(false);
  };

  const handleKeyDown = (e) => {
    if (!dropdownVisible || companies.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % companies.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex(
        (prev) => (prev - 1 + companies.length) % companies.length
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < companies.length) {
        handleSelect(companies[highlightIndex].name);
      }
    }
  };

  return (
    <span
      style={{ position: "relative" }}
      className="flex items-center justify-start space-x-5 gap-5"
    >
      <label htmlFor="Company" className="w-[24%]">
        Company
      </label>

      <input
        type="text"
        name="company"
        id="specialty"
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        value={formData.company || ""}
        className="!w-[19rem]"
        onKeyDown={handleKeyDown}
      />

      {dropdownVisible && (
        <div
          style={{
            border: "1px solid #ccc",
            maxHeight: "150px",
            overflowY: "auto",
            position: "absolute",
            left: "7.7rem",
            background: "#fff",
            zIndex: 1,
            top: "100%",
            width: "66%",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          {companies.map((company, index) => (
            <div
              key={index}
              onClick={() => handleSelect(company.name)}
              className={`px-3 py-2 border-b border-gray-100 text-based text-[#444] cursor-pointer hover:bg-[#2c83ec] hover:text-white leading-[1vw] ${
                index === highlightIndex ? "bg-[#2c83ec] text-white" : ""
              }`}
            >
              {company.name}
              {(company.state || company.country) && (
                <p className="text-xs">
                  <span>{company.state}</span>
                  {company.state && company.country && ", "}
                  <span>{company.country}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </span>
  );
};

export default CommonCompanySearch;

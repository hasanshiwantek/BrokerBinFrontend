import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchCompany } from "../../../../ReduxStore/Reports";
import Cookies from "js-cookie";

const CompanySearchInventory = ({ formData, setFormData }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [companies, setCompanies] = useState([]); // Local state for companies
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

  return (
    <span style={{ position: "relative" }}>
      <label htmlFor="Company">Company</label>
      <input
        type="text"
        name="company"
        id="specialty"
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        value={formData.company || ""}
      />
      {dropdownVisible && (
        <div
          style={{
            border: "1px solid #ccc",
            maxHeight: "100px",
            overflowY: "auto",
            position: "absolute",
            left: "4.5vw",
            background: "#fff",
            zIndex: 1,
            width: "70%",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          {companies.map((company, index) => (
            <div
              key={index}
              onClick={() => handleSelect(company.name)}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#2c83ec")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #f0f0f0",
                textAlign: "left",
              }}
              className="hover:text-white hover:bg-[#2c83ec]"
            >
              {company.name}
            </div>
          ))}
        </div>
      )}
    </span>
  );
};

export default CompanySearchInventory;

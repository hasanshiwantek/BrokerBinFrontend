import { useEffect, useState, useRef } from "react";
import { FaEllipsisH, FaChevronDown } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import FiltersComponent from "./FiltersComponent";
import axios from "axios";
import {addMyVendors} from "../../../../ReduxStore/ToolsSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { brokerAPI } from '@/components/api/BrokerEndpoint'
import CompanyDetails from "@/components/Popups/CompanyDetails/CompanyDetails";

const RightSidebar = ({ company }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState(null); // ✅ Store filtered data
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (showFilters) {
      setIsDropdownOpen(false);
    }
  }, [showFilters])

  const handleFiltersUpdate = (selectedFilters) => {
    setFilters(selectedFilters);
  };


  const applyFilters = async () => {
    try {
      const queryParams = new URLSearchParams();

      filters.country.forEach(country => queryParams.append("country", country));
      filters.region.forEach(region => queryParams.append("region", region));
      filters.state.forEach(state => queryParams.append("state", state));


      const { data } = await axios.post(`${brokerAPI}company/company-search${queryParams}`);
      setFilteredData(data);
      setShowFilters(false);
    } catch (error) {
      console.error("Error fetching filtered companies:", error);
    }
  };

  const totalResults =  company?.total ?? filteredData?.total;

  const companiesToShow = Array.isArray(filteredData?.companies) && filteredData.companies.length > 0
    ? filteredData.companies
    : company
      ? Array.isArray(company.companies)
        ? company.companies
        : [company] 
      : [];

      // useEffect(() => {
      //   console.log("Company Prop Received:", company); 
      // }, [company, companiesToShow]);

  const handleEmail = (email, subject) => {
    console.log("Opening email for:", email);
    window.location.href = `mailto:${email}?subject=${subject}`;
  };

  const handleAddVendor = async (compId) => {
    try {
      const companyId = {company_id: compId}
      dispatch(addMyVendors({ companyId, token }));
    } catch (error) {
      console.log("ERROR while adding vendor, please try again later", error);
    }
  };

  const handleViewProfile = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const handleVisitWebsite = (website) => {
    if (website) {
      window.open(website, "_blank");
    } else {
      alert("Website not available.");
    }
  };

  return (
    <div className="  w-full">
      <div
        className="flex justify-between items-center text-[1vw] bg-black bg-opacity-50 !text-white p-7 rounded cursor-pointer"
        onMouseEnter={() => setIsDropdownOpen((prev) => prev = !prev)}
        ref={dropdownRef}
      >
        <h1 onClick={() => {
          if (!showFilters) {
            setIsDropdownOpen(false);  // ✅ Close dropdown
            setShowFilters(true);      // ✅ Open filters
          }
        }}>
          {showFilters
            ? "Sorting and Filters"
            : `${totalResults} results from`
          }
          {!showFilters && <strong className="!text-white !text-[1vw]">0 selected filters</strong>}
        </h1>
        {!showFilters ? (
          <IoIosArrowUp className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
        ) : (
          <div className="flex gap-2">
            <button
              className="bg-[#2c83ec] text-white px-3 py-1 rounded"
              onClick={applyFilters}
            >
              Apply
            </button>

            <button className="bg-[#2c83ec] text-white px-3 py-1 rounded">Clear</button>
            <button className="bg-[#2c83ec] text-white px-3 py-1 rounded" onClick={() => setShowFilters(false)}>X</button>
          </div>
        )}
      </div>

      {isDropdownOpen && (
        <div className="absolute bg-white shadow-lg rounded z-10  ">
          {["Region", "Country", "State", "Manufacturer", "My Vendors", "Products",
            "Feedback Rating", "Shield Members", "Listing Inventory", "Membership Level"
          ].map((filter, index) => (
            <div key={index} className="p-2 hover:bg-gray-300 cursor-pointer">{filter}</div>
          ))}
        </div>
      )}

      {showFilters ? (
        <FiltersComponent
          onFiltersChange={handleFiltersUpdate}
          setShowFilters={setShowFilters}
          setFilteredData={setFilteredData}
        />
      ) : (

      (companiesToShow.map((comp) => (
        <div className="bg-blue-200 p-4 rounded relative" key={comp.id}>
          <div className="flex gap-4">
            <img src={comp.logo} alt="Company Logo" className="w-16 h-16 rounded" />
            <div>
              <h3 className="font-bold">{comp.company}</h3>
              <p className="text-sm">{comp.address}</p>
              <p className="text-sm font-semibold">{comp.contactPerson}</p>
            </div>

            <FaEllipsisH className="absolute top-4 right-6 cursor-pointer text-[#2c83ec]" />
          </div>
    
          <FaEllipsisH 
          className="absolute top-10 right-6 cursor-pointer text-[#2c83ec]"
          onClick={() => {setDropdownOpen(dropdownOpen === comp.id ? null : comp.id); console.log(("COMPANYID", comp.id))}} />

          {dropdownOpen === comp.id && (
              <div className="absolute right-2 text-black w-70 bg-white shadow-lg rounded border p-2 z-50">
                <button
                  className="block w-full text-black text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => {handleEmail(comp.contactEmail, "Inquiry")}}
                >
                  📧 Email
                </button>
                <button
                  className="block w-full text-black text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => handleAddVendor(comp.id)}
                >
                  ➕ Add Vendor
                </button>
                <button
                  className="block w-full text-black text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => handleViewProfile(comp)}
                >
                  👤 View Profile
                </button>
                <button
                  className="block w-full text-black text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => handleVisitWebsite(comp.website)}
                >
                  🌍 Visit Website
                </button>
                <button
                  className="block w-full text-black text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => handleEmail(comp.contactEmail, "Suggestion")}
                >
                  ✍️ Suggest an Edit
                </button>
              </div>
            )}
        </div>
      ))
      
      ))}
      {showModal && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold">{selectedCompany.company}</h2>
            <p>{selectedCompany.address}</p>
            <p>Contact: {selectedCompany.contactPerson}</p>
            <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
        
      )}
    </div>
  );
};

export default RightSidebar;

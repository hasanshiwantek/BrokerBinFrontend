import { useEffect, useState, useRef } from "react";
import { FaEllipsisH, FaChevronDown } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import FiltersComponent from "./FiltersComponent";
import axios from "axios";
import { addMyVendors } from "../../../../ReduxStore/ToolsSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { brokerAPI } from "@/components/api/BrokerEndpoint";
import CompanyDetails from "@/components/Popups/CompanyDetails/CompanyDetails";
import { FaStar } from "react-icons/fa";
import { Tooltip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const RightSidebar = ({ company }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState(null); // ✅ Store filtered data
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };

    if (dropdownOpen !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

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
  }, [showFilters]);

  const handleFiltersUpdate = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  // const applyFilters = async () => {
  //   try {
  //     const queryParams = new URLSearchParams();

  //     filters.country.forEach(country => queryParams.append("country", country));
  //     filters.region.forEach(region => queryParams.append("region", region));
  //     filters.state.forEach(state => queryParams.append("state", state));

  //     const { data } = await axios.post(`${brokerAPI}company/company-search${queryParams}`);
  //     setFilteredData(data);
  //     setShowFilters(false);
  //   } catch (error) {
  //     console.error("Error fetching filtered companies:", error);
  //   }
  // };

  const applyFilters = async () => {
    try {
      const payload = {
        data: {
          country: filters.country,
          region: filters.region,
          state: filters.state,
          // state: filters.state.length ? filters.state.join(",") : "",
          // country: filters.country.length ? filters.country.join(",") : "",
        },
      };
      const { data } = await axios.post(
        `${brokerAPI}company/company-search`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
        // console.log("TOKEN", token)
      );
      setFilteredData(data);
      setShowFilters(false);
    } catch (error) {
      console.log("Error fetching filtered companies", error);
    }
  };

  const totalResults = company?.total ?? filteredData?.total;

  const companiesToShow =
    Array.isArray(filteredData?.companies) && filteredData.companies.length > 0
      ? filteredData.companies
      : company
      ? Array.isArray(company.companies)
        ? company.companies
        : [company]
      : [];

  console.log("COMPANIES TO SHOW", companiesToShow);
  // useEffect(() => {
  //   console.log("Company Prop Received:", company);
  // }, [company, companiesToShow]);

  const handleEmail = (email, subject) => {
    console.log("Opening email for:", email);
    window.location.href = `mailto:${email}?subject=${subject}`;
  };

  const handleAddVendor = async (compId) => {
    try {
      const companyId = { company_id: compId };
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

  const companyRatings = companiesToShow?.map((vendor) => vendor?.rating) || [];
  const ratingCounts =
    companiesToShow?.map((vendor) => vendor?.ratingCount) || [];

  console.log(
    "Company Ratings in %:",
    companiesToShow.map((rating) => (rating / 5) * 100)
  );

  console.log("Rating Counts:", ratingCounts);

  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "1.2rem", // Adjust font size
            width: "11rem",
            textAlign: "center",
            backgroundColor: "var(--primary-color)",
          },
          arrow: {
            color: "var(--primary-color)",
          },
        },
      },
    },
  });

  return (
    <div className="w-full w-[50rem] border-[1px] border-l-gray-500 ">
      <div
        className="flex justify-center gap-3 items-center text-[1vw] -mt-[1px] bg-black bg-opacity-50 !text-white p-7 rounded cursor-pointer relative "
        onMouseEnter={() => setIsDropdownOpen((prev) => (prev = !prev))}
        ref={dropdownRef}
      >
        <div>
          <h1
            onClick={() => {
              if (!showFilters) {
                setIsDropdownOpen(false); // ✅ Close dropdown
                setShowFilters(true); // ✅ Open filters
              }
            }}
            className="m-1 !text-3xl "
          >
            {showFilters
              ? "Sorting and Filters"
              : `${totalResults} results from`}
            {!showFilters && (
              <ThemeProvider theme={theme}>
                <Tooltip title="Show Filters" arrow placement="top">
                  <strong className="!text-white !text-3xl ml-4">
                    0 selected filters
                  </strong>
                </Tooltip>
              </ThemeProvider>
            )}
          </h1>
        </div>

        {!showFilters ? (
          <IoIosArrowUp
            className={`transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        ) : (
          <div className="flex gap-2">
            <button
              className="bg-[#2c83ec] text-white px-5 py-2 rounded-md font-semibold 
               hover:bg-[#1e6fd6] focus:ring-2 focus:ring-blue-300 
               transition duration-300 outline-none"
              onClick={applyFilters}
            >
              Apply
            </button>

            <button
              className="bg-[#2c83ec] text-white px-5 py-2 rounded-md font-semibold 
               hover:bg-[#1e6fd6] focus:ring-2 focus:ring-blue-300 
               transition duration-300 outline-none"
            >
              Clear
            </button>
            <button
              className="bg-[#2c83ec] text-white px-5 py-2 rounded-md font-semibold 
                   hover:bg-[#1e6fd6] focus:ring-2 focus:ring-blue-300 
                   transition duration-300 outline-none"
              onClick={() => setShowFilters(false)}
            >
              X
            </button>
          </div>
        )}
        {isDropdownOpen && (
          <div className="absolute bg-white shadow-lg rounded z-10 top-24 left-56 !text-[#444] ">
            {[
              "Region",
              "Country",
              "State",
              "Manufacturer",
              "My Vendors",
              "Products",
              "Feedback Rating",
              "Shield Members",
              "Listing Inventory",
              "Membership Level",
            ].map((filter, index) => (
              <div
                key={index}
                className="px-5 py-3 hover:bg-blue-500 hover:text-white cursor-pointer text-2xl"
              >
                {filter}
              </div>
            ))}
          </div>
        )}
      </div>

      {showFilters ? (
        <FiltersComponent
          onFiltersChange={handleFiltersUpdate}
          setShowFilters={setShowFilters}
          setFilteredData={setFilteredData}
        />
      ) : (
        companiesToShow.map((comp, index) => (
          <div
            key={comp.id}
            className="bg-white px-2 rounded relative hover:bg-blue-200 transition w-[50rem] border border-b-[1px] "
          >
            <div className="flex gap-5 items-center ">
              <div className="flex flex-col">
                <ThemeProvider theme={theme}>
                  <Tooltip
                    title="View Company Profile"
                    arrow
                    placement="bottom"
                  >
                    <div>
                      <img
                        src={comp.logo}
                        alt="Company Logo"
                        className="w-40 h-20  rounded-lg object-contain p-1"
                      />
                    </div>
                  </Tooltip>
                </ThemeProvider>
                <div>
                  {/* ⭐ Display Star Ratings */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {[...Array(5)].map((_, starIndex) => {
                      const rating = companyRatings?.[index] || 0; // ✅ index is now defined
                      const isFilled = starIndex + 1 <= Math.floor(rating);
                      const isPartial =
                        starIndex < rating &&
                        starIndex + 1 > Math.floor(rating);

                      return (
                        <FaStar
                          key={starIndex}
                          size={24}
                          color={
                            isFilled
                              ? "#FFD700"
                              : isPartial
                              ? "rgba(255, 215, 0, 0.5)"
                              : "#CCC"
                          }
                          style={{ cursor: "pointer", marginRight: 2 }}
                        />
                      );
                    })}
                  </div>

                  {/* Display Rating Value & Count */}
                  <p className="text-center text-base m-2">
                    (
                    {companyRatings[index] == null ||
                    isNaN(companyRatings[index])
                      ? "N/A"
                      : (
                          (Math.min(Math.max(companyRatings[index], 0), 5) /
                            5) *
                          100
                        ).toFixed(1) + "%"}
                    )
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <ThemeProvider theme={theme}>
                  <Tooltip title={`${comp.company}`} arrow placement="top">
                    <h3 className="font-semibold text-2xl">{comp.company}</h3>
                  </Tooltip>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                  <Tooltip title={`${comp.address}`} arrow placement="top">
                    <p className="text-sm font-semibold">{comp.address}</p>
                  </Tooltip>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                  <Tooltip
                    title={`${comp.contactPerson}`}
                    arrow
                    placement="bottom"
                  >
                    <p className="text-sm font-semibold">
                      {comp.contactPerson}
                    </p>
                  </Tooltip>
                </ThemeProvider>
              </div>
              {/* <FaEllipsisH className="absolute top-4 right-6 cursor-pointer text-[#2c83ec]" /> */}
            </div>

            <FaEllipsisH
              className="absolute top-10 right-6 cursor-pointer text-[#2c83ec]"
              onClick={() => {
                setDropdownOpen(dropdownOpen === comp.id ? null : comp.id);
                console.log(("COMPANYID", comp.id));
              }}
            />

            {dropdownOpen === comp.id && (
              <div
                ref={dropdownRef}
                className="absolute top-16 right-2 text-black w-70 bg-white shadow-xl rounded border w-[25rem] z-50 transition  "
              >
                <button
                  className="block w-full text-[#444] text-left px-4 py-4 hover:bg-blue-400 hover:text-white"
                  onClick={() => {
                    handleEmail(comp.contactEmail, "Inquiry");
                  }}
                >
                  Email
                </button>
                <button
                  className="block w-full text-[#444] text-left px-4 py-4 hover:bg-blue-400 hover:text-white "
                  onClick={() => handleAddVendor(comp.id)}
                >
                  Add Vendor
                </button>
                <button
                  className="block w-full text-[#444] text-left px-4 py-4 hover:bg-blue-400 hover:text-white"
                  onClick={() => handleViewProfile(comp)}
                >
                  View Profile
                </button>
                <button
                  className="block w-full text-[#444] text-left px-4 py-4 hover:bg-blue-400 hover:text-white"
                  onClick={() => handleVisitWebsite(comp.website)}
                >
                  Visit Website
                </button>
                <button
                  className="block w-full text-[#444] text-left px-4 py-4 hover:bg-blue-400 hover:text-white"
                  onClick={() => handleEmail(comp.contactEmail, "Suggestion")}
                >
                  Suggest an Edit
                </button>
              </div>
            )}
          </div>
        ))
      )}
      {showModal && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold">{selectedCompany.company}</h2>
            <p>{selectedCompany.address}</p>
            <p>Contact: {selectedCompany.contactPerson}</p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSidebar;

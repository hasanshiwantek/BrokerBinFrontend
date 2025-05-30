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
import { setTogglePopUp } from "@/ReduxStore/SearchProductSlice";
import { setPopupCompanyDetail } from "@/ReduxStore/SearchProductSlice";
import addVendorIcon from "@/assets/add-friend.svg";
import dollarSymbolIcon from "@/assets/dollar-symbol.svg";
import editIcon from "@/assets/edit.svg";
import emailIcon from "@/assets/email-icon.svg";
import listIcon from "@/assets/add-friend.svg";
import removeVendorIcon from "@/assets/remove-icon.svg";
import webIcon from "@/assets/web.svg";
import profileIcon from "@/assets/list.svg";
import { filterDropdown } from "@/data/services";
import buildingIcon from "@/assets/building.svg";
import userIcon from "@/assets/user.svg";
import locationIcon from "@/assets/pin.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const RightSidebar = ({ company, filteredData, setFilteredData }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  // const [filteredData, setFilteredData] = useState(null); // ✅ it was made to store filtered data but now it is passed from parent.
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [scrollToSection, setScrollToSection] = useState(null);

  const dropdownRef = useRef(null);
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const { togglePopUp, popupCompanyDetail } = useSelector(
    (state) => state.searchProductStore
  );
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

  console.log("Filters", filters);

  const clearFilters = () => {
    setFilters({}); // Clear all filters
    setFilteredData(null); // Reset filtered data to null
    setShowFilters(false); // Close the filter section
    // applyFilters(); // Re-fetch all data without filters
  };

  const selectedFiltersCount = Object.values(filters).filter(
    (arr) => arr.length > 0
  ).length;
  console.log("Selected Filters", selectedFiltersCount);

  const hasCompanyCategories =
  (filters.computers?.length || 0) ||
  (filters.telecom?.length || 0) ||
  (filters.mobile?.length || 0) ||
  (filters.other?.length || 0);

  const applyFilters = async () => {
    try {
      const payload = {
        data: {
          country: filters.country,
          region: filters.region,
          state: filters.state,
          manufacturer: filters.manufacturer,
          categories: filters.categories,
          myVendors: filters.myVendors,
          ...(hasCompanyCategories && {
            companyCategories: {
              ...(filters.computers?.length && { computers: filters.computers }),
              ...(filters.telecom?.length && { telecom: filters.telecom }),
              ...(filters.mobile?.length && { mobileDevice: filters.mobile }),
              ...(filters.other?.length && { other: filters.other }),
            }
          }),
          show: filters.show,
          hasInventory: filters.hasInventory,
          rating: filters.feedbackRating,
          sortBy: filters.sortBy,
          sortOrder: filters.sortOrder,
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

  const totalResults = filteredData ? filteredData.total : company?.total;
  // console.log("TOTAL RESULTS", totalResults);

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
      toast.info(`Vendor Added Succesfully!`, {
        style: { fontSize: "17px", marginTop: "-10px" }, //
      });
    } catch (error) {
      console.log("ERROR while adding vendor, please try again later", error);
      toast.error("Error while adding vendor, please try again later", {
        style: { fontSize: "17px", marginTop: "-10px" }, //
      });
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

  console.log("Rating Counts:", ratingCounts);

  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "1.2rem", // Adjust font size
            width: "fitContent",
            textAlign: "center",
            whiteSpace: "nowrap",
            backgroundColor: "var(--primary-color)",
          },
          arrow: {
            color: "var(--primary-color)",
          },
        },
      },
    },
  });

  // Company Modal Logic
  const openCompanyModal = (company) => {
    console.log("Opening Company Modal with Company:", company);
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUp()); // Show company modal
  };

  //Counts Logics ...

  const regionCountsMap = Object.fromEntries(
    company?.regionCounts.map(item => [item.region, item.count])
  )

  const stateCountsMap = Object.fromEntries(
    company?.stateCounts.map(item => [item.state, item.count])
  )

  const countryCountsMap = Object.fromEntries(
    company?.countryCounts.map(item => [item.country, item.count] )
  )

  const categoryCountsMap = {};
  (company?.categoryCounts || []).forEach(item => {
    if (Array.isArray(item.categories)) {
      item.categories.forEach(cat => {
        categoryCountsMap[cat] = (categoryCountsMap[cat] || 0) + item.count;
      })
    }
  })

  const manufacturerCountsMap = {};
  (company?.manufacturerCounts || []).forEach(item => {
    if (Array.isArray(item.manufacturer)) {
      item.manufacturer.forEach(mfg => {
        manufacturerCountsMap[mfg] = (manufacturerCountsMap[mfg] || 0) + item.count;
      })
    }
  })

  const companyCategoriesCountMap = {};
  (company?.companyCategoryCounts || []).forEach(item => {
    if (Array.isArray(item.subcategory)) {
      item.subcategory.forEach(count => {
        companyCategoriesCountMap[count] = (companyCategoriesCountMap[count] || 0) + item.count;
      })
    }
  })

  const feedbackCompanies = company?.feedbackCount;
  const inventoryCompanies = company?.hasInventoryCount;
  const showFirstCount = company?.showFirstCount;
  const neverShowCount = company?.neverShowCount;

  console.log("FC & IC", feedbackCompanies, inventoryCompanies);
  


  return (
    <div className=" !w-[50rem] border-[1px] border-l-gray-500 2xl:h-[70vh] md:max-h-[102vh]  overflow-y-scroll  overflow-x-hidden relative ">
      <div
        className="flex justify-center gap-3 items-center text-[1vw] -mt-[1px] bg-black bg-opacity-50  !text-white p-5 rounded cursor-pointer relative "
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
                    {selectedFiltersCount} selected filters
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
            <ThemeProvider theme={theme}>
              <Tooltip title="Apply Selected Filters" arrow placement="top">
                <button
                  className="bg-[#2c83ec] text-white px-5 py-2 rounded-md font-semibold 
               hover:bg-[#1e6fd6] focus:ring-2 focus:ring-blue-300 
               transition duration-300 outline-none"
                  onClick={applyFilters}
                >
                  Apply
                </button>
              </Tooltip>
            </ThemeProvider>

            <ThemeProvider theme={theme}>
              <Tooltip title="Clear Active Filters" arrow placement="top">
                <button
                  className="bg-[#2c83ec] text-white px-5 py-2 rounded-md font-semibold 
                            hover:bg-[#1e6fd6] focus:ring-2 focus:ring-blue-300 
                            transition duration-300 outline-none"
                  onClick={clearFilters}
                >
                  Clear
                </button>
              </Tooltip>
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <Tooltip title="Hide Filters" arrow placement="top">
                <button
                  className="bg-[#2c83ec] text-white px-5 py-2 rounded-md font-semibold 
                   hover:bg-[#1e6fd6] focus:ring-2 focus:ring-blue-300 
                   transition duration-300 outline-none"
                  onClick={() => setShowFilters(false)}
                >
                  X
                </button>
              </Tooltip>
            </ThemeProvider>
          </div>
        )}

        {isDropdownOpen && (
          <div
            className="absolute bg-white shadow-lg rounded z-10 top-[5rem] left-56 !text-[#444] "
            ref={dropdownRef}
          >
            {filterDropdown.map((filter) => (
              <div
                key={filter.id}
                className="px-5 py-3 hover:bg-blue-500 hover:text-white cursor-pointer text-2xl"
              >
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowFilters(true); // Open filters if not open
                    setScrollToSection(filter.id); // Set target for scrolling and opening
                  }}
                >
                  {filter.label}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {showFilters ? (
        <FiltersComponent
          onFiltersChange={handleFiltersUpdate}
          setShowFilters={setShowFilters}
          initialFilters={filters}
          // setFilteredData={setFilteredData}
          scrollToSection={scrollToSection}
          regionCounts={regionCountsMap}
          countryCounts={countryCountsMap}
          stateCounts={stateCountsMap}
          categoryCounts={categoryCountsMap}
          manufacturerCounts={manufacturerCountsMap}
          companyCategoriesCount={companyCategoriesCountMap}
          feedbackCompaniesCount={feedbackCompanies}
          inventoryCompaniesCount={inventoryCompanies}
          showFirstCount={showFirstCount}
          neverShowCount={neverShowCount}
        />
      ) : (
        companiesToShow.map((comp, index) => (
          <div
            key={comp.id}
            className="bg-white px-8 rounded relative hover:bg-blue-200 transition w-[50rem] border border-b-[1px] "
          >
            <div className="flex gap-5 items-center ">
              <div
                className="flex flex-col  cursor-pointer"
                onClick={() => openCompanyModal(comp)}
              >
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
                        className="w-44 h-24 rounded-lg object-contain p-1 "
                      />
                    </div>
                  </Tooltip>
                </ThemeProvider>
                <div>
                  {/* ⭐ Display Star Ratings */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "auto",
                      width: "10rem",
                      marginTop: "-10px",
                    }}
                  >
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
                          style={{
                            cursor: "pointer",
                            marginRight: 2,
                            stroke: "black",
                            strokeWidth: "10",
                          }}
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
                    <div className="flex items-start  gap-3 ">
                      <img
                        src={locationIcon}
                        className="w-5 h-5"
                        alt="companyIcon"
                      />
                      <h3 className="font-semibold text-2xl">{comp.company}</h3>
                    </div>
                  </Tooltip>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                  <Tooltip title={`${comp.address}`} arrow placement="top">
                    <div className="flex items-start gap-3">
                      <img
                        src={buildingIcon}
                        className="w-5 h-5"
                        alt="companyAddressIcon"
                      />
                      <p className="!text-base capitalize">{comp.address}</p>
                    </div>
                  </Tooltip>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                  <Tooltip
                    title={`${comp.contactPerson}`}
                    arrow
                    placement="bottom"
                  >
                    <div className="flex items-start  gap-3">
                      <img src={userIcon} className="w-5 h-5" alt="userIcon" />
                      <p className="!text-base ">{comp.contactPerson}</p>
                    </div>
                  </Tooltip>
                </ThemeProvider>
              </div>
              {/* <FaEllipsisH className="absolute top-4 right-6 cursor-pointer text-[#2c83ec]" /> */}
            </div>

            <FaEllipsisH
              className="absolute top-10 right-10 cursor-pointer text-[#2c83ec]"
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
                  className="flex items-center gap-3 block w-full text-[#444] text-left px-4 py-4 hover:bg-gray-100"
                  onClick={() => {
                    handleEmail(comp.contactEmail, "Inquiry");
                  }}
                >
                  <span>
                    {" "}
                    <img
                      className="w-7 h-7 "
                      src={emailIcon}
                      alt="Email"
                    />{" "}
                  </span>{" "}
                  Email
                </button>
                <button
                  className="flex items-center gap-3 block w-full text-[#444] text-left px-4 py-4 hover:bg-gray-100"
                  onClick={() => handleAddVendor(comp.id)}
                >
                  <span>
                    {" "}
                    <img
                      className="w-7 h-7 "
                      src={addVendorIcon}
                      alt="Email"
                    />{" "}
                  </span>{" "}
                  Add Vendor
                </button>
                <button
                  className="flex items-center gap-3 block w-full text-[#444] text-left px-4 py-4 hover:bg-gray-100 "
                  onClick={() => openCompanyModal(comp)}
                >
                  <span>
                    {" "}
                    <img
                      className="w-7 h-7 "
                      src={profileIcon}
                      alt="Email"
                    />{" "}
                  </span>{" "}
                  View Profile
                </button>
                <button
                  className="flex items-center gap-3 block w-full text-[#444] text-left px-4 py-4 hover:bg-gray-100 "
                  onClick={() => handleVisitWebsite(comp.website)}
                >
                  <span>
                    {" "}
                    <img className="w-7 h-7 " src={webIcon} alt="Email" />{" "}
                  </span>{" "}
                  Visit Website
                </button>
                <button
                  className="flex items-center gap-3 block w-full text-[#444] text-left px-4 py-4  hover:bg-gray-100"
                  onClick={() => handleEmail(comp.contactEmail, "Suggestion")}
                >
                  <span>
                    {" "}
                    <img className="w-7 h-7" src={editIcon} alt="Email" />{" "}
                  </span>{" "}
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
      {togglePopUp && (
        <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />
      )}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default RightSidebar;

import { useEffect, useState, useRef } from "react";
import { FaEllipsisH, FaChevronDown} from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import FiltersComponent from "./FiltersComponent";
import axios from "axios";

const RightSidebar = ({ company }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState(null); // ✅ Store filtered data
  const dropdownRef = useRef(null);

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

  // const applyFilters = async () => {
  //   try {
  //     const queryParams = new URLSearchParams();
      
  //     Object.keys(filters).forEach((key) => {
  //       if (filters[key].length > 0) {
  //         queryParams.append(key, filters[key].join(",")); // ✅ Convert array to string
  //       }
  //     });

  //     const { data } = await axios.get(`http://localhost:5000/companies?${queryParams}`);
  //     setFilteredData(data); // ✅ Store filtered results
  //   } catch (error) {
  //     console.error("Error fetching filtered companies:", error);
  //   }
  // };

  const applyFilters = async () => {
    try {
        const queryParams = new URLSearchParams();
        
        filters.country.forEach(country => queryParams.append("country", country));
        filters.region.forEach(region => queryParams.append("region", region));
        filters.state.forEach(state => queryParams.append("state", state));


        const { data } = await axios.get(`http://localhost:5000/companies?${queryParams}`);
        setFilteredData(data);
        setShowFilters(false);
    } catch (error) {
        console.error("Error fetching filtered companies:", error);
    }
};

useEffect(() => {
  console.log("Company Prop Received:", company); // ✅ Debugging
}, [company]);

  // const companiesToShow = filteredData ? filteredData : company; // ✅ Use filtered data if available

  const companiesToShow = Array.isArray(filteredData) && filteredData.length > 0  
  ? filteredData 
  : company
    ? Array.isArray(company)
      ? company
      : [company] // ✅ Convert single object to array
    : [];



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
          : "1 results from " 
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

      // <div className="bg-blue-200 p-4 rounded relative">
      //   <div className="flex gap-4">
      //     <img src={company.logo} alt="Company Logo" className="w-16 h-16 rounded" />
      //     <div>
      //       <h3 className="font-bold">{company.company}</h3>
      //       <p className="text-sm">{company.address}</p>
      //       <p className="text-sm font-semibold">{company.contactPerson}</p>
      //     </div>
      //   </div>

      //   {/* 3 Dots Dropdown Icon */}
      //   <FaEllipsisH 
      //   className="absolute top-4 right-6 cursor-pointer text-[#2c83ec]" />
      // </div>

      (companiesToShow.map((comp) => (
        <div className="bg-blue-200 p-4 rounded relative" key={comp.id}>
          <div className="flex gap-4">
            <img src={comp.logo} alt="Company Logo" className="w-16 h-16 rounded" />
            <div>
              <h3 className="font-bold">{comp.company}</h3>
              <p className="text-sm">{comp.address}</p>
              <p className="text-sm font-semibold">{comp.contactPerson}</p>
            </div>
          </div>
    
          <FaEllipsisH className="absolute top-4 right-6 cursor-pointer text-[#2c83ec]" />
        </div>
      ))
      
      ))}
    </div>
  );
};

export default RightSidebar;

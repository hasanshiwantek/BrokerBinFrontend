import React, { useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  regionsList,
  countriesList,
  statesList,
  categoriesList,
  initialMFGs,
  telecom,
  mobileDevice,
  computers,
} from "@/data/services";

const FiltersComponent = ({
  onFiltersChange,
  scrollToSection,
  initialFilters,
  regionCounts,
  countryCounts,
  stateCounts,
  categoryCounts,
  manufacturerCounts,
  companyCategoriesCount,
  feedbackCompaniesCount,
  inventoryCompaniesCount,
  showFirstCount,
  neverShowCount,
}) => {
  const [filters, setFilters] = useState(
    initialFilters || {
      region: [],
      country: [],
      state: [],
      manufacturer: [],
      categories: [],
      inventories: [],
      myVendors: [],
      telecom: [],
      computers: [],
      other: [],
      mobile: [],
      // show: [],
      hasInventory: "No",
      feedbackRating: false,
      sortOrder: "asc",
      sortBy: "company",
      show: "",
    }
  );

  // const handleFilterChange = (e) => {
  //   const { name, value, checked } = e.target;
  //   setFilters((prev) => ({
  //     ...prev,
  //     [name]: checked
  //       ? [...(prev[name] || []), value] // ✅ Add value if checked
  //       : prev[name].filter((item) => item !== value), // ❌ Remove if unchecked
  //   }));
  // };

  const handleFilterChange = (e) => {
  const { name, value, checked } = e.target;
  if (name === "show") {
    setFilters((prev) => ({
      ...prev,
      show: checked ? value : "", // ✅ set or clear string
    }));
  } else {
    setFilters((prev) => ({
      ...prev,
      [name]: checked
        ? [...(prev[name] || []), value]
        : prev[name].filter((item) => item !== value),
    }));
  }
};


  useEffect(() => {
    onFiltersChange(filters);
  }, [filters]);

  const selectedCountries = ["USA", "CAN"];

  const combineStates = selectedCountries.flatMap((country) => ({
    country,
    states: statesList[country] || [],
  }));
  console.log("......", combineStates);

  console.log("Company Categ Counts: ", companyCategoriesCount);


  const [openAccordion, setOpenAccordion] = useState([]); // 🟢 Stores expanded sections

  // 🟢 Create refs for scrolling
  const regionRef = useRef(null);
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const categoriesRef = useRef(null);
  const manufacturerRef = useRef(null);
  const vendorRef = useRef(null);
  const productsRef = useRef(null);
  const ratingRef = useRef(null);
  const inventoryRef = useRef(null)

  // 🟢 Function to scroll to a specific section
  const scrollToFilter = (id) => {
    const refs = {
      region: regionRef,
      country: countryRef,
      state: stateRef,
      categories: categoriesRef,
      manufacturer: manufacturerRef,
      myVendors: vendorRef,
      products: productsRef,
      rating: ratingRef,
      hasInventory: inventoryRef,
    };

    if (refs[id]?.current) {
      refs[id].current.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpenAccordion((prev) => [...new Set([...prev, id])]); // ✅ Expand section
    }
  };

  useEffect(() => {
    if (scrollToSection) {
      scrollToFilter(scrollToSection); // Scroll when requested
    }
  }, [scrollToSection]);

  const [showMfgs, setShowMfgs] = useState("");

  const handleMfgChange = (e) => {
    const { value, name } = e.target;
    setShowMfgs(value);
    console.log("Search Mfgs:", value);
  };

  const filteredMfgs = showMfgs
    ? initialMFGs.filter((mfg) =>
      mfg.toLowerCase().includes(showMfgs.toLowerCase())
    )
    : initialMFGs.slice(0, 20);

  const other = [{ id: "scrap", label: "Scrap", value: "Scrap" }];

  const handleSortChange = (sortType) => {
  setFilters((prev) => ({
    ...prev,
    sortBy: sortType,
  }));
};

const handleSortOrderChange = (order) => {
  setFilters((prev) => ({
    ...prev,
    sortOrder: order,
  }));
};


  return (
    <div className="bg-white shadow-lg p-4 rounded">
      <Accordion
        type="multiple"
        className="mt-4"
        value={openAccordion}
        onValueChange={setOpenAccordion}
      >
        <AccordionItem value="sort">
          <AccordionTrigger className="text-black text-2xl font-semibold">
            Sort
          </AccordionTrigger>
          <AccordionContent>
            <h3 className="mt-5">Sort By:</h3>
            <div className="mt-2 grid grid-cols-2 gap-5">
              <button
                style={{ border: "1px solid black" }}
                onClick={() => handleSortChange("relevance")}
                className={`${filters.sortBy === "relevance" ? 'bg-[#2c83ec] text-white !border !border-transparent' : 'bg-white text-[#444]'} 
                  hover:shadow-md py-2 transition-all duration-300 ease-in-out`}
              >
                Relevance
              </button>

              <button
                style={{ border: "1px solid black" }}
                onClick={() => handleSortChange("companyName")}
                className={` ${filters.sortBy === "companyName" ? 'bg-[#2c83ec] text-white !border !border-transparent' : 'bg-white text-[#444]'} 
                  hover:shadow-md transition-all py-2 duration-300 ease-in-out`}
              >
                Company Name
              </button>
              <button
                style={{ border: "1px solid black" }}
                 onClick={() => handleSortChange("member_since")}
                className={` ${filters.sortBy === "member_since" ? 'bg-[#2c83ec] text-white !border !border-transparent' : 'bg-white text-[#444]'} 
                  hover:shadow-md py-2 transition-all duration-300 ease-in-out`}
              >
                Age of Membership
              </button>
              <button
                style={{ border: "1px solid black" }}
                onClick={() => handleSortChange("rating")}
                className={` ${filters.sortBy === "rating" ? 'bg-[#2c83ec] text-white !border !border-transparent' : 'bg-white text-[#444]'} 
                  hover:shadow-md py-2 transition-all duration-300 ease-in-out`}
              >
                Feedback Rating
              </button>

              <button
                style={{ border: "1px solid black" }}
                 onClick={() => handleSortChange("hasInventory")}
                className={` ${filters.sortBy === "hasInventory" ? 'bg-[#2c83ec] text-white !border !border-transparent' : 'bg-white text-[#444]'} 
                  hover:shadow-md py-2 transition-all duration-300 ease-in-out`}
              >
                Parts Listed
              </button>
            </div>

            <h3 className="mt-10">Order By:</h3>
            <div className="mt-2 grid grid-cols-2 gap-5">
              <button
                style={{ border: "1px solid black" }}
                onClick={() => handleSortOrderChange("asc")}
                className={` ${filters.sortOrder === "asc" ? 'bg-[#2c83ec] text-white !border !border-transparent' : 'bg-white text-[#444]'} 
                  hover:shadow-md py-2 transition-all duration-300 ease-in-out`}
              >
                Ascending
              </button>

              <button
                style={{ border: "1px solid black" }}
               onClick={() => handleSortOrderChange("desc")}
                className={` ${filters.sortOrder === "desc" ? 'bg-[#2c83ec] text-white !border !border-transparent' : 'bg-white text-[#444]'} 
                  hover:shadow-md py-2 transition-all duration-300 ease-in-out`}
              >
                Descending
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="region" id="region" ref={regionRef}>
          <AccordionTrigger className="text-black  text-2xl font-semibold">
            Region
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-5">
              {regionsList.map((regionOption) => (
                <label
                  key={regionOption.label}
                  className="flex items-center !text-base"
                >
                  <input
                    type="checkbox"
                    name="region"
                    value={regionOption.value} // ✅ Use dynamic value
                    checked={
                      filters.region?.includes(regionOption.value) || false
                    } // ✅ Check correctly
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  {regionOption.label} ({regionCounts?.[regionOption.label] || 0})
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="country" id="country" ref={countryRef}>
          <AccordionTrigger className="text-black  text-2xl font-semibold">
            Country
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-5">
              {countriesList.map((country) => (
                <label
                  key={country.label}
                  className="flex items-center !text-base"
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    name="country"
                    value={country.value}
                    onChange={handleFilterChange}
                    checked={filters.country?.includes(country.value) || false}
                  />
                  {country.label} ({countryCounts?.[country.value] || 0})
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="state" id="state" ref={stateRef}>
          <AccordionTrigger className="text-black  text-2xl font-semibold">
            State
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-5">
              {combineStates?.map(({ country, states }) => (
                <div key={country}>
                  <h3 className="font-semibold text-lg mb-2">{country}</h3>{" "}
                  {/* ✅ Country Heading */}
                  <div className="grid grid-cols-2 gap-5">
                    {states?.map((stateOptions) => (
                      <label
                        key={stateOptions.value}
                        className="flex items-center !text-base"
                      >
                        <input
                          type="checkbox"
                          name="state"
                          value={stateOptions.value} // ✅ Use dynamic value
                          checked={
                            filters.state?.includes(stateOptions.value) || false
                          }
                          onChange={handleFilterChange}
                          className="mr-2"
                        />
                        {stateOptions.label} ({stateCounts?.[stateOptions.value] || 0})
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="manufacturer"
          id="manufacturer"
          ref={manufacturerRef}
        >
          <AccordionTrigger className="text-black  text-2xl font-semibold">
            Manufacturer
          </AccordionTrigger>
          <AccordionContent>
            <div className="my-3 p-4">
              <input
                type="search"
                placeholder="Search for manufacturers"
                className="flex justify-center items-center w-full p-3 rounded bg-white text-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 border focus:outline-none"
                onChange={handleMfgChange}
                value={showMfgs}
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              {filteredMfgs.map((mfg) => (
                <label key={mfg} className="flex items-center !text-base">
                  <input
                    type="checkbox"
                    className="mr-2"
                    name="manufacturer"
                    value={mfg}
                    onChange={handleFilterChange}
                    checked={filters.manufacturer?.includes(mfg) || false}
                  />
                  {mfg} ({manufacturerCounts?.[mfg] || 0})
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="myVendors" id="myVendors" ref={vendorRef}>
          <AccordionTrigger className="text-black text-2xl font-semibold">
            My Vendors
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4">
              <h3 className="text-2xl mb-4">Show:</h3>

              <div className="grid grid-cols-2 gap-5">
                <label
                  htmlFor="first"
                  className="flex items-center text-base gap-2"
                >
                  <input
                    type="checkbox"
                    name="show"
                    value="first"
                    id="first"
                    onChange={handleFilterChange}
                    checked={filters.show === "first"}
                    className="w-5 h-5"
                  />
                  First ({showFirstCount})
                </label>

                <label
                  htmlFor="never"
                  className="flex items-center text-base gap-2"
                >
                  <input
                    type="checkbox"
                    name="show"
                    value="never"
                    id="never"
                    onChange={handleFilterChange}
                    checked={filters.show === "never"}
                    className="w-5 h-5"
                  />
                  Never ({neverShowCount})
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="products" id="products" ref={productsRef}>
          <AccordionTrigger className="text-black  text-2xl font-semibold">
            Products
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-5">
              <div className="grid grid-cols-2 gap-5 mb-4">
                <h3 className="text-2xl mb-2 font-[500]">Computers:</h3>
                {computers.map((computer) => (
                  <label
                    key={computer.label}
                    className="flex items-center !text-base"
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      name="computers"
                      value={computer.value}
                      onChange={handleFilterChange}
                      checked={
                        filters.computers?.includes(computer.value) || false
                      }
                    />
                    {computer.label} ({companyCategoriesCount?.[computer.label] || 0})
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-5 mb-4">
                <h3 className="text-2xl mb-2 font-[500]">Telecom:</h3>
                {telecom.map((telecom) => (
                  <label
                    key={telecom.label}
                    className="flex items-center !text-base"
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      name="telecom"
                      value={telecom.value}
                      onChange={handleFilterChange}
                      checked={
                        filters.telecom?.includes(telecom.value) || false
                      }
                    />
                    {telecom.label} ({companyCategoriesCount?.[telecom.label] || 0})
                  </label>
                ))}
              </div>

              <div className="grid  gap-5 mb-4">
                <h3 className="text-2xl mb-2 font-[500]">Other:</h3>
                {other.map((other) => (
                  <label
                    key={other.label}
                    className="flex items-center !text-base"
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      name="other"
                      value={other.value}
                      onChange={handleFilterChange}
                      checked={filters.other?.includes(other.value) || false}
                    />
                    {other.label} ({companyCategoriesCount?.[other.label] || 0})
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-5 mb-4">
                <h3 className="text-2xl mb-2 font-[500]">Mobile Devices:</h3>
                {mobileDevice.map((mobile) => (
                  <label
                    key={mobile.label}
                    className="flex items-center !text-base"
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      name="mobile"
                      value={mobile.value}
                      onChange={handleFilterChange}
                      checked={filters.mobile?.includes(mobile.value) || false}
                    />
                    {mobile.label} ({companyCategoriesCount?.[mobile.label] || 0})
                  </label>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="categories" id="categories" ref={categoriesRef}>
          <AccordionTrigger className="text-black  text-2xl font-semibold">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-5">
              {categoriesList.map((categories) => (
                <label
                  key={categories.label}
                  className="flex items-center !text-base"
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    name="categories"
                    value={categories.value}
                    onChange={handleFilterChange}
                    checked={
                      filters.categories?.includes(categories.value) || false
                    }
                  />
                  {categories.label} ({categoryCounts?.[categories.label] || 0})
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating" id="rating" ref={ratingRef}>
          <AccordionTrigger className="text-black text-2xl font-semibold">
            Feedback Rating
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center justify-center">
              <button
                style={{ border: "1px solid black" }}
                onClick={() => setFilters((prev) => ({
                  ...prev,
                  feedbackRating: !prev.feedbackRating,
                }))}
                className={`px-[5vw] mt-2 py-2 rounded-md text-xl border 
                  ${filters.feedbackRating ? 'bg-[#2c83ec] text-white !border !border-transparent' : 'bg-white text-[#444]'} 
                  hover:shadow-md transition-all duration-300 ease-in-out`}
              >
                ({feedbackCompaniesCount}) Companies
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="hasInventory" id="hasInventory" ref={inventoryRef}>
          <AccordionTrigger className="text-black text-2xl font-semibold">
            Listing Inventory
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center justify-center">
              <button
                style={{ border: "1px solid black" }}
                onClick={() => setFilters((prev) => ({
                  ...prev,
                  hasInventory: prev.hasInventory === "Yes" ? "No" : "Yes",
                }))}
                className={`px-[5vw] mt-2 py-2 rounded-md text-xl border 
                  ${filters.hasInventory === "Yes" ? 'bg-[#2c83ec] text-white !border !border-transparent' : 'bg-white text-[#444]'} 
                  hover:shadow-md transition-all duration-300 ease-in-out`}
              >
                Show Only Companies With Inventory ({inventoryCompaniesCount})
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
};

export default FiltersComponent;

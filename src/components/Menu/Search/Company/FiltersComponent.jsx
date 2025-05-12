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
  scrap,
  computers,
} from "@/data/services";

const FiltersComponent = ({
  onFiltersChange,
  scrollToSection,
  initialFilters,
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
      scrap: [],
      mobile: [],

    }
  );

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: checked
        ? [...(prev[name] || []), value] // ✅ Add value if checked
        : prev[name].filter((item) => item !== value), // ❌ Remove if unchecked
    }));
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

  const [openAccordion, setOpenAccordion] = useState([]); // 🟢 Stores expanded sections

  // 🟢 Create refs for scrolling
  const regionRef = useRef(null);
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const categoriesRef = useRef(null);
  const manufacturerRef = useRef(null);
  const vendorRef = useRef(null);
  const productsRef=useRef(null)

  // 🟢 Function to scroll to a specific section
  const scrollToFilter = (id) => {
    const refs = {
      region: regionRef,
      country: countryRef,
      state: stateRef,
      categories: categoriesRef,
      manufacturer: manufacturerRef,
      myVendors: vendorRef,
      products:productsRef,
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
            <div className="grid grid-cols-2 gap-5">
              <button
                style={{ border: "1px solid black" }}
                className="bg-white px-2 py-2 rounded-md text-[#444] text-xl 
             border-black hover:bg-[#f0f0f0]  hover:shadow-md
             focus:outline-none
             transition-all duration-300 ease-in-out"
              >
                Relevance
              </button>

              <button
                style={{ border: "1px solid black" }}
                className="bg-white px-2 py-2 rounded-md text-[#444] text-xl 
             border-black hover:bg-[#f0f0f0]  hover:shadow-md
             focus:outline-none
             transition-all duration-300 ease-in-out"
              >
                Company Name
              </button>
              <button
                style={{ border: "1px solid black" }}
                className="bg-white px-2 py-2 rounded-md text-[#444] text-xl 
             border-black hover:bg-[#f0f0f0]  hover:shadow-md
             focus:outline-none
             transition-all duration-300 ease-in-out"
              >
                Age of Membership
              </button>
              <button
                style={{ border: "1px solid black" }}
                className="bg-white px-2 py-2 rounded-md text-[#444] text-xl 
             border-black hover:bg-[#f0f0f0]  hover:shadow-md
             focus:outline-none
             transition-all duration-300 ease-in-out"
              >
                Feedback Rating
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
                  {regionOption.label} {/* ✅ Render label correctly */}
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
                  {country.label}
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
                        {stateOptions.label}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
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
                  {categories.label}
                </label>
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
                  {mfg}
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
                    name="myVendors"
                    value="First"
                    id="first"
                    onChange={handleFilterChange}
                    checked={filters.myVendors?.includes("First") || false}
                    className="w-5 h-5"
                  />
                  First
                </label>

                <label
                  htmlFor="never"
                  className="flex items-center text-base gap-2"
                >
                  <input
                    type="checkbox"
                    name="myVendors"
                    value="Never"
                    id="never"
                    onChange={handleFilterChange}
                    checked={filters.myVendors?.includes("Never") || false}
                    className="w-5 h-5"
                  />
                  Never
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
              <div  className="grid grid-cols-2 gap-5 mb-4">
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
                    {computer.label}
                  </label>
                ))}
              </div>

              <div  className="grid grid-cols-2 gap-5 mb-4">
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
                    {telecom.label}
                  </label>
                ))}
              </div>

              <div  className="grid  gap-5 mb-4">
                <h3 className="text-2xl mb-2 font-[500]">Other:</h3>
                {scrap.map((scrap) => (
                  <label
                    key={scrap.label}
                    className="flex items-center !text-base"
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      name="scrap"
                      value={scrap.value}
                      onChange={handleFilterChange}
                      checked={filters.scrap?.includes(scrap.value) || false}
                    />
                    {scrap.label}
                  </label>
                ))}
              </div>

              <div  className="grid grid-cols-2 gap-5 mb-4">
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
                    {mobile.label}
                  </label>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="hasInventory" id="hasInventory" ref={countryRef}>
          <AccordionTrigger className="text-black  text-2xl font-semibold">
            Listing Inventory
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
                  {country.label}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* <AccordionItem value="Manufacturer">
          <AccordionTrigger className="text-black">Manufacturer</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {["USA", "Canada", "UK", "Australia"].map((country) => (
                <label key={country} className="flex items-center">
                  <input 
                  type="checkbox" 
                  className="mr-2"
                  value={manufacturer}
                  name="manufacturer"
                  onChange={handleFilterChange}
                  checked={filters.manufacturer?.includes(manufacturer) || false}
                  />
                  {country}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>
    </div>
  );
};

export default FiltersComponent;

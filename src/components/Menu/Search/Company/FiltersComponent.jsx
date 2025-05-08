import React, { useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { regionsList, countriesList, statesList, categoriesList } from "@/data/services";

const FiltersComponent = ({ onFiltersChange, scrollToSection, initialFilters }) => {
  const [filters, setFilters] = useState(initialFilters || {
    region: [],
    country: [],
    state: [],
    manufacturer: [],
    categories: [],
    inventories: [],
  });

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

  // 🟢 Function to scroll to a specific section
  const scrollToFilter = (id) => {
    const refs = {
      region: regionRef,
      country: countryRef,
      state: stateRef,
      categories: categoriesRef,
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

  return (
    <div className="bg-white shadow-lg p-4 rounded">
      <Accordion type="multiple" className="mt-4" value={openAccordion} onValueChange={setOpenAccordion}>
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
          <AccordionContent >
            <div className="grid grid-cols-2 gap-5" >
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

        <AccordionItem value="country" id="country" ref={countryRef} >
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

        <AccordionItem value="categories" id="categories" ref={categoriesRef} >
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
                    checked={filters.categories?.includes(categories.value) || false}
                  />
                  {categories.label}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="manufacturer" id="manufacturer" ref={countryRef} >
          <AccordionTrigger className="text-black  text-2xl font-semibold">
            Manufacturer
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

        
        <AccordionItem value="myVendors" id="myVendors" ref={countryRef} >
          <AccordionTrigger className="text-black  text-2xl font-semibold">
            My Vendors
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

        <AccordionItem value="products" id="Products" ref={countryRef} >
          <AccordionTrigger className="text-black  text-2xl font-semibold">
            Products
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

        <AccordionItem value="hasInventory" id="hasInventory" ref={countryRef} >
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

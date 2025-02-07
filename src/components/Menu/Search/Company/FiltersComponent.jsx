import React, { useState, useEffect } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const FiltersComponent = ({ onFiltersChange, setFilteredData }) => {

  const [filters, setFilters] = useState({
    region: [],
    country: [],
    state: [],
    manufacturer: [],
  })
  
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
  
  const regions = ["Noth America", "Asia"]
  const state = ["Texas", "California", "Sindh"]
  
  return (
    <div className="bg-white shadow-lg p-4 rounded">


      <Accordion type="multiple" className="mt-4">
        
        <AccordionItem value="sort">
          <AccordionTrigger className="text-black">Sort</AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-2 flex-wrap">
              <button className="bg-gray-200 p-2 rounded">Relevance</button>
              <button className="bg-gray-200 p-2 rounded">Company Name</button>
              <button className="bg-gray-200 p-2 rounded">Age of Membership</button>
              <button className="bg-gray-200 p-2 rounded">Feedback Rating</button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="region">
          <AccordionTrigger className="text-black">Region</AccordionTrigger>
          <AccordionContent>
            {regions.map((regionOption) => (
              <label key={regionOption} className="flex items-center">
                <input 
                  type="checkbox" 
                  name="region"
                  value={regionOption}  // ✅ Use dynamic value
                  checked={filters.region?.includes(regionOption) || false}
                  onChange={handleFilterChange} 
                  className="mr-2"
                />
                {regionOption}
              </label>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="country">
          <AccordionTrigger className="text-black">Country</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {["USA", "Pakistan", "Canada",].map((country) => (
                <label key={country} className="flex items-center">
                  <input 
                  type="checkbox" 
                  className="mr-2"
                  name="country"
                  value={country}
                  onChange={handleFilterChange}
                  checked={filters.country?.includes(country) || false}
                  />
                  {country}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="state">
          <AccordionTrigger className="text-black">State</AccordionTrigger>
          <AccordionContent>
            {state.map((stateOptions) => (
              <label key={stateOptions} className="flex items-center">
                <input 
                  type="checkbox" 
                  name="state"
                  value={stateOptions}  // ✅ Use dynamic value
                  checked={filters.state?.includes(stateOptions) || false}
                  onChange={handleFilterChange} 
                  className="mr-2"
                />
                {stateOptions}
              </label>
            ))}
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

import React, { useState } from "react";
import Companies from "./Companies";
import Region from "./Region";
import css from "../Send.module.css";

const ToggleFilters = () => {
  const [filters, setFilters] = useState({
    companies: false,
    region: false,
  });

  const handleToggle = (category) => {
    setFilters(() => {
      const updatedfilters = { ...filters };

      Object.keys(updatedfilters).forEach((key) => {
        updatedfilters[key] = key == category ? !updatedfilters[key] : false;
      });
      return updatedfilters;
    });
  };
  return (
    <div>
      <div className={css.toggleCategories_btn}>
        <button type="button" onClick={() => handleToggle("companies")}>
          Companies
        </button>
        <button type="button" onClick={() => handleToggle("region")}>
          Region
        </button>
      </div>
      {filters.companies && <Companies />}
      {filters.region && <Region />}
    </div>
  );
};

export default ToggleFilters;

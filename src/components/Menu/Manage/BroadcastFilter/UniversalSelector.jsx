import React from "react";
import css from "../../../../styles/Menu/Manage/BroadcastFilters/BroadcastFilters.module.css";

const UniversalSelector = ({
  title,
  items,
  selectedItems = [],
  handleCheckboxChange,
  selectType,
  showCheckAll,
  dropdownOptions,
  selectedDropdownValue,
  handleDropdownChange,
  name,
  toggleAllCheckboxes,
  disabled,
}) => {
  return (
    <div>
      <h3>{title}</h3>
      {selectType === "checkbox" && (
        <ul>
          {items.map((item) => (
            <li key={item.value || item}>
              <span>
                <label htmlFor={item.value || item}>{item.label || item}</label>
                <input
                  type="checkbox"
                  name={name}
                  value={item.value || item}
                  checked={selectedItems.includes(item.value || item)} // Ensure selectedItems matches item.value
                  onChange={() =>
                    handleCheckboxChange(name, item.value || item)
                  } // Use item.value or item consistently
                  id={item.value || item}
                  disabled={disabled}
                />
              </span>
            </li>
          ))}
        </ul>
      )}

      {selectType === "dropdown" && (
        <select
          name="dropdown"
          id="dropdown"
          value={selectedDropdownValue || ""}
          onChange={(e) => handleDropdownChange(e.target.value)}
          disabled={disabled}
          className=" border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white hover:cursor-pointer transition duration-150 ease-in-out"
        >
          {dropdownOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {showCheckAll && (
        <div className={css.checkBtn}>
          <button
            type="button"
            onClick={() => toggleAllCheckboxes(name, items, true)}
          >
            Check All
          </button>
          <button
            type="button"
            onClick={() => toggleAllCheckboxes(name, items, false)}
          >
            Uncheck All
          </button>
        </div>
      )}
    </div>
  );
};

export default UniversalSelector;

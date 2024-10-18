// import React, { useEffect } from 'react';
// import css from "../../../../styles/Menu/Manage/BroadcastFilters/BroadcastFilters.module.css";

// const UniversalSelector = ({
//   title,
//   items,
//   selectedItems = [],
//   handleCheckboxChange,
//   selectType,
//   showCheckAll,
//   dropdownOptions,
//   selectedDropdownValue,
//   handleDropdownChange,
//   name,
//   toggleAllCheckboxes,
// }) => {

//   return (
//     <div>
//       <h3>{title}</h3>
//       {selectType === 'checkbox' && (
//         <ul>
//         {items.map((item) => (
//           <li key={item.value || item}>  
//             <span>
//               <label htmlFor={item.id || item}>{item.label || item}</label> 
//               <input
//                 type="checkbox"
//                 name={name}
//                 value={item.value || item}
//                 checked={selectedItems.includes(item.value || item)}
//                 onChange={() => handleCheckboxChange(name, item.value || item)} 
//                 id={item.id || item}
//               />
//             </span>
//           </li>
//         ))}
//       </ul>
//       )}

//       {selectType === 'dropdown' && (
//         <select
//           name="dropdown"
//           id="dropdown"
//           value={selectedDropdownValue || ''}
//           onChange={(e) => handleDropdownChange(e.target.value)}
//         >
//           {dropdownOptions.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//       )}

      
//         {showCheckAll && ( // Only show buttons if showCheckAll is true
//   <div className={css.checkBtn}>
//     <button type="button" onClick={() => toggleAllCheckboxes(name,items, true)}>Check All</button>
//     <button type="button" onClick={() => toggleAllCheckboxes(name,items, false)}>Uncheck All</button>
//   </div>
// )}
//     </div>

    
//   );
// };

// export default UniversalSelector;





import React from 'react';
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
}) => {
  return (
    <div>
      <h3>{title}</h3>
      {selectType === 'checkbox' && (
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
                  onChange={() => handleCheckboxChange(name, item.value || item)} // Use item.value or item consistently
                  id={item.value || item}
                />
              </span>
            </li>
          ))}
        </ul>
      )}

      {selectType === 'dropdown' && (
        <select
          name="dropdown"
          id="dropdown"
          value={selectedDropdownValue || ''}
          onChange={(e) => handleDropdownChange(e.target.value)}
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
          <button type="button" onClick={() => toggleAllCheckboxes(name, items, true)}>Check All</button>
          <button type="button" onClick={() => toggleAllCheckboxes(name, items, false)}>Uncheck All</button>
        </div>
      )}
    </div>
  );
};

export default UniversalSelector;

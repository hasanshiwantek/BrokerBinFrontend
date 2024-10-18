// import { useEffect } from "react";
// import React from 'react';
// import css from "../../../../styles/Menu/Manage/BroadcastFilters/BroadcastFilters.module.css";
// const CheckboxList = ({ items, selectedItems, handleCheckboxChange, title, name, toggleAllCheckboxes }) => {

//   useEffect(() => {
//     console.log('CheckboxList re-rendered with selectedItems:', selectedItems);
//   }, [selectedItems]);
//   return (
//     <div>
//       <h3>{title}</h3>
//       <ul>
//         {items.map((item) => (
//           <li key={item.value || item}>
//             <span>
//               <label htmlFor={item.id || item}>{item.label || item}</label>
//               <input
//                 type="checkbox"
//                 name={name}
//                 value={item.value || item}
//                 checked={selectedItems.includes(item)} 
//                 onChange={() => handleCheckboxChange(name, item)}
//                 id={item.id || item}
//               />
//             </span>
//           </li>
//         ))}
//       </ul>
//       <div className={css.checkBtn}>
//         <button type="button" onClick={() => toggleAllCheckboxes(name, items, true)}>Check All</button>
//         <button type="button" onClick={() => toggleAllCheckboxes(name, items, false)}>Uncheck All</button>
//       </div>
//     </div>



//   );
// };

// export default CheckboxList;











import React, { useEffect } from "react";
import css from "../../../../styles/Menu/Manage/BroadcastFilters/BroadcastFilters.module.css";

const CheckboxList = ({ items, selectedItems, handleCheckboxChange, title, name, toggleAllCheckboxes }) => {
    useEffect(() => {
        console.log('CheckboxList re-rendered with selectedItems:', selectedItems);
    }, [selectedItems]);

    return (
        <div>
            <h3>{title}</h3>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <span>
                            <label htmlFor={item.id}>{item.label}</label>
                            <input
                                type="checkbox"
                                name={name}
                                value={item.value}
                                checked={selectedItems.includes(item.value)} // Ensure selectedItems matches item value
                                onChange={() => handleCheckboxChange(name, item.value)} // Pass the correct item value
                                id={item.id}
                            />
                        </span>
                    </li>
                ))}
            </ul>
            <div className={css.checkBtn}>
                <button type="button" onClick={() => toggleAllCheckboxes(name, items, true)}>Check All</button>
                <button type="button" onClick={() => toggleAllCheckboxes(name, items, false)}>Uncheck All</button>
            </div>
        </div>
    );
};

export default CheckboxList;
// import { useState, useEffect, useRef } from "react";
// import css from "../../styles/Menu/Manage/MyRFQNew.module.css";
// import { MdRemoveCircle } from "react-icons/md";


// const AddParts = ({ part, onUpdate, onRemove, onSearch, searchResults, handlePartModelSearch, isNew, searchResponseMatched, selectedProducts ,onValidityChange}) => {
//     const [showDropdown, setShowDropdown] = useState(false)
//     // const [mfgOptions, setMfgOptions] = useState([]);  // Store MFG options
//     const [conditionOptions, setConditionOptions] = useState([]);  // Store Condition options

//     const dropdownRef = useRef(null);
  
//     useEffect(() => {
//       const handleClickOutside = (event) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//           setShowDropdown(false); // 
//         }
//       };
//       document.addEventListener('mousedown', handleClickOutside);
  
//       return () => {
//         document.removeEventListener('mousedown', handleClickOutside);
//       };
//     }, []);

 
//     const conditions = selectedProducts?.map((item) => item.cond);
//     console.log("Conditions in AddParts:", conditions);

//     console.log("Initial mfgs",part.mfgs)

//     useEffect(() => {
//       if (isNew && !part.mfgOptions?.length && !part.conditionOptions?.length) {
//         if (part.mfg) {
//           setMfgOptions([part.mfg]);  // Set MFG based on RFQ data
//         }
//         if (part.cond) {
//           setConditionOptions([part.cond]);  // Set Cond based on RFQ data
//         }
//       }
//     }, [part.mfg, part.cond, isNew]);

//     console.log("conditionOptions ",conditionOptions);

//     console.log("partconditions ",part.conditionOptions)
    

//       // Update form validation state
//       useEffect(() => {
//         // Check if required fields are filled
//         const isValid = part.mfg && part.cond && part.quantity;
//         onValidityChange(part.id, isValid);  // Notify parent about the validity
//       }, [part.mfg, part.cond, part.quantity, onValidityChange, part.id]);
    
    

//     const handleRemove = (event) => {
//       event.stopPropagation(); 
//       onRemove(part.id);
//     };

//     const handleInputBlur = () => {
//       setTimeout(() => {
//         if (!part.partModel || part.partModel.trim() === "") {
//           setShowDropdown(false);
//         }
//       }, 200);
//     };

//     useEffect(() => {
//       console.log("MFG Options:", part.mfgOptions);
//       console.log("Condition Options:", part.conditionOptions);
//     }, [part.mfgOptions, part.conditionOptions]);


//     const handleInputChange = (field, value) => {
//       console.log("Field Updated:", field, "Value:", value); // Debugging log
//       onUpdate(part.partModel, field, value); // Pass partModel instead of part.id
    
//       if (field === "mfg") {
//         const selectedMfg = part.mfgCondQuantities?.find((item) => item.mfg === value.split(" (")[0]);
//         onUpdate(part.partModel, "conditionOptions", selectedMfg?.cond || []); // Update condition options
//       }
    
//       if (field === "partModel") {
//         if (value.trim() !== "") {
//           onSearch(value); // Trigger search
//           setShowDropdown(true);
//         } else {
//           onUpdate(part.partModel, "mfgOptions", []); // Clear MFG options
//           onUpdate(part.partModel, "conditionOptions", []); // Clear Condition options
//         }
//       }
//     };
    
   
//     const handleSuggestionSelect = (selectedItem) => {
//       const updates = {
//         partModel: selectedItem.partModel,
//         mfgOptions: selectedItem.mfg || [],
//         mfgCondQuantities: selectedItem.mfg_cond_quantities || [],
//       };
    
//       if (selectedItem.mfg_cond_quantities?.length) {
//         const defaultMfg = selectedItem.mfg_cond_quantities[0];
//         updates.mfg = `${defaultMfg.mfg} (${defaultMfg.total_quantity})`;
//         updates.conditionOptions = defaultMfg.cond || [];
//       }
    
//       // Bulk update single call
//       onUpdate(part.partModel, "bulkUpdate", updates);
    
//       // Close dropdown
//       setShowDropdown(false);
//     };
    
    
//     return (
//       <div className={css.rfqBody_Main_left_addParts_Addfields}>
//         <button type="button" onClick={handleRemove} className={css.removeBtn}  >
//           <MdRemoveCircle />
//         </button>
//         <div>
  
//           <div style={{ position: "relative" }}
//             ref={dropdownRef} >
  
//             <input
//               type="text"
//               value={part.partModel || ""}
//               onChange={(e) => {
//                 console.log("Input value:", e.target.value); // Debug input value
//                 handleInputChange("partModel", e.target.value);
//               }}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") e.preventDefault();
//               }}
//               onFocus={() => {
//                 if (part.partModel.trim() !== "") {
//                   setShowDropdown(true); // Show dropdown if there's a non-empty value
//                 }
//               }}
//               onBlur={handleInputBlur} // Updated blur handler
//             />
  
//             {showDropdown && searchResponseMatched?.length > 0 && (
//               <ul
//                 className={css.searchResponseSec}
//                 style={{
//                   position: "absolute",
//                   top: "100%",
//                   // left: 0,
//                   zIndex: 1000,
//                   background: "#fff",
//                   border: "1px solid #ccc",
//                   listStyle: "none",
//                   padding: "3px",
//                   width: "120px",
//                   overflowY: "scroll",
//                   maxHeight: "20vh"
//                 }}
//               >
//                 {searchResponseMatched.map((item) => (
//                   <li
//                     key={item.id}
//                     onClick={() => handleSuggestionSelect(item)} // Pass full item
//                     style={{
//                       padding: "4px",
//                       cursor: "pointer",
//                       borderBottom: "1px solid #eee",
//                     }}
//                   >
//                     {item.partModel}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
          
//           <input
//             type="text"
//             value={part.heciClei}
//             onChange={(e) => handleInputChange("heciClei", e.target.value)}
//           />

//           <select
//             value={part.mfg || ""}
//             onChange={(e) => handleInputChange("mfg", e.target.value)}
//             required
//           >
//             <option value="">Select Mfg</option>
//             {(part.mfgs?.length ? part.mfgs : part.mfgOptions)?.map((Mfg, index) => (
//               <option key={index} value={Mfg}>
//                 {Mfg}
//               </option>
//             ))}
//           </select>

//           <select
//             value={part.cond || ""}
//             onChange={(e) => handleInputChange("cond", e.target.value)}
//             required
           
//           >
//             <option value="">Select Cond</option>
//             {(part.conds?.length ? part.conds : part.conditionOptions)?.map((Cond, index) => (
//               <option key={index} value={Cond}>
//                 {Cond}
//               </option>
//             ))}
//           </select>

//         <input
//           type="text"
//           value={part.quantity}
//           onChange={(e) => handleInputChange("quantity", e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           value={part.targetPrice}
//           onChange={(e) => handleInputChange("targetPrice", e.target.value)}
//         />
//         <input
//           type="text"
//           value={part.terms}
//           onChange={(e) => handleInputChange("terms", e.target.value)}
//         />
//       </div>
//     </div>
//   );
// };


// export default AddParts












import { useState, useEffect, useRef } from "react";
import css from "../../styles/Menu/Manage/MyRFQNew.module.css";
import { MdRemoveCircle } from "react-icons/md";


const AddParts = ({ part, onUpdate, onRemove, onSearch, searchResults, handlePartModelSearch, isNew, searchResponseMatched, selectedProducts ,onValidityChange}) => {
    const [showDropdown, setShowDropdown] = useState(false)
    // const [mfgOptions, setMfgOptions] = useState([]);  // Store MFG options
    const [conditionOptions, setConditionOptions] = useState([]);  // Store Condition options

    const dropdownRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShowDropdown(false); // 
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

 
    const conditions = selectedProducts?.map((item) => item.cond);
    console.log("Conditions in AddParts:", conditions);

    console.log("Initial mfgs",part.mfgs)

    useEffect(() => {
      if (isNew && !part.mfgOptions?.length && !part.conditionOptions?.length) {
        if (part.mfg) {
          setMfgOptions([part.mfg]);  // Set MFG based on RFQ data
        }
        if (part.cond) {
          setConditionOptions([part.cond]);  // Set Cond based on RFQ data
        }
      }
    }, [part.mfg, part.cond, isNew]);

    console.log("conditionOptions ",conditionOptions);

    console.log("partconditions ",part.conditionOptions)
    

      // Update form validation state
      useEffect(() => {
        // Check if required fields are filled
        const isValid = part.mfg && part.cond && part.quantity;
        onValidityChange(part.id, isValid);  // Notify parent about the validity
      }, [part.mfg, part.cond, part.quantity, onValidityChange, part.id]);
    
    

    const handleRemove = (event) => {
      event.stopPropagation(); 
      onRemove(part.id);
    };

    const handleInputBlur = () => {
      setTimeout(() => {
        if (!part.partModel || part.partModel.trim() === "") {
          setShowDropdown(false);
        }
      }, 200);
    };

    useEffect(() => {
      console.log("MFG Options:", part.mfgOptions);
      console.log("Condition Options:", part.conditionOptions);
    }, [part.mfgOptions, part.conditionOptions]);


    const handleInputChange = (field, value) => {
      console.log("Field Updated:", field, "Value:", value); // Debugging log
      onUpdate(part.partModel, field, value); // Pass partModel instead of part.id
    
      if (field === "mfg") {
        const selectedMfg = part.mfgCondQuantities?.find((item) => item.mfg === value.split(" (")[0]);
        onUpdate(part.partModel, "conditionOptions", selectedMfg?.cond || []); // Update condition options
      }
    
      if (field === "partModel") {
        if (value.trim() !== "") {
          onSearch(value); // Trigger search
          setShowDropdown(true);
        } else {
          onUpdate(part.partModel, "mfgOptions", []); // Clear MFG options
          onUpdate(part.partModel, "conditionOptions", []); // Clear Condition options
        }
      }
    };
    
   
    const handleSuggestionSelect = (selectedItem) => {
      const updates = {
        partModel: selectedItem.partModel,
        mfgOptions: selectedItem.mfg || [],
        mfgCondQuantities: selectedItem.mfg_cond_quantities || [],
      };
    
      if (selectedItem.mfg_cond_quantities?.length) {
        const defaultMfg = selectedItem.mfg_cond_quantities[0];
        updates.mfg = `${defaultMfg.mfg} (${defaultMfg.total_quantity})`;
        updates.conditionOptions = defaultMfg.cond || [];
      }
    
      // Bulk update single call
      onUpdate(part.partModel, "bulkUpdate", updates);
    
      // Close dropdown
      setShowDropdown(false);
    };
    
    
    return (
      <div className={css.rfqBody_Main_left_addParts_Addfields}>
        <button type="button" onClick={handleRemove} className={css.removeBtn}  >
          <MdRemoveCircle />
        </button>
        <div>
  
          <div style={{ position: "relative" }}
            ref={dropdownRef} >
  
            <input
              type="text"
              value={part.partModel || ""}
              onChange={(e) => {
                console.log("Input value:", e.target.value); // Debug input value
                handleInputChange("partModel", e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
              onFocus={() => {
                if (part.partModel.trim() !== "") {
                  setShowDropdown(true); // Show dropdown if there's a non-empty value
                }
              }}
              onBlur={handleInputBlur} // Updated blur handler
            />
  
            {showDropdown && searchResponseMatched?.length > 0 && (
              <ul
                className={css.searchResponseSec}
                style={{
                  position: "absolute",
                  top: "100%",
                  // left: 0,
                  zIndex: 1000,
                  background: "#fff",
                  border: "1px solid #ccc",
                  listStyle: "none",
                  padding: "3px",
                  width: "120px",
                  overflowY: "scroll",
                  maxHeight: "20vh"
                }}
              >
                {searchResponseMatched.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => handleSuggestionSelect(item)} // Pass full item
                    style={{
                      padding: "4px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {item.partModel}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <input
            type="text"
            value={part.heciClei}
            onChange={(e) => handleInputChange("heciClei", e.target.value)}
          />

          <select
            value={part.mfg || ""}
            onChange={(e) => handleInputChange("mfg", e.target.value)}
            required
          >
            <option value="">Select Mfg</option>
            {(part.mfgs?.length ? part.mfgs : part.mfgOptions)?.map((Mfg, index) => (
              <option key={index} value={Mfg}>
                {Mfg}
              </option>
            ))}
          </select>

          <select
            value={part.cond || ""}
            onChange={(e) => handleInputChange("cond", e.target.value)}
            required
           
          >
            <option value="">Select Cond</option>
            {(part.conds?.length ? part.conds : part.conditionOptions)?.map((Cond, index) => (
              <option key={index} value={Cond}>
                {Cond}
              </option>
            ))}
          </select>

        <input
          type="text"
          value={part.quantity}
          onChange={(e) => handleInputChange("quantity", e.target.value)}
          required
        />
        <input
          type="text"
          value={part.targetPrice}
          onChange={(e) => handleInputChange("targetPrice", e.target.value)}
        />
        <input
          type="text"
          value={part.terms}
          onChange={(e) => handleInputChange("terms", e.target.value)}
        />
      </div>
    </div>
  );
};


export default AddParts












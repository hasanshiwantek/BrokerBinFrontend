import { useState,useEffect,useRef } from "react";
import css from "../../styles/Menu/Manage/MyRFQNew.module.css";
import { MdRemoveCircle } from "react-icons/md";



const AddParts = ({ part, onUpdate, onRemove, onSearch, searchResults, handlePartModelSearch, isNew, searchResponseMatched }) => {
    const [showDropdown, setShowDropdown] = useState(false)
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

    const handleInputChange = (field, value) => {
      onUpdate(part.id, field, value); // Update the selected value in state
    
      if (field === "mfg") {
        // Find conditions for the selected MFG
        const selectedMfg = part.mfgCondQuantities?.find((item) => item.mfg === value.split(" (")[0]); // Match MFG name without count
        onUpdate(part.id, "conditionOptions", selectedMfg?.cond || []); // Update Cond options
      }
    
      if (field === "partModel" && value.trim() !== "") {
        onSearch(value); // Trigger search for partModel
        setShowDropdown(true);
      } else if (field === "partModel" && value.trim() === "") {
        onUpdate(part.id, "mfgOptions", []); // Clear MFG options
        onUpdate(part.id, "conditionOptions", []); // Clear Condition options
      }
    };
    
    const handleSuggestionSelect = (selectedItem) => {
      console.log("Selected Item:", selectedItem);
    
      // Update partModel
      onUpdate(part.id, "partModel", selectedItem.partModel);
    
      // Use backend response for MFG with counts
      onUpdate(part.id, "mfgOptions", selectedItem.mfg || []); 
    
      // Save the full mapping for MFG and Condition
      onUpdate(part.id, "mfgCondQuantities", selectedItem.mfg_cond_quantities);
    
      // Default MFG and Conditions
      if (selectedItem.mfg_cond_quantities?.length) {
        const defaultMfg = selectedItem.mfg_cond_quantities[0];
        onUpdate(part.id, "mfg", `${defaultMfg.mfg} (${defaultMfg.total_quantity})`); // Default MFG with count
        onUpdate(part.id, "conditionOptions", defaultMfg.cond || []); // Default Cond options
      }
    
      setShowDropdown(false); // Close dropdown
    };
    
    useEffect(() => {
      if (!part.mfgOptions?.length) {
        onUpdate(part.id, "mfgOptions", [part.mfg]); // Initialize MFG options with the RFQ data
      }
      if (!part.conditionOptions?.length) {
        onUpdate(part.id, "conditionOptions", [part.cond]);
      }
    }, [part.mfg, part.cond, part.mfgOptions, part.conditionOptions, onUpdate]);
    
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
            {console.log("Dropdown visibility:", showDropdown)}
            {console.log("Search Results in AddParts:", searchResponseMatched)}
  
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
          >
            <option value="">Select Mfg</option>
            {part.mfgOptions?.map((Mfg) => (
              <option key={Mfg} value={Mfg}>
                {Mfg}
              </option>
            ))}
          </select>

          <select
            value={part.cond || ""}
            onChange={(e) => handleInputChange("cond", e.target.value)}
          >
            <option value="">Select Cond</option>
            {part.conditionOptions?.map((Cond) => (
              <option key={Cond} value={Cond}>
                {Cond}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={part.quantity}
            onChange={(e) => handleInputChange("quantity", e.target.value)}
          />
          <input
            type="text"
            value={part.price}
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
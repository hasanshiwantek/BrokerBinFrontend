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

    const handleInputChange = (field, value) => {
      onUpdate(part.id, field, value); // Update the selected value in state
    
      if (field === "partModel" && value.trim() !== "") {
        onSearch(value); // Trigger search for partModel
        setShowDropdown(true);
      } else if (field === "partModel" && value.trim() === "") {
        onUpdate(part.id, "mfgOptions", []); // Clear MFG options
        onUpdate(part.id, "conditionOptions", []); // Clear Condition options
      }
    };
    
    const handleInputBlur = () => {
      setTimeout(() => {
        if (!part.partModel || part.partModel.trim() === "") {
          setShowDropdown(false);
        }
      }, 200);
    };
  
    const handleSuggestionSelect = (selectedItem) => {
      console.log("Selected Item:", selectedItem);
    
      // Update partModel
      onUpdate(part.id, "partModel", selectedItem.partModel);    
      onUpdate(part.id, "mfgOptions", selectedItem.mfg || []);
      onUpdate(part.id, "conditionOptions", selectedItem.cond || []);
      if (selectedItem.mfg?.length) {
        onUpdate(part.id, "mfg", selectedItem.mfg[0]); // Default to the first MFG option
      }
      if (selectedItem.cond?.length) {
        onUpdate(part.id, "cond", selectedItem.cond[0]); // Default to the first Condition option
      }
    
      setShowDropdown(false);
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
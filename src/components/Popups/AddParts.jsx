import { useState,useEffect,useRef } from "react";
import css from "../../styles/Menu/Manage/MyRFQNew.module.css";
import { MdRemoveCircle } from "react-icons/md";



const AddParts = ({ part, onUpdate, onRemove, onSearch, searchResults, handlePartModelSearch, searchResponseMatched }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef(null); // Reference to the dropdown
  
    // This effect sets up a click listener for clicks outside of the dropdown
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShowDropdown(false); // Close the dropdown if the click is outside
        }
      };
  
      // Attach the event listener to the document
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        // Clean up the event listener when the component unmounts
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    const handleRemove = (event) => {
      event.stopPropagation(); // This stops the click event from bubbling up to parent elements.
      onRemove(part.id);
    };
  
    const handleInputChange = (field, value) => {
      onUpdate(part.id, field, value); // Update part value in state
  
      // Show dropdown only if the field is partModel and value is not empty
      if (field === "partModel" && value.trim() !== "") {
        onSearch(value); // Trigger search
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    };
  
    // Update onBlur handler to only hide the dropdown if the partModel input is not focused or if it's empty
    const handleInputBlur = () => {
      setTimeout(() => {
        if (!part.partModel || part.partModel.trim() === "") {
          setShowDropdown(false);
        }
      }, 200); // Timeout to catch clicks on dropdown items
    };
  
    const handleSuggestionSelect = (value) => {
      onUpdate(part.id, "partModel", value); // Update partModel when a suggestion is selected
      setShowDropdown(false)
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
                    onClick={() => handleSuggestionSelect(item.partModel)}
                    style={{
                      padding: "4px",
                      cursor: "pointer",
  
                      borderBottom: "1px solid #eee",
                    }}
                  // onMouseOver={(e) => (e.target.style.backgroundColor = "#e6f7ff")}
                  // onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
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
            value={part.mfg}
            onChange={(e) => handleInputChange("mfg", e.target.value)}
          >
            <option value={part.mfg}>{part.mfg}</option>
          </select>
          <select
            value={part.cond}
            onChange={(e) => handleInputChange("condition", e.target.value)}
          >
            <option value={part.cond}>{part.cond}</option>
            {/* Additional options */}
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
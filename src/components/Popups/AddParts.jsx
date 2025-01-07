import { useState, useEffect, useRef } from "react";
import css from "../../styles/Menu/Manage/MyRFQNew.module.css";
import { MdRemoveCircle } from "react-icons/md";


const AddParts = ({ part, onUpdate, onRemove, onSearch, searchResults, handlePartModelSearch, isNew, searchResponseMatched, selectedProducts, parts }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null);



  const conditions = selectedProducts.map((item) => item.cond);
  console.log("Conditions in AddParts:", conditions);





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

    // Update the part's conditionOptions based on the selectedItem
    const conditionOptions = selectedItem.mfg_cond_quantities?.flatMap((item) => item.cond) || [];
    onUpdate(part.id, "conditionOptions", [...new Set(conditionOptions)]); // Ensure unique conditions

    setShowDropdown(false); // Close dropdown
  };


  console.log("Part ID:", part.id, "Condition Options:", part.conditionOptions);
  useEffect(() => {
    if (!part.mfgOptions?.length && part.mfg) {
      onUpdate(part.id, "mfgOptions", [part.mfg]); // Initialize MFG options
    }
  
    if (!part.conditionOptions?.length && part.cond) {
      onUpdate(part.id, "conditionOptions", [part.cond]);
    } else if (
      part.conditionOptions?.length !== conditions?.length || 
      !part.conditionOptions.every((cond, index) => cond === conditions[index])
    ) {
      onUpdate(part.id, "conditionOptions", conditions);
    }
  }, [part.mfg, part.cond, part.mfgOptions, part.conditionOptions, conditions, part.id, onUpdate]);
  


  console.log("Part Model:", part.partModel, "Part ID:", part.id, "Condition Options:", part.conditionOptions);

  const partsLength = parts.length;

  console.log("PartModel Length", partsLength);


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





        {/* 

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
          </select>  */}






        <select
          value={part.cond || ""}
          onChange={(e) => handleInputChange("cond", e.target.value)}
        >
          <option value="">Select Cond</option>
          {partsLength > 1 ? (
            // If there are more parts, use specific condition options for this part
            part.conditionOptions?.map((Cond, index) => (
              <option key={index} value={Cond}>
                {Cond}
              </option>
            ))
          ) : (
            // Otherwise, use global conditions for initial RFQ parts
      part.conditionOptions?.map((Cond, index) => (
              <option key={index} value={Cond}>
                {Cond}
              </option>
            ))
          )}
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












import React from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setAddAnotherFiles } from "../../../../ReduxStore/InventorySlice";


const AddAnotherFile = () => {
  const addAnotherFiles = useSelector(
    (state) => state.inventoryStore.addAnotherFiles
  );

  const dispatch = useDispatch();

  
  
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const allowedFileExtensions = ["xlsx", "csv", "xls"];
  
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (allowedFileExtensions.includes(fileExtension)) {
        const updatedFiles = addAnotherFiles.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              file: file, // Store the file object directly
              stockOption: item.stockOption || "Stock", // Default stock option if not provided
            };
          }
          return item;
        });
        dispatch(setAddAnotherFiles(updatedFiles));
      } else {
        alert(`Invalid file type. Only ${allowedFileExtensions.join(", ")} are allowed.`);
        e.target.value = ""; // Clear the invalid file input
      }
    }
  };
  
  const handleStatusChange = (e, index) => {
    const updatedFiles = addAnotherFiles.map((item, i) => {
      if (index === i) {
        return { ...item, status: e.target.value };
      }
      return item;
    });
    dispatch(setAddAnotherFiles(updatedFiles));
  };

  const addFileField = () => {
    const updatedFiles = [...addAnotherFiles, { file: null, status: "Stock" }];
    dispatch(setAddAnotherFiles(updatedFiles));
  };

  const removeFileField = (index) => {
    const updatedFiles = addAnotherFiles.filter((_, i) => i !== index);
    dispatch(setAddAnotherFiles(updatedFiles));
  };

  return (
    <div className={css.AddAnotherFile}>
      <div className={css.AddAnotherFile_Btn}>
        <p>add another file</p>
        <button type="button" onClick={addFileField}>
          <BiPlus />
        </button>
      </div>
      <div className={css.AddAnotherFile_uploads}>
        {addAnotherFiles.map((file, i) => (
          <div className={css.AddAnotherFile_uploads_div} key={i}>
            <label>Excel or CSV*</label>
            
            <input type="file" onChange={(e) => handleFileChange(e, i)} />
            
            <select
              value={file.status}
              onChange={(e) => handleStatusChange(e, i)}
            >
              <option value="error">Select a Status</option>
              <option value="NA">Auto Detect</option>
              <option value="Stock">Stock</option>
              <option value="Avail">Distribution</option>
            </select>

            {i !== 0 && (
              <button type="button" onClick={() => removeFileField(i)}>
                <BiMinus />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddAnotherFile;

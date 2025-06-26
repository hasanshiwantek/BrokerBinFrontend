
import {React,useState} from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setAddAnotherFiles } from "../../../../ReduxStore/InventorySlice";

const AddAnotherFile = ({ onFileChange, fileInputRefs }) => {
  const dispatch = useDispatch();
  const fileMetadata = useSelector(
    (state) => state.inventoryStore.addAnotherFiles
  );
  // Redux state for file metadata
  const { addAnotherFiles } = useSelector((state) => state.inventoryStore);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // ✅ Handle file selection
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedFileExtensions = ["xlsx", "csv", "xls"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!allowedFileExtensions.includes(fileExtension)) {
      console.warn(`⚠ Invalid file format detected: ${file.name}`);
      alert(
        `❌ Invalid file type. Only ${allowedFileExtensions.join(
          ", "
        )} are allowed.`
      );
      return;
    }

    console.log(`📂 File selected: ${file.name} at index ${index}`);

    // ✅ Pass selected file to parent (Inventory.jsx)
    if (onFileChange) onFileChange(file, index);
  };

  // ✅ Remove a file input field
  // ✅ Remove file field properly
  const removeFileField = (index) => {
    console.log(`🗑 Removing file at index: ${index}`);

    if (addAnotherFiles.length === 1) {
      console.warn("⚠ Cannot remove the last file field.");
      alert("❌ At least one file field is required.");
      return;
    }

    // Remove from Redux state
    const updatedMetadata = addAnotherFiles.filter((_, i) => i !== index);
    dispatch(setAddAnotherFiles(updatedMetadata));

    // Remove from local state
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  return (
    <div className={css.AddAnotherFile}>
      <div className={css.AddAnotherFile_Btn}>
        <p>Add Another File</p>
        <button
          type="button"
          onClick={() =>
            dispatch(
              setAddAnotherFiles([
                ...fileMetadata,
                { fileName: "", fileSize: 0, fileType: "", status: "Stock" },
              ])
            )
          }
        >
          <BiPlus />
        </button>
      </div>

      <div className={css.AddAnotherFile_uploads}>
        {fileMetadata.map((file, i) => (
          <div className={css.AddAnotherFile_uploads_div} key={i}>
            <label >Excel or CSV <span className="text-red-500">*</span></label>
            <input
              type="file"
              ref={(el) => (fileInputRefs.current[i] = el)}
              onChange={(e) => handleFileChange(e, i)}
            />
            <select
              value={file.status}
              onChange={(e) =>
                dispatch(
                  setAddAnotherFiles(
                    fileMetadata.map((item, index) =>
                      index === i ? { ...item, status: e.target.value } : item
                    )
                  )
                )
              }
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

import React, { useState } from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import { BiMinus, BiPlus } from "react-icons/bi";

const AddAnotherFile = ({ setInventoryFile }) => {
  const [files, setFiles] = useState([{ file: null, status: "Stock" }]);

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const updatedFiles = [...files];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        updatedFiles[index].file = base64String;
        setFiles(updatedFiles);
        setInventoryFile(updatedFiles);
      };
      reader.readAsDataURL(file);
    } else {
      updatedFiles[index].file = null;
      setFiles(updatedFiles);
    }
  };

  const handleStatusChange = (e, index) => {
    const updatedFiles = [...files];
    updatedFiles[index].status = e.target.value;
    setFiles(updatedFiles);
  };

  const addFileField = () => {
    setFiles([...files, { file: null, status: "Stock" }]);
  };

  const removeFileField = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setInventoryFile(updatedFiles);
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
        {files.map((file, i) => (
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

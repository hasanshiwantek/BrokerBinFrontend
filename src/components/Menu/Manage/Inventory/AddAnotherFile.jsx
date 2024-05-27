import React, { useState } from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import { BiMinus, BiPlus } from "react-icons/bi";

const AddAnotherFile = () => {
  const [addAnotherFile, setAddAnotherFile] = useState(1);
  return (
    <div className={css.AddAnotherFile}>
      <div className={css.AddAnotherFile_Btn}>
        <p>add another file</p>
        <button
          type="button"
          onClick={() => setAddAnotherFile((prev) => prev + 1)}
        >
          <BiPlus />
        </button>
      </div>
      <div className={css.AddAnotherFile_uploads}>
        {new Array(addAnotherFile).fill(null).map((file, i) => {
          return (
            <div className={css.AddAnotherFile_uploads_div} key={i}>
              <label>Excel or CSV*</label>
              <input type="file" />
              <select defaultValue="Stock">
                <option value="error">Select a Status</option>
                <option value="NA">Auto Detect</option>
                <option value="Stock" >
                  Stock
                </option>
                <option value="Avail">Distribution</option>
              </select>
              {i !== 0 ? (
                <button
                  type="button"
                  onClick={() => setAddAnotherFile((prev) => prev - 1)}
                >
                  <BiMinus />
                </button>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddAnotherFile;

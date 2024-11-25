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

  // const handleFileChange = (e, index) => {
  //   const file = e.target.files[0];
  //   const fileSupported = ["xlsx", "csv", "xls"];
  //   if (file) {
  //     if (fileSupported.includes(file.name.split(".").pop().toLowerCase())) {
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         const base64String = e.target.result
  //           .replace("data:", "")
  //           .replace(/^.+,/, "");
  //         const updatedFiles = addAnotherFiles.map((item, i) => {
  //           if (index === i) {
  //             return { ...item, file: base64String };
  //           }
  //           return item;
  //         });
  //         dispatch(setAddAnotherFiles(updatedFiles));
  //       };
  //       reader.readAsDataURL(file);
  //     } else {
  //       e.target.value = "";
  //       alert("Format should be only .xlsx or .csv");
  //       return;
  //     }
  //   }
  // };

  // const handleFileChange = (e, index) => {
  //   const file = e.target.files[0];
  //   const fileSupported = ["xlsx", "csv", "xls"];
  
  //   if (file) {
  //     if (fileSupported.includes(file.name.split(".").pop().toLowerCase())) {
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         const binaryData = e.target.result; // Binary data as ArrayBuffer
  //         const updatedFiles = addAnotherFiles.map((item, i) => {
  //           if (index === i) {
  //             return { ...item, file: binaryData };
  //           }
  //           return item;
  //         });
  //         dispatch(setAddAnotherFiles(updatedFiles));
  //       };
  //       reader.readAsArrayBuffer(file); // Read as binary data
  //     } else {
  //       e.target.value = "";
  //       alert("Format should be only .xlsx or .csv");
  //       return;
  //     }
  //   }
  // };
  
  // const handleFileChange = (e, index) => {
  //   const file = e.target.files[0];
  //   const fileSupported = ["xlsx", "csv", "xls"];
  
  //   if (file) {
  //     if (fileSupported.includes(file.name.split(".").pop().toLowerCase())) {
  //       const reader = new FileReader();
  //       reader.onload = (event) => {
  //         const binaryData = event.target.result; // ArrayBuffer
  
  //         // Store only metadata in Redux
  //         const updatedFiles = addAnotherFiles.map((item, i) => {
  //           if (index === i) {
  //             return {
  //               ...item,
  //               file: {
  //                 name: file.name,
  //                 size: file.size,
  //                 type: file.type,
  //               },
  //               // Do not store binaryData in Redux
  //             };
  //           }
  //           return item;
  //         });
  //         dispatch(setAddAnotherFiles(updatedFiles)); // Dispatch only serializable data
  
  //         // Store binaryData temporarily for submission (local reference)
  //         item.binaryData = binaryData; // Store locally, not in Redux
  //       };
  //       reader.readAsArrayBuffer(file);
  //     } else {
  //       e.target.value = "";
  //       alert("Format should be only .xlsx or .csv");
  //       return;
  //     }
  //   }
  // };
  
  // const handleFileChange = (e, index) => {
  //   const file = e.target.files[0];
  //   const fileSupported = ["xlsx", "csv", "xls"];
  
  //   if (file) {
  //     if (fileSupported.includes(file.name.split(".").pop().toLowerCase())) {
  //       const reader = new FileReader();
  //       reader.onload = (event) => {
  //         const binaryData = event.target.result; // Binary data as ArrayBuffer
  
  //         // Ensure the binary data is stored locally and metadata in Redux
  //         const updatedFiles = addAnotherFiles.map((item, i) => {
  //           if (index === i) {
  //             return {
  //               ...item,
  //               file: {
  //                 name: file.name,
  //                 size: file.size,
  //                 type: file.type,
  //               }, // Metadata in Redux
  //               binaryData, // Store locally, not in Redux
  //             };
  //           }
  //           return item;
  //         });
  
  //         // Log for debugging
  //         console.log("Updated Files:", updatedFiles);
  
  //         // Dispatch only metadata
  //         dispatch(setAddAnotherFiles(updatedFiles));
  //       };
  //       reader.readAsArrayBuffer(file);
  //     } else {
  //       e.target.value = "";
  //       alert("Format should be only .xlsx or .csv");
  //     }
  //   } else {
  //     alert("No file selected.");
  //   }
  // };
  
  
  // const handleFileChange = (e, index) => {
  //   const file = e.target.files[0];
  //   const fileSupported = ["xlsx", "csv", "xls"];
  
  //   if (file) {
  //     if (fileSupported.includes(file.name.split(".").pop().toLowerCase())) {
  //       const reader = new FileReader();
  //       reader.onload = (event) => {
  //         const binaryData = event.target.result; // ArrayBuffer
  
  //         // Update only metadata in Redux
  //         const updatedFiles = addAnotherFiles.map((item, i) => {
  //           if (index === i) {
  //             return {
  //               ...item,
  //               file: {
  //                 name: file.name,
  //                 size: file.size,
  //                 type: file.type,
  //               }, // Only metadata stored in Redux
  //             };
  //           }
  //           return item;
  //         });
  
  //         // Store binaryData locally (e.g., in a separate variable or map)
  //         // Ensure binary data is not part of the Redux state or payload
  //         file.binaryData = binaryData; // Associate binary data locally
  
  //         // Dispatch only metadata to Redux
  //         dispatch(setAddAnotherFiles(updatedFiles));
  //       };
  //       reader.readAsArrayBuffer(file);
  //     } else {
  //       e.target.value = "";
  //       alert("Format should be only .xlsx or .csv");
  //     }
  //   } else {
  //     alert("No file selected.");
  //   }
  // };
  
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const fileSupported = ["xlsx", "csv", "xls"];
  
    if (file) {
      if (fileSupported.includes(file.name.split(".").pop().toLowerCase())) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64String = e.target.result.replace("data:", "").replace(/^.+,/, "");
          const updatedFiles = addAnotherFiles.map((item, i) => {
            if (index === i) {
              return {
                ...item,
                file: {
                  base64: base64String, // Store base64 for preview/debugging
                  name: file.name,
                  size: file.size,
                  type: file.type,
                },
                stockOption: item.stockOption || "", // Retain or initialize stock option
              };
            }
            return item;
          });
          dispatch(setAddAnotherFiles(updatedFiles));
        };
        reader.readAsDataURL(file);
      } else {
        e.target.value = "";
        alert("Format should be only .xlsx or .csv");
      }
    } else {
      alert("No file selected.");
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

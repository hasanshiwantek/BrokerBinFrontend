import React from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import AddAnotherFile from "./AddAnotherFile";
import ScheduleNewUpload from "./ScheduleNewUpload";
import InventoryButtons from "./InventoryButtons";
import { useDispatch, useSelector } from "react-redux";
import { sendInventoryFile } from "../../../../ReduxStore/InventorySlice";
import ErrorStatus from "../../../Error/ErrorStatus";
import Cookies from "js-cookie";


const Inventory = () => {
  const token = Cookies.get("token");
  const { addAnotherFiles, error } = useSelector(
    (state) => state.inventoryStore
  );
  // const { token } = useSelector((state) => state.profileStore);
  const dispatch = useDispatch();

  // const submitInventoryBtn = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const formDataObject = Object.fromEntries(formData.entries());
  //   const filteredInventoryFile = addAnotherFiles.filter(
  //     (e, i) => e.file !== null
  //   );
  //   formDataObject.uploadFile = filteredInventoryFile;
  //   if (formDataObject.uploadFile.length > 0) {
  //     console.log(formDataObject);
  //     dispatch(sendInventoryFile({ token, formDataObject }));
  //   } else {
  //     alert("Please fill all required fields");
  //     return; // stop the function execution and return early if the form is not valid.
  //   }
  // };

  // const submitInventoryBtn = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  
  //   // Append other form data fields
  //   const formDataObject = Object.fromEntries(new FormData(e.target).entries());
  //   for (const [key, value] of Object.entries(formDataObject)) {
  //     formData.append(key, value);
  //   }
  
  //   // Filter valid files and append them as an array
  //   const filteredInventoryFile = addAnotherFiles.filter((e) => e.file !== null);
  //   if (filteredInventoryFile.length > 0) {
  //     filteredInventoryFile.forEach((item, index) => {
  //       if (item.file) {
  //         formData.append(`uploadFile[]`, new Blob([item.file]), `file${index}.csv`);
  //       }
  //     });
  
  //     // Dispatch API call
  //     dispatch(sendInventoryFile({ token, formData }));
  //   } else {
  //     alert("Please fill all required fields");
  //     return; // Stop the function if validation fails
  //   }
  // };
  
  // const submitInventoryBtn = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  
  //   // Append other form fields
  //   const formDataObject = Object.fromEntries(new FormData(e.target).entries());
  //   for (const [key, value] of Object.entries(formDataObject)) {
  //     formData.append(key, value);
  //   }
  
  //   // Filter valid files and append them to the FormData
  //   const filteredInventoryFile = addAnotherFiles.filter((fileObj) => fileObj.file !== null);
  //   if (filteredInventoryFile.length > 0) {
  //     filteredInventoryFile.forEach((fileObj, index) => {
  //       if (fileObj.file) {
  //         formData.append(
  //           "uploadFile[]", // Adjust key based on backend expectation
  //           new Blob([fileObj.file], { type: "application/octet-stream" }),
  //           `file${index}.csv`
  //         );
  //       }
  //     });
  
  //     // Debugging FormData
  //     for (let pair of formData.entries()) {
  //       console.log(pair[0], pair[1]);
  //     }
  
  //     // Dispatch API call
  //     dispatch(sendInventoryFile({ token, formData }));
  //   } else {
  //     alert("Please fill all required fields");
  //     return;
  //   }
  // };
  
  // const submitInventoryBtn = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  
  //   // Add form fields
  //   const formDataObject = Object.fromEntries(new FormData(e.target).entries());
  //   for (const [key, value] of Object.entries(formDataObject)) {
  //     formData.append(key, value);
  //   }
  
  //   // Add files as binary
  //   const filteredInventoryFile = addAnotherFiles.filter((fileObj) => fileObj.file !== null);
  //   if (filteredInventoryFile.length > 0) {
  //     filteredInventoryFile.forEach((fileObj, index) => {
  //       if (fileObj.file) {
  //         formData.append("uploadFile[]", new Blob([fileObj.file], { type: "application/octet-stream" }), `file${index}.csv`);
  //       }
  //     });
  
  //     // Debug FormData
  //     for (let pair of formData.entries()) {
  //       console.log(`${pair[0]}:`, pair[1]);
  //     }
  
  //     // Dispatch API call
  //     dispatch(sendInventoryFile({ token, formData }));
  //   } else {
  //     alert("Please fill all required fields");
  //   }
  // };
  
  // const submitInventoryBtn = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  
  //   // Add other form data fields
  //   const formDataObject = Object.fromEntries(new FormData(e.target).entries());
  //   for (const [key, value] of Object.entries(formDataObject)) {
  //     formData.append(key, value);
  //   }
  
  //   // Add binary files from local reference
  //   const filteredInventoryFile = addAnotherFiles.filter((fileObj) => fileObj.file && fileObj.binaryData);
  //   if (filteredInventoryFile.length > 0) {
  //     filteredInventoryFile.forEach((fileObj, index) => {
  //       formData.append(
  //         "uploadFile[]", // Check with backend if brackets [] are required
  //         new Blob([fileObj.binaryData], { type: fileObj.file.type }),
  //         fileObj.file.name
  //       );
  //     });
  
  //     // Debugging FormData
  //     for (let pair of formData.entries()) {
  //       console.log(pair[0], pair[1]);
  //     }
  
  //     // Dispatch API call
  //     dispatch(sendInventoryFile({ token, formData }));
  //   } else {
  //     alert("Please fill all required fields");
  //     return;
  //   }
  // };
  
  // const submitInventoryBtn = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  
  //   // Add other form data fields
  //   const formDataObject = Object.fromEntries(new FormData(e.target).entries());
  //   for (const [key, value] of Object.entries(formDataObject)) {
  //     formData.append(key, value);
  //   }
  
  //   // Add binary files
  //   const filteredInventoryFile = addAnotherFiles.filter(
  //     (fileObj) => fileObj.file && fileObj.binaryData
  //   );
  
  //   if (filteredInventoryFile.length > 0) {
  //     filteredInventoryFile.forEach((fileObj, index) => {
  //       formData.append(
  //         "uploadFile[]", // Confirm key name with backend
  //         new Blob([fileObj.binaryData], { type: fileObj.file.type }),
  //         fileObj.file.name
  //       );
  //     });
  
  //     // Debugging FormData
  //     for (let pair of formData.entries()) {
  //       console.log(pair[0], pair[1]);
  //     }
  
  //     // Dispatch API call
  //     dispatch(sendInventoryFile({ token, formData }));
  //   } else {
  //     alert("Please select at least one file.");
  //   }
  // };
  
  // const submitInventoryBtn = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  
  //   // Add other form data fields
  //   const formDataObject = Object.fromEntries(new FormData(e.target).entries());
  //   for (const [key, value] of Object.entries(formDataObject)) {
  //     formData.append(key, value);
  //   }
  
  //   // Add binary files from local references
  //   const filteredInventoryFile = addAnotherFiles.filter((fileObj) => fileObj.file);
  //   if (filteredInventoryFile.length > 0) {
  //     filteredInventoryFile.forEach((fileObj, index) => {
  //       formData.append(
  //         "uploadFile[]", // Confirm key name with backend
  //         new Blob([fileObj.binaryData], { type: fileObj.file.type }),
  //         fileObj.file.name
  //       );
  //     });
  
  //     // Debugging FormData
  //     for (let pair of formData.entries()) {
  //       console.log(pair[0], pair[1]);
  //     }
  
  //     // Dispatch API call
  //     dispatch(sendInventoryFile({ token, formData }));
  //   } else {
  //     alert("Please select at least one file.");
  //   }
  // };
  
  // const submitInventoryBtn = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  
  //   // Add other form fields
  //   const formDataObject = Object.fromEntries(new FormData(e.target).entries());
  //   for (const [key, value] of Object.entries(formDataObject)) {
  //     formData.append(key, value);
  //   }
  
  //   // Add files to FormData
  //   const filteredInventoryFile = addAnotherFiles.filter((fileObj) => fileObj.file); // Ensure valid files
  //   if (filteredInventoryFile.length > 0) {
  //     filteredInventoryFile.forEach((fileObj) => {
  //       formData.append(
  //         "uploadFile", // Exact field name as required by the backend
  //         new Blob([fileObj.binaryData], { type: fileObj.file.type }),
  //         fileObj.file.name
  //       );
  //     });
  
  //     // Debugging: Log FormData to ensure correctness
  //     for (let pair of formData.entries()) {
  //       console.log(pair[0], pair[1]);
  //     }
  
  //     // Dispatch API call
  //     dispatch(sendInventoryFile({ token, formData }));
  //   } else {
  //     alert("Please select at least one file.");
  //     return;
  //   }
  // };
  
//   const submitInventoryBtn = (e) => {
//   e.preventDefault();
//   const formData = new FormData();

//   // Add other form fields
//   const formDataObject = Object.fromEntries(new FormData(e.target).entries());
//   for (const [key, value] of Object.entries(formDataObject)) {
//     formData.append(key, value);
//   }

//   // Add files to FormData as an array
//   const filteredInventoryFile = addAnotherFiles.filter((fileObj) => fileObj.file); // Ensure valid files
//   if (filteredInventoryFile.length > 0) {
//     filteredInventoryFile.forEach((fileObj) => {
//       formData.append(
//         "uploadFile[]", // Use brackets to send as an array
//         new Blob([fileObj.binaryData], { type: fileObj.file.type }),
//         fileObj.file.name
//       );
//     });

//     // Debugging: Log FormData content
//     for (let pair of formData.entries()) {
//       console.log(pair[0], pair[1]);
//     }

//     // Dispatch API call
//     dispatch(sendInventoryFile({ token, formData }));
//   } else {
//     alert("Please select at least one file.");
//     return;
//   }
// };

// const submitInventoryBtn = (e) => {
//   e.preventDefault();
//   const formData = new FormData();

//   // Add form input fields to FormData
//   const formDataObject = Object.fromEntries(new FormData(e.target).entries());
//   for (const [key, value] of Object.entries(formDataObject)) {
//     formData.append(key, value);
//   }

//   // Add files with associated stock options to FormData
//   const filteredInventoryFile = addAnotherFiles.filter((fileObj) => fileObj.file);
//   if (filteredInventoryFile.length > 0) {
//     filteredInventoryFile.forEach((fileObj, index) => {
//       if (fileObj.file) {
//         formData.append(
//           "uploadFile[]", // File array key
//           new Blob([atob(fileObj.file.base64)], { type: fileObj.file.type }),
//           fileObj.file.name
//         );
//         formData.append(`stockOption[${index}]`, fileObj.stockOption || ""); // Add stock option
//       }
//     });

//     // Debugging FormData
//     for (let pair of formData.entries()) {
//       console.log(pair[0], pair[1]);
//     }

//     // Dispatch the API call
//     dispatch(sendInventoryFile({ token, formData }));
//   } else {
//     alert("Please fill all required fields");
//   }
// };

const submitInventoryBtn = async (e) => {
  e.preventDefault(); // Prevent form submission
  const formData = new FormData();

  // Add other form input fields to FormData
  const formDataObject = Object.fromEntries(new FormData(e.target).entries());
  for (const [key, value] of Object.entries(formDataObject)) {
    formData.append(key, value);
  }

  // Add files to FormData
  const filteredInventoryFiles = addAnotherFiles.filter((fileObj) => fileObj.file);

  if (filteredInventoryFiles.length > 0) {
    filteredInventoryFiles.forEach((fileObj, index) => {
      formData.append("uploadFile[]", fileObj.file, fileObj.file.name); // Add the file
      formData.append(`status[${index}]`, fileObj.status || "Stock"); // Add the stock option
    });

    try {
      // Debugging: Log the keys and values in FormData
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // Dispatch API Call
      const response = await dispatch(sendInventoryFile({ token, formData })).unwrap();

      // Success Feedback
      alert(response.message || "Files uploaded successfully!");
    } catch (error) {
      console.error("Error uploading files:", error);
      alert(error?.message || "Failed to upload files. Please try again.");
    }
  } else {
    alert("Please select at least one file to upload.");
  }
};


  
  

  if (error) {
    return <ErrorStatus error={error} />;
  }

  return (
    <div className={css.inventory}>
      <InventoryButtons />
      <div className={css.inventory_main}>
        <form onSubmit={submitInventoryBtn}>
          <h1>upload inventory</h1>
          <AddAnotherFile />
          <p className={css.inventory_main_desc}>
            or
            <span>
              <a href="mailto:kaif.rizvi@shiwantek.com">
                <u>
                  <i> email parts list</i>
                </u>
              </a>
            </span>
          </p>
          <div className={css.inventory_main_ExampleFile}>
            <p>Example Files</p>
            <div>
              <a
                target="_blank"
                href="https://members.brokerbin.com/help/example.xls"
              >
                <p>example.xls</p>
              </a>
              <a
                target="_blank"
                href="https://members.brokerbin.com/help/example.csv"
              >
                <label style={{color:"#444"}}>example.csv</label>
              </a>
            </div>
          </div>
          <button
            type="submit"
            value="send file"
            oncClick={submitInventoryBtn}
            className={`${css.inventory_main_submitBtn} !p-3 border rounded-lg transform active:scale-90 transition-all duration-100`}
          >
            Send File
          </button>
          {/* <h1 className={css.inventory_main_AutoUploadh1}>Auto Uploads</h1> */}
        </form>
        {/* <ScheduleNewUpload /> */}
        {/* <div className={css.inventory_main_footer}>
          <h1>Current Uploads</h1>
          <p>No Auto Uploads are currently scheduled for your company</p>
        </div> */}
      </div>
    </div>
  );
};

export default Inventory;

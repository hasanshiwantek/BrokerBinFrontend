import {React,useState} from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import AddAnotherFile from "./AddAnotherFile";
import ScheduleNewUpload from "./ScheduleNewUpload";
import InventoryButtons from "./InventoryButtons";
import { useDispatch, useSelector } from "react-redux";
import { sendInventoryFile } from "../../../../ReduxStore/InventorySlice";
import ErrorStatus from "../../../Error/ErrorStatus";
import Cookies from "js-cookie";
import { resetFiles } from "../../../../ReduxStore/InventorySlice";

const Inventory = () => {
  const token = Cookies.get("token");
  const { addAnotherFiles, error } = useSelector(
    (state) => state.inventoryStore
  );
  // const { token } = useSelector((state) => state.profileStore);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // State to track loading status

  const submitInventoryBtn = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Start loading spinner or disable button
  
    const formData = new FormData();
  
    // Convert form inputs to a FormData object
    const formDataObject = Object.fromEntries(new FormData(e.target).entries());
    for (const [key, value] of Object.entries(formDataObject)) {
      formData.append(key, value);
    }
  
    // Filter files from the state
    const filteredInventoryFiles = addAnotherFiles.filter((fileObj) => fileObj.file);
  
    // Validate file selection
    if (filteredInventoryFiles.length === 0) {
      alert("Please select at least one file to upload.");
      setLoading(false); // Stop loading spinner
      return; // Exit early if no files are selected
    }
  
    // Append files and their statuses to FormData
    filteredInventoryFiles.forEach((fileObj, index) => {
      formData.append("uploadFile[]", fileObj.file, fileObj.file.name); // Add file
      formData.append(`status[${index}]`, fileObj.status || "Stock"); // Add status
    });
  
    try {
      // Log FormData for debugging purposes
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
  
      // Dispatch the API call with token and FormData
      const response = await dispatch(sendInventoryFile({ token, formData })).unwrap();
  
      // Show success feedback
      alert(response.message || "Files uploaded successfully!");
      // Reset the file input fields

    // Dispatch resetFiles to clear the files
    dispatch(addAnotherFiles[{ file: null, status: "Stock" }])

    } catch (error) {
      // Handle errors during the API call
      console.error("Error uploading files:", error);
      alert(error?.message || "Failed to upload files. Please try again.");
    } finally {
      setLoading(false); // End loading spinner or re-enable button
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
            disabled={loading} // Disable button while loading
            className={`${css.inventory_main_submitBtn} !p-3 border rounded-lg transform active:scale-90 transition-all duration-100 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Send File"}
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

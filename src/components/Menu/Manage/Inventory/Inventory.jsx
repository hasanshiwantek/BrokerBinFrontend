import React, { useState, useRef, useEffect } from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import AddAnotherFile from "./AddAnotherFile";
import InventoryButtons from "./InventoryButtons";
import { useDispatch, useSelector } from "react-redux";
import {
  sendInventoryFile,
  setAddAnotherFiles,
  resetFiles,
  fetchCurrentUploads,
} from "../../../../ReduxStore/InventorySlice";
import Cookies from "js-cookie";
import ScheduleNewUpload from "./ScheduleNewUpload";
import UploadInventoryContent from "./UploadInventoryContent";
import UploadsTable from "./UploadsTable";
import PopupAlert from "@/components/Popups/PopupAlert";


const Inventory = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  // Redux state for file metadata
  const { addAnotherFiles, error } = useSelector(
    (state) => state.inventoryStore
  );

  // Component state for actual files
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUploads, setCurrentUploads] = useState({});

  // ✅ Create a reference to multiple file inputs
  const fileInputRefs = useRef([]);
    const [popup, setPopup] = useState({
      show: false,
      type: "success",
      message: "",
    });
  
    const showPopup = (type, message) => {
      setPopup({ show: true, type, message });
  
      setTimeout(() => {
        setPopup((prev) => ({ ...prev, show: false }));
      }, 4000);
    };
  

  // ✅ Handle file selection and update both Redux & Local State
  const handleFileChange = (file, index) => {
    if (!file) return;

    console.log(`📂 File selected: ${file.name} at index ${index}`);

    // Update local state (actual files)
    const updatedFiles = [...selectedFiles];
    updatedFiles[index] = file;
    setSelectedFiles(updatedFiles);

    // Update Redux state (only metadata)
    const updatedMetadata = [...addAnotherFiles];
    updatedMetadata[index] = {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      status: addAnotherFiles[index]?.status || "Stock",
    };

    dispatch(setAddAnotherFiles(updatedMetadata));
  };

  // ✅ Handle file submission
  const submitInventoryBtn = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("🚀 Submitting files:", selectedFiles);

    if (selectedFiles.length === 0 || selectedFiles.every((file) => !file)) {
       showPopup("warning", "Please select at least one file to upload!");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      if (file) {
        console.log(`📩 Adding file: ${file.name}`);
        formData.append("uploadFile[]", file, file.name);
        formData.append(`status[${index}]`, "Stock");
      }
    });

    try {
      const response = await dispatch(
        sendInventoryFile({ token, formData })
      ).unwrap();

      console.log("✅ Upload success:", response);

       showPopup("success",response.message || " Files uploaded successfully!");


      // ✅ Clear both Redux and local state
      setSelectedFiles([]);
      dispatch(resetFiles());
    } catch (error) {
      console.error("❌ Upload failed:", error);
       showPopup("success",  error.message || "Failed to upload files. Please try again.");
    } finally {
      setLoading(false);
      // ✅ Reset all file input fields dynamically
      fileInputRefs.current.forEach((input) => {
        if (input) {
          input.value = "";
        }
      });
    }
  };

  const userId = Cookies.get("user_id");
  console.log("👤 User ID:", userId);

  const fetchCurrentUploadsData = async () => {
    try {
      const response = await dispatch(
        fetchCurrentUploads({ token, userId })
      ).unwrap();
      setCurrentUploads(response);
      console.log("📥 Current Uploads:", response);
      console.log("CURRENTUPLOADSDATA", currentUploads);
    } catch (error) {
      console.error("❌ Error fetching current uploads:", error);
      showPopup("success",  "Failed to fetch current uploads.");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCurrentUploadsData();
    }
  }, []);

  return (
    <>
      <div className={css.inventory}>
        <InventoryButtons />
        <div className={css.inventory_main}>
          <form onSubmit={submitInventoryBtn}>
            <h1>Upload Inventory</h1>

            {/* ✅ File input & metadata handled by AddAnotherFile */}
            <AddAnotherFile
              onFileChange={handleFileChange}
              fileInputRefs={fileInputRefs}
            />

            <p className={css.inventory_main_desc}>
              or
              <span>
                <a href="mailto:kaif.rizvi@shiwantek.com">
                  <u>
                    <i> Email Parts List</i>
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
                  <p className="!lowercase underline">example.xls</p>
                </a>
                <a
                  target="_blank"
                  href="https://members.brokerbin.com/help/example.csv"
                >
                  <p className="!lowercase underline">example.csv</p>
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`${
                css.inventory_main_submitBtn
              } !p-3 border rounded-lg transform active:scale-90 transition-all duration-100 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Send File"}
            </button>
          </form>
          <div className="mt-10">
            <h1 className="my-5">Auto Uploads</h1>
            <ScheduleNewUpload />
          </div>
          <div className="mt-10">
            <h1>Current Uploads</h1>
            {currentUploads?.data && (
              <div className="p-10 shadow rounded-sm">
                <UploadsTable data={currentUploads} />
              </div>
            )}
          </div>
        </div>

        <div></div>
      </div>

      <div className="flex  justify-center -mt-10 items-center ">
        <UploadInventoryContent />
      </div>
          <PopupAlert
        show={popup.show}
        type={popup.type}
        message={popup.message}
        onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
      />
    </>
  );
};

export default Inventory;

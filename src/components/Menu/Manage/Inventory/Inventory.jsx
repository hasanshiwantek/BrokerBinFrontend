import React, { useState, useRef } from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import AddAnotherFile from "./AddAnotherFile";
import InventoryButtons from "./InventoryButtons";
import { useDispatch, useSelector } from "react-redux";
import {
  sendInventoryFile,
  setAddAnotherFiles,
  resetFiles,
} from "../../../../ReduxStore/InventorySlice";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // ✅ Create a reference to multiple file inputs
  const fileInputRefs = useRef([]);

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
      toast.error("❌ Please select at least one file to upload.");
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
      toast.success(response.message || "✔ Files uploaded successfully!");

      // ✅ Clear both Redux and local state
      setSelectedFiles([]);
      dispatch(resetFiles());
    } catch (error) {
      console.error("❌ Upload failed:", error);
      toast.error(error.message || "Failed to upload files. Please try again.");
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
  return (
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
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Inventory;

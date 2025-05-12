import React, { useState } from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import { BiMinus, BiPlus } from "react-icons/bi";
import Tooltip from "@mui/material/Tooltip";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { scheduleUpload } from "@/ReduxStore/InventorySlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const ScheduleNewUpload = () => {
  const [showSchedule, setShowSchedule] = useState(false);
  const [toggleAddFile, setToggleAddFile] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formKey, setFormKey] = useState(Date.now());

  const dispatch = useDispatch();
  const token = Cookies.get("token");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("❗ Please select a file.");
      return;
    }

    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error("❌ Invalid file type. Only CSV or Excel files are allowed.");
      return;
    }

    setSelectedFile(file);
    toast.success(`✅ File selected: ${file.name}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    if (!selectedFile) {
      toast.error("❗ File is required to proceed.");
      console.log("File is Required");

      return;
    }

    // Validate required fields
    const scheduleTime = form.get("time");
    const uploader = form.get("uploader");

    if (!scheduleTime || !uploader) {
      toast.error("❗ Please fill all required fields (Time, Uploader, File).");
      console.log("❗ Please fill all required fields (Time, Uploader, File).");

      return;
    }

    form.append("file", selectedFile);
    form.set("useSSHKey", form.get("useSSHKey") === "on" ? 1 : 0);

    toast.info("⏳ Uploading...");

    dispatch(scheduleUpload({ formData: form, token })).then((res) => {
      console.log("📥 Backend Response:", res);

      if (res.meta.requestStatus === "fulfilled") {
        toast.success(res.payload.message || " Upload successful!");
        console.log("✅ Payload returned:", res.payload);
        setSelectedFile(null);
        setFormKey(Date.now()); // Reset form
      } else {
        toast.error(res.payload.message || "❌ Upload failed.");
        console.error("❌ Backend Error Payload:", res.payload);
      }
    });
  };
  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "1.05rem", // Adjust font size
            width: "11rem",
            textAlign: "center",
            backgroundColor: "var(--primary-color)",
          },
          arrow: {
            color: "var(--primary-color)",
          },
        },
      },
    },
  });

  return (
    <div className="shadow">
      <div className={`${css.inventory_main_scheduleUpload_toggle}`}>
        <p className="font-semibold text-base">Schedule New Upload</p>
        <ThemeProvider theme={theme}>
          <Tooltip
            title={`${
              showSchedule
                ? " Cancel new Upload"
                : " Start a new scheduled upload"
            }`}
            arrow
            placement="top"
          >
            <button
              type="button"
              onClick={() => setShowSchedule((prev) => !prev)}
            >
              {showSchedule ? <BiMinus /> : <BiPlus />}
            </button>
          </Tooltip>
        </ThemeProvider>
      </div>

      {showSchedule && (
        <>
          <form onSubmit={handleSubmit} key={formKey}>
            <div className={css.inventory_main_scheduleUpload}>
              <span>
                <label>Time (CDT / CST)</label>
                <input type="time" name="time" id="time" />
              </span>
              <span>
                <label>Status</label>
                <select name="status">
                  <option value="stock">Stock</option>
                  <option value="distribution">Distribution</option>
                </select>
              </span>
              <span>
                <label>Uploader</label>
                <input type="text" name="uploader" style={{ padding: "3px" }} />
              </span>
            </div>
            <div className={css.inventory_main_scheduleUpload_addFile}>
              {toggleAddFile ? (
                <div
                  className={css.inventory_main_scheduleUpload_addFile_btn}
                  onClick={() => setToggleAddFile((prev) => !prev)}
                >
                  <button type="button">
                    <BiPlus size={15} />
                  </button>

                  <label>Add file</label>
                </div>
              ) : (
                <div
                  className={css.inventory_main_scheduleUpload_addFile_toggle}
                >
                  <h3>Add a File</h3>
                  <div
                    className={
                      css.inventory_main_scheduleUpload_addFile_toggle_fields
                    }
                  >
                    <div className="flex justify-center items-center">
                      <label className="flex justify-center items-center">
                        Excel or CSV <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileChange}
                      />
                    </div>
                    {selectedFile && (
                      <div className="mt-2 px-3 py-1 inline-flex items-center bg-blue-100 text-blue-800 w-64 text-sm rounded-full">
                        📁 {selectedFile.name}
                      </div>
                    )}
                  </div>
                  <div
                    className={
                      css.inventory_main_scheduleUpload_addFile_toggle_btn
                    }
                  >
                    <button type="submit">Add</button>
                    <button
                      type="button"
                      onClick={() => setToggleAddFile((prev) => !prev)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              className={css.inventory_main_scheduleUpload_footer}
              disabled={!selectedFile}
            >
              Create
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ScheduleNewUpload;

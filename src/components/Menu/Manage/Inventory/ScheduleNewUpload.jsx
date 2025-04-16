import React, { useState } from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import { BiMinus, BiPlus } from "react-icons/bi";
import Tooltip from "@mui/material/Tooltip";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ScheduleNewUpload = () => {
  const [showSchedule, setShowSchedule] = useState(false);
  const [showClipboard, setShowClipboard] = useState(false);

  const [toggleAddFile, setToggleAddFile] = useState(true);
  // const handeStauts = ()=>{
  //   setShowSchedule((prev) =>!prev)
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    formData.useSSHKey = formData.useSSHKey === "on" ? 1 : 0;
    console.log(formData);
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
          <form onSubmit={handleSubmit}>
            <div className={css.inventory_main_scheduleUpload}>
              <span>
                <label>Time (CDT / CST)</label>
                <input type="time" name="scheduleTime" id="scheduleTime" />
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
                    <span>
                      <label>Protocol</label>
                      <select name="protocol">
                        <option value="ftp">ftp</option>
                        <option value="http">http</option>
                        <option value="https">https</option>
                        <option value="sftp">sftp</option>
                      </select>
                    </span>
                    <span>
                      <label>URL</label>
                      <input
                        type="text"
                        name="url"
                        placeholder="host.domain/file.csv"
                      />
                    </span>
                    <span>
                      <label>Port</label>
                      <input type="text" name="port" />
                    </span>
                    <span>
                      <label>Use SSH Key</label>
                      <input type="checkbox" name="useSSHKey" />
                    </span>
                    <span>
                      <label>Login</label>
                      <input type="text" name="login" />
                    </span>
          
                    <span>
                      <label>Password</label>
                      <input type="password" name="password" />
                    </span>
                    <span>
                      <label>Public Key</label>
                      <button className="!p-2 whitespace-nowrap !w-fit rounded-lg">Copy to clipboard</button>
                    </span>
                  </div>
                  <div
                    className={
                      css.inventory_main_scheduleUpload_addFile_toggle_btn
                    }
                  >
                    <button type="button">
                      <input type="submit" value="Add" />
                      {/* add */}
                    </button>
                    <button
                      type="button"
                      onClick={() => setToggleAddFile((prev) => !prev)}
                    >
                      cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              type="button"
              className={css.inventory_main_scheduleUpload_footer}
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

import React, { useState } from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import { BiMinus, BiPlus } from "react-icons/bi";

const ScheduleNewUpload = () => {
  const [showSchedule, setShowSchedule] = useState(false);
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
  return (
    <div>
      <div className={css.inventory_main_scheduleUpload_toggle}>
        <p>Schedule New Upload</p>
        <button type="button" onClick={() => setShowSchedule((prev) => !prev)}>
          {showSchedule ? <BiMinus /> : <BiPlus />}
        </button>
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
                <label>status</label>
                <select name="status">
                  <option value="stock">stock</option>
                  <option value="distribution">distribution</option>
                </select>
              </span>
              <span>
                <label>uploader</label>
                <input type="text" name="uploader" />
              </span>
            </div>
            <div className={css.inventory_main_scheduleUpload_addFile}>
              {toggleAddFile ? (
                <div className={css.inventory_main_scheduleUpload_addFile_btn}>
                  <label>add a file</label>
                  <button
                    type="button"
                    onClick={() => setToggleAddFile((prev) => !prev)}
                  >
                    <BiPlus />
                  </button>
                </div>
              ) : (
                <div
                  className={css.inventory_main_scheduleUpload_addFile_toggle}
                >
                  <h1>Add a File</h1>
                  <div
                    className={
                      css.inventory_main_scheduleUpload_addFile_toggle_fields
                    }
                  >
                    <span>
                      <label>protocol</label>
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
                      <label>port</label>
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
              create
              {/* <input type="submit" value="create" /> */}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ScheduleNewUpload;

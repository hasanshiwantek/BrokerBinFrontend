import React from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import AddAnotherFile from "./AddAnotherFile";
import ScheduleNewUpload from "./ScheduleNewUpload";
import InventoryButtons from "./InventoryButtons";
import { useSelector } from "react-redux";

const Inventory = () => {
  const addAnotherFiles = useSelector(
    (state) => state.inventoryStore.addAnotherFiles
  );
  // const [inventoryFile, setInventoryFile] = useState([]);

  const submitInventoryBtn = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData.entries());
    const filteredInventoryFile = addAnotherFiles.filter(
      (e, i) => e.file !== null
    );
    formDataObject.inventoryFile = filteredInventoryFile;
    console.log(formDataObject);
  };

  return (
    <>
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
                  <u>example.xls</u>
                </a>
                <a
                  target="_blank"
                  href="https://members.brokerbin.com/help/example.csv"
                >
                  <u>example.csv</u>
                </a>
              </div>
            </div>
            <input
              type="submit"
              value="send file"
              className={css.inventory_main_submitBtn}
            />
            <h1 className={css.inventory_main_AutoUploadh1}>Auto Uploads</h1>
          </form>
          <ScheduleNewUpload />
          <div className={css.inventory_main_footer}>
            <h1>Current Uploads</h1>
            <p>No Auto Uploads are currently scheduled for your company</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory;

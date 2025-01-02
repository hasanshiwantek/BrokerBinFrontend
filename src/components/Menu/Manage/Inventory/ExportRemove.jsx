import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InventoryButtons from "./InventoryButtons";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import { exportRemoveInventory } from "../../../../ReduxStore/InventorySlice";
import Cookies from "js-cookie";

const ExportRemove = () => {
  const [loading, setLoading] = useState(false); // To track API call status

  const [exportRemove, setExportRemove] = useState({
    export: "off",
    remove: "off",
    exportRemove: "inventory only",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "export" || name === "remove") {
      setExportRemove((prev) => ({
        ...prev,
        export: name === "export" ? "on" : "off",
        remove: name === "remove" ? "on" : "off",
      }));
    } else {
      setExportRemove((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const dispatch = useDispatch(); // Initialize dispatch

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Extract data from the current state
    const actionType = exportRemove.export === "on" ? "export" : "delete";
    const exportType =
      exportRemove.exportRemove === "inventory only"
        ? "Inventory"
        : exportRemove.exportRemove === "broadcasts only"
          ? "Broadcast"
          : "Both";

    const payload = {
      actionType,
      exportType,
    };

    // Dispatch the action
    const token = Cookies.get("token");
    try {
      setLoading(true); // Start loading
      await dispatch(exportRemoveInventory({ token, ...payload })).unwrap();
      alert(`Your ${actionType} request for ${exportType} has been submitted to your admin.`);
    } catch (error) {
      console.error("Error during export/remove request:", error);
      alert(error.message);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className={css.inventory}>
      <InventoryButtons />
      <form onSubmit={handleSubmit}>
        <div className={css.inventory_exportRemove}>
          <h1>Export / Remove Inventory</h1>
          <span className={css.inventory_exportRemove_step1}>
            <label htmlFor="">Step 1:</label>
            <div>
              <div className={css.inventory_exportRemove_step1_radioBtn}>
                <div>
                  <input
                    type="radio"
                    name="export"
                    id="export"
                    onChange={handleChange}
                    value="export"
                    checked={exportRemove.export === "on"}
                  />
                  <label>Export</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="remove"
                    id="remove"
                    onChange={handleChange}
                    value="remove"
                    checked={exportRemove.remove === "on"}
                  />
                  <label>Remove</label>
                </div>
              </div>
              <p>*An export link will be emailed to admins on the account</p>
            </div>
          </span>
          <span className={css.inventory_exportRemove_step2}>
            <label htmlFor="">Step 2:</label>
            <p>No inventory to export/remove</p>
          </span>
          <span className={css.inventory_exportRemove_step3}>
            <label htmlFor="">Step 3:</label>
            <span>
              <label>Export/Remove</label>
              <select
                name="exportRemove"
                onChange={handleChange}
                className="p-2"
              >
                <option value="inventory only">Inventory Only</option>
                <option value="all items">All Items</option>
                <option value="broadcasts only">Broadcasts Only</option>
              </select>
            </span>
          </span>
        </div>
        <div className={css.inventory_exportRemove_btn}>
          <button
            type="submit"
            disabled={loading || (exportRemove.export === "off" && exportRemove.remove === "off")} // Disable if no option selected
            className={loading ? "opacity-50 cursor-not-allowed" : " !p-3 rounded-md "}
          >
            {loading ? "Processing..." : "Submit"}
          </button>

        </div>
      </form>
    </div>
  );
};

export default ExportRemove;

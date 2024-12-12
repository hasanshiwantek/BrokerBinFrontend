import React, { useState } from "react";
import InventoryButtons from "./InventoryButtons";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
const ExportRemove = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.export = data.export === "export" ? 1 : 0;
    data.remove = data.remove === "remove" ? 1 : 0;
    console.log(data);
  };
  return (
    <>
      <div className={css.inventory}>
        <InventoryButtons />
        <form onSubmit={handleSubmit}>
          <div className={css.inventory_exportRemove}>
            <h1>export / remove inventory</h1>
            <span className={css.inventory_exportRemove_step1}>
              <label htmlFor="">step 1:</label>
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
                    <label>export</label>
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
                    <label>remove</label>
                  </div>
                </div>
                <p>*An export link will be emailed to admins on the account</p>
              </div>
            </span>
            <span className={css.inventory_exportRemove_step2}>
              <label htmlFor="">step 2:</label>
              {/* <input type="text" /> */}
              <p>no inventory to export / remove</p>
            </span>
            <span className={css.inventory_exportRemove_step3}>
              <label htmlFor="">step 3:</label>
              <span>
                <label>export/remove</label>
                <select name="exportRemove" onChange={handleChange} className="p-2">
                  <option value="inventory only">inventory only</option>
                  <option value="all items">all items</option>
                  <option value="broadcasts only">broadcasts only</option>
                </select>
              </span>
            </span>
          </div>
          <div className={css.inventory_exportRemove_btn}>
            <button type="button">
              <input type="submit" value="Submit" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ExportRemove;

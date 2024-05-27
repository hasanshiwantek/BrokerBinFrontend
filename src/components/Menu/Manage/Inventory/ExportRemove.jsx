import React from "react";
import InventoryButtons from "./InventoryButtons";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
const ExportRemove = () => {
  return (
    <>
      <div className={css.inventory}>
        <InventoryButtons />
        <div className={css.inventory_exportRemove}>
          <h1>export / remove inventory</h1>
          <span className={css.inventory_exportRemove_step1}>
            <label htmlFor="">step 1:</label>
            <div>
              <div className={css.inventory_exportRemove_step1_radioBtn}>
                <div>
                  <input type="radio" name="export" id="export" />
                  <label>export</label>
                </div>
                <div>
                  <input type="radio" name="remove" id="remove" />
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
              <select>
                <option value="inventory only">inventory only</option>
                <option value="all items">all items</option>
                <option value="broadcasts only">broadcasts only</option>
              </select>
            </span>
          </span>
        </div>
          <div className={css.inventory_exportRemove_btn}>
            <button type="button">submit</button>
          </div>
      </div>
    </>
  );
};

export default ExportRemove;

import React from "react";
import css from "../../../styles/SearchProducts.module.css";

const AddToHotList = () => {
  return (
    <div className={css.searchProductAddToHotList}>
      <p>No Match Found</p>
      <div className={css.searchProductAddToHotList_main}>
        <div className={css.searchProductAddToHotList_main_bg}>
          <span>Part # / HECI: SPI350ACAQW</span>
          <div>
            <h4>Update Hotlist Settings</h4>
            <span>
              <input type="checkbox" name="whenAvailable" id="whenAvailable" />
              <label htmlFor="whenAvailable">
                Please notify me when this part is available!
              </label>
            </span>
            <span>
              <input type="checkbox" name="addToHotList" id="addToHotList" />
              <label htmlFor="addToHotList">Add item to Hot List.</label>
            </span>
            <span>
              <input type="checkbox" name="addToCart" id="addToCart" />
              <label htmlFor="addToCart">Add item to Part Cart.</label>
            </span>
          </div>
          <span>
            <button type="button">Save Settings</button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddToHotList;

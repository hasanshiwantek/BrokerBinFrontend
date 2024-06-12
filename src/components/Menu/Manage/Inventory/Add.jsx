import React, { useState } from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import TableAdd from "../../../Tables/TableAdd";
import { inventoryAddTable } from "../../../../data/tableData";
import InventoryButtons from "./InventoryButtons";

const Add = () => {
  const [addInventory, setAddInventory] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObject = Object.fromEntries(formData.entries());
    Object.keys(formDataObject).forEach((key) => {
      if (key !== "addInventory") {
        delete formDataObject[key];
      }
    });
    if (addInventory) {
      const filteredAddInventory = addInventory.filter(
        (e, i) => e.partModel !== ""
      );
      formDataObject.addInventory = filteredAddInventory;
      console.log(formDataObject);
    } else {
      alert(
        "Please fill one of the following fields"
      );
    }
  };
  return (
    <>
      <div className={css.inventory}>
        <InventoryButtons />
        <div className={css.inventory_add_main}>
          <form onSubmit={handleSubmit}>
            <div className={css.inventory_add_main_top}>
              <button type="button">
                <input type="submit" value="save" />
              </button>
              <button type="button">telecom</button>
            </div>
            <TableAdd
              inventoryAddTable={inventoryAddTable}
              handleSubmit={handleSubmit}
              setAddInventory={setAddInventory}
            />
            <div className={css.inventory_add_main_bottom}>
              <button type="button">
                <input type="submit" value="save" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Add;

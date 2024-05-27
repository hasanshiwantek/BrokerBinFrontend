import React from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import TableAdd from "../../../Tables/TableAdd";
import { inventoryAddTable } from "../../../../data/tableData";
import InventoryButtons from "./InventoryButtons";

const Add = () => {
  return (
    <>
      <div className={css.inventory}>
      <InventoryButtons/>
        <div className={css.inventory_add_main}>
          <div className={css.inventory_add_main_top}>
            <button type="button">save</button>
            <button type="button">telecom</button>
          </div>
          <TableAdd inventoryAddTable={inventoryAddTable} />
          <div className={css.inventory_add_main_bottom}>
            <button type="button">save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;

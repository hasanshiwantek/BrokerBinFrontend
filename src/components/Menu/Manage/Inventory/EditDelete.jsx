import React, { useState } from "react";
import inventory from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
// import inventory from "../../../../styles/Menu/Manage/RfqTable.module.inventory";
import TableEditDelete from "../../../Tables/TableEditDelete";
import { inventoryEditDeleteTable } from "../../../../data/tableData";
import InventoryButtons from "./InventoryButtons";

const EditDelete = () => {
  const [toggleHECICLEI, setToggleHECICLE] = useState(false);

  return (
    <div className={inventory.inventory}>
      <InventoryButtons/>
      <div className={inventory.editDeleteTable}>
        <div className={inventory.editDeleteTable_top}>
          <label>view</label>
          <select defaultValue="Inventory">
            <option value="Inventory">Inventory</option>
            <option value="WTB">WTB</option>
            <option value="WTS">WTS</option>
            <option value="RFQ">RFQ</option>
            <option value="All">All</option>
          </select>
          <button
            type="button"
            onClick={() => setToggleHECICLE((prev) => !prev)}
          >
            HECI/CLEI
          </button>
          <span>
            <label>part search</label>
            <input type="search" />
          </span>
          <span>
            <label>mfg</label>
            <input type="text" />
          </span>
          <span>
            <label>status</label>
            <select name="status" id="status">
              <option value="-1">ALL</option>
              <option value="2">Stock</option>
              <option value="1">DIST</option>
              <option value="0">N/A</option>
            </select>
          </span>
          <button type="button">search</button>
        </div>
        <TableEditDelete inventoryEditDeleteTable={inventoryEditDeleteTable} toggleHECICLEI={toggleHECICLEI}/>
        <div className={inventory.editDeleteTable_bottom}>
          <button type="button">delete</button>
          <button type="button">save notifications</button>
          <button type="button">refresh all</button>
        </div>
      </div>
    </div>
  );
};

export default EditDelete;

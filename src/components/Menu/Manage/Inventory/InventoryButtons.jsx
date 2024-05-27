import React from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";

function InventoryButtons() {
  return (
    <div className={css.inventory_btn}>
      <a href="/inventory/Upload">upload</a>
      <a href="/inventory/Edit-Delete">edit/delete</a>
      <a href="/inventory/Add">add</a>
      <a href="/inventory/Export-Remove">export/remove</a>
      <a href="/venblock">block</a>
    </div>
  );
}

export default InventoryButtons;

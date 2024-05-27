import React from 'react'
import InventoryButtons from './InventoryButtons'
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";

const Block = () => {
  return (
    <>
    <div className={css.inventory}>
    <InventoryButtons/>
    </div>
    </>
  )
}

export default Block

import React from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import myProfile from "../../../../styles/Menu/Manage/MyProfile.module.css";
import { NavLink } from "react-router-dom";

function InventoryButtons() {
  return (
    <>
     <div className={css.inventory_btn}>

     <div className={myProfile.profileInfo_links}>
            <ul>
              <li>
                <NavLink
                  to="/inventory/Upload"
                  className={({ isActive }) => (isActive ? myProfile.active : '')}
                >
                  <span>Upload</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/inventory/Edit-Delete"
                  className={({ isActive }) => (isActive ? myProfile.active : '')}
                >
                  <span>Edit/Delete</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/inventory/Add"
                  className={({ isActive }) => (isActive ? myProfile.active : '')}
                >
                  <span>Add</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/inventory/Export-Remove"
                  className={({ isActive }) => (isActive ? myProfile.active : '')}
                >
                  <span>Export/Remove</span>
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/venblock"
                  className={({ isActive }) => (isActive ? myProfile.active : '')}
                >
                  <span>Block</span>
                </NavLink>
              </li> */}
            </ul>
          </div>
    </div> 
    </>

  );
}

export default InventoryButtons;

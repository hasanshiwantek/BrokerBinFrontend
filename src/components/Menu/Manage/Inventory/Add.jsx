import React, { useState } from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import TableAdd from "../../../Tables/TableAdd";
import InventoryButtons from "./InventoryButtons";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const Add = () => {
  const token = Cookies.get("token");

  const { inventoryAddData } = useSelector(
    (state) => state.inventoryStore
  );
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObject = Object.fromEntries(formData.entries());

    // delete all the other keys that are coming from the formData object
    Object.keys(formDataObject).forEach((key) => {
      if (key !== "addInventory") {
        delete formDataObject[key];
      }
    });

    // If addInventory object exist or we can say data is coming from the formData object.
    if (inventoryAddData) {
      // Filtered out those data object where even a single field is filled to processed further.
      const filteredAddInventory = inventoryAddData.filter(
        (e, i) =>
          e.heciClei !== "" ||
          e.mfg !== "" ||
          e.partModel !== "" ||
          e.price !== "" ||
          e.productDescription !== "" ||
          e.quantity !== ""
      );

      // if filteredAddInventory is not an empty array.
      if (filteredAddInventory.length > 0) {
        // check if there are any incomplete fields returns true if exists otherwise false.
        const incompleteRowExists = filteredAddInventory?.some((item) =>
          Object.values(item).some((item) => item === "")
        );

        if (incompleteRowExists) {
          alert(
            "Please fill all fields in a whole row to add to an inventory."
          );
          return;
        }
      } else {
        alert("Please fill in the inventory data.");
        return;
      }

      formDataObject.addInventory = filteredAddInventory

      
    } else {
      alert("Please fill in the inventory data.");
    }

    try {
      const response = await fetch(
        "https://brokerbinbackend.shiwantek.com/api/inventory/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formDataObject),
        }
      );

      if (response.ok) {
        alert("Success to add inventory data.");
      } else {
        alert("Failed to add inventory data.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={css.inventory}>
        <InventoryButtons />
        <div className={css.inventory_add_main}>
          <form onSubmit={handleSubmit}>
            <div className={css.inventory_add_main_top}>
              <button type="button" className="transform active:scale-90 transition-all duration-100 ">
                <input type="submit" value="save"  className="cursor-pointer  p-1 "   />
              </button>
              <button type="button">telecom</button>
            </div>
            <TableAdd />
            <div className={css.inventory_add_main_bottom}>
              <button type="button" className="transform active:scale-90 transition-all duration-100 ">
                <input type="submit" value="save"  className="cursor-pointer p-1 "/>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Add;

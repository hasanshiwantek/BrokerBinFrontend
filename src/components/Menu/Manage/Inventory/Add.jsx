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

    // delete all the other keys that are coming from the formData object
    Object.keys(formDataObject).forEach((key) => {
      if (key !== "addInventory") {
        delete formDataObject[key];
      }
    });

    // If addInventory object exist or we can say data is coming from the formData object.
    if (addInventory) {
      // Filtered out those data object where even a single field in filled to processed further.
      const filteredAddInventory = addInventory.filter(
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
      formDataObject.addInventory = filteredAddInventory;
      console.log(formDataObject);
    } else {
      alert("Please fill in the inventory data.");
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

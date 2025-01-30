
import React, { useState } from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import TableAdd from "../../../Tables/TableAdd";
import InventoryButtons from "./InventoryButtons";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setInventoryAddData } from "../../../../ReduxStore/InventorySlice";

const Add = () => {
  const token = Cookies.get("token");
  const { inventoryAddData } = useSelector((state) => state.inventoryStore);
  const dispatch = useDispatch();
  const [buttonText, setButtonText] = useState("Save");

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const filteredAddInventory = inventoryAddData.filter(
      (e) =>
        e.mfg !== "" ||
        e.partModel !== "" ||
        e.price !== "" ||
        e.productDescription !== "" ||
        e.quantity !== ""
    );
  
    if (filteredAddInventory.length > 0) {
      const incompleteRowExists = filteredAddInventory.some((item) =>
        Object.entries(item).some(([key, value]) =>
          key === "heciClei" ? false : value === "" // Skip heciClei field
        )
      );
  
      if (incompleteRowExists) {
        alert("Please fill all fields in a whole row to add to an inventory.");
        return;
      }
    } else {
      alert("Please fill in the inventory data.");
      return;
    }
  
    setButtonText("Adding Your Inventory...");
  
    try {
      const response = await fetch(
        "https://backend.brokercell.com/api/inventory/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ addInventory: filteredAddInventory }),
        }
      );
  
      if (response.ok) {
        alert("Inventory Added Successfully");
        dispatch(
          setInventoryAddData(
            inventoryAddData.map(() => ({
              partModel: "",
              heciClei: "", // Reset heciClei as empty
              mfg: "",
              price: "",
              quantity: "",
              status: "stock",
              productDescription: "",
              cond: "new",
            }))
          )
        );
      } else {
        alert("Failed to add inventory data.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setButtonText("Save");
    }
  };
  
  return (
    <div className={css.inventory}>
      <InventoryButtons />
      <div className={css.inventory_add_main}>
        <form onSubmit={handleSubmit}>
          <div className={css.inventory_add_main_top}>
            {/* <button
              type="submit"
              className="transform active:scale-90 transition-all duration-100 cursor-pointer  p-1"
            >
              {buttonText}
            </button> */}
          </div>
          <TableAdd />
          <div className={css.inventory_add_main_bottom}>
            <button
              type="submit"
              className="transform active:scale-90 transition-all duration-100 cursor-pointer p-5 text-white border rounded-lg"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;

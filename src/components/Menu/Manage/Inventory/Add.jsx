
import React, { useState } from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import TableAdd from "../../../Tables/TableAdd";
import InventoryButtons from "./InventoryButtons";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setInventoryAddData } from "../../../../ReduxStore/InventorySlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


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
           // ✅ Show success toast with light blue color
            toast.info("Inventory Added successfully!", {
          style: { fontSize:"15px" ,marginTop:"-10px"} , // 

           });
       
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
        toast.error("Failed to Add Inventory.Please Try Again.", {
        });
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
            <ToastContainer position="top-center" autoClose={1000} />
      
    </div>
  );
};

export default Add;

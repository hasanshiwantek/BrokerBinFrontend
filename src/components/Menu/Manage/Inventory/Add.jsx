import React, { useState } from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import TableAdd from "../../../Tables/TableAdd";
import InventoryButtons from "./InventoryButtons";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setInventoryAddData } from "../../../../ReduxStore/InventorySlice";
import PopupAlert from "@/components/Popups/PopupAlert";

const Add = () => {
  const token = Cookies.get("token");
  const { inventoryAddData } = useSelector((state) => state.inventoryStore);
  const dispatch = useDispatch();
  const [buttonText, setButtonText] = useState("Save");
  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });

    setTimeout(() => {
      setPopup((prev) => ({ ...prev, show: false }));
    }, 2000);
  };

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
        Object.entries(item).some(
          ([key, value]) => (key === "heciClei" ? false : value === "") // Skip heciClei field
        )
      );

      // if (incompleteRowExists) {
      //   alert("Please fill all fields in a whole row to add to an inventory.");
      //   return;
      // }
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
        showPopup("success", "Inventory Added successfully!");

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
        showPopup("error", "Failed to Add Inventory.Please Try Again.", {});
      }
    } catch (error) {
      console.log(error);
    } finally {
      setButtonText("Save");
    }
  };

  return (
    <div className={`${css.inventory} !min-w-fit`}>
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
      <PopupAlert
        show={popup.show}
        type={popup.type}
        message={popup.message}
        onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
};

export default Add;

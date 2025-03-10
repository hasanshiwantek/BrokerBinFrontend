import React from "react";
import css from "@/styles/SearchProducts.module.css";
import { addToHotList } from "../../ReduxStore/SearchProductSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import InventorySearch from "../Menu/Search/Inventory/InventorySearch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const AddToHotList = ({ item }) => {
  console.log("Rendered... Hotlist");

  const dispatch = useDispatch();
  const token = Cookies.get("token");

  const itemAddToHotList = (e) => {
    e.preventDefault();
    // Add item to hotlist here
    console.log("Item added to hotlist:", item);
    // ✅ Show success toast with light blue color
    toast.info("Item Added to Hotlist!", {
      style: { fontSize: "17px", marginTop: "-10px" }, // 
    });
    const hotlists = [{ partModel: item }]
    dispatch(addToHotList({ token, hotlists }));
  };

  return (
    <>

      <div className={`${css.hotlistContainer} !flex !flex-col !justify-center !items-center mt-5`}>

        <div className={`${css.searchProductAddToHotList}  `}>
          <p style={{ fontSize: "12pt", fontWeight: "600" }} className="!text-xl"> <span className="text-red-500 font-extrabold"> No Match Found, Try an </span>Advanced Search or Send a Broadcast!</p>
          <div className={css.searchProductAddToHotList_main}>
            <form onSubmit={itemAddToHotList}>
              <div className={`${css.searchProductAddToHotList_main_bg}`}>
                <span className="!text-xl">Part # / HECI: {item}</span>
                <div className="!p-8">
                  <h2 className="text-2xl mb-8">Update Hotlist Settings</h2>
                  <span className="mb-2">
                    <input
                      type="checkbox"
                      name="whenAvailable"
                      id="whenAvailable"
                    />
                    <label htmlFor="whenAvailable">
                      Please notify me when this part is available!
                    </label>
                  </span>
                  <span className="mb-2">
                    <input
                      type="checkbox"
                      name="whenAvailable"
                      id="whenAvailable"
                    />
                    <label htmlFor="whenAvailable">
                      Add item to Hot List!
                    </label>
                  </span>
                  {/* <span>
                <input type="checkbox" name={item} id={item} />
                <label htmlFor={item}>Add item to Hot List.</label>
              </span> */}
                  {/* <span>
                <input type="checkbox" name="addToCart" id="addToCart" />
                <label htmlFor="addToCart">Add item to Part Cart.</label>
              </span> */}
                </div>
                <span>
                  <button type="submit">Save Settings</button>
                </span>
              </div>
            </form>
          </div>
        </div>
        <hr className="text-center text-[#6db0d6] bg-[#6db0d6]  h-1 w-[55em] mt-5" />

        <div className="">
          <InventorySearch />
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default AddToHotList;

import React from "react";
import css from "../../../styles/SearchProducts.module.css";
import { addToHotList } from "../../../ReduxStore/SearchProductSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import InventorySearch from "../Search/Inventory/InventorySearch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const AddToHotList = ({ item }) => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  const itemAddToHotList = (e) => {
    e.preventDefault();
    // Add item to hotlist here
    console.log("Item added to hotlist:", item);
            // ✅ Show success toast with light blue color
            toast.info("Item Added to Hotlist!", {
             style: { fontSize:"17px" ,marginTop:"-10px"} , // 
           });
    const hotlists = [{partModel: item}]
    dispatch(addToHotList({ token, hotlists }));
  };

  return (
    <>
    
    <div className={`${css.searchProductAddToHotList} ml-[47rem] `}>
      <p style={{fontSize:"9pt",fontWeight:"600"}}>No Match Found</p>
      <div className={css.searchProductAddToHotList_main}>
        <form onSubmit={itemAddToHotList}>
          <div className={`${css.searchProductAddToHotList_main_bg}`}>
            <span>Part # / HECI: {item}</span>
            <div>
              <h4>Update Hotlist Settings</h4>
              <span>
                <input
                  type="checkbox"
                  name="whenAvailable"
                  id="whenAvailable"
                />
                <label htmlFor="whenAvailable">
                  Please notify me when this part is available!
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
<div className="ml-[36rem]">
<InventorySearch/>
</div>

      <ToastContainer position="top-center" autoClose={2000} />

    </>

  );
};

export default AddToHotList;

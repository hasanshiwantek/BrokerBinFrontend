import React from "react";
import css from "@/styles/SearchProducts.module.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { setFilterToggle, setPopUpRfq } from "@/ReduxStore/SearchProductSlice";
import MyRFQNew from "../Popups/MyRFQNew";

const ProductTableBtn = React.memo(() => {
        console.log("Rendered From PrdouctTableDetail...");
    
  const { popUpRfq } = useSelector((store) => store.searchProductStore);
  const dispatch = useDispatch();

  const handleShowPopupMyRFQNew = React.useCallback(
    (event) => {
      event.stopPropagation();
      dispatch(setPopUpRfq());
    },
    [dispatch]
  );

  return (
    <div className={css.productTableBtn}>
      <button type="button" onClick={handleShowPopupMyRFQNew}>
        RFQ
      </button>
      {popUpRfq && <MyRFQNew />}
      <button>
        <NavLink to={"/inventory/add"} className="!text-2xl !ml-4">
          Add
        </NavLink>
      </button>
      <button>
        {/* <a href="/cartpart" style={{ fontSize: "1em", color: "#444" }}>Cart</a> */}
      </button>
      <button type="button" onClick={() => dispatch(setFilterToggle())}>
        Filters
      </button>
      {/* <button type="button" onClick={() => dispatch(setGraphToggle())}>
          GraphView
        </button> */}
    </div>
  );
});

export default ProductTableBtn
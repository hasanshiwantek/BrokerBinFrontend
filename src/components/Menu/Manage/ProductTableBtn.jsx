import React, { useState } from "react";
import css from "../../../styles/SearchProducts.module.css";
import MyRFQNew from "../../Popups/MyRFQNew";
const ProductTableBtn = ({setGraphToggle,setFilterToggle}) => {
  const [popUpRfq, setPopUpRfq] = useState(false);

  const handleShowPopupMyRFQNew = (event) => {
    event.stopPropagation(); // Stop the click event from propagating to the document
    setPopUpRfq((prev) => !prev);
  };
  return (
    <div className={css.productTableBtn}>
      <button type="button" onClick={handleShowPopupMyRFQNew}>
        RFQ
      </button>
      {popUpRfq && <MyRFQNew setPopUpRfq={setPopUpRfq} />}
      <button
        type="button"
        onClick={() => setGraphToggle((prev) => !prev)}
      >
        Add
      </button>
      <a href="/cartpart">Cart</a>
      <button type="button" onClick={() => setFilterToggle((prev) => !prev)}>
        Filters
      </button>
      <button type="button" onClick={() => setGraphToggle((prev) => !prev)}>
        Graph View
      </button>
    </div>
  );
};

export default ProductTableBtn;

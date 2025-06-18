import React, { useState } from "react";
import css from "../../styles/Tools/Cart.module.css";

const LearnMore = () => {
  const [infoToggle, setInfoToggle] = useState(true);
  return (
    <div>
      <button
        type="button"
        className={css.cartLayout_info_btn}
        onClick={() => setInfoToggle((prev) => !prev)}
      >
        learn more
      </button>
      {infoToggle && (
        <div className={css.cartLayout_info}>
          <strong className="!font-bold">
            <span>*</span> What is the Part Cart / BOM Utility?
          </strong>
          <p>
            The Part Cart / BOM Utility is a Search Summary/ System
            Configuration Utility.
          </p>
          <strong className="!font-bold">
            <span>*</span>How to use the Part Cart?
          </strong>
          <ol>
            <li>1. Enter Part Number(s) in standard Product Search.</li>
            <li>2. Select (use check box) items of interest, click Add.</li>
            <li>
              3. View, modify, send RFQs or export Parts List Or Search and load
              more items!
            </li>
          </ol>
          <strong className="!font-bold">
            <span>*</span>How to use the BOM Utility
          </strong>
          <ol>
            <li>1. Enter Part Number(s) in multi-search or load BOM list.</li>
            <li>2. Select headings, filter, then process.</li>
            <li>
              3. View, modify, send RFQs or export Parts List Or Search and load
              more items!
            </li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default LearnMore;

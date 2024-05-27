import React from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";

const VenPrice = () => {
  return (
    <div className={css.inventory}>
      <div className={css.vanBlock_vanLink}>
        <a href="/venprice">Vendor Pricing</a>
        <a href="/venblock">block inventory</a>
      </div>
      <div className={css.vanBlock_p}>
        <p>Customize your pricing for any vendor</p>
      </div>
      <div className={css.vanBlock}>
        <div className={css.vanBlock_view}>
          <h1>Vendor Pricing</h1>
        </div>
        <div>
          <h1>block hun bhai 😥🚫</h1>

        </div>
      </div>
    </div>
  );
};

export default VenPrice;

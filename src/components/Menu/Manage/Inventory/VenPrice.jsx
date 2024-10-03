import React from "react";
import css from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import disableicon from "../../../../assets/access-denied.png"
import styles from "../../../../styles/Menu/Tools/Tools.module.css"

const VenPrice = () => {
  return (
    <>
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
          <img src={disableicon} alt="" srcset="" />
        </div>
        <div className={css.vendorContent}>
<p>
Currently you don't have permission
to use this enhanced Vendor Pricing
feature. Our Vendor Pricing option
allows Premier members to display
discount pricing and/or hide pricing
from competitors. Upgrading to a
Premier Membership will allow you
to incorporate this unique pricing
opportunity into your business
transactions.
</p>
<h2>
Please contact your Account
Manager for information on
upgrading your membership.
</h2>

        </div>
    
      </div>
    </div>

      <footer>

    <div className={styles.footerlinks} style={{marginTop:"12px"}}>
        <li><a href="/">Advertising Programs</a></li>
        <li><a href="/">Business Solutions</a></li>
        <li><a href="/">About BrokerBin.com</a></li>
        <li>©2024 Privacy</li>
    </div>
</footer>
    
</>

  );
};

export default VenPrice;

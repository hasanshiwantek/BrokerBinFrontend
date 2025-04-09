import React from "react";
// import "../Components/SiteAllowances.css"
import './SiteColors.css';

const SiteAllowances = () => {
  return (
    <>
      <div style={{ padding: "15px" }} className="site-allowances">
        <h5>Site Allowances and Expirations </h5>

        <div className="site-section">
          <div className="box whitespace-nowrap">
            <p>Searches = Unlimited</p>
            <p>Multiple Search Max = Copy and Paste up to 50 items at a time</p>
            <p>Item Listings = Unlimited line items for Platinum and 100 for</p>
            <p>Standard Membership</p>
            <p>Uploads = Unlimited uploads of inventory</p>
            <p>
              MyVendors List = Select up to 500 vendors you prefer to do
              business
            </p>

            <p> Broadcasts = 10 WTS's, Unlimited WTB's and RFQ's</p>
            <p> Reports = Unlimited Access</p>
            <p>Users = Unlimited Users</p>
            <p> Hot List = Add up to 500 Items to your Hot List</p>
            <p>Broadcast expiration = After 5 days your broadcasts will be</p>
            <p> automatically removed</p>
            <p>
              Inventory expiration = After 9 days your inventory will be removed
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteAllowances;

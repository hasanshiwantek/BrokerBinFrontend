import React from "react";
import "./Icons.css";
import icon2 from "../../../assets/cart.svg";
import icon7 from "../../../assets/hotlist.svg";
import icon16 from "../../../assets/upload.svg";
import icon4 from "../../../assets/contacts.svg";
import icon8 from "../../../assets/my-vendors.svg";
import icon10 from "../../../assets/reports-icon.svg";
import icon13 from "../../../assets/star.svg";
import icon5 from "../../../assets/email.svg";
import icon15 from "../../../assets/unlock-icon.svg";
import icon11 from "../../../assets/search.svg";

const Icons = () => {
  return (
    <>
      <div style={{ padding: "15px" }} id="icons">
        <h5 className="icons-q-head">Icons</h5>

        <div className="icons-links-sec icons-box box">
          <div className="icons-link-sec">
            <img src={icon2} alt="Part Cart" />
            <span>Part Cart allows for quick access to your part cart</span>
          </div>

          <div className="icons-link-sec">
            <img src={icon15} alt="RFQs" />
            <span>Manage your RFQs sent/received or send a new RFQ</span>
          </div>

          <div className="icons-link-sec">
            <img src={icon7} alt="Hot List" />
            <span>
              Hot List, click on it to view items you want to track daily
            </span>
          </div>

          <div className="icons-link-sec">
            <img src={icon16} alt="Upload" />
            <span>Upload allows for quick access to manage your inventory</span>
          </div>

          <div className="icons-link-sec">
            <img src={icon10} alt="Broadcasts" />
            <span>View your history broadcasts sent on the site</span>
          </div>

          <div className="icons-link-sec">
            <img src={icon8} alt="Vendors" />
            <span>
              Allows you to add or remove companies from your MyVendors List
            </span>
          </div>

          <div className="icons-link-sec">
            <img src={icon4} alt="Contacts" />
            <span>
              Allows you to add or remove individuals from your My Contacts List
            </span>
          </div>

          <div className="icons-link-sec">
            <img src={icon11} alt="Searching" />
            <span>Telecom Search feature</span>
          </div>

          <div className="icons-link-sec">
            <img src={icon10} alt="Match Your Hits" />
            <span>
              Match Your Hits allows for quick access to these reports
            </span>
          </div>

          <div className="icons-link-sec">
            <img src={icon13} alt="Feedback" />
            <span>Allows you to submit a Feedback Profile</span>
          </div>

          <div className="icons-link-sec">
            <img src={icon5} alt="Smart Bar" />
            <span>Allows you to manage your Smart Bar</span>
          </div>

          <div className="icons-link-sec">
            <img src={icon15} alt="MFG Filter" />
            <span>Allows you to filter your searches by mfg, no 3rd party</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Icons;

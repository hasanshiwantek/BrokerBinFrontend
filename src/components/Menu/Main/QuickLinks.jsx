import React from "react";
import "./QuickLinks.css";
import icon1 from "../../../assets/broadcastTermsIcon.svg";
import icon2 from "../../../assets/cart.svg";
import icon3 from "../../../assets/condition-icon.svg";
import icon4 from "../../../assets/contacts.svg";
import icon5 from "../../../assets/emailIcon.svg";
import icon6 from "../../../assets/faq-icon.svg";
import icon7 from "../../../assets/hotlistIcon.svg";
import icon8 from "../../../assets/vendorHelpIcon.svg";
import icon9 from "../../../assets/profileIcon.svg";
import icon10 from "../../../assets/reportIcon.svg";
import icon11 from "../../../assets/searching.svg";
import icon12 from "../../../assets/siteColorIcon.svg";
import icon13 from "../../../assets/feedbackStarIcon.svg";
import icon14 from "../../../assets/tools-icon.svg";
import icon15 from "../../../assets/unlockIcon.svg";
import icon16 from "../../../assets/uploadingPart.svg";
import icon17 from "../../../assets/partCartIcon.svg";


const QuickLinks = () => {
  return (
    <>
      <div style={{ padding: "15px" }} id="quicklinks">
        <h5 className="q-head">QuickLinks</h5>

        <div className="links-sec box">
          <div className="link-sec1">
            <div className="link-sec1-sec">
              <img src={icon12} alt="Site Color" />
              <a href="#broadcast">
                <span>Site Color</span>
              </a>
            </div>

            <div className="link-sec1-sec">
              <img src={icon1} alt="Broadcast Terms" />
              <a href="#quicklinks">
                <span>BroadCast Terms</span>
              </a>
            </div>
            <div className="link-sec1-sec">
              <img src={icon15} alt="Site Allowances" />
              <a href="#sitecolors">
                <span>Site Allowances</span>
              </a>
            </div>
            {/* 
            <div className='link-sec1-sec'>
              <img src={icon3} alt="Product Conditions" />
              <span>Product Conditions</span>
            </div> */}

            {/* <div className='link-sec1-sec'>
              <img src={icon14} alt="Tools" />
              <a href="#icons">
              <span>Tools</span>
              </a>
            </div> */}

            <div className="link-sec1-sec">
              <img src={icon10} alt="Reports" />
              <a href="#icons">
                <span>Reports</span>
              </a>
            </div>

            <div className="link-sec1-sec">
              <img src={icon5} alt="Email" />
              <a href="#reports">
                <span>Email</span>
              </a>
            </div>
            
            <div className="link-sec1-sec">
              <img src={icon17} alt="partCart" />
              <a href="#partcart">
                <span>PartCart</span>
              </a>
            </div>

            {/* <div className='link-sec1-sec'>
              <img src={icon6} alt="Miscellaneous" />
              <a href="#misc">
              <span>Miscellaneous</span>
              </a>
            </div> */}
          </div>

          <div className="link-sec2">
            <div className="link-sec2-sec">
              <img src={icon11} alt="Searching" />
              <a href="#email">
                <span>Searching</span>
              </a>
            </div>

            <div className="link-sec2-sec">
              <img src={icon7} alt="Hot List" />
              <a href="#hotlist">
                <span>Hot List</span>
              </a>
            </div>

            <div className="link-sec2-sec">
              <img src={icon16} alt="Uploading Parts" />
              <a href="#uploading">
                <span>Uploading Parts</span>
              </a>
            </div>

            <div className="link-sec2-sec">
              <img src={icon9} alt="My Profile" />
              <a href="#multicast">
                <span>My Profile</span>
              </a>
            </div>

            <div className="link-sec2-sec">
              <img src={icon8} alt="My Vendors" />
              <a href="#vendors">
                <span>My Vendors</span>
              </a>
            </div>

            {/* <div className='link-sec2-sec'>
              <img src={icon4} alt="My Contact" />
              <span>My Contact</span>
            </div> */}

            {/* <div className='link-sec2-sec'>
              <img src={icon2} alt="Part Cart" />
              <span>Part Cart</span>
            </div> */}

            <div className="link-sec2-sec">
              <img src={icon13} alt="Member Feedback" />
              <a href="#feedback">
                <span>Member Feedback</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickLinks;


import React from 'react';
import './QuickLinks.css';
import icon1 from "../../../assets/broadcast.svg";
import icon2 from "../../../assets/cart.svg";
import icon3 from "../../../assets/condition-icon.svg";
import icon4 from "../../../assets/contacts.svg";
import icon5 from "../../../assets/email.svg";
import icon6 from "../../../assets/faq-icon.svg";
import icon7 from "../../../assets/hotlist.svg";
import icon8 from "../../../assets/my-vendors.svg";
import icon9 from "../../../assets/profile-icon.svg";
import icon10 from "../../../assets/reports-icon.svg";
import icon11 from "../../../assets/search.svg";
import icon12 from "../../../assets/site-colors img.svg";
import icon13 from "../../../assets/star.svg";
import icon14 from "../../../assets/tools-icon.svg";
import icon15 from "../../../assets/unlock-icon.svg";
import icon16 from "../../../assets/upload.svg";

const QuickLinks = () => {
  return (
    <>
      <div style={{ padding: '15px' }}>
        <h5 className='q-head'>
          QuickLinks
        </h5>

        <div className="links-sec box">
          <div className="link-sec1">
            <div className='link-sec1-sec'>
              <img src={icon12} alt="Site Color" />
              <span>Site Color</span>
            </div>

            <div className='link-sec1-sec'>
              <img src={icon1} alt="Broadcast Terms" />
              <span>BroadCast Terms</span>
            </div>

            <div className='link-sec1-sec'>
              <img src={icon15} alt="Site Allowances" />
              <span>Site Allowances</span>
            </div>

            <div className='link-sec1-sec'>
              <img src={icon3} alt="Product Conditions" />
              <span>Product Conditions</span>
            </div>

            <div className='link-sec1-sec'>
              <img src={icon14} alt="Tools" />
              <span>Tools</span>
            </div>

            <div className='link-sec1-sec'>
              <img src={icon10} alt="Reports" />
              <span>Reports</span>
            </div>

            <div className='link-sec1-sec'>
              <img src={icon5} alt="Email" />
              <span>Email</span>
            </div>

            <div className='link-sec1-sec'>
              <img src={icon6} alt="Miscellaneous" />
              <span>Miscellaneous</span>
            </div>
          </div>

          <div className="link-sec2">
            <div className='link-sec2-sec'>
              <img src={icon11} alt="Searching" />
              <span>Searching</span>
            </div>

            <div className='link-sec2-sec'>
              <img src={icon7} alt="Hot List" />
              <span>Hot List</span>
            </div>

            <div className='link-sec2-sec'>
              <img src={icon16} alt="Uploading Parts" />
              <span>Uploading Parts</span>
            </div>

            <div className='link-sec2-sec'>
              <img src={icon9} alt="My Profile" />
              <span>My Profile</span>
            </div>

            <div className='link-sec2-sec'>
              <img src={icon8} alt="My Vendors" />
              <span>My Vendors</span>
            </div>

            <div className='link-sec2-sec'>
              <img src={icon4} alt="My Contact" />
              <span>My Contact</span>
            </div>

            <div className='link-sec2-sec'>
              <img src={icon2} alt="Part Cart" />
              <span>Part Cart</span>
            </div>

            <div className='link-sec2-sec'>
              <img src={icon13} alt="Member Feedback" />
              <span>Member Feedback</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuickLinks;

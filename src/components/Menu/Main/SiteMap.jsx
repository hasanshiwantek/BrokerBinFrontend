import React from "react";
import "./SiteMap.css";
import { Link } from "react-router-dom";
import siteIcon from "../../../assets/sitemapdocbullet.gif"; // Import your icon
import styles from "../../../styles/Menu/Search/Person.module.css";
import { useDispatch } from "react-redux";
import { clearUserDetails } from "../../../ReduxStore/UserSlice";
import { resetProfileState } from "../../../ReduxStore/ProfleSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import css from "../../../styles/Menu/Manage/MyProfile.module.css";
import { NavLink } from "react-router-dom";
const SiteMap = () => {
  const year = new Date().getFullYear();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    const isConfirmed = window.confirm("Confirm Logout?");
    if (isConfirmed) {
      dispatch(clearUserDetails());
      dispatch(resetProfileState());
      localStorage.removeItem("user");
      Cookies.remove("token");
      Cookies.remove("user_id");
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <main className="main-sec p-2">
        <nav className="menu-bar ">
          <div className={css.profileInfo_links}>
            <ul>
              <li>
                <NavLink
                  to="/help"
                  end // This ensures the exact match for /myprofile
                  className={({ isActive }) => (isActive ? css.active : "")}
                >
                  <span>Help</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/feedback"
                  className={({ isActive }) => (isActive ? css.active : "")}
                >
                  <span>Contact</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/ethics"
                  className={({ isActive }) => (isActive ? css.active : "")}
                >
                  <span>Ethics</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sitemap"
                  className={({ isActive }) => (isActive ? css.active : "")}
                >
                  <span>Site Map</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/badges"
                  className={({ isActive }) => (isActive ? css.active : "")}
                >
                  <span>Badges</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <div className="sections">
            <div id="box1">
              <ul>
                <Link to={"/"}>
                  <li>
                    <img src={siteIcon} alt="icon" /> Main
                  </li>
                </Link>
                <Link to={"/"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Home
                  </li>
                </Link>
                <Link to={"/help"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Help
                  </li>
                </Link>
                <Link to={"/feedback"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Contact
                  </li>
                </Link>
                <Link to={"/sitemap"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Site Map
                  </li>
                </Link>
              </ul>
            </div>
            <div id="box2">
              <ul>
                <Link to={"/tools"}>
                  <li>
                    <img src={siteIcon} alt="icon" /> Tools
                  </li>
                </Link>
                <Link to={"/myprofile/MyVendors"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> My Vendors
                  </li>
                </Link>
                <Link to={"/hotlist/view"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Hot List
                  </li>
                </Link>
                {/* <Link to={"/tools"}> <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Track Shipment</li></Link> */}
                <Link to={"/cartpart"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Part Cart
                  </li>
                </Link>
                <Link to={"/tools"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> More Tools...
                  </li>
                </Link>
              </ul>
            </div>
            <div id="box3">
              <ul>
                <Link to={"/search/inventory"}>
                  <li>
                    <img src={siteIcon} alt="icon" /> Search
                  </li>
                </Link>
                <Link to={"/search/inventory"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Inventory
                  </li>
                </Link>
                <Link to={"/search/Company"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Company
                  </li>
                </Link>
                <Link to={"/person"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Person
                  </li>
                </Link>
              </ul>
            </div>
            <div id="box4">
              <ul>
                <li>
                  <img src={siteIcon} alt="icon" /> Manage
                </li>
                <Link to={"/inventory"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Manage Inventory
                  </li>
                </Link>
                <Link to={"/inventory/Upload"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Upload
                  </li>
                </Link>
                {/* <Link > <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Email Parts List</li></Link>
                               <Link to={'/help'}> <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Example.xls</li></Link>
                               <Link to={"/help"}> <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Example.csv</li></Link>
                               <Link> <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Auto updated settings</li></Link> */}
                <Link to={"/inventory/Edit-Delete"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Edit
                  </li>
                </Link>
                <Link to={"/inventory/Add"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Add
                  </li>
                </Link>
                <Link to={"/inventory/Export-Remove"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Export/Remove
                  </li>
                </Link>
                <Link to={"/myprofile"}>
                  <li>
                    <img src={siteIcon} alt="icon" /> My Profile
                  </li>
                </Link>
                <Link to={"/myprofile"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Personal Info
                  </li>
                </Link>
                <Link to={"/myprofile/Options"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Options
                  </li>
                </Link>
                <Link to={"/myprofile/broadcastfilter"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> BroadCast
                  </li>
                </Link>
                <Link to={"/reports/email"}>
                  <li style={{ marginLeft: "18px" }}>
                    <img src={siteIcon} alt="icon" /> Email
                  </li>
                </Link>
                <Link to={"/reports/Company"}>
                  <li>
                    <img src={siteIcon} alt="icon" />
                    Supply & Demand
                  </li>
                </Link>
                <Link to={"/reports/Company"}>
                  <li>
                    <img src={siteIcon} alt="icon" /> Multiple Part Search
                  </li>
                </Link>
                <Link to={"/myprofile/MyVendors"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> My Vendors
                  </li>
                </Link>
                <Link to={"/myprofile/broadcastfilter"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" />
                    Broadcast Filters
                  </li>
                </Link>
                <Link to={"/mycompany"}>
                  <li>
                    <img src={siteIcon} alt="icon" />
                    Company Profile
                  </li>
                </Link>
                <Link to={"/mycompany"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" />
                    Company Info
                  </li>
                </Link>
                <Link to={"/companyContacts"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Contacts
                  </li>
                </Link>
                <Link to={"/mycompany"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Options [Admin]
                  </li>
                </Link>
                {/* <Link>  <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Billing Info [Admin]</li></Link>
                               <Link> <li style={{ marginLeft: "14px" }}><img src={siteIcon} alt="icon" /> Accounts [Admin]</li></Link> */}
              </ul>
            </div>
            <div id="box5">
              <ul>
                <Link to={"/reports/email"}>
                  <li>
                    <img src={siteIcon} alt="icon" /> Reports
                  </li>
                </Link>
                <Link to={"/reports/Company"}>
                  <li style={{ marginLeft: "10px" }}>
                    <img src={siteIcon} alt="icon" /> Company
                  </li>
                </Link>
                <Link to={"/reports/Company"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Company Inventory
                  </li>
                </Link>
                <Link to={"/reports/Company"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> My Inventory
                  </li>
                </Link>
                <Link to={"/broadcasts?type=wtb"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Want To Buy
                  </li>
                </Link>
                <Link to={"/broadcasts?type=wts"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Want To Sell
                  </li>
                </Link>
                <Link to={"/reports/Company"}>
                  <li styl e={{ marginLeft: "14px" }}>
                    <img src={siteIcon} alt="icon" />
                    MYH Basic
                  </li>
                </Link>
                <Link to={"/reports/Company"}>
                  <li style={{ marginLeft: "14px" }}>
                    <img src={siteIcon} alt="icon" /> MYH Detailed
                  </li>
                </Link>
                <Link to={"/myprofile/MyContact"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> show My Vendors
                  </li>
                </Link>
                <Link to={"/reports/sitewide"}>
                  <li>
                    <img src={siteIcon} alt="icon" /> SiteWide
                  </li>
                </Link>
                <Link to={"/reports/sitewide"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" />
                    Top 200 - 30 Days
                  </li>
                </Link>
                <Link to={"/reports/sitewide"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Top 200 - 7 Days
                  </li>
                </Link>
                <Link to={"/reports/sitewide"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" />
                    Top 200 Yesterday
                  </li>
                </Link>
                <Link to={"/broadcasts?type=wtb"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" />
                    Want To Buy
                  </li>
                </Link>
                <Link to={"/broadcasts?type=wts"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" />
                    Want To Sell
                  </li>
                </Link>
                <Link to={"/reports/sitewide"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" />
                    Supply & Demand
                  </li>
                </Link>
                <Link to={"/reports/Company"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Company Inventory
                  </li>
                </Link>
                <Link to={"/reports/email"}>
                  <li>
                    <img src={siteIcon} alt="icon" /> Email
                  </li>
                </Link>
              </ul>
            </div>
            <div id="box6">
              <ul>
                <Link to={"/broadcasts"}>
                  <li>
                    <img src={siteIcon} alt="icon" /> Broadcast
                  </li>
                </Link>
                <Link to={"/sendbroad"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Send Broadcast
                  </li>
                </Link>
                <Link to={"/broadcasts"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> View
                  </li>
                </Link>
                <Link to={"/broadcasts"}>
                  <li style={{ marginLeft: "30px" }}>
                    <img src={siteIcon} alt="icon" /> Want to buy
                  </li>
                </Link>
                <Link to={"/broadcasts"}>
                  <li style={{ marginLeft: "30px" }}>
                    <img src={siteIcon} alt="icon" /> Want to sell
                  </li>
                </Link>

                <Link to={"/myprofile/broadcastfilter"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> Set Filters
                  </li>
                </Link>
                <Link to={"/broadcasthistory"}>
                  <li style={{ marginLeft: "20px" }}>
                    <img src={siteIcon} alt="icon" /> History
                  </li>
                </Link>
              </ul>
            </div>
            <div id="box7">
              <ul onClick={handleLogout}>
                <li>
                  <img src={siteIcon} alt="icon" /> Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="footer-content">
            <p>Copyright {year} Brokercell.com</p>
            <Link to={"/feedback"}>
              <p>Questions / Comments</p>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default SiteMap;

import React from 'react'
import "../Main/MenuBar.css"
import styles from "../../../styles/Menu/Tools/Tools.module.css"
import { Link } from 'react-router-dom'
import eventimg from "../../../assets/ToolsIcons/events.jpg"
import additionalimg from "../../../assets/ToolsIcons/additional_products.jpg"
import pracimg from "../../../assets/ToolsIcons/best_practices.jpg"
import tradeimg from "../../../assets/ToolsIcons/safe_trading.jpg"
import siteimg from "../../../assets/ToolsIcons/site_protocol.jpg"
import webimg from "../../../assets/ToolsIcons/webinar.jpg"
import inv1 from "../../../assets/BrokerCell.com member with gray background.svg"
import inv2 from "../../../assets/BrokerCell.com member with white background.svg"
import inv4 from "../../../assets/BrokerCell.com MyVendors with white background.svg"
import css from "../../../styles/Menu/Manage/MyProfile.module.css";
import { NavLink } from "react-router-dom";
const Tools = () => {
  return (
    <>
      <main>
        <nav className='menu-bar'>
          <div className={css.profileInfo_links}>
            <ul>
              <li>
                <NavLink
                  to="/tools"
                  end  // This ensures the exact match for /myprofile
                  className={({ isActive }) => (isActive ? css.active : '')}
                >
                  <span>Tools</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/myprofile/MyContact'}
                  className={({ isActive }) => (isActive ? css.active : '')}
                >
                  <span>My Vendors</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/hotlist/add"}
                  className={({ isActive }) => (isActive ? css.active : '')}
                >
                  <span>Hotlist</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>



        {/* Main content with cards */}
        <div className={styles.toolsContainer}>
          <div className={styles.toolCard}>
            <img src={eventimg} alt="Events" />
            <h3>Events</h3>
            <ul>
              <li>Brokercell Roadshow</li>
              <li>Roadshow Checklist</li>
            </ul>
          </div>

          <div className={styles.toolCard}>
            <img src={additionalimg} alt="Additional Products" />
            <h3>Additional Products</h3>
            <ul>
              <li>Product Guide</li>
            </ul>
          </div>

          <div className={styles.toolCard}>
            <img src={pracimg} alt="Best Practices" />
            <h3>Best Practices</h3>
            <ul>
              <li>Seller Best Practices</li>
              <li>Buyer Best Practices</li>
            </ul>
          </div>

          <div className={styles.toolCard}>
            <img src={webimg} alt="How To Videos" />
            <h3>How To Videos</h3>
            <ul>
              <li>How To Videos</li>
              <li>Webinars</li>
              <li>Brokercell YouTube</li>
            </ul>
          </div>

          <div className={styles.toolCard}>
            <img src={siteimg} alt="Site Protocols" />
            <h3>Site Protocols</h3>
            <ul>
              <NavLink to={"/help"}>
              <li>
                Help
              </li>
              </NavLink>
              <li>Inventory Protocol</li>
            </ul>
          </div>

          <div className={styles.toolCard}>
            <img src={tradeimg} alt="Safe Trading Center" />
            <h3>Safe Trading Center</h3>
            <ul>
              <NavLink  to={"/ethics"}>
              <li >Ethics</li>
              </NavLink>
              <li>Ethics Committee Review</li>
              <li>Qualifications</li>
              <NavLink to={"https://brokercell.com/legal/"} target='_blank'>
              <li>Terms of Service</li>
              </NavLink>
              <NavLink to={"/safe_trading"}>
              <li>Safe Trading</li>
              </NavLink>
            </ul>
          </div>
        </div>
      </main>

      <footer>
        <div className={styles.badgesContainer}>
          <div className={styles.badgeText}>
            <h2>Member Badges <span className={styles.now}>NOW Available!</span></h2>
            <a href="/badges" className={styles.viewAllLink}>Click to View All</a>
          </div>

          <div className={styles.badgeIcons}>
            <img src={inv4} alt="Badge 3" className={styles.badgeIcon} />
            <img src={inv1} alt="Badge 1" className={styles.badgeIcon} />
            <img src={inv2} alt="Badge 2" className={styles.badgeIcon} />
          </div>
        </div>


      </footer>
    </>
  )
}

export default Tools;
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
import inv1 from "../../../assets/inv1.png"
import inv2 from "../../../assets/inv2.png"
import inv4 from "../../../assets/inv4.png"

const Tools = () => {
  return (
    <>
     <main>
            <nav className='menu-bar'>
                <ul>
                    <li>
                        <Link to={'/tools'}>Tools</Link>
                    </li>
                    <li>
                        <Link to={'/myprofile/MyVendors'}>My Vendors</Link>
                    </li>
                    <li>
                        <Link to={'/myprofile/MyContact'}>My Contacts</Link>
                    </li>
                    <li> <Link to={"/hotlist/add"}>HotList</Link> </li>
                    <li>
                        <Link to={'/'}>Partners</Link>
                    </li>
                    <li>
                        <Link to={'/'}>Events</Link>
                    </li>
                </ul>
            </nav>

   {/* Main content with cards */}
   <div className={styles.toolsContainer}>
          <div className={styles.toolCard}>
            <img src={eventimg} alt="Events" />
            <h3>Events</h3>
            <ul>
              <li>BrokerBin Roadshow</li>
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
              <li>BrokerBin YouTube</li>
            </ul>
          </div>

          <div className={styles.toolCard}>
            <img src={siteimg} alt="Site Protocols" />
            <h3>Site Protocols</h3>
            <ul>
              <li>Help</li>
              <li>Inventory Protocol</li>
            </ul>
          </div>

          <div className={styles.toolCard}>
            <img src={tradeimg} alt="Safe Trading Center" />
            <h3>Safe Trading Center</h3>
            <ul>
              <li>Ethics</li>
              <li>Ethics Committee Review</li>
              <li>Qualifications</li>
              <li>Terms of Service</li>
              <li>Safe Trading</li>
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

    <div className={styles.footerlinks}>
        <li><a href="/">Advertising Programs</a></li>
        <li><a href="/">Business Solutions</a></li>
        <li><a href="/">About BrokerBin.com</a></li>
        <li>©2024 Privacy</li>
    </div>
            </footer>
    </>
  )
}

export default Tools
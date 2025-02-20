
import React from 'react'
import "./MenuBar.css"
import "./Badges.css"
import { Link } from 'react-router-dom'
import inv1 from "../../../assets/BrokerCell.com member with gray background.svg"
import inv2 from "../../../assets/BrokerCell.com member with white background.svg"
import inv3 from "../../../assets/BrokerCell.com MyVendors with white background.svg"
import inv4 from "../../../assets/BrokerCell.com member with dark gray background.svg"
import inv5 from "../../../assets/BrokerCell.com member with dark gray background.svg"
import inv6 from "../../../assets/BrokerCell.com MyVendors with dark gray background.svg"
import css from "../../../styles/Menu/Manage/MyProfile.module.css";
import { NavLink } from "react-router-dom";
const Badges = () => {

  // Function to copy to clipboard and show alert
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  }

  return (
    <>
      <main>
        <nav className='menu-bar'>
          <div className={css.profileInfo_links}>
            <ul>
              <li>
                <NavLink
                  to="/help"
                  end  // This ensures the exact match for /myprofile
                  className={({ isActive }) => (isActive ? css.active : '')}
                >
                  <span>Help</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/feedback"
                  className={({ isActive }) => (isActive ? css.active : '')}
                >
                  <span>Contact</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/ethics"
                  className={({ isActive }) => (isActive ? css.active : '')}
                >
                  <span>Ethics</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sitemap"
                  className={({ isActive }) => (isActive ? css.active : '')}
                >
                  <span>Site Map</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/badges"
                  className={({ isActive }) => (isActive ? css.active : '')}
                >
                  <span>Badges</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <div className='badge-section'>

          <div className='badge-sec'>
            <h1>Ready-to-Use Badges for Members</h1>
            <p>If you're affiliated with BrokerCell.com and wish to showcase your membership, you're welcome to do so. Simply copy and paste any of the badge code snippets provided below into your website or email signature. Should you encounter any issues or have questions about implementation, don’t hesitate to contact us. We’re here to assist every step of the way.</p>

            <div className='select-sec'>
              <label htmlFor="badge-select">Select Type: </label>
              <select id="badge-select" name="badge-select">
                <option value="default">Default Badges</option>
              </select>
            </div>

          </div>

          <div className="inv-column">

            <div className="inventory-sec1">

              {/* 1 */}
              <div>
                <div className='sec1'>
                  <h1>See all our inventory on Brokercell.com:</h1>
                  <img src={inv1} alt="inv1" srcset="" />
                  <p>Copy the code and then paste it into your blog or web page:</p>
                  <textarea name="text-area" id="" readOnly value='<ahref="https://members.brokercell.com/?loc=invensearch&company=N-T+Spares+Sourcing"><img src="//members.brokercell.com/badge.php?cid=vY5XJJ3uM84%3D&pid=1&ptype=default" alt="Brokercell.com Member" border="0" /></a>' />
                </div>
                <div>
                  <button className='inv-btn' onClick={() => copyToClipboard('<ahref="https://members.brokercell.com/?loc=invensearch&company=N-T+Spares+Sourcing"><img src="//members.brokercell.com/badge.php?cid=vY5XJJ3uM84%3D&pid=1&ptype=default" alt="Brokercell.com Member" border="0" /></a>')}>Copy to Clipboard</button>
                </div>
              </div>

              {/* 2 */}
              <div className='sec1'>
                <h1>Brokercell.com member with white background:</h1>
                <img src={inv2} alt="inv2" srcset="" />
                <p>Copy the code and then paste it into your blog or web page:</p>
                <textarea name="text-area" id="" readOnly value='<a href="https://members.brokercell.com/"><img src="//members.brokercell.com/badge.php?cid=vY5XJJ3uM84%3D&pid=3&ptype=default" alt="Brokercell.com Member" border="0" /></a>' />
                <div>
                  <button className='inv-btn' onClick={() => copyToClipboard('<a href="https://members.brokercell.com/"><img src="//members.brokercell.com/badge.php?cid=vY5XJJ3uM84%3D&pid=3&ptype=default" alt="Brokercell.com Member" border="0" /></a>')}>Copy to Clipboard</button>
                </div>
              </div>

              {/* 3 */}
              <div className='sec1'>
                <h1>Brokercell.com MyVendors with white background:</h1>
                <img src={inv3} alt="inv3" srcset="" />
                <p>Copy the code and then paste it into your blog or web page:</p>
                <textarea name="text-area" id="" readOnly value='<a href="https://members.brokercell.com/?loc=myprofile&type=My%20Vendors&add=vY5XJJ3uM84%3D&change=1#vY5XJJ3uM84%3D"><img src="//members.brokercell.com/badge.php?cid=vY5XJJ3uM84%3D&pid=5&ptype=default" alt="Brokercell.com Member" border="0" /></a>' />
                <div>
                  <button className='inv-btn' onClick={() => copyToClipboard('<a href="https://members.brokercell.com/?loc=myprofile&type=My%20Vendors&add=vY5XJJ3uM84%3D&change=1#vY5XJJ3uM84%3D"><img src="//members.brokercell.com/badge.php?cid=vY5XJJ3uM84%3D&pid=5&ptype=default" alt="Brokercell.com Member" border="0" /></a>')}>Copy to Clipboard</button>
                </div>
              </div>

            </div>

            <div className="inventory-sec2">

              {/* 4 */}
              <div className='sec1'>
                <h1>Brokercell.com member with black background:</h1>
                <img src={inv4} alt="inv4" srcset="" />
                <p>Copy the code and then paste it into your blog or web page:</p>
                <textarea name="text-area" id="" readOnly value='<a href="https://members.brokercell.com/"><img src="//members.brokercell.com/badge.php?cid=vY5XJJ3uM84%3D&pid=2&ptype=default" alt="Brokercell.com Member" border="0" /></a>' />
                <div>
                  <button className='inv-btn' onClick={() => copyToClipboard('<a href="https://members.brokercell.com/"><img src="//members.brokercell.com/badge.php?cid=vY5XJJ3uM84%3D&pid=2&ptype=default" alt="Brokercell.com Member" border="0" /></a>')}>Copy to Clipboard</button>
                </div>
              </div>

              {/* 5 */}
              <div className='sec1'>
                <h1>Brokercell.com member with gray background:</h1>
                <img src={inv5} alt="inv5" srcset="" />
                <p>Copy the code and then paste it into your blog or web page:</p>
                <textarea name="text-area" id="" readOnly value='<a href="https://members.brokercell.com/"><img src="//members.brokercell.com/badge.php?cid=vY5XJJ3uM84%3D&pid=4&ptype=default" alt="Brokercell.com Member" border="0" /></a>' />
                <div>
                  <button className='inv-btn' onClick={() => copyToClipboard('<a href="https://members.brokercell.com/"><img src="//members.brokercell.com/badge.php?cid=vY5XJJ3uM84%3D&pid=4&ptype=default" alt="Brokercell.com Member" border="0" /></a>')}>Copy to Clipboard</button>
                </div>
              </div>

              {/* 6 */}
              <div className='sec1'>
                <h1>Brokercell.com MyVendors with gray background:</h1>
                <img src={inv6} alt="inv6" srcset="" />
                <p>Copy the code and then paste it into your blog or web page:</p>
                <textarea name="text-area" id="" readOnly value='<a href="https://members.brokercell.com/?loc=myprofile&type=My%20Vendors&add=vY5XJJ3uM84%3D&change=1#vY5XJJ3uM84%3D"><img src="//members.brokercell.com/badge.php?cid=vY5XJJ3uM84%3D&pid=6&ptype=default" alt="Brokercell.com Member" border="0" /></a>' />
                <div>
                  <button className='inv-btn' onClick={() => copyToClipboard('<a href="https://members.brokercell.com/?loc=myprofile&type=My%20Vendors&add=vY5XJJ3uM84%3D&change=1#vY5XJJ3uM84%3D"><img src="//members.brokercell.com/badge.php?cid=vY5XJJ3uM84%3D&pid=6&ptype=default" alt="Brokercell.com Member" border="0" /></a>')}>Copy to Clipboard</button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </main>


    </>
  )
}

export default Badges

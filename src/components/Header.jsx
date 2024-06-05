import { memo } from "react";
import React, { useState } from "react";
import css from "../styles/Header.module.css";
import logo from "../imgs/logo/broker_header_logo.jpg";
import { AiFillFile, AiOutlineMail, AiOutlinePlus } from "react-icons/ai";
import {
  BsCartFill,
  BsClockFill,
  BsFillTelephonePlusFill,
  BsPersonFill,
  BsStarFill,
  BsToggleOff,
  BsToggleOn,
  BsTools,
} from "react-icons/bs";
import { MdFileUpload } from "react-icons/md";
import { FiTarget } from "react-icons/fi";
import { BiLogOut, BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove the token from local storage
    Cookies.remove('token');
    navigate("/login", { replace: true }); // Redirect to the login page and replace the history
  };

  return (
    <>
      <div className={css.headerFixed}>
        <header className={css.header}>
          <a href="/" id={css.logo}>
            <img src={logo} alt="logo" />
          </a>
          <div className={css.search_container}>
            <input
              type="search"
              name="search"
              id={css.search}
              placeholder="What are you looking for?"
            />
            <button type="button" className={css.search_btn}>
              search
            </button>
            <button type="button" className={css.search_btn}>
              keyword
            </button>
          </div>
        </header>
        <nav>
          <ul className={css.nav_links}>
            <li className={css.nav_links_Hamburger}>
              <GiHamburgerMenu />
            </li>
            <li>
              <BsTools />
              <BiSolidDownArrow className={css.onHoverMenuIconDown} />
              <BiSolidUpArrow
                //
                className={css.onHoverMenuIconUp}
              />
            </li>
            <li>
              <a href="/">main</a>
              <BiSolidDownArrow className={css.onHoverMenuIconDown} />
              <BiSolidUpArrow className={css.onHoverMenuIconUp} />
              <div className={css.dropdownMenu}>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="#">help</a>
                  </li>
                  <li>
                    <a href="#">contact</a>
                  </li>
                  <li>
                    <a href="#">ethics</a>
                  </li>
                  <li>
                    <a href="#">site map</a>
                  </li>
                  <li>
                    <a href="#">badges</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="/">tools</a>
              <BiSolidDownArrow className={css.onHoverMenuIconDown} />
              <BiSolidUpArrow className={css.onHoverMenuIconUp} />
              <div className={css.dropdownMenu}>
                <ul>
                  <li>
                    <a href="#">Tools</a>
                  </li>
                  <li>
                    <a href="#">My Vendors</a>
                  </li>
                  <li>
                    <a href="#">My Contacts</a>
                  </li>
                  <li>
                    <a href="#">Hot List</a>
                  </li>
                  <li>
                    <a href="#">Partners</a>
                  </li>
                  <li>
                    <a href="#">Events</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="/search">search</a>
              <BiSolidDownArrow className={css.onHoverMenuIconDown} />
              <BiSolidUpArrow className={css.onHoverMenuIconUp} />
              <div className={css.dropdownMenu}>
                <ul>
                  <li>
                    <a href="/advanced">inventory</a>
                  </li>
                  <li>
                    <a href="#">services</a>
                  </li>
                  <li>
                    <a href="#">company</a>
                  </li>
                  <li>
                    <a href="#">person</a>
                  </li>
                  <li>
                    <a href="#">techSpecs</a>
                  </li>
                  <li>
                    <a href="#">nsn</a>
                  </li>
                  <li>
                    <a href="#">alt#</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="/">manage</a>
              <BiSolidDownArrow className={css.onHoverMenuIconDown} />
              <BiSolidUpArrow className={css.onHoverMenuIconUp} />
              <div className={css.dropdownMenu}>
                <ul>
                  <li>
                    <a href="/inventory">Inventory</a>
                  </li>
                  <li>
                    <a href="rfq">My RFQs</a>
                  </li>
                  <li>
                    <a href="#">My Contacts</a>
                  </li>
                  <li>
                    <a href="#">My BOM</a>
                  </li>
                  <li>
                    <a href="/myprofile">My Profile</a>
                  </li>
                  <li>
                    <a href="#">My Company</a>
                  </li>
                  <li>
                    <a href="#">My Services</a>
                  </li>
                  <li>
                    <a href="/venprice">Vendor Pricing</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="/">reports</a>
              <BiSolidDownArrow className={css.onHoverMenuIconDown} />
              <BiSolidUpArrow className={css.onHoverMenuIconUp} />
              <div className={css.dropdownMenu}>
                <ul>
                  <li>
                    <a href="#">Company</a>
                  </li>
                  <li>
                    <a href="#">Site Wide</a>
                  </li>
                  <li>
                    <a href="#">Email</a>
                  </li>
                  <li>
                    <a href="#">Service Directory Stats</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="/">broadcast</a>
              <BiSolidDownArrow className={css.onHoverMenuIconDown} />
              <BiSolidUpArrow className={css.onHoverMenuIconUp} />
              <div className={css.dropdownMenu}>
                <ul>
                  <li>
                    <a href="#">send</a>
                  </li>
                  <li>
                    <a href="#">view</a>
                  </li>
                  <li>
                    <a href="#">set filters</a>
                  </li>
                  <li>
                    <a href="#">history</a>
                  </li>
                </ul>
              </div>
            </li>
            <li onClick={handleLogout}>
              <BiLogOut />
              logout
            </li>
          </ul>
          <ul className={css.nav_tools}>
            <li>
              tools
              {toggle ? (
                <button
                  type="button"
                  onClick={() => setToggle(!toggle)}
                  className="tools-toggle"
                >
                  <BsToggleOn style={{ color: "white" }} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setToggle(!toggle)}
                  className="tools-toggle"
                >
                  <BsToggleOff style={{ color: "white" }} />
                </button>
              )}
            </li>
            {toggle && (
              <>
                <li>
                  <AiOutlineMail />
                </li>
                <li>
                  <BsFillTelephonePlusFill />
                </li>
                <li>
                  <a href="/cartpart">
                    <BsCartFill />
                  </a>
                </li>
                <li>
                  <BsClockFill />
                </li>
                <li>
                  <BsStarFill />
                </li>
                <li>
                  <BsPersonFill />
                </li>
                <li>
                  <AiFillFile />
                </li>
                <li>
                  <MdFileUpload />
                </li>
                <li>
                  <FiTarget />
                </li>
                <li className={css.navbar_search_options}>
                  <select>
                    <option value="">MFG Filter</option>
                    <option value="3COM">3COM</option>
                    <option value="APPLE">APPLE</option>
                    <option value="CISCO">CISCO</option>
                    <option value="COMPAQ">COMPAQ</option>
                    <option value="DEC">DEC</option>
                    <option value="DELL">DELL</option>
                    <option value="FUJITSU">FUJITSU</option>
                    <option value="HP">HP</option>
                    <option value="IBM">IBM</option>
                    <option value="INTEL">INTEL</option>
                    <option value="LENOVO">LENOVO</option>
                    <option value="LEXMARK">LEXMARK</option>
                    <option value="NEC">NEC</option>
                    <option value="SEAGATE">SEAGATE</option>
                    <option value="SUN">SUN</option>
                    <option value="TOSHIBA">TOSHIBA</option>
                  </select>
                </li>
                <li>
                  <AiOutlinePlus
                    style={{
                      color: "#3700ff",
                    }}
                  />
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default memo(Header);

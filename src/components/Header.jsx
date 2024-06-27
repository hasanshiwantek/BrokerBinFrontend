import { memo, useEffect, useRef } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  setMobileNavToggle,
  setDropdownOpen,
  setToolToggle,
} from "../ReduxStore/HomeSlice";

const Header = () => {
  const { mobileNavToggle, dropdownOpen, toolToggle } = useSelector(
    (state) => state.homeStore
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove the token from local storage
    Cookies.remove("token");
    Cookies.remove("user_id");
    navigate("/login", { replace: true }); // Redirect to the login page and replace the history
  };

  const handleDropdownToggle = (menu) => {
    dispatch(setDropdownOpen(menu));
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     const menu = document.querySelector(`.${css.nav_Mobile}`);
  //     if (menu && !menu.contains(event.target)) {
  //       dispatch(setMobileNavToggle());
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, [setMobileNavToggle]);

  return (
    <>
      <div className={`${css.headerFixed} ${css.noPrint}`}>
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
        <nav className={css.nav}>
          <ul className={css.nav_links}>
            <li className={css.nav_links_Hamburger}>
              <GiHamburgerMenu onClick={() => dispatch(setMobileNavToggle())} />

              {mobileNavToggle && (
                <div className={css.nav_Mobile_bg}>
                  <nav className={css.nav_Mobile}>
                    <button
                      type="button"
                      id={css.closeMobileMenu}
                      onClick={() => dispatch(setMobileNavToggle())}
                    >
                      X
                    </button>
                    <ul className={css.nav_Mobile_links}>
                      {/* <li>
              <BsTools />
              <BiSolidDownArrow className={css.onHoverMenuIconDown} />
              <BiSolidUpArrow className={css.onHoverMenuIconUp} />
            </li> */}
                      <li>
                        <div onClick={() => handleDropdownToggle("main")}>
                          <a>main</a>
                          {dropdownOpen.main ? (
                            <BiSolidUpArrow />
                          ) : (
                            <BiSolidDownArrow />
                          )}
                        </div>
                        {dropdownOpen.main && (
                          <div className={css.nav_Mobile_links_ul}>
                            <ul>
                              <a href="/">
                                <li>Home</li>
                              </a>
                              <a href="#">
                                <li>help</li>
                              </a>
                              <a href="#">
                                <li>contact</li>
                              </a>
                              <a href="#">
                                <li>ethics</li>
                              </a>
                              <a href="#">
                                <li>site map</li>
                              </a>
                              <a href="#">
                                <li>badges</li>
                              </a>
                            </ul>
                          </div>
                        )}
                      </li>
                      <li>
                        <div onClick={() => handleDropdownToggle("search")}>
                          <a>search</a>
                          {dropdownOpen.main ? (
                            <BiSolidUpArrow />
                          ) : (
                            <BiSolidDownArrow />
                          )}
                        </div>
                        {dropdownOpen.search && (
                          <div className={css.nav_Mobile_links_ul}>
                            <ul>
                              <a href="/advanced">
                                <li>inventory</li>
                              </a>
                              <a href="#">
                                <li>services</li>
                              </a>

                              <a href="#">
                                <li>company</li>
                              </a>

                              <a href="#">
                                <li>person</li>
                              </a>

                              <a href="#">
                                <li>techSpecs</li>
                              </a>

                              <a href="#">
                                <li>nsn</li>
                              </a>

                              <a href="#">
                                <li>alt</li>
                              </a>
                            </ul>
                          </div>
                        )}
                      </li>
                      <li>
                        <div onClick={() => handleDropdownToggle("manage")}>
                          <a>manage</a>
                          {dropdownOpen.main ? (
                            <BiSolidUpArrow />
                          ) : (
                            <BiSolidDownArrow />
                          )}
                        </div>
                        {dropdownOpen.manage && (
                          <div className={css.nav_Mobile_links_ul}>
                            <ul>
                              <a href="/inventory">
                                <li>Inventory</li>
                              </a>
                              <a href="rfq">
                                <li>My RFQs</li>
                              </a>
                              <a href="#">
                                <li>My Contacts</li>
                              </a>
                              <a href="#">
                                <li>My BOM</li>
                              </a>
                              <a href="/myprofile">
                                <li>My Profile</li>
                              </a>
                              <a href="#">
                                <li>My Company</li>
                              </a>
                              <a href="#">
                                <li>My Services</li>
                              </a>
                              <a href="/venprice">
                                <li>Vendor Pricing</li>
                              </a>
                            </ul>
                          </div>
                        )}
                      </li>
                      <li onClick={handleLogout}>
                        <BiLogOut />
                        logout
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </li>
            <li>
              <BsTools />
              <BiSolidDownArrow className={css.onHoverMenuIconDown} />
              <BiSolidUpArrow className={css.onHoverMenuIconUp} />
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
            {/* <li>
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
            </li> */}
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
            {/* <li>
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
            </li> */}
            {/* <li>
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
            </li> */}
            <li onClick={handleLogout}>
              <BiLogOut />
              logout
            </li>
          </ul>
          <ul className={css.nav_tools}>
            <li>
              tools
              {toolToggle ? (
                <button
                  type="button"
                  onClick={() => dispatch(setToolToggle())}
                  className="tools-toggle"
                >
                  <BsToggleOn style={{ color: "white" }} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => dispatch(setToolToggle())}
                  className="tools-toggle"
                >
                  <BsToggleOff style={{ color: "white" }} />
                </button>
              )}
            </li>
            {toolToggle && (
              <>
                {/* <li>
                  <AiOutlineMail />
                </li>
                <li>
                  <BsFillTelephonePlusFill />
                </li> */}
                <li>
                  <a href="/cartpart">
                    <BsCartFill />
                  </a>
                </li>
                {/* <li>
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
                </li> */}
                <li className={css.navbar_search_options}>
                  <select name="navbarSearchOptions">
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

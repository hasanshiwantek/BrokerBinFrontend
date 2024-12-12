import { memo, useEffect, useState } from "react";
import React from "react";
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
  BsDatabaseFill ,
  BsPeopleFill,
  // FaCoins,
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
import {
  searchProductHistory,
  searchProductQuery,
  setSelectedProducts,
} from "../ReduxStore/SearchProductSlice";
import { Link } from "react-router-dom";

import dp1 from "../assets/drop-down1.svg"
import dp2 from "../assets/drop-down-2.svg"
import dp3 from "../assets/drop-down3.svg"
import dp4 from "../assets/drop-down4.svg"
import dp5 from "../assets/drop-down5.svg"
import dp6 from "../assets/drop-down6.svg"
// import vendorIcon from "../assets/vendor-pricing.svg"



const Header = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState();

  const { hoverCompanyDetail } = useSelector(
    (store) => store.searchProductStore
  );

  const { mobileNavToggle, dropdownOpen, toolToggle } = useSelector(
    (state) => state.homeStore
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    Cookies.remove("token");
    Cookies.remove("user_id");
    navigate("/login", { replace: true });
  };

  const handleDropdownToggle = (menu) => {
    dispatch(setDropdownOpen(menu));
  };

  const searchProduct = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    if (formData.searchStrings.trim() === "") {
      alert("Blank search is not allowed");
      return;
    }

    const searchString = formData.searchStrings
      .split(" ")
      .filter(Boolean)
      .join(",");

    console.log(searchString);
    console.log(searchType);
    // Clear selected products
    dispatch(setSelectedProducts([]));

    // Search products history.
    dispatch(searchProductHistory({ token }));

    // Navigate to the search results page with 'page' and 'search' or 'keyword' parameters
    if (searchType === "search") {
      const url = `/inventory/search?page=1&query=${encodeURIComponent(
        searchString
      )}`;
      navigate(url, { replace: true });
    } else if (searchType === "keyword") {
      const url = `/inventory/search?page=1&partModel=${encodeURIComponent(
        searchString
      )}`;
      navigate(url, { replace: true });
    }
  };

  return (
    <>
      <div className={`${css.headerFixed} ${css.noPrint}`}>
        <header className={css.header}>
          <Link to={"/"} id={css.logo}>
            <img src={logo} alt="logo" />
          </Link>
          <div className={css.search_container}>
            <form onSubmit={searchProduct}>
              <input
                type="search"
                name="searchStrings"
                id={css.search}
                placeholder="What are you looking for?"
              />
              <button
                type="submit"
                onClick={() => setSearchType("search")}
                className={css.search_btn}
              >
                search
              </button>
              <button
                type="submit"
                onClick={() => setSearchType("keyword")}
                className={css.search_btn}
              >
                keyword
              </button>
            </form>
          </div>
          {hoverCompanyDetail &&
            hoverCompanyDetail?.map((detail) => {
              return (
                <div key={detail.id} className={css.hoverCompanyDetail}>
                  <div className={css.hoverCompanyDetail_details}>
                    <span>
                      <span>
                        <strong>{detail.name}</strong>
                      </span>
                    </span>
                    <span>
                      <p>ph:</p>
                      <p>{detail.phone_num}</p>
                    </span>
                    <span>
                      <p>loc:</p>
                      <p>{detail.address}</p>
                    </span>
                    <span>
                      <p>
                        {detail.open_timing}-{detail.close}
                      </p>
                      <p>
                        ship:
                        {detail.shipping_deadline
                          ? detail.shipping_deadline
                          : "3PM"}
                      </p>
                    </span>
                  </div>
                  <div className={css.hoverCompanyDetail_img}>
                    <img src={detail.image} alt="companyLogo" />
                  </div>
                </div>
              );
            })}
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
                          <Link>main</Link>
                          {dropdownOpen.main ? (
                            <BiSolidUpArrow />
                          ) : (
                            <BiSolidDownArrow />
                          )}
                        </div>
                        {dropdownOpen.main && (
                          <div className={css.nav_Mobile_links_ul}>
                            <ul>
                              <Link to={"/"}>
                                <li>Home</li>
                              </Link>
                              <Link>
                                <li>help</li>
                              </Link>
                              <Link>
                                <li>contact</li>
                              </Link>
                              <Link to={"/ethics"}>
                                <li>ethics</li>
                              </Link>
                              <Link>
                                <li>site map</li>
                              </Link>
                              <Link>
                                <li>badges</li>
                              </Link>
                            </ul>
                          </div>
                        )}
                      </li>
                      <li>
                        <div onClick={() => handleDropdownToggle("search")}>
                          <Link>search</Link>
                          {dropdownOpen.main ? (
                            <BiSolidUpArrow />
                          ) : (
                            <BiSolidDownArrow />
                          )}
                        </div>
                        {dropdownOpen.search && (
                          <div className={css.nav_Mobile_links_ul}>
                            <ul>
                              <Link to={"/advanced"}>
                                <li>inventory</li>
                              </Link>
                              <Link>
                                <li>services</li>
                              </Link>

                              <Link>
                                <li>company</li>
                              </Link>

                              <Link>
                                <li>person</li>
                              </Link>

                              <Link>
                                <li>techSpecs</li>
                              </Link>

                              <Link>
                                <li>nsn</li>
                              </Link>

                              <Link>
                                <li>alt</li>
                              </Link>
                            </ul>
                          </div>
                        )}
                      </li>
                      <li>
                        <div onClick={() => handleDropdownToggle("manage")}>
                          <Link>manage</Link>
                          {dropdownOpen.main ? (
                            <BiSolidUpArrow />
                          ) : (
                            <BiSolidDownArrow />
                          )}
                        </div>
                        {dropdownOpen.manage && (
                          <div className={css.nav_Mobile_links_ul}>
                            <ul>
                              <Link to={"/inventory"}>
                                <li>Inventory</li>
                              </Link>
                              <Link to={"/rfq"}>
                                <li>My RFQs</li>
                              </Link>
                              <Link>
                                <li>My Contacts</li>
                              </Link>
                              <Link>
                                <li>My BOM</li>
                              </Link>
                              <Link to={"/myprofile"}>
                                <li>My Profile</li>
                              </Link>
                              <Link>
                                <li>My Company</li>
                              </Link>
                              <Link>
                                <li>My Services</li>
                              </Link>
                              <Link to={"/venprice"}>
                                <li>Vendor Pricing</li>
                              </Link>
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

              <div className={css.dropdownMenu} style={{marginLeft:"10px"}}>
                <ul style={{minWidth:"30px"}}>
                  <Link to={"/myprofile/MyVendors"}>
                    <li>
                      <img src={dp1} alt="" srcset="" />........
                    </li>
                  </Link>
                  <Link to={"/feedback"}>
                    <li><img src={dp2} alt="" srcset="" style={{color:"black"}}/>........</li>
                  </Link>
                  <Link to={"/hotlist/view"}>
                    <li><img src={dp3} alt="dsd" srcset="" style={{color:"black"}}/>........</li>
                  </Link>
                  <Link to={"/inventory"}>
                    <li><img src={dp6} alt="" srcset="" style={{color:"black"}}/>........</li>
                  </Link>
                  <Link to={"/reports/Company"}>
                    <li><img src={dp5} alt="" srcset="" style={{color:"black"}}/>........</li>
                  </Link>
              
                </ul>
              </div>
            </li>




{/* Toggle Menus */}
            <li>
              <Link to={"/"}>main</Link>
              <BiSolidDownArrow className={css.onHoverMenuIconDown} />
              <BiSolidUpArrow className={css.onHoverMenuIconUp} />
              <div className={css.dropdownMenu}>
                <ul>
                  <Link to={"/"}>
                    <li>Home</li>
                  </Link>
                  <Link to={"/help"}>
                    <li>help</li>
                  </Link>
                  <Link to={"/feedback"}>
                    <li>contact</li>
                  </Link>
                  <Link to={"/ethics"}>
                    <li>ethics</li>
                  </Link>
                  <Link to={"/sitemap"}>
                    <li>site map</li>
                  </Link>
                  <Link to={"/badges"}>
                    <li>badges</li>
                  </Link>
                </ul>
              </div>
            </li>
            <li>
              <a href="/tools">tools</a>
              <BiSolidDownArrow className={css.onHoverMenuIconDown} />
              <BiSolidUpArrow className={css.onHoverMenuIconUp} />
              <div className={css.dropdownMenu}>
                <ul>
                <Link to={"/tools"}>
                  <li>
                  Tools
                  </li>
                  </Link>
                  <Link to={"/myprofile/MyVendors"}>
                  <li>
                  My Vendors
                  </li>
                  </Link>
                  <Link to={"/myprofile/MyContact"}>
                  <li>
                   My Contacts
                  </li>
                  </Link>
                  <Link to={"/hotList/view"}>
                  <li>
                   Hot List
                  </li>
                  </Link>
                  <Link to={"https://brokerbin.com/partners"}  target="blank">
                  <li>
                   Partners
                  </li>
                  </Link>
                  <Link to={"https://www.brokerbinroadshow.com/"} target="blank">
                  <li>
                    Events
                  </li>
                  </Link>
                </ul>
              </div>
            </li>
            <li>
              <Link to={"/search"}>search</Link>
              <BiSolidDownArrow className={css.onHoverMenuIconDown} />
              <BiSolidUpArrow className={css.onHoverMenuIconUp} />
              <div className={css.dropdownMenu}>
                <ul>
                  <Link to="/inventory">
                    <li>inventory</li>
                  </Link>
                  <Link to={"/services"}>
                    <li>services</li>
                  </Link>
                  <Link to={"/searchcompany"}>
                    <li>company</li>
                  </Link>
                  <Link to={"/person"}>
                    <li>person</li>
                  </Link>
                  <Link>
                    <li>techSpecs</li>
                  </Link>
                  <Link>
                    <li>nsn</li>
                  </Link>
                  <Link>
                    <li>alt#</li>
                  </Link>
                </ul>
              </div>
            </li>
            <li>
              <Link to={'/inventory'}>manage</Link>
              <BiSolidDownArrow className={css.onHoverMenuIconDown} />
              <BiSolidUpArrow className={css.onHoverMenuIconUp} />
              <div className={css.dropdownMenu}>
                <ul>
                  <Link to={"/inventory"}>
                    <li>Inventory</li>
                  </Link>
                  <Link to={"/rfq"}>
                    <li>My RFQs</li>
                  </Link >
                  <Link>
                    <li>My BOM</li>
                  </Link>
                  <Link to={"/myprofile"}>
                    <li>My Profile</li>
                  </Link>
                  <Link>
                    <li>My Company</li>
                  </Link>
                  <Link to={"/manage/my-services"}>
                    <li>My Services</li>
                  </Link>
                  <Link to={"/venprice"}>
                    <li>Vendor Pricing</li>
                  </Link>
                </ul>
              </div>
            </li>
            <li>
              <a href="/reports/email">reports</a>
              <BiSolidDownArrow className={css.onHoverMenuIconDown} />
              <BiSolidUpArrow className={css.onHoverMenuIconUp} />
              <div className={css.dropdownMenu}>
                <ul>
                  <Link to={"/reports/Company"}>
                    <li>Company</li>
                  </Link>
                  <Link to={"/reports/sitewide"}>
                  <li>
                  Site Wide
                  </li>
                  </Link>
                  <Link to={"/reports/email"}>
                  <li>
                   Email
                  </li>
                  </Link>
                  <Link to={"/reports/serviceStats"} >
                  <li>
                  Service Directory Stats
                  </li>
                  </Link>
                </ul>
              </div>
            </li>
            <li>
              <Link to={"/broadcasts"}>broadcast</Link>
              <BiSolidDownArrow className={css.onHoverMenuIconDown} />
              <BiSolidUpArrow className={css.onHoverMenuIconUp} />
              <div className={css.dropdownMenu}>
                <ul>
                  <Link to={"/sendbroad"}>
                    <li>send</li>
                  </Link >
                  <Link  to={"/broadcasts"}>
                  <li>
                   view
                  </li>
                  </Link>
                  <Link to={"/myprofile/broadcastfilter"}>
                  <li>
                   set filters
                  </li>
                  </Link>
                  <Link to={"/broadcasthistory"}>
                  <li>
                   history
                  </li>
                  </Link>
                </ul>
              </div>
            </li>
            <li onClick={handleLogout} style={{cursor:"pointer"}}>
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
                  className={css.tools_toggle}
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
                <li>
                  <AiOutlineMail />
                </li>
                <li>
                  <BsFillTelephonePlusFill />
                </li>
                <li>
                  <Link to={"/cartpart"}>
                    <BsCartFill />
                  </Link>
                </li>
                <li >
                <Link to={"/venprice"}>
                  <BsDatabaseFill />
                </Link>
                </li>
                <li>
                  <BsClockFill />
                </li>
                <li>
                  <BsStarFill />
                </li>
                <li>
                  <Link to={"/myprofile/MyVendors"}>
                  <BsPeopleFill/>
                  </Link>
                </li>
                <li>
                  <Link to={"/myprofile/MyContact"}>
                  <BsPersonFill />
                  </Link>
                </li>
                <li>
                  <Link to={"/hotList/view"}>
                  <AiFillFile />
                  </Link>
                </li>
                <li>
                  <Link to={"/inventory"}>
                  <MdFileUpload />
                  </Link>
                </li>
                <li>
                  <Link to={"/reports/Company"}>
                  <FiTarget />
                  </Link>
                </li>
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

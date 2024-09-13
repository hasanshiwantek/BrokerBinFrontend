import { memo } from "react";
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

const Header = () => {
  const token = Cookies.get("token");
  const { mobileNavToggle, dropdownOpen, toolToggle } = useSelector(
    (state) => state.homeStore
  );

  const { page, pageSize } = useSelector((store) => store.searchProductStore);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    Cookies.remove("token");
    Cookies.remove("user_id");
    navigate("/login", { replace: true });
  };

  const handleDropdownToggle = (menu) => {
    dispatch(setDropdownOpen(menu));
  };

  const searchProduct = async (event) => {
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

    const url = "/inventory/search";

    // Dispatch the search query action and navigate to the search page
    // dispatch(
    //   searchProductQuery({
    //     token,
    //     page,
    //     pageSize,
    //     search: searchString,
    //     // callback: () => navigate(url),
    //   })
    // );

    dispatch(searchProductHistory({ token }));

    // Clear selected products
    dispatch(setSelectedProducts([]));

    // Navigate to the search results page
    // Pass search query as a state through the navigation
    navigate(url, { state: searchString, replace: true });
  };
  return (
    <>
      <div className={`${css.headerFixed} ${css.noPrint}`}>
        <header className={css.header}>
          <Link to={"/"} id={css.logo}>
            <img src={logo} alt="logo" />
          </Link>
          <div className={css.search_container}>
            <form method="post" onSubmit={searchProduct}>
              <input
                type="search"
                name="searchStrings"
                id={css.search}
                placeholder="What are you looking for?"
              />
              {/* <button type="button" className={css.search_btn}> */}
              <input type="submit" value="search" className={css.search_btn} />
              {/* </button> */}
              <button type="button" className={css.search_btn}>
                keyword
              </button>
            </form>
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
            </li>
            <li>
              <Link>main</Link>
              <BiSolidDownArrow className={css.onHoverMenuIconDown} />
              <BiSolidUpArrow className={css.onHoverMenuIconUp} />
              <div className={css.dropdownMenu}>
                <ul>
                  <Link to={"/"}>
                    <li>Home</li>
                  </Link>
                  <Link>
                    <li>help</li>
                  </Link>
                  <Link to={"/feedback"}>
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
            </li>
            <li>
              <a href="/">tools</a>
              <BiSolidDownArrow className={css.onHoverMenuIconDown} />
              <BiSolidUpArrow className={css.onHoverMenuIconUp} />
              <div className={css.dropdownMenu}>
                <ul>
                  <li>
                    <Link>Tools</Link>
                  </li>
                  <li>
                    <Link to={"/myprofile/MyVendors"}>My Vendors</Link>
                  </li>
                  <li>
                    <Link>My Contacts</Link>
                  </li>
                  <li>
                    <Link>Hot List</Link>
                  </li>
                  <li>
                    <Link>Partners</Link>
                  </li>
                  <li>
                    <Link>Events</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link>search</Link>
              <BiSolidDownArrow className={css.onHoverMenuIconDown} />
              <BiSolidUpArrow className={css.onHoverMenuIconUp} />
              <div className={css.dropdownMenu}>
                <ul>
                  <Link to="/inventory">
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
                    <li>alt#</li>
                  </Link>
                </ul>
              </div>
            </li>
            <li>
              <Link>manage</Link>
              <BiSolidDownArrow className={css.onHoverMenuIconDown} />
              <BiSolidUpArrow className={css.onHoverMenuIconUp} />
              <div className={css.dropdownMenu}>
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
            </li>
            <li>
              <a href="/">reports</a>
              <BiSolidDownArrow className={css.onHoverMenuIconDown} />
              <BiSolidUpArrow className={css.onHoverMenuIconUp} />
              <div className={css.dropdownMenu}>
                <ul>
                  <li>
                    <Link>Company</Link>
                  </li>
                  <li>
                    <Link>Site Wide</Link>
                  </li>
                  <li>
                    <Link>Email</Link>
                  </li>
                  <li>
                    <Link>Service Directory Stats</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link to={"/"}>broadcast</Link>
              <BiSolidDownArrow className={css.onHoverMenuIconDown} />
              <BiSolidUpArrow className={css.onHoverMenuIconUp} />
              <div className={css.dropdownMenu}>
                <ul>
                  <Link to={"/sendbroad"}>
                    <li>send</li>
                  </Link>
                  <li>
                    <Link>view</Link>
                  </li>
                  <li>
                    <Link>set filters</Link>
                  </li>
                  <li>
                    <Link>history</Link>
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
                  <Link to={"/cartpart"}>
                    <BsCartFill />
                  </Link>
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

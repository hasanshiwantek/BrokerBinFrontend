import React, { useState } from "react";
import css from "../../../styles/Popup/CompanyDetails.module.css";
import companyLogo from "../../../imgs/logo/companyContact.jpg";
import companyPhoto from "../../../imgs/logo/companyPhoto.jpg";
import companyContact from "../../../imgs/logo/companyContact.jpg";
import shadow from "../../../imgs/logo/shadow.png";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import { BsStarFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const TabContent = () => {
  const [toggleTabs, setToggleTabs] = useState(1);

  const { popupCompanyDetail } = useSelector(
    (store) => store.searchProductStore
  );

  console.log([popupCompanyDetail[0].addedBy.company.company_images][0]);
  

  return (
    <>
      <div className={css.Popup_Info_Main_right_tabs}>
        <ul className={css.Popup_Info_Main_right_tabs_toggle}>
          <li
            onClick={() => setToggleTabs(1)}
            className={toggleTabs === 1 ? css.activeTab : ""}
          >
            contacts
          </li>
          <li
            onClick={() => setToggleTabs(2)}
            className={toggleTabs === 2 ? css.activeTab : ""}
          >
            photos
          </li>
          <li
            onClick={() => setToggleTabs(3)}
            className={toggleTabs === 3 ? css.activeTab : ""}
          >
            credentials
          </li>
          <li
            onClick={() => setToggleTabs(4)}
            className={toggleTabs === 4 ? css.activeTab : ""}
          >
            terms / conditions
          </li>
        </ul>
        <div className={toggleTabs === 1 ? css.showContent : css.content}>
          <div className={css.Popup_Info_Main_right_tabs_contact}>
            <div className={css.Popup_Info_Main_right_tabs_contact_left}>
              <ul>
                <li>#</li>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li>
                <li>F</li>
                <li>G</li>
                <li>H</li>
                <li>I</li>
                <li>J</li>
                <li>K</li>
                <li>L</li>
                <li>M</li>
                <li>N</li>
                <li>O</li>
                <li>P</li>
                <li>Q</li>
                <li>R</li>
                <li>S</li>
                <li>T</li>
                <li>U</li>
                <li>V</li>
                <li>W</li>
                <li>X</li>
                <li>Y</li>
                <li>Z</li>
              </ul>
            </div>

            <div className={css.Popup_Info_Main_right_tabs_contact_right}>
              <h1>company contacts</h1>
              <div
                className={css.Popup_Info_Main_right_tabs_contact_right_search}
              >
                <p>quick search:</p>
                <input type="text" placeholder="Search Contacts" />
              </div>
              <h1>Contact: O</h1>
              <div
                className={
                  css.Popup_Info_Main_right_tabs_contact_right_companies
                }
              >
                <div
                  className={
                    css.Popup_Info_Main_right_tabs_contact_right_companies_list
                  }
                >
                  <img src={companyLogo} alt="company logo" />
                  <div
                    className={
                      css.Popup_Info_Main_right_tabs_contact_right_companies_list_details
                    }
                  >
                    <h2>Rob Osgood</h2>
                    <div>
                      <span>
                        <strong>title:</strong>
                        <p>Sales</p>
                      </span>
                      <span>
                        <strong>phone:</strong>
                        <a href="tel:+603 474 1111">603 474 1111</a>
                      </span>
                      <span>
                        <strong>fax:</strong>
                        <a href="tel:+603 474 1112">603 474 1112</a>
                      </span>
                      <span>
                        <strong>email:</strong>
                        <a
                          href="mailto:sales@alltechusa.net
"
                        >
                          sales@alltechusa.net
                        </a>
                      </span>
                    </div>
                  </div>
                  <span>
                    <MdPersonRemoveAlt1 />
                    remove contact
                  </span>
                </div>
                <div
                  className={
                    css.Popup_Info_Main_right_tabs_contact_right_companies_myNotes
                  }
                >
                  <div>
                    <strong>my notes:</strong>
                    <span>
                      <strong>my rating</strong>
                      <span>
                        {new Array(5).fill(null).map((e, i) => {
                          return <BsStarFill key={i} />;
                        })}
                      </span>
                    </span>
                  </div>
                  <div>
                    <textarea placeholder="This section is only visible to you by your login. Enter your personal notes about this contact here."></textarea>
                  </div>
                </div>
              </div>
              <div
                className={
                  css.Popup_Info_Main_right_tabs_contact_right_companies
                }
              >
                <div
                  className={
                    css.Popup_Info_Main_right_tabs_contact_right_companies_list
                  }
                >
                  <img src={companyLogo} alt="company logo" />
                  <div
                    className={
                      css.Popup_Info_Main_right_tabs_contact_right_companies_list_details
                    }
                  >
                    <h2>john cena</h2>
                    <div>
                      <span>
                        <strong>title:</strong>
                        <p>Sales</p>
                      </span>
                      <span>
                        <strong>phone:</strong>
                        <a href="tel:+603 474 1111">603 474 1111</a>
                      </span>
                      <span>
                        <strong>fax:</strong>
                        <a href="tel:+603 474 1112">603 474 1112</a>
                      </span>
                      <span>
                        <strong>email:</strong>
                        <a
                          href="mailto:sales@alltechusa.net
"
                        >
                          sales@alltechusa.net
                        </a>
                      </span>
                    </div>
                  </div>
                  <span>
                    <MdPersonRemoveAlt1 />
                    remove contact
                  </span>
                </div>
                <div
                  className={
                    css.Popup_Info_Main_right_tabs_contact_right_companies_myNotes
                  }
                >
                  <div>
                    <strong>my notes:</strong>
                    <span>
                      <strong>my rating</strong>
                      <span>
                        {new Array(5).fill(null).map((e, i) => {
                          return <BsStarFill key={i} />;
                        })}
                      </span>
                    </span>
                  </div>
                  <div>
                    <textarea placeholder="This section is only visible to you by your login. Enter your personal notes about this contact here."></textarea>
                  </div>
                </div>
              </div>
              <div
                className={
                  css.Popup_Info_Main_right_tabs_contact_right_companies
                }
              >
                <div
                  className={
                    css.Popup_Info_Main_right_tabs_contact_right_companies_list
                  }
                >
                  <img src={companyLogo} alt="company logo" />
                  <div
                    className={
                      css.Popup_Info_Main_right_tabs_contact_right_companies_list_details
                    }
                  >
                    <h2>undertaker</h2>
                    <div>
                      <span>
                        <strong>title:</strong>
                        <p>Sales</p>
                      </span>
                      <span>
                        <strong>phone:</strong>
                        <a href="tel:+603 474 1111">603 474 1111</a>
                      </span>
                      <span>
                        <strong>fax:</strong>
                        <a href="tel:+603 474 1112">603 474 1112</a>
                      </span>
                      <span>
                        <strong>email:</strong>
                        <a
                          href="mailto:sales@alltechusa.net
"
                        >
                          sales@alltechusa.net
                        </a>
                      </span>
                    </div>
                  </div>
                  <span>
                    <MdPersonRemoveAlt1 />
                    remove contact
                  </span>
                </div>
                <div
                  className={
                    css.Popup_Info_Main_right_tabs_contact_right_companies_myNotes
                  }
                >
                  <div>
                    <strong>my notes:</strong>
                    <span>
                      <strong>my rating</strong>
                      <span>
                        {new Array(5).fill(null).map((e, i) => {
                          return <BsStarFill key={i} />;
                        })}
                      </span>
                    </span>
                  </div>
                  <div>
                    <textarea placeholder="This section is only visible to you by your login. Enter your personal notes about this contact here."></textarea>
                  </div>
                </div>
              </div>
              <div
                className={
                  css.Popup_Info_Main_right_tabs_contact_right_companies
                }
              >
                <div
                  className={
                    css.Popup_Info_Main_right_tabs_contact_right_companies_list
                  }
                >
                  <img src={companyLogo} alt="company logo" />
                  <div
                    className={
                      css.Popup_Info_Main_right_tabs_contact_right_companies_list_details
                    }
                  >
                    <h2>jetha laal</h2>
                    <div>
                      <span>
                        <strong>title:</strong>
                        <p>Sales</p>
                      </span>
                      <span>
                        <strong>phone:</strong>
                        <a href="tel:+603 474 1111">603 474 1111</a>
                      </span>
                      <span>
                        <strong>fax:</strong>
                        <a href="tel:+603 474 1112">603 474 1112</a>
                      </span>
                      <span>
                        <strong>email:</strong>
                        <a
                          href="mailto:sales@alltechusa.net
"
                        >
                          sales@alltechusa.net
                        </a>
                      </span>
                    </div>
                  </div>
                  <span>
                    <MdPersonRemoveAlt1 />
                    remove contact
                  </span>
                </div>
                <div
                  className={
                    css.Popup_Info_Main_right_tabs_contact_right_companies_myNotes
                  }
                >
                  <div>
                    <strong>my notes:</strong>
                    <span>
                      <strong>my rating</strong>
                      <span>
                        {new Array(5).fill(null).map((e, i) => {
                          return <BsStarFill key={i} />;
                        })}
                      </span>
                    </span>
                  </div>
                  <div>
                    <textarea placeholder="This section is only visible to you by your login. Enter your personal notes about this contact here."></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={toggleTabs === 2 ? css.showContent : css.content}>
          <div className={css.Popup_Info_Main_right_tabs_photos}>
            <h1>company photos</h1>
            <div className={css.Popup_Info_Main_right_tabs_photos_img}>
              {[popupCompanyDetail[0].addedBy.company.company_images][0].map(
                (image) => {
                  console.log(image.image);
                  
                  return (
                    <div key={image.id}>
                      <img src={image.image} alt="company photo" />
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
        <div className={toggleTabs === 3 ? css.showContent : css.content}>
          <div className={css.Popup_Info_Main_right_tabs_credentials}></div>
        </div>
        <div className={toggleTabs === 4 ? css.showContent : css.content}>
          <div className={css.Popup_Info_Main_right_tabs_terms}>
            <div>
              <h1>terms</h1>
              <ul>
                <li>Credit Card</li>
                <li>Wire Transfer</li>
                <li>COD (Cash On Delivery)</li>
                <li>Net 5</li>
                <li>Net 10</li>
                <li>Net 30</li>
                <li>Cash</li>
                <li>Call</li>
                <li>Minimum Order: 0</li>
              </ul>
            </div>
            <div>
              <h1>return policy</h1>
              <p>30 days</p>
            </div>
            <div>
              <h1>legal files</h1>
              <p>Profile Incomplete</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabContent;

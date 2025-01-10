
import React, { useEffect, useState } from "react";
import css from "../../../styles/Popup/CompanyDetails.module.css";
import companyLogo from "../../../imgs/logo/companyContact.jpg";
import companyPhoto from "../../../imgs/logo/companyPhoto.jpg";
import companyContact from "../../../imgs/logo/companyContact.jpg";
import shadow from "../../../imgs/logo/shadow.png";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import { BsStarFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { getCompanyContact } from "../../../ReduxStore/SearchProductSlice";
import { use } from "react";
import Cookies from "js-cookie";
import { deleteCompanyUser } from "../../../ReduxStore/RfqSlice";


const TabContent = ({ companyId }) => {
  const [toggleTabs, setToggleTabs] = useState(1);
  // Loading state
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [filteredContacts, setFilteredContacts] = useState([]); // Filtered contacts
  const [companyData, setCompanyData] = useState(null);

  const dispatch = useDispatch();
  const { companyContactData } = useSelector((store) => store.searchProductStore);
  console.log("Company Id........ ",companyContactData.data.company.id)
  const token = Cookies.get("token");

  console.log("CompanyId From Tab Content Page", companyId);

  const companyUserId = companyContactData.data.contacts.map((item) => item.id)
  console.log("User Id from Comapny Modal", companyUserId)

  const companyUsersCount = companyContactData.data.contacts.length
  useEffect(() => {
    if (companyId && token) {
      setLoading(true);
      dispatch(getCompanyContact({ id: companyId, token }))
        .then((data) => {
          setFilteredContacts(data.payload.data.contacts); // Initialize filteredContacts
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching company data:", error);
          setLoading(false);
        });
    }
  }, [dispatch, companyId, token]);



  // Filter contacts dynamically based on the search query
  useEffect(() => {
    if (companyContactData?.data?.contacts) {
      const contacts = companyContactData.data.contacts;
      if (!searchQuery) {
        // Show all contacts if the search query is empty
        setFilteredContacts(contacts);
      } else {
        // Filter contacts based on the search query
        const filtered = contacts.filter((contact) =>
          `${contact.firstName} ${contact.lastName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
        setFilteredContacts(filtered);
      }
    }
  }, [searchQuery, companyContactData]);

  const loggedInUserId = Cookies.get("user_id");
  console.log("Logged In User Id", loggedInUserId)





  const userDeleteHandler = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (isConfirmed) {
      // Dispatch the delete action
      dispatch(deleteCompanyUser({ token, id }))
        .then(() => {
          // Refresh the page after successful deletion
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    } else {
      console.log(`User with ID ${id} was not deleted.`);
    }
  }





  if (loading) {
    return (
      <div className={css.Popup}>
        <div className={css.Popup_Info}>
          <div className={css.Popup_Info_height}>
            <div className={css.Popup_Info_header}>
              <h1>Loading company details...</h1>
            </div>
            <div className={css.Popup_Info_Main}>
              <div className={css.Popup_Info_Main_left}>
                <div className={css.loader}></div> {/* Spinner here */}
              </div>
            </div>
          </div>
        </div>
      </div>


    );
  }


  return (
    <>
      <div className={css.Popup_Info_Main_right_tabs}>
        <ul className={css.Popup_Info_Main_right_tabs_toggle}>
          <li
            onClick={() => setToggleTabs(1)}
            className={toggleTabs === 1 ? css.activeTab : ""}
          >
            Contacts ({companyUsersCount})
          </li>
          <li
            onClick={() => setToggleTabs(2)}
            className={toggleTabs === 2 ? css.activeTab : ""}
          >
            Photos
          </li>
          <li
            onClick={() => setToggleTabs(3)}
            className={toggleTabs === 3 ? css.activeTab : ""}
          >
            Credentials
          </li>
          <li
            onClick={() => setToggleTabs(4)}
            className={toggleTabs === 4 ? css.activeTab : ""}
          >
            Terms / Conditions
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
              <h1>Company Contacts</h1>
              <div
                className={css.Popup_Info_Main_right_tabs_contact_right_search}
              >
                <p>Quick search:</p>
                <input
                  type="text"
                  placeholder="Search Contacts"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-lg"
                />
              </div>
              <h1>Contact: O</h1>









              {filteredContacts.map((user, id) => {
                return (
                  <div key={id}>
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
                        <img src={user.profileImage} alt="User Profile" />
                        <div
                          className={
                            css.Popup_Info_Main_right_tabs_contact_right_companies_list_details
                          }
                        >
                          <h2>{user.firstName} {user.lastName}</h2>
                          <div>
                            <span>
                              <strong>Title:</strong>
                              <strong>{user.specialty}</strong>
                            </span>
                            <span>
                              <strong>Phone:</strong>
                              <strong>{user.phoneNumber}</strong>
                            </span>
                            <span>
                              <strong>Fax:</strong>
                              <strong>{user.faxNumber}</strong>
                            </span>
                            <span>
                              <strong>Email:</strong>
                              <strong
                              >
                                {user.email}
                              </strong>
                            </span>
                          </div>

                        </div>
                        {/* <button> */}
                          <span
                            className="cursor-pointer hover:text-orange-500 transition-colors"
                            onClick={() => userDeleteHandler(user.id)}
                          >
                            <MdPersonRemoveAlt1 />
                            Remove contact
                          </span>
                        {/* </button> */}
                      </div>
                      <div
                        className={
                          css.Popup_Info_Main_right_tabs_contact_right_companies_myNotes
                        }
                      >
                        <div>
                          <strong className="p-2 text-lg">My notes:</strong>
                          <span>
                            <strong>My rating</strong>
                            <div className="columns">
                              <div className="column">
                                <div className="vue-rate-it-rating vue-rate-it-rating-container">
                                  <div className="vue-rate-it-rating flex gap-1">
                                    <div className="vue-rate-it-rating-item">
                                      <div step="50" style={{ display: 'inline-block', marginRight: '1px' }}>
                                        <svg width="18" height="18" viewBox="0 0 179 179" style={{ overflow: 'visible' }}>
                                          <linearGradient id="ywy42" x1="-2%" x2="100%" y1="0%" y2="0%">
                                            <stop offset="0%" stopColor="#FFD700"></stop>
                                            <stop offset="0%" stopColor="#CCC"></stop>
                                          </linearGradient>
                                          <path
                                            d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                            fill="url(#ywy42)"
                                            stroke="#999"
                                            strokeWidth="2"
                                            vectorEffect="non-scaling-stroke"
                                            transform="scale(0.1)"
                                          ></path>
                                          <path
                                            d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                            fill="url(#ywy42)"
                                            transform="scale(0.1)"
                                          ></path>
                                        </svg>
                                      </div>
                                    </div>
                                    <div className="vue-rate-it-rating-item">
                                      <div step="50" style={{ display: 'inline-block', marginRight: '1px' }}>
                                        <svg width="18" height="18" viewBox="0 0 179 179" style={{ overflow: 'visible' }}>
                                          <linearGradient id="ac6umj" x1="-2%" x2="100%" y1="0%" y2="0%">
                                            <stop offset="0%" stopColor="#FFD700"></stop>
                                            <stop offset="0%" stopColor="#CCC"></stop>
                                          </linearGradient>
                                          <path
                                            d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                            fill="url(#ac6umj)"
                                            stroke="#999"
                                            strokeWidth="2"
                                            vectorEffect="non-scaling-stroke"
                                            transform="scale(0.1)"
                                          ></path>
                                          <path
                                            d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                            fill="url(#ac6umj)"
                                            transform="scale(0.1)"
                                          ></path>
                                        </svg>
                                      </div>
                                    </div>
                                    <div className="vue-rate-it-rating-item">
                                      <div step="50" style={{ display: 'inline-block', marginRight: '1px' }}>
                                        <svg width="18" height="18" viewBox="0 0 179 179" style={{ overflow: 'visible' }}>
                                          <linearGradient id="vd5hxa" x1="-2%" x2="100%" y1="0%" y2="0%">
                                            <stop offset="0%" stopColor="#FFD700"></stop>
                                            <stop offset="0%" stopColor="#CCC"></stop>
                                          </linearGradient>
                                          <path
                                            d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                            fill="url(#vd5hxa)"
                                            stroke="#999"
                                            strokeWidth="2"
                                            vectorEffect="non-scaling-stroke"
                                            transform="scale(0.1)"
                                          ></path>
                                          <path
                                            d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                            fill="url(#vd5hxa)"
                                            transform="scale(0.1)"
                                          ></path>
                                        </svg>
                                      </div>
                                    </div>
                                    <div className="vue-rate-it-rating-item">
                                      <div step="50" style={{ display: 'inline-block', marginRight: '1px' }}>
                                        <svg width="18" height="18" viewBox="0 0 179 179" style={{ overflow: 'visible' }}>
                                          <linearGradient id="ejvlvq" x1="-2%" x2="100%" y1="0%" y2="0%">
                                            <stop offset="0%" stopColor="#FFD700"></stop>
                                            <stop offset="0%" stopColor="#CCC"></stop>
                                          </linearGradient>
                                          <path
                                            d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                            fill="url(#ejvlvq)"
                                            stroke="#999"
                                            strokeWidth="2"
                                            vectorEffect="non-scaling-stroke"
                                            transform="scale(0.1)"
                                          ></path>
                                          <path
                                            d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                            fill="url(#ejvlvq)"
                                            transform="scale(0.1)"
                                          ></path>
                                        </svg>
                                      </div>
                                    </div>
                                    <div className="vue-rate-it-rating-item">
                                      <div step="50" style={{ display: 'inline-block', marginRight: '1px' }}>
                                        <svg width="18" height="18" viewBox="0 0 179 179" style={{ overflow: 'visible' }}>
                                          <linearGradient id="u53qwl" x1="-2%" x2="100%" y1="0%" y2="0%">
                                            <stop offset="0%" stopColor="#FFD700"></stop>
                                            <stop offset="0%" stopColor="#CCC"></stop>
                                          </linearGradient>
                                          <path
                                            d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                            fill="url(#u53qwl)"
                                            stroke="#999"
                                            strokeWidth="2"
                                            vectorEffect="non-scaling-stroke"
                                            transform="scale(0.1)"
                                          ></path>
                                          <path
                                            d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                            fill="url(#u53qwl)"
                                            transform="scale(0.1)"
                                          ></path>
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>



                          </span>
                        </div>
                        <div>
                          <textarea placeholder="This section is only visible to you by your login. Enter your personal notes about this here"></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                )

              })
              }







            </div>
          </div>
        </div>
        <div className={toggleTabs === 2 ? css.showContent : css.content}>
          <div className={css.Popup_Info_Main_right_tabs_photos}>
            <h1>Company photos</h1>
            <div className={css.Popup_Info_Main_right_tabs_photos_img}>


            </div>







          </div>
        </div>
        <div className={toggleTabs === 3 ? css.showContent : css.content}>
          <div className={css.Popup_Info_Main_right_tabs_credentials}></div>
        </div>
        <div className={toggleTabs === 4 ? css.showContent : css.content}>
          <div className={css.Popup_Info_Main_right_tabs_terms}>
            <div>
              <h1>Terms</h1>
              <p>Pofile Incomplete</p>

            </div>
            <div>
              <h1>return policy</h1>
              <p>Profile Incomplete</p>
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

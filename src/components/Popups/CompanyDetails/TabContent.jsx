// import React, { useEffect, useState } from "react";
// import css from "../../../styles/Popup/CompanyDetails.module.css";
// import companyLogo from "../../../imgs/logo/companyContact.jpg";
// import companyPhoto from "../../../imgs/logo/companyPhoto.jpg";
// import companyContact from "../../../imgs/logo/companyContact.jpg";
// import shadow from "../../../imgs/logo/shadow.png";
// import { MdPersonRemoveAlt1 } from "react-icons/md";
// import { BsStarFill } from "react-icons/bs";
// import { useSelector,useDispatch } from "react-redux";
// import { getCompanyContact } from "../../../ReduxStore/SearchProductSlice";
// import { use } from "react";
// import Cookies from "js-cookie";



// const TabContent = () => {
//   const [toggleTabs, setToggleTabs] = useState(1);

//   const { popupCompanyDetail } = useSelector((store) => store.searchProductStore);
//   const company = popupCompanyDetail[0];
//   // console.log("Initial Company Dta",company)


//   // const companyId = company?.id;
//   // const { companyContactData } = useSelector((store) => store.searchProductStore);
//   // const dispatch = useDispatch();
//   // const token = Cookies.get("token");

//   // console.log("CompanyId ", companyId);
//   // console.log("COMPANY CONTACT DATA FROM FRONTEND", companyContactData);

//   // useEffect(() => {
//   //   if (companyId && token) { // Ensure companyId and token are available
//   //     dispatch(getCompanyContact({ id: companyId, token }));
//   //   } else {
//   //     console.log("Company ID or Token is missing");
//   //   }
//   // }, [dispatch, companyId, token]);

//   // // Handle loading state or empty popupCompanyDetail
//   // if (!popupCompanyDetail || popupCompanyDetail.length === 0) {
//   //   return <div>Loading...</div>;
//   // }

//   // const companyImages =
//   // popupCompanyDetail[0] &&
//   // popupCompanyDetail[0].addedBy &&
//   // popupCompanyDetail[0].addedBy.company &&
//   // popupCompanyDetail[0].addedBy.company.company_images
//   //   ? popupCompanyDetail[0].addedBy.company.company_images
//   //   : [];
//   // console.log([popupCompanyDetail[0].addedBy.company.company_images][0]);



//   return (
//     <>
//       <div className={css.Popup_Info_Main_right_tabs}>
//         <ul className={css.Popup_Info_Main_right_tabs_toggle}>
//           <li
//             onClick={() => setToggleTabs(1)}
//             className={toggleTabs === 1 ? css.activeTab : ""}
//           >
//             contacts
//           </li>
//           <li
//             onClick={() => setToggleTabs(2)}
//             className={toggleTabs === 2 ? css.activeTab : ""}
//           >
//             photos
//           </li>
//           <li
//             onClick={() => setToggleTabs(3)}
//             className={toggleTabs === 3 ? css.activeTab : ""}
//           >
//             credentials
//           </li>
//           <li
//             onClick={() => setToggleTabs(4)}
//             className={toggleTabs === 4 ? css.activeTab : ""}
//           >
//             terms / conditions
//           </li>
//         </ul>
//         <div className={toggleTabs === 1 ? css.showContent : css.content}>
//           <div className={css.Popup_Info_Main_right_tabs_contact}>
//             <div className={css.Popup_Info_Main_right_tabs_contact_left}>
//               <ul>
//                 <li>#</li>
//                 <li>A</li>
//                 <li>B</li>
//                 <li>C</li>
//                 <li>D</li>
//                 <li>E</li>
//                 <li>F</li>
//                 <li>G</li>
//                 <li>H</li>
//                 <li>I</li>
//                 <li>J</li>
//                 <li>K</li>
//                 <li>L</li>
//                 <li>M</li>
//                 <li>N</li>
//                 <li>O</li>
//                 <li>P</li>
//                 <li>Q</li>
//                 <li>R</li>
//                 <li>S</li>
//                 <li>T</li>
//                 <li>U</li>
//                 <li>V</li>
//                 <li>W</li>
//                 <li>X</li>
//                 <li>Y</li>
//                 <li>Z</li>
//               </ul>
//             </div>

//             <div className={css.Popup_Info_Main_right_tabs_contact_right}>
//               <h1>company contacts</h1>
//               <div
//                 className={css.Popup_Info_Main_right_tabs_contact_right_search}
//               >
//                 <p>quick search:</p>
//                 <input type="text" placeholder="Search Contacts" />
//               </div>
//               <h1>Contact: O</h1>
//               <div
//                 className={
//                   css.Popup_Info_Main_right_tabs_contact_right_companies
//                 }
//               >
//                 <div
//                   className={
//                     css.Popup_Info_Main_right_tabs_contact_right_companies_list
//                   }
//                 >
//                   <img src={companyLogo} alt="company logo" />
//                   <div
//                     className={
//                       css.Popup_Info_Main_right_tabs_contact_right_companies_list_details
//                     }
//                   >
//                     <h2>Rob Osgood</h2>
//                     <div>
//                       <span>
//                         <strong>title:</strong>
//                         <p>Sales</p>
//                       </span>
//                       <span>
//                         <strong>phone:</strong>
//                         <a href="tel:+603 474 1111">603 474 1111</a>
//                       </span>
//                       <span>
//                         <strong>fax:</strong>
//                         <a href="tel:+603 474 1112">603 474 1112</a>
//                       </span>
//                       <span>
//                         <strong>email:</strong>
//                         <a
//                           href="mailto:sales@alltechusa.net
// "
//                         >
//                           sales@alltechusa.net
//                         </a>
//                       </span>
//                     </div>
//                   </div>
//                   <span>
//                     <MdPersonRemoveAlt1 />
//                     remove contact
//                   </span>
//                 </div>
//                 <div
//                   className={
//                     css.Popup_Info_Main_right_tabs_contact_right_companies_myNotes
//                   }
//                 >
//                   <div>
//                     <strong>my notes:</strong>
//                     <span>
//                       <strong>my rating</strong>
//                       <span>
//                         {new Array(5).fill(null).map((e, i) => {
//                           return <BsStarFill key={i} />;
//                         })}
//                       </span>
//                     </span>
//                   </div>
//                   <div>
//                     <textarea placeholder="This section is only visible to you by your login. Enter your personal notes about this contact here."></textarea>
//                   </div>
//                 </div>
//               </div>
//               <div
//                 className={
//                   css.Popup_Info_Main_right_tabs_contact_right_companies
//                 }
//               >
//                 <div
//                   className={
//                     css.Popup_Info_Main_right_tabs_contact_right_companies_list
//                   }
//                 >
//                   <img src={companyLogo} alt="company logo" />
//                   <div
//                     className={
//                       css.Popup_Info_Main_right_tabs_contact_right_companies_list_details
//                     }
//                   >
//                     <h2>john cena</h2>
//                     <div>
//                       <span>
//                         <strong>title:</strong>
//                         <p>Sales</p>
//                       </span>
//                       <span>
//                         <strong>phone:</strong>
//                         <a href="tel:+603 474 1111">603 474 1111</a>
//                       </span>
//                       <span>
//                         <strong>fax:</strong>
//                         <a href="tel:+603 474 1112">603 474 1112</a>
//                       </span>
//                       <span>
//                         <strong>email:</strong>
//                         <a
//                           href="mailto:sales@alltechusa.net
// "
//                         >
//                           sales@alltechusa.net
//                         </a>
//                       </span>
//                     </div>
//                   </div>
//                   <span>
//                     <MdPersonRemoveAlt1 />
//                     remove contact
//                   </span>
//                 </div>
//                 <div
//                   className={
//                     css.Popup_Info_Main_right_tabs_contact_right_companies_myNotes
//                   }
//                 >
//                   <div>
//                     <strong>my notes:</strong>
//                     <span>
//                       <strong>my rating</strong>
//                       <span>
//                         {new Array(5).fill(null).map((e, i) => {
//                           return <BsStarFill key={i} />;
//                         })}
//                       </span>
//                     </span>
//                   </div>
//                   <div>
//                     <textarea placeholder="This section is only visible to you by your login. Enter your personal notes about this contact here."></textarea>
//                   </div>
//                 </div>
//               </div>
//               <div
//                 className={
//                   css.Popup_Info_Main_right_tabs_contact_right_companies
//                 }
//               >
//                 <div
//                   className={
//                     css.Popup_Info_Main_right_tabs_contact_right_companies_list
//                   }
//                 >
//                   <img src={companyLogo} alt="company logo" />
//                   <div
//                     className={
//                       css.Popup_Info_Main_right_tabs_contact_right_companies_list_details
//                     }
//                   >
//                     <h2>undertaker</h2>
//                     <div>
//                       <span>
//                         <strong>title:</strong>
//                         <p>Sales</p>
//                       </span>
//                       <span>
//                         <strong>phone:</strong>
//                         <a href="tel:+603 474 1111">603 474 1111</a>
//                       </span>
//                       <span>
//                         <strong>fax:</strong>
//                         <a href="tel:+603 474 1112">603 474 1112</a>
//                       </span>
//                       <span>
//                         <strong>email:</strong>
//                         <a
//                           href="mailto:sales@alltechusa.net
// "
//                         >
//                           sales@alltechusa.net
//                         </a>
//                       </span>
//                     </div>
//                   </div>
//                   <span>
//                     <MdPersonRemoveAlt1 />
//                     remove contact
//                   </span>
//                 </div>
//                 <div
//                   className={
//                     css.Popup_Info_Main_right_tabs_contact_right_companies_myNotes
//                   }
//                 >
//                   <div>
//                     <strong>my notes:</strong>
//                     <span>
//                       <strong>my rating</strong>
//                       <span>
//                         {new Array(5).fill(null).map((e, i) => {
//                           return <BsStarFill key={i} />;
//                         })}
//                       </span>
//                     </span>
//                   </div>
//                   <div>
//                     <textarea placeholder="This section is only visible to you by your login. Enter your personal notes about this contact here."></textarea>
//                   </div>
//                 </div>
//               </div>
//               <div
//                 className={
//                   css.Popup_Info_Main_right_tabs_contact_right_companies
//                 }
//               >
//                 <div
//                   className={
//                     css.Popup_Info_Main_right_tabs_contact_right_companies_list
//                   }
//                 >
//                   <img src={companyLogo} alt="company logo" />
//                   <div
//                     className={
//                       css.Popup_Info_Main_right_tabs_contact_right_companies_list_details
//                     }
//                   >
//                     <h2>jetha laal</h2>
//                     <div>
//                       <span>
//                         <strong>title:</strong>
//                         <p>Sales</p>
//                       </span>
//                       <span>
//                         <strong>phone:</strong>
//                         <a href="tel:+603 474 1111">603 474 1111</a>
//                       </span>
//                       <span>
//                         <strong>fax:</strong>
//                         <a href="tel:+603 474 1112">603 474 1112</a>
//                       </span>
//                       <span>
//                         <strong>email:</strong>
//                         <a
//                           href="mailto:sales@alltechusa.net
// "
//                         >
//                           sales@alltechusa.net
//                         </a>
//                       </span>
//                     </div>
//                   </div>
//                   <span>
//                     <MdPersonRemoveAlt1 />
//                     remove contact
//                   </span>
//                 </div>
//                 <div
//                   className={
//                     css.Popup_Info_Main_right_tabs_contact_right_companies_myNotes
//                   }
//                 >
//                   <div>
//                     <strong>my notes:</strong>
//                     <span>
//                       <strong>my rating</strong>
//                       <span>
//                         {new Array(5).fill(null).map((e, i) => {
//                           return <BsStarFill key={i} />;
//                         })}
//                       </span>
//                     </span>
//                   </div>
//                   <div>
//                     <textarea placeholder="This section is only visible to you by your login. Enter your personal notes about this contact here."></textarea>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className={toggleTabs === 2 ? css.showContent : css.content}>
//           <div className={css.Popup_Info_Main_right_tabs_photos}>
//             <h1>company photos</h1>
//             <div className={css.Popup_Info_Main_right_tabs_photos_img}>
//               {/* {[popupCompanyDetail[0].addedBy.company.company_images][0].map(
//                 (image) => {
//                   console.log(image.image);

//                   return (
//                     <div key={image.id}>
//                       <img src={image.image} alt="company photo" />
//                     </div>
//                   );
//                 }
//               )} */}


//               {/* 
// <div className={css.Popup_Info_Main_right_tabs_photos_img}>
//               {companyImages.map((image) => (
//                 <div key={image.id}>
//                   <img src={image.image} alt="company photo" />
//                 </div>
//               ))}*/}


//               {company.company_images && company.company_images.length > 0 ? (
//                 company.company_images.map((image, index) => (
//                   <div key={index}>
//                     <img src={image.image} alt={`Company photo ${index + 1}`} />
//                   </div>
//                 ))
//               ) : (
//                 <p>No photos available.</p>
//               )}



//             </div>







//           </div>
//         </div>
//         <div className={toggleTabs === 3 ? css.showContent : css.content}>
//           <div className={css.Popup_Info_Main_right_tabs_credentials}></div>
//         </div>
//         <div className={toggleTabs === 4 ? css.showContent : css.content}>
//           <div className={css.Popup_Info_Main_right_tabs_terms}>
//             <div>
//               <h1>terms</h1>
//               <ul>
//                 <li>Credit Card</li>
//                 <li>Wire Transfer</li>
//                 <li>COD (Cash On Delivery)</li>
//                 <li>Net 5</li>
//                 <li>Net 10</li>
//                 <li>Net 30</li>
//                 <li>Cash</li>
//                 <li>Call</li>
//                 <li>Minimum Order: 0</li>
//               </ul>
//             </div>
//             <div>
//               <h1>return policy</h1>
//               <p>30 days</p>
//             </div>
//             <div>
//               <h1>legal files</h1>
//               <p>Profile Incomplete</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TabContent;






































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
  const [companyData, setCompanyData] = useState(null);

  const dispatch = useDispatch();
  const { companyContactData } = useSelector((store) => store.searchProductStore);
  const token = Cookies.get("token");

  console.log("CompanyId From Tab Content Page", companyId);

  useEffect(() => {
    if (companyId && token) {
      setLoading(true); // Set loading to true when fetching data
      dispatch(getCompanyContact({ id: companyId, token }))
        .then((data) => {
          setCompanyData(data);
          setLoading(false); // Set loading to false when data is fetched
        })
        .catch((error) => {
          console.error("Error fetching company data:", error);
          setLoading(false); // Set loading to false on error
        });
    } else {
      console.log("Company ID or Token is missing");
      setLoading(false); // In case no company ID or token is found
    }
  }, [dispatch, companyId, token]);

  // const companyImages =
  // popupCompanyDetail[0] &&
  // popupCompanyDetail[0].addedBy &&
  // popupCompanyDetail[0].addedBy.company &&
  // popupCompanyDetail[0].addedBy.company.company_images
  //   ? popupCompanyDetail[0].addedBy.company.company_images
  //   : [];
  // console.log([popupCompanyDetail[0].addedBy.company.company_images][0]);



  // While loading, show loading indicator


  const companyUserId = companyContactData.data.contacts.map((item) => item.id)
  console.log("User Id from Comapny Modal", companyUserId)

  const companyUsersCount = companyContactData.data.contacts.length



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
            contacts ({companyUsersCount})
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




              {
                companyContactData?.data?.contacts?.map((user, id) => {
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
                          <img src={user.profileImage} alt="company logo" />
                          <div
                            className={
                              css.Popup_Info_Main_right_tabs_contact_right_companies_list_details
                            }
                          >
                            <h2>{user.firstName} {user.lastName}</h2>
                            <div>
                              <span>
                                <strong>title:</strong>
                                <strong>{user.specialty}</strong>
                              </span>
                              <span>
                                <strong>phone:</strong>
                                <strong>{user.phoneNumber}</strong>
                              </span>
                              <span>
                                <strong>fax:</strong>
                                <strong>{user.faxNumber}</strong>
                              </span>
                              <span>
                                <strong>email:</strong>
                                <strong
                                >
                                  {user.email}
                                </strong>
                              </span>
                            </div>
                          </div>
                          {/* <button> */}

                          <span className="cursor-pointer hover:text-orange-500 transition-colors" onClick={() => userDeleteHandler(user.id)}>
                            <MdPersonRemoveAlt1 />
                            remove contact
                          </span>
                          {/* </button> */}

                        </div>
                        <div
                          className={
                            css.Popup_Info_Main_right_tabs_contact_right_companies_myNotes
                          }
                        >
                          <div>
                            <strong className="p-2 text-lg">my notes:</strong>
                            <span>
                              <strong>my rating</strong>
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
                            <textarea  placeholder="This section is only visible to you by your login. Enter your personal notes about this here"></textarea>
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
            <h1>company photos</h1>
            <div className={css.Popup_Info_Main_right_tabs_photos_img}>
              {/* {[popupCompanyDetail[0].addedBy.company.company_images][0].map(
                (image) => {
                  console.log(image.image);
                  
                  return (
                    <div key={image.id}>
                      <img src={image.image} alt="company photo" />
                    </div>
                  );
                }
              )} */}


              {/* 
<div className={css.Popup_Info_Main_right_tabs_photos_img}>
              {companyImages.map((image) => (
                <div key={image.id}>
                  <img src={image.image} alt="company photo" />
                </div>
              ))}*/}

              {/* 
              {company.company_images && company.company_images.length > 0 ? (
                company.company_images.map((image, index) => (
                  <div key={index}>
                    <img src={image.image} alt={`Company photo ${index + 1}`} />
                  </div>
                ))
              ) : (
                <p>No photos available.</p>
              )} */}



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
              <p>Pofile Incomplete</p>
              {/* <li>Wire Transfer</li>
                <li>COD (Cash On Delivery)</li>
                <li>Net 5</li>
                <li>Net 10</li>
                <li>Net 30</li>
                <li>Cash</li>
                <li>Call</li>
                <li>Minimum Order: 0</li> */}
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


import React, { memo, useEffect, useState } from "react";
import css from "../../../styles/Popup/CompanyDetails.module.css";
import TabContent from "./TabContent";
import TabInformation from "./TabInformation";
import {
  FaEnvelope,
  FaEyeSlash,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaPrint,
  FaRegListAlt,
} from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoPersonAdd, IoPersonRemove } from "react-icons/io5";
import { BsStarFill } from "react-icons/bs";
import { setTogglePopUp } from "../../../ReduxStore/SearchProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyContact } from "../../../ReduxStore/SearchProductSlice";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";

const CompanyDetails = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { popupCompanyDetail } = useSelector((store) => store.searchProductStore);
  // Loading state
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal initially open
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState(null);

  if (!popupCompanyDetail || !popupCompanyDetail[0]) {
    return <p>Loading company details...</p>;
  }



  // const company = popupCompanyDetail[0];


  // Get the first company object passed to the modal
  const company = popupCompanyDetail ? popupCompanyDetail[0] : null;

  // Log the company to check the details
  console.log("Company Data in Modal:", company);
  const companyId = company?.id;
  const { companyContactData } = useSelector((store) => store.searchProductStore);
  const token = Cookies.get("token");

  console.log("CompanyId ", companyId);
  console.log("COMPANY CONTACT DATA FROM FRONTEND", companyContactData);

  // Handle empty company array or error
  if (!company || !companyId) {
    return <h2>No company data available.</h2>; // Show a message if no company is selected
  }

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



  const printCompanyModal = () => {
    window.print();
  }


  // Close modal when clicking outside or pressing Escape
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     const modal = document.querySelector(`.${css.Popup_Info}`);
  //     if (modal && !modal.contains(event.target)) {
  //       closeModal(); // Close modal if clicked outside
  //     }
  //   };

  //   const handleEscapeKey = (event) => {
  //     if (event.key === "Escape") {
  //       closeModal(); // Close modal on Escape key press
  //     }
  //   };

  //   // Adding event listeners
  //   document.addEventListener("click", handleClickOutside);
  //   document.addEventListener("keydown", handleEscapeKey);

  //   // Cleanup event listeners
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //     document.removeEventListener("keydown", handleEscapeKey);
  //   };
  // }, [closeModal]);




  // While loading, show loading indicator
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
    <div className={css.Popup}>
      <div className={css.Popup_Info}>
        <div className={css.Popup_Info_height}>
          <div className={css.Popup_Info_header}>
            <h1>{companyContactData.data?.company?.name}</h1>
            <div className="-mt-2 ">
              <button type="button" className="">
                <FaExternalLinkAlt />
              </button>
              <button
                type="button"
                onClick={() => closeModal()}
                className="transform active:scale-95 transition-all duration-100  "
              >
                < FaRegWindowClose />
              </button>
            </div>
          </div>
          <div className={css.Popup_Info_Main}>
            <div className={css.Popup_Info_Main_left}>
              <div className={css.Popup_Info_Main_left_img}>
                <a
                  href={companyContactData.data?.company?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
                <img src={companyContactData.data?.company?.image} />
              </div>
              {/* <div className={css.Popup_Info_Main_left_actions}>
                <div>
                  <div>
                    <IoPersonAdd />
                    <p>show first</p>
                  </div>
                  <div>
                    <IoPersonRemove />
                    <p>block vendor</p>
                  </div>
                </div>
                <div>
                  <div>
                    <FaEyeSlash />
                    <p>never show</p>
                  </div>
                  <div>
                    <FaMoneyBill />
                    <p>give discount</p>
                  </div>
                </div>
              </div> */}
              <div className={css.Popup_Info_Main_left_comments}>
                <div>

                  <div className={css.gridHome1_MemberDetail_reviews_stars}>
                    <div data-v-217e3916="" class="vue-rate-it-rating" style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center"
                    }}>
                      <div data-v-217e3916="" class="vue-rate-it-rating-item">
                        <div data-v-217e3916="" step="50" style={{ display: "inline-block", marginRight: "1px" }}>
                          <svg width="17" height="17" viewBox="0 0 179 179" style={{ overflow: "visible" }}>
                            <linearGradient id="vgnr2v" x1="-2%" x2="100%" y1="0%" y2="0%">
                              <stop offset="102%" stop-color="#FFD700"></stop>
                              <stop offset="102%" stop-color="#CCC"></stop>
                            </linearGradient>
                            <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="url(#vgnr2v)" stroke="#999" stroke-width="2" vector-effect="non-scaling-stroke" transform="scale(0.1)"></path>
                            <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="url(#vgnr2v)" transform="scale(0.1)"></path>
                          </svg>
                        </div>
                      </div>
                      <div data-v-217e3916="" class="vue-rate-it-rating-item">
                        <div data-v-217e3916="" step="50" style={{ display: "inline-block", marginRight: "1px" }}>
                          <svg width="17" height="17" viewBox="0 0 179 179" style={{ overflow: "visible" }}>
                            <linearGradient id="sjx8c" x1="-2%" x2="100%" y1="0%" y2="0%">
                              <stop offset="102%" stop-color="#FFD700"></stop>
                              <stop offset="102%" stop-color="#CCC"></stop>
                            </linearGradient>
                            <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="url(#sjx8c)" stroke="#999" stroke-width="2" vector-effect="non-scaling-stroke" transform="scale(0.1)"></path>
                            <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="url(#sjx8c)" transform="scale(0.1)"></path>
                          </svg>
                        </div>
                      </div>
                      <div data-v-217e3916="" class="vue-rate-it-rating-item">
                        <div data-v-217e3916="" step="50" style={{ display: "inline-block", marginRight: "1px" }}>
                          <svg width="17" height="17" viewBox="0 0 179 179" style={{ overflow: "visible" }}>
                            <linearGradient id="ax5l1m" x1="-2%" x2="100%" y1="0%" y2="0%">
                              <stop offset="102%" stop-color="#FFD700"></stop>
                              <stop offset="102%" stop-color="#CCC"></stop>
                            </linearGradient>
                            <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="url(#ax5l1m)" stroke="#999" stroke-width="2" vector-effect="non-scaling-stroke" transform="scale(0.1)"></path>
                            <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="url(#ax5l1m)" transform="scale(0.1)"></path>
                          </svg>
                        </div>
                      </div>
                      <div data-v-217e3916="" class="vue-rate-it-rating-item">
                        <div data-v-217e3916="" step="50" style={{ display: "inline-block", marginRight: "1px" }}>
                          <svg width="17" height="17" viewBox="0 0 179 179" style={{ overflow: "visible" }}>
                            <linearGradient id="19xik" x1="-2%" x2="100%" y1="0%" y2="0%">
                              <stop offset="102%" stop-color="#FFD700"></stop>
                              <stop offset="102%" stop-color="#CCC"></stop>
                            </linearGradient>
                            <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="url(#19xik)" stroke="#999" stroke-width="2" vector-effect="non-scaling-stroke" transform="scale(0.1)"></path>
                            <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="url(#19xik)" transform="scale(0.1)"></path>
                          </svg>
                        </div>
                      </div>
                      <div data-v-217e3916="" class="vue-rate-it-rating-item">
                        <div data-v-217e3916="" step="50" style={{ display: "inline-block", marginRight: "1px" }}>
                          <svg width="17" height="17" viewBox="0 0 179 179" style={{ overflow: "visible" }}>
                            <linearGradient id="wiiipk" x1="-2%" x2="100%" y1="0%" y2="0%">
                              <stop offset="102%" stop-color="#FFD700"></stop>
                              <stop offset="102%" stop-color="#CCC"></stop>
                            </linearGradient>
                            <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="url(#wiiipk)" stroke="#999" stroke-width="2" vector-effect="non-scaling-stroke" transform="scale(0.1)"></path>
                            <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="url(#wiiipk)" transform="scale(0.1)"></path>
                          </svg>
                        </div>
                      </div>
                      <a href="#">100%</a>
                    </div>
                  </div>
                </div>
                {/* <div>
                  <span>(3) comments</span>
                  <span>(0) new</span>
                </div> */}
              </div>
              <div className={css.Popup_Info_Main_left_companySideInformation}>
                <TabInformation companyId={companyId} />
              </div>
            </div>
            <div className={css.Popup_Info_Main_right}>
              <p className={css.Popup_Info_Main_right_description}>
                {companyContactData.data?.company?.description || "No company description available."}
              </p>
              <div className={css.Popup_Info_Main_right_productInfo}>
                <div>
                  <strong>Product Categories:</strong>
                  <p>{companyContactData.data?.company?.categories}</p>
                </div>
                <div>
                  <strong>Mfg(s) We Carry:</strong>
                  <p>{companyContactData.data?.company?.brands}</p>
                </div>
              </div>
              <div className={css.Popup_Info_Main_right_contact}>
                <div>
                  <span>
                    <strong>Address:</strong>
                    <p>{companyContactData.data?.company?.address}</p>
                  </span>
                  <span>
                    <strong>Phone:</strong>
                    <strong href={`tel:${companyContactData.data?.company?.phone_num}`}>{companyContactData.data?.company?.phone_num}</strong>
                  </span>
                  <span>
                    <strong>Website:</strong>
                    <strong href={companyContactData.data?.company?.website} target="_blank" rel="noopener noreferrer">
                      {companyContactData.data?.company?.website}
                    </strong>
                  </span>
                </div>
                <div className={css.inventorySecSvgs}>
                  {/* <span>
                    <FaMapMarkerAlt />
                    map
                  </span> */}


                  <span>
                    <FaRegListAlt />
                    <NavLink to={"/inventory"} className="cursor-pointer">
                      inventory
                    </NavLink>
                  </span>


                  {/* <span>
                    <FaEnvelope />
                    email
                  </span> */}
                  <span className="cursor-pointer" onClick={printCompanyModal}>
                    <FaPrint />
                    Print
                  </span>

                </div>
              </div>

              <div className={css.Popup_Info_Main_right_tabs_layout}>
                <TabContent companyId={companyId} />

              </div>

            </div>
          </div>
          <div className={css.Popup_Info_Main_bottom}>
            <a
              href="/myprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              Questions, Comments, or Concerns?
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CompanyDetails);






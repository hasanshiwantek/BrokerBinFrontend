
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
import { RxOpenInNewWindow } from "react-icons/rx";
import { AiFillCloseSquare } from "react-icons/ai";
import { IoPersonAdd, IoPersonRemove } from "react-icons/io5";
import { BsStarFill } from "react-icons/bs";
import { setTogglePopUp } from "../../../ReduxStore/SearchProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyContact } from "../../../ReduxStore/SearchProductSlice";
import Cookies from "js-cookie";

// import companyLogo from "../../../imgs/logo/CompanyDetailsLogo.jpg";

const CompanyDetails = ({closeModal}) => {
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
            <div>
              <button type="button">
                <RxOpenInNewWindow />
              </button>
              <button
                type="button"
                onClick={() => closeModal()}
                className="transform active:scale-95 transition-all duration-100 "
              >
                <AiFillCloseSquare  />
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
              <div className={css.Popup_Info_Main_left_actions}>
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
              </div>
              <div className={css.Popup_Info_Main_left_comments}>
                <div>
                  <div className={css.Popup_Info_Main_left_comments_stars}>
                    {new Array(5).fill(null).map((_, i) => (
                      <BsStarFill key={i} />
                    ))}
                  </div>
                  <span>100%</span>
                </div>
                <div>
                  <span>(3) comments</span>
                  <span>(0) new</span>
                </div>
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
                <div>
                  <span>
                    <FaMapMarkerAlt />
                    map
                  </span>
                  <span>
                    <FaRegListAlt />
                    inventory
                  </span>
                  <span>
                    <FaEnvelope />
                    email
                  </span>
                  <span>
                    <FaPrint />
                    print
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
            <span>
              <p>BrokerBin.com Account Representative:</p>
              <a href="mailto:kaifabbas03111@gmail.com">Kaif Abbas</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CompanyDetails);






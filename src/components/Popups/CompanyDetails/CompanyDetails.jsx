
import React, { memo, useEffect } from "react";
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
// import companyLogo from "../../../imgs/logo/CompanyDetailsLogo.jpg";

const CompanyDetails = ({closeModal}) => {
  const dispatch = useDispatch();
  const { popupCompanyDetail } = useSelector((store) => store.searchProductStore);


  if (!popupCompanyDetail || !popupCompanyDetail[0]) {
    return <p>Loading company details...</p>;
  }

  const company = popupCompanyDetail[0];
  console.log(">..",company)
  useEffect(() => {
    // const handleClickOutside = (event) => {
    //   const popupInfo = document.querySelector(`.${css.Popup_Info}`);
    //   if (popupInfo && !popupInfo.contains(event.target)) {
    //     closeModal(); // Call closeModal prop to close the modal
    //   }
    // };

    // const escKeyToggle = (event) => {
    //   if (event.key === "Escape") {
    //     closeModal(); // Close modal on Escape key press
    //   }
    // };

    // document.addEventListener("keydown", escKeyToggle);
    // document.addEventListener("click", handleClickOutside);

    // return () => {
    //   document.removeEventListener("click", handleClickOutside);
    //   document.removeEventListener("keydown", escKeyToggle);
    // };
  }, );

  return (
    <div className={css.Popup}>
      <div className={css.Popup_Info}>
        <div className={css.Popup_Info_height}>
          <div className={css.Popup_Info_header}>
            <h1>{company.name}</h1>
            <div>
              <button type="button">
                <RxOpenInNewWindow />   
              </button>
              <button
                type="button"
                onClick={() => closeModal()}
              >
                <AiFillCloseSquare />
              </button>
            </div>
          </div>
          <div className={css.Popup_Info_Main}>
            <div className={css.Popup_Info_Main_left}>
              <div className={css.Popup_Info_Main_left_img}>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={company.image || "Company Logo"} alt="company logo" />
                </a>
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
                <TabInformation />
              </div>
            </div>
            <div className={css.Popup_Info_Main_right}>
              <p className={css.Popup_Info_Main_right_description}>
                {company.description || "No company description available."}
              </p>
              <div className={css.Popup_Info_Main_right_productInfo}>
                <div>
                  <h3>Product Categories:</h3>
                  <p>{company.categories}</p>
                </div>
                <div>
                  <h3>Mfg(s) We Carry:</h3>
                  <p>{company.company_specialization}</p>
                </div>
              </div>
              <div className={css.Popup_Info_Main_right_contact}>
                <div>
                  <span>
                    <h3>Address:</h3>
                    <p>{company.address}</p>
                  </span>
                  <span>
                    <h3>Phone:</h3>
                    <a href={`tel:${company.phone_num}`}>{company.phone_num}</a>
                  </span>
                  <span>
                    <h3>Website:</h3>
                    <a href={company.website} target="_blank" rel="noopener noreferrer">
                      {company.website}
                    </a>
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
                <TabContent />
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

import React, { useState, useEffect } from "react";
import css from "../../../styles/Popup/CompanyDetails.module.css";
import PlusSquare from "../../../svgs/PlusSquare";
import { companySideInformation } from "../../../data/tableData";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie"
import { getCompanyContact } from "../../../ReduxStore/SearchProductSlice";


const TabInformation = ({ companyId }) => {
  const [toggleTabOne, setToggleTabOne] = useState(true);
  const [toggleTabTwo, setToggleTabTwo] = useState(true);
  const [toggleTabThree, setToggleTabThree] = useState(true);
  // const { companyInformation, PrimaryContactInformation, SalesInformation } =
  //   companySideInformation;
  // const { popupCompanyDetail } = useSelector(
  //   (store) => store.searchProductStore
  // );




  const dispatch = useDispatch();
  const { companyContactData } = useSelector((store) => store.searchProductStore);
  const token = Cookies.get("token");

  // Loading state
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState(null);
  console.log("Company Contact Data From ")
  console.log("CompanyId From TabInformation Page", companyId);
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
    <>
      <div className={css.Popup_Info_Main_left_companySideInformation}>
        <ul className={css.Popup_Info_Main_left_companySideInformation_tabs}>
          <li
            className={css.Popup_Info_Main_left_companySideInformation_tabs_li}
          >
            <h3>Company Information</h3>
            <span onClick={() => setToggleTabOne((prev) => !prev)} className="cursor-pointer">
              <PlusSquare />
            </span>
          </li>
          <div
            className={toggleTabOne === true ? css.showContent : css.content}
          >

            <ul >
              <span>
                <li>Employees:</li>
                <li>{companyContactData.data?.company?.total_employees
                }</li>
              </span>
              <span>
                <li>Member Since:</li>
                <li>{companyContactData.data?.company?.member_since}</li>
              </span>
              <span>
                <li>Open:</li>
                <li>{companyContactData.data?.company?.open_timing}</li>
              </span>
              <span>
                <li>Close:</li>
                <li>{companyContactData.data?.company?.close}</li>
              </span>
              <span>
                <li>Inventory Listed:</li>
                <li>Not Available</li>
              </span>
              <span>
                <li>Broadcasts:</li>
                <li>Not Available</li>
              </span>
            </ul>


          </div>
          <li
            className={css.Popup_Info_Main_left_companySideInformation_tabs_li}
          >
            <h3>Primary Contact Information</h3>
            <span onClick={() => setToggleTabTwo((prev) => !prev)} className="cursor-pointer">
              <PlusSquare />
            </span>
          </li>

          <div
            className={toggleTabTwo === true ? css.showContent : css.content}
          >

            <ul >
              <span>
                <li>Contact:</li>
                <li>{companyContactData.data?.company?.primaryContact?.firstName} {companyContactData.data?.company?.primaryContact?.lastName}
                </li>
              </span>
              <span>
                <li>Position:</li>
                <li>{companyContactData.data?.company?.primaryContact?.position}</li>
              </span>
              <span>
                <li>Phone:</li>
                <li>{companyContactData.data?.company?.primaryContact?.phoneNumber}</li>
              </span>
              <span>
                <li>Networks:</li>
                <li>{companyContactData.data?.company?.primaryContact?.socialNetworking?.facebook || ""}</li>
              </span>
            </ul>


          </div>
          <li
            className={css.Popup_Info_Main_left_companySideInformation_tabs_li}
          >
            <h3>Sales Information</h3>
            <span onClick={() => setToggleTabThree((prev) => !prev)} className="cursor-pointer">
              <PlusSquare />
            </span>
          </li>
          <div
            className={toggleTabThree === true ? css.showContent : css.content}
          >

            <ul>
              <span>
                <li>Trading Region:</li>
                <li>{companyContactData.data?.company?.trading_region || "N/A"}</li>
              </span>
              <span>
                <li>Trade Program:</li>
                <li>
                  {companyContactData.data?.company?.trade_program === "1" ? "Yes" : "No"}
                </li>
              </span>
              <span>
                <li>Rental Programs:</li>
                <li>
                  {companyContactData.data?.company?.rental_program === "1" ? "Yes" : "No"}
                </li>
              </span>
              <span>
                <li>Blind Shipping:</li>
                <li>
                  {companyContactData.data?.company?.blind_shipping === "1" ? "Yes" : "No"}
                </li>
              </span>
              <span>
                <li>Shipping Deadline:</li>
                <li>{companyContactData.data?.company?.shipping_deadline || "N/A"}</li>
              </span>
            </ul>



          </div>
        </ul>
      </div>
    </>
  );
};

export default TabInformation;

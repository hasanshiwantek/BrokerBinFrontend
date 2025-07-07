import React, { useState, useEffect } from "react";
import css from "../../../styles/Popup/CompanyDetails.module.css";
import PlusSquare from "../../../svgs/PlusSquare";
import { companySideInformation } from "../../../data/tableData";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { getCompanyContact } from "../../../ReduxStore/SearchProductSlice";
import { FaPencilAlt } from "react-icons/fa";
import { Tooltip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
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
  const { companyContactData } = useSelector(
    (store) => store.searchProductStore
  );
  const token = Cookies.get("token");

  // Loading state
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState(null);
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
      console.error("Company ID or Token is missing");
      setLoading(false); // In case no company ID or token is found
    }
  }, [dispatch, companyId, token]);

  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "1.1rem", // Adjust font size
            width: "fitContent",
            textAlign: "center",
            backgroundColor: "var(--primary-color)",
          },
          arrow: {
            color: "var(--primary-color)",
          },
        },
      },
    },
  });

  // While loading, show loading indicator
  if (loading) {
    return (
      <div className={css.Popup}>
        <div className={css.Popup_Info}>
          <div className={css.Popup_Info_height}>
            <div className={css.Popup_Info_header}>
              <h1>Loading company details...</h1>
            </div>
            <div className={css.Popup_Info_Main_left}>
              <div className={css.loader}></div> {/* Spinner here */}
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
            <div className="flex justify-start items-center gap-4">
              <h3>Company Information</h3>
              <ThemeProvider theme={theme}>
                <Tooltip
                  title={`Edit Your Company Information `}
                  arrow placement="top"
                >
                  <NavLink to={"/mycompany/CompanyInfo"}>
                  <FaPencilAlt size={15} className="cursor-pointer" />
                  </NavLink>
                </Tooltip>
              </ThemeProvider>
            </div>
            <span
              onClick={() => setToggleTabOne((prev) => !prev)}
              className="cursor-pointer flex justify-between gap-2 items-center"
            >
              <PlusSquare />
            </span>
          </li>
          <div
            className={toggleTabOne === true ? css.showContent : css.content}
          >
            <ul>
              <span>
                <li className="!font-semibold">Employees:</li>
                <li>{companyContactData.data?.company?.total_employees}</li>
              </span>
              <span>
                <li className="!font-semibold">Member Since:</li>
                <li>{companyContactData.data?.company?.member_since}</li>
              </span>
              <span>
                <li className="!font-semibold">Open:</li>
                <li>{companyContactData.data?.company?.open_timing}</li>
              </span>
              <span>
                <li className="!font-semibold">Close:</li>
                <li>{companyContactData.data?.company?.close}</li>
              </span>
              <span>
                <li className="!font-semibold"> Inventory Listed:</li>
                <li>Not Available</li>
              </span>
              <span>
                <li className="!font-semibold">Broadcasts:</li>
                <li>Not Available</li>
              </span>
            </ul>
          </div>
          <li
            className={css.Popup_Info_Main_left_companySideInformation_tabs_li}
          >
            <div className="flex justify-start items-center gap-4">
              <h3 className="whitespace-nowrap">Primary Contact Information</h3>
              <ThemeProvider theme={theme}>
                <Tooltip
                  title={`Edit Your Primary Contact Information`}
                  arrow placement="top"
                >
                  <NavLink to={"/mycompany"}>
                  <FaPencilAlt size={15} className="cursor-pointer" />
                  </NavLink>
                </Tooltip>
              </ThemeProvider>
            </div>
            <span
              onClick={() => setToggleTabTwo((prev) => !prev)}
              className="cursor-pointer"
            >
              <PlusSquare />
            </span>
          </li>

          <div
            className={toggleTabTwo === true ? css.showContent : css.content}
          >
            <ul>
              <span>
                <li className="!font-semibold">Contact:</li>
                <li>
                  {companyContactData.data?.company?.primaryContact?.firstName}{" "}
                  {companyContactData.data?.company?.primaryContact?.lastName}
                </li>
              </span>
              <span>
                <li className="!font-semibold">Position:</li>
                <li>
                  {companyContactData.data?.company?.primaryContact?.position}
                </li>
              </span>
              <span>
                <li className="!font-semibold">Phone:</li>
                <li>
                  {
                    companyContactData.data?.company?.primaryContact
                      ?.phoneNumber
                  }
                </li>
              </span>
              <span>
                <li className="!font-semibold">Networks:</li>
                <li>
                  {companyContactData.data?.company?.primaryContact
                    ?.socialNetworking?.facebook || ""}{" "}
                </li>
                <br />
                <li>
                  {companyContactData.data?.company?.primaryContact
                    ?.socialNetworking?.linkedin || ""}
                </li>
                <br />
                <li>
                  {companyContactData.data?.company?.primaryContact
                    ?.socialNetworking?.twitter || ""}
                </li>
                <br />
              </span>
            </ul>
          </div>
          <li
            className={css.Popup_Info_Main_left_companySideInformation_tabs_li}
          >
            <div className="flex justify-start items-center gap-4">
              <h3>Sales Information</h3>
              <ThemeProvider theme={theme}>
                <Tooltip
                  title={`Edit Your Sales Information`}
                  arrow placement="top"
                >
                  <NavLink to={"/mycompany/SalesInfo"}>
                  <FaPencilAlt size={15} className="cursor-pointer" />
                  </NavLink>
                </Tooltip>
              </ThemeProvider>
            </div>
            <span
              onClick={() => setToggleTabThree((prev) => !prev)}
              className="cursor-pointer "
            >
              <PlusSquare />
            </span>
          </li>
          <div
            className={toggleTabThree === true ? css.showContent : css.content}
          >
            <ul>
              <span>
                <li className="!font-semibold"> Trading Region:</li>
                <li>
                  {(
                    companyContactData?.data?.company?.trading_region || []
                  ).map((region, idx) => (
                    <p key={idx}>
                      {region}
                      {idx <
                        companyContactData?.data?.company?.trading_region
                          .length -
                          1 && ","}
                    </p>
                  ))}
                </li>
              </span>
              <span>
                <li className="!font-semibold">Trade Program:</li>
                <li>
                  {companyContactData.data?.company?.trade_program == 1
                    ? "Yes"
                    : "No"}
                </li>
              </span>
              <span>
                <li className="!font-semibold">Rental Programs:</li>
                <li>
                  {companyContactData.data?.company?.rental_program == 1
                    ? "Yes"
                    : "No"}
                </li>
              </span>
              <span>
                <li className="!font-semibold">Blind Shipping:</li>
                <li>
                  {companyContactData.data?.company?.blind_shipping == 1
                    ? "Yes"
                    : "No"}
                </li>
              </span>
              <span>
                <li className="!font-semibold">Shipping Deadline:</li>
                <li>
                  {companyContactData.data?.company?.shipping_deadline || "N/A"}
                </li>
              </span>
            </ul>
          </div>
        </ul>
      </div>
    </>
  );
};

export default TabInformation;

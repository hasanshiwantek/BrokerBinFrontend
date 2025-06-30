import React, { useState } from "react";
import css from "../styles/Accordion.module.css";
import { BiSolidDownArrow } from "react-icons/bi";
import { setTogglePopUp } from "@/ReduxStore/SearchProductSlice";
import CompanyDetails from "./Popups/CompanyDetails/CompanyDetails";
import { setPopupCompanyDetail } from "@/ReduxStore/SearchProductSlice";
import { useSelector, useDispatch } from "react-redux";
import { handleVendorStatusUpdate } from "./Popups/CompanyDetails/HandleVendorStatusUpdate";
import { Tooltip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blockMyVendor, addMyVendors } from "@/ReduxStore/ToolsSlice";
import { FaUserXmark, FaUserCheck } from "react-icons/fa6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { IoPersonAdd } from "react-icons/io5";
import Cookies from "js-cookie";

const Accordion = ({
  groupedData,
  selectedParts,
  setSelectedParts,
  pdfRef,
  filterOption,
}) => {
  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "1.1rem", // Adjust font size
            width: "15rem",
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

  const [activePanel, setActivePanel] = useState([]);
  // const dispatch = useDispatch();

  const togglePanel = (index) => {
    setActivePanel((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleToggle = (item) => {
    setSelectedParts((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const country = groupedData[company][0]?.company_country || "Unknown";

  // const companies = Object.entries(groupedData)
  //   .sort((a, b) => {
  //     const aParts = a[1];
  //     const bParts = b[1];

  //     switch (filterOption) {
  //       case "cnt_ASC":
  //         return aParts.length - bParts.length;
  //       case "cnt_DESC":
  //         return bParts.length - aParts.length;
  //       case "maxprice":
  //         return (
  //           Math.max(...bParts.map((p) => p.price || 0)) -
  //           Math.max(...aParts.map((p) => p.price || 0))
  //         );
  //       case "lowestprice":
  //         return (
  //           Math.min(...aParts.map((p) => p.price || 0)) -
  //           Math.min(...bParts.map((p) => p.price || 0))
  //         );
  //       case "bestmatch":
  //       default:
  //         return 0;
  //     }
  //   })
  //   .map(([company]) => company);

  const companies = Object.entries(groupedData)
  .filter(([company, parts]) => 
    company !== "Unknown Company" && 
    Array.isArray(parts) && 
    parts.length > 0 &&
    parts[0]?.inventory?.addedBy?.company?.name // ensure valid company name
  )
  .sort((a, b) => {
    const aParts = a[1];
    const bParts = b[1];
    switch (filterOption) {
      case "cnt_ASC":
        return aParts.length - bParts.length;
      case "cnt_DESC":
        return bParts.length - aParts.length;
      case "maxprice":
        return Math.max(...bParts.map((p) => p.price || 0)) - Math.max(...aParts.map((p) => p.price || 0));
      case "lowestprice":
        return Math.min(...aParts.map((p) => p.price || 0)) - Math.min(...bParts.map((p) => p.price || 0));
      case "bestmatch":
      default:
        return 0;
    }
  })
  .map(([company]) => company);

  console.log("Companies: ", companies);

  console.log("Grouped Data: ", groupedData);

  const { togglePopUp, popupCompanyDetail } = useSelector(
    (state) => state.searchProductStore
  );

  // Company Modal Logic
  const openCompanyModal = (company) => {
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUp()); // Show company modal
  };

  const token = Cookies.get("token");

  // BLOCK VENDOR FUNCTION
  const [localStatus, setLocalStatus] = useState({});

  const handleBlockVendor = async (companyId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    console.log(newStatus);

    try {
      dispatch(
        blockMyVendor({ company_id: companyId, token, status: newStatus })
      );
      setLocalStatus((prev) => ({
        ...prev,
        [companyId]: newStatus,
      }));

      toast.info(
        `Vendor ${newStatus === 1 ? "blocked" : "unblocked"} successfully!`,
        {
          style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" }, //
        }
      );
    } catch (error) {
      console.error("Error toggling vendor status", error);
      toast.error("Failed to update vendor status.", {
        style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" }, //
      });
    }
  };

  const handleAddVendor = async (companyId) => {
    try {
      const payload = { company_id: companyId };

      const response = await dispatch(
        addMyVendors({ companyId: payload, token })
      ).unwrap();

      // Show backend message
      toast.info(response.message || "Vendor updated successfully!", {
        style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" }, //
      });

      console.log("Add Vendor Response:", response);
    } catch (error) {
      console.error("Error adding vendor", error);
      toast.error(error?.message || "Failed to update vendor.", {
        style: { fontSize: "16px" },
      });
    }
  };

  const sortParts = (parts) => {
    switch (filterOption) {
      case "cnt_ASC":
        return [...parts].sort((a, b) => a.quantity - b.quantity);
      case "cnt_DESC":
        return [...parts].sort((a, b) => b.quantity - a.quantity);
      case "maxprice":
        return [...parts].sort((a, b) => b.price - a.price);
      case "lowestprice":
        return [...parts].sort((a, b) => a.price - b.price);
      default:
        return parts; // bestmatch or unknown, no sorting
    }
  };

  return (
    <>

      <div className={css.accordion}>
        {companies.length > 0 && (
          <div className=" px-4 py-2">
            <button
              onClick={() =>
                setActivePanel(
                  activePanel.length === companies.length
                    ? [] // Collapse all
                    : companies.map((_, idx) => idx) // Expand all
                )
              }
              className="text-black  text-[9pt] px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
            >
              {activePanel.length === companies.length
                ? "Collapse All"
                : "Expand All"}
            </button>
          </div>
        )}

        {companies.map((company, index) => {
          const companyObj =
            groupedData[company][0]?.inventory?.addedBy?.company;
          console.log(companyObj);

          const companyId = companyObj?.id;
          console.log(companyId);
          const effectiveStatus =
            localStatus[companyId] !== undefined
              ? localStatus[companyId]
              : companyObj?.status;

          console.log(effectiveStatus);

          return (
            
            
            <div className={css.accordionPanel} key={index}>

              <div ref={pdfRef}>
                <h2 id={`panel${index + 1}-title`}>
                  <button
                    className={`${css.accordionTrigger} flex justify-between items-center w-full`}
                    aria-controls={`panel${index + 1}-content`}
                    onClick={() => togglePanel(index)}
                  >
                    {/* Left Section: Count + Country + Company */}
                    <div className="flex flex-col items-start text-left gap-1">
                      <span className="text-[8pt] font-medium">
                        {`${groupedData[company].length} Parts With ${
                          groupedData[company].length
                        } Results - ${
                          groupedData[company][0]?.inventory?.addedBy
                            ?.country || "N/A"
                        }`}
                      </span>
                      <span className="text-[8pt] font-semibold">
                        {company}
                      </span>
                    </div>

                    {/* Middle: Arrow Icon */}
                    <BiSolidDownArrow
                      className={`${css.accordionBtnToggle} ml-2`}
                      aria-expanded={activePanel.includes(index)}
                    />

                    {/* Right: Vendor Icons */}
                    <div className="flex items-center gap-4 ml-4">
                      <ThemeProvider theme={theme}>
                        <Tooltip title="Add to MyVendors" arrow>
                          <span
                            onClick={() => handleAddVendor(companyId)}
                            className="cursor-pointer"
                          >
                            <IoPersonAdd size={18} />
                          </span>
                        </Tooltip>
                      </ThemeProvider>
                      <ThemeProvider theme={theme}>
                        <Tooltip
                          title={
                            effectiveStatus === 1
                              ? "Unblock Vendor"
                              : "Block this vendor from viewing my inventory"
                          }
                          arrow
                        >
                          <span
                            onClick={() =>
                              handleBlockVendor(companyId, effectiveStatus)
                            }
                            className="cursor-pointer"
                          >
                            {effectiveStatus === 1 ? (
                              <FaUserCheck size={18} />
                            ) : (
                              <FaUserXmark size={18} />
                            )}
                          </span>
                        </Tooltip>
                      </ThemeProvider>
                    </div>
                  </button>
                </h2>
              </div>
              <div
                className={css.accordionContent}
                role="region"
                aria-labelledby={`panel${index + 1}-title`}
                aria-hidden={!activePanel.includes(index)}
                id={`panel${index + 1}-content`}
              >
                <table>
                  <thead>
                    <tr>
                      <th>cart</th>
                      <th>Company</th>
                      <th>part#</th>
                      <th>HECI/CLEI</th>
                      <th>Mfg</th>
                      <th>cond</th>
                      <th>price</th>
                      <th>qty</th>
                      <th>age</th>
                      <th>description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortParts(groupedData[company]).map((item, i) => (
                      <tr key={i}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedParts.some(
                              (p) => p.id === item.id
                            )}
                            onChange={() => handleToggle(item)}
                          />
                        </td>
                        <td
                          className="cursor-pointer"
                          onClick={() =>
                            openCompanyModal(item?.inventory?.addedBy?.company)
                          }
                        >
                          {item.inventory?.addedBy.company.name}
                        </td>
                        <td>{item.inventory?.partModel}</td>
                        <td>{item.inventory?.heciClei}</td>
                        <td>{item.inventory?.mfg}</td>
                        <td>{item.inventory?.cond}</td>
                        <td>{item.inventory?.price}</td>
                        <td>{item.inventory?.quantity}</td>
                        <td>{item.inventory?.age}</td>
                        <td>{item.inventory?.productDescription}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {companies.length > 0 && (
          <div className=" px-4 py-2">
            <button
              onClick={() =>
                setActivePanel(
                  activePanel.length === companies.length
                    ? [] // Collapse all
                    : companies.map((_, idx) => idx) // Expand all
                )
              }
              className="text-black text-[9pt] px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
            >
              {activePanel.length === companies.length
                ? "Collapse All"
                : "Expand All"}
            </button>
          </div>
        )}
      </div>

      {togglePopUp && (
        <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />
      )}

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default Accordion;
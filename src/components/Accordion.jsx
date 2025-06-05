import React, { useState} from "react";
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

const Accordion = ({ groupedData, selectedParts, setSelectedParts, pdfRef }) => {
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

  const companies = Object.keys(groupedData);
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
      toast.success(
        `Vendor ${newStatus === 1 ? "blocked" : "unblocked"} successfully!`,
        { style: { fontSize: "16px" } }
      );
    } catch (error) {
      console.error("Error toggling vendor status", error);
      toast.error("Failed to update vendor status.", {
        style: { fontSize: "16px" },
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
      toast.success(response.message || "Vendor updated successfully!", {
        style: { fontSize: "16px" },
      });

      console.log("Add Vendor Response:", response);
    } catch (error) {
      console.error("Error adding vendor", error);
      toast.error(error?.message || "Failed to update vendor.", {
        style: { fontSize: "16px" },
      });
    }
    };

  return (
    <>
      <div className={css.accordion}>
        {companies.map((company, index) => {
          const companyObj = groupedData[company][0]?.addedBy?.company;
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
                    className={css.accordionTrigger}
                    aria-controls={`panel${index + 1}-content`}
                    onClick={() => togglePanel(index)}
                  >
                    {`${groupedData[company].length} parts with ${groupedData[company].length} results - ${groupedData[company][0]?.company_country}`}
                    <span
                      onClick={() => openCompanyModal(company)}
                      className="text-[8pt]"
                    >
                      {company}
                    </span>
                    <div></div>

                    <BiSolidDownArrow
                      className={css.accordionBtnToggle}
                      aria-expanded={activePanel.includes(index)}
                    />
                    <div className="flex items-center gap-4">
                      <span
                        onClick={() => handleAddVendor(companyId)}
                        className="cursor-pointer"
                        title="Add Vendor"
                      >
                        <IoPersonAdd size={18} />
                      </span>
                      <span
                        onClick={() =>
                          handleBlockVendor(companyId, effectiveStatus)
                        }
                        className="cursor-pointer"
                        title={`${effectiveStatus === 1
                            ? "Unblock Vendor"
                            : "Block Vendor"
                          }`}
                      >
                        <FaUserXmark size={18} />
                      </span>
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
                    {groupedData[company].map((item, i) => (
                      <tr key={i}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedParts.some((p) => p.id === item.id)}
                            onChange={() => handleToggle(item)}
                          />
                        </td>
                        <td
                          className="cursor-pointer"
                          onClick={() => openCompanyModal(item.addedBy.company)}
                        >
                          {item.addedBy.company.name}
                        </td>
                        <td>{item.partModel}</td>
                        <td>{item.heciClei}</td>
                        <td>{item.mfg}</td>
                        <td>{item.cond}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.age}</td>
                        <td>{item.productDescription}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>

      {togglePopUp && (
        <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />
      )}
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default Accordion;
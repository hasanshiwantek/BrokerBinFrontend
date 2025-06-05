import React, { useState } from "react";
import css from "../styles/Accordion.module.css";
import { BiSolidDownArrow } from "react-icons/bi";
import { setTogglePopUp } from "@/ReduxStore/SearchProductSlice";
import CompanyDetails from "./Popups/CompanyDetails/CompanyDetails";
import { setPopupCompanyDetail } from "@/ReduxStore/SearchProductSlice";
import { useSelector, useDispatch } from "react-redux";
const Accordion = ({ groupedData }) => {
  const [activePanel, setActivePanel] = useState([]);
  const dispatch = useDispatch();

  const togglePanel = (index) => {
    setActivePanel((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const companies = Object.keys(groupedData);
  console.log("Companies: ",companies);
  
  console.log("Grouped Data: ",groupedData);

  const { togglePopUp, popupCompanyDetail } = useSelector(
    (state) => state.searchProductStore
  );

  // Company Modal Logic
  const openCompanyModal = (company) => {
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUp()); // Show company modal
  };

  return (
    <>
      <div className={css.accordion}>
        {companies.map((company, index) => (
          <div className={css.accordionPanel} key={index}>
            <div>
              <h2 id={`panel${index + 1}-title`}>
                <button
                  className={css.accordionTrigger}
                  aria-controls={`panel${index + 1}-content`}
                  onClick={() => togglePanel(index)}
                >
                  {company}
                  <BiSolidDownArrow
                    className={css.accordionBtnToggle}
                    aria-expanded={activePanel.includes(index)}
                  />
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
                        <input type="checkbox" />
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
        ))}
      </div>

      {togglePopUp && (
        <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />
      )}
    </>
  );
};

export default Accordion;

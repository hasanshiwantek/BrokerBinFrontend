import React, { useState } from "react";
import css from "../styles/Accordion.module.css";
import { BiSolidDownArrow } from "react-icons/bi";

const Accordion = ({
  panels,
  // partList,
  // organizedByCountry,
  organizedByCountryAndCompany,
}) => {
  const [activePanel, setActivePanel] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [allExpanded, setAllExpanded] = useState(false);

  const togglePanel = (panelIndex) => {
    setAllExpanded(false); // cancel expand-all when manually toggled
    setActivePanel(activePanel === panelIndex ? null : panelIndex);
  };

  const handleToggleExpandAll = () => {
    if (allExpanded) {
      setAllExpanded(false);
      setActivePanel(null);
    } else {
      setAllExpanded(true);
      setActivePanel(null); // clear individual toggle
    }
  };

  const handleCloseAll = () => {
    setAllExpanded(false);
    setActivePanel(null);
  };
  const totalItems = Object.entries(organizedByCountryAndCompany).reduce(
    (count, [_, companies]) => {
      return (
        count +
        Object.values(companies).reduce((sub, items) => sub + items.length, 0)
      );
    },
    0
  );

  const areAllChecked = Object.keys(checkedItems).length === totalItems;

  const handleToggleCheckAll = () => {
    if (areAllChecked) {
      setCheckedItems({});
    } else {
      const newChecked = {};
      Object.entries(organizedByCountryAndCompany).forEach(
        ([country, companies]) => {
          Object.entries(companies).forEach(([company, items]) => {
            items.forEach((item, index) => {
              const key = `${country}-${company}-${index}`;
              newChecked[key] = true;
            });
          });
        }
      );
      setCheckedItems(newChecked);
    }
  };

  const handleRemoveAll = () => {
    setCheckedItems({});
  };

  return (
    <div className={css.accordion}>
      <button
        onClick={handleToggleExpandAll}
        className="text-black text-[9pt] p-2 border"
      >
        {allExpanded ? "Collapse All" : "Expand All"}
      </button>

      {panels.map((panel, index) => (
        <div className={css.accordionPanel} key={index}>
          <h2 id={`panel${index + 1}-title`}>
            <button
              className={css.accordionTrigger}
              aria-controls={`panel${index + 1}-content`}
              onClick={() => togglePanel(index)}
            >
              {panel.title}
              <BiSolidDownArrow
                className={css.accordionBtnToggle}
                aria-expanded={activePanel === index || allExpanded}
              />
            </button>
          </h2>

          <div
            className={css.accordionContent}
            role="region"
            aria-labelledby={`panel${index + 1}-title`}
            aria-hidden={!(activePanel === index || allExpanded)}
            id={`panel${index + 1}-content`}
          >
            <div>
              <button
                onClick={handleToggleCheckAll}
                className="text-black text-[9pt] p-2 border"
              >
                {areAllChecked ? "Uncheck All" : "Check All"}
              </button>
              <button type="button" onClick={handleRemoveAll}>
                Remove All
              </button>
              <table>
                <thead>
                  <tr>
                    <th>cart</th>
                    <th>company</th>
                    <th>part/model</th>
                    <th>mfg</th>
                    <th>cond</th>
                    <th>price</th>
                    <th>qty</th>
                    <th>age</th>
                    <th>product description</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(organizedByCountryAndCompany).map(
                    ([country, companies]) => {
                      return Object.entries(companies).map(
                        ([companyName, items]) => {
                          return items.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <input
                                    type="checkbox"
                                    name="addToCart"
                                    id={`addToCart-${country}-${companyName}-${index}`}
                                    checked={
                                      checkedItems[
                                        `${country}-${companyName}-${index}`
                                      ] || false
                                    }
                                    onChange={() => {
                                      const key = `${country}-${companyName}-${index}`;
                                      setCheckedItems((prev) => ({
                                        ...prev,
                                        [key]: !prev[key],
                                      }));
                                    }}
                                  />
                                </td>
                                <td>{companyName}</td>
                                <td>{item.model}</td>
                                <td>{item.mfg}</td>
                                <td>{item.cond}</td>
                                <td>{item.price.toFixed(2)}</td>
                                <td>{item.quantity}</td>
                                <td>{item.age}</td>
                                <td>{item.description}</td>
                              </tr>
                            );
                          });
                        }
                      );
                    }
                  )}
                </tbody>
              </table>
              {(activePanel === index || allExpanded) && (
                <button
                  onClick={handleCloseAll}
                  className="text-black text-[9pt] p-2 border mb-2"
                >
                  Collapse All
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={handleToggleExpandAll}
        className="text-black text-[9pt] p-2 border"
      >
        {allExpanded ? "Collapse All" : "Expand All"}
      </button>
    </div>
  );
};

export default Accordion;

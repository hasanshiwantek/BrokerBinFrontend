import React, { useState } from "react";
import css from "../styles/Accordion.module.css";
import { BiSolidDownArrow } from "react-icons/bi";

// const Accordion = ({
//   panels,
//   // partList,
//   // organizedByCountry,
//   organizedByCountryAndCompany,
// }) => {
//   const [activePanel, setActivePanel] = useState(null);

//   const togglePanel = (panelIndex) => {
//     setActivePanel(activePanel === panelIndex ? null : panelIndex);
//   };

//   return (
//     <div className={css.accordion}>
//       {panels.map((panel, index) => (
//         <div className={css.accordionPanel} key={index}>
//           <h2 id={`panel${index + 1}-title`}>
//             <button
//               className={css.accordionTrigger}
//               aria-controls={`panel${index + 1}-content`}
//               onClick={() => togglePanel(index)}
//             >
//               {panel.title}
//               <BiSolidDownArrow
//                 className={css.accordionBtnToggle}
//                 aria-expanded={activePanel === index}
//               />
//             </button>
//           </h2>
//           <div
//             className={css.accordionContent}
//             role="region"
//             aria-labelledby={`panel${index + 1}-title`}
//             aria-hidden={activePanel !== index}
//             id={`panel${index + 1}-content`}
//           >
//             <div>
//               <button type="button">check All</button>
//               <button type="button">remove All</button>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>cart</th>
//                     <th>company</th>
//                     <th>part#</th>
//                     <th>mfg</th>
//                     <th>cond</th>
//                     <th>price</th>
//                     <th>qty</th>
//                     <th>age</th>
//                     <th>description</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {Object.entries(organizedByCountryAndCompany).map(
//                     ([country, companies]) => {
//                       return Object.entries(companies).map(
//                         ([companyName, items]) => {
//                           return items.map((item,index) => {
//                             return (
//                               <tr
//                                 key={index}
//                               >
//                                 <td>
//                                   <input
//                                     type="checkbox"
//                                     name="addToCart"
//                                     id="addToCart"
//                                     // defaultValue={false}
//                                   />
//                                 </td>
//                                 <td>{companyName}</td>
//                                 <td>{item.model}</td>
//                                 <td>{item.mfg}</td>
//                                 <td>{item.cond}</td>
//                                 <td>{(item.price).toFixed(2)}</td>
//                                 <td>{item.quantity}</td>
//                                 <td>{item.age}</td>
//                                 <td>{item.description}</td>
//                               </tr>
//                             );
//                           });
//                         }
//                       );
//                     }
//                   )}
//                 </tbody>
//               </table>
//               <button type="button">expand all</button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

const Accordion = ({ groupedData }) => {
  const [activePanel, setActivePanel] = useState(null);
  const togglePanel = (index) =>
    setActivePanel(activePanel === index ? null : index);

  const companies = Object.keys(groupedData);

  return (
    <div className={css.accordion}>
      {companies.map((company, index) => (
        <div className={css.accordionPanel} key={index}>
          <h2 id={`panel${index + 1}-title`}>
            <button
              className={css.accordionTrigger}
              aria-controls={`panel${index + 1}-content`}
              onClick={() => togglePanel(index)}
            >
              {company}
              <BiSolidDownArrow
                className={css.accordionBtnToggle}
                aria-expanded={activePanel === index}
              />
            </button>
          </h2>
          <div
            className={css.accordionContent}
            role="region"
            aria-labelledby={`panel${index + 1}-title`}
            aria-hidden={activePanel !== index}
            id={`panel${index + 1}-content`}
          >
            <table>
              <thead>
                <tr>
                  <th>cart</th>
                  <th>part#</th>
                  <th>mfg</th>
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
                    <td>{item.partModel}</td>
                    <td>{item.mfg}</td>
                    <td>{item.cond}</td>
                    {/* <td>{item.price?.toFixed(2)}</td> */}
                    <td>{item.quantity}</td>
                    <td>{item.age}</td>
                    <td>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};


export default Accordion;

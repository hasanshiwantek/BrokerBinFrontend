import React, { useState } from "react";
import css from "../../../styles/Popup/CompanyDetails.module.css";
import PlusSquare from "../../../svgs/PlusSquare";
import { companySideInformation } from "../../../data/tableData";
const TabInformation = () => {
  const [toggleTabOne, setToggleTabOne] = useState(true);
  const [toggleTabTwo, setToggleTabTwo] = useState(true);
  const [toggleTabThree, setToggleTabThree] = useState(true);
  const { companyInformation, PrimaryContactInformation, SalesInformation } =
    companySideInformation;

  return (
    <>
      <div className={css.Popup_Info_Main_left_companySideInformation}>
        <ul className={css.Popup_Info_Main_left_companySideInformation_tabs}>
          <li className={css.Popup_Info_Main_left_companySideInformation_tabs_li}>
            <h3>Company Information</h3>
            <span onClick={() => setToggleTabOne((prev) => !prev)}>
              <PlusSquare />
            </span>
          </li>
          <div
            className={toggleTabOne === true ? css.showContent : css.content}
          >
            {companyInformation.map((e, i) => {
              return (
                  <ul key={e}>
                    <span>
                      <li>Employees:</li>
                      <li>{e.Employees}</li>
                    </span>
                    <span>
                      <li>Member Since:</li>
                      <li>{e["Member Since"]}</li>
                    </span>
                    <span>
                      <li>Open:</li>
                      <li>{e.Open}</li>
                    </span>
                    <span>
                      <li>Close:</li>
                      <li>{e.Close}</li>
                    </span>
                    <span>
                      <li>Inventory Listed:</li>
                      <li>{e["Inventory Listed"]}</li>
                    </span>
                  </ul>
              );
            })}
          </div>
          <li className={css.Popup_Info_Main_left_companySideInformation_tabs_li}>
            <h3>Primary Contact Information</h3>
            <span onClick={() => setToggleTabTwo((prev) => !prev)}>
              <PlusSquare />
            </span>
          </li>

          <div
            className={toggleTabTwo === true ? css.showContent : css.content}
          >
            {companyInformation.map((e) => {
              return (
                <ul key={e}>
                  <span>
                    <li>Employees:</li>
                    <li>{e.Employees}</li>
                  </span>
                  <span>
                    <li>Member Since:</li>
                    <li>{e["Member Since"]}</li>
                  </span>
                  <span>
                    <li>Open:</li>
                    <li>{e.Open}</li>
                  </span>
                  <span>
                    <li>Close:</li>
                    <li>{e.Close}</li>
                  </span>
                  <span>
                    <li>Inventory Listed:</li>
                    <li>{e["Inventory Listed"]}</li>
                  </span>
                </ul>
              );
            })}
          </div>
          <li className={css.Popup_Info_Main_left_companySideInformation_tabs_li}>
            <h3>Sales Information</h3>
            <span onClick={() => setToggleTabThree((prev) => !prev)}>
              <PlusSquare />
            </span>
          </li>
          <div
            className={toggleTabThree === true ? css.showContent : css.content}
          >
            {companyInformation.map((e) => {
              return (
                <ul key={e}>
                  <span>
                    <li>Employees:</li>
                    <li>{e.Employees}</li>
                  </span>
                  <span>
                    <li>Member Since:</li>
                    <li>{e["Member Since"]}</li>
                  </span>
                  <span>
                    <li>Open:</li>
                    <li>{e.Open}</li>
                  </span>
                  <span>
                    <li>Close:</li>
                    <li>{e.Close}</li>
                  </span>
                  <span>
                    <li>Inventory Listed:</li>
                    <li>{e["Inventory Listed"]}</li>
                  </span>
                </ul>
              );
            })}
          </div>
        </ul>
      </div>
    </>
  );
};

export default TabInformation;

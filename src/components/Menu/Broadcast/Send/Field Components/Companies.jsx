import React, { useState } from "react";
import css from "../Send.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCompaniesSelection } from "../../../../../ReduxStore/BroadCast";
import CompanySearch from "@/components/Menu/Search/Inventory/CompanySearch";
import FiltersSearchCompanyInventory from "@/components/Menu/Reports/FiltersSearchCompanyInventory";

const Companies = () => {
  const itCompanies = [
    "Microsoft",
    "Apple",
    "Google",
    "Amazon",
    "Facebook (Meta)",
    "IBM",
    "Oracle",
    "Intel",
    "SAP",
    "Dell Technologies",
    "Cisco Systems",
    "Adobe",
    "Salesforce",
    "Hewlett-Packard (HP)",
    "Accenture",
    "Capgemini",
    "Wipro",
    "Infosys",
    "Tata Consultancy Services (TCS)",
    "Cognizant",
    "VMware",
    "ServiceNow",
    "Qualcomm",
    "AMD",
    "NVIDIA",
    "Zoom Video Communications",
    "Slack Technologies",
    "Atlassian",
    "Red Hat",
    "Dropbox",
    "Palantir",
    "GitHub",
    "Splunk",
    "Snowflake",
    "Square",
    "Stripe",
    "Epic Games",
    "Spotify",
    "Lyft",
    "Uber",
    "Twitter",
    "Pinterest",
    "Snap Inc.",
    "Zynga",
    "TikTok",
    "Alibaba",
    "Tencent",
    "Baidu",
    "Samsung Electronics",
    "LG Electronics",
    "Sony",
    "Xiaomi",
    "Huawei",
    "Lenovo",
    "Asus",
    "Acer",
    "Foxconn",
    "Broadcom",
    "Fujitsu",
    "Hitachi",
    "Siemens",
    "Ericsson",
    "Nokia",
    "Western Digital",
    "Seagate Technology",
    "PayPal",
    "Shopify",
  ];

  const dispatch = useDispatch();

  const { companiesSelection } = useSelector((state) => state.broadcastStore);

  const handleCheckboxChange = (computer) => {
    const newSelection = companiesSelection.includes(computer)
      ? companiesSelection.filter((item) => item !== computer) // Deselect
      : [...companiesSelection, computer]; // Select

    dispatch(setCompaniesSelection(newSelection)); // Pass the updated selection to the parent
  };

  return (
    <>
     {/* <div className={css.toggleFieldsLayout}> */}
      {/* {itCompanies.map((item) => {
        return (
          <span key={item}>
            <label htmlFor={item}>{item}</label>
            <input
              className="w-10 h-6"
              type="checkbox"
              name={item}
              id={item}
              value={item}
              onChange={() => handleCheckboxChange(item)}
              checked={companiesSelection.includes(item)}
            />
          </span>
        );
      })} */}

      <span>
      <FiltersSearchCompanyInventory />
      </span>
    {/*  </div> */}
    </>

  );
};

export default Companies;

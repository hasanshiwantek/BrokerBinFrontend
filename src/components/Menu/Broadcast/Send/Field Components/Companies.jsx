import React, { useState } from "react";
import css from "../Send.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCompaniesSelection } from "../../../../../ReduxStore/BroadCast";
import CompanySearch from "@/components/Menu/Search/Inventory/CompanySearch";
import FiltersSearchCompanyInventory from "@/components/Menu/Reports/FiltersSearchCompanyInventory";
// import OmitSearchCompany from "@/components/Menu/Reports/OmitSearchCompany";
const Companies = () => {
  return (
    <>
      <div>
        <div className="flex justify-start items-center ">
          <FiltersSearchCompanyInventory />
          {/* <OmitSearchCompany /> */}
        </div>
        {/* <div className="my-10">
          <div className=" space-y-8">
            <div>
              <label className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1" />
                <span>
                  <span className="font-medium">Send to My Vendors only</span>
                  <p className="font-medium text-[8pt] mt-1">
                    (This will send to your Vendors list in addition to the
                    selected companies above)
                  </p>
                </span>
              </label>
            </div>

            <div>
              <label className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1" />
                <span>
                  <span className="font-medium">Do not publish online</span>
                  <p className="font-medium text-[8pt] mt-1">
                    (Setting not saved, per broadcast only)
                  </p>
                </span>
              </label>
            </div>

            <div>
              <label className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1" />
                <span>
                  <span className="font-medium">Save settings as defaults</span>
                </span>
              </label>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Companies;

import React, { useState, useEffect } from "react";
import css from "../../../styles/Menu/Reports/Email.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
import { getMyVendors } from "@/ReduxStore/ToolsSlice";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setVendorListData } from "@/ReduxStore/Reports";
import { fetchEmailReportSettings } from "@/ReduxStore/Reports";
const EmailVendorList = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const { myVendor, loading, vendorNoteData } = useSelector(
    (store) => store.toolsStore
  );
  const { vendorListData, emailSettingsData } = useSelector(
    (state) => state.reports
  );
  console.log("Email Settings Data From Frontend: ", emailSettingsData);
  const navigate = useNavigate();
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [receiveEmails, setReceiveEmails] = useState("");
  useEffect(() => {
    dispatch(getMyVendors({ token }));
  }, []);

  const handleCheckboxChange = (companyId) => {
    setSelectedVendors((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Receive Emails:", receiveEmails);
    console.log("Selected Vendors:", selectedVendors);
    const vendorList = { receiveEmails, selectedVendors };
    console.log("Vendor List: ", vendorList);
    dispatch(setVendorListData(vendorList));
    setTimeout(() => {
      navigate("/reports/email");
    }, 1000);
  };

  // FETCH EMAIL SETTINGS DATA

  useEffect(() => {
    if (token) {
      dispatch(fetchEmailReportSettings(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (emailSettingsData?.emailOptions?.vendorListData) {
      const { receiveEmails, selectedVendors } =
        emailSettingsData.emailOptions.vendorListData;

      setReceiveEmails(receiveEmails || "");
      setSelectedVendors(selectedVendors || []);
    }
  }, [emailSettingsData]);

  useEffect(() => {
    if (emailSettingsData?.emailOptions?.vendorListData) {
      dispatch(
        setVendorListData(emailSettingsData.emailOptions.vendorListData)
      );
    }
  }, [emailSettingsData]);

  return (
    <>
      <div className={css.mainContainer}>
        {/* Navigation Tabs */}
        <div className={myProfile.profileInfo_links}>
          <ul>
            <li>
              <NavLink
                to="/reports/Company"
                className={({ isActive }) => (isActive ? myProfile.active : "")}
              >
                <span>Company</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reports/sitewide"
                className={({ isActive }) => (isActive ? myProfile.active : "")}
              >
                <span>Site Wide</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reports/email"
                className={"text-[var(--primary-color)] font-semibold"}
              >
                <span>Email</span>
              </NavLink>
            </li>
            {/* <li>
                <NavLink
                  to="/reports/serviceStats"
                  className={({ isActive }) => (isActive ? myProfile.active : '')}
                >
                  <span>Stats</span>
                </NavLink>
              </li> */}
          </ul>
        </div>

        <div className={css.mainBody}>
          <div className={css.container}>
            <div className={css.emailSec}>
              <h4>
                Receive My Vendor Inventory Updates For The Selected Companies
              </h4>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Radio Toggle */}
              <div className="mb-6">
                <p className="text-lg font-medium text-blue-600 mb-2">
                  Receive Emails
                </p>
                <div className="flex gap-6">
                  {["on", "off"].map((value) => (
                    <label key={value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="receiveEmails"
                        value={value}
                        checked={receiveEmails === value}
                        onChange={() => setReceiveEmails(value)}
                        className="accent-blue-600"
                      />
                      <span className="capitalize">{value}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Vendors Table */}
              <div>
                <table className={`${css.dataTable}`}>
                  <thead>
                    <tr>
                      <th className="w-12 px-4 py-2"></th>
                      <th>Company</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myVendor?.map((vendor, idx) => {
                      const company = vendor.company || {};
                      const isSelected = selectedVendors.includes(company.id);

                      return (
                        <tr key={company.id} className={css.vendorListTable}>
                          <td>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleCheckboxChange(company.id)}
                              className="accent-blue-500"
                            />
                          </td>
                          <td>{company.name}</td>
                          <td>
                            {[company.city, company.state, company.country]
                              .filter(Boolean)
                              .join(", ")}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVendorList;

import React, { useState, useEffect } from "react";
import css from "../../../styles/Menu/Reports/Email.module.css";
import { Link, NavLink } from "react-router-dom";
import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
import MFGFilter from "../Manage/BroadcastFilter/MFGFilter";
import EmailMfg from "./EmailMfg";
import { useDispatch, useSelector } from "react-redux";
import {
  submitEmailReportSettings,
  fetchEmailReportSettings,
} from "@/ReduxStore/Reports";
import Cookies from "js-cookie";
import PopupAlert from "@/components/Popups/PopupAlert";

const Email = () => {
  const [mfg, setIncludedMFGs] = useState([]);
  const { vendorListData, loading, error, emailSettingsData } = useSelector(
    (state) => state.reports
  );
  console.log("Email Settings Data From Frontend: ", emailSettingsData);

  const dispatch = useDispatch();
  console.log("Vendor List Data From Email Page: ", vendorListData);
  const token = Cookies.get("token");
  const [loader, setLoading] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });

    setTimeout(() => {
      setPopup((prev) => ({ ...prev, show: false }));
    }, 2000);
  };

  // Handler to update the included manufacturers
  const handleIncludedMFGsChange = (newIncludedMFGs) => {
    setIncludedMFGs(newIncludedMFGs);
  };
  const filteredIncludedMFGs = mfg.filter((mfg) => mfg !== "-ALL MFG's-");

  // State to store checkbox selections
  const [checkboxes, setCheckboxes] = useState({
    dailyBroadcast: "Normal",
    matchYourHits: {
      hourly: false,
      daily: false,
    },
    hotListUpdates: {
      hourlyMyh: false,
      dailyMyh: false,
      dailySd: false,
    },
    broadcastAlerts: {
      wtb: false,
      rfq: false,
      wts: false,
    },
    rfqSummaries: {
      type: "Off",
      occurrence: "Off",
    },
    serviceDirectoryStats: "Never",
    top200Items: {
      daily: false,
      weekly: false,
      monthly: false,
    },
    top200Searches: {
      daily: false,
      weekly: false,
      monthly: false,
    },
    top200PerManufacturer: {
      daily: false,
      weekly: false,
      monthly: false,
    },
  });

  // Handle checkbox changes
  const handleCheckboxChange = (section, key) => {
    setCheckboxes((prevState) => {
      const updatedState = {
        ...prevState,
        [section]: {
          ...prevState[section],
          [key]: !prevState[section][key],
        },
      };
      return updatedState;
    });
  };

  // Handle select dropdown changes
  const handleSelectChange = (section, value) => {
    setCheckboxes((prevState) => {
      const updatedState = {
        ...prevState,
        [section]: value,
      };
      return updatedState;
    });
  };

  // Handle form submission to save changes (also dispatch to API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...checkboxes,
      mfg,
      vendorListData,
    };
    console.log("Payload:", payload);

    try {
      setLoading(true);
      const res = await dispatch(
        submitEmailReportSettings({ payload, token })
      ).unwrap();

      if (res?.status) {
        console.log("✅ Success:", res);
        showPopup(
          "success",
          res?.message || "Email report settings updated successfully!"
        );
      } else {
        console.warn("⚠️ Unexpected response format:", res?.message);
        showPopup("error", "Something went wrong, please try again.");
      }
    } catch (err) {
      console.error("❌ Submission failed:", err);
      showPopup("error", "Failed to update email report settings.");
    } finally {
      setLoading(false);
    }
  };

  // FETCH EMAIL SETTINGS DATA

  useEffect(() => {
    if (token) {
      dispatch(fetchEmailReportSettings(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (emailSettingsData?.emailOptions) {
      const {
        dailyBroadcast,
        matchYourHits,
        hotListUpdates,
        broadcastAlerts,
        rfqSummaries,
        serviceDirectoryStats,
        top200Items,
        top200Searches,
        top200PerManufacturer,
        mfg,
      } = emailSettingsData.emailOptions;

      // ✅ Update checkboxes
      setCheckboxes({
        dailyBroadcast: dailyBroadcast || "Normal",
        matchYourHits: matchYourHits || { hourly: false, daily: false },
        hotListUpdates: hotListUpdates || {
          hourlyMyh: false,
          dailyMyh: false,
          dailySd: false,
        },
        broadcastAlerts: broadcastAlerts || {
          wtb: false,
          rfq: false,
          wts: false,
        },
        rfqSummaries: rfqSummaries || { type: "Off", occurrence: "Off" },
        serviceDirectoryStats: serviceDirectoryStats || "Never",
        top200Items: top200Items || {
          daily: false,
          weekly: false,
          monthly: false,
        },
        top200Searches: top200Searches || {
          daily: false,
          weekly: false,
          monthly: false,
        },
        top200PerManufacturer: top200PerManufacturer || {
          daily: false,
          weekly: false,
          monthly: false,
        },
      });

      // ✅ Update mfg
      setIncludedMFGs(mfg || []);
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
                className={({ isActive }) => (isActive ? myProfile.active : "")}
              >
                <span>Email</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className={css.mainBody}>
          <div className={css.container}>
            <div className={css.emailSec}>
              <h4>Select the Email Reports you would like to receive</h4>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Daily Broadcast Summary Section */}
              <div className={` ${css.section}`}>
                <h1>Daily Broadcast Summary</h1>
                <label>Send</label>
                <select
                  value={checkboxes.dailyBroadcast}
                  onChange={(e) =>
                    handleSelectChange("dailyBroadcast", e.target.value)
                  }
                >
                  <option value="Normal">Normal</option>
                  <option value="Off">Off</option>
                </select>
              </div>

              {/* Match Your Hits Section */}
              <div className={css.section}>
                <h1>Match Your Hits</h1>
                <div className={css.checkboxGroup}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.matchYourHits.hourly}
                      onChange={() =>
                        handleCheckboxChange("matchYourHits", "hourly")
                      }
                    />{" "}
                    Hourly
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.matchYourHits.daily}
                      onChange={() =>
                        handleCheckboxChange("matchYourHits", "daily")
                      }
                    />{" "}
                    Daily
                  </label>
                </div>
              </div>

              {/* Hot List Updates Section */}
              <div className={css.section}>
                <h1>Hot List Updates</h1>
                <div className={css.checkboxGroup}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.hotListUpdates.hourlyMyh}
                      onChange={() =>
                        handleCheckboxChange("hotListUpdates", "hourlyMyh")
                      }
                    />{" "}
                    Hourly <span style={{ color: "#900" }}>MYH</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.hotListUpdates.dailyMyh}
                      onChange={() =>
                        handleCheckboxChange("hotListUpdates", "dailyMyh")
                      }
                    />{" "}
                    Daily <span style={{ color: "#900" }}>MYH</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.hotListUpdates.dailySd}
                      onChange={() =>
                        handleCheckboxChange("hotListUpdates", "dailySd")
                      }
                    />{" "}
                    Daily <span style={{ color: "#900" }}>S&D</span>
                  </label>
                </div>
              </div>

              {/* Broadcast Alerts Section */}
              <div className={css.section}>
                <h1>Broadcast Alerts</h1>
                <div className={css.checkboxGroup}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.broadcastAlerts.wtb}
                      onChange={() =>
                        handleCheckboxChange("broadcastAlerts", "wtb")
                      }
                    />{" "}
                    WTB
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.broadcastAlerts.rfq}
                      onChange={() =>
                        handleCheckboxChange("broadcastAlerts", "rfq")
                      }
                    />{" "}
                    RFQ
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.broadcastAlerts.wts}
                      onChange={() =>
                        handleCheckboxChange("broadcastAlerts", "wts")
                      }
                    />{" "}
                    WTS
                  </label>
                </div>
              </div>

              {/* Broadcast Alerts Section */}
              <div className={css.section}>
                <h1>My Vendors</h1>
                <div className="text-center">
                  <NavLink to={"/reports/emailVendorList"}>
                    <p className="text-[8.5pt] font-bold ">
                      Email My Vendor Inventory Updates
                    </p>
                  </NavLink>
                </div>
              </div>

              {/* RFQ Summaries Section */}
              <div className={css.section}>
                <h1>RFQ Summaries</h1>
                <label>Type</label>
                <select
                  value={checkboxes.rfqSummaries.type}
                  onChange={(e) =>
                    handleSelectChange("rfqSummaries", {
                      ...checkboxes.rfqSummaries,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="Off">Off</option>
                  <option value="Basic">Basic</option>
                  <option value="Detailed">Detailed</option>
                </select>
                <label>Occurrence</label>
                <select
                  value={checkboxes.rfqSummaries.occurrence}
                  onChange={(e) =>
                    handleSelectChange("rfqSummaries", {
                      ...checkboxes.rfqSummaries,
                      occurrence: e.target.value,
                    })
                  }
                >
                  <option value="Off">Off</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>

              {/* Top 200 Items Section */}
              <div className={css.section}>
                <h1>My Company's Top 200 Items</h1>
                <div className={css.checkboxGroup}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.top200Items.daily}
                      onChange={() =>
                        handleCheckboxChange("top200Items", "daily")
                      }
                    />{" "}
                    Daily
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.top200Items.weekly}
                      onChange={() =>
                        handleCheckboxChange("top200Items", "weekly")
                      }
                    />{" "}
                    Weekly
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.top200Items.monthly}
                      onChange={() =>
                        handleCheckboxChange("top200Items", "monthly")
                      }
                    />{" "}
                    Monthly
                  </label>
                </div>
              </div>

              {/* Top 200 Searches By Part# Section */}
              <div className={css.section}>
                <h1>Top 200 Searches By Part#</h1>
                <div className={css.checkboxGroup}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.top200Searches.daily}
                      onChange={() =>
                        handleCheckboxChange("top200Searches", "daily")
                      }
                    />{" "}
                    Daily
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.top200Searches.weekly}
                      onChange={() =>
                        handleCheckboxChange("top200Searches", "weekly")
                      }
                    />{" "}
                    Weekly
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.top200Searches.monthly}
                      onChange={() =>
                        handleCheckboxChange("top200Searches", "monthly")
                      }
                    />{" "}
                    Monthly
                  </label>
                </div>
              </div>

              {/* Top 200 Searches Per Manufacturer Section */}
              <div
                className={`${css.section} border-gray-400 border-[1px]`}
                style={{ padding: "8px 5px" }}
              >
                <h1>Top 200 Searches Per Manufacturer</h1>
                <h1>Send Emails</h1>
                <div className={css.checkboxGroup}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.top200PerManufacturer.daily}
                      onChange={() =>
                        handleCheckboxChange("top200PerManufacturer", "daily")
                      }
                    />{" "}
                    Daily
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.top200PerManufacturer.weekly}
                      onChange={() =>
                        handleCheckboxChange("top200PerManufacturer", "weekly")
                      }
                    />{" "}
                    Weekly
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.top200PerManufacturer.monthly}
                      onChange={() =>
                        handleCheckboxChange("top200PerManufacturer", "monthly")
                      }
                    />{" "}
                    Monthly
                  </label>
                </div>
                {/* Include MFG's Section */}
                <div className="px-1 py-3">
                  <div>
                    <EmailMfg
                      defaultValue={mfg}
                      onIncludedMFGsChange={handleIncludedMFGsChange}
                    />
                  </div>
                </div>
              </div>

              {/* Save Changes Button */}
              <div className={css.section}>
                <button
                  className={`!bg-[#2c83ec] !h-[1.5vw] items-center flex justify-center !rounded-[.2vw] !px-4 !py-6 text-white font-semibold transition-all duration-150 ${
                    loader ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                  type="submit"
                  disabled={loader}
                >
                  {loader ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <PopupAlert
        show={popup.show}
        type={popup.type}
        message={popup.message}
        onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
      />
    </>
  );
};

export default Email;

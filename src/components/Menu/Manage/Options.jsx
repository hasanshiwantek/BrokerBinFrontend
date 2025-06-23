import React, { useState, useEffect } from "react";
import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
import css from "../../../styles/Menu/Manage/Options.module.css";
import OnlyReceiveMatch from "./OnlyReceiveMatch";
import OnlyDisplay from "./OnlyDisplay";
import { useDispatch, useSelector } from "react-redux";
import {
  setOptionFormData,
  submitUserOptions,
  submitUserSettings,
  fetchUserSettings,
  resetOptionData,
  fetchUserData,
} from "../../../ReduxStore/ProfleSlice";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import LoadingState from "@/LoadingState";
import { setTogglePopUp } from "@/ReduxStore/SearchProductSlice";
import CompanyDetails from "@/components/Popups/CompanyDetails/CompanyDetails";
import { setPopupCompanyDetail } from "@/ReduxStore/SearchProductSlice";

const Options = () => {
  const { optionFormData, loading, initialData } = useSelector(
    (state) => state.profileStore
  );
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  console.log("Token: ", token);

  // COMPANY MODAL LOGIC
  const { togglePopUp, popupCompanyDetail } = useSelector(
    (state) => state.searchProductStore
  );
  const userId = Number(Cookies.get("user_id"));
  useEffect(() => {
    dispatch(fetchUserData({ id: userId, token }));
  }, []);
  const company = initialData?.company;
  const openCompanyModal = (company) => {
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUp()); // Show company modal
  };

  // Handle sorting field changes inside displaySettings.sortPreferences
  const handleSortingChange = (index, field, value) => {
    const updated = [...optionFormData.displaySettings.sortPreferences];
    updated[index] = { ...updated[index], [field]: value };

    dispatch(
      setOptionFormData({
        displaySettings: {
          ...optionFormData.displaySettings,
          sortPreferences: updated,
        },
      })
    );
  };

  // Generic change handler for nested form fields
  const handleChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    dispatch(
      setOptionFormData({
        [section]: {
          ...optionFormData[section],
          [name]: val,
        },
      })
    );
  };

  // Submit form
  const submitMyProfileOptions = async (e) => {
    e.preventDefault();
    const data = optionFormData;
    console.log("📤 Submitting User Settings Payload:", data);

    try {
      setLoader(true);
      const resultAction = await dispatch(
        submitUserSettings({ token, optionFormData: data })
      );

      if (submitUserSettings.fulfilled.match(resultAction)) {
        console.log("✅ Submission Success:", resultAction.payload);
        toast.info(
          resultAction?.payload?.message || "User Options Updated Successfully",
          {
            style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" }, //
          }
        );
      } else {
        console.error("❌ Submission Failed:", resultAction.error.message);
        toast.error("Submission Failed.Please Try Again", {
          style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" }, //
        });
      }
    } catch (err) {
      console.error("🔥 Unexpected Submission Error:", err);
    } finally {
      setLoader(false);
    }
  };

  const handleReset = () => {
    try {
      dispatch(resetOptionData());
      toast.info("Form Reset Successfully", {
        style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" }, //
      });
    } catch (err) {
      console.error("🔥 Unexpected Submission Error:", err);
    }
  };

  useEffect(() => {
    dispatch(fetchUserSettings({ token }));
  }, []);

  if (loading) {
    return (
      // <div className="flex justify-center items-center py-20">
      //   <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      //   <span className="ml-4 text-blue-600 text-lg font-medium"></span>
      // </div>

      <LoadingState />
    );
  }

  return (
    <>
      <div className={myProfile.profileLayout}>
        <form onSubmit={submitMyProfileOptions}>
          <div className={`${myProfile.profileBtn} fixed`}>
            <h4 className="font-semibold">My Profile</h4>

            <span>
              <input
                type="submit"
                value="Submit Changes"
                className="!text-white !capitalize !font-[400]"
              />
              <button type="button" onClick={() => openCompanyModal(company)}>
                view profile
              </button>
            </span>
          </div>
          <div className={myProfile.profileInfo}>
            <div className={myProfile.profileInfo_links}>
              <ul>
                <li>
                  <NavLink
                    to="/myprofile"
                    end // This ensures the exact match for /myprofile
                    className={({ isActive }) =>
                      isActive ? myProfile.active : ""
                    }
                  >
                    <span>Personal Info</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/myprofile/Options"
                    className={({ isActive }) =>
                      isActive ? myProfile.active : ""
                    }
                  >
                    <span>Options</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/myprofile/MyVendors"
                    className={({ isActive }) =>
                      isActive ? myProfile.active : ""
                    }
                  >
                    <span>My Vendors</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/myprofile/MyContact"
                    className={({ isActive }) =>
                      isActive ? myProfile.active : ""
                    }
                  >
                    <span>My Contacts</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/myprofile/broadcastfilter"
                    className={({ isActive }) =>
                      isActive ? myProfile.active : ""
                    }
                  >
                    <span>Broadcast Filters</span>
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className={css.options_form}>
              <div className={css.optionsBtnGroup}>
                <div className={css.optionsBtnGroupSec}>
                  <div>
                    <label>BroadCast</label>
                    <Link to={"/myprofile/broadcastfilter"}>
                      <button style={{ marginLeft: "25px" }}>
                        Options and Filters
                      </button>
                    </Link>
                  </div>
                  <div>
                    <label>Email Reports</label>
                    <Link to={"/reports/email"}>
                      <button>Options and Filters</button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Section: Receive Match Your Hits */}
              <div className={css.receiveMatchYourHits}>
                <h1>Receive Match Your Hits</h1>
                <div>
                  <span>
                    <label htmlFor="hourly">Hourly</label>
                    <input
                      type="checkbox"
                      name="hourly"
                      id="hourly"
                      checked={optionFormData.receiveMatchYourHits.hourly}
                      onChange={(e) => handleChange(e, "receiveMatchYourHits")}
                    />
                  </span>
                  <span>
                    <label htmlFor="daily">Daily</label>
                    <input
                      type="checkbox"
                      name="daily"
                      id="daily"
                      checked={optionFormData.receiveMatchYourHits.daily}
                      onChange={(e) => handleChange(e, "receiveMatchYourHits")}
                    />
                  </span>
                </div>
              </div>

              {/* Section: Only Receive Match */}
              <div className={css.onlyReceiveMatch}>
                <h1>
                  Only Receive Match Your Hits Results Using The Following
                  (Region, Country and/or State)
                </h1>
                <OnlyReceiveMatch />
              </div>

              {/* Section: Results Display Settings */}
              <div className={css.resultsDisplaySettings}>
                <h1>Results Display Settings</h1>
                <div className={css.resultsDisplaySettings_fields}>
                  <ul>
                    <li>
                      <label htmlFor="language">Language</label>
                      <select
                        name="language"
                        id="language"
                        value={optionFormData.displaySettings.language}
                        onChange={(e) => handleChange(e, "displaySettings")}
                      >
                        <option value="english">English</option>
                      </select>
                    </li>

                    {/* Sorting Preferences */}

                    {optionFormData.displaySettings.sortPreferences.map(
                      (pref, index) => (
                        <li key={index}>
                          <label htmlFor={`sortby${index + 1}`}>
                            Sorting Priority {index + 1}
                          </label>
                          <select
                            name={`sortby${index + 1}`}
                            id={`sortby${index + 1}`}
                            value={pref.sortBy}
                            onChange={(e) =>
                              handleSortingChange(
                                index,
                                "sortBy",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select One</option>
                            <option value="age">Age</option>
                            <option value="condition">Condition</option>
                            <option value="company">Company</option>
                            <option value="country">Country</option>
                            <option value="description">Description</option>
                            <option value="manufacturer">Manufacturer</option>
                            <option value="my_region">My Region</option>
                            <option value="my_vendors">My Vendors</option>
                            <option value="part_model">Part / Model</option>
                            <option value="price">Price</option>
                            <option value="quantity">Quantity</option>
                            <option value="region">Region</option>
                            <option value="shield_quality">
                              Shield of Quality
                            </option>
                          </select>
                          <select
                            name={`sortord${index + 1}`}
                            id={`sortord${index + 1}`}
                            value={pref.sortOrder}
                            onChange={(e) =>
                              handleSortingChange(
                                index,
                                "sortOrder",
                                e.target.value
                              )
                            }
                          >
                            <option value="ASC">First to Last</option>
                            <option value="DESC">Last to First</option>
                          </select>
                        </li>
                      )
                    )}

                    <li>
                      <label htmlFor="sortLock">Preferred Sort Lock</label>
                      <select
                        name="sortLock"
                        id="sortLock"
                        value={optionFormData.displaySettings.sortLock}
                        onChange={(e) => handleChange(e, "displaySettings")}
                      >
                        <option value="0">NONE</option>
                        <option value="1">1 Column</option>
                        <option value="2">2 Columns</option>
                        <option value="3">3 Columns</option>
                      </select>
                    </li>

                    {/* Multiple Part Searches */}
                    <li>
                      <label htmlFor="user_sort_pref">
                        Sort Multiple Part Searches
                      </label>
                      <select
                        name="multiplePartSearch"
                        id="user_sort_pref"
                        value={
                          optionFormData.displaySettings.multiplePartSearch
                        }
                        onChange={(e) => handleChange(e, "displaySettings")}
                      >
                        <option value="0">NO</option>
                        <option value="1">YES</option>
                      </select>
                    </li>

                    {/* Items Per Page */}
                    <li>
                      <label htmlFor="itemsPerPage">Items Per Page</label>
                      <select
                        name="itemsPerPage"
                        id="perp"
                        value={optionFormData.displaySettings.itemsPerPage}
                        onChange={(e) => handleChange(e, "displaySettings")}
                      >
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="35">35</option>
                        <option value="40">40</option>
                        <option value="45">45</option>
                        <option value="50">50</option>
                        <option value="55">55</option>
                        <option value="60">60</option>
                      </select>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section: Custom Part Search Display */}
              <div className={css.customPartSearchDisplay}>
                <h1>Custom Part Search Display</h1>
                <div className={css.customPartSearchDisplay_fields}>
                  <ul>
                    {[
                      ["alternateRowColors", "Alternate Row Colors"],
                      ["showBorders", "Show Borders"],
                      ["showDetails", "Show Details"],
                      ["forceDescriptions", "Force Descriptions"],
                      ["doubleVision", "Double Vision"],
                      ["showHistoryGraphs", "Show History Graphs"],
                    ].map(([name, label]) => (
                      <li key={name}>
                        <label htmlFor={name}>{label}</label>
                        <input
                          type="checkbox"
                          name={name}
                          id={name}
                          checked={optionFormData.customPartDisplay[name]}
                          onChange={(e) => handleChange(e, "customPartDisplay")}
                        />
                      </li>
                    ))}

                    <li>
                      <label htmlFor="showFilters">Display Filters</label>
                      <select
                        name="showFilters"
                        id="display_filters"
                        value={optionFormData.customPartDisplay.showFilters}
                        onChange={(e) => handleChange(e, "customPartDisplay")}
                      >
                        <option value="0">Hidden</option>
                        <option value="1">Advanced</option>
                        <option value="2">Basic</option>
                      </select>

                      <select
                        name="displayFiltersPosition"
                        id="table_filter"
                        value={
                          optionFormData.customPartDisplay
                            .displayFiltersPosition
                        }
                        onChange={(e) => handleChange(e, "customPartDisplay")}
                      >
                        <option value="1">Top</option>
                        <option value="2">Left</option>
                      </select>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section: Preferred Brokerbin Use */}
              <div className={css.resultsByTheseConditions}>
                <h1>Preferred Brokercell Use</h1>
                <div className={css.resultsByTheseConditions_fields}>
                  <ul>
                    {["Telecom", "Computer"].map((val) => (
                      <li key={val}>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="preferredBrokercell"
                            value={val}
                            checked={
                              optionFormData.brokerCell.preferredBrokercell ===
                              val
                            }
                            onChange={(e) => handleChange(e, "brokerCell")}
                          />
                          {val}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Section: Only Display Results */}
              <div className={css.onlyReceiveMatch}>
                <h1>
                  Only Display Results Using The Following (Region, Country
                  and/or State)
                </h1>
                <OnlyDisplay />
              </div>

              {/* Section: Only Display Results by These Conditions */}
              <div className={css.resultsByTheseConditions}>
                <h1>Only Display Results By These Conditions</h1>
                <div className={css.resultsByTheseConditions_fields}>
                  <ul>
                    {[
                      ["cfilterfNEW", "New"],
                      ["cfilterfASIS", "ASIS"],
                      ["cfilterfEXC", "EXC"],
                      ["cfilterfF/S", "F/S"],
                      ["cfilterfNOB", "NOB"],
                      ["cfilterfREF", "REF"],
                      ["cfilterfOEMREF", "OEMREF"],
                      ["cfilterfREP", "REP"],
                      ["cfilterfUSED", "USED"],
                    ].map(([name, label]) => (
                      <li key={name}>
                        <label htmlFor={name}>{label}</label>
                        <input
                          id={name}
                          type="checkbox"
                          name={name}
                          checked={optionFormData.displayByCondition[name]}
                          onChange={(e) =>
                            handleChange(e, "displayByCondition")
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Section: Other Settings */}
              <div className={css.otherSettings}>
                <h1>Other Settings</h1>
                <div className={css.otherSettings_fields}>
                  <ul>
                    <li>
                      <label htmlFor="fontSize">Search Results Font Size</label>
                      <select
                        name="fontSize"
                        id="fontSize"
                        value={optionFormData.otherSettings.fontSize}
                        onChange={(e) => handleChange(e, "otherSettings")}
                      >
                        <option value="8">8 Point</option>
                        <option value="9">9 Point</option>
                        <option value="10">10 Point</option>
                        <option value="11">11 Point</option>
                        <option value="12">12 Point</option>
                      </select>
                    </li>
                    <li>
                      <label htmlFor="extendedCompanyInfo">
                        Extended Company Info
                      </label>
                      <select
                        name="extendedCompanyInfo"
                        id="extendedCompanyInfo"
                        value={optionFormData.otherSettings.extendedCompanyInfo}
                        onChange={(e) => handleChange(e, "otherSettings")}
                      >
                        <option value="0">Off</option>
                        <option value="1">On</option>
                      </select>
                    </li>
                    <li>
                      <label htmlFor="contactMethod">
                        Preferred Contact Method
                      </label>
                      <select
                        name="contactMethod"
                        id="contactMethod"
                        value={optionFormData.otherSettings.contactMethod}
                        onChange={(e) => handleChange(e, "otherSettings")}
                      >
                        <option value="1">Direct</option>
                        <option value="2">Toll Free</option>
                        <option value="3">Cellular</option>
                        <option value="4">Fax</option>
                        <option value="5">Email</option>
                      </select>
                    </li>

                    <li>
                      <label htmlFor="showContactInfo">
                        Show My Contact Info To Subscribers
                      </label>
                      <select
                        name="showContactInfo"
                        id="showContactInfo"
                        value={optionFormData.otherSettings.showContactInfo}
                        onChange={(e) => handleChange(e, "otherSettings")}
                      >
                        <option value="1">YES</option>
                        <option value="0">NO</option>
                      </select>
                    </li>

                    <li>
                      <label htmlFor="receiveSiteEmails">
                        Receive Site Emails
                      </label>
                      <select
                        name="receiveSiteEmails"
                        id="mailings"
                        value={optionFormData.otherSettings.receiveSiteEmails}
                        onChange={(e) => handleChange(e, "otherSettings")}
                      >
                        <option value="0">NO</option>
                        <option value="1">YES</option>
                      </select>
                    </li>

                    <li>
                      <label htmlFor="receiveRFQEmails">
                        Receive RFQ Emails
                      </label>
                      <select
                        name="receiveRFQEmails"
                        id="rfqemail"
                        value={optionFormData.otherSettings.receiveRFQEmails}
                        onChange={(e) => handleChange(e, "otherSettings")}
                      >
                        <option value="0">NO</option>
                        <option value="1">YES</option>
                      </select>
                    </li>

                    <li>
                      <label htmlFor="receiveUpdates">
                        Receive Brokercell Updates
                      </label>
                      <select
                        name="receiveUpdates"
                        id="update_emails"
                        value={optionFormData.otherSettings.receiveUpdates}
                        onChange={(e) => handleChange(e, "otherSettings")}
                      >
                        <option value="0">NO</option>
                        <option value="1">YES</option>
                      </select>
                    </li>

                    <li className="!flex !justify-center !items-center !-ml-[25rem]">
                      <label htmlFor="security">
                        Access Level <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="hidden"
                        name="security"
                        id="security"
                        value="2"
                      />
                      <span className="text-base ml-[2rem]">Admin</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className={css.btnGroup}>
                <div className={css.btnGroupSec}>
                  <button type="button" onClick={handleReset}>
                    Reset
                  </button>
                  <button
                    disabled={loader}
                    className={` text-white transition-all duration-150 ${
                      loader
                        ? "!bg-gray-400 cursor-not-allowed"
                        : "bg-[#2c83ec] hover:bg-[#1c6dd0]"
                    }`}
                  >
                    {loader ? "Sumbitting..." : " Submit Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {togglePopUp && (
        <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />
      )}
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default Options;

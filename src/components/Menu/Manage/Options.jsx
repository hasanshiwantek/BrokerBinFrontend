import React, { useState } from "react";
import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
import css from "../../../styles/Menu/Manage/Options.module.css";
import OnlyReceiveMatch from "./OnlyReceiveMatch";
import OnlyDisplay from "./OnlyDisplay";
import { useDispatch, useSelector } from "react-redux";
import {
  setOptionFormData,
  submitUserOptions,
} from "../../../ReduxStore/ProfleSlice";
import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
const Options = () => {
  const { optionFormData } = useSelector((state) => state.profileStore);
  const dispatch = useDispatch();

  // const initialOptionFormData = {
  //   hourly: false,
  //   daily: false,
  //   my_regions_filter: [],
  //   my_countries_filter: [],
  //   my_states_filter: [],
  //   regions_filter: [],
  //   countries_filter: [],
  //   states_filter: [],
  //   language: "english",
  //   sortPreferences: [
  //     { sortBy: "", sortOrder: "ASC" },
  //     { sortBy: "", sortOrder: "ASC" },
  //     { sortBy: "", sortOrder: "ASC" },
  //   ],
  //   sortLock: "0",
  //   multiplePartSearch: "1",
  //   itemsPerPage: "20",
  //   alternateRowColors: false,
  //   showBorders: false,
  //   showFilters: "2",
  //   displayFiltersPosition: "2",
  //   showDetails: false,
  //   forceDescriptions: false,
  //   doubleVision: false,
  //   showHistoryGraphs: true,
  //   preferredBrokercell: "1",
  //   receiveRFQEmails: "1",
  //   fontSize: "8",
  //   extendedCompanyInfo: "1",
  //   contactMethod: "1",
  //   showContactInfo: "1",
  //   receiveSiteEmails: "0",
  //   receiveUpdates: "0",
  //   cfilterfNEW: false,
  //   cfilterfASIS: false,
  // };

  // const [optionFormData, setOptionFormData] = useState(initialOptionFormData);

  // Handler for sorting changes

  // Handler for sorting changes
  const handleSortingChange = (index, field, value) => {
    // Make a copy of sortPreferences and update the field
    const updatedSortPreferences = [...optionFormData.sortPreferences];
    updatedSortPreferences[index] = {
      ...updatedSortPreferences[index],
      [field]: value,
    };

    // Dispatch the updated sortPreferences array
    dispatch(
      setOptionFormData({
        sortPreferences: updatedSortPreferences,
      })
    );
  };

  // General change handler for inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // For checkboxes, use checked value, otherwise use value
    dispatch(
      setOptionFormData({
        ...optionFormData,
        [name]: type === "checkbox" ? checked : value,
      })
    );
  };

  // Form submit handler
  const submitMyProfileOptions = (event) => {
    event.preventDefault();
    console.log("FormData:", optionFormData);
    // You can send the formData to your backend here.
  };



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
              <button type="button">view profile</button>
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
                      checked={optionFormData.hourly}
                      onChange={handleChange}
                    />
                  </span>
                  <span>
                    <label htmlFor="daily">Daily</label>
                    <input
                      type="checkbox"
                      name="daily"
                      id="daily"
                      checked={optionFormData.daily}
                      onChange={handleChange}
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
                        value={optionFormData.language}
                        onChange={handleChange}
                      >
                        <option value="english">English</option>
                      </select>
                    </li>

                    {/* Sorting Preferences */}

                    {optionFormData.sortPreferences.map((pref, index) => (
                      <li key={index}>
                        <label htmlFor={`sortby${index + 1}`}>
                          Sorting Priority {index + 1}
                        </label>
                        <select
                          name={`sortby${index + 1}`}
                          id={`sortby${index + 1}`}
                          value={pref.sortBy}
                          onChange={(e) =>
                            handleSortingChange(index, "sortBy", e.target.value)
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
                    ))}

                    <li>
                      <label htmlFor="sortLock">Preferred Sort Lock</label>
                      <select
                        name="sortLock"
                        id="sortLock"
                        value={optionFormData.sortLock}
                        onChange={handleChange}
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
                        value={optionFormData.multiplePartSearch}
                        onChange={handleChange}
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
                        value={optionFormData.itemsPerPage}
                        onChange={handleChange}
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
                    <li>
                      <label htmlFor="alternateRowColors">
                        Alternate Row Colors
                      </label>
                      <input
                        type="checkbox"
                        name="alternateRowColors"
                        id="alternateRowColors"
                        checked={optionFormData.alternateRowColors}
                        onChange={handleChange}
                      />
                    </li>
                    <li>
                      <label htmlFor="showBorders">Show Borders</label>
                      <input
                        type="checkbox"
                        name="showBorders"
                        id="showBorders"
                        checked={optionFormData.showBorders}
                        onChange={handleChange}
                      />
                    </li>
                    <li>
                      <label htmlFor="displayFilters">Display Filters</label>
                      <select
                        name="showFilters"
                        id="display_filters"
                        value={optionFormData.showFilters}
                        onChange={handleChange}
                      >
                        <option value="0">Hidden</option>
                        <option value="1">Advanced</option>
                      </select>
                      <select
                        name="displayFiltersPosition"
                        id="table_filter"
                        value={optionFormData.displayFiltersPosition}
                        onChange={handleChange}
                      >
                        <option value="1">Top</option>
                        <option value="2">Left</option>
                      </select>
                    </li>
                    <li>
                      <label htmlFor="showDetails">Show Details</label>
                      <input
                        type="checkbox"
                        name="showDetails"
                        id="showDetails"
                        checked={optionFormData.showDetails}
                        onChange={handleChange}
                      />
                    </li>
                    <li>
                      <label htmlFor="forceDescriptions">
                        Force Descriptions
                      </label>
                      <input
                        type="checkbox"
                        name="forceDescriptions"
                        id="forceDescriptions"
                        checked={optionFormData.forceDescriptions}
                        onChange={handleChange}
                      />
                    </li>
                    <li>
                      <label htmlFor="doubleVision">Double Vision</label>
                      <input
                        type="checkbox"
                        name="doubleVision"
                        id="doubleVision"
                        checked={optionFormData.doubleVision}
                        onChange={handleChange}
                      />
                    </li>
                    <li>
                      <label htmlFor="showHistoryGraphs">
                        Show History Graphs
                      </label>
                      <input
                        type="checkbox"
                        name="showHistoryGraphs"
                        id="showHistoryGraphs"
                        checked={optionFormData.showHistoryGraphs}
                        onChange={handleChange}
                      />
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section: Preferred Brokerbin Use */}
              <div className={css.preferredBrokerbinUse}>
                <h1>Preferred Brokercell Use</h1>
                <div className={css.preferredBrokerbinUse_fields}>
                  <ul className="checkbox">
                    <li>
                      <label
                        htmlFor="teleRadio"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="preferredBrokercell"
                          id="teleRadio"
                          value="Telecom"
                          checked={
                            optionFormData.preferredBrokercell === "Telecom"
                          }
                          onChange={handleChange}
                        />
                        Telecom
                      </label>
                    </li>
                    <li>
                      <label
                        htmlFor="compRadio"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="preferredBrokercell"
                          id="compRadio"
                          value="Computer"
                          checked={
                            optionFormData.preferredBrokercell === "Computer"
                          }
                          onChange={handleChange}
                        />
                        Computer
                      </label>
                    </li>
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
                    <li>
                      <label htmlFor="cfilterfNEW">New</label>
                      <input
                        type="checkbox"
                        name="cfilterfNEW"
                        id="cfilterfNEW"
                        value="1"
                        checked={optionFormData.cfilterfNEW || false}
                        onChange={handleChange}
                      />
                    </li>
                    <li>
                      <label htmlFor="cfilterfASIS">ASIS</label>
                      <input
                        type="checkbox"
                        name="cfilterfASIS"
                        id="cfilterfASIS"
                        value="2"
                        checked={optionFormData.cfilterfASIS || false}
                        onChange={handleChange}
                      />
                    </li>
                    {/* Add similar checkboxes for other conditions like EXC, REF, etc. */}
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
                        value={optionFormData.fontSize}
                        onChange={handleChange}
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
                        value={optionFormData.extendedCompanyInfo}
                        onChange={handleChange}
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
                        value={optionFormData.contactMethod}
                        onChange={handleChange}
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
                        value={optionFormData.showContactInfo}
                        onChange={handleChange}
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
                        value={optionFormData.receiveSiteEmails}
                        onChange={handleChange}
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
                        value={optionFormData.receiveRFQEmails}
                        onChange={handleChange}
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
                        value={optionFormData.receiveUpdates}
                        onChange={handleChange}
                      >
                        <option value="0">NO</option>
                        <option value="1">YES</option>
                      </select>
                    </li>

                    <li className="!flex !justify-center !items-center !-ml-[25rem]">
                      <label htmlFor="security">Access Level</label>
                      <input
                        type="hidden"
                        name="security"
                        id="security"
                        value="2"
                      />
                      <span>Browse</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className={css.btnGroup}>
                <div className={css.btnGroupSec}>
                  <button>Reset</button>
                  <button>Submit Changes</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Options;

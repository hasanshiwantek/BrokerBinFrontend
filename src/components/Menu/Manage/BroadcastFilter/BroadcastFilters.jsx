import React, { useState, useEffect } from "react";
import myProfile from "../../../../styles/Menu/Manage/MyProfile.module.css";
import css from "../../../../styles/Menu/Manage/BroadcastFilters/BroadcastFilters.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  broadCastFilters,
  fetchBroadCastFilters,
  setSelectedCompanyNames,
} from "../../../../ReduxStore/BroadCast";
import Cookies from "js-cookie";
import {
  servicesList,
  regionsList,
  countriesList,
  groupingsList,
  telecom,
  mobileDevice,
  computers,
  initialMFGs,
} from "../../../../data/services";
import CheckboxList from "./CheckboxList";
import UniversalSelector from "./UniversalSelector";
import MFGFilter from "./MFGFilter";
import SearchCompanyInventory from "../../Reports/Sitewide/SearchCompanyInventory";
import FiltersSearchCompanyInventory from "../../Reports/FiltersSearchCompanyInventory";
import { setTogglePopUp } from "../../../../ReduxStore/SearchProductSlice";
import CompanyDetails from "../../../Popups/CompanyDetails/CompanyDetails";
import { setPopupCompanyDetail } from "../../../../ReduxStore/SearchProductSlice";
import PopupAlert from "@/components/Popups/PopupAlert";
import useDefaultSettings from "@/components/hooks/UseDefaultSettings";

const Options = () => {
  const { filters } = useSelector((state) => state.broadcastStore);
  console.log("bfilters ", filters);
  // Existing states and handlers...
  const [mfg, setIncludedMFGs] = useState([]);
  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const { user } = useDefaultSettings();

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

  const [broadcastFilterState, setBroadcastFilterState] = useState({
    selectedCategories: [],
    selectedServices: [],
    selectedGroupings: [],
    selectedRegions: [],
    selectedOutgoingRegions: [],
    selectedCountry: [],
    selectedOutgoingCountry: [],
    selectedBroadcastTypes: [],
    dailyBroadcast: false,
    broadcasts: false,
    multicast: false,
    servicecast: false,
  });

  const [onlyReceiveMatch, setOnlyReceiveMatch] = useState({
    computers: true,
    telecom: false,
    mobileDevice: false,
  });

  const toggleOnlyReceiveMatch = (type) => {
    setOnlyReceiveMatch({
      computers: false,
      telecom: false,
      mobileDevice: false,
      [type]: true,
    });
  };

  // Function to handle checkbox individually.
  const handleCheckboxChange = (name, value) => {
    setBroadcastFilterState((prevState) => {
      let updatedItems;

      // Handle 'selectedCategories' (this includes computers, telecom, mobileDevice)
      if (
        name === "selectedCategories" ||
        name === "telecom" ||
        name === "mobileDevice"
      ) {
        updatedItems = prevState.selectedCategories.includes(value)
          ? prevState.selectedCategories.filter((item) => item !== value)
          : [...prevState.selectedCategories, value];
        return { ...prevState, selectedCategories: updatedItems }; // Always update 'selectedCategories'
      }

      if (name === "selectedServices") {
        updatedItems = prevState.selectedServices.includes(value)
          ? prevState.selectedServices.filter((item) => item !== value)
          : [...prevState.selectedServices, value];
        return { ...prevState, selectedServices: updatedItems };
      }

      if (name === "selectedGroupings") {
        updatedItems = prevState.selectedGroupings.includes(value)
          ? prevState.selectedGroupings.filter((item) => item !== value)
          : [...prevState.selectedGroupings, value];
        return { ...prevState, selectedGroupings: updatedItems };
      }

      if (name === "selectedRegions") {
        updatedItems = prevState.selectedRegions.includes(value)
          ? prevState.selectedRegions.filter((item) => item !== value)
          : [...prevState.selectedRegions, value];
        return { ...prevState, selectedRegions: updatedItems };
      }

      if (name === "selectedOutgoingRegions") {
        updatedItems = prevState.selectedOutgoingRegions.includes(value)
          ? prevState.selectedOutgoingRegions.filter((item) => item !== value)
          : [...prevState.selectedOutgoingRegions, value];
        return { ...prevState, selectedOutgoingRegions: updatedItems };
      }

      if (name === "type_of_broadcast") {
        updatedItems = prevState.selectedBroadcastTypes.includes(value)
          ? prevState.selectedBroadcastTypes.filter((item) => item !== value)
          : [...prevState.selectedBroadcastTypes, value];
        return { ...prevState, selectedBroadcastTypes: updatedItems };
      }

      return prevState; // Return the previous state if no matches
    });
  };

  const handleDropdownChange = (value) => {
    setBroadcastFilterState((prevState) => ({
      ...prevState,
      selectedCountry: [value], // Update selectedCountry in the state
    }));
  };

  const handleOutgoingCountry = (value) => {
    setBroadcastFilterState((prevState) => ({
      ...prevState,
      selectedOutgoingCountry: [value], // Update selectedOutgoingCountry in the state
    }));
  };

  const toggleAllCheckboxes = (name, items, checkAll) => {
    setBroadcastFilterState((prevState) => {
      // Ensure items is an array of strings or objects
      const itemValues = items.map((item) =>
        typeof item === "object" ? item.value : item
      );

      const currentSelection = prevState[name] || [];

      console.log("Current selection:", currentSelection);
      console.log("Items to toggle:", itemValues);

      let updatedItems;

      if (checkAll) {
        // Add all items
        updatedItems = [...new Set([...currentSelection, ...itemValues])];
      } else {
        // Remove all items
        updatedItems = currentSelection.filter(
          (item) => !itemValues.includes(item)
        );
      }

      console.log("Updated selection:", updatedItems);

      return {
        ...prevState,
        [name]: updatedItems,
      };
    });
  };

  const dispatch = useDispatch();
  const token = Cookies.get("token");

  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("broadcastFilters"));
    if (savedFilters) {
      setBroadcastFilterState((prevState) => ({
        ...prevState,
        dailyBroadcast: savedFilters.daily_broadcast || false,
        broadcasts: savedFilters.broadcasts || false,
        multicast: savedFilters.multicast || false,
        servicecast: savedFilters.servicecast || false,
        selectedCategories: savedFilters.categories || [],
        selectedServices: savedFilters.services || [],
        selectedGroupings: savedFilters.groupings || [],
        selectedRegions: savedFilters.selectedRegions || [],
        selectedOutgoingRegions: savedFilters.selectedOutgoingRegions || [],
        selectedCountry: savedFilters.selectedCountry || [],
        selectedOutgoingCountry: savedFilters.selectedOutgoingCountry || [],
        selectedBroadcastTypes: savedFilters.type_of_broadcast || [],
      }));
    }

    if (token) {
      dispatch(fetchBroadCastFilters({ token }));
    }
  }, [dispatch, token]);

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    const booleanValue = value === "1";
    if (name === "daily_broadcast") {
      setBroadcastFilterState((prevState) => ({
        ...prevState,
        dailyBroadcast: booleanValue,
      }));
    } else if (name === "broadcasts") {
      setBroadcastFilterState((prevState) => ({
        ...prevState,
        broadcasts: booleanValue,
      }));
    } else if (name === "multicast") {
      setBroadcastFilterState((prevState) => ({
        ...prevState,
        multicast: booleanValue,
      }));
    } else if (name === "servicecast") {
      setBroadcastFilterState((prevState) => ({
        ...prevState,
        servicecast: booleanValue,
      }));
    }
  };

  const submitBroadcastFilters = (event) => {
    event.preventDefault();

    if (!isBroadcastSelected) {
      console.log("No broadcast selected.");
      return;
    }

    try {
      console.log("Preparing to submit broadcast filters...");

      const combinedRegions = [
        ...new Set([
          ...broadcastFilterState.selectedRegions,
          ...broadcastFilterState.selectedOutgoingRegions,
        ]),
      ];
      const combinedCountries = [
        ...new Set([
          ...broadcastFilterState.selectedCountry,
          ...broadcastFilterState.selectedOutgoingCountry,
        ]),
      ];

      const transformedData = {
        daily_broadcast: broadcastFilterState.dailyBroadcast,
        broadcasts: broadcastFilterState.broadcasts,
        type_of_broadcast: broadcastFilterState.selectedBroadcastTypes,
        categories: broadcastFilterState.selectedCategories,
        services: broadcastFilterState.selectedServices,
        groupings: broadcastFilterState.selectedGroupings,
        region: combinedRegions,
        country: combinedCountries,
        mfg: filteredIncludedMFGs, // Include the selected manufacturers
      };

      console.log("Transformed Data: ", transformedData);

      // Save to local storage
      try {
        localStorage.setItem(
          "broadcastFilters",
          JSON.stringify({
            ...transformedData,
            multicast: broadcastFilterState.multicast,
            servicecast: broadcastFilterState.servicecast,
            selectedRegions: broadcastFilterState.selectedRegions,
            selectedOutgoingRegions:
              broadcastFilterState.selectedOutgoingRegions,
            selectedCountry: broadcastFilterState.selectedCountry,
            selectedOutgoingCountry:
              broadcastFilterState.selectedOutgoingCountry,
          })
        );
        console.log("Broadcast filters saved to local storage.");
      } catch (storageError) {
        console.error(
          "Error saving broadcast filters to local storage: ",
          storageError
        );
        alert(
          "An error occurred while saving filters locally. Please try again."
        );
      }

      // Dispatch the action
      dispatch(broadCastFilters({ data: transformedData, token }));
      // alert("Broadcast filters submitted successfully!");
      // ✅ Show success toast with light blue color
      showPopup("success", "Broadcast filters submitted successfully!");

      console.log("Broadcast filters submitted successfully.");
      setSelectedCompanyNames([]);
    } catch (error) {
      console.error("Error during broadcast filter submission: ", error);
      showPopup("error", "Failed Submitting Broadcast Filters!Try Again Later");

      // alert("An error occurred while submitting the broadcast filters. Please try again.");
    }
  };

  const isBroadcastSelected =
    broadcastFilterState.selectedBroadcastTypes.length > 0;

  // Handler for clearing all the fields
  const clearBroadCastFields = () => {
    setBroadcastFilterState({
      selectedCategories: [],
      selectedServices: [],
      selectedGroupings: [],
      selectedRegions: [],
      selectedOutgoingRegions: [],
      selectedCountry: [],
      selectedOutgoingCountry: [],
      selectedBroadcastTypes: [],
      dailyBroadcast: false,
      broadcasts: false,
      multicast: false,
      servicecast: false,
    });
    setIncludedMFGs([]);
    alert("All fields have been reset!");
  };

  const { togglePopUp, popupCompanyDetail } = useSelector(
    (state) => state.searchProductStore
  );
  // const company = filters?.data?.[0]?.user_id?.company;
  const company = user?.company;
  console.log("COMPANY ", company);



  // Company Modal Logic
  const openCompanyModal = (company) => {
    console.log("Opening Company Modal with Company:", company);
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUp()); // Show company modal
  };
  console.log("popupCompanyDetail", popupCompanyDetail);
  console.log("togglePopUp", togglePopUp);

  return (
    <>
      <div className={myProfile.profileLayout}>
        <form onSubmit={submitBroadcastFilters}>
          <div className={`fixed ${myProfile.profileBtn} !gap-y-[0px]`}>
            <h1 className="!text-[#444] !text-[0.97vw]">My Profile</h1>
            <span>
              <input
                type="submit"
                value="submit changes"
                className={`${css.sumbitBtn} !text-white !text-base !font-normal !capitalize`}
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
                  </NavLink>{" "}
                </li>
              </ul>
            </div>
            <div className={css.broadcastFilters}>
              <h1>Standard Filters</h1>
              <div className={css.broadcastFilters_emailSettings}>
                <h1>Email Settings</h1>
                <div className={css.broadcastFilters_emailSettings_row}>
                  <div className={css.broadcastFilters_item}>
                    <label>Daily Broadcast Summary</label>
                    <select
                      name="daily_broadcast"
                      value={broadcastFilterState.dailyBroadcast ? "1" : "0"}
                      onChange={handleSelectChange}
                      className="!w-24 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white hover:cursor-pointer transition duration-150 ease-in-out"
                    >
                      <option value="0">Off</option>
                      <option value="1">On</option>
                    </select>
                  </div>
                  <div className={css.broadcastFilters_item}>
                    <label>Broadcast</label>
                    <select
                      name="broadcasts"
                      value={broadcastFilterState.broadcasts ? "1" : "0"}
                      onChange={handleSelectChange}
                      className="!w-24 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white hover:cursor-pointer transition duration-150 ease-in-out"
                    >
                      <option value="0">Off</option>
                      <option value="1">On</option>
                    </select>
                  </div>
                  <div className={css.broadcastFilters_item}>
                    <label>Multicast</label>
                    <select
                      name="multicast"
                      value={broadcastFilterState.multicast ? "1" : "0"}
                      onChange={handleSelectChange}
                      className="!w-24 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white hover:cursor-pointer transition duration-150 ease-in-out"
                    >
                      <option value="0">Off</option>
                      <option value="1">On</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className={css.broadcastFilters_typeOfBroadcast}>
                <h1>Receive The Following Type Of Broadcast</h1>
                <div>
                  <span>
                    <label className="flex items-center gap-1" htmlFor="wtb">
                      Want To Buy{" "}
                      <span className="text-blue-800 text-[8pt] font-semibold">
                        (WTB)
                      </span>
                    </label>
                    <input
                      type="checkbox"
                      checked={broadcastFilterState.selectedBroadcastTypes.includes(
                        "wtb"
                      )}
                      onChange={() =>
                        handleCheckboxChange("type_of_broadcast", "wtb")
                      }
                      name="selectedBroadcastTypes"
                    />
                  </span>
                  <span>
                    <label className="flex items-center gap-1" htmlFor="rfq">
                      Request For Quote{" "}
                      <span className="text-green-600 text-[8pt] font-semibold">
                        (RFQ)
                      </span>
                    </label>
                    <input
                      type="checkbox"
                      checked={broadcastFilterState.selectedBroadcastTypes.includes(
                        "rfq"
                      )}
                      onChange={() =>
                        handleCheckboxChange("type_of_broadcast", "rfq")
                      }
                      name="selectedBroadcastTypes"
                    />
                  </span>
                  <span>
                    <label className="flex items-center gap-1" htmlFor="wts">
                      Want To Sell
                      <span className="text-red-500 text-[8pt] font-semibold">
                        (WTS)
                      </span>
                    </label>
                    <input
                      type="checkbox"
                      checked={broadcastFilterState.selectedBroadcastTypes.includes(
                        "wts"
                      )}
                      onChange={() =>
                        handleCheckboxChange("type_of_broadcast", "wts")
                      }
                      name="selectedBroadcastTypes"
                    />
                  </span>
                </div>
              </div>
              <div>
                <MFGFilter onIncludedMFGsChange={handleIncludedMFGsChange} />
              </div>

              <div className={css.broadcastFilters_categories}>
                <h1>In The Following Categories</h1>
                <div className={css.onlyReceiveMatch}>
                  <div className={css.categoriesToggleButton}>
                    <button
                      type="button"
                      onClick={() => toggleOnlyReceiveMatch("computers")}
                      className={`px-4 py-1 rounded-md border text-base transition-colors duration-200 ${
                        onlyReceiveMatch.computers
                          ? "bg-blue-600 text-white font-semibold"
                          : "bg-gray-200 text-gray-800 hover:bg-blue-400"
                      }`}
                    >
                      Computers
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleOnlyReceiveMatch("telecom")}
                      className={`px-4 py-1 rounded-md border text-base transition-colors duration-200 ${
                        onlyReceiveMatch.telecom
                          ? "bg-blue-600 text-white font-semibold"
                          : "bg-gray-200 text-gray-800 hover:bg-blue-400"
                      }`}
                    >
                      Telecom
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleOnlyReceiveMatch("mobileDevice")}
                      className={`px-4 py-1 rounded-md border text-base transition-colors duration-200 ${
                        onlyReceiveMatch.mobileDevice
                          ? "bg-blue-600 text-white font-semibold"
                          : "bg-gray-200 text-gray-800 hover:bg-blue-400"
                      }`}
                    >
                      Mobile Devices
                    </button>
                  </div>

                  {onlyReceiveMatch.computers && (
                    <div>
                      <ul className={css.checkbox}>
                        <CheckboxList
                          items={computers}
                          selectedItems={
                            broadcastFilterState.selectedCategories
                          }
                          handleCheckboxChange={handleCheckboxChange}
                          toggleAllCheckboxes={toggleAllCheckboxes}
                          disabled={!isBroadcastSelected}
                          title="Computer Categories"
                          name="selectedCategories"
                        />
                      </ul>
                    </div>
                  )}
                  {onlyReceiveMatch.telecom && (
                    <div>
                      <ul className={css.checkbox}>
                        <CheckboxList
                          items={telecom}
                          selectedItems={
                            broadcastFilterState.selectedCategories
                          }
                          handleCheckboxChange={handleCheckboxChange}
                          toggleAllCheckboxes={toggleAllCheckboxes}
                          disabled={!isBroadcastSelected}
                          title="Telecom Categories"
                          name="selectedCategories"
                        />
                      </ul>
                    </div>
                  )}
                  {onlyReceiveMatch.mobileDevice && (
                    <div>
                      <ul className={css.checkbox}>
                        <CheckboxList
                          items={mobileDevice}
                          selectedItems={
                            broadcastFilterState.selectedCategories
                          }
                          handleCheckboxChange={handleCheckboxChange}
                          toggleAllCheckboxes={toggleAllCheckboxes}
                          disabled={!isBroadcastSelected}
                          title="Mobile Device Categories"
                          name="selectedCategories"
                        />
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* <div className={css.broadcastFilters_services}>
                <ul className={css.checkbox}>
                  <CheckboxList
                    items={servicesList}
                    selectedItems={broadcastFilterState.selectedServices}
                    handleCheckboxChange={handleCheckboxChange}
                    toggleAllCheckboxes={toggleAllCheckboxes}
                    disabled={!isBroadcastSelected}
                    title="For The Following Services"
                    name="selectedServices" // Differentiates between services and groupings
                  />
                </ul>
              </div> */}

              <div className={css.broadcastFilters_grouping}>
                <ul className={css.groupCheckbox}>
                  <CheckboxList
                    items={groupingsList}
                    selectedItems={broadcastFilterState.selectedGroupings}
                    handleCheckboxChange={handleCheckboxChange}
                    toggleAllCheckboxes={toggleAllCheckboxes}
                    disabled={!isBroadcastSelected}
                    title="With The Following Groupings"
                    name="selectedGroupings" // Differentiates between services and groupings
                  />
                </ul>
              </div>

              <div className={css.broadcastFilters_AdvancedFilters}>
                <h1>Advanced Filters</h1>

                <div className={css.broadcastFilters_regionCountry}>
                  <ul className={css.groupCheckbox}>
                    <UniversalSelector
                      title="From The Following Regions"
                      items={regionsList}
                      selectedItems={broadcastFilterState.selectedRegions}
                      handleCheckboxChange={handleCheckboxChange}
                      toggleAllCheckboxes={toggleAllCheckboxes}
                      disabled={!isBroadcastSelected}
                      selectType="checkbox"
                      showCheckAll={true}
                      name="selectedRegions"
                    />
                  </ul>
                  <div
                    style={{
                      marginLeft: "15px",
                      marginTop: "-24px",
                      marginBottom: "20px",
                    }}
                  >
                    <UniversalSelector
                      title="Or Select a Country"
                      dropdownOptions={countriesList}
                      selectedDropdownValue={
                        broadcastFilterState.selectedCountry
                      }
                      handleDropdownChange={handleDropdownChange}
                      disabled={!isBroadcastSelected}
                      selectType="dropdown"
                      showCheckAll={false}
                    />
                  </div>
                </div>

                <div className={css.broadcastFilters_outgoing}>
                  <ul className={css.groupCheckbox}>
                    <UniversalSelector
                      title="Default Outgoing Settings"
                      items={regionsList}
                      selectedItems={
                        broadcastFilterState.selectedOutgoingRegions
                      }
                      handleCheckboxChange={handleCheckboxChange}
                      toggleAllCheckboxes={toggleAllCheckboxes}
                      disabled={!isBroadcastSelected}
                      selectType="checkbox"
                      showCheckAll={true}
                      name="selectedOutgoingRegions"
                    />
                  </ul>
                  <div
                    style={{
                      marginLeft: "15px",
                      marginTop: "-24px",
                      marginBottom: "20px",
                    }}
                  >
                    <UniversalSelector
                      title="Or Select a Country"
                      dropdownOptions={countriesList}
                      selectedDropdownValue={
                        broadcastFilterState.selectedOutgoingCountry
                      }
                      handleDropdownChange={handleOutgoingCountry}
                      disabled={!isBroadcastSelected}
                      selectType="dropdown"
                      showCheckAll={false}
                    />
                  </div>
                </div>

                <div className={css.broadcastFilters_outgoingVendor}>
                  <h1>Outgoing Vendor Filters</h1>
                  <ul>
                    <li>
                      <span>
                        <label htmlFor="toMyVendorOnly">
                          To My Vendor Only
                        </label>
                        <input
                          type="checkbox"
                          id="toMyVendorOnly"
                          name="toMyVendorOnly"
                          value="toMyVendorOnly"
                        />
                      </span>
                    </li>
                  </ul>
                </div>
                <div className={css.broadcastFilters_companyFilter}>
                  <h1>
                    {" "}
                    Company Filters (Max of 25/Overrides My Vendor settings.){" "}
                  </h1>
                  <div className={css.section} style={{ margin: "10px" }}>
                    <div className={css.display}>
                      <FiltersSearchCompanyInventory />
                    </div>
                  </div>
                </div>
              </div>

              <div className={css.lastSec}>
                <div>
                  <p>
                    Click On The{" "}
                    <Link to={"/myprofile/MyVendors"}>
                      <span>My Vendors </span>
                    </Link>{" "}
                    Link to manage or stop receiving Broadcasts from a vendor.
                  </p>
                  <p>
                    <span style={{ color: "red" }}>1</span>Must be selected to
                    receive Multicast (multiple part broadcast) emails that
                    don't have a specific mfg.
                  </p>
                  <p>
                    <span style={{ color: "red" }}>2</span>Must be selected to
                    receive Servicecast (service related broadcast) emails.
                  </p>
                </div>
              </div>

              <div className={css.btnGroup}>
                <div className={css.btnGroupSec}>
                  <button
                    onClick={clearBroadCastFields}
                    className="transform active:scale-90 transition-all duration-100"
                  >
                    Reset
                  </button>
                  <button
                    onClick={submitBroadcastFilters}
                    className="transform active:scale-90 transition-all duration-100"
                  >
                    Submit Changes
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

      <PopupAlert
        show={popup.show}
        type={popup.type}
        message={popup.message}
        onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
      />
    </>
  );
};

export default Options;
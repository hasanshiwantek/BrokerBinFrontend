import React, { memo, useEffect, useState } from "react";
import css from "../../../styles/Menu/Manage/RfqTable.module.css";
import { tableData } from "../../../data/tableData";
import SearchComponent from "../../SearchComponent.jsx";
import { AiFillMail, AiOutlineMail } from "react-icons/ai";
import RfqTablePopUp from "../../Popups/RfqTablePopUp.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  setTogglePopUp as setTogglePopUpRfq,
  setRfqPopBoxInfo,
  setRfqMail,
  setRfqMailCheckAll,
  setCurrentPageNext,
  setCurrentPagePrev,
} from "../../../ReduxStore/RfqSlice.js";
import { IoMail, IoMailOpen } from "react-icons/io5";
import { receivedRfq, sentRfq } from "../../../ReduxStore/RfqSlice.js";
import Cookies from "js-cookie";
import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
import { NavLink } from "react-router-dom";
import { setPopupCompanyDetail } from "../../../ReduxStore/SearchProductSlice.js";
import CompanyDetails from "../../Popups/CompanyDetails/CompanyDetails.jsx";

import {
  setTogglePopUp as setTogglePopUpCompany
} from "../../../ReduxStore/SearchProductSlice";

const RfqTable = () => {


  const { togglePopUp: togglePopUpRfq, rfqMail, rfqMailCheckAll, currentPage } = useSelector(
    (state) => state.rfqStore
  );

  const { togglePopUp: togglePopUpCompany } = useSelector((state) => state.searchProductStore)

  const { popupCompanyDetail } = useSelector((state) => state.searchProductStore)
  const dispatch = useDispatch();

  const token = Cookies.get("token");

  const { receiveRfqData } = useSelector((state) => state.rfqStore)
  const sentRfqData = useSelector((state) => state.rfqStore.sentRfqData);


  const receivedData = receiveRfqData.data || [];
  console.log("ReceivedData from Frontend", receivedData)
  const itemsPerPage = 20;
  const sliceTo = currentPage * itemsPerPage;
  const sliceFrom = sliceTo - itemsPerPage;

  const currentItems = receivedData.slice(sliceFrom, sliceTo);
  // console.log("CURRENT ITEMS", currentItems)

  const [filteredData, setFilteredData] = useState(receivedData);
  const [resetTrigger, setResetTrigger] = useState(false);

  const applyFilters = (filters) => {
    let filtered = [...receivedData];
    console.log("Filters Applied:", filters);
    console.log("Original Data:", receivedData);
    if (filters.fromDate || filters.toDate) {
      console.log("Date Filter Condition Satisfied:", filters.fromDate, filters.toDate);
      const fromDate = filters.fromDate ? new Date(filters.fromDate + "T00:00:00") : null;
      const toDate = filters.toDate ? new Date(filters.toDate + "T23:59:59") : null;
      console.log("From Date:", fromDate, "To Date:", toDate);
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.updated_at.replace(" ", "T")); // Parse `updated_at`
        console.log("Item Date:", item.updated_at, "Parsed Date:", itemDate);
        const isAfterFrom = !fromDate || itemDate >= fromDate;
        const isBeforeTo = !toDate || itemDate <= toDate;
        const isMatch = isAfterFrom && isBeforeTo;
        console.log(
          `ItemDate: ${itemDate}, FromDate: ${fromDate}, ToDate: ${toDate}, Match: ${isMatch}`
        );
        return isMatch;
      });
      console.log("Filtered Data After Date Filter:", filtered);
    }
    
    // Subject filter
    if (filters.subject) {
      filtered = filtered.filter((item) => {
        const subject = item.subject || ""; // Handle null values
        const isMatch = subject.toLowerCase().includes(filters.subject.toLowerCase());
        console.log(`Subject: "${subject}", Filter: "${filters.subject}", Match: ${isMatch}`);
        return isMatch;
      });
      console.log("After Subject Filter:", filtered);
    }
  
    // Status filter
    if (filters.new || filters.forward || filters.reply || filters.unread) {
      filtered = filtered.filter((item) => {
        if (filters.new && !item.isNew) return false; // Filter for "New"
        if (filters.forward && !item.isForwarded) return false; // Filter for "Forward"
        if (filters.reply && !item.isReplied) return false; // Filter for "Reply"
        if (filters.unread && item.isRead) return false; // Filter for "Unread"
        return true;
      });
      console.log("After Status Filters:", filtered);
    }
    
    // Part Number filter
    if (filters.partNumbers) {
      filtered = filtered.filter((item) => {
        const partNumbers = item.partNumbers || []; // Handle null or empty arrays
        const isMatch = partNumbers.some((part) =>
          (part || "").toLowerCase().includes(filters.partNumbers.toLowerCase())
        );
        console.log(`Part Numbers: ${JSON.stringify(partNumbers)}, Filter: "${filters.partNumbers}", Match: ${isMatch}`);
        return isMatch;
      });
      console.log("After Part Numbers Filter:", filtered);
    }
  
    // Sender Information filter
    if (filters.firstName) {
      filtered = filtered.filter((item) => {
        const senderInfo = `${item.from?.firstName || ""} ${item.from?.lastName || ""} ${item.from?.email || ""} ${item.from?.company?.name || ""}`; // Use `from` for sender details
        const isMatch = senderInfo.toLowerCase().includes(filters.firstName.toLowerCase());
        console.log(`Sender Info: "${senderInfo}", Filter: "${filters.firstName}", Match: ${isMatch}`);
        return isMatch;
      });
      console.log("After Sender Information Filter:", filtered);
    }
  
    setFilteredData(filtered);
  };

  const resetFilters = () => {
    console.log("Reset button clicked");
    setFilteredData(receivedData); // Reset table to original 
    setResetTrigger((prev) => !prev);
    console.log("Filters Reset. Data Reset to Original:", receivedData);
  };

  useEffect(() => {
    dispatch(receivedRfq({ token }));
    // dispatch(sentRfq({ token }));
    if (!sentRfqData?.totalCount){
      dispatch(sentRfq({token}));
    }
  }, [dispatch, token]); // Adding token and dispatch as dependencies

  useEffect(() => {
    if (receivedData.length > 0) {
      setFilteredData(receivedData);
      console.log("Filtered data updated from receivedData:", receivedData);
    }
  }, [receivedData]);
  

  const prevPage = () => {
    if (currentPage === 1) {
      return;
    }
    dispatch(setCurrentPagePrev());
  };

  const nextPage = () => {
    if (currentPage === Math.ceil(tableData.length / itemsPerPage)) {
      return;
    }
    dispatch(setCurrentPageNext());
  };

  const handleShowPopupRfq = (event, rfq) => {
    event.stopPropagation();
  
    // Use added_by_id and partId to uniquely identify the RFQ
    const id = rfq?.added_by_id;
    const partNumbers = rfq?.partNumbers; // Or any other unique field
  
    console.log("Clicked RFQ ID:", id);
    console.log("Clicked RFQ Part Numbers:", partNumbers);
    console.log("Current Items:", currentItems);
  
    if (!id) {
      console.error("RFQ ID is undefined or invalid.");
      return;
    }
  
    // Match the RFQ using added_by_id and partNumbers
    const selectedRfq = currentItems.find(
      (item) => item.added_by_id === id && JSON.stringify(item.partNumbers) === JSON.stringify(partNumbers)
    );
  
    console.log("Selected RFQ:", selectedRfq);
  
    if (selectedRfq) {
      dispatch(setTogglePopUpRfq());
      dispatch(setRfqPopBoxInfo([selectedRfq])); // Pass the selected RFQ as an array
    } else {
      console.error("Selected RFQ not found in current items.");
    }
  };
  
  const handleCheckboxClick = (event, id) => {
    event.stopPropagation(); // Prevent propagation to the row's click handler
    if (event.target.checked) {
      // Add the selected row to rfqMail
      const selectedMail = receivedData.find((item) => item.id === id);
      if (selectedMail) {
        dispatch(setRfqMail([...rfqMail, selectedMail]));
      }
    } else {
      // Remove the deselected row from rfqMail
      dispatch(setRfqMail(rfqMail.filter((mail) => mail.id !== id)));
    }
  };
  
  const handleCheckboxClickAll = (event) => {
    event.stopPropagation(); // Prevent propagation
    const isChecked = event.target.checked;
    dispatch(setRfqMailCheckAll(isChecked)); // Update "Select All" state
    
    if (isChecked) {
      // Select all rows
      dispatch(setRfqMail(receivedData));
    } else {
      // Deselect all rows
      dispatch(setRfqMail([]));
    }
  };
  
  // Company Modal Logic
  const openCompanyModal = (company) => {
    console.log("Opening Company Modal with Company:", company);
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUpCompany()); // Show company modal
  };

  return (
    <>
      <div className={css.layout}>
        <div className={css.tableArea}>
          <div className={css.rfqTable}>
            <div className={myProfile.profileInfo_links}>
              <ul>
                <li>
                  <NavLink
                    to="/rfq"
                    className={({ isActive }) => (isActive ? myProfile.active : '')}
                  >
                    <span>Received({receiveRfqData.totalCount})</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/rfqSent"
                    className={({ isActive }) => (isActive ? myProfile.active : '')}
                  >
                     <span>Sent ({sentRfqData?.totalCount || 0})</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? myProfile.active : '')}
                  >
                    <span>New</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? myProfile.active : '')}
                  >
                    <span>Archeive</span>
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className={css.rfqTableDetail}>
              <SearchComponent onSearch={applyFilters} resetTrigger={resetTrigger}/>
              <table>
                <thead>
                  <tr>
                    <th>
                      <span>
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          onChange={handleCheckboxClickAll}
                          checked={rfqMailCheckAll}
                        />
                        status
                      </span>
                    </th>
                    <th>Qty</th>
                    <th>Parts</th>
                    <th>PO subject</th>
                    <th>from</th>
                    <th>Company</th>
                    <th>date</th>
                  </tr>
                </thead>
                <tbody>
                  {(filteredData || []).map((e) => (
                    <tr
                      className={css.tableData}
                      key={e.id}
                      onClick={(event) => {
                        console.log("Passed RFQ Object:", e);
                        handleShowPopupRfq(event, e);
                      }}
                    >
                      <td>
                        <input
                          type="checkbox"
                          name="addToCart"
                          id="addToCart"
                          onClick={(event) => event.stopPropagation()}
                          onChange={(event) => handleCheckboxClick(event, e.id)}
                          checked={rfqMail.some((mail) => mail.id === e.id)}
                        />
                        <td>(0|1)</td>

                        {/* {!e.read ? <IoMail /> : <IoMailOpen />} */}
                        <img src="https://static.brokerbin.com/version/v8.2.9/images/New.png" alt="" srcset="" />
                        {/* Open Img: https://static.brokerbin.com/version/v8.2.9/images/Open.png */}
                      </td>
                      <td>
                        {e.quantities?.reduce((total, quantity) => total + Number(quantity), 0)}
                      </td>
                      <td>
                        {e.partNumbers?.length > 1 ? (
                          <>
                            <td>{e.partNumbers.length} Parts</td>
                            <div className={css.companyDropdown}>
                              {e.partNumbers.map((part, index) => (
                                <div key={index} className={css.companyItem}>
                                  {part}
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <span>{e.partNumbers[0]}</span>
                        )}
                      </td>
                      <td>
                        {e.subject}
                      </td>
                      <td>{e.from.firstName}  {e.from.lastName}</td>
                      <td>
                        <a onClick={() => openCompanyModal(e.from.company)}>{e.from.company.name}</a>
                      </td>
                      <td>{e.updated_at}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className={css.rfqTableDetailBottom} >
                  <tr>
                    <th>
                      <span>
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          onChange={handleCheckboxClickAll}
                          checked={rfqMailCheckAll}
                        />
                        status
                      </span>
                    </th>
                    <th>Qty</th>
                    <th>Parts</th>
                    <th>PO subject</th>
                    <th>from</th>
                    <th>company</th>
                    <th>date</th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className={css.rfqTableBtn_bottom}>
              <div>
                <button type="button">send</button>
                <button 
                  onClick={resetFilters} 
                  className={css.resetFiltersBtn}
                  type="button">
                  Reset Filters
                </button>
                <button type="button">reply</button>
                <button type="button">forward</button>
                <button type="button">archive</button>
                <button type="button">mark as read</button>
                <button type="button">mark as unread</button>
                
              </div>
              <div className={css.pagination}>
                <button onClick={prevPage}>prev</button>
                <p>{currentPage}</p>
                <button onClick={nextPage}>next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {togglePopUpRfq && <RfqTablePopUp type="received" />}


      {togglePopUpCompany && <CompanyDetails closeModal={() => dispatch(setTogglePopUpCompany())} />}
    </>
  );
};

export default memo(RfqTable);
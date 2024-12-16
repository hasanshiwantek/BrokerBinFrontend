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
import { receivedRfq } from "../../../ReduxStore/RfqSlice.js";
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
  console.log("Data From Page", receiveRfqData)


  const receivedData = receiveRfqData.data || [];
  console.log("ReceivedData from Frontend", receivedData)


  useEffect(() => {
    dispatch(receivedRfq({ token }));
  }, [dispatch, token]); // Adding token and dispatch as dependencies






  const itemsPerPage = 20;
  const sliceTo = currentPage * itemsPerPage;
  const sliceFrom = sliceTo - itemsPerPage;

  const currentItems = receivedData.slice(sliceFrom, sliceTo);
  console.log("CURRENT ITEMS", currentItems)

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

  const now = new Date();
  const date = `${now.getHours() > 12
    ? (now.getHours() % 12) +
    `:` +
    (now.getMinutes() < 9 ? `0` + now.getMinutes() : now.getMinutes()) +
    `PM`
    : `0` +
    now.getHours() +
    `:` +
    (now.getMinutes() < 9 ? `0` + now.getMinutes() : now.getMinutes()) +
    `AM`
    } ${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`;

  

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
    event.stopPropagation(); // Prevent the event from propagating to the row click event
    if (event.target.checked) {
      const mails = currentItems.filter((m) => m.id === id);
      dispatch(setRfqMail([...rfqMail, ...mails]));
    } else {
      dispatch(setRfqMail(rfqMail.filter((e) => e.id !== id)));
    }
  };

  const handleCheckboxClickAll = (event) => {
    event.stopPropagation(); // Prevent the event from propagating to the row click event
    dispatch(setRfqMailCheckAll(event.target.checked));
    if (event.target.checked) {
      dispatch(setRfqMail(currentItems));
    } else {
      dispatch(setRfqMail([]));
    }
  };
  // Company Modal Logic
  const openCompanyModal = (company) => {
    console.log("Opening Company Modal with Company:", company);
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUpCompany()); // Show company modal
  };
  console.log("popupCompanyDetail", popupCompanyDetail);
  console.log("togglePopUp", togglePopUpCompany);

  return (
    <>
      <div className={css.layout}>
        <div className={css.tableArea}>
          <div className={css.rfqTable}>
            {/* 
            <div className={css.rfqTableBtn_top}>


              <a href="/rfq" >received({tableData.length})</a>
              <a href="/rfqSent">sent(0)</a>
              <a >new</a>
              <a >archive</a>


            </div> */}






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
                    <span>Sent</span>
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
              <SearchComponent />
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
                  {receivedData?.map((e) => (
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
                          checked={
                            rfqMail.some((mail) => mail.id === e.id) ||
                            rfqMailCheckAll
                          }
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
                <button type="button">reset</button>
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










































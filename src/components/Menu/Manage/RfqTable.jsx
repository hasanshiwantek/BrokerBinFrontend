import React, { memo, useEffect, useState } from "react";
import css from "../../../styles/Menu/Manage/RfqTable.module.css";
import { tableData } from "../../../data/tableData";
import SearchComponent from "../../SearchComponent.jsx";
import { AiFillMail, AiOutlineMail } from "react-icons/ai";
import RfqTablePopUp from "../../Popups/RfqTablePopUp.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  setTogglePopUp,
  setRfqPopBoxInfo,
  setRfqMail,
  setRfqMailCheckAll,
  setCurrentPageNext,
  setCurrentPagePrev,
} from "../../../ReduxStore/RfqSlice.js";
import { IoMail, IoMailOpen } from "react-icons/io5";
import { receivedRfq } from "../../../ReduxStore/RfqSlice.js";
import Cookies from "js-cookie";



const RfqTable = () => {

 


  const { togglePopUp, rfqMail, rfqMailCheckAll, currentPage } = useSelector(
    (state) => state.rfqStore
  );




  const dispatch = useDispatch();

  const token = Cookies.get("token");

  const {receiveRfqData}=useSelector((state)=>state.rfqStore)
  console.log("Data From Page",receiveRfqData)
  

  const receivedData=receiveRfqData.data


  console.log("Data Received",receivedData)
 
  useEffect(()=>{
    dispatch(receivedRfq({token}))
  },[])






  const itemsPerPage = 20;
  const sliceTo = currentPage * itemsPerPage;
  const sliceFrom = sliceTo - itemsPerPage;
  const currentItems = tableData.slice(sliceFrom, sliceTo);

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
  const date = `${
    now.getHours() > 12
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

  const handleShowPopupRfq = (event, { id }) => {
    event.stopPropagation(); // Prevent the event from propagating to the row click event
    dispatch(setTogglePopUp());
    dispatch(setRfqPopBoxInfo(currentItems.filter((item) => item.id === id)));
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


  return (
    <>
      <div className={css.layout}>
        <div className={css.tableArea}>
          <div className={css.rfqTable}>
            <div className={css.rfqTableBtn_top}>


              <a href="/rfq" >received({tableData.length})</a>
              <a href="/rfqSent">sent(0)</a>
              <a >new</a>
              <a >archive</a>


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
                        <p>(0|1)</p>
                        {/* {!e.read ? <IoMail /> : <IoMailOpen />} */}
                        <img src="https://static.brokerbin.com/version/v8.2.9/images/New.png" alt="" srcset="" />
                        {/* Open Img: https://static.brokerbin.com/version/v8.2.9/images/Open.png */}
                      </td>
                      <td> {e.quantities.map((item, index) => (
                                                <td className="mr-2" key={index}>{item}</td>
                                            ))}</td>
                      <td> {e.partNumbers.map((item, index) => (
                                                <td className="mr-2" key={index}>{item}</td>
                                            ))}</td>
                      <td>
                        {e.subject}
                      </td>
                      <td>{e.from.firstName}  {e.from.lastName}</td>
                      <td>
                        <a>{e.from.company}</a>
                      </td>
                      <td>{e.updated_at}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
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
      {togglePopUp && <RfqTablePopUp />}
    </>
  );
};

export default memo(RfqTable);

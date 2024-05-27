import React, { memo, useState } from "react";
import css from "../../../styles/Menu/Manage/RfqTable.module.css";
import { tableData } from "../../../data/tableData";
import SearchComponent from "../../SearchComponent.jsx";
import { AiFillMail } from "react-icons/ai";
import RfqTablePopUp from "../../Popups/RfqTablePopUp.jsx";
import { Pagination } from "@mui/material";
const RfqTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const sliceTo = currentPage * itemsPerPage;
  const sliceFrom = sliceTo - itemsPerPage;
  const currentItems = tableData.slice(sliceFrom, sliceTo);
  const [togglePopUp, setTogglePopUp] = useState(false);
  console.log(Math.ceil(tableData.length / itemsPerPage));
  const prevPage = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage((prev) => prev - 1);
  };
  const nextPage = () => {
    if (currentPage === Math.ceil(tableData.length / itemsPerPage)) {
      return;
    }
    setCurrentPage((prev) => prev + 1);
  };

  const now = new Date();
  const date = `${
    now.getHours() > 12
      ? `0` +
        (now.getHours() % 12) +
        `:` +
        (now.getMinutes() < 9 ? `0` + now.getMinutes() : now.getMinutes()) +
        `PM`
      : now.getHours() + `AM`
  } ${now.getFullYear()}/${now.getMonth()}/${now.getDate()}`;

  const handleShowPopupRfq = (event) => {
    // stop event to reach the popup state value.
    event.stopPropagation(); // Stop the click event from propagating to the document
    setTogglePopUp((prev) => !prev);
  };

  return (
    <>
      <div className={css.layout}>
        <div className={css.tableArea}>
          <div className={css.rfqTable}>
            <div className={css.rfqTableBtn_top}>
              <button type="button">received({tableData.length})</button>
              <a href="/cartpart">sent(0)</a>
              <button type="button">new</button>
              <button type="button">archive</button>
            </div>
            <div className={css.rfqTableDetail}>
              <SearchComponent />

              <table>
                <thead>
                  <tr>
                    <th>
                      <span>
                        <input type="checkbox" name="" id="" />
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
                  {currentItems.map((e, i) => {
                    return (
                      <tr
                        className={css.tableData}
                        key={i}
                        onClick={handleShowPopupRfq}
                      >
                        <td>
                          <input
                            type="checkbox"
                            name="addToCart"
                            id="addToCart"
                            // defaultValue={false}
                          />
                          <p>(0|1)</p>
                          <AiFillMail />
                        </td>
                        <td>{e.quantity}</td>
                        <td>{e.model}</td>
                        <td>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </td>
                        <td>kaif abbas</td>
                        <td>
                          <a
                            href="#"
                            // onClick={() => setTogglePopUp((prev) => !prev)}
                          >
                            {/* <ShieldOfQuality/> */}
                            {e.company}
                          </a>
                        </td>
                        <td>{date}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th>
                      <span>
                        <input type="checkbox" name="" id="" />
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
                {/* {Array.from(
                  { length: Math.ceil(tableData.length / itemsPerPage) },
                  (_, i) => (
                    <button key={i} onClick={() => paginate(i + 1)}>
                      {i + 1}
                    </button>
                  )
                )} */}
                <button onClick={prevPage}>prev</button>
                <p>{currentPage}</p>
                <button onClick={nextPage}>next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {togglePopUp && <RfqTablePopUp setTogglePopUp={setTogglePopUp} />}
    </>
  );
};

export default memo(RfqTable);

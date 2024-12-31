import React, { memo, useEffect, useState } from "react";
import css from "../../../../styles/Menu/Manage/RfqTable.module.css";
import { tableData } from "../../../../data/tableData";
import SearchComponent from "../../../SearchComponent.jsx";
import { AiFillMail, AiOutlineMail } from "react-icons/ai";
import RfqTablePopUp from "../../../Popups/RfqTablePopUp.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  setTogglePopUp as setTogglePopUpRfq,
  setRfqPopBoxInfo,
  setRfqMail,
  setRfqMailCheckAll,
  setCurrentPageNext,
  setCurrentPagePrev,
} from "../../../../ReduxStore/RfqSlice.js";
import { IoMail, IoMailOpen } from "react-icons/io5";
import { getRfqArchived, deleteArchiveRfq,receivedRfq,sentRfq } from "../../../../ReduxStore/RfqSlice.js";
import Cookies from "js-cookie";
import myProfile from "../../../../styles/Menu/Manage/MyProfile.module.css";
import { NavLink } from "react-router-dom";
import { setPopupCompanyDetail } from "../../../../ReduxStore/SearchProductSlice.js";
import CompanyDetails from "../../../Popups/CompanyDetails/CompanyDetails.jsx";

import {
  setTogglePopUp as setTogglePopUpCompany
} from "../../../../ReduxStore/SearchProductSlice";
import { useNavigate } from "react-router-dom";



const RfqTableSent = () => {
  const navigate = useNavigate()


  const { togglePopUp: togglePopUpRfq, rfqMail, rfqMailCheckAll, currentPage } = useSelector(
    (state) => state.rfqStore
  );

  const [resetTrigger, setResetTrigger] = useState(false);

  const { togglePopUp: togglePopUpCompany } = useSelector((state) => state.searchProductStore)
  const { sentRfqData, receiveRfqData } = useSelector((state) => state.rfqStore)

  const { popupCompanyDetail } = useSelector((state) => state.searchProductStore)

  const dispatch = useDispatch();

  const token = Cookies.get("token");

  const { rfqArchiveData } = useSelector((state) => state.rfqStore)
  console.log("Data From Page", sentRfqData)


  const sentData = rfqArchiveData.data || [];
  console.log("SENDATA", sentData)

  const [filteredData, setFilteredData] = useState(sentData);

  const applyFilters = (filters) => {
    let filtered = [...sentData];
    console.log("Filters Applied:", filters);

    // Date Filter
    if (filters.fromDate || filters.toDate) {
      const fromDate = filters.fromDate ? new Date(filters.fromDate + "T00:00:00") : null;
      const toDate = filters.toDate ? new Date(filters.toDate + "T23:59:59") : null;

      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.updated_at.replace(" ", "T"));
        return (!fromDate || itemDate >= fromDate) && (!toDate || itemDate <= toDate);
      });
    }

    // Subject Filter
    if (filters.subject) {
      filtered = filtered.filter((item) =>
        (item.subject || "").toLowerCase().includes(filters.subject.toLowerCase())
      );
    }

    // Sender (To) Information Filter
    if (filters.firstName) {
      filtered = filtered.filter((item) => {
        const recipientInfo = item.to
          ?.map((recipient) =>
            `${recipient.firstName || ""} ${recipient.lastName || ""} ${recipient.email || ""} ${recipient.company?.name || ""}`
          )
          .join(" ");
        return recipientInfo?.toLowerCase().includes(filters.firstName.toLowerCase());
      });
    }

    // Part Numbers Filter
    if (filters.partNumbers) {
      filtered = filtered.filter((item) => {
        const partNumbers = item.partNumbers || [];
        return partNumbers.some((part) =>
          (part || "").toLowerCase().includes(filters.partNumbers.toLowerCase())
        );
      });
    }

    // Status Filter
    if (filters.new || filters.forward || filters.reply || filters.unread) {
      filtered = filtered.filter((item) => {
        if (filters.new && !item.isNew) return false;
        if (filters.forward && !item.isForwarded) return false;
        if (filters.reply && !item.isReplied) return false;
        if (filters.unread && item.isRead) return false;
        return true;
      });
    }

    setFilteredData(filtered);
  };


  const companyData = sentData?.map((item) => {
    return item.to?.map((recipient) => recipient.company?.name);
  });

  console.log("Company Names: ", companyData);


  console.log("Sent Data Received", sentData)

  useEffect(() => {
    dispatch(getRfqArchived({ token }))
  }, [])


  
    useEffect(() => {
      dispatch(receivedRfq({ token }));
        dispatch(sentRfq({token}));
    }, [dispatch, token]); // Adding token and dispatch as dependencies
  


  useEffect(() => {
    if (sentData.length > 0) {
      setFilteredData(sentData);
      console.log("Filtered data updated from receivedData:", sentData);
    }
  }, [sentData]);




  const itemsPerPage = 20;
  const sliceTo = currentPage * itemsPerPage;
  const sliceFrom = sliceTo - itemsPerPage;
  const currentItems = sentData.slice(sliceFrom, sliceTo);
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
  console.log("Current Page:", currentPage);
console.log("Current Items:", currentItems);


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

  // const handleShowPopupRfq = (event, { id }) => {
  //     event.stopPropagation(); // Prevent the event from propagating to the row click event
  //     dispatch(setTogglePopUp());
  //     dispatch(setRfqPopBoxInfo(currentItems.filter((item) => item.id === id)));
  // };
  const handleShowPopupRfq = (event, item) => {
    event.stopPropagation();

    console.log("RFQ ID Passed:", item.rfqId);
    console.log("Current ITEMS Available:", currentItems);

    const filteredData = currentItems.filter((rfq) => rfq.rfqId === item.rfqId);
    console.log("Filtered Data:", filteredData);
    dispatch(setTogglePopUpRfq());
    dispatch(setRfqPopBoxInfo(filteredData));
  };





  const handleCheckboxClick = (event, rfqId) => {
    event.stopPropagation(); // Prevent row click event from triggering
    const isChecked = event.target.checked;

    if (isChecked) {
      const selectedMail = filteredData.find((mail) => mail.rfqId === rfqId);
      dispatch(setRfqMail([...rfqMail, selectedMail]));
    } else {
      dispatch(setRfqMail(rfqMail.filter((mail) => mail.rfqId !== rfqId)));
    }
  };


  const handleCheckboxClickAll = (event) => {
    event.stopPropagation(); // Prevent row click event from triggering
    const isChecked = event.target.checked;

    dispatch(setRfqMailCheckAll(isChecked));

    if (isChecked) {
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


  const resetFilters = () => {
    setFilteredData(sentData);
    setResetTrigger((prev) => !prev);
    console.log("Filters Reset. Data Reset to Original:", sentData);
  };



  const handleReply = () => {
    if (rfqMail.length === 0) {
      alert("Please select at least one RFQ to reply.");
      return;
    }

    navigate("/rfq/create", { state: { selectedRfqs: rfqMail } }); // Pass all selected RFQs
  };



  const handleDelete = () => {
    if (rfqMail.length === 0) {
      alert("Please select at least one RFQ to delete.");
      return;
    }

    const rfqIdsToDelete = rfqMail.map((rfq) => rfq.rfqId); // Collect RFQ IDs
    const token = Cookies.get("token"); // Get token

    dispatch(deleteArchiveRfq({ token, ids: rfqIdsToDelete }))
      .then(() => {
        console.log("Selected RGQs Deleted")
        alert("Selected RFQs deleted successfully!");
        dispatch(getRfqArchived({ token })); // Refresh the data
      })
      .catch((error) => {
        console.error("Error deleting RFQs:", error);
        alert("Failed to delete RFQs. Please try again.");
      });
  };



  const handleForward = () => {
    if (rfqMail.length === 0) {
        alert("Please select at least one RFQ to forward.");
        return;
    }

    const selectedRfqs = rfqMail.map((rfq) => ({
        id: rfq.id, // Ensure you are mapping `id` properly from sent RFQs
        ...rfq,
    }));

    navigate("/rfq/create", { state: { selectedRfqs, type: "forward" } });
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
                    <span>Received({receiveRfqData.totalCount }/{receiveRfqData.unreadCount})</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/rfqSent"
                    className={({ isActive }) => (isActive ? myProfile.active : '')}
                  >
                    <span>Sent ({sentRfqData?.totalCount})</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/rfq/create"
                    className={({ isActive }) => (isActive ? myProfile.active : '')}
                  >
                    <span>New</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/rfqArchived"
                    className={({ isActive }) => (isActive ? myProfile.active : '')}
                  >
                    <span>Archive</span>
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className={css.rfqTableDetail}>
              <SearchComponent
                onSearch={applyFilters}
                resetTrigger={resetTrigger}
                isSent={true} // Optional for resetting fields
              />
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
                      key={e.rfqId} // Correct key based on the response structure
                      onClick={(event) => {
                        console.log("Row Clicked");
                        handleShowPopupRfq(event, e);
                      }}
                    >
                      <td>
                        <input
                          type="checkbox"
                          name="addToCart"
                          id={`checkbox-${e.rfqId}`} // Add unique ID
                          onClick={(event) => event.stopPropagation()} // Ensure row click doesn't interfere
                          onChange={(event) => handleCheckboxClick(event, e.rfqId)} // Correctly handle checkbox clicks
                          checked={rfqMail.some((mail) => mail.rfqId === e.rfqId)} // Check if this item is selected
                        />
                   
                        {/* Dynamic image based on isRead */}
                        {/* {e.isRead === 1 ? (
                          <img
                            src="https://static.brokerbin.com/version/v8.2.9/images/Open.png"
                            alt="Read"
                            title="Read"
                          />
                        ) : (
                          <img
                            src="https://static.brokerbin.com/version/v8.2.9/images/New.png"
                            alt="Unread"
                            title="Unread"
                          />
                        )} */}
                      </td>
                      <td>
                        {e.quantities?.reduce(
                          (total, quantity) => total + Number(quantity || 0),
                          0
                        )}
                      </td>
                      <td>
                        {e.partNumbers?.length > 1 ? (
                          <>
                            <td>{e.partNumbers.length} Parts</td>
                            <div className={css.companyDropdown}>
                              {e.partNumbers.map((part, index) => (
                                <div key={index} className={css.companyItem}>
                                  {part || "N/A"}
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <td>{e.partNumbers?.[0] || "N/A"}</td>
                        )}
                      </td>
                      <td>{e.subject || "N/A"}</td>
                      <td>{e.from.firstName}  {e.from.lastName}</td>
                      <td>
                        {e.from?.company ? (
                          <td onClick={() => openCompanyModal(e.from.company)}>
                            {e.from.company.name || "N/A"}
                          </td>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td>{e.updated_at || "N/A"}</td>
                    </tr>
                  ))}

                </tbody>
                <tfoot className={css.rfqTableDetailBottom}>
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
                  type="button"
                  onClick={resetFilters}>reset</button>

                <button type="button" onClick={handleReply}>
                  reply
                </button>
                <button type="button" onClick={handleForward}>forward</button>
                <button type="button" onClick={handleDelete}>
                  Delete
                </button>

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
      {togglePopUpRfq && <RfqTablePopUp type="sent" />}
      {togglePopUpCompany && <CompanyDetails closeModal={() => dispatch(setTogglePopUpCompany())} />}
    </>
  );
};

export default memo(RfqTableSent);

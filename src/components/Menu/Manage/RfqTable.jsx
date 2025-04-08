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
import { receivedRfq, sentRfq, statusRfq } from "../../../ReduxStore/RfqSlice.js";
import Cookies from "js-cookie";
import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
import { NavLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();


  const { receiveRfqData } = useSelector((state) => state.rfqStore)

  // Extract pagination details
  const pagination = receiveRfqData?.pagination || {}; // Assuming pagination is present in sentRfqData
  console.log("Pagination ", pagination)
  const totalPages = pagination.totalPages || 1;
  console.log("TOTAL PAGES ", totalPages)
  const currPage = pagination.currentPage || 1;
  console.log("current page  ", currPage)


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
      const lowerCaseSubject = filters.subject.toLowerCase();

      filtered = filtered.filter((item) => {
        const subject = item.subject || ""; // Handle null values
        const isPoInHand = lowerCaseSubject.includes("po") && item.po_in_hand === "1"; // Check for "po in hand"
        const isMatch =
          isPoInHand || subject.toLowerCase().includes(lowerCaseSubject);

        console.log(
          `Subject: "${subject}", Filter: "${filters.subject}", Match: ${isMatch}`
        );
        return isMatch;
      });

      console.log("After Subject Filter:", filtered);
    }


    // Status filter
    // Status filter
    //   if (filters.forward) {
    //     filtered = filtered.filter((item) => item.isForwarded === 1); // Filter where isForwarded is 1
    //  }

    if (filters.new || filters.forward || filters.reply || filters.unread || filters.read || filters.archive) {
      filtered = filtered.filter((item) => {
        if (filters.new && !item.isNew) return false; // Filter for "New"
        if (filters.forward && String(item.isForwarded) !== "1") return false;
        if (filters.unread && String(item.isRead) === "1") return false; // For "Unread", ensure comparison is string "1"
        if (filters.read && String(item.isRead) === "0") return false; // For "Read", ensure comparison is string "0"
        if (filters.read && item.isRead === "0") return false; // For string "0"

        if (filters.archive && item.isArchive !== 1) return false; // Filter for "Archive"
        return true;
      });
      console.log("Filtered Data After Status Filters:", filtered);
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

    // Fetch data and ensure pagination details are retrieved
    dispatch(receivedRfq({ token, page: currPage }))
      .unwrap()
      .then((response) => {
        // Optional: You can set local state based on response if needed
        const { pagination } = response;
        if (pagination) {
          setVisiblePages([1, Math.min(10, pagination.totalPages)]); // Initialize visible pages
        }
      })
      .catch((error) => {
        console.error("Error fetching sent RFQs:", error);
      });

    // dispatch(sentRfq({ token }));
    if (!sentRfqData?.totalCount) {
      dispatch(sentRfq({ token }));
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

  const handleCheckboxClick = (event, rfqId) => {
    event.stopPropagation(); // Prevent event propagation
    if (event.target.checked) {
      const selectedMail = filteredData.find((item) => item.rfqId === rfqId); // Match using userId
      if (selectedMail) {
        dispatch(setRfqMail([...rfqMail, selectedMail])); // Add the selected mail to rfqMail
      }
    } else {
      dispatch(setRfqMail(rfqMail.filter((mail) => mail.rfqId !== rfqId))); // Remove the deselected mail
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

  // const handleReply = () => {
  //   if (rfqMail.length === 0) {
  //     alert("Please select an RFQ to reply.");
  //     return;
  //   }
  //   const selectedRfq = rfqMail[0]; // For now, handle only the first selected RFQ
  //   navigate("/rfq-reply", { state: { selectedRfq } }); // Pass the selected RFQ data
  // };

  const handleReply = () => {
    if (rfqMail.length === 0) {
      alert("Please select at least one RFQ to reply.");
      return;
    }

    navigate("/rfq/create", { state: { selectedRfqs: rfqMail } }); // Pass all selected RFQs
  };

  const handleForward = () => {
    if (rfqMail.length === 0) {
      alert("Please select at least one RFQ to forward.");
      return;
    }

    navigate("/rfq/create", { state: { selectedRfqs: rfqMail, type: "forward" } });
  };

  // const handleAction = async (action) => {
  //   if (rfqMail.length === 0) {
  //     alert("Please select at least one RFQ.");
  //     return;
  //   }

  //   // Mapping actions to payload fields
  //   const actionMap = {
  //     read: { key: "isRead", value: 1 },
  //     unread: { key: "isRead", value: 0 },
  //     archive: { key: "isArchive", value: 1 },
  //     unarchive: { key: "isArchive", value: 0 },
  //   };

  //   const { key, value } = actionMap[action];

  //   const payload = {
  //     items: rfqMail.map((rfq) => ({ id: rfq.id, [key]: value })),
  //   };

  //   try {
  //     const token = Cookies.get("token");
  //     await dispatch(statusRfq({ token, data: payload }));
  //     alert(`RFQ(s) ${action} successfully!`);
  //   } catch (error) {
  //     console.error("Error handling action:", error);
  //     alert(`Failed to ${action} RFQ(s).`);
  //   }
  // };

  const handleAction = async (action) => {
    if (rfqMail.length === 0) {
      alert("Please select at least one RFQ.");
      return;
    }

    // Mapping actions to payload fields
    const actionMap = {
      read: { key: "isRead", value: 1 },
      unread: { key: "isRead", value: 0 },
      archive: { key: "isArchive", value: 1 },
      unarchive: { key: "isArchive", value: 0 },
    };

    const { key, value } = actionMap[action];

    const payload = {
      items: rfqMail.map((rfq) => ({ id: rfq.rfqId, [key]: value })), // Map `rfqId` to `id`
    };

    console.log("Payload being sent:", payload);

    try {
      const token = Cookies.get("token");
      const response = await dispatch(statusRfq({ token, data: payload })).unwrap();
      alert(response.message || `RFQ(s) ${action} successfully!`);
    } catch (error) {
      console.error("Error handling action:", error);
      alert(error?.response?.data?.message || `Failed to ${action} RFQ(s).`);
    }
    dispatch(receivedRfq({ token,page:currPage })); // Re-fetch received RFQs

  };






  // PAGINATION LOGIC

  // Dynamic pagination range
  const [visiblePages, setVisiblePages] = useState([1, Math.min(10, totalPages)]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(receivedRfq({ token, page })) // Fetch data for the selected page
        .unwrap()
        .then((response) => {
          const { pagination } = response;
          if (pagination) {
            setVisiblePages([1, Math.min(10, pagination.totalPages)]); // Update visible pages
          }
        })
        .catch((error) => console.error("Error changing page:", error));
    }
  };

  const handlePrevious = () => {
    if (visiblePages[0] > 1) {
      setVisiblePages([Math.max(visiblePages[0] - 10, 1), visiblePages[0] - 1]);
      dispatch(receivedRfq({ token, page: visiblePages[0] - 1 }));
    }
  };

  const handleNext = () => {
    if (visiblePages[1] < totalPages) {
      setVisiblePages([visiblePages[1] + 1, Math.min(visiblePages[1] + 10, totalPages)]);
      dispatch(receivedRfq({ token, page: visiblePages[1] + 1 }));
    }
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
                    <span>Received({receiveRfqData.totalCount}/{receiveRfqData.unreadCount})</span>
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
                isSent={false} />
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
                  {console.log("Filtered Data:", filteredData) /* Add this here */}
                  {(filteredData || []).map((e) => (
                    <tr
                      className={css.tableData}
                      key={e.rfqId}
                      onClick={(event) => {
                        console.log("Passed RFQ Object:", e);
                        handleShowPopupRfq(event, e);
                      }}
                    >
                      <td>
                        <input
                          type="checkbox"
                          name="addToCart"
                          id={`checbox-${e.from?.userId}`}
                          onClick={(event) => event.stopPropagation()}
                          onChange={(event) => {
                            console.log("Checkbox Clicked for ID:", e.rfqId); // Log the id
                            handleCheckboxClick(event, e.rfqId);
                          }}
                          checked={rfqMail.some((mail) => mail.rfqId === e.rfqId)}
                        />
                        <span>(0|1)</span>

                        {/* Dynamic image based on isRead */}
                        {e.isRead === 1 ? (
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
                        )}
                      </td>
                      <td>
                        {e.quantities?.reduce((total, quantity) => total + Number(quantity), 0)}
                      </td>
                      <td>
                        {e.partNumbers?.length > 1 ? (
                          <>
                            <span>{e.partNumbers.length} Parts</span>
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
                <button type="button" className=" ">send</button>

                <button
                  onClick={resetFilters}
                  className={`${css.resetFiltersBtn}  `}
                  type="button">
                  Reset Filters
                </button>

                <button type="button" onClick={handleReply} className="">
                  reply
                </button>

                <button type="button" onClick={handleForward} className="">
                  forward
                </button>
                <button type="button"
                  onClick={() => handleAction("archive")} className="">archive</button>
                <button type="button"
                  onClick={() => handleAction("read")} className="">mark as read</button>
                <button type="button"
                  onClick={() => handleAction("unread")} className="">mark as unread</button>

              </div>
           {/* PAGINATION CONTROLS */}
                   <div className={css.pagination}>
                     <span className="text-orange-700 p-2 text-xl">
                       Page <span className="text-blue-800">{currPage}</span> of
                       <span className="text-blue-800"> {totalPages}</span>
                     </span>
     
                     {/* Previous Button */}
                     <button
                       onClick={handlePrevious}
                       className={`${''} ${visiblePages[0] === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                       disabled={visiblePages[0] === 1}
                     >
                       Previous
                     </button>
     
                     {/* Dynamic Page Buttons */}
                     {Array.from(
                       { length: visiblePages[1] - visiblePages[0] + 1 },
                       (_, i) => visiblePages[0] + i
                     )
                       .filter((page) => page >= 1 && page <= totalPages)
                       .map((page) => (
                         <button
                           key={page}
                           onClick={() => handlePageChange(page)}
                           className={`${''} ${currPage === page ? css.active : ""}`}
                         >
                           {page}
                         </button>
                       ))}
     
                     {/* Next Button */}
                     <button
                       onClick={handleNext}
                       className={`${''} ${visiblePages[1] === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                       disabled={visiblePages[1] === totalPages}
                     >
                       Next
                     </button>
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
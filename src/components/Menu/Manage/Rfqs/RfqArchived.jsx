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
import {
  getRfqArchived,
  deleteArchiveRfq,
  receivedRfq,
  sentRfq,
  rfqArchive,
  getSortRfqArchived,
} from "../../../../ReduxStore/RfqSlice.js";
import Cookies from "js-cookie";
import myProfile from "../../../../styles/Menu/Manage/MyProfile.module.css";
import { NavLink } from "react-router-dom";
import { setPopupCompanyDetail } from "../../../../ReduxStore/SearchProductSlice.js";
import CompanyDetails from "../../../Popups/CompanyDetails/CompanyDetails.jsx";
import { setTogglePopUp as setTogglePopUpCompany } from "../../../../ReduxStore/SearchProductSlice";
import { useNavigate } from "react-router-dom";
import SortableTableHeader from "@/components/Tables/SortableHeader";
import usePagination from "@/components/hooks/usePagination";
import PaginationControls from "@/components/pagination/PaginationControls";
import { useSearchParams } from "react-router-dom";
import PopupAlert from "@/components/Popups/PopupAlert";

const RfqTableSent = () => {
  const navigate = useNavigate();

  const {
    togglePopUp: togglePopUpRfq,
    rfqMail,
    rfqMailCheckAll,
    currentPage,
  } = useSelector((state) => state.rfqStore);

  const [resetTrigger, setResetTrigger] = useState(false);
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
  const { togglePopUp: togglePopUpCompany } = useSelector(
    (state) => state.searchProductStore
  );
  const { sentRfqData, receiveRfqData } = useSelector(
    (state) => state.rfqStore
  );

  const { popupCompanyDetail } = useSelector(
    (state) => state.searchProductStore
  );

  const dispatch = useDispatch();

  const token = Cookies.get("token");

  const { rfqArchiveData } = useSelector((state) => state.rfqStore);
  console.log("Archived Data ", rfqArchiveData);

  // Extract pagination details
  const pagination = rfqArchiveData?.pagination || {}; // Assuming pagination is present in sentRfqData
  console.log("Pagination ", pagination);
  const totalPages = pagination.totalPages || 1;
  console.log("TOTAL PAGES ", totalPages);
  const currPage = pagination.currentPage || 1;
  console.log("current page  ", currPage);

  console.log("Data From Page", sentRfqData);

  const sentData = rfqArchiveData.data || [];
  console.log("SENDATA", sentData);

  const [filteredData, setFilteredData] = useState(sentData);

  const applyFilters = (filters) => {
    let filtered = [...sentData];
    console.log("Filters Applied:", filters);

    // Date Filter
    if (filters.fromDate || filters.toDate) {
      const fromDate = filters.fromDate
        ? new Date(filters.fromDate + "T00:00:00")
        : null;
      const toDate = filters.toDate
        ? new Date(filters.toDate + "T23:59:59")
        : null;

      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.updated_at.replace(" ", "T"));
        return (
          (!fromDate || itemDate >= fromDate) && (!toDate || itemDate <= toDate)
        );
      });
    }

    // Subject Filter
    if (filters.subject) {
      filtered = filtered.filter((item) =>
        (item.subject || "")
          .toLowerCase()
          .includes(filters.subject.toLowerCase())
      );
    }

    // Sender (To) Information Filter
    if (filters.firstName) {
      filtered = filtered.filter((item) => {
        const recipientInfo = item.to
          ?.map(
            (recipient) =>
              `${recipient.firstName || ""} ${recipient.lastName || ""} ${
                recipient.email || ""
              } ${recipient.company?.name || ""}`
          )
          .join(" ");
        return recipientInfo
          ?.toLowerCase()
          .includes(filters.firstName.toLowerCase());
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

  console.log("Sent Data Received", sentData);

  useEffect(() => {
    // Fetch data and ensure pagination details are retrieved
    dispatch(getRfqArchived({ token, page: currPage }))
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
  }, [dispatch, token, currPage]);

  useEffect(() => {
    dispatch(receivedRfq({ token }));
    dispatch(sentRfq({ token }));
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
  console.log("CURRENT ITEMS", currentItems);

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
      showPopup("warning", "Please select at least one RFQ to reply.");

      return;
    }

    navigate("/rfq/create", { state: { selectedRfqs: rfqMail } }); // Pass all selected RFQs
  };

  const handleDelete = () => {
    if (rfqMail.length === 0) {
      showPopup("warning", "Please select at least one RFQ to delete.");
      return;
    }

    const rfqIdsToDelete = rfqMail.map((rfq) => rfq.rfqId); // Collect RFQ IDs
    const token = Cookies.get("token"); // Get token

    const result = dispatch(deleteArchiveRfq({ token, ids: rfqIdsToDelete }))
      .unwrap()
      .then(() => {
        console.log("Delete RFQ result: ", result);

        console.log("Selected RGQs Deleted");
        showPopup("success", "Selected RFQs deleted successfully!");
        dispatch(getRfqArchived({ token, page: currPage })); // Refresh the data
      })
      .catch((error) => {
        console.error("Error deleting RFQs:", error);
        showPopup("error", "Failed to delete RFQs. Please try again.");
      });
  };

  const handleForward = () => {
    if (rfqMail.length === 0) {
      showPopup("warning", "Please select at least one RFQ to forward.");
      return;
    }

    const selectedRfqs = rfqMail.map((rfq) => ({
      id: rfq.id, // Ensure you are mapping `id` properly from sent RFQs
      ...rfq,
    }));

    navigate("/rfq/create", { state: { selectedRfqs, type: "forward" } });
  };

  console.log("rfqMail ", rfqMail);

  const userId = Cookies.get("user_id");
  console.log("UserID", userId);

  const restoreRfq = async (rfq) => {
    const token = Cookies.get("token");
    const payload = rfqMail.map((rfq) => ({
      rfq_id: rfq.rfqId,
      status: 0,
      user_id: userId,
    }));
    console.log("Payload", payload);

    try {
      await dispatch(rfqArchive({ token, data: payload }));
      showPopup("success", "RFQ restored successfully!");
      window.location.reload(); // Reload the page to reflect changes
    } catch (err) {
      console.error(err);
      showPopup("error", "Failed to restore RFQ.");
    }
  };

  // QUERY PARAMS LOGIC
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const pageParam = Number(searchParams.get("page"));
    const sortByParam = searchParams.get("sort");
    const sortOrderParam = searchParams.get("order");

    const hasParams = searchParams.has("page") || searchParams.has("sort");

    if (hasParams) {
      // Reset the URL silently
      setSearchParams({}); // removes ?page & ?sort

      // Reset local state
      setSortBy("");
      setSortOrder("asc");
      setIsSorted(false);

      // Fetch fresh unfiltered, unsorted data (page 1)
      dispatch(rfqArchive({ token, page: currPage }));
    } else {
      // No URL params — normal behavior
      dispatch(rfqArchive({ token, page: currPage }));
    }
  }, [token]);

  // PAGINATION LOGIC And
  // SORTING LOGIC

  const rfqHeaders = [
    {
      key: "status",
      label: (
        <span>
          <input
            type="checkbox"
            onChange={handleCheckboxClickAll}
            checked={rfqMailCheckAll}
          />
          status
        </span>
      ),
      sortable: false,
    },
    { key: "qty", label: "Qty", sortable: false },
    { key: "parts", label: "Parts", sortable: false },
    { key: "subject", label: "PO subject", sortable: true },
    { key: "from", label: "From", sortable: true },
    { key: "company", label: "Company", sortable: true },
    { key: "date", label: "Date", sortable: true },
  ];

  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isSorted, setIsSorted] = useState(false);
  const handleSort = (columnKey) => {
    const newSortOrder =
      sortBy === columnKey && sortOrder === "asc" ? "desc" : "asc";

    setSortBy(columnKey);
    setSortOrder(newSortOrder);
    setIsSorted(true);

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("sort", columnKey);
      params.set("order", newSortOrder);
      params.set("page", "1"); // reset to first page on sort
      return params;
    });

    dispatch(
      getSortRfqArchived({
        token,
        sortBy: columnKey,
        sortOrder: newSortOrder,
        page: currPage,
      })
    );
  };

  const {
    curr_Page,
    visiblePages,
    handlePageChange,
    handlePrevious,
    handleNext,
  } = usePagination({
    token,
    totalPages,
    fetchAction: getRfqArchived,
    fetchSortedAction: getSortRfqArchived,
    isSorted,
    sortBy,
    sortOrder,
  });

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
                    className={({ isActive }) =>
                      isActive ? myProfile.active : ""
                    }
                  >
                    <span>
                      Received({receiveRfqData.totalCount}/
                      {receiveRfqData.unreadCount})
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/rfqSent"
                    className={({ isActive }) =>
                      isActive ? myProfile.active : ""
                    }
                  >
                    <span>Sent ({sentRfqData?.totalCount})</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/rfq/create"
                    className={({ isActive }) =>
                      isActive ? myProfile.active : ""
                    }
                  >
                    <span>New</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/rfqArchived"
                    className={({ isActive }) =>
                      isActive ? myProfile.active : ""
                    }
                  >
                    <span onClick={() => window.location.reload(200)}>
                      Archive
                    </span>
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
                <SortableTableHeader
                  headers={rfqHeaders}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
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
                          onChange={(event) =>
                            handleCheckboxClick(event, e.rfqId)
                          } // Correctly handle checkbox clicks
                          checked={rfqMail.some(
                            (mail) => mail.rfqId === e.rfqId
                          )} // Check if this item is selected
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
                      <td>
                        {e.from.firstName} {e.from.lastName}
                      </td>
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
                <SortableTableHeader
                  headers={rfqHeaders}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
              </table>
            </div>
            <div className={css.rfqTableBtn_bottom}>
              <div>
                <NavLink to={"/rfq/create"}>
                  <button type="button">send</button>
                </NavLink>
                <button type="button" onClick={resetFilters}>
                  reset
                </button>

                <button type="button" onClick={handleReply}>
                  reply
                </button>
                <button type="button" onClick={handleForward}>
                  forward
                </button>
                <button type="button" onClick={restoreRfq}>
                  Restore
                </button>
                <button type="button" onClick={handleDelete}>
                  Delete
                </button>
              </div>

              {/* PAGINATION CONTROLS */}
              <div className={css.pagination}>
                <span className="text-orange-700 p-2 text-xl">
                  Page <span className="text-blue-800">{currPage}</span> of
                  <span className="text-blue-800"> {totalPages}</span>
                </span>
                <PaginationControls
                  currPage={curr_Page}
                  totalPages={totalPages}
                  visiblePages={visiblePages}
                  onPageChange={(page) => handlePageChange(page, dispatch)}
                  onPrev={() => handlePrevious(dispatch)}
                  onNext={() => handleNext(dispatch)}
                />
              </div>
            </div>
          </div>
        </div>
        <PopupAlert
          show={popup.show}
          type={popup.type}
          message={popup.message}
          onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
        />
      </div>
      {togglePopUpRfq && <RfqTablePopUp type="sent" />}
      {togglePopUpCompany && (
        <CompanyDetails closeModal={() => dispatch(setTogglePopUpCompany())} />
      )}
    </>
  );
};

export default memo(RfqTableSent);

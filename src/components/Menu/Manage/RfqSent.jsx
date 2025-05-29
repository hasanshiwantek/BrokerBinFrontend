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
  receivedRfq,
  deleteArchiveRfq,
  sentSortRfq,
} from "../../../ReduxStore/RfqSlice.js";
import { IoMail, IoMailOpen } from "react-icons/io5";
import { sentRfq } from "../../../ReduxStore/RfqSlice.js";
import Cookies from "js-cookie";
import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
import { NavLink } from "react-router-dom";
import { setPopupCompanyDetail } from "../../../ReduxStore/SearchProductSlice.js";
import CompanyDetails from "../../Popups/CompanyDetails/CompanyDetails.jsx";
import { statusRfq } from "../../../ReduxStore/RfqSlice.js";
import { setTogglePopUp as setTogglePopUpCompany } from "../../../ReduxStore/SearchProductSlice";
import { useNavigate } from "react-router-dom";
import SortableTableHeader from "@/components/Tables/SortableHeader";
import usePagination from "@/components/hooks/usePagination";
import PaginationControls from "@/components/pagination/PaginationControls";
import { useSearchParams } from "react-router-dom";

const RfqTableSent = () => {
  const navigate = useNavigate();

  const {
    togglePopUp: togglePopUpRfq,
    rfqMail,
    rfqMailCheckAll,
    currentPage,
  } = useSelector((state) => state.rfqStore);

  const [resetTrigger, setResetTrigger] = useState(false);
  const [readRfqs, setReadRfqs] = useState(new Set());

  const { togglePopUp: togglePopUpCompany } = useSelector(
    (state) => state.searchProductStore
  );

  const { popupCompanyDetail } = useSelector(
    (state) => state.searchProductStore
  );

  const dispatch = useDispatch();

  const token = Cookies.get("token");

  const { sentRfqData, receiveRfqData } = useSelector(
    (state) => state.rfqStore
  );
  console.log("SentData From Frontend", sentRfqData);

  const sentData = sentRfqData.data || [];
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
        if (filters.forward && String(item.isForwarded) !== "1") return false; // Forward filter
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

  console.log("Sent Data Received", sentData);

  // Extract pagination details
  const pagination = sentRfqData?.pagination || {}; // Assuming pagination is present in sentRfqData
  console.log("Pagination ", pagination);
  const totalPages = pagination.totalPages || 1;
  console.log("TOTAL PAGES ", totalPages);
  const currPage = pagination.currentPage || 1;
  console.log("current page  ", currPage);

  useEffect(() => {
    // Fetch data and ensure pagination details are retrieved
    dispatch(sentRfq({ token, page: currPage }))
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

    // Fetch received RFQ data if not already present
    if (!receiveRfqData?.totalCount) {
      dispatch(receivedRfq({ token }));
    }
  }, [dispatch, token, currPage]);

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

  // const prevPage = () => {
  //     if (currentPage === 1) {
  //         return;
  //     }
  //     dispatch(setCurrentPagePrev());
  // };

  // const nextPage = () => {
  //     if (currentPage === Math.ceil(tableData.length / itemsPerPage)) {
  //         return;
  //     }
  //     dispatch(setCurrentPageNext());
  // };

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

  const handleShowPopupRfq = async (event, { id }) => {
    event.stopPropagation();

    console.log("ID Passed:", id);
    console.log("Current ITEMS Available:", currentItems);

    const filteredData = currentItems.filter((item) => item.id == id); // Use == for loose comparison
    console.log("Filtered Data:", filteredData); // Should now show the filtered result
    dispatch(setTogglePopUpRfq());
    dispatch(setRfqPopBoxInfo(filteredData));
    // 💾 Update local read status
    if (id) {
      setReadRfqs((prev) => new Set(prev).add(id));
    }

    // 📡 Mark it as read via API
    try {
      const payload = {
        items: [{ id: id, isRead: 1 }],
      };
      const token = Cookies.get("token");
      await dispatch(statusRfq({ token, data: payload })).unwrap();
      console.log("Marked as read via API");
    } catch (error) {
      console.error("Failed to mark RFQ as read:", error);
    }
  };

  const handleCheckboxClick = (event, id) => {
    event.stopPropagation(); // Prevent the event from propagating to the row click event
    if (event.target.checked) {
      const mails = filteredData.filter((m) => m.id === id);
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

  const resetFilters = () => {
    setFilteredData(sentData);
    setResetTrigger((prev) => !prev);
    console.log("Filters Reset. Data Reset to Original:", sentData);
  };

  // const handleReply = () => {
  //     if (rfqMail.length === 0) {
  //         alert("Please select at least one RFQ to reply.");
  //         return;
  //     }

  //     navigate("/rfq/create", { state: { selectedRfqs: rfqMail } }); // Pass all selected RFQs
  // };

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

  const handleDelete = () => {
    if (rfqMail.length === 0) {
      alert("Please select at least one RFQ to delete.");
      return;
    }

    const rfqIdsToDelete = rfqMail.map((rfq) => rfq.id); // Collect RFQ IDs
    console.log("RFQS IDS ", rfqIdsToDelete);

    dispatch(deleteArchiveRfq({ token, ids: rfqIdsToDelete }))
      .then(() => {
        console.log("Selected RGQs Deleted");
        alert("Selected RFQs deleted successfully!");
        dispatch(sentRfq({ token, page: currPage })); // Refresh the data
      })
      .catch((error) => {
        console.error("Error deleting RFQs:", error);
        alert("Failed to delete RFQs. Please try again.");
      });
  };

  console.log("rfqMail:", rfqMail);

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
      dispatch(sentRfq({ token, page: currPage }));
    } else {
      // No URL params — normal behavior
      dispatch(sentRfq({ token, page: currPage }));
    }
  }, [token]);

  // SORTING FUNCTION LOGIC

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
    { key: "to", label: "To", sortable: false },
    { key: "company", label: "Company", sortable: false },
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
      sentSortRfq({
        token,
        sortBy: columnKey,
        sortOrder: newSortOrder,
        page: currPage,
      })
    );
  };

  // PAGINATION  LOGIC

  const {
    curr_Page,
    visiblePages,
    handlePageChange,
    handlePrevious,
    handleNext,
  } = usePagination({
    token,
    totalPages,
    fetchAction: sentRfq,
    fetchSortedAction: sentSortRfq,
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
                    <span onClick={() => window.location.reload(200)}>
                      Sent({sentRfqData.totalCount})
                    </span>
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
                <SortableTableHeader
                  headers={rfqHeaders}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <tbody>
                  {(filteredData || []).map((e) => (
                    <tr
                      className={`${css.tableData} ${
                        e.isRead === 1 || readRfqs.has(e.id) ? "" : css.unread
                      }`}
                      key={e.id}
                      onClick={(event) => {
                        console.log("Row Clicked");
                        handleShowPopupRfq(event, e);
                      }}
                    >
                      <td>
                        <input
                          type="checkbox"
                          name="addToCart"
                          id="addToCart"
                          onClick={(event) => event.stopPropagation()}
                          onChange={(event) => {
                            console.log("Checkbox Clicked for ID:", e.id);
                            handleCheckboxClick(event, e.id);
                          }}
                          checked={
                            rfqMail.some((mail) => mail.id === e.id) ||
                            rfqMailCheckAll
                          }
                        />
                        <span>(0|1)</span>

                        {/* Dynamic image based on isRead */}
                        {e.isRead === 1 || readRfqs.has(e.id) ? (
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
                        {e.quantities?.reduce(
                          (total, quantity) => total + Number(quantity),
                          0
                        )}
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
                      <td>{e.subject}</td>
                      <td>
                        {e.to?.length > 1 ? (
                          <>
                            <span>{e.to.length} Recipients</span>
                            <div className={css.companyDropdown}>
                              {e.to.map((recipient, index) => (
                                <div key={index} className={css.companyItem}>
                                  {recipient.firstName} {recipient.lastName}
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <span>
                            {e.to[0]?.firstName} {e.to[0]?.lastName}
                          </span>
                        )}
                      </td>
                      <td>
                        {e.to?.length > 1 ? (
                          <>
                            <span>{e.to.length} Companies</span>
                            <div className={`${css.companyDropdown} `}>
                              {e.to.map((recipient, index) => (
                                <div
                                  key={index}
                                  className={css.companyItem}
                                  onClick={() =>
                                    openCompanyModal(recipient.company)
                                  }
                                >
                                  {recipient.company?.name}
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <span
                            onClick={() => openCompanyModal(e.to[0]?.company)}
                          >
                            {e.to[0]?.company.name}
                          </span>
                        )}
                      </td>

                      <td>{e.updated_at}</td>
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

                <button type="button" onClick={handleForward}>
                  forward
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
      </div>
      {togglePopUpRfq && <RfqTablePopUp type="sent" />}
      {togglePopUpCompany && (
        <CompanyDetails closeModal={() => dispatch(setTogglePopUpCompany())} />
      )}
    </>
  );
};

export default memo(RfqTableSent);

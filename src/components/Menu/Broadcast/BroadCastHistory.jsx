import React, { useEffect, useState } from "react";
import css from "../../../styles/Menu/Manage/BroadcastFilters/BroadCastHistory.module.css";
import { Link, NavLink } from "react-router-dom";
import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import {
  fetchBroadCastData,
  deleteBroadCastData,
  fetchBroadCastSortedData,
} from "../../../ReduxStore/BroadCast";
import { FaFileAlt } from "react-icons/fa";
import BroadcastFileModal from "./Send/Field Components/BroadcastFileModal";
import bullImage from "../../../assets/bullhornn.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SortableTableHeader from "@/components/Tables/SortableHeader";
import { Tooltip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const BroadCastHistory = () => {
  const broadcastItems = useSelector(
    (state) => state.broadcastStore.broadCastData
  );
  const loggedInUserId = Cookies.get("user_id");
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const urlType = searchParams.get("type");
  const [selectedType, setSelectedType] = useState("all");
  const [inputSearchTerm, setInputSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBroadcasts, setSelectedBroadcasts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const token = Cookies.get("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newselectedBroadcast, newsetSelectedBroadcast] = useState(null);
  const [selectedBroadcast, setSelectedBroadcast] = useState({});

  useEffect(() => {
    setLoading(true);
    dispatch(fetchBroadCastData({ token }))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, token]);

  const userBroadcasts = broadcastItems.broadcasts?.filter(
    (item) => item.user_id.id.toString() === loggedInUserId.toString()
  );

  const filteredBroadcasts = userBroadcasts
    ?.filter(
      (item) =>
        selectedType === "all" || item.type === selectedType.toLowerCase()
    )
    .filter(
      (item) =>
        searchTerm === "" ||
        item.partModel?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    setSearchTerm(inputSearchTerm.trim());
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedBroadcasts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteClick = () => {
    if (selectedBroadcasts.length > 0) {
      dispatch(deleteBroadCastData({ token, ids: selectedBroadcasts })).then(
        () => {
          dispatch(fetchBroadCastData({ token }));
        }
      );
      setSelectedBroadcasts([]); // Clear selections after dispatch
      // ✅ Show success toast with light blue color
      toast.info("Broadcast Deleted Successfully!", {
        style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" }, //
      });
    } else {
      toast.warning("Select broadcast for Deletion", {
        style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" }, //
      });
    }
  };

  const openModal = (broadcast) => {
    newsetSelectedBroadcast(broadcast);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    newsetSelectedBroadcast(null);
  };
  const handleReplyClick = () => {
    const selectedBroadcastIds = Object.keys(selectedBroadcast).filter(
      (id) => selectedBroadcast[id]
    );

    if (selectedBroadcastIds.length === 0) {
      alert("Please select a broadcast to reply to.");
      return;
    }

    if (selectedBroadcastIds.length > 1) {
      alert("You can only reply to one broadcast at a time.");
      return;
    }

    // If only one broadcast is selected, proceed with navigation
    const selected = filteredBroadcasts.find(
      (item) => item.id === parseInt(selectedBroadcastIds[0])
    );
    navigate("/ReplyBroad", { state: { broadcast: selected } });
  };

  const handleFileDownload = (file) => {
    if (!file) {
      alert("No file available for download.");
      return;
    }

    // Create a new anchor element dynamically
    const anchor = document.createElement("a");
    anchor.href = file; // Set href to the file URL
    anchor.download = file.split("/").pop(); // Suggests a filename to save as, extracting from URL
    document.body.appendChild(anchor); // Append to body
    anchor.click(); // Programmatically click the anchor to trigger download
    document.body.removeChild(anchor); // Clean up and remove the anchor
  };

  useEffect(() => {
    if (urlType) {
      setSelectedType(urlType);
    }
  }, [urlType]);

  console.log("Broadcast History: ", filteredBroadcasts);

  // SORTING LOGIC

  const headers = [
    { key: "cart", label: "Cart", sortable: false },
    { key: "posted", label: "Posted", sortable: false },
    { key: "type", label: "Type", sortable: true },
    { key: "view", label: "View", sortable: false },
    { key: "partModel", label: "Part / Model", sortable: true },
    { key: "heciClei", label: "HECI / CLEI", sortable: true },
    { key: "mfg", label: "Mfg", sortable: true },
    { key: "price", label: "Price", sortable: true },
    { key: "quantity", label: "Quantity", sortable: true },
    { key: "description", label: "Product Description", sortable: true },
  ];

  const [isSorted, setIsSorted] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [pageNumber, setPageNumber] = useState(1);

  const handleSort = (columnKey) => {
    const newSortOrder =
      sortBy === columnKey && sortOrder === "asc" ? "desc" : "asc";

    setSortBy(columnKey);
    setSortOrder(newSortOrder);
    setIsSorted(true);

    dispatch(
      fetchBroadCastSortedData({
        token,
        sortBy: columnKey,
        sortOrder: newSortOrder,
        pageNumber: 1,
      })
    );
  };

  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "1.15rem",
            textAlign: "center",
            backgroundColor: "white",
            color: "black",
            whiteSpace: "nowrap",
            maxWidth: "unset",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
          },
          arrow: {
            color: "white",
          },
        },
      },
    },
  });

  return (
    <div>
      <div className={`${css.container}`}>
        {/* Tabs */}
        <div className={`${myProfile.profileInfo_links}`}>
          <ul>
            <li>
              <NavLink
                to="/sendbroad"
                end
                className={({ isActive }) => (isActive ? myProfile.active : "")}
              >
                <span>Send</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/broadcasts"
                className={({ isActive }) => (isActive ? myProfile.active : "")}
              >
                <span>View</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/myprofile/broadcastfilter"
                className={({ isActive }) => (isActive ? myProfile.active : "")}
              >
                <span>Set Filters</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/broadcasthistory"
                className={({ isActive }) => (isActive ? myProfile.active : "")}
                onClick={() => window.location.reload(200)}
              >
                <span>History</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Table Section */}
        <div className={css.tableWrapper}>
          <div className={css.tableHeader}>
            <div>
              <Link className={css.tabTitle} to={"/broadcasts"}>
                Broadcast
              </Link>
            </div>

            {/* Filter by Type Dropdown */}
            <div className={css.manufacturerDropdown}>
              <span> View:&nbsp;</span>
              <select onChange={handleTypeChange} value={selectedType}>
                <option value="all">All Broadcasts</option>
                <option value="WTB">WTB</option>
                <option value="WTS">WTS</option>
                <option value="RFQ">RFQ</option>
              </select>
            </div>

            {/* Part Search */}
            <div className={css.searchBroadcastSec}>
              <input
                type="text"
                placeholder="Search Broadcasts"
                value={inputSearchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleSearchClick}>Search</button>
            </div>
          </div>

          {/* Table */}
          <table className={css.table}>
            <SortableTableHeader
              headers={headers}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
            />
            <tbody>
              {loading ? (
                <tr>
                  <td>
                    <strong colSpan="9">Loading broadcasts...</strong>
                  </td>
                </tr>
              ) : filteredBroadcasts && filteredBroadcasts.length > 0 ? (
                filteredBroadcasts.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedBroadcasts.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </td>
                    <td>
                      {new Date(
                        item.created_at.replace(" ", "T")
                      ).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </td>
                    <td
                      className={
                        item.type === "wtb"
                          ? css["type-wtb"]
                          : item.type === "wts"
                          ? css["type-wts"]
                          : item.type === "rfq"
                          ? css["type-rfq"]
                          : ""
                      }
                    >
                      {item.type}
                    </td>

                    {/* <td>---</td> */}

                    <td className="flex">
                      <img
                        src={bullImage}
                        alt=""
                        onClick={() => openModal(item)}
                        style={{ width: "18px", fontWeight: "bold" }}
                      />
                      {item.file && (
                        <div className={css.tooltipWrapper}>
                          <FaFileAlt
                            onClick={() => handleFileDownload(item.file)}
                            style={{ cursor: "pointer", marginLeft: "8px" }}
                            className={css.fileIcon}
                          />
                          <span className={css.tooltip}>Download File</span>
                        </div>
                      )}
                    </td>

                    <td>{item.partModel}</td>
                    <td>{item.heciClei}</td>
                    <td>{item.mfg}</td>
                    <td style={{ color: "blue" }}>{item.price}</td>
                    <td>{item.quantity}</td>
                    <ThemeProvider theme={theme}>
                      <Tooltip
                        title={item?.description || ""}
                        arrow
                        placement="top"
                      >
                        <td>{item?.description?.slice(0, 100)}...</td>
                      </Tooltip>
                    </ThemeProvider>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="!text-center  !text-red-500">
                    No broadcasts found.
                  </td>
                </tr>
              )}
            </tbody>
            <SortableTableHeader
              headers={headers}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
            />
          </table>

          {/* Action Buttons */}
          <div className={css.actionButtons}>
            <button className={css.deleteButton} onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
        </div>
      </div>

      <BroadcastFileModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        broadcast={newselectedBroadcast}
        handleReply={handleReplyClick}
      />
      <ToastContainer position="top-center" autoClose={1000} />
    </div>
  );
};

export default BroadCastHistory;

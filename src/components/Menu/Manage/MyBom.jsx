import React, { useState, useEffect } from "react";
import css from "../../../styles/SearchProducts.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "../../../styles/Menu/Manage/MyProfile.module.css";
import Cookies from "js-cookie";
import axios from "axios";
import { brokerAPI } from "@/components/api/BrokerEndpoint";
import ListDetailModal from "@/components/partCart/ListDetailModal";
import SavedListExportModal from "@/components/partCart/SavedListExportModal";
import useDefaultSettings from "@/components/hooks/UseDefaultSettings";
import PopupAlert from "@/components/Popups/PopupAlert";

const SavedList = () => {
  const { togglePopUp } = useSelector((store) => store.searchProductStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [selectedRowId, setSelectedRowId] = useState(null);
  console.log("Selected Row id: ", selectedRowId);

  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [savedLists, setSavedLists] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [activeList, setActiveList] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { fontSize } = useDefaultSettings();
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
  const { blurWhileLoading, initialData, user, optionFormData } = useSelector(
    (state) => state.profileStore
  );

  console.log("USER", user, "initialData", initialData);
  console.log("Saved Lists: ", savedLists);

  const fetchSavedLists = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${brokerAPI}part-cart/get-list`, {
        params: {
          name: searchInput,
          sortBy,
          sortOrder,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSavedLists(response.data.data);
    } catch (err) {
      console.error("Failed to fetch saved lists:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedLists();
  }, [searchInput, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleDeleteList = async () => {
    if (!selectedRowId) {
      showPopup("warning", "Please select a list to delete.");
      return;
    }
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this saved list?"
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(
        `${brokerAPI}part-cart/delete-partlist/${selectedRowId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showPopup("success", "List deleted successfully.");

      setSelectedRowId(null);
      setTimeout(() => [fetchSavedLists()], 2000);
    } catch (error) {
      console.error("❌ Failed to delete list:", error);
      showPopup("error", "Failed to delete the list.Please Try Again.");
    }
  };

  const handlePdfExport = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${brokerAPI}part-cart/download-saved-partlist-pdf`,
        {
          params: { list_id: selectedRowId }, // assuming list_id is expected
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      window.open(url); // open PDF in new tab
    } catch (error) {
      console.error("❌ PDF export failed:", error);
      alert("Failed to export PDF.");
    } finally {
      setLoading(false);
    }
  };

  const updateDueDate = async ({ due_date, listId }) => {
    try {
      console.log("LISTID", listId);
      const res = await axios.post(
        `${brokerAPI}part-cart/update-duedate/${listId}`,
        { due_date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showPopup("success", "Date edit successfully");

      fetchSavedLists();
      // window.location.reload();
    } catch (error) {
      console.error("❌ Failed to delete list:", error);

      showPopup("error", "Failed to delete the list.Please Try Again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        <span className="ml-4 text-blue-600 text-lg font-medium"></span>
      </div>
    );
  }

  return (
    <div className="justify-center flex">
      <div
        className={`${css.productTableDetail} m-24 w-[70vw] !bg-[#e8e8e8] rounded-lg !p-[6px]`}
      >
        <div className={styles.profileInfo_links}>
          <ul>
            <li>
              <NavLink
                to="/cartpart"
                end
                className={({ isActive }) =>
                  isActive ? styles.active : "text-gray-500"
                }
              >
                <span>Part Cart / BOM Utility</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/bomarchive/list"
                end
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <span>Saved List(s)</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className={` ${css.tableContainer} !bg-[#bfbfbf]`}>
          <div className="flex justify-between items-center px-2 py-0 bg-[#bfbfbf]">
            <h3 className="text-2xl text-white">Saved List(s)</h3>
            <div className="flex items-center gap-2">
              <label className="text-white text-base font-semibold">
                Name Search:
              </label>
              <input
                type="text"
                placeholder=""
                className="p-2 rounded-sm text-md"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSearchInput(e.target.value);
                  }
                }}
              />
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th></th>
                <th onClick={() => handleSort("name")}>Name</th>
                <th onClick={() => handleSort("date")}>Date</th>
                <th onClick={() => handleSort("po_in_hand")}>PO in Hand</th>
                <th onClick={() => handleSort("oem_quote")}>OEM Quote</th>
                <th onClick={() => handleSort("due_date")}>Due Date</th>
                {/* <th>Items</th> */}
                <th>Total Parts</th>
              </tr>
            </thead>
            <tbody>
              {savedLists?.length > 0 ? (
                savedLists?.map((list, id) => (
                  <tr
                    key={id}
                    className="!whitespace-normal"
                    style={{
                      backgroundColor: id % 2 === 0 ? "#f5f5f5" : "#ffff",
                    }}
                  >
                    <td>
                      <input
                        type="radio"
                        name="savedListRadio"
                        checked={selectedRowId === list.listId}
                        onChange={() => setSelectedRowId(list.listId)}
                      />
                    </td>
                    <td>
                      <a
                        onClick={() => setActiveList(list)}
                        className="!text-[#444] "
                      >
                        {list.name}
                      </a>
                    </td>
                    <td>{list?.created_at || ""}</td>
                    <td>{list?.po_in_hand ? "Yes" : "No"}</td>
                    <td>{list?.oem_quote ? "Yes" : "No"}</td>
                    <td onClick={() => setSelectedRowId(list.listId)}>
                      {selectedRowId === list.listId ? (
                        <input
                          type="date"
                          min={
                            new Date(Date.now() + 86400000)
                              .toISOString()
                              .split("T")[0]
                          }
                          defaultValue={list.due_date}
                          onBlur={(e) => {
                            const newDate = e.target.value;
                            if (newDate && newDate !== list.due_date) {
                              updateDueDate({
                                due_date: newDate,
                                listId: list.listId,
                              });
                            }
                          }}
                          // autoFocus
                        />
                      ) : (
                        list?.due_date || "—"
                      )}
                    </td>
                    <td>{list?.parts?.length}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="15" className="!bg-[#ffff]">
                    <h2 className="!text-red-700 !text-lg !text-center !font-bold">
                      No Result Found
                    </h2>
                  </td>
                </tr>
              )}
            </tbody>
            <thead>
              <tr>
                <th></th>
                <th onClick={() => handleSort("name")}>Name</th>
                <th onClick={() => handleSort("date")}>Date</th>
                <th onClick={() => handleSort("po_in_hand")}>PO in Hand</th>
                <th onClick={() => handleSort("oem_quote")}>OEM Quote</th>
                <th onClick={() => handleSort("due_date")}>Due Date</th>
                {/* <th>Items</th> */}
                <th>Total Parts</th>
              </tr>
            </thead>
          </table>
          {/* Pagination Controls */}
          <div className=" flex items-center gap-2">
            <button
              type="button"
              onClick={handleDeleteList}
              className="!text-[0.98vw] !flex !justify-start !gap-8 !py-[0.6rem] !px-4 !bg-blue-500 !text-white !capitalize"
            >
              Delete List
            </button>
            <button
              type="button"
              onClick={handlePdfExport}
              className="!text-[0.98vw] !flex !justify-start !gap-8 !py-[0.6rem] !px-4 !bg-blue-500 !text-white !capitalize"
            >
              PDF
            </button>
            <button
              type="button"
              onClick={() => setShowExportModal(true)}
              className="!text-[0.98vw] !flex !justify-start !gap-8 !py-[0.6rem] !px-4 !bg-blue-500 !text-white !capitalize"
            >
              Export List
            </button>
          </div>
        </div>
      </div>
      {activeList && (
        <ListDetailModal
          list={activeList}
          onClose={() => setActiveList(null)}
        />
      )}
      {showExportModal && (
        <SavedListExportModal
          savedLists={savedLists}
          selectedRowId={selectedRowId}
          onClose={() => setShowExportModal(false)}
        />
      )}
      <PopupAlert
        show={popup.show}
        type={popup.type}
        message={popup.message}
        onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
};

export default SavedList;

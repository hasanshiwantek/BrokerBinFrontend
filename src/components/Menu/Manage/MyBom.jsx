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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const SavedList = () => {
  const { togglePopUp } = useSelector((store) => store.searchProductStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [savedLists, setSavedLists] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [activeList, setActiveList] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [loading, setLoading] = useState(false);

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
      toast.warning("Please select a list to delete.", {
        style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" },
      });
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
      toast.info("List deleted successfully.", {
        style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" },
      });
      setSelectedRowId(null);
      setTimeout(() => [fetchSavedLists()], 2000);
    } catch (error) {
      console.error("❌ Failed to delete list:", error);
      toast.error("Failed to delete the list.Please Try Again.", {
        style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" },
      });
    }
  };

  const handlePdfExport = async () => {
    if (!selectedRowId) {
      toast.warning("No list selected to export.", {
        style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" },
      });
      return;
    }
    // setLoading(true);
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

        <div className={`${css.tableContainer} !bg-[#bfbfbf]`}>
          <div className="flex justify-between items-center px-2 py-0 bg-[#bfbfbf]">
            <h3 className="text-2xl text-white">Saved List(s)</h3>
            <div className="flex items-center gap-2">
              <label className="text-white text-sm font-semibold">
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
                <th>%</th>
                <th onClick={() => handleSort("name")}>Name</th>
                <th onClick={() => handleSort("date")}>Date</th>
                <th onClick={() => handleSort("po_in_hand")}>PO in Hand</th>
                <th onClick={() => handleSort("oem_quote")}>OEM Quote</th>
                <th onClick={() => handleSort("due_date")}>Due Date</th>
                <th>Items</th>
                <th>Total Parts</th>
              </tr>
            </thead>
            <tbody>
              {savedLists?.length > 0 ? (
                savedLists.map((list) => (
                  <tr key={list.list_id} className="!whitespace-normal">
                    <td>
                      <input
                        type="radio"
                        name="savedListRadio"
                        checked={selectedRowId === list.list_id}
                        onChange={() => setSelectedRowId(list.list_id)}
                      />
                    </td>
                    <td></td>
                    <td>
                      <a
                        onClick={() => setActiveList(list)}
                        className="!text-[#444] !text-[8pt]"
                      >
                        {list.name}
                      </a>
                    </td>
                    <td>{list.created_at || ""}</td>
                    <td>{list.po_in_hand ? "Yes" : "No"}</td>
                    <td>{list.oem_quote ? "Yes" : "No"}</td>
                    <td>{list.due_date}</td>
                    <td>{list.parts?.filteredQty || ""}</td>
                    <td>{list.parts.length}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="15">
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
                <th>%</th>
                <th onClick={() => handleSort("name")}>Name</th>
                <th onClick={() => handleSort("date")}>Date</th>
                <th onClick={() => handleSort("po_in_hand")}>PO in Hand</th>
                <th onClick={() => handleSort("oem_quote")}>OEM Quote</th>
                <th onClick={() => handleSort("due_date")}>Due Date</th>
                <th>Items</th>
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
              onClick={""}
              className="!text-[0.98vw] !flex !justify-start !gap-8 !py-[0.6rem] !px-4 !bg-blue-500 !text-white !capitalize"
            >
              ReRun BOM
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
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default SavedList;

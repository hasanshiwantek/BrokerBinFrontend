import React, { useEffect, useState } from "react";
import inventory from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import InventoryButtons from "./InventoryButtons";
import {
  getInventoryData,
  getFilterInventories,
  updateInventoryData,
  deleteInventoryData,
  fetchFilterBroadcast,
  getSortedInventoryData,
} from "../../../../ReduxStore/InventorySlice";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { triggerSearchFocus } from "@/ReduxStore/focusSlice";
import SortableTableHeader from "@/components/Tables/SortableHeader";
const EditDelete = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const { inventoryData, filteredInventoryData, fetchFilterBroadcastData } =
    useSelector((state) => state.inventoryStore);
  console.log("Inventory Data from Frontend", inventoryData);
  console.log("Filtered Inventory Data from Frontend", filteredInventoryData);
  console.log(
    "Filtered Broadcast Data from Frontend: ",
    fetchFilterBroadcastData
  );
  const userId = Cookies.get("user_id");
  console.log("LoggedIn User id: ", userId);

  const companyFromInventory = inventoryData?.data?.map(
    (item) => item.addedBy.company.name
  );

  const pagination =
    filteredInventoryData?.pagination || inventoryData?.pagination || {};

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInventories, setSelectedInventories] = useState([]);
  const [selectedType, setSelectedType] = useState("inventory");
  const [filters, setFilters] = useState({
    partModel: "",
    mfg: "",
    status: "",
    heciClei: "",
  });
  const [editedItems, setEditedItems] = useState([]); // Track editable rows
  const [visiblePages, setVisiblePages] = useState([1, 10]); // Start with pages 1 to 10

  useEffect(() => {
    if (["wts", "wtb", "rfq"].includes(selectedType)) {
      dispatch(
        fetchFilterBroadcast({
          token,
          user_id: userId,
          type: selectedType,
          page: currentPage,
          pageSize: 20,
        })
      )
        .unwrap()
        .then((response) => {
          if (response?.data) {
            setEditedItems(response.data); // replace or merge based on your logic
          }
        })
        .catch((err) => {
          console.error("Error fetching broadcast data:", err);
        });
    } else {
      fetchInventoryData(); // fallback for 'inventory'
    }
  }, [selectedType, currentPage]);

  const fetchFilteredBroadcastData = () => {
    setLoading(true);
    if (["wts", "wtb", "rfq"].includes(selectedType)) {
      dispatch(
        fetchFilterBroadcast({
          token,
          user_id: userId,
          type: selectedType,
          page: currentPage,
          pageSize: 20,
        })
      )
        .unwrap()
        .then((response) => {
          setEditedItems(response?.data || []);
        })
        .catch((error) => {
          console.error("Error fetching Filtered Broadcast data:", error);
          alert("Failed to fetch filtered broadcast data. Please try again.");
        })
        .finally(() => setLoading(false));
    }
  };

  // Fetch inventory data (default)
  const fetchInventoryData = () => {
    setLoading(true);

    dispatch(getInventoryData({ token, page: currentPage }))
      .unwrap()
      .then((response) => {
        setEditedItems(response?.data || []);
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
        alert("Failed to fetch inventory data. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  // Build payload with only non-empty filters
  const buildFilterPayload = () => {
    const payload = { token, page: currentPage };

    Object.entries(filters).forEach(([key, value]) => {
      payload[key] = value?.trim() || ""; // Add empty string for undefined or null values
    });

    return payload;
  };

  const fetchFilteredData = () => {
    setLoading(true);
    const payload = buildFilterPayload();
    console.log("Payload", payload);
    dispatch(getFilterInventories(payload))
      .unwrap()
      .then((response) => {
        setEditedItems(response?.inventories || []); // Update the editedItems state
      })
      .catch((error) => {
        console.error("Error fetching filtered inventory data:", error);
        alert("Failed to fetch inventory data. Please try again.");
      })
      .finally(() => setLoading(false));
  };
  console.log("Payload sent to API:", buildFilterPayload());

  useEffect(() => {
    if (
      filters.partModel ||
      filters.mfg ||
      filters.status ||
      filters.heciClei
    ) {
      // Fetch filtered data if any filter is applied
      fetchFilteredData();
    } else {
      fetchInventoryData();
    }
  }, [currentPage]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    // Check if all filters are empty
    if (
      !filters.partModel.trim() &&
      !filters.mfg.trim() &&
      !filters.status.trim() &&
      !filters.heciClei.trim()
    ) {
      // alert("Please apply at least one filter before searching.");
      fetchInventoryData();
      return; // Stop execution if no filters are applied
    }

    // Proceed with search if filters are applied
    setCurrentPage(1);
    fetchFilteredData();
  };

  const handleSaveModifications = () => {
    const dataToSave = {
      inventories: editedItems.map((item) => {
        const baseItem = {
          id: item.id,
          partModel: item.partModel,
          heciClei: item.heciClei,
          mfg: item.mfg,
          cond: item.cond,
          price: item.price,
          quantity: item.quantity,
          status: item.status,
          type: selectedType,
        };

        if (item.description) {
          baseItem.productDescription = item.description;
        } else if (item.productDescription) {
          baseItem.productDescription = item.productDescription;
        }

        return baseItem;
      }),
    };

    console.log("Save Modificationns Payload: ", dataToSave);

    setLoading(true);
    dispatch(updateInventoryData({ token, inventories: dataToSave }))
      .unwrap()
      .then(() => {
        toast.info("Inventory Updated successfully", {
          style: { fontSize: "15px", marginTop: "-10px" }, //
        });
        console.log("Inventory updated successfully");
        // fetchFilteredData();
        // fetchInventoryData();

        selectedType === "inventory"
          ? fetchInventoryData()
          : fetchFilteredBroadcastData();
      })
      .catch((error) => {
        console.error("Error updating inventory:", error);
        alert("Failed to update inventory. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  const handleDeleteClick = () => {
    if (selectedInventories.length > 0) {
      setLoading(true);
      dispatch(
        deleteInventoryData({
          token,
          ids: selectedInventories,
          type: selectedType,
        })
      )
        .unwrap()
        .then(() => {
          // ✅ Show success toast with light blue color
          toast.info("Inventory deleted successfully", {
            style: { fontSize: "15px", marginTop: "-10px" }, //
          });
          setSelectedInventories([]);
          // fetchInventoryData();
          selectedType === "inventory"
            ? fetchInventoryData()
            : fetchFilteredBroadcastData();
        })
        .catch((error) => {
          console.error("Error deleting inventory:", error);
          toast.info("Failed to delete inventory. Please try again.", {
            style: { fontSize: "15px", marginTop: "-10px" }, //
          });
        })
        .finally(() => setLoading(false));
    } else {
      alert("Please select inventory items to delete");
    }
  };

  // Function to update visible pages when reaching the last button in the range
  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);

      // Extend pagination when the user clicks the last button in the current range
      if (page === visiblePages[1] && page !== pagination.totalPages) {
        setVisiblePages([
          visiblePages[1] + 1,
          Math.min(visiblePages[1] + 10, pagination.totalPages),
        ]);
      }

      // Shrink pagination when clicking the first page of the current range
      if (page === visiblePages[0] && page > 1) {
        setVisiblePages([
          Math.max(visiblePages[0] - 10, 1),
          visiblePages[0] - 1,
        ]);
      }
    }
  };
  const handlePrevious = () => {
    if (visiblePages[0] > 1) {
      setVisiblePages([Math.max(visiblePages[0] - 10, 1), visiblePages[0] - 1]);
      setCurrentPage(visiblePages[0] - 1);
    }
  };
  const handleNext = () => {
    if (visiblePages[1] < pagination.totalPages) {
      setVisiblePages([
        visiblePages[1] + 1,
        Math.min(visiblePages[1] + 10, pagination.totalPages),
      ]);
      setCurrentPage(visiblePages[1] + 1);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedInventories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFieldChange = (index, field, value) => {
    const updatedItems = [...editedItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setEditedItems(updatedItems);
  };

  const [showHeciClei, setShowHeciClei] = useState(true);

  // SORTING FUNCTION LOGIC

  // const headers = [
  //   { key: "cart", label: "Cart", sortable: false },
  //   { key: "partModel", label: "Part#", sortable: true },
  //   { key: "heciClei", label: "HECI/CLEI", sortable: true },
  //   { key: "price", label: "Price", sortable: true },
  //   { key: "quantity", label: "Qty", sortable: true },
  //   { key: "status", label: "Status", sortable: true },
  //   { key: "description", label: "Description", sortable: true },
  //   { key: "mfg", label: "Mfg", sortable: true },
  //   { key: "cond", label: "Cond", sortable: true },
  //   { key: "age", label: "Age", sortable: true },
  // ];

  // const filteredHeaders = headers.filter((header) => {
  //   if (header.key === "heciClei" && !showHeciClei) return false;
  //   return true;
  // });

  // const [isSorted, setIsSorted] = useState(false);
  // const [sortBy, setSortBy] = useState("");
  // const [sortOrder, setSortOrder] = useState("asc");

  // const handleSort = (columnKey) => {
  //   const newSortOrder =
  //     sortBy === columnKey && sortOrder === "asc" ? "desc" : "asc";

  //   setSortBy(columnKey);
  //   setSortOrder(newSortOrder);
  //   setIsSorted(true); // triggers useEffect
  //   setCurrentPage(currentPage); // reset to first page
  //   setVisiblePages([1, Math.min(10, pagination.totalPages)]);
  // };

  // // Fetch data when currentPage changes

  // useEffect(() => {
  //   console.log("Fetching data for pageNumber:", currentPage);
  //   setLoading(true);

  //   const action = isSorted
  //     ? getSortedInventoryData({
  //         token,
  //         sortBy,
  //         sortOrder,
  //         page: currentPage,
  //       })
  //     : getInventoryData({ token, page: currentPage });

  //   dispatch(action)
  //     .unwrap()
  //     .then((response) => {
  //       // Put the result into editedItems (this is what you're displaying)
  //       setEditedItems(response?.data || []);
  //     })
  //     .catch((err) => {
  //       console.error("Fetch error:", err);
  //       alert("Failed to fetch data. Please try again.");
  //     })
  //     .finally(() => setLoading(false));
  // }, [dispatch, token, currentPage, sortBy, sortOrder, isSorted]);

  return (
    <div className={`${inventory.inventory} !min-w-fit`}>
      <InventoryButtons />
      <div className={inventory.editDeleteTable}>
        <div className={inventory.editDeleteTable_top}>
          <span>
            <label>View</label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1); // Reset to page 1 on type change
              }}
            >
              <option value="inventory">Inventory</option>
              <option value="wtb">WTB</option>
              <option value="wts">WTS</option>
              <option value="rfq">RFQ</option>
            </select>
          </span>

          <button
            type="button"
            className={`${inventory.editDeleteTable_bottom} cursor-pointer transform active:scale-90 transition-all duration-100 rounded-md !-mt-[1px]`}
            onClick={() => {
              dispatch(triggerSearchFocus());
              setShowHeciClei(!showHeciClei);
            }}
          >
            HECI/CLEI
          </button>

          <span>
            <label>MFG</label>
            <input
              type="text"
              value={filters.mfg}
              onChange={(e) => handleFilterChange("mfg", e.target.value)}
            />
          </span>

          <span>
            <label>Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="all">ALL</option>
              <option value="stock">Stock</option>
              <option value="dist">DIST</option>
              <option value="0">N/A</option>
            </select>
          </span>

          <div className="flex items-center justify-center gap-4">
            <span>
              <label>Part Search</label>
              <input
                type="text"
                value={filters.partModel}
                onChange={(e) =>
                  handleFilterChange("partModel", e.target.value)
                }
              />
            </span>
            <button
              type="button"
              onClick={handleSearch}
              className={`${inventory.editDeleteTable_bottom} cursor-pointer transform active:scale-90 transition-all duration-100 rounded-md !-mt-[1px]`}
            >
              Search
            </button>
          </div>
        </div>
 
        <div>
          <table>
            <thead>
              <tr>
                <th>Cart</th>
                <th>Part#</th>
                {showHeciClei && <th>HECI/CLEI</th>}
                <th>Price</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Description</th>
                <th>Mfg</th>
                <th>Cond</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody className={inventory.tableBodyInputs}>
              {loading ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    Loading inventory data...
                  </td>
                </tr>
              ) : editedItems.length === 0 ? (
                <tr>
                  <td
                    colSpan="10"
                    style={{
                      textAlign: "center",
                      fontSize: "9pt",
                      color: "red",
                    }}
                  >
                    No results found.
                  </td>
                </tr>
              ) : (
                editedItems.map((item, index) => (
                  <tr key={item.id} className={inventory.tableInputData}>
                    <td>
                      <input
                        className="cursor-pointer ml-2"
                        type="checkbox"
                        checked={selectedInventories.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.partModel || ""}
                        onChange={(e) =>
                          handleFieldChange(index, "partModel", e.target.value)
                        }
                      />
                    </td>
                    {showHeciClei && (
                      <td>
                        <input
                          type="text"
                          value={item.heciClei || ""}
                          onChange={(e) =>
                            handleFieldChange(index, "heciClei", e.target.value)
                          }
                        />
                      </td>
                    )}
                    <td>
                      <input
                        type="text"
                        value={item.price || ""}
                        onChange={(e) =>
                          handleFieldChange(index, "price", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity || ""}
                        onChange={(e) =>
                          handleFieldChange(index, "quantity", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <select
                        value={item.status || "stock"}
                        onChange={(e) =>
                          handleFieldChange(index, "status", e.target.value)
                        }
                      >
                        <option value="stock">Stock</option>
                        <option value="dist">DIST</option>
                        <option value="0">N/A</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.productDescription || item.description}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "productDescription",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.mfg || ""}
                        onChange={(e) =>
                          handleFieldChange(index, "mfg", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.cond || ""}
                        onChange={(e) =>
                          handleFieldChange(index, "cond", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input type="text" value={item.age} readOnly />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center p-1">
          <div className={inventory.editDeleteTable_bottom}>
            <button
              type="button"
              onClick={handleDeleteClick}
              className="transform active:scale-90 transition-all duration-100"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={handleSaveModifications}
              className="transform active:scale-90 transition-all duration-100"
              disabled={loading}
            >
              {loading ? "Processing..." : "Save Modifications"}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                window.location.reload();
              }}
              className="transform active:scale-90 transition-all duration-100"
            >
              Refresh
            </button>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center p-1">
            <div className={inventory.pagination}>
              <span className="text-orange-700 p-4 text-xl">
                Page <span className="text-blue-800">{currentPage}</span> of
                <span className="text-blue-800"> {pagination.totalPages}</span>
              </span>

              {/* Previous Button */}
              <button
                onClick={handlePrevious}
                className={`${inventory.pageButton} ${
                  visiblePages[0] === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={visiblePages[0] === 1 || loading}
              >
                Previous
              </button>

              {/* Dynamic Page Buttons */}
              {[...Array(pagination.totalPages || 1).keys()]
                .map((page) => page + 1)
                .filter(
                  (page) => page >= visiblePages[0] && page <= visiblePages[1]
                )
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`${inventory.pageButton} ${
                      currentPage === page ? inventory.active : ""
                    }`}
                    disabled={loading}
                  >
                    {page}
                  </button>
                ))}

              {/* Next Button */}
              <button
                onClick={handleNext}
                className={`${inventory.pageButton} ${
                  visiblePages[1] === pagination.totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={visiblePages[1] === pagination.totalPages || loading}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={1000} />
    </div>
  );
};

export default EditDelete;
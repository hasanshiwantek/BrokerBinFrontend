import React, { useEffect, useState } from "react";
import inventory from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import TableEditDelete from "../../../Tables/TableEditDelete";
import InventoryButtons from "./InventoryButtons";
import { getInventoryData, updateInventoryData, deleteInventoryData } from "../../../../ReduxStore/InventorySlice";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";

const EditDelete = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  const { inventoryData } = useSelector((state) => state.inventoryStore);
  console.log("Inventory Data from Frontend", inventoryData);

  // Local state for loading
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [selectedInventories, setSelectedInventories] = useState([]);

  const [editedItems, setEditedItems] = useState([]); // Keep track of edited rows

  // State for search filters
  const [partModelSearch, setPartModelSearch] = useState("");
  const [mfgSearch, setMfgSearch] = useState(""); // Changed from heciClei to mfg
  const [statusSearch, setStatusSearch] = useState("-1");
  const [partModelHeciCleiSearch, setPartModelHeciCleiSearch] = useState("");

  // Filter inventories based on search criteria
  const filterInventories = () => {
    return inventoryData?.data.filter((item) => {
      return (
        (partModelSearch === "" || item.partModel.toLowerCase().includes(partModelSearch.toLowerCase())) &&
        (mfgSearch === "" || item.mfg.toLowerCase().includes(mfgSearch.toLowerCase())) && // Filter based on mfg
        (partModelHeciCleiSearch === "" || item.heciClei.toLowerCase().includes(partModelHeciCleiSearch.toLowerCase())) && // Filter based on mfg
        (statusSearch === "-1" || item.status === statusSearch)
      );
    });
  };

  // Handle search button click
  const handleSearch = () => {
    const filteredItems = filterInventories();
    setEditedItems(filteredItems);
  };



  console.log("token", token);

  // Pagination details
  const totalPages = inventoryData?.pagination?.totalPages || 1;
  const totalRecords = inventoryData?.pagination?.totalRecords || 0;

  useEffect(() => {
    if (token) {
      setLoading(true);
      dispatch(getInventoryData({ token, page: currentPage }))
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    } else {
      console.error("No token found. User is not authenticated.");
      setLoading(false);
    }
  }, [dispatch, token, currentPage]);

  // Pagination control handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle field editing
  const handleFieldChange = (index, field, value) => {
    const updatedItems = [...editedItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setEditedItems(updatedItems);
  };

  const handleSaveModifications = () => {
    setLoading(true); // Star
    const dataToSave = {
      inventories: editedItems.map((item) => ({
        id: item.id,
        partModel: item.partModel,
        heciClei: item.heciClei,
        mfg: item.mfg,
        cond: item.cond,
        price: item.price,
        productDescription: item.productDescription,
        quantity: item.quantity,
        status: item.status,
      })),
    };
  
    dispatch(updateInventoryData({ token, inventories: dataToSave }))
      .unwrap() // Ensures the Promise rejects on failure
      .then(() => {
        alert("Inventory Updated Successfully");
  
        // Refetch inventory data while maintaining the current page
        setLoading(true);
        dispatch(getInventoryData({ token, page: currentPage }))
          .then((response) => {
            // Ensure currentPage is correctly set based on the response
            if (response.payload.pagination) {
              setCurrentPage(response.payload.pagination.currentPage || currentPage);
            }
          })
          .finally(() => setLoading(false));
      })
      .catch((error) => {
        console.error("Error updating inventory:", error);
        alert(`Error Updating Inventory: ${error.message || "Unknown Error"}`);
      });
  };
  

  // Initialize the editable items when inventory data is loaded
  useEffect(() => {
    if (inventoryData?.data) {
      setEditedItems(inventoryData.data);
    }
  }, [inventoryData]);

  const handleCheckboxChange = (id) => {
    setSelectedInventories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteClick = () => {
    if (selectedInventories.length > 0) {
      dispatch(deleteInventoryData({ token, ids: selectedInventories }))
        .unwrap() // Ensures the Promise rejects on failure
        .then(() => {
          alert("Inventory Deleted Successfully");
          setSelectedInventories([]); // Clear selections after dispatch
  
          // Refetch inventory data
          setLoading(true);
          dispatch(getInventoryData({ token, page: currentPage })).finally(() => setLoading(false));
        })
        .catch((error) => {
          console.error("Error deleting inventory:", error);
          alert(`Error Deleting Inventory: ${error.message || "Unknown Error"}`);
        });
    } else {
      alert("Select Inventory for Deletion");
    }
  };

  return (
    <div className={`${inventory.inventory}  `}>
      <InventoryButtons />
      <div className={inventory.editDeleteTable}>
        <div className={inventory.editDeleteTable_top}>
          <span>
            <label>Heci/Clei</label>
            <input
              type="text"
              value={partModelHeciCleiSearch}
              onChange={(e) => setPartModelHeciCleiSearch(e.target.value)}
            />
          </span>
          <span>
            <label>Part Search</label>
            <input
              type="text"
              value={partModelSearch}
              onChange={(e) => setPartModelSearch(e.target.value)}
            />
          </span>
          <span>
            <label>MFG</label>
            <input
              type="text"
              value={mfgSearch} // Changed from heciCleiSearch to mfgSearch
              onChange={(e) => setMfgSearch(e.target.value)} // Changed from setHeciCleiSearch to setMfgSearch
            />
          </span>
          <span>
            <label>Status</label>
            <select value={statusSearch} onChange={(e) => setStatusSearch(e.target.value)}>
              <option value="-1">ALL</option>
              <option value="stock">Stock</option>
              <option value="dist">DIST</option>
              <option value="0">N/A</option>
            </select>
          </span>
          <button type="button" onClick={handleSearch} className={`${inventory.editDeleteTable_bottom} cursor-pointer transform active:scale-90 transition-all duration-100  rounded-md`} >
            Search
          </button>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>Cart</th>
                <th>Part#</th>
                <th>HECI/CLEI</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Description</th>
                <th>Mfg</th>
                <th>Cond</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    Loading inventory data...
                  </td>
                </tr>
              ) : editedItems.length === 0 ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: "center", fontSize: "9pt" }}>
                    No search results found .
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
                        onChange={(e) => handleFieldChange(index, "partModel", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.heciClei || ""}
                        onChange={(e) => handleFieldChange(index, "heciClei", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.price || ""}
                        onChange={(e) => handleFieldChange(index, "price", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity || ""}
                        onChange={(e) => handleFieldChange(index, "quantity", e.target.value)}
                      />
                    </td>
                    <td>
                      <select
                        value={item.status || "stock"}
                        onChange={(e) => handleFieldChange(index, "status", e.target.value)}
                      >
                        <option value="stock">Stock</option>
                        <option value="dist">DIST</option>
                        <option value="0">N/A</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.productDescription || ""}
                        onChange={(e) => handleFieldChange(index, "productDescription", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.mfg || ""}
                        onChange={(e) => handleFieldChange(index, "mfg", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.cond || ""}
                        onChange={(e) => handleFieldChange(index, "cond", e.target.value)}
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
            <button type="button" onClick={handleDeleteClick} className="transform active:scale-90 transition-all duration-100 ">
              Delete
            </button>
            <button 
            type="button" 
            onClick={handleSaveModifications} 
            className="transform active:scale-90 transition-all duration-100 "
            disabled={loading}>
              {loading ? "Processing..." : "Save Modifications"}
            </button>
            {/* <button type="button">Refresh All</button> */}
          </div>

          {/* Pagination Controls */}

          {/* Pagination */}
          <div className={inventory.pagination}>

            <span className="text-orange-700 p-4 text-xl">
              Page <span className="text-blue-800">{currentPage} </span >  of <span  className="text-blue-800">  {totalPages} </span> {totalRecords} records
            </span>

            {/* <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
            >
              Previous
            </button> */}

            {[...Array(totalPages).keys()]
              .map((page) => page + 1)
              .filter((page) => {
                if (currentPage === 1) {
                  return page <= 3;
                } else if (currentPage === totalPages) {
                  return page >= totalPages - 2;
                } else {
                  return page >= currentPage - 1 && page <= currentPage + 1;
                }
              })
              .map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`${inventory.pageButton} ${currentPage === page ? inventory.active : ""
                    }`}
                  disabled={loading}
                >
                  {page}
                </button>
              ))}

            {/* <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
            >
              Next
            </button> */}
          </div>

        </div>

      </div>
    </div>
  );
};

export default EditDelete;











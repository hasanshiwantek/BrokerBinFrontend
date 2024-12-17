import React, { useEffect, useState } from "react";
import inventory from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
// import inventory from "../../../../styles/Menu/Manage/RfqTable.module.inventory";
import TableEditDelete from "../../../Tables/TableEditDelete";
import { inventoryEditDeleteTable } from "../../../../data/tableData";
import InventoryButtons from "./InventoryButtons";
import { getInventoryData, updateInventoryData,deleteInventoryData } from "../../../../ReduxStore/InventorySlice";
import Cookies from "js-cookie"
import { useSelector, useDispatch } from "react-redux";

const EditDelete = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch()

  const { inventoryData } = useSelector((state) => state.inventoryStore)
  console.log("Inventory Data from Frontend", inventoryData)

  // Local state for loading
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [selectedInventories, setSelectedInventories] = useState([]);
  
  const [toggleHECICLEI, setToggleHECICLE] = useState(false);

  const [editedItems, setEditedItems] = useState([]); // Keep track of edited rows


  console.log("token", token)

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
      }))
    }
    dispatch(updateInventoryData({ token, inventories: dataToSave }))
      .then(() => {
        alert("Inventory Updated Successfully");
        console.log("Inventory updated successfully");
      })
      .catch((error) => {
        console.error("Error updating inventory", error);
        alert("Error Updating Inventory");
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
        dispatch(deleteInventoryData({ token, ids:selectedInventories})).then(() => {
          dispatch(getInventoryData({ token, page: currentPage }))
        });
        setSelectedInventories([]); // Clear selections after dispatch
        alert("Inventory Deleted");
        console.log("Inventory Deleted")
      } else {
        alert("Select Broadcast for Deletion");
      }
    };
  

  return (
    <div className={inventory.inventory}>
      <InventoryButtons />
      <div className={inventory.editDeleteTable}>
        <div className={inventory.editDeleteTable_top}>
          <label>view</label>
          <select defaultValue="Inventory">
            <option value="Inventory">Inventory</option>
            <option value="WTB">WTB</option>
            <option value="WTS">WTS</option>
            <option value="RFQ">RFQ</option>
            <option value="All">All</option>
          </select>
          <button
            type="button"
            onClick={() => setToggleHECICLE((prev) => !prev)}
          >
            HECI/CLEI
          </button>
          <span>
            <label>part search</label>
            <input type="search" />
          </span>
          <span>
            <label>mfg</label>
            <input type="text" />
          </span>
          <span>
            <label>status</label>
            <select name="status" id="status">
              <option value="-1">ALL</option>
              <option value="2">Stock</option>
              <option value="1">DIST</option>
              <option value="0">N/A</option>
            </select>
          </span>
          <button type="button">search</button>
        </div>
        {/* <TableEditDelete inventoryEditDeleteTable={inventoryEditDeleteTable} toggleHECICLEI={toggleHECICLEI}/> */}

        <div >

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
                // Show a loading text while data is being fetched
                <tr>
                  <td colSpan="11" style={{ textAlign: "center" }}>
                    Loading inventory data...
                  </td>
                </tr>
              ) : inventoryData?.data?.length > 0 ? (
                editedItems.map((item, index) => (
                  <tr key={item.id} className={inventory.tableInputData}>
                    <td>
                    <input className="cursor-pointer"
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
                    <td>
                      <input
                        type="text"
                        value={item.heciClei || ""}
                        onChange={(e) =>
                          handleFieldChange(index, "heciClei", e.target.value)
                        }
                      />
                    </td>
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
                        type="text"
                        value={item.quantity || ""}
                        onChange={(e) =>
                          handleFieldChange(index, "quantity", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <select
                        value={item.status || "stock"} // Default to 'stock' if undefined
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
                        onChange={(e) =>
                          handleFieldChange(index, "productDescription", e.target.value)
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
                      <input
                        type="text"
                        value={item.age}

                      />
                    </td>
                  </tr>
                ))
              ) : (
                // If no data is available, show a message
                <tr>
                  <td colSpan="11" style={{ textAlign: "center" }}>
                    No inventory data available.
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>

        <div className="flex justify-around items-center p-1 ">
          <div className={inventory.editDeleteTable_bottom}>
            <button type="button" onClick={handleDeleteClick} className="transform active:scale-90 transition-all duration-100 ">delete</button>
            <button type="button" onClick={handleSaveModifications} className="transform active:scale-90 transition-all duration-100 ">save Modifications</button>
            <button type="button">refresh all</button>
          </div>


          {/* Pagination Controls */}
          <div className={inventory.editDeleteTable_bottom}>
            <button className="cursor-pointer transform active:scale-90 transition-all duration-100 "
              type="button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button className="cursor-pointer transform active:scale-90 transition-all duration-100 "
              type="button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default EditDelete;

import React, { useEffect, useState } from "react";
import inventory from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
// import inventory from "../../../../styles/Menu/Manage/RfqTable.module.inventory";
import TableEditDelete from "../../../Tables/TableEditDelete";
import { inventoryEditDeleteTable } from "../../../../data/tableData";
import InventoryButtons from "./InventoryButtons";
import { getInventoryData } from "../../../../ReduxStore/InventorySlice";
import Cookies from "js-cookie"
import { useSelector,useDispatch } from "react-redux";

const EditDelete = () => {
  const token = Cookies.get("token");
  const dispatch =useDispatch()

  const {inventoryData}=useSelector((state)=>state.inventoryStore)
  console.log("Inventory Data from Frontend",inventoryData)

  // Local state for loading
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [toggleHECICLEI, setToggleHECICLE] = useState(false);

  console.log("token",token)

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
                inventoryData.data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>{item.partModel}</td>
                      <td>{item.heciClei}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.status}</td>
                      <td>{item.productDescription}</td>
                      <td>{item.mfg}</td>
                      <td>{item.cond}</td>
                      <td>{item.age}</td>
                    </tr>
                  );
                })
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
          <button type="button">delete</button>
          <button type="button">save Modifications</button>
          <button type="button">refresh all</button>
        </div>


    {/* Pagination Controls */}
    <div className={inventory.editDeleteTable_bottom}>
          <button className="cursor-pointer"
            type="button"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button className="cursor-pointer"
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

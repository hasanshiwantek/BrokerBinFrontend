import { React, useEffect, useState } from "react";
import css from "../../../styles/Menu/Tools/HotListView.module.css"; // Assuming you have styles in CSS module
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  showHotListItem,
  deleteHotlists,
  showSortHotListItem,
  showHotListItemMfg,
} from "../../../ReduxStore/ToolsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PaginationControls from "@/components/pagination/PaginationControls";
import SortableTableHeader from "@/components/Tables/SortableHeader";
import { triggerSearchFocus } from "@/ReduxStore/focusSlice";
import { initialMFGs } from "@/data/services";
const HotListView = () => {
  // const [selectedItems, setSelectedItems] = useState([]);
  const items = useSelector((state) => state.toolsStore.myHotListItems);
  const loading = useSelector((state) => state.toolsStore.loading);
  const pagination = useSelector(
    (state) => state.toolsStore.myHotListItems?.pagination || {}
  );
  const totalPages = pagination.lastPage || 1;
  const [selectedIds, setSelectedIds] = useState([]);

  const [showClei, setshowClei] = useState(true);
  const [mfg, setMfg] = useState("showall");
  console.log("MFG: ", mfg);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  console.log("items:", items);

  // Query param hooks
  const sortBy = searchParams.get("sortBy") || "";
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const isSorted = !!sortBy;

  const dispatch = useDispatch();
  const token = Cookies.get("token");

  // Fetch data on mount or when page/sort params change
  useEffect(() => {
    const fetchAction = isSorted
      ? showSortHotListItem({
          token,
          sortBy,
          sortOrder,
          pageNumber: currentPage,
        })
      : showHotListItem({ token, pageNumber: currentPage });

    dispatch(fetchAction);
  }, [dispatch, token, currentPage, sortBy, sortOrder]);

  // Handle checkbox toggle
  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  // Handle delete button click
  const handleDelete = () => {
    if (selectedIds.length === 0) {
      toast.error("No items selected for Deletion", {
        // Light red error
      });
      return;
    }
    const payload = selectedIds; // Only send an array of IDs
    console.log("Payload for Backend:", payload);
    toast.info("Hotlists Deleted successfully!", {
      style: { fontSize: "15px", marginTop: "-10px" }, //
    });
    dispatch(deleteHotlists({ token, ids: payload }))
      .then(() => {
        console.log("Deletion successful.");
        setSelectedIds([]);
        setTimeout(()=>{
          dispatch(showHotListItem({ token, pageNumber: currentPage })); // Refresh the list
        },2000)
      })
      .catch((error) => {
        console.error("Error during deletion:", error);
        alert("Error deleting hotlist,Please try again");
        toast.error("Failed to Delete Hotlist. Try again.", {});
      });
  };

  // SORTING FUNCTION LOGIC

  const rfqHeaders = [
    { key: "details", label: "Details", sortable: false },
    { key: "day", label: "D", sortable: true },
    { key: "week", label: "W", sortable: true },
    { key: "month", label: "M", sortable: true },
    { key: "part_model", label: "Part/Model", sortable: true },
    { key: "heciClei", label: "HECI/CLEI", sortable: true },
    { key: "manufacturer", label: "MFG", sortable: true },
    { key: "condition", label: "Cond", sortable: true },
    { key: "low", label: "Low", sortable: false },
    { key: "avg", label: "Avg", sortable: false },
    { key: "high", label: "High", sortable: false },
    { key: "clp", label: "CLP", sortable: false },
    {
      key: "product_description",
      label: "Product Description",
      sortable: true,
    },
    { key: "details", label: "Details", sortable: false },
  ];

  // Handle sorting
  const handleSort = (columnKey) => {
    const newSortOrder =
      sortBy === columnKey && sortOrder === "asc" ? "desc" : "asc";
    setSearchParams({
      page: "1", // reset to first page on sort
      sortBy: columnKey,
      sortOrder: newSortOrder,
    });
  };

  const handlePageChange = (page) => {
    const params = {};
    if (sortBy) params.sortBy = sortBy;
    if (sortOrder) params.sortOrder = sortOrder;
    params.page = page.toString();
    setSearchParams(params);
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
    <>
      <div className={css.container}>
        {/* Tabs */}
        <div className={css.tabs}>
          <ul>
            <li onClick={() => window.location.reload(200)}>
              <Link to="/hotlist/view" className={css.activeTab}>
                View
              </Link>
            </li>
            <li>
              <Link to="/hotlist/add">Add</Link>
            </li>
            <li>
              <Link to="/hotlist/edit">Edit</Link>
            </li>
          </ul>
        </div>

        {/* Table Section */}
        <div className={css.tableWrapper}>
          <div className={css.tableHeader}>
            <div>
              <button
                className={css.tabTitle}
                onClick={() => {
                  dispatch(triggerSearchFocus());
                  setshowClei((prev) => !prev);
                }}
              >
                Telecom
              </button>
              <Link to={"/reports/email"}>
                <button className={css.subTitle}>Email Reports</button>
              </Link>
            </div>
            <div className={css.manufacturerDropdown}>
              <span> Manufacturer:&nbsp;</span>
              <select
                className="p-2"
                value={mfg}
                onChange={(e) => {
                  const mfg = e.target.value;
                  setMfg(mfg);
                  mfg === "showall"
                    ? dispatch(
                        showHotListItem({ token, pageNumber: currentPage })
                      )
                    : dispatch(
                        showHotListItemMfg({
                          token,
                          pageNumber: currentPage,
                          mfg: mfg,
                        })
                      );
                }}
              >
                <option value="showall">Show All</option>
                {initialMFGs?.map((mfgName, ind) => (
                  <option key={ind} value={mfgName}>
                    {mfgName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <table className={css.table}>
            <SortableTableHeader
              headers={
                showClei
                  ? rfqHeaders
                  : rfqHeaders.filter((header) => header.key !== "heciClei")
              }
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
            />

            {items && items.length > 0 ? (
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </td>

                    <td>{item.day}</td>
                    <td>{item.week}</td>
                    <td>{item.month}</td>
                    <td>{item.part_model}</td>
                    {showClei && <td>{item.heciClei}</td>}
                    <td>{item.manufacturer}</td>
                    <td>{item.condition}</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>6</td>
                    <td>{item.product_description}</td>
                    <td>
                      <Link to="/sendbroad">
                        <button className={css.broadcastButton}>
                          Broadcast
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan="14"
                    style={{
                      textAlign: "center",
                      fontSize: "9pt",
                      color: "red",
                    }}
                  >
                    No results found.
                  </td>
                </tr>
              </tbody>
            )}
          </table>

          <div className="flex justify-between ">
            <button className={css.deleteButton} onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>

        <div className={css.learnMore}>
          <a href="#hotlist">Learn More</a>
          {/* PAGINATION */}
          <div className="mt-4 ">
            <PaginationControls
              currPage={currentPage}
              totalPages={totalPages}
              visiblePages={[1, totalPages]}
              onPageChange={handlePageChange}
              onPrev={() => handlePageChange(Math.max(1, currentPage - 1))}
              onNext={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
            />
          </div>
        </div>
      </div>

      <div className={css.guideContainer} id="hotlist">
        <h2>The Hot List</h2>
        <p>
          The Hot List will display detailed statistics for selected part
          numbers. Track and view extensive data for any Part Number or Model of
          interest! We remove all repetitive daily searching with one click.
          Don't forget you can click on the Details to see who's been searching
          that item!
        </p>
        <div className={css.instructions}>
          <ul>
            <li>1. Mouse over any part number.</li>
            <li>
              2. When menu appears click on Hot List Link (Item is then added).
            </li>
            <li>
              3. Click on the Hot List Icon next to the MyVen link to view.
            </li>
          </ul>
          <ul style={{ marginTop: "10px" }}>
            <li>1. Click on the Hot List Icon next to the MyVen link.</li>
            <li>
              2. Click on Add to add items, click on Edit to edit items or add
              notes, click on View to view items, or select a part to delete
              with the Delete button.
            </li>
          </ul>
          <div style={{ marginTop: "10px" }}>
            <ol>
              <li>1. Search for items</li>
              <li>2. Select items to add to your Part Cart</li>
              <li>3. View your Part Cart</li>
              <li>4. Select item(s) to add to your Hot List</li>
            </ol>
            <p>
              <strong>*D</strong> - Searches are number based and not MFG or
              Condition specific
              <br />
              <strong>*W</strong> - Searches for the week
              <br />
              <strong>*M</strong> - Searches for the month
              <br />
              <strong>*CLP</strong> - Companies Listing Part #<br />
              Gray lines indicate items you have in stock.
            </p>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={1000} />
    </>
  );
};

export default HotListView;

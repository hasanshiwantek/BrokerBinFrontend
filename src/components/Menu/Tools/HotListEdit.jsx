import { React, useEffect, useState } from "react";
import css from "../../../styles/Menu/Tools/HotList.module.css";
import {
  showHotListItem,
  editHotListItem,
  showSortHotListItem,
} from "../../../ReduxStore/ToolsSlice";
import { Link,useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PaginationControls from "@/components/pagination/PaginationControls";
import SortableTableHeader from "@/components/Tables/SortableHeader";

const HotListEdit = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const items = useSelector((state) => state.toolsStore.myHotListItems);
  const pagination = useSelector(
    (state) => state.toolsStore.myHotListItems?.pagination || {}
  );
  const totalPages = pagination.lastPage || 1;
  const [selectedIds, setSelectedIds] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // Query param hooks
  const sortBy = searchParams.get("sortBy") || "";
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const isSorted = !!sortBy;

  // State to hold the editable hot list items
  const [editableItems, setEditableItems] = useState([]);

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

  // Update editable items when items are fetched
  useEffect(() => {
    setEditableItems(items);
  }, [items]);

  // Function to handle changes in input fields
  const handleChange = (index, field, value) => {
    const updatedItems = [...editableItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value, // Update the specific field
    };
    setEditableItems(updatedItems); // Update state with modified items
  };

  // Function to handle form submission
  const updateHotList = (e) => {
    e.preventDefault();

    const hotlists = editableItems
      .map((item) => ({
        id: item.id,
        partModel: item.part_model,
        heciClei: item.heciClei,
        mfg: item.manufacturer,
        cond: item.condition,
        productDescription: item.product_description,
      }))
      .filter(
        (item) =>
          item.partModel ||
          item.heciClei ||
          item.mfg ||
          item.cond ||
          item.productDescription
      ); // Filter out rows where all fields are empty

    dispatch(editHotListItem({ token, hotlists }))
      .then(() => {
        console.log("Hotlist Edit Succesfully");
        toast.info("Hotlists Updated successfully!", {
          style: { fontSize: "17px", marginTop: "-10px" }, //
        });
      })
      .catch((error) => {
        console.log("Error Updating", error);
        toast.error("Error Updating Hotlist. Try again.", {});
      });
  };

  // SORTING FUNCTION LOGIC

  const rfqHeaders = [
    { key: "part_model", label: "Part/Model", sortable: true },
    { key: "heciClei", label: "HECI/CLEI", sortable: true },
    { key: "manufacturer", label: "MFG", sortable: true },
    { key: "condition", label: "Cond", sortable: true },
    {
      key: "product_description",
      label: "Product Description",
      sortable: true,
    },
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

  return (
    <>
      <div className={css.container}>
        <div className={css.tabs}>
          <ul>
            <li>
              <Link to={"/hotlist/view"}>View</Link>
            </li>
            <li>
              <Link to={"/hotlist/add"}>Add</Link>
            </li>
            <li onClick={(()=>window.location.reload(200))}>
              <Link to={"/hotlist/edit"} className={css.activeTab}>
                Edit
              </Link>
            </li>
          </ul>
        </div>

        <div className={css.tableWrapper}>
          {/* <div className={css.secHeader}>
            <div className={css.tableHeader}>
              <span className={css.tabTitle}>Telecom</span>
              <span className={css.subTitle}>Edit HotList</span>
            </div>
            <div className={css.manufacturerDropdown}>
              <span> Manufacturer:&nbsp;</span>
              <select>
                <option value="all">Show All</option>
                <option value="hp">HP</option>
                <option value="dell">Dell</option>
                <option value="lenovo">Lenovo</option>
              </select>
            </div>
          </div> */}

          <form onSubmit={updateHotList}>
            <table className={css.table}>
              <SortableTableHeader
                headers={rfqHeaders}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <tbody>
                {editableItems.map((item, index) => (
                  <tr key={item.id}>
                    <td>
                      <input
                        type="text"
                        name={`partModel_${index}`}
                        value={item.part_model} // Controlled value
                        onChange={(e) =>
                          handleChange(index, "part_model", e.target.value)
                        } // Handle change
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name={`heciClei_${index}`}
                        value={item.heciClei} // Controlled value
                        onChange={(e) =>
                          handleChange(index, "heciClei", e.target.value)
                        } // Handle change
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name={`mfg_${index}`}
                        value={item.manufacturer} // Controlled value
                        onChange={(e) =>
                          handleChange(index, "manufacturer", e.target.value)
                        } // Handle change
                      />
                    </td>
                    <td >
                      <select
                        name={`cond_${index}`}
                        value={item.condition} // Controlled value
                        onChange={(e) =>
                          handleChange(index, "condition", e.target.value)
                        } 
                      >
                        <option value="New">New</option>
                        <option value="Used">Used</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        name={`productDescription_${index}`}
                        value={item.product_description} // Controlled value
                        onChange={(e) =>
                          handleChange(
                            index,
                            "product_description",
                            e.target.value
                          )
                        } // Handle change
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center p-2 bg-gray-200">
              <button
                className={`${css.saveButton} hover:!bg-blue-600 hover:-translate-y-1 transition-all ease-in-out`}
                type="submit"
              >
                Save
              </button>

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
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default HotListEdit;

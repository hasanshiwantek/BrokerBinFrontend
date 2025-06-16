import React, { useEffect, useState } from "react";
import css from "../../../styles/Menu/Reports/TopSearches.module.css";
import style from "../../../styles/Menu/Reports/Company.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  getCompanyInventory,
  getTopSearch,
  getSortCompanyInventory,
} from "../../../ReduxStore/Reports";
import Cookies from "js-cookie";
import styles from "@/styles/Menu/Manage/MyProfile.module.css";
import PaginationControls from "@/components/pagination/PaginationControls";
import { addToCart } from "../../../ReduxStore/SearchProductSlice";
import { setTogglePopUp } from "../../../ReduxStore/SearchProductSlice";
import CompanyDetails from "../../Popups/CompanyDetails/CompanyDetails";
import { setPopupCompanyDetail } from "../../../ReduxStore/SearchProductSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import SortableTableHeader from "@/components/Tables/SortableHeader";

const CompanyInventory = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedProducts, setSelectedProducts] = useState([]);
  const { searchedCompanyInventory, pageSize, totalCount, loading, error } =
    useSelector((store) => store.reports);

  // Extract 'query' from URL
  const queryParams = new URLSearchParams(location.search);
  const id = parseInt(queryParams.get("id")) || "";
  const page = parseInt(queryParams.get("page")) || 1;


  const totalPages = Math.ceil(totalCount / pageSize);
  console.log("Id: " + id);
  console.log("Page: " + page);
  console.log("Total pages: " + totalPages);

  const visibleRange = 10;
  const halfRange = Math.floor(visibleRange / 2);

  let start = Math.max(1, page - halfRange);
  let end = Math.min(totalPages, start + visibleRange - 1);

  // Adjust start again if end is at the max
  if (end - start < visibleRange - 1) {
    start = Math.max(1, end - visibleRange + 1);
  }

  const visiblePages = [start, end];



  const handlePrevPage = () => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      handlePageChange(page + 1);
    }
  };

  // COMPANY MODAL LOGIC
  const { togglePopUp, popupCompanyDetail } = useSelector(
    (state) => state.searchProductStore
  );
  const openCompanyModal = (company) => {
    console.log("Opening Company Modal with Company:", company);
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUp()); // Show company modal
  };

  // HANDLE CART FUNCTION

  const handleCheckboxChange = (item) => {
    setSelectedProducts((prev) => {
      const isSelected = prev.some((p) => p.id === item.id);
      if (isSelected) {
        return prev.filter((p) => p.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };
  const handleCartClick = async () => {
    const inventoryIds = selectedProducts.map((item) => item.id);
    console.log(inventoryIds);

    if (inventoryIds.length === 0) {
      toast.warning("Please select at least one part.", {
        style: {
          fontSize: "12px",
          marginTop: "-10px",
          fontWeight: "bold",
        },
      });
      return;
    }

    try {
      await dispatch(addToCart({ token, inventoryIds })).unwrap();
      dispatch(setSelectedProducts(selectedProducts));
      navigate("/cartpart");
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error("Failed to add items to cart.", {
        style: {
          fontSize: "12px",
          marginTop: "-10px",
          fontWeight: "bold",
        },
      });
      navigate("/cartpart");
    }
  };
  const urlSortBy = queryParams.get("sortBy") || "";
  const urlSortOrder = queryParams.get("sortOrder") || "asc";
  const urlIsSorted = queryParams.get("isSorted") === "true";
  // SORTING LOGIC
  const [sortBy, setSortBy] = useState(urlSortBy);
  const [sortOrder, setSortOrder] = useState(urlSortOrder);
  const [isSorted, setIsSorted] = useState(urlIsSorted);

  const headers = [
    { key: "cart", label: "Cart", sortable: false },
    { key: "partModel", label: "Part / Model", sortable: true },
    { key: "company", label: "Company", sortable: false },
    { key: "cond", label: "Cond", sortable: true },
    { key: "price", label: "Price", sortable: true },
    { key: "quantity", label: "Quantity", sortable: true },
    { key: "mfg", label: "Mfg", sortable: true },
    { key: "age", label: "Age", sortable: true },
    { key: "productDescription", label: "Product Description", sortable: true },
  ];

  // =======================
  // HANDLE SORT
  // =======================
  const handleSort = (columnKey) => {
    const newSortOrder =
      sortBy === columnKey && sortOrder === "asc" ? "desc" : "asc";

    setSortBy(columnKey);
    setSortOrder(newSortOrder);
    setIsSorted(true);

    const params = new URLSearchParams({
      id,
      page: 1,
      sortBy: columnKey,
      sortOrder: newSortOrder,
      isSorted: true,
    });

    navigate(`/reports/companyInventory?${params.toString()}`, {
      replace: true,
    });
  };


  
  // Fetch data whenever 'page' or 'searchString' changes
  useEffect(() => {
    if (isSorted && sortBy) {
      dispatch(
        getSortCompanyInventory({
          token,
          id,
          page,
          sortBy,
          sortOrder,
        })
      );
    } else {
      dispatch(getCompanyInventory({ token, id, page }));
    }
  }, [token, page, id, isSorted, sortBy, sortOrder, dispatch]);


    // Handle pagination

  const handlePageChange = (selectedPage) => {
    const params = new URLSearchParams({
      id,
      page: selectedPage,
      ...(isSorted && sortBy ? { sortBy, sortOrder, isSorted: true } : {}),
    });

    const url = `/reports/companyInventory?${params.toString()}`;
    navigate(url, { replace: true });
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
      <div className={css.container} style={{ margin: "4rem" }}>
        <div className={styles.profileInfo_links}>
          <ul>
            <li>
              <NavLink
                to={"/reports/Company"}
                end // This ensures the exact match for /myprofile
                className="text-[#2c83ec]"
              >
                <span>Company</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/reports/sitewide"}
                className={({ isActive }) => (isActive ? css.active : "")}
              >
                <span>Site Wide</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/reports/email"}
                className={({ isActive }) => (isActive ? css.active : "")}
              >
                <span>Email</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/reports/serviceStats"}
                className={({ isActive }) => (isActive ? css.active : "")}
              >
                <span>Stats</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Recent Searches Section */}
        <div className={css.topSearches}>
          <h3>Inventory</h3>
          <table>
            <SortableTableHeader
              headers={headers}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
            />

            <tbody>
              {searchedCompanyInventory.length > 0 ? (
                searchedCompanyInventory.map((item, i) => (
                  <tr key={item.id}>
                    <td>
                      <input
                        type="checkbox"
                        name={item.id}
                        id={`checkbox-${item.id}`}
                        checked={selectedProducts.some((p) => p.id === item.id)}
                        onChange={() => handleCheckboxChange(item)}
                      />
                    </td>
                    <td>{item.partModel}</td>
                    <td
                      className="font-medium cursor-pointer"
                      onClick={() => openCompanyModal(item.addedBy.company)}
                    >
                      {item.addedBy.company.name}
                    </td>
                    <td className="!uppercase">{item.cond}</td>
                    <td className="!uppercase">{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.mfg}</td>
                    <td>{item.age}</td>
                    <td>{item.productDescription}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="!text-center !text-red-600 !font-bold !py-1"
                  >
                    No results found.
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

          <div className={css.topSearchButtons}>
            <button
              type="button"
              className={style.basicButton}
              onClick={handleCartClick}
            >
              Add To Part Cart
            </button>
            <NavLink to={"/cartpart"}>
              <button type="button" className={style.basicButton}>
                View Part Cart
              </button>
            </NavLink>
          </div>
        </div>
        <div
          className={`${css.tablePagination} flex justify-between items-center `}
        >
          <PaginationControls
            currPage={page}
            totalPages={totalPages}
            visiblePages={visiblePages}
            onPageChange={handlePageChange}
            onPrev={handlePrevPage}
            onNext={handleNextPage}
          />
          <div>
            <p className="text-[var(--primary-color)]">
              Page <span className="text-blue-700">{page}</span> of {totalPages}
            </p>
          </div>
        </div>
      </div>
      <div className="ml-20">
        <span className="font-semibold underline">
          Questions or Misuse?
          <NavLink to={"/feedback"} className={"font-bold"}>
            Click Here!
          </NavLink>
        </span>
      </div>
      {togglePopUp && (
        <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />
      )}
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default CompanyInventory;

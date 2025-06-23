import React, { useEffect, useState } from "react";
import css from "@/styles/SearchProducts.module.css";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import shieldImage from "@/assets/shield-img.png";
import { countriesList } from "@/data/services";
import { FaEye } from "react-icons/fa";
import { BiBlock } from "react-icons/bi";
import { IoCheckmarkCircle } from "react-icons/io5";
import {
  searchProductQuery,
  searchByKeyword,
} from "@/ReduxStore/SearchProductSlice";
import HoverDropdown from "@/HoverDropdown";
import EyeDropdown from "@/EyeDropDown";
import {
  setSelectedProducts,
  setTogglePopUp,
  setPopupCompanyDetail,
  setHoverCompanyDetail,
} from "@/ReduxStore/SearchProductSlice";

const ProductTableDetail = React.memo(
  ({ partModel, partData, searchString }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const queryParams = new URLSearchParams(location.search);
    const sortBy = queryParams.get("sortBy");
    const sortOrder = queryParams.get("sortOrder") || "desc";
    const page = parseInt(queryParams.get("page")) || 1;

    const {
      selectedProducts,
      searchResponseMatched,
      // hoverCompanyDetail,
      appliedFilters,
    } = useSelector((store) => store.searchProductStore);
    const { initialData, user } = useSelector((state) => state.profileStore);

    const user_id = Cookies.get("user_id");
    const id = user?.user?.id || user_id;
    const token = Cookies.get("token");
    const loggedInUserCompany = initialData?.company?.name;

    const handleShowPopupCompanyDetails = (event, companyId) => {
      event.stopPropagation();

      // 1️⃣ First, search for the company in the 'data' object
      let companyDetail = Object.values(searchResponseMatched || {}).flatMap(
        (item) => item?.data?.find((e) => e.addedBy?.company?.id === companyId)
      )[0];

      // 2️⃣ If not found in 'data', search in 'foundItems'
      if (!companyDetail) {
        companyDetail = searchResponseMatched?.foundItems?.find(
          (e) => e?.addedBy?.company?.id === companyId
        );
      }

      // console.log("COMPANYID:",companyId,"COMPANYDETAIL:",companyDetail || "Not Found in Both Sources");

      // 3️⃣ If company is found, dispatch the correct company data
      if (companyDetail?.addedBy?.company) {
        dispatch(setPopupCompanyDetail([companyDetail.addedBy.company]));
        // console.log("SETPOPUPCOMPANYDETAIL:", companyDetail.addedBy.company);
      } else {
        // console.error("Company not found in data or foundItems!");
      }

      dispatch(setTogglePopUp());
    };

    const selectProduct = (id) => {
      const filteredProducts = selectedProducts.some(
        (product) => product.id === id
      )
        ? selectedProducts.filter((product) => product.id !== id)
        : [...selectedProducts, partData.find((item) => item.id === id)];
      dispatch(setSelectedProducts(filteredProducts));
    };

    const handleHoverCompanyDetail = (event, id) => {
      let companyDetail = Object.values(searchResponseMatched || {}).flatMap(
        (item) => item?.data?.find((e) => e?.id === id)
      )[0]; // Get the first matching result

      if (!companyDetail) {
        companyDetail = searchResponseMatched?.foundItems?.find(
          (e) => e?.id === id
        );
      }
      // console.log("HOVERED COMPANY DETAIL:", companyDetail || "NOT FOUND");

      if (companyDetail?.addedBy?.company) {
        dispatch(setHoverCompanyDetail(companyDetail.addedBy.company));
        // console.log("SET HOVER COMPANY DETAIL:", companyDetail.addedBy.company);
      } else {
        // console.error("Company not found for hover!");
      }
    };

    const isSelected = (id) => {
      return selectedProducts.some((product) => product.id === id);
    };

    console.log("Selected Product: ", selectedProducts);
    console.log("Part Data: ", partData);

    const totalCount =
      searchResponseMatched[partModel]?.totalCount ||
      searchResponseMatched?.totalCount;
    const pageSize =
      searchResponseMatched[partModel]?.pageSize ||
      searchResponseMatched?.pageSize;
    const keywordPage = parseInt(queryParams.get("page")) || 1;
    const keywordPageSize = searchResponseMatched?.pageSize || 20;
    const keywordTotalCount = searchResponseMatched?.totalCount || 0;
    const keywordTotalPages = Math.ceil(keywordTotalCount / keywordPageSize);
    const isSearchPagination = Boolean(searchString);

    const totalPagess = isSearchPagination
      ? Math.ceil(totalCount / pageSize)
      : keywordTotalPages;

    const currentPage = isSearchPagination ? page : keywordPage;

    const [visiblePages, setVisiblePages] = useState([1, 10]); // Initially showing pages 1-10

    const handlePrevPage = () => {
      const newPage = page - 1;
      // const newPage = currentPage - 1;
      if (newPage < 1) return;
      const queryParams = new URLSearchParams(location.search);
      const currentQuery = queryParams.get("query");
      const currentPartModel = queryParams.get("partModel");
      const sortBy = queryParams.get("sortBy");
      const sortOrder = queryParams.get("sortOrder");
      const url = currentQuery
        ? `/inventory/search?page=${newPage}&query=${encodeURIComponent(
            currentQuery
          )}&sortBy=${sortBy}&sortOrder=${sortOrder}`
        : `/inventory/search?page=${newPage}&partModel=${encodeURIComponent(
            currentPartModel
          )}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
      navigate(url, { replace: true });
      // ✅ Ensure pagination range updates when moving to the previous range
      if (newPage < visiblePages[0]) {
        setVisiblePages([
          Math.max(visiblePages[0] - 10, 1),
          visiblePages[0] - 1,
        ]);
      }
    };

    const handleNextPage = () => {
      const newPage = currentPage + 1;
      // const newPage = page + 1;
      if (newPage > totalPagess) return;
      const queryParams = new URLSearchParams(location.search);
      const currentQuery = queryParams.get("query");
      const currentPartModel = queryParams.get("partModel");
      const sortBy = queryParams.get("sortBy");
      const sortOrder = queryParams.get("sortOrder");
      const url = currentQuery
        ? `/inventory/search?page=${newPage}&query=${encodeURIComponent(
            currentQuery
          )}&sortBy=${sortBy}&sortOrder=${sortOrder}`
        : `/inventory/search?page=${newPage}&partModel=${encodeURIComponent(
            currentPartModel
          )}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
      navigate(url, { replace: true });
      // ✅ Ensure pagination range updates when reaching the last page in the current range
      if (newPage > visiblePages[1] && newPage <= totalPagess) {
        setVisiblePages([
          visiblePages[1] + 1,
          Math.min(visiblePages[1] + 10, totalPagess),
        ]);
      }
    };

    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPagess) {
        const queryParams = new URLSearchParams(location.search);
        const currentQuery = queryParams.get("query");
        const currentPartModel = queryParams.get("partModel");
        const sortBy = queryParams.get("sortBy");
        const sortOrder = queryParams.get("sortOrder");
        const url = currentQuery
          ? `/inventory/search?page=${page}&query=${encodeURIComponent(
              currentQuery
            )}&sortBy=${sortBy}&sortOrder=${sortOrder}`
          : `/inventory/search?page=${page}&partModel=${encodeURIComponent(
              currentPartModel
            )}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
        navigate(url, { replace: true });
        // ✅ Ensure visible pagination updates when clicking on a new range
        if (page > visiblePages[1] && page <= totalPagess) {
          setVisiblePages([page, Math.min(page + 9, totalPagess)]);
        } else if (page < visiblePages[0]) {
          setVisiblePages([Math.max(page - 9, 1), page]);
        }
      }
    };

    const handleSort = (column) => {
      const queryParams = new URLSearchParams(location.search);
      const searchString = queryParams.get("query");
      const partModel = queryParams.get("partModel");
      const currentSortBy = queryParams.get("sortBy");
      const currentSortOrder = queryParams.get("sortOrder") || "desc";
      const newSortOrder =
        currentSortBy === column
          ? currentSortOrder === "asc"
            ? "desc"
            : "asc"
          : column === "price"
          ? "asc"
          : "desc";
      const payload = {
        token,
        page: currentPage,
        sortBy: column,
        sortOrder: newSortOrder,
        filters: appliedFilters || {},
      };
      if (searchString) {
        dispatch(searchProductQuery({ ...payload, search: searchString }));
      } else if (partModel) {
        dispatch(searchByKeyword({ ...payload, partModel }));
      }
      queryParams.set("sortBy", column);
      queryParams.set("sortOrder", newSortOrder);
      queryParams.set("page", currentPage);
      navigate(`${location.pathname}?${queryParams.toString()}`, {
        replace: true,
      });
    };

    useEffect(() => {
      const start = Math.floor((currentPage - 1) / 10) * 10 + 1;
      const end = Math.min(start + 9, totalPagess);
      setVisiblePages([start, end]);
    }, [currentPage, totalPagess]);

    return (
      <div className={css.productTableDetail}>
        <div className={css.tableContainer}>
          <h3>Results for: {partModel}</h3>
          <div>
            <table className="">
              <thead>
                <tr>
                  <th>Cart</th>
                  <th>
                    <img
                      src={shieldImage}
                      alt=""
                      style={{ width: "18px", fontWeight: "bold" }}
                    />
                  </th>
                  <th
                    onClick={() => handleSort("name")}
                    style={{ cursor: "pointer" }}
                  >
                    Company
                    {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th>PVR</th>
                  <th
                    onClick={() => handleSort("company_country")}
                    style={{ cursor: "pointer" }}
                  >
                    Ctry
                    {sortBy === "company_country" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("partModel")}
                    style={{ cursor: "pointer" }}
                  >
                    Part / Model
                    {sortBy === "partModel" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th>History</th>
                  <th>TS</th>
                  <th
                    onClick={() => handleSort("heciClei")}
                    style={{ cursor: "pointer" }}
                  >
                    HECI / CLEI{" "}
                    {sortBy === "heciClei" && (sortOrder === "asc" ? "↑" : "↓")}{" "}
                  </th>
                  <th
                    onClick={() => handleSort("mfg")}
                    style={{ cursor: "pointer" }}
                  >
                    Mfg {sortBy === "mfg" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>

                  <th
                    onClick={() => handleSort("cond")}
                    style={{ cursor: "pointer" }}
                  >
                    Cond{sortBy === "cond" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>

                  <th
                    onClick={() => handleSort("price")}
                    style={{ cursor: "pointer" }}
                  >
                    Price{" "}
                    {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("quantity")}
                    style={{ cursor: "pointer" }}
                  >
                    Quantity{" "}
                    {sortBy === "quantity" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>

                  <th
                    onClick={() => handleSort("created_at")}
                    style={{ cursor: "pointer" }}
                  >
                    Age{" "}
                    {sortBy === "created_at" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("productDescription")}
                    style={{ cursor: "pointer" }}
                  >
                    Product Description
                    {sortBy === "productDescription" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {(partData || searchResponseMatched?.data || [])
                  ?.slice() // Create a shallow copy of partData to avoid mutating the original array
                  .sort((a, b) => {
                    // Check if the company matches the logged-in user's company
                    const isAUserCompany =
                      a.addedBy?.company?.name?.toLowerCase() ===
                      loggedInUserCompany?.toLowerCase();
                    const isBUserCompany =
                      b.addedBy?.company?.name?.toLowerCase() ===
                      loggedInUserCompany?.toLowerCase();

                    // Sort to prioritize logged-in user's company
                    if (isAUserCompany && !isBUserCompany) return -1; // a comes before b
                    if (!isAUserCompany && isBUserCompany) return 1; // b comes before a
                    return 0; // Keep the same order for others
                  })
                  ?.map((e, i) => (
                    <tr
                      key={i}
                      style={
                        e?.addedBy?.company?.name?.toLowerCase() ===
                        loggedInUserCompany?.toLowerCase()
                          ? { backgroundColor: "#ffb" } // Highlight if the company matches
                          : null
                      }
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={isSelected(e?.id)}
                          onChange={() => selectProduct(e?.id)}
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                      <td></td>
                      <td>
                        <HoverDropdown
                          type="company"
                          id={e?.addedBy?.company?.id}
                          company={e?.addedBy?.company}
                          triggerElement={
                            <a
                              style={{ color: "#428bca", fontWeight: "500" }}
                              onClick={(event) =>
                                handleShowPopupCompanyDetails(
                                  event,
                                  e?.addedBy?.company?.id
                                )
                              }
                              onMouseEnter={(event) =>
                                handleHoverCompanyDetail(event, e.id)
                              }
                            >
                              {e?.addedBy?.company?.name}
                            </a>
                          }
                        />
                      </td>

                      <td className="cursor-pointer">
                        <EyeDropdown
                          rowData={e}
                          triggerElement={
                            <div>
                              <FaEye />
                            </div>
                          }
                        />
                      </td>

                      <td>
                        {countriesList.find(
                          (country) =>
                            country.label.toLowerCase().trim() ===
                            e?.addedBy?.company?.country?.toLowerCase().trim()
                        )?.value ||
                          e?.addedBy?.company?.country ||
                          "N/A"}
                      </td>

                      <td className="cursor-pointer">
                        <HoverDropdown
                          type="part"
                          id={e?.id}
                          rowData={e}
                          triggerElement={<td>{e?.partModel}</td>}
                        />
                      </td>

                      <td>
                        <img
                          src="https://static.brokerbin.com/version/v8.3.2/images/nohistory_icon.png"
                          alt="Stats"
                        />
                      </td>
                      <td>
                        {e?.ts ? (
                          <IoCheckmarkCircle style={{ color: "red" }} />
                        ) : (
                          <BiBlock style={{ color: "red" }} />
                        )}
                      </td>
                      <td>{e?.heciClei}</td>
                      <td>{e?.mfg}</td>
                      <td>{e?.cond}</td>
                      <td>{e?.price}</td>
                      <td>{e?.quantity}</td>
                      <td>{e?.age}</td>
                      <td>{e?.productDescription}</td>
                    </tr>
                  ))}
              </tbody>

              <tfoot>
                <tr>
                  <th>Cart</th>
                  <th>
                    <img
                      src={shieldImage}
                      alt=""
                      style={{ width: "18px", fontWeight: "bold" }}
                    />
                  </th>
                  <th
                    onClick={() => handleSort("name")}
                    style={{ cursor: "pointer" }}
                  >
                    Company
                    {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th>PVR</th>
                  <th
                    onClick={() => handleSort("company_country")}
                    style={{ cursor: "pointer" }}
                  >
                    Ctry
                    {sortBy === "company_country" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("partModel")}
                    style={{ cursor: "pointer" }}
                  >
                    Part / Model
                    {sortBy === "partModel" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th>History</th>
                  <th>TS</th>
                  <th
                    onClick={() => handleSort("heciClei")}
                    style={{ cursor: "pointer" }}
                  >
                    HECI / CLEI{" "}
                    {sortBy === "heciClei" && (sortOrder === "asc" ? "↑" : "↓")}{" "}
                  </th>
                  <th
                    onClick={() => handleSort("mfg")}
                    style={{ cursor: "pointer" }}
                  >
                    Mfg {sortBy === "mfg" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>

                  <th
                    onClick={() => handleSort("cond")}
                    style={{ cursor: "pointer" }}
                  >
                    Cond{sortBy === "cond" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>

                  <th
                    onClick={() => handleSort("price")}
                    style={{ cursor: "pointer" }}
                  >
                    Price{" "}
                    {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("quantity")}
                    style={{ cursor: "pointer" }}
                  >
                    Quantity{" "}
                    {sortBy === "quantity" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>

                  <th
                    onClick={() => handleSort("created_at")}
                    style={{ cursor: "pointer" }}
                  >
                    Age{" "}
                    {sortBy === "created_at" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("productDescription")}
                    style={{ cursor: "pointer" }}
                  >
                    Product Description
                    {sortBy === "productDescription" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex justify-between items-center p-1">
            <div className="flex space-x-2 text-lg font-semibold text-gray-700">
              <span className="text-orange-700 p-4 text-xl">
                Page <span className="text-blue-800">{currentPage}</span> of
                <span className="text-blue-800"> {totalPagess}</span>
              </span>
            </div>

            <div className="flex space-x-2">
              {/* Previous Button */}
              <button
                onClick={handlePrevPage}
                className={`px-4 py-2 border rounded-md bg-blue-500 text-white  hover:bg-blue-600 transition-all duration-200 
            ${visiblePages[0] === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={visiblePages[0] === 1}
              >
                Previous
              </button>

              {Array.from({ length: Math.max(totalPagess, 1) }, (_, i) => i + 1)
                .filter(
                  (page) => page >= visiblePages[0] && page <= visiblePages[1]
                )
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 border rounded-md transition-all duration-200 
                    ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                ))}

              {/* Next Button */}
              <button
                onClick={handleNextPage}
                className={`px-4 py-2 border rounded-md bg-blue-500 text-white  hover:bg-blue-600 transition-all duration-200 
            ${
              visiblePages[1] === totalPagess
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
                disabled={visiblePages[1] === totalPagess}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ProductTableDetail;

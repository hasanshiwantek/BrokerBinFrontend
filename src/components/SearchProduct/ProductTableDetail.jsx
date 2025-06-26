import React, { useEffect, useState } from "react";
import css from "../../styles/SearchProducts.module.css";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import useDefaultSettings from "../hooks/UseDefaultSettings";
import ProductTable from "./ProductTable";
import {
  fetchUserSettings,
  setOptionFormData,
  submitUserSettings,
  fetchUserData,
} from "@/ReduxStore/ProfleSlice";
import Tooltip from "@mui/material/Tooltip";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ProductTableDetail = React.memo(
  ({ partModel, partData, searchString }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryParams = new URLSearchParams(location.search);
    const sortBy = queryParams.get("sortBy");
    const sortOrder = queryParams.get("sortOrder") || "desc";
    const page = parseInt(queryParams.get("page")) || 1;
    const { alternateRowColors, showBorders, doubleVision, itemsPerPage } =
      useDefaultSettings();

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
    console.log("User: ", user);

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
      if (companyDetail?.addedBy?.company) {
        dispatch(setHoverCompanyDetail(companyDetail.addedBy.company));
      } else {
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

    // const allData = (partData || searchResponseMatched?.data || []);
    // const firstTableData = doubleVision && allData.length > 20
    //   ? allData.slice(0, itemsPerPage)
    //   : allData;

    // const secondTableData = doubleVision && allData.length > itemsPerPage
    //   ? allData.slice(itemsPerPage)
    //   : [];

    const allData = (partData || searchResponseMatched?.data || []).slice(0, itemsPerPage);
    const shouldSplit = doubleVision && itemsPerPage >= 20;
    const splitIndex = shouldSplit
      ? Math.ceil(allData.length / 2)
      : allData.length;

    const firstTableData = allData.slice(0, splitIndex);
    const secondTableData = shouldSplit ? allData.slice(splitIndex) : [];

    // ITEMS PER PAGE LOGIC

    const [itemPerPage, setItemPerPage] = useState(itemsPerPage);
    const doubleVisionState =
      user?.userSetting?.settings?.customPartDisplay?.doubleVision;

    console.log("Double Vision State: ", doubleVisionState);

    const { optionFormData, loading } = useSelector(
      (state) => state.profileStore
    );

    const handlePageSelect = async (e) => {
      const value = e.target.value;
      setItemPerPage(value);
      console.log("Selected ItemPerPage: ", value);
      const updatedData = {
        ...optionFormData,
        displaySettings: {
          ...optionFormData.displaySettings,
          itemsPerPage: value, // or any dynamic value like from state
        },
      };
      console.log(
        "🚀 Sending partial Items Per Page settings  update:",
        updatedData
      );
      try {
        const resultAction = await dispatch(
          submitUserSettings({ token, optionFormData: updatedData })
        );
        if (submitUserSettings.fulfilled.match(resultAction)) {
          console.log("✅Double Vision setting updated!✅");
          dispatch(fetchUserData({ id: user_id, token }));

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          console.error("🔥 Error submitting double vision:", err);
        }
      } catch (err) {
        console.error("🔥 Error submitting double vision:", err);
      }
    };

    useEffect(() => {
      dispatch(fetchUserSettings({ token }));
    }, []);

    const handleToggleDoubleVision = async () => {
      const newDoubleVisionValue = !doubleVisionState;

      const updatedData = {
        ...optionFormData,
        customPartDisplay: {
          ...optionFormData.customPartDisplay,
          doubleVision: newDoubleVisionValue,
        },
      };

      try {
        const resultAction = await dispatch(
          submitUserSettings({ token, optionFormData: updatedData })
        );

        if (submitUserSettings.fulfilled.match(resultAction)) {
          console.log(
            `Double Vision ${newDoubleVisionValue ? "Enabled" : "Disabled"}`
          );
          dispatch(fetchUserData({ id: user_id, token }));
          dispatch(fetchUserSettings({ token }));
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          console.error("🔥 Failed to update Double Vision.");
        }
      } catch (err) {
        console.error("🔥 Error submitting Double Vision setting:", err);
      }
    };

    const theme = createTheme({
      components: {
        MuiTooltip: {
          styleOverrides: {
            tooltip: {
              fontSize: "1rem", // Adjust font size
              width: "13rem",
              textAlign: "center",
              backgroundColor: "var(--primary-color)",
            },
            arrow: {
              color: "var(--primary-color)",
            },
          },
        },
      },
    });

    return (
      <div className={css.productTableDetail}>
        <div className={css.tableContainer}>
          <div className={`flex justify-between items-center`}>
            <h3>Results for: {partModel}</h3>
            <div className="flex justify-start items-center gap-2 p-1">
              <select
                onChange={handlePageSelect}
                value={itemPerPage}
                className="border !text-[.90vw] rounded text-black"
              >
                {[20, 30, 40, 50, 60].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>

              <div
                onClick={handleToggleDoubleVision}
                className="cursor-pointer"
              >
                {doubleVisionState ? (
                  <ThemeProvider theme={theme}>
                    <Tooltip title="Remove Double Vision" arrow placement="top">
                      <img
                        src="https://static.brokerbin.com/version/v8.4.2/images/double_vision_off.gif"
                        alt="Remove Double Vision"
                      />
                    </Tooltip>
                  </ThemeProvider>
                ) : (
                  <ThemeProvider theme={theme}>
                    <Tooltip
                      title="Turn On  Double Vision"
                      arrow
                      placement="top"
                    >
                      <img
                        src="https://static.brokerbin.com/version/v8.4.2/images/double_vision.gif"
                        alt="Turn On Double Vision"
                      />
                    </Tooltip>
                  </ThemeProvider>
                )}
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <Tooltip
                    title="Go To Customize Display"
                    arrow
                    placement="top"
                  >
                    <Link to={"/myProfile/Options"}>
                      <img
                        src="https://static.brokerbin.com/version/v8.4.2/images/customize_display.gif"
                        alt="/OptionsPage"
                      />
                    </Link>
                  </Tooltip>
                </ThemeProvider>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2">
              <ProductTable
                data={firstTableData}
                showBorders={showBorders}
                alternateRowColors={alternateRowColors}
                doubleVision={doubleVision}
                itemsPerPage={itemsPerPage}
                sortBy={sortBy}
                sortOrder={sortOrder}
                handleSort={handleSort}
                selectProduct={selectProduct}
                isSelected={isSelected}
                loggedInUserCompany={loggedInUserCompany}
                handleShowPopupCompanyDetails={handleShowPopupCompanyDetails}
                handleHoverCompanyDetail={handleHoverCompanyDetail}
                countriesList={countriesList}
              />
            </div>

            {doubleVision && secondTableData.length > 0 && (
              <div className="w-1/2 border-l border-black ">
                <ProductTable
                  data={secondTableData}
                  doubleVision={doubleVision}
                  showBorders={showBorders}
                  alternateRowColors={alternateRowColors}
                  itemsPerPage={itemsPerPage}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                  selectProduct={selectProduct}
                  isSelected={isSelected}
                  loggedInUserCompany={loggedInUserCompany}
                  handleShowPopupCompanyDetails={handleShowPopupCompanyDetails}
                  handleHoverCompanyDetail={handleHoverCompanyDetail}
                  countriesList={countriesList}
                />
              </div>
            )}
          </div>

          <div className="flex justify-between items-center ">
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
                className={`px-2 py-1 border rounded-md bg-blue-500 text-white  hover:bg-blue-600 transition-all duration-200 text-[8pt] 
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
                    className={`px-2 py-2 border rounded-md transition-all duration-200 text-[8pt] 
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
                className={`px-2  py-1  text-[8pt] border rounded-md bg-blue-500 text-white  hover:bg-blue-600 transition-all duration-200 
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
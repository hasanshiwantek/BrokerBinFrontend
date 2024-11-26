import React, { useCallback, useEffect, useRef } from "react";
import css from "../../../styles/SearchProducts.module.css";
import Filter from "../../Filter";
import CompaniesListingParts from "../../CompaniesListingParts";
import ProductsPieChart from "../../ProductsPieChart";
import CompanyDetails from "../../Popups/CompanyDetails/CompanyDetails";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import shieldImage from "../../../assets/shield-img.png"
import { countriesList } from "../../../data/services"


import {
  searchProductQuery,
  setCurrentPage,
  setSelectedProducts,
  setCurrentPagePrev,
  setCurrentPageNext,
  setTogglePopUp,
  setPopupCompanyDetail,
  setFilterToggle,
  setPopUpRfq,
  setGraphToggle,
  searchProductHistory,
  setHoverCompanyDetail,
  searchByKeyword,
} from "../../../ReduxStore/SearchProductSlice";
import LoadingState from "../../../LoadingState";
import { FaEye, FaShieldAlt } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";
import { BiBlock } from "react-icons/bi";
import { IoCheckmarkCircle } from "react-icons/io5";
import MyRFQNew from "../../Popups/MyRFQNew";
import ErrorStatus from "../../Error/ErrorStatus";
import AddToHotList from "./AddToHotList";

const SearchProduct = () => {
  const token = Cookies.get("token");
  const location = useLocation();
  const dispatch = useDispatch();

  // Extract 'page' and 'searchString' from URL
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page")) || 1;
  const searchString = queryParams.get("query") || "";
  const partModel = queryParams.get("partModel") || "";
  console.log("Query" + searchString);
  console.log("PartModel" + partModel);
  const {
    searchResponseMatched,
    searchResponseNotMatched,
    gettingProducts,
    gettingHistory,
    error,
    filterToggle,
    graphToggle,
    companiesListingParts,
    togglePopUp,
  } = useSelector((store) => store.searchProductStore);

  // Fetch data whenever 'page' or 'searchString' changes
  useEffect(() => {
    if (!searchString && !partModel) {
      return;
    }

    if (!partModel) {
      dispatch(
        searchProductQuery({
          token,
          page,
          search: searchString,
        })
      );
    } else {
      dispatch(
        searchByKeyword({
          token,
          page,
          partModel: partModel,
        })
      );
    }

    dispatch(searchProductHistory({ token }));
  }, [token, page, searchString, dispatch]);

  // Ensure 'searchString' exists before proceeding
  if (!searchString && !partModel) {
    // Handle the case where 'searchString' is not available
    // You might want to redirect or show an error
    return <div>No search query provided.</div>;
  }
  // else if (!searchString && !partModel) {
  //   // Handle the case where 'searchString' is not available
  //   // You might want to redirect or show an error
  //   return <div>No search query provided.</div>;
  // }

  if (gettingProducts) {
    return <LoadingState />;
  }

  if (gettingHistory) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorStatus error={error} />;
  }

  return (
    <div className={css.layout}>
      {filterToggle && <Filter />}
      {/* If there are products that are not matched with search query */}
      <div
        className={css.layoutTables}
        style={searchResponseMatched?.length <= 0 ? { margin: "0 auto" } : null}
      >
        {searchResponseNotMatched?.length > 0 && (
          <div className={css.searchResult}>
            {searchResponseNotMatched.map((search) => {
              return <AddToHotList item={search} key={search} />;
            })}
          </div>
        )}
        {/* Products those are matched with search query */}
        {searchResponseMatched?.length > 0 && (
          <div className={css.tableArea}>
            {graphToggle && <ProductsPieChart />}
            <div className={css.productTable}>
              <ProductTableBtn />
              <ProductTableDetail />
            </div>
            {companiesListingParts && <CompaniesListingParts />}
          </div>
        )}
      </div>
      {togglePopUp && <CompanyDetails />}
    </div>
  );
};

const ProductTableBtn = React.memo(() => {
  const { popUpRfq } = useSelector((store) => store.searchProductStore);
  const dispatch = useDispatch();

  const handleShowPopupMyRFQNew = React.useCallback(
    (event) => {
      event.stopPropagation();
      dispatch(setPopUpRfq());
    },
    [dispatch]
  );

  return (
    <div className={css.productTableBtn}>
      <button type="button" onClick={handleShowPopupMyRFQNew}>
        RFQ
      </button>
      {popUpRfq && <MyRFQNew />}
      <button type="button">Add</button>
      <a href="/cartpart">Cart</a>
      <button type="button" onClick={() => dispatch(setFilterToggle())}>
        Filters
      </button>
      <button type="button" onClick={() => dispatch(setGraphToggle())}>
        Graph View
      </button>
    </div>
  );
});

const ProductTableDetail = React.memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Extract 'page' and 'searchString' from URL
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page")) || 1;
  const searchString = queryParams.get("query") || "";
  const partModel = queryParams.get("partModel") || "";

  const {
    selectedProducts,
    searchResponseMatched,
    pageSize,
    totalCount,
    hoverCompanyDetail,
  } = useSelector((store) => store.searchProductStore);

  console.log(hoverCompanyDetail);
  const totalPages = Math.ceil(totalCount / pageSize);

  const handleShowPopupCompanyDetails = (event, id) => {
    event.stopPropagation();
    const companyDetail = searchResponseMatched?.filter((e) => e.id === id);
    console.log(companyDetail);
    dispatch(setPopupCompanyDetail(companyDetail));
    dispatch(setTogglePopUp());
  };

  const selectProduct = (id) => {
    const filteredProducts = () => {
      if (
        selectedProducts.length !== 0 &&
        selectedProducts.some((product) => product.id === id)
      ) {
        return selectedProducts.filter((product) => product.id !== id);
      } else {
        const selectedProduct = searchResponseMatched?.find(
          (item) => item.id === id
        );
        return [...selectedProducts, selectedProduct];
      }
    };
    dispatch(setSelectedProducts(filteredProducts()));
  };

  const handleHoverCompanyDetail = (event, id) => {
    const companyDetail = searchResponseMatched?.find((e) => e.id === id);
    dispatch(setHoverCompanyDetail(companyDetail?.addedBy?.company));
  };

  // Handle pagination
  const handlePrevPage = () => {
    const newPage = page - 1;
    if (!partModel) {
      const url = `/inventory/search?page=${newPage}&query=${encodeURIComponent(
        searchString
      )}`;
      navigate(url, { replace: true });
    } else {
      const url = `/inventory/search?page=${newPage}&partModel=${encodeURIComponent(
        partModel
      )}`;
      navigate(url, { replace: true });
    }
  };

  const handleNextPage = () => {
    const newPage = page + 1;
    if (!partModel) {
      const url = `/inventory/search?page=${newPage}&query=${encodeURIComponent(
        searchString
      )}`;
      navigate(url, { replace: true });
    } else {
      const url = `/inventory/search?page=${newPage}&partModel=${encodeURIComponent(
        partModel
      )}`;
      navigate(url, { replace: true });
    }
  };

  const isSelected = (id) => {
    return selectedProducts.some((product) => product.id === id);
  };

  return (
    <div className={css.productTableDetail}>
      <table>
        <thead>
          <tr>
            <th>Cart</th>
            <th><img src={shieldImage} alt="" srcset="" style={{ width: "18px", fontWeight: "bold" }} /> </th>
            <th>Company</th>
            <th>PVR</th>
            <th>Ctry</th>
            <th>Part / Model</th>
            <th>History</th>
            <th>TS</th>
            <th>HECI / CLEI</th>
            <th>Mfg</th>
            <th>Cond</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Age</th>
            <th>Product Description</th>
          </tr>
        </thead>
        <tbody>
          {searchResponseMatched?.map((e, i) => (
            <tr className={css.tableData} key={i}>
              <td>
                <input
                  type="checkbox"
                  name="addToCart"
                  id={e.id}
                  checked={isSelected(e.id)}
                  onChange={() => selectProduct(e.id)}
                />
              </td>
              <td></td>
              <td>
                <a
                  onClick={(event) =>
                    handleShowPopupCompanyDetails(event, e.id)
                  }
                  onMouseEnter={(event) =>
                    handleHoverCompanyDetail(event, e.id)
                  }
                >
                  {e.addedBy.company.name}
                </a>
              </td>
              <td>
                <FaEye />
              </td>
              {countriesList.find((country) =>
                    country.label.toLowerCase().trim() === e.addedBy.company.country.toLowerCase().trim()
                )?.value || e.addedBy.company.country}
              <td>{e.partModel}</td>
              <td>
                <MdShowChart />
              </td>
              <td>
                {e.ts ? (
                  <IoCheckmarkCircle
                    style={{ color: "var(--primary-color)" }}
                  />
                ) : (
                  <BiBlock />
                )}
              </td>
              <td>{e.heciClei}</td>
              <td>{e.mfg}</td>
              <td>{e.cond}</td>
              <td>{e.price}</td>
              <td>{e.quantity}</td>
              <td>{e.age}</td>
              <td>{e.productDescription}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Cart</th>
            <th><img src={shieldImage} alt="" srcset="" style={{ width: "18px", fontWeight: "bold" }} /> </th>
            <th>Company</th>
            <th>PVR</th>
            <th>Ctry</th>
            <th>Part / Model</th>
            <th>History</th>
            <th>TS</th>
            <th>HECI / CLEI</th>
            <th>Mfg</th>
            <th>Cond</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Age</th>
            <th>Product Description</th>
          </tr>
        </tfoot>
      </table>
      <div className={css.tablePagination}>
        <button type="button" onClick={handlePrevPage} disabled={page === 1}>
          ⬅️
        </button>
        <span>
          {page}/{totalPages}
        </span>
        <button
          type="button"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          ➡️
        </button>
      </div>
    </div>
  );
});

export default SearchProduct;

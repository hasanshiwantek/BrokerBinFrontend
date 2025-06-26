import React from "react";
import css from "../../styles/SearchProducts.module.css";
import HoverDropdown from "@/HoverDropdown";
import EyeDropdown from "@/EyeDropDown";
import { IoCheckmarkCircle } from "react-icons/io5";
import { BiBlock } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  setTogglePopUp,
  setPopupCompanyDetail,
  setHoverCompanyDetail,
} from "@/ReduxStore/SearchProductSlice";

const ProductTable = ({
  data = [],
  handleSort,
  sortBy,
  sortOrder,
  isSelected,
  selectProduct,
  loggedInUserCompany,
  countriesList,
  alternateRowColors,
  showBorders,
  itemsPerPage,
  doubleVision,
  itemsPerPage
}) => {

  const dispatch = useDispatch();

  const {
        selectedProducts,
        searchResponseMatched,
        appliedFilters,
      } = useSelector((store) => store.searchProductStore);

      console.log("Items Per Page: ",itemsPerPage);
      
      console.log("Length",data.length);
      
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
  return (
    <table className={showBorders ? css.withBorders : ""}>
      <thead>
        <tr>
          <th>Cart</th>
          <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
            Company
            {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          <th>PVR</th>
          <th
            onClick={() => handleSort("company_country")}
            style={{ cursor: "pointer" }}
          >
            Ctry
            {sortBy === "company_country" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          <th
            onClick={() => handleSort("partModel")}
            style={{ cursor: "pointer" }}
          >
            Part / Model
            {sortBy === "partModel" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          <th>TS</th>
          <th
            onClick={() => handleSort("heciClei")}
            style={{ cursor: "pointer" }}
          >
            HECI / CLEI
            {sortBy === "heciClei" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          <th onClick={() => handleSort("mfg")} style={{ cursor: "pointer" }}>
            Mfg {sortBy === "mfg" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          <th onClick={() => handleSort("cond")} style={{ cursor: "pointer" }}>
            Cond {sortBy === "cond" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          <th onClick={() => handleSort("price")} style={{ cursor: "pointer" }}>
            Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          <th
            onClick={() => handleSort("quantity")}
            style={{ cursor: "pointer" }}
          >
            Qty {sortBy === "quantity" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          <th
            onClick={() => handleSort("created_at")}
            style={{ cursor: "pointer" }}
          >
            Age {sortBy === "created_at" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          {!doubleVision && (
            <th onClick={() => handleSort("productDescription")} style={{ cursor: "pointer" }}>
              Product Description
              {sortBy === "productDescription" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data?.slice()?.sort((a, b) => {
          const isAUserCompany =
            a.addedBy?.company?.name?.toLowerCase() ===
            loggedInUserCompany?.toLowerCase();
          const isBUserCompany =
            b.addedBy?.company?.name?.toLowerCase() ===
            loggedInUserCompany?.toLowerCase();
          if (isAUserCompany && !isBUserCompany) return -1;
          if (!isAUserCompany && isBUserCompany) return 1;
          return 0;
        })?.map((e, i) => (
          <tr
            key={i}
            style={
              e?.addedBy?.company?.name?.toLowerCase() ===
                loggedInUserCompany?.toLowerCase()
                ? { backgroundColor: "#ffb" }
                : alternateRowColors && i % 2 === 0
                  ? { backgroundColor: "#f5f5f5" }
                  : { backgroundColor: "#ffff" }
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
            <td>
              <HoverDropdown
                type="company"
                id={e?.addedBy?.company?.id}
                company={e?.addedBy?.company}
                triggerElement={
                  <a
                    style={{ color: "#428bca", fontWeight: "600" }}
                    onClick={(event) =>
                      handleShowPopupCompanyDetails(event, e?.addedBy?.company?.id)
                    }
                    onMouseEnter={(event) => handleHoverCompanyDetail(event, e.id)}
                  >
                    {e?.addedBy?.company?.name}
                  </a>
                }
              />
            </td>
            <td className="cursor-pointer">
              <EyeDropdown
                rowData={e}
                triggerElement={<div><FaEye /></div>}
              />
            </td>
            <td>
              {countriesList.find(
                (country) =>
                  country.label.toLowerCase().trim() ===
                  e?.addedBy?.company?.country?.toLowerCase().trim()
              )?.value || e?.addedBy?.company?.country || "N/A"}
            </td>
            <td className="cursor-pointer">
              <HoverDropdown
                type="part"
                id={e?.id}
                rowData={e}
                triggerElement={<div>{e?.partModel}</div>}
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
            {!doubleVision && <td>{e?.productDescription}</td>}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th>Cart</th>
          <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
            Company
            {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          <th>PVR</th>
          <th
            onClick={() => handleSort("company_country")}
            style={{ cursor: "pointer" }}
          >
            Ctry
            {sortBy === "company_country" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          <th
            onClick={() => handleSort("partModel")}
            style={{ cursor: "pointer" }}
          >
            Part / Model
            {sortBy === "partModel" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          <th>TS</th>
          <th
            onClick={() => handleSort("heciClei")}
            style={{ cursor: "pointer" }}
          >
            HECI / CLEI
            {sortBy === "heciClei" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          <th onClick={() => handleSort("mfg")} style={{ cursor: "pointer" }}>
            Mfg {sortBy === "mfg" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          <th onClick={() => handleSort("cond")} style={{ cursor: "pointer" }}>
            Cond {sortBy === "cond" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          <th onClick={() => handleSort("price")} style={{ cursor: "pointer" }}>
            Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          <th
            onClick={() => handleSort("quantity")}
            style={{ cursor: "pointer" }}
          >
            Qty {sortBy === "quantity" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          <th
            onClick={() => handleSort("created_at")}
            style={{ cursor: "pointer" }}
          >
            Age {sortBy === "created_at" && (sortOrder === "asc" ? "↑" : "↓")}
          </th>
          {/* <th
            onClick={() => handleSort("productDescription")}
            style={{ cursor: "pointer" }}
          >
            Product Description
            {sortBy === "productDescription" && (sortOrder === "asc" ? "↑" : "↓")}
          </th> */}
          {!doubleVision &&(
            <th onClick={() => handleSort("productDescription")} style={{ cursor: "pointer" }}>
              Product Description
              {sortBy === "productDescription" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
          )}
        </tr>
      </tfoot>
    </table>
  );
};

export default ProductTable;

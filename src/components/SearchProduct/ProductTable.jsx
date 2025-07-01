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
  searchProductQuery,
} from "@/ReduxStore/SearchProductSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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
  doubleVision,
  itemsPerPage,
  showDetails,
  forceDescriptions,
}) => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { searchResponseMatched } = useSelector(
    (store) => store.searchProductStore
  );

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

  const handleDescriptionClick = (desc) => {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.delete("query"); // remove old part
    newSearchParams.set("search", desc); // optionally, add new param to reflect current state
    navigate({
      pathname: location.pathname,
      search: newSearchParams.toString(),
    });
    dispatch(
      searchProductQuery({
        token,
        search: desc,
      })
    );
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
          {(!doubleVision || (doubleVision && forceDescriptions)) && (
            <th
              onClick={() => handleSort("productDescription")}
              style={{ cursor: "pointer" }}
            >
              Product Description
              {sortBy === "productDescription" &&
                (sortOrder === "asc" ? "↑" : "↓")}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data
          ?.slice()
          ?.sort((a, b) => {
            const isAUserCompany =
              a.addedBy?.company?.name?.toLowerCase() ===
              loggedInUserCompany?.toLowerCase();
            const isBUserCompany =
              b.addedBy?.company?.name?.toLowerCase() ===
              loggedInUserCompany?.toLowerCase();
            if (isAUserCompany && !isBUserCompany) return -1;
            if (!isAUserCompany && isBUserCompany) return 1;
            return 0;
          })
          ?.map((e, i) => (
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
                  triggerElement={<div>{e?.partModel}</div>}
                />

                {showDetails &&
                  (() => {
                    const skype =
                      e?.addedBy?.company?.primaryContact?.imScreenNames?.skype;
                    const trillian =
                      e?.addedBy?.company?.primaryContact?.imScreenNames
                        ?.trillian;
                    const phone =
                      e?.addedBy?.company?.primaryContact?.phoneNumber;
                    const fax = e?.addedBy?.company?.primaryContact?.faxNumber;
                    const firstName =
                      e?.addedBy?.company?.primaryContact?.firstName;
                    const lastName =
                      e?.addedBy?.company?.primaryContact?.lastName;

                    const hasAnyInfo =
                      skype ||
                      trillian ||
                      phone ||
                      fax ||
                      firstName ||
                      lastName;

                    if (!hasAnyInfo) return null;

                    return (
                      <div className="flex justify-start items-center gap-4 p-2">
                        {/* <div className="relative group cursor-pointer">
                          <div className=" cursor-pointer ">
                            <img
                              src="https://static.brokerbin.com/version/v8.4.2/images/seller.png"
                              alt="Contact Person"
                            />
                            <div className="absolute top-0 left-0 z-50 hidden group-hover:flex flex-col bg-white border shadow-md p-2 rounded min-w-max">
                              <span className="text-sm font-semibold text-gray-700">
                                {firstName} {lastName}
                              </span>
                            </div>
                          </div>
                        </div> */}

                        {skype && (
                          <div className="flex items-center gap-2 mr-4">
                            <img
                              src="https://ben.cachefly.net/images/social_networks/tiny_skype.png"
                              alt="Skype"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                            <a
                              href={`skype:${skype}?chat`}
                              className="!text-[#444] lowercase text-base font-semibold"
                            >
                              {skype}
                            </a>
                          </div>
                        )}

                        {trillian && (
                          <div className="flex items-center gap-2 mr-4">
                            <img
                              src="https://ben.cachefly.net/images/social_networks/tiny_trillian.png"
                              alt="Trillian"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                            <a
                              href={`#`}
                              className="!text-[#444] lowercase text-base font-semibold"
                            >
                              {trillian}
                            </a>
                          </div>
                        )}

                        {phone && (
                          <div className="flex items-center gap-1 mr-4">
                            <span className="text-base font-semibold">Ph:</span>
                            <a
                              href={`tel:${phone}`}
                              className="!text-[#444] text-base"
                            >
                              {phone}
                            </a>
                          </div>
                        )}

                        {fax && (
                          <div className="flex items-center gap-1">
                            <span className="text-base font-semibold">Fx:</span>
                            <a
                              href={`fax:${fax}`}
                              className="!text-[#444] text-base"
                            >
                              {fax}
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })()}
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
              {(!doubleVision || (doubleVision && forceDescriptions)) && (
                <td
                  className="cursor-pointer"
                  onClick={() => handleDescriptionClick(e?.productDescription)}
                >
                  {e?.productDescription}
                </td>
              )}
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
          {(!doubleVision || (doubleVision && forceDescriptions)) && (
            <th
              onClick={() => handleSort("productDescription")}
              style={{ cursor: "pointer" }}
            >
              Product Description
              {sortBy === "productDescription" &&
                (sortOrder === "asc" ? "↑" : "↓")}
            </th>
          )}
        </tr>
      </tfoot>
    </table>
  );
};

export default ProductTable;

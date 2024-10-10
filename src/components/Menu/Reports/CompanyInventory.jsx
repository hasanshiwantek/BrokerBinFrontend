import React, { useEffect } from "react";
import css from "../../../styles/Menu/Reports/TopSearches.module.css";
import style from "../../../styles/Menu/Reports/Company.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCompanyInventory, getTopSearch } from "../../../ReduxStore/Reports";
import Cookies from "js-cookie";

const CompanyInventory = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
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

  // Fetch data whenever 'page' or 'searchString' changes
  useEffect(() => {
    dispatch(getCompanyInventory({ token, id, page }));
  }, [token, page, dispatch]);

  // Handle pagination
  const handlePrevPage = () => {
    const newPage = page - 1;
    const url = `/reports/companyInventory?id=${id}&page=${newPage}`;
    navigate(url, {
      replace: true,
    });
  };

  const handleNextPage = () => {
    const newPage = page + 1;
    const url = `/reports/companyInventory?id=${id}&page=${newPage}`;
    navigate(url, {
      replace: true,
    });
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={css.container} style={{ margin: "1rem" }}>
      <div className={style.navTabs}>
        <ul>
          <li>
            <Link to={"/reports/Company"}>Company</Link>
          </li>
          <li>
            <Link to={"/reports/sitewide"}>Site Wide</Link>
          </li>
          <li>
            <Link to={"/reports/email"}>Email</Link>
          </li>
          <li>
            <Link to={"/reports/serviceStats"}>Stats</Link>
          </li>
        </ul>
      </div>
      {/* Recent Searches Section */}
      <div className={css.topSearches}>
        <h3>Company Inventory</h3>
        <table>
          <thead>
            <tr>
              <th>cart</th>
              <th>Part/Model</th>
              <th>Company</th>
              <th>Cond</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Mfg</th>
              <th>Age</th>
              <th>Description/Notes</th>
            </tr>
          </thead>
          <tbody>
            {searchedCompanyInventory.map((item, i) => {
              return (
                <tr key={item.id}>
                  <td>
                    <input type="checkbox" name={item.id} id={item.id} />
                  </td>
                  <td>{item.partModel}</td>
                  <td>{item.addedBy.company.name}</td>
                  <td>{item.cond}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.mfg}</td>
                  <td>{item.age}</td>
                  <td>{item.productDescription}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>cart</th>
              <th>Part/Model</th>
              <th>Company</th>
              <th>Cond</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Mfg</th>
              <th>Age</th>
              <th>Description/Notes</th>
            </tr>
          </tfoot>
        </table>
        <div className={css.topSearchButtons}>
          <button type="button" className={style.basicButton}>
            Add To Part Cart
          </button>
          <button type="button" className={style.basicButton}>
            View Part Cart
          </button>
        </div>
      </div>
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
};

export default CompanyInventory;

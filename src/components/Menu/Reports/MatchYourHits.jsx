import React, { useEffect } from "react";
import css from "../../../styles/Menu/Reports/MatchYourHits.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMatchYourHits } from "../../../ReduxStore/Reports";
import Cookies from "js-cookie";

const MatchYourHits = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const { matchYourHits, loading, error } = useSelector(
    (store) => store.reports
  );
  const data = [
    {
      age: "0 Hrs",
      query: "P00330-B21",
      contact: "Mike B.",
      company: "CTS Point Inc.",
      phone: "209-288-0443",
      directPhone: "209-288-0443",
      fax: "N/A",
      qty: 2,
      highlighted: false,
    },
    {
      age: "4 Hrs",
      query: "P00330-B21",
      contact: "Arslan Muhammed",
      company: "Maxicom Global Pte Ltd",
      phone: "437 996 2283",
      directPhone: "209-288-0443",
      fax: "N/A",
      qty: 9,
      highlighted: true,
    },
  ];
  useEffect(() => {
    dispatch(getMatchYourHits({ token }));
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={css.container}>
      {/* Navigation Tabs */}
      <div className={css.navTabs}>
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
      <div className={css.tableContainer}>
        <table className={css.dataTable}>
          <thead>
            <tr>
              <th></th>
              <th>Age</th>
              <th>Query</th>
              <th>Contact</th>
              <th>Company</th>
              <th>Phone</th>
              <th>Direct Phone</th>
              <th>Fax</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody>
            {matchYourHits.map((item, index) => (
              <tr
                key={index}
                className={item.highlighted ? css.highlighted : ""}
              >
                <td>
                  <input
                    type="checkbox"
                    name={item.company}
                    id={item.company}
                  />
                </td>
                <td>{item.age}</td>
                <td>{item.query}</td>
                <td>{item.SearchedBy.firstName}</td>
                <td>{item.company.name}</td>
                <td>{item.SearchedBy.phoneNumber}</td>
                <td>{item.SearchedBy.phoneNumber}</td>
                <td>{item.SearchedBy.phoneNumber}</td>
                <td>{item.inventory.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatchYourHits;

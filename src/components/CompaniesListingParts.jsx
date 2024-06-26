import { React, memo } from "react";
import css from "../styles/CompaniesListingParts.module.css";
import { tableData } from "../data/tableData";
import { FaWindowClose } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsFillPersonXFill, BsPersonAdd } from "react-icons/bs";
import {
  MdPersonAddAlt1,
  MdPersonRemove,
  MdPersonRemoveAlt1,
} from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import { setCompaniesListingParts } from "../ReduxStore/SearchProductSlice";
import { useDispatch } from "react-redux";

const CompaniesListingParts = () => {
  const dispatch = useDispatch();

  return (
    <div className={css.companies_Listing_Parts}>
      <div id={css.caption}>
        <p>Companies Listing Parts</p>
        <button
          type="button"
          onClick={() => dispatch(setCompaniesListingParts())}
        >
          <FaWindowClose />
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Ctry</th>
            <th>St</th>
            <th>Hrs</th>
            <th>Ship By</th>
            <th>Phone</th>
            <th>Fax</th>
            <th>Details</th>
            <th>MyVen</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((e, i) => {
            return (
              <tr className="tableData" key={i}>
                <td>{e.company}</td>
                <td>{e.country}</td>
                <td>{e.model}</td>
                <td>{e.mfg}</td>
                <td>{e.cond}</td>
                <td>{e.price}</td>
                <td>{e.quantity}</td>
                <td>
                  <AiOutlineInfoCircle />
                </td>
                <td>
                  <span>
                    <MdPersonAddAlt1 />
                    <BiDollar />
                    <BsFillPersonXFill />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>
              * This Company Listing Feature can be disabled in your Personal
              Options
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default memo(CompaniesListingParts);

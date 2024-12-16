import React, { memo, useEffect, useState } from "react";
import css from "../../../styles/Menu/Manage/RfqTable.module.css";
import { tableData } from "../../../data/tableData";
import SearchComponent from "../../SearchComponent.jsx";
import { AiFillMail, AiOutlineMail } from "react-icons/ai";
import RfqTablePopUp from "../../Popups/RfqTablePopUp.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
    setTogglePopUp as setTogglePopUpRfq,
    setRfqPopBoxInfo,
    setRfqMail,
    setRfqMailCheckAll,
    setCurrentPageNext,
    setCurrentPagePrev,
} from "../../../ReduxStore/RfqSlice.js";
import { IoMail, IoMailOpen } from "react-icons/io5";
import { sentRfq } from "../../../ReduxStore/RfqSlice.js";
import Cookies from "js-cookie";
import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
import { NavLink } from "react-router-dom";
import { setPopupCompanyDetail } from "../../../ReduxStore/SearchProductSlice.js";
import CompanyDetails from "../../Popups/CompanyDetails/CompanyDetails.jsx";

import {
    setTogglePopUp as setTogglePopUpCompany
} from "../../../ReduxStore/SearchProductSlice";




const RfqTable = () => {


    const { togglePopUp: togglePopUpRfq, rfqMail, rfqMailCheckAll, currentPage } = useSelector(
        (state) => state.rfqStore
    );


    const { togglePopUp: togglePopUpCompany } = useSelector((state) => state.searchProductStore)

    const { popupCompanyDetail } = useSelector((state) => state.searchProductStore)

    const dispatch = useDispatch();

    const token = Cookies.get("token");

    const { sentRfqData } = useSelector((state) => state.rfqStore)
    console.log("Data From Page", sentRfqData)


    const sentData = sentRfqData.data || [];
    console.log("SENDATA", sentData)



    const companyData = sentData?.map((item) => {
        return item.to?.map((recipient) => recipient.company?.name);
    });

    console.log("Company Names: ", companyData);


    console.log("Sent Data Received", sentData)

    useEffect(() => {
        dispatch(sentRfq({ token }))
    }, [])






    const itemsPerPage = 20;
    const sliceTo = currentPage * itemsPerPage;
    const sliceFrom = sliceTo - itemsPerPage;
    const currentItems = sentData.slice(sliceFrom, sliceTo);
    console.log("CURRENT ITEMS", currentItems)

    const prevPage = () => {
        if (currentPage === 1) {
            return;
        }
        dispatch(setCurrentPagePrev());
    };

    const nextPage = () => {
        if (currentPage === Math.ceil(tableData.length / itemsPerPage)) {
            return;
        }
        dispatch(setCurrentPageNext());
    };

    const now = new Date();
    const date = `${now.getHours() > 12
        ? (now.getHours() % 12) +
        `:` +
        (now.getMinutes() < 9 ? `0` + now.getMinutes() : now.getMinutes()) +
        `PM`
        : `0` +
        now.getHours() +
        `:` +
        (now.getMinutes() < 9 ? `0` + now.getMinutes() : now.getMinutes()) +
        `AM`
        } ${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`;

    // const handleShowPopupRfq = (event, { id }) => {
    //     event.stopPropagation(); // Prevent the event from propagating to the row click event
    //     dispatch(setTogglePopUp());
    //     dispatch(setRfqPopBoxInfo(currentItems.filter((item) => item.id === id)));
    // };

    const handleShowPopupRfq = (event, { id }) => {
        event.stopPropagation();

        console.log("ID Passed:", id);
        console.log("Current ITEMS Available:", currentItems);

        const filteredData = currentItems.filter((item) => item.id == id); // Use == for loose comparison
        console.log("Filtered Data:", filteredData); // Should now show the filtered result
        dispatch(setTogglePopUpRfq());
        dispatch(setRfqPopBoxInfo(filteredData));
    };






    const handleCheckboxClick = (event, id) => {
        event.stopPropagation(); // Prevent the event from propagating to the row click event
        if (event.target.checked) {
            const mails = currentItems.filter((m) => m.id === id);
            dispatch(setRfqMail([...rfqMail, ...mails]));
        } else {
            dispatch(setRfqMail(rfqMail.filter((e) => e.id !== id)));
        }
    };

    const handleCheckboxClickAll = (event) => {
        event.stopPropagation(); // Prevent the event from propagating to the row click event
        dispatch(setRfqMailCheckAll(event.target.checked));
        if (event.target.checked) {
            dispatch(setRfqMail(currentItems));
        } else {
            dispatch(setRfqMail([]));
        }
    };


    // Company Modal Logic
    const openCompanyModal = (company) => {
        console.log("Opening Company Modal with Company:", company);
        dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
        dispatch(setTogglePopUpCompany()); // Show company modal
    };
    console.log("popupCompanyDetail", popupCompanyDetail);
    console.log("togglePopUp", togglePopUpCompany);


    return (
        <>
            <div className={css.layout}>
                <div className={css.tableArea}>
                    <div className={css.rfqTable}>

                        <div className={myProfile.profileInfo_links}>
                            <ul>
                                <li>
                                    <NavLink
                                        to="/rfq"
                                        className={({ isActive }) => (isActive ? myProfile.active : '')}
                                    >
                                        <span>Received</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/rfqSent"
                                        className={({ isActive }) => (isActive ? myProfile.active : '')}
                                    >
                                        <span>Sent({sentRfqData.totalCount})</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) => (isActive ? myProfile.active : '')}
                                    >
                                        <span>New</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) => (isActive ? myProfile.active : '')}
                                    >
                                        <span>Archeive</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className={css.rfqTableDetail}>
                            <SearchComponent />
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <span>
                                                <input
                                                    type="checkbox"
                                                    name=""
                                                    id=""
                                                    onChange={handleCheckboxClickAll}
                                                    checked={rfqMailCheckAll}
                                                />
                                                status
                                            </span>
                                        </th>
                                        <th>Qty</th>
                                        <th>Parts</th>
                                        <th>PO subject</th>
                                        <th>to</th>
                                        <th>Company</th>
                                        <th>date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sentData?.map((e) => (
                                        <tr
                                            className={css.tableData}
                                            key={e.id}
                                            onClick={(event) => {
                                                console.log("Row Clicked")
                                                handleShowPopupRfq(event, e);
                                            }}
                                        >
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    name="addToCart"
                                                    id="addToCart"
                                                    onClick={(event) => event.stopPropagation()}
                                                    onChange={(event) => handleCheckboxClick(event, e.id)}
                                                    checked={
                                                        rfqMail.some((mail) => mail.id === e.id) ||
                                                        rfqMailCheckAll
                                                    }
                                                />
                                                <td>(0|1)</td>
                                                {/* {!e.read ? <IoMail /> : <IoMailOpen />} */}
                                                <img src="https://static.brokerbin.com/version/v8.2.9/images/New.png" alt="" srcset="" />
                                            </td>
                                            <td>
                                                {e.quantities?.reduce((total, quantity) => total + Number(quantity), 0)}
                                            </td>

                                            <td>
                                                {e.partNumbers?.length > 1 ? (
                                                    <>
                                                        <td>{e.partNumbers.length} Parts</td>
                                                        <div className={css.companyDropdown}>
                                                            {e.partNumbers.map((part, index) => (
                                                                <div key={index} className={css.companyItem}>
                                                                    {part}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <td>{e.partNumbers[0]}</td>
                                                )}
                                            </td>
                                            <td>
                                                {e.subject}
                                            </td>
                                            <td>
                                                {e.to?.length > 1 ? (
                                                    <>
                                                        <span>{e.to.length} Recipients</span>
                                                        <div className={css.companyDropdown}>
                                                            {e.to.map((recipient, index) => (
                                                                <div key={index} className={css.companyItem}>
                                                                    {recipient.firstName} {recipient.lastName}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <td>{e.to[0]?.firstName} {e.to[0]?.lastName}</td>
                                                )}
                                            </td>
                                            <td>
                                                {e.to?.length > 1 ? (
                                                    <>
                                                        <span>{e.to.length} Companies</span>
                                                        <div className={`${css.companyDropdown} `}>
                                                            {e.to.map((recipient, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={css.companyItem}
                                                                    onClick={() => openCompanyModal(recipient.company)}
                                                                >
                                                                    {recipient.company?.name}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <td
                                                        onClick={() => openCompanyModal(e.to[0]?.company)}
                                                    >
                                                        {e.to[0]?.company.name}
                                                    </td>
                                                )}
                                            </td>

                                            <td>{e.updated_at}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className={css.rfqTableDetailBottom}>
                                    <tr>
                                        <th>
                                            <span>
                                                <input
                                                    type="checkbox"
                                                    name=""
                                                    id=""
                                                    onChange={handleCheckboxClickAll}
                                                    checked={rfqMailCheckAll}
                                                />
                                                status
                                            </span>
                                        </th>
                                        <th>Qty</th>
                                        <th>Parts</th>
                                        <th>PO subject</th>
                                        <th>to</th>
                                        <th>company</th>
                                        <th>date</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className={css.rfqTableBtn_bottom}>
                            <div>
                                <button type="button">send</button>
                                <button type="button">reset</button>
                                <button type="button">reply</button>
                                <button type="button">forward</button>
                                <button type="button">archive</button>
                                <button type="button">mark as read</button>
                                <button type="button">mark as unread</button>
                            </div>
                            <div className={css.pagination}>
                                <button onClick={prevPage}>prev</button>
                                <p>{currentPage}</p>
                                <button onClick={nextPage}>next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {togglePopUpRfq && <RfqTablePopUp type="sent" />}
            {togglePopUpCompany && <CompanyDetails closeModal={() => dispatch(setTogglePopUpCompany())} />}
        </>
    );
};

export default memo(RfqTable);

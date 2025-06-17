import React, { useState, useEffect } from "react";
import css from "../../../styles/SearchProducts.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "../../../styles/Menu/Manage/MyProfile.module.css";
import Cookies from "js-cookie";
import axios from "axios";
import { brokerAPI } from "@/components/api/BrokerEndpoint";
import ListDetailModal from "@/components/partCart/ListDetailModal";

const SavedList = () => {
    const { togglePopUp } = useSelector((store) => store.searchProductStore);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = Cookies.get("token")
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [savedLists, setSavedLists] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [activeList, setActiveList] = useState(null)

    useEffect(() => {
        const fetchSavedLists = async () => {
            try {
                const response = await axios.get(`${brokerAPI}part-cart/get-list`, {
                    params: {
                        name: searchInput,
                        sortBy,
                        sortOrder,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setSavedLists(response.data.data); // ✅ store response
            } catch (err) {
                console.error("Failed to fetch saved lists:", err);
            }
        };

        fetchSavedLists();
    }, [searchInput, sortBy, sortOrder]);

    return (
        <div className="justify-center flex">
            <div
                className={`${css.productTableDetail} m-24 w-[70vw] !bg-[#e8e8e8] rounded-lg !p-[6px]`}
            >
                <div className={styles.profileInfo_links}>
                    <ul>
                        <li>
                            <NavLink
                                to="/cartpart"
                                end
                                className={({ isActive }) => (isActive ? styles.active : "text-gray-500")}
                            >
                                <span>Part Cart / BOM Utility</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/bomarchive/list"
                                end
                                className={({ isActive }) => (isActive ? styles.active : "")}
                            >
                                <span>Saved List(s)</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className={`${css.tableContainer} !bg-[#bfbfbf]`}>
                    <div className="flex justify-between items-center px-2 py-0 bg-[#bfbfbf]">
                        <h3 className="text-2xl text-white">Saved List(s)</h3>
                        <div className="flex items-center gap-2">
                            <label className="text-white text-sm font-semibold">Name Search:</label>
                            <input
                                type="text"
                                placeholder=""
                                className="p-2 rounded-sm text-md"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setSearchInput(e.target.value);
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>%</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>PO in Hand</th>
                                <th>OEM Quote</th>
                                <th>Due Date</th>
                                <th>Items</th>
                                <th>Total Parts</th>
                            </tr>
                        </thead>

                        <tbody>
                            {savedLists?.length > 0 ? (
                                savedLists.map((list, index) => (
                                    <tr key={index} className="!whitespace-normal">
                                        <td>
                                            <input
                                                type="radio"
                                                name="savedListRadio"
                                                checked={selectedRowId === index}
                                                onChange={() => setSelectedRowId(index)}
                                            />
                                        </td>
                                        <td></td>
                                        <td>
                                            <a
                                                onClick={() => setActiveList(list)}
                                                className="text-blue-600 font-semibold cursor-pointer"
                                            >
                                                {list.name}
                                            </a>
                                        </td>
                                        <td>{list.date || ""}</td>
                                        <td>{list.po_in_hand ? "Yes" : "No"}</td>
                                        <td>{list.oem_quote ? "Yes" : "No"}</td>
                                        <td>{list.due_date}</td>
                                        <td>{list.parts?.filteredQty || ""}</td>
                                        <td>{list.parts.length}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="15">
                                        <h2 className="!text-red-700 !text-lg !text-center !font-bold">
                                            No Result Found
                                        </h2>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        <thead>
                            <tr>
                                <th></th>
                                <th>%</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>PO in Hand</th>
                                <th>OEM Quote</th>
                                <th>Due Date</th>
                                <th>Items</th>
                                <th>Total Parts</th>
                            </tr>
                        </thead>

                    </table>
                    {/* Pagination Controls */}
                    <div className=" flex items-center gap-2">
                        <button
                            type="button"
                            onClick={""}
                            className="!text-[0.98vw] !flex !justify-start !gap-8 !py-[0.6rem] !px-4 !bg-blue-500 !text-white !capitalize"
                        >
                            Delete List
                        </button>
                        <button
                            type="button"
                            onClick={""}
                            className="!text-[0.98vw] !flex !justify-start !gap-8 !py-[0.6rem] !px-4 !bg-blue-500 !text-white !capitalize"
                        >
                            ReRun BOM
                        </button>
                        <button
                            type="button"
                            onClick={""}
                            className="!text-[0.98vw] !flex !justify-start !gap-8 !py-[0.6rem] !px-4 !bg-blue-500 !text-white !capitalize"
                        >
                            PDF
                        </button>
                        <button
                            type="button"
                            onClick={""}
                            className="!text-[0.98vw] !flex !justify-start !gap-8 !py-[0.6rem] !px-4 !bg-blue-500 !text-white !capitalize"
                        >
                            Export List
                        </button>
                    </div>
                </div>
            </div>
            {activeList && (
                <ListDetailModal list={activeList} onClose={() => setActiveList(null)} />
            )}
        </div>
    );
};

export default SavedList;
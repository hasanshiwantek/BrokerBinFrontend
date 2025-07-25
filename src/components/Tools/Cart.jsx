import React, { useState, useRef, useEffect, useMemo } from "react";
import css from "../../styles/Tools/Cart.module.css";
import Accordion from "../Accordion";
import LearnMore from "./LearnMore";
import { useDispatch, useSelector } from "react-redux";
import Tick from "../../svgs/Tick";
import { useNavigate, Link } from "react-router-dom";
import {
  setSelectedProductsForCart,
  fetchCartItems,
  deleteCartItem,
  clearCartItems,
  updatePartcartNote,
  deletePartCartNotes,
  fetchCartItemsAgain
} from "@/ReduxStore/SearchProductSlice";
import Note from "../partCart/Note";
import Export from "../partCart/Export";
import SaveListModal from "../partCart/SaveListModal";
import Cookies from "js-cookie";
import axios from "axios";
import { brokerAPI } from "../api/BrokerEndpoint";
import { setTogglePopUp } from "@/ReduxStore/SearchProductSlice";
import { setPopupCompanyDetail } from "@/ReduxStore/SearchProductSlice";
import PopupAlert from "@/components/Popups/PopupAlert";

const Cart = () => {
  const [selectedParts, setSelectedParts] = useState([]);
  const [filterOption, setFilterOption] = useState("cnt_DESC");
  const [showExportModal, setShowExportModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSaveListModal, setShowSaveListModal] = useState(false);
  const [showParts, setShowParts] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });

    setTimeout(() => {
      setPopup((prev) => ({ ...prev, show: false }));
    }, 2000);
  };
  const selectedProducts = useSelector(
    (state) => state.searchProductStore.selectedProductsForCart
  );
    const cartItems = useSelector(
    (state) => state.searchProductStore.cartItems
  );
  console.log("Cart Items: ",cartItems);
  
  console.log("Selected Products: ", selectedProducts);

  let count = 0;
  for (let i = 0; i < selectedProducts.length; i++) {
    if (selectedProducts[i]?.inventory != null) {
      count++;
    }
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("token");

  // MODAL COMPANY LOGIC
  const { togglePopUp, popupCompanyDetail } = useSelector(
    (state) => state.searchProductStore
  );

  // Company Modal Logic
  const openCompanyModal = (company) => {
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUp()); // Show company modal
  };

  // const groupedByCompany = selectedProducts.reduce((acc, item) => {
  // const company = item?.inventory?.addedBy?.company?.name;
  // if (!company) return acc;
  const groupedByCompany = selectedProducts.reduce((acc, item) => {
    const company =
      item?.inventory?.addedBy?.company?.name || "Unknown Company";
    console.log("companyfrom cart", company);
    if (!acc[company]) acc[company] = [];
    acc[company].push(item);
    return acc;
  }, {});

  const handleClear = async () => {
    const isConfirmed = window.confirm("Confirm Cart Deletion?");
    if (isConfirmed) {
      try {
        const result = await dispatch(clearCartItems({ token })).unwrap();

        if (result?.status) {
          showPopup("success", result?.message || "Cart cleared successfully!");

          window.location.reload(300);
          // Optional: refresh UI or state if needed
        } else {
          showPopup("warning", "Cart clear action didn't succeed.");
        }
      } catch (error) {
        console.error("Failed to clear cart:", error);
        showPopup(
          "error",
          error?.message || "Failed to clear cart. Please try again."
        );
      }
    }
  };

  const handleRemove = async () => {
    if (!selectedParts.length) {
      showPopup("warning", "You must select at least one part!");

      return;
    }
    setLoading(true);
    try {
      const updated = selectedProducts.filter(
        (item) => !selectedParts.some((p) => p.id === item.id)
      );
      dispatch(setSelectedProductsForCart(updated));

      const ids = selectedParts.map((item) => item.id);

      if (!ids.length) return;

      const result = await dispatch(deleteCartItem({ token, ids })).unwrap();
      console.log("Delete result:", result);

      if (result?.status) {
        showPopup("success", "Selected parts removed from cart!");
      } else {
        showPopup("warning", "Some parts may not have been removed.");
      }
    } catch (error) {
      console.error("Error while removing parts:", error);

      showPopup("error", "Failed to remove selected parts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const createRfq = () => {
    if (!selectedParts.length) {
      showPopup("warning", "You must select at least one part!");

      return;
    }
    const normalizedParts = selectedParts.map((item) => ({
      id: item.inventory.id,
      partModel: item.inventory.partModel,
      heciClei: item.inventory.heciClei || "",
      mfg: item.inventory.mfg || "",
      cond: item.inventory.cond || "",
      quantity: item.inventory.quantity || "",
      price: item.inventory.price || "",
      addedBy: item.inventory.addedBy,
    }));
    navigate("/rfq/create", {
      state: { selectedRows: normalizedParts },
    });
  };

  const handlePdfExport = async () => {
    if (selectedProducts.length === 0) {
      alert("No parts available to export.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${brokerAPI}part-cart/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob", // Important for PDF
      });
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      window.open(url); // Open PDF in new tab
    } catch (error) {
      console.error("Failed to export PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCartPdfExport = async () => {
    if (selectedProducts.length === 0) {
      alert("No parts available to export.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `${brokerAPI}part-cart/pdf?isNotes=true`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    } catch (error) {
      console.error("Failed to export cart table PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initCart = async () => {
      const result = await dispatch(fetchCartItems({ token }));
      if (fetchCartItems.fulfilled.match(result)) {
        dispatch(setSelectedProductsForCart(result.payload));
      }
    };
    initCart();
  }, []);

  const [showNoteModal, setShowNoteModal] = useState(false);

  const handleToggle = (item) => {
    setSelectedParts((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  const handleAction = async (e) => {
    const action = e.target.value;
    if (action === "remove") {
      await handleRemove();
    }
    if (action === "onlythese") {
      await handleRemoveNonSelected();
    }
    if (action === "partsearch") {
      if (!selectedParts.length) {
        alert("Please select at least one part to search.");
      } else {
        const partModels = selectedParts
          .map((p) => p.partModel || p.inventory?.partModel)
          .filter(Boolean);

        if (partModels.length === 0) {
          alert("No valid part numbers found.");
        } else {
          const searchString = partModels.join(",");
          const url = `/inventory/search?page=1&query=${encodeURIComponent(
            searchString
          )}`;
          navigate(url, { replace: true });
        }
      }
    }
    e.target.value = ""; // Reset dropdown
  };

  const handleRemoveNonSelected = async () => {
    if (selectedParts.length === selectedProducts.length) {
      showPopup("info", "All parts are selected, nothing to remove.");

      return;
    }
    setLoading(true);
    try {
      // Remove items that are *not* selected
      const updated = selectedProducts.filter((item) =>
        selectedParts.some((p) => p.id === item.id)
      );
      dispatch(setSelectedProductsForCart(updated));
      const idsToRemove = selectedProducts
        .filter((item) => !selectedParts.some((p) => p.id === item.id))
        .map((item) => item.id);
      if (!idsToRemove.length) return;
      const result = await dispatch(
        deleteCartItem({ token, ids: idsToRemove })
      ).unwrap();
      console.log("Delete non-selected result:", result);
      if (result?.status) {
        showPopup("success", "Non-selected parts removed from cart!");
      } else {
        showPopup("warning", "Some parts may not have been removed.");
      }
    } catch (error) {
      console.error("Error while removing non-selected parts:", error);
      showPopup("error", "Failed to remove non-selected parts.");
    } finally {
      setLoading(false);
    }
  };

  const groupedProducts = useMemo(() => {
    const map = {};
    selectedProducts.forEach((item) => {
      const companyName = item.inventory?.addedBy?.company?.name || "";
      if (!map[companyName]) map[companyName] = [];
      map[companyName].push(item);
    });
    return map;
  }, [selectedProducts]);

  const handleNoteUpdate = (partCartId, newNote, quantity) => {
    const trimmedNote = newNote.trim();

    const payload = {
      token,
      id: partCartId,
      note: trimmedNote,
      quantity: quantity || 0,
    };

    console.log("🔄 Updating Note with Payload:", payload);

    dispatch(updatePartcartNote(payload))
      .unwrap()
      .then((res) => {
        console.log("✅ Note update response:", res);
      })
      .catch((err) => {
        console.error("❌ Note update error:", err);
      });
  };

  const handlePartSearchFromCart = () => {
    if (!selectedParts.length) {
      alert("Please select at least one part to search.");
      return;
    }

    const partModels = selectedParts
      .map((p) => p.partModel || p.inventory?.partModel)
      .filter(Boolean);

    if (partModels.length === 0) {
      alert("No valid part numbers found.");
      return;
    }

    const searchString = partModels.join(",");
    const url = `/inventory/search?page=1&partModel=${encodeURIComponent(
      searchString
    )}`;
    navigate(url, { replace: true });
  };

  const handleNotesDelete = async (noteId) => {
    if (!noteId) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmDelete) return;
    try {
      await dispatch(deletePartCartNotes({ token, ids: [noteId] })).unwrap();
      window.location.reload();
    } catch (error) {
      console.error("Deletion failed:", error);
    }
  };

  useEffect(()=>{

    dispatch(fetchCartItemsAgain({token}))
  },[])

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center py-20 min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          <span className="ml-4 text-blue-600 text-lg font-medium"></span>
        </div>
      ) : (
        <div>
          <div className={css.mainLayout}>
            <div className={css.cartListLayout}>
              <a href="#">part list</a>
              {/* <a href="/bomarchive/list">Saved list(s)</a> */}
              <Link to="/bomarchive/list">Saved list(s)</Link>
              <div className={css.cartList}>
                <div className={css.cartList_list}>
                  <h1>Part List ({count} items listed)</h1>
                  <span className={css.cartList_list_btn}>
                    <button type="button" onClick={handleCartPdfExport}>
                      PDF
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        if (!selectedParts.length) {
                          showPopup(
                            "warning",
                            "Please select atleast one part to save a list."
                          );

                          return;
                        }
                        setShowSaveListModal(true);
                      }}
                    >
                      Save
                    </button>
                  </span>
                </div>
                <div className={css.cartList_key}>
                  <h1>Key</h1>
                  <div className={css.cartList_key_details}>
                    <div>
                      <div>
                        <Tick />
                        <span>RFQ Sent</span>
                      </div>
                      <span>{cartItems?.rfqSentCount}</span>
                    </div>
                    <div>
                      <div>
                        <Tick />
                        <span>Action Needed</span>
                      </div>
                      <span>{cartItems?.actionNeededCount}</span>
                    </div>
                  </div>
                  <div className={css.cartList_key_details_pp}>
                    Problem Parts
                  </div>
                </div>
                <h1>Action</h1>
                <div className={css.cartList_action}>
                  <p>with selected</p>
                  <select
                    className={css.cartList_action_select}
                    onChange={handleAction}
                  >
                    <option value="" defaultValue="Choose an action">
                      Choose an action
                    </option>
                    <option value="partsearch">Part# Search</option>
                    <option value="remove">Remove Selected</option>
                    <option value="onlythese">Remove Non-Selected</option>
                  </select>
                  {/* </div> */}
                </div>
                <div className={css.cartList_parts}>
                  <div className="flex justify-start items-center gap-5">
                    <h1>Parts</h1>
                    <i
                      className={`cursor-pointer transition-transform duration-300 relative group `}
                      onClick={() => setShowParts((prev) => !prev)}
                    >
                      <img
                        src="https://static.brokerbin.com/version/v8.4.1/images/arrow_down.gif"
                        alt="showParts"
                        className={`cursor-pointer transition-transform duration-300 relative group ${
                          showParts ? "rotate-180" : ""
                        }`}
                      />

                      {/* Tailwind tooltip on hover */}
                      <span className="absolute top-4 left-28 -translate-x-1/2 z-10 px-2 py-1 bg-black text-white text-xl rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Expand/Collapse Part List
                      </span>
                    </i>
                  </div>

                  {showParts && (
                    <div
                      className={`transition-max-height duration-500 ease-in-out overflow-hidden mt-8 ${
                        showParts ? "max-h-[1000px]" : "max-h-0"
                      }`}
                    >
                      <div className={css.cartList_parts_scroll}>
                        <table>
                          <thead className="bg-gray-600 text-white">
                            <tr>
                              <th>Part#</th>
                              <th>Mfg</th>
                              <th>Cond</th>
                              <th>RQ</th>
                              <th>TQ</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(groupedProducts)
                              .map(([companyName, parts]) => {
                                const validParts = parts.filter(
                                  (e) =>
                                    e?.inventory?.partModel &&
                                    e?.inventory?.addedBy?.company?.name
                                );
                                return { companyName, validParts };
                              })
                              .filter(({ validParts }) => validParts.length > 0)
                              .map(({ companyName, validParts }) => (
                                <React.Fragment key={companyName}>
                                  {/* Company Header Row */}
                                  <tr className="bg-gray-200 text-left">
                                    <td
                                      colSpan="6"
                                      className="font-bold !text-[9pt] py-1 text-blue-600"
                                    >
                                      Company: {companyName}
                                    </td>
                                  </tr>

                                  {validParts.map((e) => (
                                    <React.Fragment key={e.id}>
                                      <tr className="tableData">
                                        <td className="!gap-2 flex items-center">
                                          <input
                                            type="checkbox"
                                            checked={selectedParts.some(
                                              (p) => p.id === e.id
                                            )}
                                            onChange={() => handleToggle(e)}
                                            className="h-4 w-4"
                                          />
                                          {e.inventory?.partModel}
                                        </td>
                                        <td>{e.inventory?.mfg}</td>
                                        <td>{e.inventory?.cond}</td>
                                        <td>
                                          {e.notes
                                            ?.map((note) => note.quantity)
                                            .join(", ")}
                                        </td>
                                        <td>{e.inventory?.quantity}</td>
                                      </tr>

                                      {/* Note Row */}
                                      {e.notes?.length > 0 &&
                                        e.notes.map((note) => (
                                          <tr key={note.id}>
                                            <td colSpan="6" className="pl-10">
                                              <div className="flex items-center gap-2">
                                                <span
                                                  onClick={() =>
                                                    handleNotesDelete(note.id)
                                                  }
                                                  className="text-[10px] text-red-500 cursor-pointer ml-2"
                                                >
                                                  <img
                                                    src="https://static.brokerbin.com/version/v8.4.1/images/DeleteRedX.png"
                                                    alt="deleteNote"
                                                  />
                                                </span>
                                                <input
                                                  type="text"
                                                  defaultValue={note.note}
                                                  className="text-[10px] border px-2 py-1 rounded m-1 w-full max-w-xs"
                                                  onBlur={(ev) =>
                                                    handleNoteUpdate(
                                                      note.id,
                                                      ev.target.value,
                                                      note.quantity
                                                    )
                                                  }
                                                />
                                              </div>
                                            </td>
                                          </tr>
                                        ))}
                                    </React.Fragment>
                                  ))}
                                </React.Fragment>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  <hr />
                </div>
                <h1>Action</h1>
                <div className={css.cartList_action}>
                  {/* <div> */}
                  <p>with selected</p>
                  <select
                    className={css.cartList_action_select}
                    onChange={handleAction}
                  >
                    <option value="" defaultValue="Choose an action">
                      Choose an action
                    </option>
                    <option value="partsearch">Part# Search</option>
                    <option value="remove">Remove Selected</option>
                    <option value="onlythese">Remove Non-Selected</option>
                  </select>
                  {/* </div> */}
                </div>

                <div className={css.cartList_action}></div>
              </div>
            </div>
            <div className={css.cartLay}>
              <div className={css.cartLayout}>
                {/* <h1 className="text-[#444] text-2xl text-center">Part Cart / BOM Utility</h1> */}
                <div className={css.cartLayout_options}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.currentTarget.blur();
                      handleRemove();
                    }}
                  >
                    remove
                  </button>
                  <button type="button" onClick={createRfq}>
                    create RQF
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedParts.length === 0) {
                        alert("You must select a part!");
                        return;
                      }
                      setShowNoteModal(true);
                    }}
                  >
                    add note
                  </button>
                  <div className={css.cartLayout_filter}>
                    <h1> Filter By:</h1>
                    <select onChange={(e) => setFilterOption(e.target.value)}>
                      <option value="cnt_DESC" defaultValue="Max Parts">
                        Max Parts
                      </option>
                      <option value="cnt_ASC">Min Parts</option>
                      <option value="bestmatch">** Best Match</option>
                      <option value="maxprice">Highest Price</option>
                      <option value="lowestprice">Lowest Price</option>
                    </select>
                  </div>
                  <button type="button" onClick={handlePdfExport}>
                    PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowExportModal(true)}
                  >
                    export
                  </button>
                  <button type="button" onClick={handleClear}>
                    clear all
                  </button>
                </div>
                <Accordion
                  groupedData={groupedByCompany}
                  selectedParts={selectedParts}
                  setSelectedParts={setSelectedParts}
                  filterOption={filterOption}
                />
                <div className={css.cartLayout_options}>
                  <button type="button" onClick={handleRemove}>
                    remove
                  </button>
                  <button type="button" onClick={createRfq}>
                    create RQF
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedParts.length === 0) {
                        showPopup("warning", "Please select atleast one part.");
                        return;
                      }
                      setShowNoteModal(true);
                    }}
                  >
                    add note
                  </button>
                  <div className={css.cartLayout_filter}>
                    <h1> Sort By:</h1>
                    <select onChange={(e) => setFilterOption(e.target.value)}>
                      <option value="cnt_DESC" defaultValue="Max Parts">
                        Max Parts
                      </option>
                      <option value="cnt_ASC">Min Parts</option>
                      <option value="bestmatch">** Best Match</option>
                      <option value="maxprice">Highest Price</option>
                      <option value="lowestprice">Lowest Price</option>
                    </select>
                  </div>
                  <button type="button" onClick={handlePdfExport}>
                    PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowExportModal(true)}
                  >
                    export
                  </button>
                  <button type="button" onClick={handleClear}>
                    clear all
                  </button>
                </div>
              </div>
              <LearnMore />
            </div>
          </div>
          {showNoteModal && (
            <Note
              selectedParts={selectedParts}
              onClose={() => setShowNoteModal(false)}
            />
          )}
        </div>
      )}
      {showExportModal && (
        <Export
          selectedProducts={selectedProducts}
          onClose={() => setShowExportModal(false)}
          onSend={(exportData) => {
            console.log("Export Info:", exportData);
            console.log("Selected Products:", selectedProducts);
            setShowExportModal(false);
          }}
        />
      )}

      {showSaveListModal && (
        <SaveListModal
          selectedParts={selectedParts} // ✅ pass the data you need
          onClose={() => setShowSaveListModal(false)}
        />
      )}
      <PopupAlert
        show={popup.show}
        type={popup.type}
        message={popup.message}
        onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
      />
    </>
  );
};

export default Cart;

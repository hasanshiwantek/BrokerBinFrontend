import React, { useState, useRef, useEffect, useMemo } from "react";
import css from "../../styles/Tools/Cart.module.css";
import Accordion from "../Accordion";
import LearnMore from "./LearnMore";
import { useDispatch, useSelector } from "react-redux";
import Tick from "../../svgs/Tick";
import { setSelectedProducts } from "@/ReduxStore/SearchProductSlice";
import { useNavigate } from "react-router-dom";
import {
  setSelectedProductsForCart,
  fetchCartItems,
  deleteCartItem,
  clearCartItems,
  updatePartcartNote,
} from "@/ReduxStore/SearchProductSlice";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Note from "../partCart/Note";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { brokerAPI } from "../api/BrokerEndpoint";
import { setTogglePopUp } from "@/ReduxStore/SearchProductSlice";
import CompanyDetails from "../Popups/CompanyDetails/CompanyDetails";
import { setPopupCompanyDetail } from "@/ReduxStore/SearchProductSlice";

const Cart = () => {
  const [selectedParts, setSelectedParts] = useState([]);
  const [filterOption, setFilterOption] = useState("cnt_DESC");
  const selectedProducts = useSelector(
    (state) => state.searchProductStore.selectedProductsForCart
  );

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
          toast.success(result?.message || "Cart cleared successfully!", {
            style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" },
          });
          window.location.reload(300);
          // Optional: refresh UI or state if needed
        } else {
          toast.warning("Cart clear action didn't succeed.", {
            style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" },
          });
        }
      } catch (error) {
        console.error("Failed to clear cart:", error);
        toast.error(
          error?.message || "Failed to clear cart. Please try again.",
          {
            style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" },
          }
        );
      }
    }
  };

  const handleRemove = async () => {
    if (!selectedParts.length) {
      toast.warning("You must select at least one part!", {
        style: {
          fontSize: "12px",
          marginTop: "-10px",
          fontWeight: "bold",
        },
      });
      return;
    }
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
        toast.info("Selected parts removed from cart!", {
          style: {
            fontSize: "12px",
            marginTop: "-10px",
            fontWeight: "bold",
          },
        });
      } else {
        toast.warning("Some parts may not have been removed.", {
          style: {
            fontSize: "12px",
            marginTop: "-10px",
            fontWeight: "bold",
          },
        });
      }
    } catch (error) {
      console.error("Error while removing parts:", error);
      toast.error("Failed to remove selected parts. Please try again.", {
        style: {
          fontSize: "12px",
          marginTop: "-10px",
          fontWeight: "bold",
        },
      });
    }
  };

  const createRfq = () => {
    if (!selectedParts.length) {
      alert("You must select at least one part!");
      return;
    }
    navigate("/rfq/create", { state: { selectedRows: selectedParts } });
  };

  const handlePdfExport = async () => {
    try {
      const response = await axios.get(`${brokerAPI}part-cart/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob", // Important for PDF
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      window.open(url); // Open PDF in new tab
    } catch (error) {
      console.error("Failed to export PDF:", error);
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

  console.log("SelectedCartProduct", selectedProducts);
  console.log("Selected Parts: ", selectedParts);
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

    // Reset dropdown to default
    e.target.value = "";
  };

  const handleRemoveNonSelected = async () => {
    if (selectedParts.length === selectedProducts.length) {
      toast.info("All parts are selected, nothing to remove.", {
        style: {
          fontSize: "12px",
          marginTop: "-10px",
          fontWeight: "bold",
        },
      });
      return;
    }

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
        toast.info("Non-selected parts removed from cart!", {
          style: {
            fontSize: "12px",
            marginTop: "-10px",
            fontWeight: "bold",
          },
        });
      } else {
        toast.warning("Some parts may not have been removed.", {
          style: {
            fontSize: "12px",
            marginTop: "-10px",
            fontWeight: "bold",
          },
        });
      }
    } catch (error) {
      console.error("Error while removing non-selected parts:", error);
      toast.error("Failed to remove non-selected parts.", {
        style: {
          fontSize: "12px",
          marginTop: "-10px",
          fontWeight: "bold",
        },
      });
    }
  };

  const groupedProducts = useMemo(() => {
    const map = {};
    selectedProducts.forEach((item) => {
      const companyName = item.inventory?.addedBy?.company?.name || "Unknown";
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
        // toast.success("Note updated!", {
        //   style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" },
        // });
      })
      .catch((err) => {
        console.error("❌ Note update error:", err);
        // toast.error("Failed to update note.", {
        //   style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" },
        // });
      });
  };

  return (
    <div>
      <div className={css.mainLayout}>
        <div className={css.cartListLayout}>
          <a href="#">part list</a>
          <a href="#">Saved list(s)</a>
          <div className={css.cartList}>
            <div className={css.cartList_list}>
              <h1>Part List ({selectedProducts.length} items listed)</h1>
              <span className={css.cartList_list_btn}>
                <button type="button">PDF</button>
                <button type="button">save</button>
              </span>
            </div>
            <div className={css.cartList_key}>
              <h1>key</h1>
              <div className={css.cartList_key_details}>
                <div>
                  <div>
                    <Tick />
                    <span>RFQ sent</span>
                  </div>
                  <span>(0)</span>
                </div>
                <div>
                  <div>
                    <Tick />
                    <span>Broadcast Sent</span>
                  </div>
                  <span>(0)</span>
                </div>
                <div>
                  <div>
                    <Tick />
                    <span>Action Needed</span>
                  </div>
                  <span>(110)</span>
                </div>
              </div>
              <div className={css.cartList_key_details_pp}>Problem Parts</div>
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
              <h1>Parts</h1>
              <div className={css.cartList_parts_scroll}>
                <table>
                  <thead>
                    <tr>
                      <th>Part#</th>
                      <th>Mfg</th>
                      <th>Cond</th>
                      <th>Qty</th>
                      <th>Age</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(groupedProducts).map(
                      ([companyName, parts]) => (
                        <React.Fragment key={companyName}>
                          {/* Company Header Row */}
                          <tr className="bg-gray-200 text-left ">
                            <td
                              colSpan="6"
                              className="font-bold !text-[9pt] px-2 py-1 text-blue-600 "
                            >
                              Company: {companyName}
                            </td>
                          </tr>

                          {parts.map((e) => (
                            <React.Fragment key={e.id}>
                              <tr className="tableData">
                                <td>
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
                                <td>{e.inventory?.quantity}</td>
                                <td>{e.inventory?.age}</td>
                              </tr>

                              {/* Note Row */}
                              {e.notes?.length > 0 && (
                                <tr className=" text-gray-800 ">
                                  <td colSpan="6" className="pl-10 ">
                                    <div className="flex items-center gap-2 p-1">
                                      <span>Note:</span>
                                      <input
                                        type="text"
                                        defaultValue={e.notes[0].note || ""}
                                        className="text-[10px] border rounded px-3 py-2 w-full max-w-xs"
                                        onBlur={(ev) =>
                                          handleNoteUpdate(
                                            e.id,
                                            ev.target.value,
                                            e.notes[0].quantity,
                                            e.notes[0].id
                                          )
                                        }
                                      />
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </React.Fragment>
                      )
                    )}
                  </tbody>
                </table>
              </div>
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
              <button type="button">export</button>
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
                    alert("You must select a part!");
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
              <button type="button">export</button>
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

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Cart;

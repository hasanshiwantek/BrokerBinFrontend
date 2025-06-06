import React, { useState, useRef, useEffect } from "react";
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

const Cart = () => {
  const [selectedParts, setSelectedParts] = useState([]);
  const [filterOption, setFilterOption] = useState("cnt_DESC");
  const selectedProducts = useSelector(
    (state) => state.searchProductStore.selectedProductsForCart
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const groupedByCompany = selectedProducts.reduce((acc, item) => {
    const company =
      item?.inventory?.addedBy?.company?.name || "Unknown Company";
    console.log("companyfrom cart", company);
    if (!acc[company]) acc[company] = [];
    acc[company].push(item);
    return acc;
  }, {});

  const handleClear = async () => {
    try {
      const result = await dispatch(deleteCartItems({ token })).unwrap();

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
      toast.error(error?.message || "Failed to clear cart. Please try again.", {
        style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" },
      });
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

  // const handlePdfExport = () => {
  //   const doc = new jsPDF();
  //   let currentY = 10;
  //   Object.entries(groupedByCompany).forEach(([company, parts]) => {
  //     doc.text(`${company}`, 14, currentY);
  //     const rows = parts.map((item) => [
  //       item.inventory?.partModel,
  //       item.inventory?.mfg,
  //       item.inventory?.cond,
  //       item.inventory?.price,
  //       item.inventory?.quantity,
  //       item.inventory?.age,
  //       item.inventory?.productDescription || "",
  //     ]);
  //     autoTable(doc, {
  //       head: [["Part#", "Mfg", "Cond", "Price", "Qty", "Age", "Description"]],
  //       body: rows,
  //       startY: currentY + 5,
  //       styles: { fontSize: 10 },
  //       didDrawPage: (data) => {
  //         currentY = data.cursor.y + 10; // update Y for next table
  //       },
  //     });
  //   });
  //   const pdfBlobUrl = doc.output("bloburl");
  //   window.open(pdfBlobUrl); // Opens PDF preview
  // };

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
              <select className={css.cartList_action_select}>
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
                    {selectedProducts.map((e, i) => {
                      return (
                        <tr className="tableData" key={i}>
                          <td>
                            <input
                              type="checkbox"
                              name="addToCart"
                              id="addToCart"
                              className="h-4 w-4"
                            // defaultValue={false}
                            />

                            {e.inventory?.partModel}
                          </td>
                          <td>{e.inventory?.mfg}</td>
                          <td>{e.inventory?.cond}</td>
                          <td>{e.inventory?.quantity}</td>
                          <td>{e.inventory?.age}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <h1>Action</h1>
            <div className={css.cartList_action}>
              {/* <div> */}
              <p>with selected</p>
              <select className={css.cartList_action_select}>
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
              <button
                type="button"
                onClick={handleRemove}>
                remove
              </button>
              <button
                type="button" onClick={createRfq}>
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
              <button
                type="button"
                onClick={handlePdfExport}
              >
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
              <button
                type="button"
                onClick={handleRemove}
              >
                remove
              </button>
              <button type="button" onClick={createRfq}>create RQF</button>
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
              <button
                type="button"
                onClick={handlePdfExport}>
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
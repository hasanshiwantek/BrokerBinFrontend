import React, { useState, useRef, useEffect } from "react";
import css from "../../styles/Tools/Cart.module.css";
import Accordion from "../Accordion";
import LearnMore from "./LearnMore";
import { useDispatch, useSelector } from "react-redux";
import Tick from "../../svgs/Tick";
import { setSelectedProducts } from "@/ReduxStore/SearchProductSlice";
import { useNavigate } from "react-router-dom";
import { setSelectedProductsForCart, fetchCartItems } from "@/ReduxStore/SearchProductSlice";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Note from "../partCart/Note";
import Cookies from "js-cookie";


const Cart = () => {
  const [selectedParts, setSelectedParts] = useState([]);
  const selectedProducts = useSelector((state) => state.searchProductStore.selectedProductsForCart);
  console.log("SELECTEDPRODUCTS", selectedProducts);
  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pdfRef = useRef();

  const groupedByCompany = selectedProducts.reduce((acc, item) => {
    const company = item?.inventory?.addedBy?.company?.name || "Unknown Company";
    console.log("companyfrom cart", company);
    if (!acc[company]) acc[company] = [];
    acc[company].push(item);
    return acc;
  }, {});

  const handleClear = () => {
    dispatch(setSelectedProductsForCart([]));
    setSelectedParts([]);
  };

  const handleRemove = () => {
     if (!selectedParts.length) {
    alert("You must select at least one part!");
    return;
  }
    const updated = selectedProducts.filter(
      (item) => !selectedParts.some((p) => p.id === item.id)
    );
    dispatch(setSelectedProductsForCart(updated));
    setSelectedParts([]);
  };

  const createRfq = () => {
    if (!selectedParts.length) {
      alert("You must select at least one part!");
      return;
    }
    navigate("/rfq/create", { state: { selectedRows: selectedParts } });
  };

const handlePdfExport = () => {
  const doc = new jsPDF();
  let currentY = 10;
  Object.entries(groupedByCompany).forEach(([company, parts]) => {
    doc.text(`${company}`, 14, currentY);
    const rows = parts.map((item) => [
      item.partModel,
      item.mfg,
      item.cond,
      item.price,
      item.quantity,
      item.age,
      item.productDescription || "",
    ]);
    autoTable(doc, {
      head: [["Part#", "Mfg", "Cond", "Price", "Qty", "Age", "Description"]],
      body: rows,
      startY: currentY + 5,
      styles: { fontSize: 10 },
      didDrawPage: (data) => {
        currentY = data.cursor.y + 10; // update Y for next table
      },
    });
  });
  const pdfBlobUrl = doc.output("bloburl");
  window.open(pdfBlobUrl); // Opens PDF preview
};

useEffect(() => {
  const token = Cookies.get("token");

  const initCart = async () => {
    // if (selectedParts.length > 0) {
    //   const ids = selectedParts.map((item) => item.id);
    //   await dispatch(addToCart({ token, inventoryIds: ids }));
    // }

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
              <button type="button" onClick={handleRemove}>
                remove
              </button>
              <button type="button" onClick={createRfq}>
                create RQF
              </button>
              <button
                type="button"
                onClick={() => setShowNoteModal(true)}
                disabled={selectedParts.length === 0}
              >
                add note
              </button>
              <div className={css.cartLayout_filter}>
                <h1> Filter By:</h1>
                <select>
                  <option value="cnt_DESC" defaultValue="Max Parts">
                    Max Parts
                  </option>
                  <option value="cnt_ASC">Min Parts</option>
                  <option value="bestmatch">** Best Match</option>
                  <option value="maxprice">Highest Price</option>
                  <option value="lowestprice">Lowest Price</option>
                </select>
              </div>
              <button type="button">PDF</button>
              <button type="button">export</button>
              <button type="button" onClick={handleClear}>
                clear all
              </button>
            </div>
            <Accordion
              groupedData={groupedByCompany}
              selectedParts={selectedParts}
              setSelectedParts={setSelectedParts}
            />
            <div className={css.cartLayout_options}>
              <button type="button">remove</button>
              <button type="button">create RQF</button>
              <button
                type="button"
                onClick={() => setShowNoteModal(true)}
                disabled={selectedParts.length === 0}
              >
                add note
              </button>
              <div className={css.cartLayout_filter}>
                <h1> Sort By:</h1>
                <select>
                  <option value="cnt_DESC" defaultValue="Max Parts">
                    Max Parts
                  </option>
                  <option value="cnt_ASC">Min Parts</option>
                  <option value="bestmatch">** Best Match</option>
                  <option value="maxprice">Highest Price</option>
                  <option value="lowestprice">Lowest Price</option>
                </select>
              </div>
              <button type="button">PDF</button>
              <button type="button">export</button>
              <button type="button">clear all</button>
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
  );
};

export default Cart;
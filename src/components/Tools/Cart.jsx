import React, { useState } from "react";
import css from "../../styles/Tools/Cart.module.css";
import Accordion from "../Accordion";
import LearnMore from "./LearnMore";
import { useDispatch, useSelector } from "react-redux";
import Tick from "../../svgs/Tick";

const Cart = () => {

  const selectedProducts = useSelector((state) => state.searchProductStore.selectedProductsForCart);

  const groupedByCompany = selectedProducts.reduce((acc, item) => {
  const company = item.companyName || "Unknown Company";
  if (!acc[company]) acc[company] = [];
  acc[company].push(item);
  return acc;
  }, {});


  console.log("SelectedCartProduct", selectedProducts);
  
  return (
    
      <div className={css.mainLayout}>
        <div className={css.cartListLayout}>
          <a href="#">part list</a>
          <a href="#">Saved list(s)</a>
          <div className={css.cartList}>
            <div className={css.cartList_list}>
              <h1>Part List (110 items listed)</h1>
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
                    RFQ sent
                  </div>
                  <span>(0)</span>
                </div>
                <div>
                  <div>
                    <Tick />
                    broadcast sent
                  </div>
                  <span>(0)</span>
                </div>
                <div>
                  <div>
                    <Tick />
                    action needed
                  </div>
                  <span>(110)</span>
                </div>
              </div>
              <div className={css.cartList_key_details_pp}>Problem Parts</div>
            </div>
            <h1>action</h1>
            <div className={css.cartList_action}>
              {/* <div> */}
              <p>with selected</p>
              <select className={css.cartList_action_select}>
                <option value="" defaultValue="Choose an action">
                  Choose an action
                </option>
                <option value="newbom">New BOM</option>
                <option value="partsearch">Part# Search</option>
                <option value="remove">Remove Selected</option>
                <option value="onlythese">Remove Non-Selected</option>
              </select>
              {/* </div> */}
            </div>
            <div className={css.cartList_parts}>
              <h1>parts</h1>
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
                              // defaultValue={false}
                            />

                            {e.partModel}
                          </td>

                          <td>{e.mfg}</td>
                          <td>{e.cond}</td>

                          <td>{e.quantity}</td>
                          <td>{e.age}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <h1>action</h1>
            <div className={css.cartList_action}>
              {/* <div> */}
              <p>with selected</p>
              <select className={css.cartList_action_select}>
                <option value="" defaultValue="Choose an action">
                  Choose an action
                </option>
                <option value="newbom">New BOM</option>
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
              <button type="button">remove</button>
              <button type="button">create RQF</button>
              <button type="button">add note</button>
              <div className={css.cartLayout_filter}>
                <h1> Filter By:</h1>
                <select>
                  <option value="cnt_DESC" defaultValue="Max Parts">
                    Max Parts
                  </option>
                  <option value="cnt_ASC">Min Parts</option>
                  <option value="shield">Shield of Quality</option>
                  <option value="bestmatch">** Best Match</option>
                  <option value="maxprice">Highest Price</option>
                  <option value="lowestprice">Lowest Price</option>
                </select>
              </div>
              <button type="button">PDF</button>
              <button type="button">export</button>
              <button type="button">clear all</button>
            </div>
            <Accordion groupedData={groupedByCompany} />
            <div className={css.cartLayout_options}>
              <button type="button">remove</button>
              <button type="button">create RQF</button>
              <button type="button">add note</button>
              <div className={css.cartLayout_filter}>
                <h1> Filter By:</h1>
                <select>
                  <option value="cnt_DESC" defaultValue="Max Parts">
                    Max Parts
                  </option>
                  <option value="cnt_ASC">Min Parts</option>
                  <option value="shield">Shield of Quality</option>
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
  );
};

export default Cart;
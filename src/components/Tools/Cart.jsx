import React, { useState } from "react";
import css from "../../styles/Tools/Cart.module.css";
import Accordion from "../Accordion";
import LearnMore from "./LearnMore";
import {
  organizedByCountry,
  organizedByCountryAndCompany,
  panels,
  partList,
} from "../../data/tableData";
import Tick from "../../svgs/Tick";

const Cart = () => {
  return (
    <>
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
                    <span>
                    RFQ sent
                    </span>
                  </div>
                  <span>(0)</span>
                </div>
                <div>
                  <div>
                    <Tick />
                    <span>
                    Broadcast Sent
                    </span>
                  </div>
                  <span>(0)</span>
                </div>
                <div>
                  <div>
                    <Tick />
                    <span>
                    Action Needed
                    </span>
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
                    {partList.map((e, i) => {
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

                            {e.model}
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
                  <option value="bestmatch">** Best Match</option>
                  <option value="maxprice">Highest Price</option>
                  <option value="lowestprice">Lowest Price</option>
                </select>
              </div>
              <button type="button">PDF</button>
              <button type="button">export</button>
              <button type="button">clear all</button>
            </div>
            <Accordion
              panels={panels}
              partList={partList}
              organizedByCountry={organizedByCountry}
              organizedByCountryAndCompany={organizedByCountryAndCompany}
            />
            <div className={css.cartLayout_options}>
              <button type="button">remove</button>
              <button type="button">create RQF</button>
              <button type="button">add note</button>
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
    </>
  );
};

export default Cart;

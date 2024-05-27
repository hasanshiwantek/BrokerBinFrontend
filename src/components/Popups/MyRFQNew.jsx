import React, { useEffect, useState } from "react";
import css from "../../styles/Menu/Manage/MyRFQNew.module.css";
import AddCircle from "../../svgs/AddCircle";
import Attach from "../../svgs/Attach";

const AddParts = () => {
  return (
    <div className={css.rfqBody_Main_left_addParts_Addfields}>
      <input type="text" />
      <input type="text" />
      <select name="mfg" id="mfg">
        <option value="SPARKLE POWER"></option>
      </select>
      <select name="rfq[parts][cond][]">
        <option value="ANY">ANY</option>
        <option value="NEW">NEW</option>
        <option value="EXC">EXC</option>
        <option value="F/S">F/S</option>
        <option value="NOB">NOB</option>
        <option value="REF">REF</option>
        <option value="OEMREF">OEMREF</option>
        <option value="REP">REP</option>
        <option value="USED">USED</option>
      </select>
      <input type="text" />
      <input type="text" />
      <input type="text" />
    </div>
  );
};

const MyRFQNew = ({ setPopUpRfq }) => {
  const [total, received, sent] = [138, 134, 0];
  const [addParts, setAddParts] = useState(1);

  const renderAddParts = () => {
    let components = [];
    for (let i = 0; i < addParts; i++) {
      components.push(<AddParts key={i} />);
    }
    return components;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const rfqNew = document.querySelector(`.${css.rfqNew}`);
      if (rfqNew && !rfqNew.contains(event.target)) {
        setPopUpRfq((prev) => !prev);
      }
    };

    const escKeyToggle = (event) => {
      if (event.key === "Escape") {
        setPopUpRfq((prev) => !prev);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", escKeyToggle);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", escKeyToggle);
    };
  }, [setPopUpRfq]);

  return (
    <>
      <div className={css.rfqPopUp}>
        <div className={css.rfqNew}>
          <div className={css.rfqBody_closeBtn}>
            <button type="button" onClick={() => setPopUpRfq((prev) => !prev)}>
              close
            </button>
          </div>
          <div className={css.rfqBody}>
            <div className={css.rfqBody_Header}>
              <ul>
                <li>
                  <a href="/">
                    received({total}|{received})
                  </a>
                </li>
                <li>
                  <a href="/">sent({sent})</a>
                </li>
                <li>
                  <a href="/">new</a>
                </li>
                <li>
                  <a href="/">archive</a>
                </li>
              </ul>
            </div>
            <div className={css.rfqBody_Main}>
              <div className={css.rfqBody_Main_left}>
                <div className={css.rfqBody_Main_left_receptions}>
                  <span>
                    <label htmlFor="">Add Recipient:</label>
                    <input type="text" />
                  </span>
                  <span>
                    <label htmlFor="">BCC:</label>
                    <strong>Rob Osgood</strong>
                  </span>
                  <span>
                    <label htmlFor="">Subject:</label>
                    <input type="text" />
                  </span>
                </div>
                <div className={css.rfqBody_Main_left_addParts}>
                  <div></div>
                  <div>
                    <div className={css.rfqBody_Main_left_addParts_label}>
                      <label htmlFor="text">part</label>
                      <label htmlFor="text">HECI / CLEI</label>
                      <label htmlFor="select">Mfg</label>
                      <label htmlFor="select">Cond</label>
                      <label htmlFor="number">Qty *</label>
                      <label htmlFor="number">Target Price </label>
                      <label htmlFor="text">Terms</label>
                    </div>
                    {renderAddParts()}
                    <div className={css.rfqBody_Main_left_addParts_AddBtn}>
                      <button
                        type="button"
                        onClick={() => setAddParts((prev) => prev + 1)}
                      >
                        <AddCircle /> add part
                      </button>
                      <button type="button">
                        <Attach />
                        attach a file
                      </button>
                    </div>
                  </div>
                </div>
                <div className={css.rfqBody_Main_left_comments}>
                  <label htmlFor="">comments</label>
                  <textarea
                    name="comments"
                    id="comments"
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
                <div className={css.rfqBody_Main_left_bottom}>
                  <div></div>
                  <div>
                    <p>
                      **Please Note: You are receiving this RFQ because you
                      either carry the requested part above or you have been
                      personally selected by the sender to quote this request.
                    </p>
                    <span>
                      <input type="checkbox" />
                      <p>Send a copy to myself.</p>
                    </span>
                  </div>
                </div>
              </div>
              <div className={css.rfqBody_Main_right}>
                <table>
                  <thead>
                    <tr>
                      <th>RFQ Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span>
                          <input
                            type="checkbox"
                            name="Send to MyVendors List"
                            id=""
                          />
                          <label>Send to MyVendors List</label>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <input
                            type="checkbox"
                            name="Send to stocking vendors in"
                            id=""
                          />
                          <label>Send to stocking vendors in:</label>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <span></span>
                          <select
                            id="send_all_vendors_region"
                            name="send_all_vendors_region"
                          >
                            <option value="">All Regions</option>
                            <option value="0">North America</option>
                            <option value="4">Europe</option>
                            <option value="2">Africa</option>
                            <option value="6">Asia</option>
                            <option value="3">Middle East</option>
                            <option value="5">Oceania</option>
                            <option value="1">South America</option>
                          </select>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <input type="checkbox" name="PO in Hand" id="" />
                          <label>PO in Hand</label>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <input
                            type="checkbox"
                            name="Partial Order Quotes Accepted"
                            id=""
                          />
                          <label>Partial Order Quotes Accepted</label>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>RFQ Send Summary</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
          <div className={css.rfqBody_sendBtn}>
            <button
              type="button"
              onClick={() => {
                alert("Your RFQ has been sent");
                setTimeout(() => {
                  setPopUpRfq((prev) => !prev);
                }, 100);
              }}
            >
              send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyRFQNew;

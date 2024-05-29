import React, { useCallback, useEffect, useState } from "react";
import css from "../../styles/Menu/Manage/MyRFQNew.module.css";
import AddCircle from "../../svgs/AddCircle";
import Attach from "../../svgs/Attach";
import { MdRemoveCircle } from "react-icons/md";

const AddParts = ({ part, onUpdate, onRemove }) => {
  const handleRemove = (event) => {
    event.stopPropagation(); // This stops the click event from bubbling up to parent elements.
    onRemove(part.id);
  };
  const handleInputChange = (field, value) => {
    onUpdate(part.id, field, value);
  };

  return (
    <div className={css.rfqBody_Main_left_addParts_Addfields}>
      <button type="button" onClick={handleRemove}>
        <MdRemoveCircle />
      </button>
      <div>
        <input
          type="text"
          value={part.partNumber}
          onChange={(e) => handleInputChange("partNumber", e.target.value)}
        />
        <input
          type="text"
          value={part.heciClei}
          onChange={(e) => handleInputChange("heciClei", e.target.value)}
        />
        <select
          value={part.mfg}
          onChange={(e) => handleInputChange("mfg", e.target.value)}
        >
          <option value="SPARKLE POWER"></option>
        </select>
        <select
          value={part.condition}
          onChange={(e) => handleInputChange("condition", e.target.value)}
        >
          <option value="ANY">ANY</option>
          <option value="NEW">NEW</option>
          {/* Additional options */}
        </select>
        <input
          type="text"
          value={part.quantity}
          onChange={(e) => handleInputChange("quantity", e.target.value)}
        />
        <input
          type="text"
          value={part.targetPrice}
          onChange={(e) => handleInputChange("targetPrice", e.target.value)}
        />
        <input
          type="text"
          value={part.terms}
          onChange={(e) => handleInputChange("terms", e.target.value)}
        />
      </div>
    </div>
  );
};

const MyRFQNew = ({ setPopUpRfq }) => {
  const [total, received, sent] = [110, 90, 0];
  const [parts, setParts] = useState([
    {
      id: 0,
      partNumber: "",
      heciClei: "",
      mfg: "",
      condition: "",
      quantity: "",
      targetPrice: "",
      terms: "",
    },
  ]);

  // Function to handle adding new parts
  const addPart = () => {
    const newPart = {
      id: parts.length,
      partNumber: "",
      heciClei: "",
      mfg: "",
      condition: "",
      quantity: "",
      targetPrice: "",
      terms: "",
    };
    setParts((parts) => [...parts, newPart]);
  };

  // Function to handle removing a part by id
  const removePart = (id) => {
    setParts((parts) => parts.filter((part) => part.id !== id));
  };

  // Function to update part fields
  const updatePart = (id, field, value) => {
    setParts((parts) =>
      parts.map((part) => (part.id === id ? { ...part, [field]: value } : part))
    );
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

  const submitHandle = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = Object.fromEntries(form.entries());
    data.parts = parts;
    console.log(data);
  };

  return (
    <>
      <div className={css.rfqPopUp}>
        <form action="" method="post" onSubmit={submitHandle}>
          <div className={css.rfqNew}>
            <div className={css.rfqBody_closeBtn}>
              <button
                type="button"
                onClick={() => setPopUpRfq((prev) => !prev)}
              >
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
                      <input name="recipient" type="text" />
                    </span>
                    <span>
                      <label htmlFor="">BCC:</label>
                      <strong>Rob Osgood</strong>
                    </span>
                    <span>
                      <label htmlFor="">Subject:</label>
                      <input name="subject" type="text" />
                    </span>
                  </div>
                  <div className={css.rfqBody_Main_left_addParts}>
                    <div></div>
                    <div>
                      <div className={css.rfqBody_Main_left_addParts_label}>
                        <div>
                          <label htmlFor="text">part</label>
                          <label htmlFor="text">HECI / CLEI</label>
                          <label htmlFor="select">Mfg</label>
                          <label htmlFor="select">Cond</label>
                          <label htmlFor="number">Qty *</label>
                          <label htmlFor="number">Target Price </label>
                          <label htmlFor="text">Terms</label>
                        </div>
                      </div>
                      <span name="parts">
                        {parts.map((part) => (
                          <AddParts
                            key={part.id}
                            part={part}
                            onUpdate={updatePart}
                            onRemove={removePart}
                          />
                        ))}
                      </span>
                      <div className={css.rfqBody_Main_left_addParts_AddBtn}>
                        <button type="button" onClick={addPart}>
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
                        <input name="sendCopyToMyself" type="checkbox" />
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
                              name="sendToMyVendorsList"
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
                              name="sendToStockingVendorsIn"
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
                            <input type="checkbox" name="poInHand" id="" />
                            <label>PO in Hand</label>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            <input
                              type="checkbox"
                              name="partialOrderQuotesAccepted"
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
              <input type="submit" value="send" />
              {/* <button
              type="button"
              onClick={() => {
                alert("Your RFQ has been sent");
                setTimeout(() => {
                  setPopUpRfq((prev) => !prev);
                }, 100);
              }}
            >
              send
            </button> */}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MyRFQNew;

import React, { useEffect, useState } from "react";
import css from "../../styles/Menu/Manage/MyRFQNew.module.css";
import AddCircle from "../../svgs/AddCircle";
import Attach from "../../svgs/Attach";
import { MdRemoveCircle } from "react-icons/md";
import TextEditor from "../TextEditor";
import { setPopUpRfq } from "../../ReduxStore/SearchProductSlice";
import { useDispatch, useSelector } from "react-redux";

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
          value={part.partModel}
          onChange={(e) => handleInputChange("partNumber", e.target.value)}
        />
        <input
          type="text"
          value={part.heci}
          onChange={(e) => handleInputChange("heciClei", e.target.value)}
        />
        <select
          value={part.mfg}
          onChange={(e) => handleInputChange("mfg", e.target.value)}
        >
          <option value={part.mfg}>{part.mfg}</option>
        </select>
        <select
          value={part.cond}
          onChange={(e) => handleInputChange("condition", e.target.value)}
        >
          <option value={part.cond}>{part.cond}</option>
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

const MyRFQNew = () => {
  const { selectedProducts } = useSelector((store) => store.searchProductStore);
  const dispatch = useDispatch();
  const [total, received, sent] = [110, 90, 0];
  const [comment, setComment] = useState(""); // State to hold the value of the text editor

  const handleCommentChange = (content, delta, source, editor) => {
    const text = editor.getHTML();
    // getText()
    // this.setState({ content: text });
    // console.log(text);
    // setComment(editor.getText()); // This sets the inner HTML content from the editor to the state
    // console.log(text);

    setComment(text); // Use editor.getHTML() to get the HTML content

    // console.log(comment);
  };

  // make sure only unique models goes to rfq.
  const filterUniqueModels = (data) => {
    const uniqueModels = new Set();
    return data.filter((item) => {
      if (uniqueModels.has(item.partModel)) {
        return false;
      } else {
        uniqueModels.add(item.partModel);
        return true;
      }
    });
  };

  // filtered Unique models because we don't want to send RFQ with same model numbers.
  const filteredData = filterUniqueModels(selectedProducts);
  console.log(filteredData);

  const [parts, setParts] = useState(filteredData);
  const [selectedProductsBCC, setSelectedProductsBCC] =
    useState(selectedProducts);

  const removeBCC = (e, id) => {
    e.stopPropagation();
    setSelectedProductsBCC((prev) => prev.filter((item) => item.id !== id));
  };

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
        dispatch(setPopUpRfq());
      }
    };

    const escKeyToggle = (event) => {
      if (event.key === "Escape") {
        dispatch(setPopUpRfq());
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
    data.comment = comment;
    data.poInHand == "on" ? (data.poInHand = 1) : (data.poInHand = 0);
    data.sendCopyToMyself == "on"
      ? (data.sendCopyToMyself = 1)
      : (data.sendCopyToMyself = 0);
    data.sendToMyVendorsList == "on"
      ? (data.sendToMyVendorsList = 1)
      : (data.sendToMyVendorsList = 0);
    data.sendToStockingVendorsIn == "on"
      ? (data.sendToStockingVendorsIn = 1)
      : (data.sendToStockingVendorsIn = 0);
    data.partialOrderQuotesAccepted == "on"
      ? (data.partialOrderQuotesAccepted = 1)
      : (data.partialOrderQuotesAccepted = 0);
    data.bcc = selectedProductsBCC.map((item) => item.mfg);
    console.log(data);
  };

  return (
    <>
      <div className={css.rfqPopUp}>
        <form action="" method="post" onSubmit={submitHandle}>
          <div className={css.rfqNew}>
            <div className={css.rfqBody_closeBtn}>
              <button type="button" onClick={() => dispatch(setPopUpRfq())}>
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
                      <span className={css.rfqBody_Main_left_receptions_bcc}>
                        {selectedProductsBCC.map((item) => {
                          return (
                            <span
                              key={item.id}
                              onClick={(e) => removeBCC(e, item.id)}
                            >
                              <MdRemoveCircle />
                              <strong>{item.mfg}</strong>
                            </span>
                          );
                        })}
                      </span>
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
                    {/* <textarea name="comments"> */}
                    <TextEditor
                      handleCommentChange={handleCommentChange}
                      comment={comment}
                    />
                    {/* </textarea> */}
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
                              <option value="All Regions">All Regions</option>
                              <option value="North America">
                                North America
                              </option>
                              <option value="Europe">Europe</option>
                              <option value="Africa">Africa</option>
                              <option value="Asia">Asia</option>
                              <option value="Middle East">Middle East</option>
                              <option value="Oceania">Oceania</option>
                              <option value="South America">
                                South America
                              </option>
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

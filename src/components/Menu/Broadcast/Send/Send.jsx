import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import css from "./Send.module.css";
import ToggleCategories from "./Field Components/ToggleCategories";
import ToggleFilters from "./Field Components/ToggleFilters";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { sendBroadcast } from "../../../../ReduxStore/BroadCast";
import { MdUploadFile } from "react-icons/md";
import { servicesList } from "../../../../data/services";
import CheckboxList from "../../Manage/BroadcastFilter/CheckboxList";
import Services from "./Field Components/Services";

const BroadcastForm = () => {
  const token = Cookies.get("token");
  const { user } = JSON.parse(localStorage.getItem("user"));
  const service = useSelector((state) => state.broadcastStore.serviceData)
  // console.log(service);

  // console.log(user);
  const dispatch = useDispatch();
  // Form States
  const [broadcastType, setBroadcastType] = useState("");
  const [category, setCategory] = useState("");
  const [formTypes, setFormTypes] = useState({
    wtb: false,
    rfq: false,
    wts: false,
    hideFormOne: true,
    emailFormat: false,
  });

  // File and Input Data States
  const [files, setFiles] = useState("");
  const [formData, setFormData] = useState({
    partModel: "",
    mfg: "",
    cond: "",
    heciClei: "",
    price: "",
    quantity: "",
    buy_in: "",
    description: "",
    additional_comments: "",
  });
  
  const [emailFormat, setEmailFormat] = useState({
    time: "",
    date: "",
  });

  const {
    computerSelection,
    telecomSelection,
    mobileDevicesSelection,
    companiesSelection,
    regionSelection,
    serviceData
  } = useSelector((state) => state.broadcastStore);

  const handleContinue = () => {
    if (broadcastType && category) {
      setFormTypes((prev) => {
        const updatedType = { ...prev };
        Object.keys(updatedType).forEach((key) => {
          updatedType[key] = false;
        });
        return { ...updatedType, [broadcastType]: true };
      });
    } else {
      alert("Please make both selections before continuing.");
    }
  };

  const handleContinueForm = () => {
    setFormTypes((prev) => ({
      ...prev,
      broadcastType: false,
      emailFormat: true,
    }));
  };

  const handlePrevious = () => {
    setFormTypes(() => {
      const updatedFormTypes = { ...formTypes };
      Object.keys(updatedFormTypes).forEach((key) => {
        updatedFormTypes[key] = false;
      });
      return {
        ...updatedFormTypes,
        [broadcastType]: false,
        hideFormOne: true,
        emailFormat: false,
      };
    });
  };
  const handlePreviousForm = () => {
    setFormTypes((prev) => {
      const updatedFormTypes = { ...prev };
      Object.keys(updatedFormTypes).forEach((key) => {
        updatedFormTypes[key] = false;
      });
      return {
        ...updatedFormTypes,
        [broadcastType]: true,
        hideFormOne: false,
        emailFormat: false,
      };
    });
  };

  // Handle input change for text and select fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // console.log(type, checked, value, name);
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle file input change
  const handleFileChange = (event) => {
    setFiles("");
    const selectedFiles = event.target.files[0];
    if (selectedFiles) {
      setFiles(selectedFiles);
    } else {
      setFiles("");
    }
  };

  const cancelAllActions = () => {
    setBroadcastType("");
    setCategory("");
    setFormTypes({
      wtb: false,
      rfq: false,
      wts: false,
      hideFormOne: true,
      emailFormat: false,
    });
    setFormData({
      partModel: "",
      mfg: "",
      cond: "",
      heciClei: "",
      price: "",
      quantity: "",
      buy_in: "",
      description: "",
      additional_comments: "",
    });
    setEmailFormat({
      time: "",
      date: "",
    });
    setFiles("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Combine form data and other selections
    if (files) {
      const data = {
        uploadFile: files,
        type: broadcastType,
      };
      dispatch(sendBroadcast({ token, data }));
      // console.log(data);
    } else {
      const data = {
        ...formData,
        type: broadcastType,
        selectedCompanies: computerSelection,
        selectedTelecom: telecomSelection,
        selectedMobileDevices: mobileDevicesSelection,
        selectedRegion: regionSelection,
        companiesSelection: companiesSelection,
        service: serviceData
      };
      dispatch(sendBroadcast({ data, token }));
      // console.log(data);

    }
    setEmailFormat((prev) => {
      const updatedFormat = { ...prev };
      updatedFormat.time = new Date().toLocaleTimeString("en-US", {
        hour12: true,
      });
      updatedFormat.date = new Date().toLocaleDateString("en-US");
      return updatedFormat;
    });
    console.log(token)

  };

  return (
    <div className={css.outerPadding}>
      <div className={css.broadcastForm}>
        {formTypes.hideFormOne && !formTypes.emailFormat && (
          <>
            <div className={css.broadcastFirstForm}>
              <h2>Send a Broadcast</h2>
              <div>
                <h3>What type of Broadcast would you like to send?</h3>
                <div className={css.broadcastTypes}>
                  <button
                    className={broadcastType === "wtb" ? css.selected : ""}
                    onClick={() => setBroadcastType("wtb")}
                  >
                    <span style={{ color: "blue", fontSize: "2rem", fontWeight: "bold" }}>WTB</span>
                    <span>Want to Buy</span>
                  </button>
                  <button
                    className={broadcastType === "rfq" ? css.selected : ""}
                    onClick={() => setBroadcastType("rfq")}
                  >
                    <span style={{ color: "green", fontSize: "2rem", fontWeight: "bold" }}>RFQ</span>
                    <span>Request for Quote</span>
                  </button>
                  <button
                    className={broadcastType === "wts" ? css.selected : ""}
                    onClick={() => setBroadcastType("wts")}
                  >
                    <span style={{ color: "red", fontSize: "2rem", fontWeight: "bold" }}>WTS</span>
                    <span>Want to Sell</span>
                  </button>
                </div>
              </div>
              <div>
                <h3>For the following:</h3>
                <div className={css.categories}>
                  <button
                    className={
                      category === "single part / items" ? css.selected : ""
                    }
                    onClick={() => setCategory("single part / items")}
                  >
                    <span>Single Part / Item</span>
                    <span>attach files or paste text</span>
                    <small>(pdf, csv, xlsx, txt, photos, datasheets)</small>
                  </button>
                  <button
                    className={category === "service" ? css.selected : ""}
                    onClick={() => setCategory("service")}
                  >
                    <span>Service</span>
                    <span>attach files or paste text</span>
                    <small>(pdf, csv, xlsx, txt, photos, datasheets)</small>
                  </button>
                  <button
                    className={
                      category === "multiple parts / items" ? css.selected : ""
                    }
                    onClick={() => setCategory("multiple parts / items")}
                  >
                    <span>Multiple Parts / Items</span>
                    <span>attach files or paste text</span>
                    <small>(pdf, csv, xlsx, txt, photos, datasheets)</small>
                  </button>
                </div>
              </div>
            </div>
            <div className={css.actions}>
              <button onClick={cancelAllActions}>Cancel</button>
              <button
                onClick={handleContinue}
                disabled={!broadcastType || !category}
              >
                Continue
              </button>
            </div>
          </>
        )}
        <form onSubmit={handleSubmit}>
          {formTypes[broadcastType] && !formTypes.emailFormat && (
            <>
              <div className={css.formTypeLayout}>
                {broadcastType === "wtb" && (
                  <h1>
                    Want To Buy ({broadcastType}): {category}
                  </h1>
                )}
                {broadcastType === "rfq" && (
                  <h1>
                    Request For Quote ({broadcastType}): {category}
                  </h1>
                )}
                {broadcastType === "wts" && (
                  <h1>
                    Want To Sell ({broadcastType}): {category}
                  </h1>
                )}

                {
                  category === "service" &&
                  <div className={css.toggleServices}>
                    <div className={css.headings}>
                      <h3>Services</h3>
                      <p>(Click to expand further)</p>
                    </div>
                    <div>
                      <Services />
                    </div>
                  </div>
                }



                {

                  category != "service" &&
                  <div className={css.toggleCategories}>
                    <div className={css.headings}>
                      <h3>Categories</h3>
                      <p>(Click to expand further)</p>
                    </div>
                    <ToggleCategories />
                  </div>
                }

                <div className={css.toggleFilters}>
                  <div className={css.headings}>
                    <h3>Filters</h3>
                    <p>(Optional)</p>
                  </div>
                  <ToggleFilters />
                </div>
                <div className={css.file_upload_container}>
                  <div className={css.headings}>
                    <h3>Attach Files</h3>
                    <p>(Optional: pdf, csv, xlsx, txt, photos, datasheets)</p>
                  </div>
                  <div>
                    <label
                      htmlFor="file-upload"
                      className={css.file_upload_label}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                        width="80px"
                        height="80px"
                        viewBox="0 0 512 512"
                      >
                        <path d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" />
                      </svg>
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                      <div className={css.upload_area}>
                        <p>Click here to attach your files</p>
                        <small>
                          To attach multiple files, hold the CTRL/ CMD or SHIFT
                          key while selecting your files
                        </small>
                      </div>
                    </label>
                  </div>
                </div>
                <div className={css.mainFields}>
                  <div className={css.mainFields_1}>
                    <div>
                      <label htmlFor="partModel">Part #</label>
                      <input
                        type="text"
                        name="partModel"
                        value={formData.partModel}
                        onChange={handleInputChange}
                        placeholder="Enter PartModel"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="mfg">MFG</label>
                      <input
                        type="text"
                        name="mfg"
                        value={formData.mfg}
                        onChange={handleInputChange}
                        placeholder="MFG"
                        required
                      />
                    </div>
                  </div>
                  <div className={css.mainFields_2}>
                    <div>
                      <label htmlFor="cond">condition</label>
                      <select
                        name="cond"
                        value={formData.cond}
                        onChange={handleInputChange}
                      >
                        <option value="">Select</option>
                        <option value="any">Any</option>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                        <option value="repaired">Repaired</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="heciClei">Heci / Clei</label>
                      <input
                        type="text"
                        name="heciClei"
                        value={formData.heciClei}
                        onChange={handleInputChange}
                        placeholder="HECI / CLEI"
                        required

                      />
                    </div>
                    <div>
                      <label htmlFor="price">Price</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Price"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="quantity">Quantity</label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        placeholder="Quantity"
                        required
                      />
                    </div>
                  </div>
                  <div className={css.mainFields_3}>
                    <div>
                      <label htmlFor="buy_in_bulk">Bulk</label>
                      <input
                        type="radio"
                        name="buy_in"
                        value="bulk"
                        id="buy_in_bulk"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="buy_in_container">Container</label>
                      <input
                        type="radio"
                        name="buy_in"
                        value="container"
                        id="buy_in_container"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="buy_in_pallet">Pallet</label>
                      <input
                        type="radio"
                        name="buy_in"
                        value="pallet"
                        id="buy_in_pallet"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="buy_in_wholeUnit">Whole Unit</label>
                      <input
                        type="radio"
                        name="buy_in"
                        value="wholeUnit"
                        id="buy_in_wholeUnit"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className={css.createABroadcast}>
                  <h3>Create a Broadcast</h3>
                  <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Description"
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="additional_comments">Comments</label>
                    <textarea
                      type="text"
                      name="additional_comments"
                      value={formData.additional_comments}
                      onChange={handleInputChange}
                      placeholder="Message , Comments"
                      cols={10}
                      rows={5}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className={css.actions}>
                <button type="button" onClick={handlePrevious}>
                  Previous
                </button>
                <span>
                  <button type="button" onClick={cancelAllActions}>
                    Cancel
                  </button>
                  <button type="button" onClick={handleContinueForm}>
                    Continue
                  </button>
                </span>
              </div>
            </>
          )}
          {formTypes.emailFormat && (
            <div className={css.broadcastEmail}>
              {broadcastType === "wtb" && <h3>want to buy (WTB)</h3>}
              {broadcastType === "rfq" && <h3>request for quote (RFQ)</h3>}
              {broadcastType === "wts" && <h3>want to sell (WTS)</h3>}
              <div className={css.broadcastEmailFormat}>
                <div>
                  {[user].map((item) => {
                    return (
                      <ul>
                        <li>
                          <p>from:</p>
                          <p>{user.firstName}</p>
                          <p>{`[${user.email}]`}</p>
                        </li>
                        <li>
                          <p>sent:</p>
                          <p>{emailFormat.time}</p>
                          <p>{emailFormat.date}</p>
                        </li>
                      </ul>
                    );
                  })}
                </div>
                <div>
                  {[formData].map((item) => {
                    return (
                      <ul key={item.id}>
                        {broadcastType === "wtb" && (
                          <li>
                            <p>type:</p>
                            <p>want to buy (WTB)</p>
                          </li>
                        )}
                        {broadcastType === "rfq" && (
                          <li>
                            <p>type:</p>
                            <p>request for quote (RFQ)</p>
                          </li>
                        )}
                        {broadcastType === "wts" && (
                          <li>
                            <p>type:</p>
                            <p>want to sell (WTS)</p>
                          </li>
                        )}
                        <li>
                          <p>part:</p>
                          <p>{item.partModel}</p>
                        </li>
                        <li>
                          <p>mfg:</p>
                          <p>{item.mfg}</p>
                        </li>
                        <li>
                          <p>cond:</p>
                          <p>{item.cond}</p>
                        </li>
                        <li>
                          <p>qty:</p>
                          <p>{item.quantity}</p>
                        </li>
                        <li>
                          <p>price:</p>
                          <p>{item.price}</p>
                        </li>
                        <li>
                          <p>description:</p>
                          <p>{item.description}</p>
                        </li>
                        <li>
                          <p>Services</p>
                          {
                            service.map((val, index) => {
                              return (
                                <li>{val}</li>
                              )
                            })
                          }
                        </li>
                      </ul>
                    );
                  })}
                </div>
                <div>
                  {[user].map((item) => {
                    return (
                      <ul>
                        <li>{user.firstName}</li>
                        <li>
                          <p>P:</p>
                          <p>{user.phoneNumber}</p>
                        </li>
                        <li>
                          <p>{user.email}</p>
                        </li>
                      </ul>
                    );
                  })}
                </div>
              </div>
              <div className={css.actions}>
                <button type="button" onClick={handlePreviousForm}>
                  Previous
                </button>
                <span>
                  <button type="button" onClick={cancelAllActions} >
                    Cancel
                  </button>
                  <input type="submit" value="SEND" style={{ cursor: "pointer" }} />
                </span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BroadcastForm;
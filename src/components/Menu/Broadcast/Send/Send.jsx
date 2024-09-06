import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import css from "./Send.module.css";
import ToggleCategories from "./Field Components/ToggleCategories";
import ToggleFilters from "./Field Components/ToggleFilters";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { sendBroadcast } from "../../../../ReduxStore/BroadCast";
import { MdUploadFile } from "react-icons/md";

const BroadcastForm = () => {
  const token = Cookies.get("token");
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
  const [files, setFiles] = useState([]);
  const [base64Files, setBase64Files] = useState("");
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

  const {
    computerSelection,
    telecomSelection,
    mobileDevicesSelection,
    companiesSelection,
    regionSelection,
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
      WTB: false,
      emailFormat: true,
    }));
  };

  const handlePrevious = () => {
    setFormTypes((prev) => {
      const updatedFormTypes = { ...prev };
      Object.keys(updatedFormTypes).forEach((key) => {
        updatedFormTypes[key] = false;
      });
      return {
        ...updatedFormTypes,
        hideFormOne: true,
        emailFormat: false,
      };
    });
  };

  // Handle input change for text and select fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(type, checked, value, name);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle file input change
  const handleFileChange = (event) => {
    setBase64Files("");
    setFiles([]);
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length !== 0) {
      setFiles(selectedFiles);
      selectedFiles.forEach((file) => convertFileToBase64(file));
    } else {
      setBase64Files("");
    }
  };

  // Convert a file to base64
  const convertFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBase64Files(() => reader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Combine form data and other selections
    if (base64Files.length > 0) {
      const data = {
        uploadFile: base64Files,
        type: broadcastType,
      };
      dispatch(sendBroadcast({ data, token }));
      console.log(data);
    } else {
      const data = {
        ...formData,
        selectedCompanies: computerSelection,
        selectedTelecom: telecomSelection,
        selectedMobileDevices: mobileDevicesSelection,
        selectedRegion: regionSelection,
        companiesSelection: companiesSelection,
      };
      dispatch(sendBroadcast({ data, token }));
      console.log(data);
    }
  };

  return (
    <div className={css.outerPadding}>
      <div className={css.broadcastForm}>
        {formTypes.hideFormOne && !formTypes.emailFormat && (
          <>
            <h2>Send a Broadcast</h2>
            <div className={css.broadcastForm_1}>
              <h3>What type of Broadcast would you like to send?</h3>
              <div className={css.broadcastTypes}>
                <button
                  className={broadcastType === "wtb" ? css.selected : ""}
                  onClick={() => setBroadcastType("wtb")}
                >
                  <span>WTB</span>
                  <span>Want to Buy</span>
                </button>
                <button
                  className={broadcastType === "rfq" ? css.selected : ""}
                  onClick={() => setBroadcastType("rfq")}
                >
                  RFQ
                  <br />
                  Request for Quote
                </button>
                <button
                  className={broadcastType === "wts" ? css.selected : ""}
                  onClick={() => setBroadcastType("wts")}
                >
                  WTS
                  <br />
                  Want to Sell
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
                  Single Part / Item
                </button>
                <button
                  className={category === "service" ? css.selected : ""}
                  onClick={() => setCategory("service")}
                >
                  Service
                </button>
                <button
                  className={
                    category === "multiple parts / items" ? css.selected : ""
                  }
                  onClick={() => setCategory("multiple parts / items")}
                >
                  Multiple Parts / Items
                </button>
              </div>
            </div>
            <div className={css.actions}>
              <button>Cancel</button>
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
          {formTypes.wtb && !formTypes.emailFormat && (
            <>
              <div className={css.formTypeLayout}>
                <h3>Want To Buy (WTB): {category}</h3>
                <div className={css.toggleCategories}>
                  <div className={css.headings}>
                    <h1>Categories</h1>
                    <p>(Click to expand further)</p>
                  </div>
                  <ToggleCategories />
                </div>
                <div className={css.toggleFilters}>
                  <div className={css.headings}>
                    <h1>Filters</h1>
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
                  {files.length > 0 && (
                    <div className={css.file_list}>
                      <h4>Selected Files:</h4>
                      <ul>
                        {files.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
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
                        required
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
                      />
                    </div>
                    <div>
                      <label htmlFor="price">Price</label>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="quantity">Quantity</label>
                      <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className={css.mainFields_3}>
                    <div>
                      <label htmlFor="buy_in_bulk">Bulk</label>
                      {/* <input type="radio" name="" id="" /> */}
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
                      cols={10}
                      rows={4}
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="additional_comments">Comments</label>
                    <input
                      type="text"
                      name="additional_comments"
                      value={formData.additional_comments}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className={css.actions}>
                <button onClick={handlePrevious}>Previous</button>
                <span>
                  <button>Cancel</button>
                  <button onClick={handleContinueForm}>Continue</button>
                </span>
              </div>
            </>
          )}
          {formTypes.rfq && !formTypes.emailFormat && (
            <>
              <div className={css.formTypeLayout}>
                <h3>Request For Quote (RFQ): {category}</h3>
                <div className={css.toggleCategories}>
                  <div className={css.headings}>
                    <h1>Categories</h1>
                    <p>(Click to expand further)</p>
                  </div>
                  <ToggleCategories />
                </div>
                <div className={css.toggleFilters}>
                  <div className={css.headings}>
                    <h1>Filters</h1>
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
                  {files.length > 0 && (
                    <div className={css.file_list}>
                      <h4>Selected Files:</h4>
                      <ul>
                        {files.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
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
                        required
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
                      />
                    </div>
                    <div>
                      <label htmlFor="price">Price</label>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="quantity">Quantity</label>
                      <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className={css.mainFields_3}>
                    <div>
                      <label htmlFor="buy_in_bulk">Bulk</label>
                      {/* <input type="radio" name="" id="" /> */}
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
                      cols={10}
                      rows={4}
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="additional_comments">Comments</label>
                    <input
                      type="text"
                      name="additional_comments"
                      value={formData.additional_comments}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className={css.actions}>
                <button onClick={handlePrevious}>Previous</button>
                <span>
                  <button>Cancel</button>
                  <button onClick={handleContinueForm}>Continue</button>
                </span>
              </div>
            </>
          )}
          {formTypes.wts && !formTypes.emailFormat && (
            <>
              <div className={css.formTypeLayout}>
                <h3>Want To Sell (WTS): {category}</h3>
                <div className={css.toggleCategories}>
                  <div className={css.headings}>
                    <h1>Categories</h1>
                    <p>(Click to expand further)</p>
                  </div>
                  <ToggleCategories />
                </div>
                <div className={css.toggleFilters}>
                  <div className={css.headings}>
                    <h1>Filters</h1>
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
                  {files.length > 0 && (
                    <div className={css.file_list}>
                      <h4>Selected Files:</h4>
                      <ul>
                        {files.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
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
                        required
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
                      />
                    </div>
                    <div>
                      <label htmlFor="price">Price</label>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="quantity">Quantity</label>
                      <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className={css.mainFields_3}>
                    <div>
                      <label htmlFor="buy_in_bulk">Bulk</label>
                      {/* <input type="radio" name="" id="" /> */}
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
                      cols={10}
                      rows={4}
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="additional_comments">Comments</label>
                    <input
                      type="text"
                      name="additional_comments"
                      value={formData.additional_comments}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className={css.actions}>
                <button onClick={handlePrevious}>Previous</button>
                <span>
                  <button>Cancel</button>
                  <button onClick={handleContinueForm}>Continue</button>
                </span>
              </div>
            </>
          )}
          {formTypes.emailFormat && (
            <div>
              <h3>Email Format</h3>
              {/* {formData.map((item) => {
                return <div key={item.id}></div>;
              })} */}
              <input type="submit" value="SUBMIT" />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BroadcastForm;

import React, { useState, useEffect } from "react";
import css from "./Send.module.css";
import ToggleCategories from "./Field Components/ToggleCategories";
import ToggleFilters from "./Field Components/ToggleFilters";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  sendBroadcast,
  setSelectedCompanyNames,
} from "../../../../ReduxStore/BroadCast";
import Services from "./Field Components/Services";
import { clearAllSelections } from "../../../../ReduxStore/BroadCast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { MdModeEditOutline } from "react-icons/md";
import { RiNumber2 } from "react-icons/ri";
import { RiNumber3 } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";

const BroadcastForm = () => {
  const token = Cookies.get("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const service = useSelector((state) => state.broadcastStore.serviceData);
  const [params] = useSearchParams();

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
  const [fileName, setFileName] = useState("");

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
    sendCopy: false,
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
    serviceData,
    selectedCompanyNames,
  } = useSelector((state) => state.broadcastStore);
  console.log(
    "Selected Company Name from Send Broadcast Page,",
    selectedCompanyNames
  );

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
    console.log(type, checked, value, name);
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle file input change
  const handleFileChange = (event) => {
    const selectedFiles = event.target.files[0];
    if (selectedFiles) {
      setFiles(selectedFiles);
      setFileName(selectedFiles.name); // Store the file name
    } else {
      setFiles("");
      setFileName(""); // Clear file name if no file is selected
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
    setFileName("");
    setSelectedCompanyNames([]);
  };

  const getStepIcon = (step) => {
    switch (step) {
      case "choose":
        if (formTypes.emailFormat) return <FaCheck />;
        if (formTypes[broadcastType]) return <FaCheck />;
        return <MdModeEditOutline />;

      case "create":
        if (formTypes.emailFormat) return <FaCheck />;
        if (formTypes[broadcastType]) return <MdModeEditOutline />;
        return <RiNumber2 />;

      case "review":
        if (formTypes.emailFormat) return <MdModeEditOutline />;
        return <RiNumber3 />;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data for submission
    let data;
    if (files) {
      data = new FormData();
      data.append("uploadFile", files);

      data.append("type", broadcastType);
      data.append("selectedComputer", JSON.stringify(computerSelection));
      data.append("selectedTelecom", JSON.stringify(telecomSelection));
      data.append(
        "selectedMobileDevices",
        JSON.stringify(mobileDevicesSelection)
      );
      data.append("selectedRegion", JSON.stringify(regionSelection));
      data.append("companiesSelection", JSON.stringify(selectedCompanyNames));
      data.append("service", JSON.stringify(serviceData));

      for (const [key, value] of Object.entries(formData)) {
        data.append(key, value);
      }
    } else {
      data = {
        ...formData,
        type: broadcastType,
        selectedComputer: computerSelection,
        selectedTelecom: telecomSelection,
        selectedMobileDevices: mobileDevicesSelection,
        selectedRegion: regionSelection,
        companiesSelection: selectedCompanyNames,
        service: serviceData,
      };
    }

    // Dispatch the data with token
    dispatch(sendBroadcast({ token, data }))
      .then((resultAction) => {
        if (sendBroadcast.fulfilled.match(resultAction)) {
          console.log(
            "%c✅ Broadcast sent successfully:",
            "color: green;",
            resultAction
          );

          toast.info("Your Broadcast Has Been Sent Successfully", {
            style: {
              fontSize: "12px",
              marginTop: "-10px",
              fontWeight: "bold",
            },
          });

          // Clear serviceData after submission
          dispatch(clearAllSelections());

          // Clear the form fields after successful submission
          cancelAllActions();
          setFileName("");
        } else {
          console.error("❌ Broadcast dispatch failed:", resultAction);
          toast.error("Failed Sending Broadcast. Please Try Again", {
            style: { fontSize: "12px", marginTop: "-10px" , fontWeight: "bold",},
          });
        }
      })
      .catch((error) => {
        console.error("💥 Unexpected error storing data:", error);
        toast.error("An unexpected error occurred while sending broadcast.", {
          style: { fontSize: "15px", marginTop: "-10px" },
        });
      });

    // Set email format
    setEmailFormat((prev) => ({
      ...prev,
      time: new Date().toLocaleTimeString("en-US", { hour12: true }),
      date: new Date().toLocaleDateString("en-US"),
    }));

    console.log("Token:", token);
  };

  useEffect(() => {
    const type = params.get("type");
    const category = params.get("category");
    const prefill = {
      partModel: params.get("partModel") || "",
      mfg: params.get("mfg") || "",
      cond: params.get("cond") || "",
      heciClei: params.get("heciClei") || "",
      price: params.get("price") || "",
      quantity: params.get("quantity") || "",
      description: params.get("description") || "",
    };
    if (type && category) {
      setBroadcastType(type);
      setCategory(category);
      setFormData((prev) => ({ ...prev, ...prefill }));
      setFormTypes((prev) => ({
        ...prev,
        [type]: true,
        hideFormOne: false,
      }));
    }
  }, []);

  return (
    <div className={css.outerPadding}>
      <div className={css.broadcastForm}>
        <div className="border-b-2 border-b-gray-300 ">
          <ul className="flex justify-around items-center my">
            <li className="text-[10pt] flex justify-start items-center gap-2">
              <i className="bg-blue-600 text-white rounded-3xl p-2">
                {getStepIcon("choose")}
              </i>
              <span> CHOOSE A TYPE </span>
            </li>

            <li className="text-[10pt] flex justify-start items-center gap-2">
              <i className="bg-blue-600 text-white  rounded-3xl p-2">
                {getStepIcon("create")}
              </i>
              <span>CREATE</span>
            </li>

            <li className="text-[10pt] flex justify-start items-center gap-2">
              <i className="bg-blue-600 text-white  rounded-3xl p-2">
                {getStepIcon("review")}
              </i>
              <span>REVIEW AND SEND</span>
            </li>
          </ul>
        </div>
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
                    <span
                      style={{
                        color: "blue",
                        fontSize: "2rem",
                        fontWeight: "600",
                      }}
                    >
                      WTB
                    </span>
                    <span>Want to Buy</span>
                  </button>
                  <button
                    className={broadcastType === "rfq" ? css.selected : ""}
                    onClick={() => setBroadcastType("rfq")}
                  >
                    <span
                      style={{
                        color: "green",
                        fontSize: "2rem",
                        fontWeight: "600",
                      }}
                    >
                      RFQ
                    </span>
                    <span>Request for Quote</span>
                  </button>
                  <button
                    className={broadcastType === "wts" ? css.selected : ""}
                    onClick={() => setBroadcastType("wts")}
                  >
                    <span
                      style={{
                        color: "red",
                        fontSize: "2rem",
                        fontWeight: "600",
                      }}
                    >
                      WTS
                    </span>
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
                    <span className={css.sendTitle}>Single Part / Item</span>
                    <span>attach files or paste text</span>
                    <small>(pdf, csv, xlsx, txt, photos, datasheets)</small>
                  </button>
                  <button
                    className={category === "service" ? css.selected : ""}
                    onClick={() => setCategory("service")}
                  >
                    <span className={css.sendTitle}>Service</span>
                    <span>attach files or paste text</span>
                    <small>(pdf, csv, xlsx, txt, photos, datasheets)</small>
                  </button>
                  <button
                    className={
                      category === "multiple parts / items" ? css.selected : ""
                    }
                    onClick={() => setCategory("multiple parts / items")}
                  >
                    <span className={css.sendTitle}>
                      Multiple Parts / Items
                    </span>
                    <span>attach files or paste text</span>
                    <small>(pdf, csv, xlsx, txt, photos, datasheets)</small>
                  </button>
                </div>
              </div>
            </div>
            <div className={css.actions}>
              <button onClick={cancelAllActions} className={css.cancelBtn}>
                Cancel
              </button>
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

                {category === "service" && (
                  <div className={css.toggleServices}>
                    <div className={css.headings}>
                      <h3>Services</h3>
                      <p>(Click to Expand Further)</p>
                    </div>
                    <div>
                      <Services />
                    </div>
                  </div>
                )}

                {category != "service" && (
                  <div className={css.toggleCategories}>
                    <div className={css.headings}>
                      <h3>Categories</h3>
                      <p>(Click to Expand Further)</p>
                    </div>
                    <ToggleCategories />
                  </div>
                )}

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
                  {fileName && (
                    <p
                      className="text-lg 
                   text-orange-500 "
                    >
                      Selected file: {fileName}
                    </p>
                  )}
                </div>
                <div className={css.mainFields}>
                  {category !== "multiple parts / items" && (
                    <>
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
                          <label htmlFor="cond">Condition</label>
                          <select
                            name="cond"
                            value={formData.cond}
                            onChange={handleInputChange}
                          >
                            <option value="">Select</option>
                            <option value="any">Any</option>
                            <option value="new">New</option>
                            <option value="f/s">F/S</option>
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
                    </>
                  )}

                  {/* Always show MFG and radio buttons ONLY for multiple parts */}
                  {category === "multiple parts / items" && (
                    <>
                      <div>
                        <label htmlFor="mfg">MFG</label>
                        <input
                          type="text"
                          name="mfg"
                          value={formData.mfg}
                          onChange={handleInputChange}
                          placeholder="MFG"
                          required
                          className="ml-5"
                        />
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
                    </>
                  )}
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

                  <div className="!flex !flex-row">
                    <label htmlFor="sendCopy">Send a copy to myself</label>
                    <input
                      type="checkbox"
                      name="sendCopy"
                      checked={formData.sendCopy}
                      onChange={handleInputChange}
                    />
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
              {broadcastType === "wtb" && <h3>Want to Buy (WTB)</h3>}
              {broadcastType === "rfq" && <h3>Request for Quote (RFQ)</h3>}
              {broadcastType === "wts" && <h3>Want to Sell (WTS)</h3>}
              <div className={css.broadcastEmailFormat}>
                <div>
                  {[user].map((item) => {
                    return (
                      <ul>
                        <li>
                          <p>From:</p>
                          <p>{user.firstName}</p>
                          <p>{`[${user.email}]`}</p>
                        </li>
                        <li>
                          <p>Sent:</p>
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
                      <ul key={item.id} className={`${css.broadcastUL}`}>
                        {broadcastType === "wtb" && (
                          <li>
                            <p>Type:</p>
                            <p className="uppercase">Want To Buy (WTB)</p>
                          </li>
                        )}
                        {broadcastType === "rfq" && (
                          <li>
                            <p>Type:</p>
                            <p className="uppercase">Request For Quote (RFQ)</p>
                          </li>
                        )}
                        {broadcastType === "wts" && (
                          <li>
                            <p>Type:</p>
                            <p>Want To Sell (WTS)</p>
                          </li>
                        )}
                        <li>
                          <p>Part:</p>
                          <p>{item.partModel}</p>
                        </li>
                        <li>
                          <p>Mfg:</p>
                          <p>{item.mfg}</p>
                        </li>
                        <li>
                          <p>Cond:</p>
                          <p>{item.cond}</p>
                        </li>
                        <li>
                          <p>Qty:</p>
                          <p>{item.quantity}</p>
                        </li>
                        <li>
                          <p>Price:</p>
                          <p>{item.price}</p>
                        </li>
                        <li>
                          <p>Description:</p>
                          <p>{item.description}</p>
                        </li>
                        <li>
                          <p>Services</p>
                          {service.map((val, index) => {
                            return <li>{val}</li>;
                          })}
                        </li>
                      </ul>
                    );
                  })}
                </div>
                <div>
                  {[user].map((item) => {
                    return (
                      <ul>
                        <li>
                          {user.firstName} {user.lastName}
                        </li>
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
                  <button type="button" onClick={cancelAllActions}>
                    Cancel
                  </button>
                  {/* <input type="submit" value="SEND" style={{ cursor: "pointer" }} /> */}
                  <input
                    type="button"
                    value="SEND"
                    className="cursor-pointer px-5 py-4 border border-blue-500 rounded-lg transform active:scale-90 transition-all duration-100  "
                    onClick={handleSubmit}
                  />
                </span>
              </div>
            </div>
          )}
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default BroadcastForm;

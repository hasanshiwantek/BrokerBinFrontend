import React, { useEffect, useState, useRef } from "react";
import css from "../../styles/Menu/Manage/MyRFQNew.module.css";
import AddCircle from "../../svgs/AddCircle";
import Attach from "../../svgs/Attach";
import { MdRemoveCircle } from "react-icons/md";
import TextEditor from "../TextEditor";
import { setPopUpRfq } from "../../ReduxStore/SearchProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { addRecipients, searchProductQuery } from "../../ReduxStore/RfqSlice";
import Cookies from "js-cookie";
import { submitRfq, clearSearchResults } from "../../ReduxStore/RfqSlice";
import AddParts from "./AddParts";
import { fetchUserData } from "../../ReduxStore/ProfleSlice";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyRFQNew = () => {

  const { selectedProducts } = useSelector((store) => store.searchProductStore);
  console.log("SelectedProducts", selectedProducts);
  const dispatch = useDispatch();
  const [total, received, sent] = [110, 90, 0];
  const [comment, setComment] = useState(""); // State to hold the value of the text editor
  const searchResults = useSelector((state) => state.rfqStore.searchResults);
  const { searchResponseMatched } = useSelector((state) => state.rfqStore);
  const recipientDropdownRef = useRef(null); // Reference to the recipient dropdown
  const [showRecipientDropdown, setShowRecipientDropdown] = useState(false);
  console.log("Search Results in Component:", searchResults);
  const [isFormValid, setFormValid] = useState(false);
  const validParts = useRef({});  // Use a ref to track validity of each part
  const token = Cookies.get("token");
  const modalRef = useRef(null); // Create a reference to the modal

  const { initialData, user } = useSelector((state) => state.profileStore);
  const id = user?.user?.id;

  const handlePartValidity = (partId, isValid) => {
    validParts.current[partId] = isValid;
    // Check if all parts are valid
    setFormValid(Object.values(validParts.current).every(status => status));
  };




  const subject = "Quote Needed"; // Default to "Quote Needed" if no RFQ is selected

  // Pre-populate user data in the comment
  useEffect(() => {
    if (id) {
      dispatch(fetchUserData({ id, token }));
    }
  }, [id, dispatch, token]);


  useEffect(() => {
    if (initialData) {
      // Format the user information for the text editor
      const userInfo = `
     <p><strong>Quote Needed Looking for the best price, availability & lead time.</strong></p>
        <p>--------------</p>
        <p><strong>${initialData.firstName || " "} ${initialData.lastName || ""}</strong></p>
        <p>${initialData?.company?.name || ""}</p>
        <p><strong></strong> ${initialData.phoneNumber || ""}</p>
        <p><strong></strong> ${initialData.email || ""}</p>
    `;
      setComment(userInfo); // Set the comment state to include the user data
    }
  }, [initialData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the modal area
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        return; // Ignore clicks outside the modal area
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (recipientDropdownRef.current && !recipientDropdownRef.current.contains(event.target)) {
        setShowRecipientDropdown(false); // Close the dropdown if the click is outside
      }
    };

    // Attach the event listener to the document
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  // Handle comment change
  const handleCommentChange = (content, delta, source, editor) => {
    const text = editor.getHTML();
    setComment(text); // Update the comment state when the text editor changes
  };

  // make sure only unique models goes to rfq.
  const groupByPartModel = (data) => {
    return data.reduce((acc, part) => {
      if (!acc[part.partModel]) {
        acc[part.partModel] = [];
      }
      acc[part.partModel].push(part);
      return acc;
    }, {});
  };

  const getUniqueMFGsAndConditions = (groupedParts) => {
    return Object.keys(groupedParts).map((partModel) => {
      const parts = groupedParts[partModel];
      const mfgs = [...new Set(parts.map((part) => part.mfg))];
      const conds = [...new Set(parts.map((part) => part.cond))];

      // return { partModel, mfgs, conds };
      return {
        partModel,
        mfgs,
        conds,
        mfg: mfgs[0] || "", // Default to the first MFG
        cond: conds[0] || "", // Default to the first Condition
      };

    });
  };

  // Grouping and getting unique MFGs and Conds for each partModel
  const groupedParts = groupByPartModel(selectedProducts);
  const filteredData = getUniqueMFGsAndConditions(groupedParts);
  console.log(filteredData);


  const [parts, setParts] = useState(filteredData);
  console.log("Parts", parts);

  const [selectedProductsBCC, setSelectedProductsBCC] =
    useState(selectedProducts);

  const removeBCC = (e, id) => {
    e.stopPropagation();
    setSelectedProductsBCC((prev) => prev.filter((item) => item.id !== id));
  };


  const addPart = () => {
    setParts([...parts, { id: Date.now(), partModel: " ", heciClei: " ", mfg: "", condition: "", quantity: "", isNew: true, targetPrice: "", terms: "", }]);
  };

  // Function to handle removing a part by id
  const removePart = (id) => {
    setParts((parts) => parts.filter((part) => part.id !== id));
  };

  // Function to update part fields
  const updatePart = (partModel, field, value) => {
    setParts((parts) =>
      parts.map((part) =>
        part.partModel === partModel
          ? field === "bulkUpdate"
            ? { ...part, ...value } // Merge all updates in one go
            : { ...part, [field]: value }
          : part
      )
    );
  };


  const [recipients, setRecipients] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [uploadFile, setFile] = useState(null);

  const handleRecipientClick = (e, selectedRecipient) => {
    e.preventDefault();

    const recipientEmail = selectedRecipient.email.replace("mailto:", "");

    // Add the recipient object if not already present
    const exists = recipients.some(
      (recipient) => recipient.email === recipientEmail
    );

    if (!exists) {
      setRecipients((prev) => [
        ...prev,
        {
          firstName: selectedRecipient.firstName,
          lastName: selectedRecipient.lastName,
          email: recipientEmail,
        },
      ]);
    }

    setInputValue(""); // Clear input field

    dispatch(clearSearchResults()) ? console.log("Cleared") : console.log("Not cleared");

  };

  console.log(recipients)

  const handleRecipientSearch = async (e) => {
    const query = e.target.value;
    setInputValue(query); // Update input field value
    setShowRecipientDropdown(true);

    if (query.trim() === "") {
      dispatch(clearSearchResults());
      setShowRecipientDropdown(false);
      return;
    }

    try {
      await dispatch(addRecipients({ token: Cookies.get("token"), search: query })).unwrap();
    } catch (error) {
      console.error("Error fetching recipients:", error);
    }
  };

  const handlePartModelSearch = async (query) => {
    if (query.trim() === "") return; // Avoid unnecessary API calls

    try {
      console.log("Querying:", query);
      await dispatch(searchProductQuery({ token, search: query })).unwrap();
    } catch (error) {
      console.error("Error fetching part models:", error);
    }
  };

  const handleRemoveRecipient = (e, emailToRemove) => {
    e.stopPropagation();
    console.log("Before removal:", recipients);
    console.log("Removing:", emailToRemove);

    setRecipients((prev) => prev.filter((recipient) => recipient.email !== emailToRemove));

    console.log("After removal:", recipients);
  };

  console.log("BCC", selectedProductsBCC)

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };



  const getUniqueBCC = (data) => {
    const seen = new Set();
    return data.filter((item) => {
      const identifier = `${item.addedBy.firstName}-${item.addedBy.lastName}-${item.addedBy.company.name}`;
      if (seen.has(identifier)) {
        return false;
      }
      seen.add(identifier);
      return true;
    });
  };

  // Filtered BCC list to ensure uniqueness
  const uniqueBCCList = getUniqueBCC(selectedProductsBCC);
  console.log("Unique BCCS ", uniqueBCCList)


  const submitHandle = async (e) => {


    const formData = new FormData();
    console.log("Submit handle triggered"); // Debugging log

    // Add Region field
    const region = document.querySelector('[name="send_all_vendors_region"]')?.value;
    formData.append("region", region || "");

    // Add the subject field
    const subject = document.querySelector('[name="subject"]')?.value;
    formData.append("subject", subject || "");

    // Add valid BCC emails
    recipients
      .filter((recipient) => isValidEmail(recipient.email)) // Validate email
      .forEach((recipient, index) => {
        formData.append(`recipients[${index}]`, recipient.email);
      });

    // Add comment
    formData.append("comment", comment);

    // Add parts
    parts.forEach((part, index) => {
      formData.append(`parts[${index}][id]`, part.id || index + 1); // Ensure id is present
      formData.append(`parts[${index}][partNumber]`, part.partModel);
      formData.append(`parts[${index}][quantity]`, part.quantity);
      formData.append(`parts[${index}][heciClei]`, part.heciClei || "");
      formData.append(`parts[${index}][mfg]`, part.mfg || "");
      formData.append(`parts[${index}][condition]`, part.cond || "");
      formData.append(`parts[${index}][targetPrice]`, part.targetPrice || "");
      formData.append(`parts[${index}][terms]`, part.terms || "");
    });

    // Add valid bcc emails
    const validEmails = selectedProductsBCC
      .map((item) => item.addedBy.email) // Extract the `email` field instead of `mfg`
      .filter((email) => /\S+@\S+\.\S+/.test(email)); // Validate email format
    validEmails.forEach((email, index) => {
      formData.append(`bcc[${index}]`, email); // Append valid emails to `bcc`
    });

    // Boolean fields
    const booleanFields = [
      "poInHand",
      "sendCopyToMyself",
      "sendToMyVendorsList",
      "sendToStockingVendorsIn",
      "partialOrderQuotesAccepted",
    ];
    booleanFields.forEach((field) => {
      formData.append(field, document.querySelector(`[name="${field}"]`)?.checked ? 1 : 0);
    });

    // Add file to FormData
    if (uploadFile) {
      formData.append("uploadFile", uploadFile); // Use 'uploadFile' as the key name
    } else {
      console.error("No file selected.");
    }

    console.log("FormData contents:");
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    // Send the data
    try {
      await dispatch(submitRfq({ token, data: formData }))

      console.log("Submission successful! Triggering toast..."); // Debugging log
      // Clear form fields after successful submission
      clearFields();
      // ✅ Show success toast with light blue color
      toast.info("RFQ submitted Succesfully!", {
        style: { fontSize: "12px", marginTop: "-20px", fontWeight: "bold" }, // 
      })

    } catch (error) {
      console.error("Error submitting RFQ:", error);
      toast.error("Error submitting RFQ.Please try Again.", {
        style: { fontSize: "12px", marginTop: "-20px", fontWeight: "bold" }, // 
      });
    }
  };

  // Function to clear the form fields
  const clearFields = () => {
    // Clear state variables
    setRecipients([]);
    setComment("");
    setParts([]);
    setFile(null);

    // Clear inputs in the DOM
    const regionInput = document.querySelector('[name="send_all_vendors_region"]');
    if (regionInput) regionInput.value = "";

    const subjectInput = document.querySelector('[name="subject"]');
    if (subjectInput) subjectInput.value = "";

    // Uncheck boolean fields
    const booleanFields = [
      "poInHand",
      "sendCopyToMyself",
      "sendToMyVendorsList",
      "sendToStockingVendorsIn",
      "partialOrderQuotesAccepted",
    ];
    booleanFields.forEach((field) => {
      const input = document.querySelector(`[name="${field}"]`);
      if (input) {
        input.checked = false;
      }
    });
  };



  return (
    <>
      <div className={css.rfqPopUp}>
        <form >
          <div className={`${css.rfqNew}  sm:h-[58vh] lg:h-[68vh]`} ref={modalRef}>

            <div className={css.rfqBody}>
              <div className={css.rfqHeaderSec}>

                <div className={css.rfqBody_Header}>
                  <ul>
                    <li>
                      <a href="/rfq">
                        received
                      </a>
                    </li>
                    <li>
                      <a href="/rfqSent">sent</a>
                    </li>
                    <li>
                      <a href="/" style={{ color: " rgb(102, 142, 252)" }}>new</a>
                    </li>
                    <li>
                      <a href="/">archive</a>
                    </li>
                  </ul>
                </div>
                <div className={css.rfqBody_closeBtn}>
                  <button type="button" onClick={() => dispatch(setPopUpRfq())}>
                    X
                  </button>
                </div>
              </div>
              <div className={css.rfqBody_Main}>
                <div className={css.rfqBody_Main_left}>
                  <div className={css.rfqBody_Main_left_receptions}>
                    <span>
                      <label htmlFor="recepient">Add Recipient:</label>
                      <input
                        name="recipient"
                        type="text"
                        value={inputValue} // Controlled input value
                        onChange={handleRecipientSearch} // Trigger search on input change
                        style={{ width: "20vw" }}
                      />
                      <div ref={recipientDropdownRef} className={css.receipentSec} style={{ position: "relative" }}>
                        {searchResults.length > 0 && showRecipientDropdown && (
                          <ul
                            style={{
                              position: "absolute",
                              zIndex: 1000,
                              background: "#fff",
                              border: "1px solid #ccc",
                              top: "0%",
                              left: "132px",
                              width: "223%",
                              padding: "4px",
                              maxHeight: "300px"
                            }}
                          >
                            {
                              searchResults.map((user) => (
                                <li
                                  key={user.id}
                                  onClick={(e) => {
                                    handleRecipientClick(e, user);
                                    setShowRecipientDropdown(false);
                                  }}

                                  style={{
                                    borderBottom: "1px solid #ccc",
                                    padding: "1px",
                                    cursor: "pointer",
                                  }}
                                >
                                  {user.firstName} {user.lastName}<br />
                                  {user.email.replace("mailto:", "")}
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    </span>
                    <span>
                      <label htmlFor="">BCC:</label>
                      <span className={css.rfqBody_Main_left_receptions_bcc}>
                        {uniqueBCCList.map((item) => (
                          <span key={item.id}>
                            <div className="flex items-center mt-2 gap-2">
                              <MdRemoveCircle
                                onClick={(e) => removeBCC(e, item.id)}
                                style={{ cursor: "pointer" }}
                              />
                              <strong>
                                {item.addedBy.company.name} ({item.addedBy.firstName} {item.addedBy.lastName})
                              </strong>
                            </div>
                          </span>
                        ))}
                        {
                          recipients.map((item, i) => {
                            return (
                              <span key={i}>
                                <MdRemoveCircle
                                  onClick={(e) => handleRemoveRecipient(e, item.email)} // Pass the email
                                  style={{ cursor: "pointer" }}
                                />
                                <strong> {item.firstName} {item.lastName}</strong>
                              </span>
                            );
                          })
                        }
                      </span>
                    </span>
                    <span>
                      <label htmlFor="">Subject:</label>
                      <input name="subject" type="text" defaultValue={subject} />
                    </span>
                  </div>

                  <div className={css.rfqBody_Main_left_addParts}>
                    <div></div>
                    <div>
                      <div className={css.rfqBody_Main_left_addParts_label}>
                        <div>
                          <label htmlFor="text">Part#</label>
                          <label htmlFor="text">HECI / CLEI</label>
                          <label htmlFor="select">Mfg </label>
                          <label htmlFor="select">Cond </label>
                          <label htmlFor="number">Qty <span className="text-red-600 -mt-8 ml-9">*</span></label>
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
                            onSearch={handlePartModelSearch}
                            searchResponseMatched={searchResponseMatched}
                            isNew={part.isNew}
                            selectedProducts={selectedProducts}
                            onValidityChange={handlePartValidity}
                          />

                        ))}
                      </span>

                      <div className={css.rfqBody_Main_left_addParts_AddBtn}>
                        <button type="button" onClick={addPart}>
                          <AddCircle />
                          Add Part
                        </button>
                        <label htmlFor="uploadFile">
                          <Attach />
                          Attach a File
                        </label>
                        <input
                          id="uploadFile"
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e) => setFile(e.target.files[0]) || null} // Update state with the selected file
                        />
                        {uploadFile && <span className="text-sm">{uploadFile.name}</span>}
                      </div>
                    </div>
                  </div>
                  <div className={css.rfqBody_Main_left_comments}>
                    <label htmlFor="" style={{ marginLeft: "50px" }}>Comments</label>

                    <TextEditor
                      handleCommentChange={handleCommentChange}
                      comment={comment}
                      className={`${css.ql_editor}`}
                    />
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
                    <thead >
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
                      {uniqueBCCList.map((item) => (
                        <span key={item.id}>
                          <div className="flex items-center mt-2 gap-2">
                            <MdRemoveCircle
                              onClick={(e) => removeBCC(e, item.id)}
                              style={{ cursor: "pointer" }}
                            />
                            <strong>
                              {item.addedBy.company.name} ({item.addedBy.firstName} {item.addedBy.lastName})
                            </strong>
                          </div>
                        </span>
                      ))}
                      {
                        recipients.map((item, i) => {
                          return (

                            <span key={i}>
                              <div className="flex items-center mt-2 gap-2">

                                <MdRemoveCircle
                                  onClick={(e) => handleRemoveRecipient(e, item.email)} // Pass the email
                                  style={{ cursor: "pointer" }}
                                />
                                <strong>({item.firstName} {item.lastName})</strong>
                              </div>
                            </span>

                          );
                        })
                      }
                    </tfoot>
                  </table>
                </div>
              </div>
              <div className={css.rfqBody_sendBtn}>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  onClick={(e) => {
                    e.preventDefault();
                    submitHandle();
                    dispatch(setPopUpRfq(false));
                  }}
                  className={`${isFormValid
                    ? "bg-blue-500 hover:bg-blue-700 text-white"
                    : "bg-blue-500 text-white opacity-50 cursor-not-allowed"
                    } px-4 py-2 rounded shadow`}
                >
                  Send
                </button>


              </div>
            </div>
          </div>
        </form>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />


    </>
  );
};

export default MyRFQNew;
















































































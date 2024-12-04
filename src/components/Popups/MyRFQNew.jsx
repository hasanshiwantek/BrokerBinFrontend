// import React, { useEffect, useState } from "react";
// import css from "../../styles/Menu/Manage/MyRFQNew.module.css";
// import AddCircle from "../../svgs/AddCircle";
// import Attach from "../../svgs/Attach";
// import { MdRemoveCircle } from "react-icons/md";
// import TextEditor from "../TextEditor";
// import { setPopUpRfq } from "../../ReduxStore/SearchProductSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { addRecipients } from "../../ReduxStore/RfqSlice";
// import Cookies from "js-cookie";
// import { submitRfq, clearSearchResults } from "../../ReduxStore/RfqSlice";

// const AddParts = ({ part, onUpdate, onRemove }) => {
//   const handleRemove = (event) => {
//     event.stopPropagation(); // This stops the click event from bubbling up to parent elements.
//     onRemove(part.id);
//   };
//   const handleInputChange = (field, value) => {
//     onUpdate(part.id, field, value);
//   };

//   return (
//     <div className={css.rfqBody_Main_left_addParts_Addfields}>
//       <button type="button" onClick={handleRemove} className={css.removeBtn}  >
//         <MdRemoveCircle />
//       </button>
//       <div>
//         <input
//           type="text"
//           value={part.partModel}
//           onChange={(e) => handleInputChange("partNumber", e.target.value)}
//         />
//         <input
//           type="text"
//           value={part.heci}
//           onChange={(e) => handleInputChange("heciClei", e.target.value)}
//         />
//         <select
//           value={part.mfg}
//           onChange={(e) => handleInputChange("mfg", e.target.value)}
//         >
//           <option value={part.mfg}>{part.mfg}</option>
//         </select>
//         <select
//           value={part.cond}
//           onChange={(e) => handleInputChange("condition", e.target.value)}
//         >
//           <option value={part.cond}>{part.cond}</option>
//           {/* Additional options */}
//         </select>
//         <input
//           type="text"
//           value={part.quantity}
//           onChange={(e) => handleInputChange("quantity", e.target.value)}
//         />
//         <input
//           type="text"
//           value={part.targetPrice}
//           onChange={(e) => handleInputChange("targetPrice", e.target.value)}
//         />
//         <input
//           type="text"
//           value={part.terms}
//           onChange={(e) => handleInputChange("terms", e.target.value)}
//         />
//       </div>
//     </div>
//   );
// };

// const MyRFQNew = () => {
//   const { selectedProducts } = useSelector((store) => store.searchProductStore);
//   const dispatch = useDispatch();
//   const [total, received, sent] = [110, 90, 0];
//   const [comment, setComment] = useState(""); // State to hold the value of the text editor
//   const searchResults = useSelector((state) => state.rfqStore.searchResults);
//   const { searchResponseMatched } = useSelector((store) => store.searchProductStore);

//   console.log("Search Results in Component:", searchResults);


//   const token = Cookies.get("token");

//   const handleCommentChange = (content, delta, source, editor) => {
//     const text = editor.getHTML();
//     // getText()
//     // this.setState({ content: text });
//     // console.log(text);
//     // setComment(editor.getText()); // This sets the inner HTML content from the editor to the state
//     // console.log(text);

//     setComment(text); // Use editor.getHTML() to get the HTML content

//     // console.log(comment);
//   };

//   // make sure only unique models goes to rfq.
//   const filterUniqueModels = (data) => {
//     const uniqueModels = new Set();
//     return data.filter((item) => {
//       if (uniqueModels.has(item.partModel)) {
//         return false;
//       } else {
//         uniqueModels.add(item.partModel);
//         return true;
//       }
//     });
//   };

//   // filtered Unique models because we don't want to send RFQ with same model numbers.
//   const filteredData = filterUniqueModels(selectedProducts);
//   console.log(filteredData);

//   const [parts, setParts] = useState(filteredData);
//   const [selectedProductsBCC, setSelectedProductsBCC] =
//     useState(selectedProducts);

//   const removeBCC = (e, id) => {
//     e.stopPropagation();
//     setSelectedProductsBCC((prev) => prev.filter((item) => item.id !== id));
//   };

//   // Function to handle adding new parts
//   const addPart = () => {
//     const newPart = {
//       id: parts.length,
//       partNumber: "",
//       heciClei: "",
//       mfg: "",
//       condition: "",
//       quantity: "",
//       targetPrice: "",
//       terms: "",
//     };
//     setParts((parts) => [...parts, newPart]);
//   };

//   // Function to handle removing a part by id
//   const removePart = (id) => {
//     setParts((parts) => parts.filter((part) => part.id !== id));
//   };

//   // Function to update part fields
//   const updatePart = (id, field, value) => {
//     setParts((parts) =>
//       parts.map((part) => (part.id === id ? { ...part, [field]: value } : part))
//     );
//   };

//   // useEffect(() => {
//   //   const handleClickOutside = (event) => {
//   //     const rfqNew = document.querySelector(`.${css.rfqNew}`);
//   //     if (rfqNew && !rfqNew.contains(event.target)) {
//   //       dispatch(setPopUpRfq());
//   //     }
//   //   };

//   //   const escKeyToggle = (event) => {
//   //     if (event.key === "Escape") {
//   //       dispatch(setPopUpRfq());
//   //     }
//   //   };

//   //   document.addEventListener("click", handleClickOutside);
//   //   document.addEventListener("keydown", escKeyToggle);

//   //   return () => {
//   //     document.removeEventListener("click", handleClickOutside);
//   //     document.removeEventListener("keydown", escKeyToggle);
//   //   };
//   // }, [setPopUpRfq]);

//   // const submitHandle = (event) => {
//   //   event.preventDefault();
//   //   const form = new FormData(event.target);
//   //   const data = Object.fromEntries(form.entries());
//   //   data.parts = parts;
//   //   data.comment = comment;
//   //   data.poInHand == "on" ? (data.poInHand = 1) : (data.poInHand = 0);
//   //   data.sendCopyToMyself == "on"
//   //     ? (data.sendCopyToMyself = 1)
//   //     : (data.sendCopyToMyself = 0);
//   //   data.sendToMyVendorsList == "on"
//   //     ? (data.sendToMyVendorsList = 1)
//   //     : (data.sendToMyVendorsList = 0);
//   //   data.sendToStockingVendorsIn == "on"
//   //     ? (data.sendToStockingVendorsIn = 1)
//   //     : (data.sendToStockingVendorsIn = 0);
//   //   data.partialOrderQuotesAccepted == "on"
//   //     ? (data.partialOrderQuotesAccepted = 1)
//   //     : (data.partialOrderQuotesAccepted = 0);
//   //   data.bcc = selectedProductsBCC.map((item) => item.mfg);
//   //   console.log(data);
//   // };


//   // const submitHandle = (e) => {
//   //   // e.preventDefault()
//   //   const form = new FormData(document.querySelector("form")); // Assuming this is wrapped in a form
//   //   const data = Object.fromEntries(form.entries());

//   //   data.parts = parts;
//   //   data.comment = comment;

//   //   const booleanFields = [
//   //     "poInHand",
//   //     "sendCopyToMyself",
//   //     "sendToMyVendorsList",
//   //     "sendToStockingVendorsIn",
//   //     "partialOrderQuotesAccepted",
//   //   ];

//   //   booleanFields.forEach((field) => {
//   //     data[field] = data[field] === "on" ? 1 : 0;
//   //   });

//   //   data.bcc = selectedProductsBCC.map((item) => item.mfg);

//   //   console.log("Payload:", data); // Log the payload
//   // };







//   const [recipients, setRecipients] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [uploadFile, setFile] = useState(null);

//   // const handleRecipientSearch = async (e) => {
//   //   const query = e.target.value;
//   //   setRecipient(query); // Update the recipient state so the input is editable

//   //   if (query.trim() === "") return;

//   //   try {
//   //     console.log("Dispatching addRecipients with query:", query);
//   //     await dispatch(addRecipients({ token, search: query })).unwrap();
//   //   } catch (error) {
//   //     console.error("Error fetching recipients:", error);
//   //   }
//   // };

//   // const handleRecipientClick = (e,selectedRecipient) => {
//   //   e.preventDefault()
//   //   const recipientEmail = selectedRecipient.email.replace("mailto:", "");
//   //   setRecipient(`${recipientEmail}`);
//   //   // dispatch(addRecipients([]));
//   // };





//   // const handleRecipientClick = (e, selectedRecipient) => {
//   //   e.preventDefault();
//   //   const recipientEmail = selectedRecipient.email.replace("mailto:", "");

//   //   // Add the email to the array if not already present
//   //   if (!recipients.includes(recipientEmail)) {
//   //     setRecipients((prev) => [...prev, recipientEmail]);
//   //   }

//   //   setInputValue(""); // Clear input field
//   // };
//   const handleRecipientClick = (e, selectedRecipient) => {
//     e.preventDefault();

//     const recipientEmail = selectedRecipient.email.replace("mailto:", "");

//     // Add the recipient object if not already present
//     const exists = recipients.some(
//       (recipient) => recipient.email === recipientEmail
//     );

//     if (!exists) {
//       setRecipients((prev) => [
//         ...prev,
//         {
//           firstName: selectedRecipient.firstName,
//           lastName: selectedRecipient.lastName,
//           email: recipientEmail,
//         },
//       ]);
//     }

//     setInputValue(""); // Clear input field

//     dispatch(clearSearchResults()) ? console.log("Cleared") : console.log("Not cleared");

//   };

//   console.log(recipients)



//   const handleRecipientSearch = async (e) => {
//     const query = e.target.value;
//     setInputValue(query); // Update input field value

//     if (query.trim() === "") {
//       return;
//     }

//     try {
//       await dispatch(addRecipients({ token, search: query })).unwrap();
//     } catch (error) {
//       console.error("Error fetching recipients:", error);
//     }
//   };


//   const handleRemoveRecipient = (e, emailToRemove) => {
//     e.stopPropagation();
//     console.log("Before removal:", recipients);
//     console.log("Removing:", emailToRemove);

//     setRecipients((prev) => prev.filter((recipient) => recipient.email !== emailToRemove));

//     console.log("After removal:", recipients);
//   };




//   //   const submitHandle = (e) => {

//   //     // Create FormData object
//   //   const formData = new FormData();

//   //   // Add simple fields
//   //   formData.append("recipient", recipient); // Add recipient
//   //   formData.append("comment", comment); // Add comment from text editor

//   //   // Add files
//   //   if (file) {
//   //     formData.append("file", file); // Attach file
//   //   }

//   //   // Add nested object/array data as JSON strings
//   //   formData.append("parts", JSON.stringify(parts)); // Serialize the parts array
//   //   formData.append("bcc", JSON.stringify(selectedProductsBCC.map((item) => item.mfg))); // Serialize BCC array

//   //   // Add boolean fields
//   //   const booleanFields = [
//   //     "poInHand",
//   //     "sendCopyToMyself",
//   //     "sendToMyVendorsList",
//   //     "sendToStockingVendorsIn",
//   //     "partialOrderQuotesAccepted",
//   //   ];
//   //   booleanFields.forEach((field) => {
//   //     formData.append(field, document.querySelector(`[name="${field}"]`)?.checked ? 1 : 0);
//   //   });

//   //   // Debug FormData
//   //   console.log("Formdata:",formData)
//   //   console.log("FormData contents:");
//   //   for (let [key, value] of formData.entries()) {
//   //     console.log(`${key}:`, value);
//   //   }

//   //       dispatch(submitRfq({token:token,data:formData}))
//   // }







//   // const handleRecipientSearch = async (e) => {
//   //   const query = e.target.value;
//   //   if (query.trim() === "") return;

//   //   try {
//   //     console.log("Dispatching addRecipients with query:", query);
//   //     await dispatch(addRecipients({ token, search: query })).unwrap();
//   //   } catch (error) {
//   //     console.error("Error fetching recipients:", error);
//   //   }

//   // };




//   console.log("BCC", selectedProductsBCC)



//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const submitHandle = async (e) => {

//     const formData = new FormData();

//     // Add Region field
//     const region = document.querySelector('[name="send_all_vendors_region"]')?.value;
//     formData.append("region", region || "");

//     // Add the subject field
//     const subject = document.querySelector('[name="subject"]')?.value;
//     formData.append("subject", subject || "");

//     // Add valid BCC emails
//     recipients
//       .filter((recipient) => isValidEmail(recipient.email)) // Validate email
//       .forEach((recipient, index) => {
//         formData.append(`recipients[${index}]`, recipient.email);
//       });

//     // Add comment
//     formData.append("comment", comment);

//     // Add parts
//     parts.forEach((part, index) => {
//       formData.append(`parts[${index}][id]`, part.id || index + 1); // Ensure id is present
//       formData.append(`parts[${index}][partNumber]`, part.partModel);
//       formData.append(`parts[${index}][quantity]`, part.quantity);
//       formData.append(`parts[${index}][heciClei]`, part.heciClei || "");
//       formData.append(`parts[${index}][mfg]`, part.mfg || "");
//       formData.append(`parts[${index}][condition]`, part.cond || "");
//       formData.append(`parts[${index}][targetPrice]`, part.targetPrice || "");
//       formData.append(`parts[${index}][terms]`, part.terms || "");
//     });

//     // Add valid bcc emails
//     const validEmails = selectedProductsBCC
//       .map((item) => item.addedBy.email) // Extract the `email` field instead of `mfg`
//       .filter((email) => /\S+@\S+\.\S+/.test(email)); // Validate email format
//     validEmails.forEach((email, index) => {
//       formData.append(`bcc[${index}]`, email); // Append valid emails to `bcc`
//     });

//     // Boolean fields
//     const booleanFields = [
//       "poInHand",
//       "sendCopyToMyself",
//       "sendToMyVendorsList",
//       "sendToStockingVendorsIn",
//       "partialOrderQuotesAccepted",
//     ];
//     booleanFields.forEach((field) => {
//       formData.append(field, document.querySelector(`[name="${field}"]`)?.checked ? 1 : 0);
//     });

//     // Add file to FormData
//     if (uploadFile) {
//       formData.append("uploadFile", uploadFile); // Use 'uploadFile' as the key name
//     } else {
//       console.error("No file selected.");
//     }

//     console.log("FormData contents:");
//     for (const pair of formData.entries()) {
//       console.log(`${pair[0]}:`, pair[1]);
//     }

//     // Send the data
//     try {
//       await dispatch(submitRfq({ token, data: formData }));
//       alert("RFQ submitted successfully!");

//       // Clear form fields after successful submission
//       clearFields();
//     } catch (error) {
//       console.error("Error submitting RFQ:", error);
//       alert("Error Submitting RFQ Data");
//     }
//   };

//   // Function to clear the form fields
//   const clearFields = () => {
//     // Clear state variables
//     setRecipients([]);
//     setComment("");
//     setParts([]);
//     setFile(null);

//     // Clear inputs in the DOM
//     const regionInput = document.querySelector('[name="send_all_vendors_region"]');
//     if (regionInput) regionInput.value = "";

//     const subjectInput = document.querySelector('[name="subject"]');
//     if (subjectInput) subjectInput.value = "";

//     // Uncheck boolean fields
//     const booleanFields = [
//       "poInHand",
//       "sendCopyToMyself",
//       "sendToMyVendorsList",
//       "sendToStockingVendorsIn",
//       "partialOrderQuotesAccepted",
//     ];
//     booleanFields.forEach((field) => {
//       const input = document.querySelector(`[name="${field}"]`);
//       if (input) {
//         input.checked = false;
//       }
//     });
//   };


//   return (
//     <>
//       <div className={css.rfqPopUp}>
//         <form >
//           <div className={`${css.rfqNew}  sm:h-[58vh] lg:h-[68vh]`}>

//             <div className={css.rfqBody}>
//               <div className={css.rfqHeaderSec}>

//                 <div className={css.rfqBody_Header}>
//                   <ul>
//                     <li>
//                       <a href="/">
//                         received({total}|{received})
//                       </a>
//                     </li>
//                     <li>
//                       <a href="/">sent({sent})</a>
//                     </li>
//                     <li>
//                       <a href="/" style={{color:" rgb(102, 142, 252)"}}>new</a>
//                     </li>
//                     <li>
//                       <a href="/">archive</a>
//                     </li>
//                   </ul>
//                 </div>
//                 <div className={css.rfqBody_closeBtn}>
//                   <button type="button" onClick={() => dispatch(setPopUpRfq())}>
//                     X
//                   </button>
//                 </div>
//               </div>
//               <div className={css.rfqBody_Main}>
//                 <div className={css.rfqBody_Main_left}>
//                   <div className={css.rfqBody_Main_left_receptions}>
//                     <span>
//                       <label htmlFor="">Add Recipient:</label>
//                       <input
//                         name="recipient"
//                         type="text"
//                         value={inputValue} // Controlled input value
//                         onChange={handleRecipientSearch} // Trigger search on input change
//                         style={{width:"20vw"}}
//                       />
//                       <div className={css.receipentSec} style={{ position: "relative" }}>
//                         {searchResults.length > 0 && (
//                           <ul
//                             style={{
//                               position: "absolute",
//                               zIndex: 1000,
//                               background: "#fff",
//                               border: "1px solid #ccc",
//                               padding: "10px 15px",
//                               top: "0%",
//                               left: "132px",
//                               width: "223%",
//                               padding: "4px",
//                               maxHeight: "300px"
//                             }}
//                           >
//                             {
//                               searchResults.map((user) => (
//                                 <li
//                                   key={user.id}
//                                   onClick={(e) => handleRecipientClick(e, user)}
//                                   style={{
//                                     borderBottom: "1px solid #ccc",
//                                     padding: "6px",
//                                     fontSize: "10.1pt",
//                                     fontWeight: "500",
//                                     cursor: "pointer",
//                                   }}
//                                 >
//                                   {user.firstName} {user.lastName} - {user.email.replace("mailto:", "")}
//                                 </li>
//                               ))}
//                           </ul>
//                         )}
//                       </div>
//                     </span>
//                     <span>
//                       <label htmlFor="">BCC:</label>
//                       <span className={css.rfqBody_Main_left_receptions_bcc}>
//                         {selectedProductsBCC.map((item) => {
//                           return (
//                             <span key={item.id}>

//                               <MdRemoveCircle
//                                 onClick={(e) => removeBCC(e, item.id)}
//                                 style={{ cursor: "pointer" }}
//                               />

//                               <strong>{item.addedBy.firstName}</strong>
//                             </span>
//                           );
//                         })}
//                         {
//                           recipients.map((item, i) => {
//                             return (
//                               <span key={i}>
//                                 <MdRemoveCircle
//                                   onClick={(e) => handleRemoveRecipient(e, item.email)} // Pass the email
//                                   style={{ cursor: "pointer" }}
//                                 />
//                                 <strong>{item.firstName} {item.lastName}</strong>
//                               </span>
//                             );
//                           })
//                         }
//                       </span>
//                     </span>
//                     <span>
//                       <label htmlFor="">Subject:</label>
//                       <input name="subject" type="text" />
//                     </span>
//                   </div>

//                   <div className={css.rfqBody_Main_left_addParts}>
//                     <div></div>
//                     <div>
//                       <div className={css.rfqBody_Main_left_addParts_label}>
//                         <div>
//                           <label htmlFor="text">part</label>
//                           <label htmlFor="text">HECI / CLEI</label>
//                           <label htmlFor="select">Mfg</label>
//                           <label htmlFor="select">Cond</label>
//                           <label htmlFor="number">Qty *</label>
//                           <label htmlFor="number">Target Price </label>
//                           <label htmlFor="text">Terms</label>
//                         </div>
//                       </div>
//                       <span name="parts">
//                         {parts.map((part) => (
//                           <AddParts
//                             key={part.id}
//                             part={part}
//                             onUpdate={updatePart}
//                             onRemove={removePart}
//                           />
//                         ))}
//                       </span>

//                       <div className={css.rfqBody_Main_left_addParts_AddBtn}>
//                         <button type="button" onClick={addPart}>
//                           <AddCircle />
//                           Add Part
//                         </button>
//                         <label htmlFor="uploadFile">
//                           <Attach />
//                           Attach a File
//                         </label>
//                         <input
//                           id="uploadFile"
//                           type="file"
//                           style={{ display: "none" }}
//                           onChange={(e) => setFile(e.target.files[0]) || null } // Update state with the selected file
//                         />
//                          {uploadFile && <span className="text-sm">{uploadFile.name}</span>}
//                       </div>
//                     </div>
//                   </div>

//                   <div className={css.rfqBody_Main_left_comments}>
//                     <label htmlFor="" style={{marginLeft:"50px"}}>comments</label>
//                     {/* <textarea name="comments"> */}
//                     <TextEditor
//                       handleCommentChange={handleCommentChange}
//                       comment={comment}

//                     />
//                     {/* </textarea> */}
//                   </div>
//                   <div className={css.rfqBody_Main_left_bottom}>
//                     <div></div>
//                     <div>
//                       <p>
//                         **Please Note: You are receiving this RFQ because you
//                         either carry the requested part above or you have been
//                         personally selected by the sender to quote this request.
//                       </p>
//                       <span>
//                         <input name="sendCopyToMyself" type="checkbox" />
//                         <p>Send a copy to myself.</p>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className={css.rfqBody_Main_right}>
//                   <table>
//                     <thead >
//                       <tr>
//                         <th>RFQ Options</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>
//                           <span>
//                             <input
//                               type="checkbox"
//                               name="sendToMyVendorsList"
//                               id=""
//                             />
//                             <label>Send to MyVendors List</label>
//                           </span>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td>
//                           <span>
//                             <input
//                               type="checkbox"
//                               name="sendToStockingVendorsIn"
//                               id=""
//                             />
//                             <label>Send to stocking vendors in:</label>
//                           </span>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td>
//                           <span>
//                             <span></span>
//                             <select
//                               id="send_all_vendors_region"
//                               name="send_all_vendors_region"
//                             >
//                               <option value="All Regions">All Regions</option>
//                               <option value="North America">
//                                 North America
//                               </option>
//                               <option value="Europe">Europe</option>
//                               <option value="Africa">Africa</option>
//                               <option value="Asia">Asia</option>
//                               <option value="Middle East">Middle East</option>
//                               <option value="Oceania">Oceania</option>
//                               <option value="South America">
//                                 South America
//                               </option>
//                             </select>
//                           </span>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td>
//                           <span>
//                             <input type="checkbox" name="poInHand" id="" />
//                             <label>PO in Hand</label>
//                           </span>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td>
//                           <span>
//                             <input
//                               type="checkbox"
//                               name="partialOrderQuotesAccepted"
//                               id=""
//                             />
//                             <label>Partial Order Quotes Accepted</label>
//                           </span>
//                         </td>
//                       </tr>
//                     </tbody>
//                     <tfoot>
//                       <tr>
//                         <th>RFQ Send Summary</th>
//                       </tr>

//                       {selectedProductsBCC.map((item) => {
//                         return (
//                           <span key={item.id}>
//                             <div className="flex items-center mt-2 gap-2">
//                               <MdRemoveCircle
//                                 onClick={(e) => removeBCC(e, item.id)}
//                                 style={{ cursor: "pointer" }}
//                               />

//                               <strong> {item.addedBy.company.name} ({item.addedBy.firstName} {item.addedBy.lastName})</strong>
//                             </div>

//                           </span>
//                         );
//                       })}

//                       {
//                         recipients.map((item, i) => {
//                           return (

//                             <span key={i}>
//                               <div className="flex items-center mt-2 gap-2">

//                                 <MdRemoveCircle
//                                   onClick={(e) => handleRemoveRecipient(e, item.email)} // Pass the email
//                                   style={{ cursor: "pointer" }}
//                                 />
//                                 <strong>({item.firstName} {item.lastName})</strong>
//                               </div>
//                             </span>

//                           );
//                         })
//                       }


//                     </tfoot>
//                   </table>
//                 </div>
//               </div>
//               <div className={css.rfqBody_sendBtn}>
//                 <button
//                   type="submit "
//                   onClick={(e) => {
//                     e.preventDefault()
//                     submitHandle(); // Call the submit handler
//                     setTimeout(() => {
//                       setPopUpRfq((prev) => !prev);
//                     }, 100);
//                   }}
//                 >
//                   send
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default MyRFQNew;

























import React, { useEffect, useState } from "react";
import css from "../../styles/Menu/Manage/MyRFQNew.module.css";
import AddCircle from "../../svgs/AddCircle";
import Attach from "../../svgs/Attach";
import { MdRemoveCircle } from "react-icons/md";
import TextEditor from "../TextEditor";
import { setPopUpRfq } from "../../ReduxStore/SearchProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { addRecipients, searchProductQuery  } from "../../ReduxStore/RfqSlice";
import Cookies from "js-cookie";
import { submitRfq, clearSearchResults } from "../../ReduxStore/RfqSlice";
const AddParts = ({ part, onUpdate, onRemove, onSearch, searchResults, handlePartModelSearch, searchResponseMatched }) => {

  const [showDropdown, setShowDropdown] = useState(false)


  const handleRemove = (event) => {
    event.stopPropagation(); // This stops the click event from bubbling up to parent elements.
    onRemove(part.id);
  };
  // const handleInputChange = (field, value) => {
  //   if (field === "partModel" && part.isNew) {
  //     onSearch(value); // Call API search function
  //   }
  //   onUpdate(part.id, field, value); // Update local state

  //   console.log("Show dropdown triggered"); // Debug log
  //   setShowDropdown(true); // Trigger dropdown visibility
  // };

  const handleInputChange = (field, value) => {
    onUpdate(part.id, field, value); // Update part value in state
  
    // Show dropdown only if the field is partModel and value is not empty
    if (field === "partModel" && value.trim() !== "") {
      onSearch(value); // Trigger search
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  // Update onBlur handler to only hide the dropdown if the partModel input is not focused or if it's empty
const handleInputBlur = () => {
  setTimeout(() => {
    if (!part.partModel || part.partModel.trim() === "") {
      setShowDropdown(false);
    }
  }, 200); // Timeout to catch clicks on dropdown items
};



  const handleSuggestionSelect = (value) => {
    onUpdate(part.id, "partModel", value); // Update partModel when a suggestion is selected
    setShowDropdown(false)
  };



  return (
    <div className={css.rfqBody_Main_left_addParts_Addfields}>
      <button type="button" onClick={handleRemove} className={css.removeBtn}  >
        <MdRemoveCircle />
      </button>
      <div>

        <div  style={{position:"relative"}}>

      <input
     
        type="text"
        value={part.partModel || ""}
        onChange={(e) => {
          console.log("Input value:", e.target.value); // Debug input value
          handleInputChange("partModel", e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
        onFocus={() => {
          if (part.partModel.trim() !== "") {
            setShowDropdown(true); // Show dropdown if there's a non-empty value
          }
        }}
        onBlur={handleInputBlur} // Updated blur handler
      />
      {console.log("Dropdown visibility:", showDropdown)}
      {console.log("Search Results in AddParts:", searchResponseMatched)}

      {showDropdown && searchResponseMatched?.length > 0 && (
        <ul
        className={css.searchResponseSec}
          style={{
            position: "absolute",
            top: "100%",
            // left: 0,
            zIndex: 1000,
            background: "#fff",
            border: "1px solid #ccc",
            listStyle: "none",
            padding: "3px",
            width: "120px",
            overflowY:"scroll",
            maxHeight:"20vh"
          }}
        >
          {searchResponseMatched.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSuggestionSelect(item.partModel)}
              style={{
                padding: "4px",
                cursor: "pointer",
         
                borderBottom: "1px solid #eee",
              }}
              // onMouseOver={(e) => (e.target.style.backgroundColor = "#e6f7ff")}
              // onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
            >
              {item.partModel}
            </li>
          ))}
        </ul>
      )}

</div>

        <input
          type="text"
          value={part.heciClei}
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
  const searchResults = useSelector((state) => state.rfqStore.searchResults);
  const { searchResponseMatched } = useSelector((state) => state.rfqStore);

  console.log("Search Results in Component:", searchResults);
  const token = Cookies.get("token");

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
  // const addPart = () => {
  //   const newPart = {
  //     id: parts.length,
  //     partNumber: "",
  //     heciClei: "",
  //     mfg: "",
  //     condition: "",
  //     quantity: "",
  //     targetPrice: "",
  //     terms: "",
  //   };
  //   setParts((parts) => [...parts, newPart]);
  // };

  const addPart = () => {
    setParts([...parts, { id: Date.now(), partModel: " ", heciClei: " ", mfg: "", condition: "",   quantity: "",isNew: true,targetPrice: "",terms: "", }]);
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

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     const rfqNew = document.querySelector(`.${css.rfqNew}`);
  //     if (rfqNew && !rfqNew.contains(event.target)) {
  //       dispatch(setPopUpRfq());
  //     }
  //   };

  //   const escKeyToggle = (event) => {
  //     if (event.key === "Escape") {
  //       dispatch(setPopUpRfq());
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutside);
  //   document.addEventListener("keydown", escKeyToggle);

  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //     document.removeEventListener("keydown", escKeyToggle);
  //   };
  // }, [setPopUpRfq]);

  // const submitHandle = (event) => {
  //   event.preventDefault();
  //   const form = new FormData(event.target);
  //   const data = Object.fromEntries(form.entries());
  //   data.parts = parts;
  //   data.comment = comment;
  //   data.poInHand == "on" ? (data.poInHand = 1) : (data.poInHand = 0);
  //   data.sendCopyToMyself == "on"
  //     ? (data.sendCopyToMyself = 1)
  //     : (data.sendCopyToMyself = 0);
  //   data.sendToMyVendorsList == "on"
  //     ? (data.sendToMyVendorsList = 1)
  //     : (data.sendToMyVendorsList = 0);
  //   data.sendToStockingVendorsIn == "on"
  //     ? (data.sendToStockingVendorsIn = 1)
  //     : (data.sendToStockingVendorsIn = 0);
  //   data.partialOrderQuotesAccepted == "on"
  //     ? (data.partialOrderQuotesAccepted = 1)
  //     : (data.partialOrderQuotesAccepted = 0);
  //   data.bcc = selectedProductsBCC.map((item) => item.mfg);
  //   console.log(data);
  // };


  // const submitHandle = (e) => {
  //   // e.preventDefault()
  //   const form = new FormData(document.querySelector("form")); // Assuming this is wrapped in a form
  //   const data = Object.fromEntries(form.entries());

  //   data.parts = parts;
  //   data.comment = comment;

  //   const booleanFields = [
  //     "poInHand",
  //     "sendCopyToMyself",
  //     "sendToMyVendorsList",
  //     "sendToStockingVendorsIn",
  //     "partialOrderQuotesAccepted",
  //   ];

  //   booleanFields.forEach((field) => {
  //     data[field] = data[field] === "on" ? 1 : 0;
  //   });

  //   data.bcc = selectedProductsBCC.map((item) => item.mfg);

  //   console.log("Payload:", data); // Log the payload
  // };


  const [recipients, setRecipients] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [uploadFile, setFile] = useState(null);

  // const handleRecipientSearch = async (e) => {
  //   const query = e.target.value;
  //   setRecipient(query); // Update the recipient state so the input is editable

  //   if (query.trim() === "") return;

  //   try {
  //     console.log("Dispatching addRecipients with query:", query);
  //     await dispatch(addRecipients({ token, search: query })).unwrap();
  //   } catch (error) {
  //     console.error("Error fetching recipients:", error);
  //   }
  // };

  // const handleRecipientClick = (e,selectedRecipient) => {
  //   e.preventDefault()
  //   const recipientEmail = selectedRecipient.email.replace("mailto:", "");
  //   setRecipient(`${recipientEmail}`);
  //   // dispatch(addRecipients([]));
  // };





  // const handleRecipientClick = (e, selectedRecipient) => {
  //   e.preventDefault();
  //   const recipientEmail = selectedRecipient.email.replace("mailto:", "");

  //   // Add the email to the array if not already present
  //   if (!recipients.includes(recipientEmail)) {
  //     setRecipients((prev) => [...prev, recipientEmail]);
  //   }

  //   setInputValue(""); // Clear input field
  // };
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

    if (query.trim() === "") {
      return;
    }

    try {
      await dispatch(addRecipients({ token, search: query })).unwrap();
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




  //   const submitHandle = (e) => {

  //     // Create FormData object
  //   const formData = new FormData();

  //   // Add simple fields
  //   formData.append("recipient", recipient); // Add recipient
  //   formData.append("comment", comment); // Add comment from text editor

  //   // Add files
  //   if (file) {
  //     formData.append("file", file); // Attach file
  //   }

  //   // Add nested object/array data as JSON strings
  //   formData.append("parts", JSON.stringify(parts)); // Serialize the parts array
  //   formData.append("bcc", JSON.stringify(selectedProductsBCC.map((item) => item.mfg))); // Serialize BCC array

  //   // Add boolean fields
  //   const booleanFields = [
  //     "poInHand",
  //     "sendCopyToMyself",
  //     "sendToMyVendorsList",
  //     "sendToStockingVendorsIn",
  //     "partialOrderQuotesAccepted",
  //   ];
  //   booleanFields.forEach((field) => {
  //     formData.append(field, document.querySelector(`[name="${field}"]`)?.checked ? 1 : 0);
  //   });

  //   // Debug FormData
  //   console.log("Formdata:",formData)
  //   console.log("FormData contents:");
  //   for (let [key, value] of formData.entries()) {
  //     console.log(`${key}:`, value);
  //   }

  //       dispatch(submitRfq({token:token,data:formData}))
  // }







  // const handleRecipientSearch = async (e) => {
  //   const query = e.target.value;
  //   if (query.trim() === "") return;

  //   try {
  //     console.log("Dispatching addRecipients with query:", query);
  //     await dispatch(addRecipients({ token, search: query })).unwrap();
  //   } catch (error) {
  //     console.error("Error fetching recipients:", error);
  //   }

  // };




  console.log("BCC", selectedProductsBCC)



  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitHandle = async (e) => {

    const formData = new FormData();

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
      await dispatch(submitRfq({ token, data: formData }));
      alert("RFQ submitted successfully!");

      // Clear form fields after successful submission
      clearFields();
    } catch (error) {
      console.error("Error submitting RFQ:", error);
      alert("Error Submitting RFQ Data");
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
          <div className={`${css.rfqNew}  sm:h-[58vh] lg:h-[68vh]`}>

            <div className={css.rfqBody}>
              <div className={css.rfqHeaderSec}>

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
                      <label htmlFor="">Add Recipient:</label>
                      <input
                        name="recipient"
                        type="text"
                        value={inputValue} // Controlled input value
                        onChange={handleRecipientSearch} // Trigger search on input change
                        style={{ width: "20vw" }}
                      />
                      <div className={css.receipentSec} style={{ position: "relative" }}>
                        {searchResults.length > 0 && (
                          <ul
                            style={{
                              position: "absolute",
                              zIndex: 1000,
                              background: "#fff",
                              border: "1px solid #ccc",
                              padding: "10px 15px",
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
                                  onClick={(e) => handleRecipientClick(e, user)}
                                  style={{
                                    borderBottom: "1px solid #ccc",
                                    padding: "6px",
                                    cursor: "pointer",
                                  }}
                                >
                                  {user.firstName} {user.lastName} - {user.email.replace("mailto:", "")}
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    </span>
                    <span>
                      <label htmlFor="">BCC:</label>
                      <span className={css.rfqBody_Main_left_receptions_bcc}>
                        {selectedProductsBCC.map((item) => {
                          return (
                            <span key={item.id}>

                              <MdRemoveCircle
                                onClick={(e) => removeBCC(e, item.id)}
                                style={{ cursor: "pointer" }}
                              />

                              <strong>{item.addedBy.firstName}</strong>
                            </span>
                          );
                        })}
                        {
                          recipients.map((item, i) => {
                            return (
                              <span key={i}>
                                <MdRemoveCircle
                                  onClick={(e) => handleRemoveRecipient(e, item.email)} // Pass the email
                                  style={{ cursor: "pointer" }}
                                />
                                <strong>{item.firstName} {item.lastName}</strong>
                              </span>
                            );
                          })
                        }
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
                            onSearch={handlePartModelSearch}
                            searchResponseMatched={searchResponseMatched}
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
                    <label htmlFor="" style={{ marginLeft: "50px" }}>comments</label>
                    {/* <textarea name="comments"> */}
                    <TextEditor
                      handleCommentChange={handleCommentChange}
                      comment={comment}
                      className={css.ql_editor}

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

                      {selectedProductsBCC.map((item) => {
                        return (
                          <span key={item.id}>
                            <div className="flex items-center mt-2 gap-2">
                              <MdRemoveCircle
                                onClick={(e) => removeBCC(e, item.id)}
                                style={{ cursor: "pointer" }}
                              />

                              <strong> {item.addedBy.company.name} ({item.addedBy.firstName} {item.addedBy.lastName})</strong>
                            </div>

                          </span>
                        );
                      })}

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
                  type="submit "
                  onClick={(e) => {
                    e.preventDefault()
                    submitHandle(); // Call the submit handler
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
        </form>
      </div>
    </>
  );
};

export default MyRFQNew;























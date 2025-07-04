import React, { useState, useEffect } from "react";
import basic from "../../../styles/Menu/Basic.module.css";
import css from "../../../styles/Menu/Main/Ethics.module.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { sendEthics } from "../../../ReduxStore/ToolsSlice";
import { useDispatch, useSelector } from "react-redux";
import SearchCompany from "./SearchCompany";
import { fetchUserData } from "../../../ReduxStore/ProfleSlice";
import styles from "../../../styles/Menu/Manage/MyProfile.module.css";
import { NavLink } from "react-router-dom";
import PopupAlert from "@/components/Popups/PopupAlert";

const Ethics = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const user_id = Cookies.get("user_id");
  const { initialData, user } = useSelector((state) => state.profileStore);
  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });

    setTimeout(() => {
      setPopup((prev) => ({ ...prev, show: false }));
    }, 2000);
  };

  console.log("User Data: ", initialData);
  const companyId = initialData?.company?.id;
  console.log("Company ID: ", companyId);
  const id = user?.user?.id || user_id;

  useEffect(() => {
    console.log(id);
    dispatch(fetchUserData({ id, token }));
  }, []);

  useEffect(() => {
    if (initialData?.company?.id) {
      setFormData((prevData) => ({
        ...prevData,
        company_id: initialData.company.id, // Update company_id after fetching data
      }));
    }
  }, [initialData]); // Runs when initialData changes

  const [formData, setFormData] = useState({
    company_id: companyId,
    date_of_transaction: "",
    specific_complaint: "",
    company_response: "",
    RMA: "",
    contacting_authorities: "",
    attorney: "",
    additional_information: "",
    "purchase_order[]": [],
    "tracking_documents[]": [],
    "emails[]": [],
    "instant_messages[]": [],
    "proof_of_delivery[]": [],
    "photos[]": [],
    "correspondences[]": [],
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(() => {
      const updatedFiles = { ...formData };
      return {
        ...updatedFiles,
        [name]: Array.from(files),
      };
    });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      company_id: companyId,
      date_of_transaction: "",
      specific_complaint: "",
      company_response: "",
      RMA: "",
      contacting_authorities: "",
      attorney: "",
      additional_information: "",
      "purchase_order[]": [],
      "tracking_documents[]": [],
      "emails[]": [],
      "instant_messages[]": [],
      "proof_of_delivery[]": [],
      "photos[]": [],
      "correspondences[]": [],
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (
      !formData.RMA ||
      !formData.contacting_authorities ||
      !formData.attorney
    ) {
      setError("Please make a selection for all radio button groups.");
      return; // Prevent form submission
    }

    const hasFiles =
      formData["purchase_order[]"].length > 0 ||
      formData["tracking_documents[]"].length > 0 ||
      formData["emails[]"].length > 0 ||
      formData["instant_messages[]"].length > 0 ||
      formData["proof_of_delivery[]"].length > 0 ||
      formData["photos[]"].length > 0 ||
      formData["correspondences[]"].length > 0;

    if (!hasFiles) {
      setError(
        "Please upload at least one file in the relevant documentation section."
      );
      return; // Prevent form submission
    }

    console.log("Form Data: ", formData);
    const data = { ...formData };

    dispatch(sendEthics({ data, token }))
      .then(() => {
        handleReset();

        showPopup("success", "Your Complaint Has Been Sent Successfully!");
      })
      .catch((error) => {
        showPopup("success", "Failed Sending Complain.Please Try Again");
      });
  };

  return (
    <>
      <div className={basic.basicFormLayout}>
        <form onSubmit={handleSubmit}>
          <div className={`${basic.basic} !bg-[#e8e8e8]`}>
            <div className={styles.profileInfo_links}>
              <ul>
                <li>
                  <NavLink
                    to="/help"
                    end // This ensures the exact match for /myprofile
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    <span>Help</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/feedback"
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    <span>Contact</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/ethics"
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    <span>Ethics</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/sitemap"
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    <span>Site Map</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/badges"
                    className={({ isActive }) => (isActive ? css.active : "")}
                  >
                    <span>Badges</span>
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className={basic.basic_form}>
              <div className={css.ethics_form}>
                <div
                  className={`${css.ethics_form_header}  mb-12 p-3 text-[#444]`}
                >
                  <h1 className="font-semibold">Filing an Ethics Complaint</h1>
                  <div>
                    <p className="font-[600]">
                      To ensure a clear and open process, please observe the
                      required qualifications for our Ethics Committee's review.
                    </p>
                    <p className="font-[600] ">
                      It should be noted that only complaints with a
                      transactional basis will be considered by the Ethics
                      Committee. Companies must provide supporting documentation
                      for their claim to enable our committee's evaluation.
                    </p>
                    <p className="font-[600]">
                      BrokerCell.com enforces a strict no-tolerance stance on
                      counterfeit items. Please submit evidence of counterfeit
                      products through a Testing House or Homeland Security. The
                      BrokerCell Ethics Committee will promptly take the
                      counterfeit products out of circulation and decide on the
                      necessary actions concerning your membership.
                    </p>
                  </div>
                </div>
                <div className={css.ethics_form_fields}>
                  <ul>
                    <li className={css.ethics_form_fields_search}>
                      <SearchCompany setFormData={setFormData} />
                    </li>
                    <li>
                      <label htmlFor="name">Who did you work with?</label>

                      <input
                        type="search"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Contact Name"
                      />
                    </li>
                    <li>
                      <label htmlFor="date_of_transaction">
                        What was the date of transaction?
                        <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="date"
                        name="date_of_transaction"
                        id="date_of_transaction"
                        value={formData.date_of_transaction}
                        onChange={handleInputChange}
                        required
                      />
                    </li>
                    <li>
                      <label htmlFor="specific_complaint">
                        What is your specific complaint?
                        <span className="text-red-500">*</span>
                      </label>

                      <textarea
                        name="specific_complaint"
                        id="specific_complaint"
                        value={formData.specific_complaint}
                        onChange={handleInputChange}
                        rows={5}
                        required
                      ></textarea>
                    </li>
                    <li>
                      <label>
                        Have you requested an RMA (Return Merchandise
                        Authorization)?<span className="text-red-500">*</span>
                      </label>

                      <div>
                        <span>
                          <label htmlFor="yes">Yes</label>
                          <input
                            type="radio"
                            name="RMA"
                            value="yes"
                            id="yes"
                            checked={formData.RMA === "yes"}
                            onChange={handleRadioChange}
                          />
                        </span>
                        <span>
                          <label htmlFor="no">No</label>
                          <input
                            type="radio"
                            name="RMA"
                            value="no"
                            id="no"
                            checked={formData.RMA === "no"}
                            onChange={handleRadioChange}
                          />
                        </span>
                        <span>
                          <label htmlFor="na">N/A</label>
                          <input
                            type="radio"
                            name="RMA"
                            value="na"
                            id="na"
                            checked={formData.RMA === "na"}
                            onChange={handleRadioChange}
                          />
                        </span>
                      </div>
                    </li>
                    <li>
                      <label>
                        What was the above company's response when you contacted
                        them?<span className="text-red-500">*</span>
                      </label>

                      <textarea
                        name="company_response"
                        id="company_response"
                        value={formData.company_response}
                        onChange={handleInputChange}
                        required
                        rows={5}
                      ></textarea>
                    </li>
                    <li>
                      <label>
                        Have you or do you plan on contacting the authorities?
                        <span className="text-red-500">*</span>
                      </label>

                      <div>
                        <span>
                          <label htmlFor="contacting_authorities_yes">
                            Yes
                          </label>
                          <input
                            type="radio"
                            name="contacting_authorities"
                            value="1"
                            id="contacting_authorities_yes"
                            checked={formData.contacting_authorities === "1"}
                            onChange={handleRadioChange}
                          />
                        </span>
                        <span>
                          <label htmlFor="contacting_authorities_no">No</label>
                          <input
                            type="radio"
                            name="contacting_authorities"
                            value="0"
                            id="contacting_authorities_no"
                            checked={formData.contacting_authorities === "0"}
                            onChange={handleRadioChange}
                          />
                        </span>
                      </div>
                    </li>
                    <li>
                      <label>
                        Do you or will you have an attorney representing you?
                        <span className="text-red-500">*</span>
                      </label>

                      <div>
                        <span>
                          <label htmlFor="attorney_yes">Yes</label>
                          <input
                            type="radio"
                            name="attorney"
                            value="1"
                            id="attorney_yes"
                            checked={formData.attorney === "1"}
                            onChange={handleRadioChange}
                          />
                        </span>
                        <span>
                          <label htmlFor="attorney_no">No</label>
                          <input
                            type="radio"
                            name="attorney"
                            value="0"
                            id="attorney_no"
                            checked={formData.attorney === "0"}
                            onChange={handleRadioChange}
                          />
                        </span>
                      </div>
                    </li>
                    <li>
                      <label>
                        Please provide relevant documentation:
                        <span className="text-red-500">*(At least one)</span>
                      </label>

                      <ul className={css.ethics_form_fields_files}>
                        <li>
                          <label htmlFor="purchase_order[]">
                            Purchase Orders:
                          </label>
                          <input
                            type="file"
                            name="purchase_order[]"
                            id="purchase_order[]"
                            multiple
                            onChange={handleFileChange}
                          />
                        </li>
                        <li>
                          <label htmlFor="tracking_documents[]">
                            Tracking Documents:
                          </label>
                          <input
                            type="file"
                            name="tracking_documents[]"
                            id="tracking_documents[]"
                            multiple
                            onChange={handleFileChange}
                          />
                        </li>
                        <li>
                          <label htmlFor="emails[]">Emails:</label>
                          <input
                            type="file"
                            name="emails[]"
                            id="emails[]"
                            multiple
                            onChange={handleFileChange}
                          />
                        </li>
                        <li>
                          <label htmlFor="instant_messages[]">
                            Instant Messages:
                          </label>
                          <input
                            type="file"
                            name="instant_messages[]"
                            id="instant_messages[]"
                            multiple
                            onChange={handleFileChange}
                          />
                        </li>
                        <li>
                          <label htmlFor="proof_of_delivery[]">
                            Proof of Delivery:
                          </label>
                          <input
                            type="file"
                            name="proof_of_delivery[]"
                            id="proof_of_delivery[]"
                            multiple
                            onChange={handleFileChange}
                          />
                        </li>
                        <li>
                          <label htmlFor="photos[]">Photos:</label>
                          <input
                            type="file"
                            name="photos[]"
                            id="photos[]"
                            multiple
                            onChange={handleFileChange}
                          />
                        </li>
                        <li>
                          <label htmlFor="correspondences[]">
                            Correspondences:
                          </label>
                          <input
                            type="file"
                            name="correspondences[]"
                            id="correspondences[]"
                            multiple
                            onChange={handleFileChange}
                          />
                        </li>
                      </ul>
                    </li>
                    <li>
                      <label>Enter Additional Information:</label>

                      <textarea
                        name="additional_information"
                        id="additional_information"
                        rows={10}
                        value={formData.additional_information}
                        onChange={handleInputChange}
                      ></textarea>
                    </li>
                  </ul>
                  {error && <p className={css.error}>{error}</p>}
                </div>
              </div>
            </div>
            <div className={css.ethics_btn}>
              <button type="button" onClick={handleReset}>
                Reset
              </button>
              <input
                type="submit"
                value="Submit"
                className="cursor-pointer hover:bg-blue-400 focus:-translate-y-3 "
              />
            </div>
          </div>
        </form>
      </div>
      <PopupAlert
        show={popup.show}
        type={popup.type}
        message={popup.message}
        onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
      />
    </>
  );
};

export default Ethics;

import React, { useState } from "react";
import basic from "../../../styles/Menu/Basic.module.css";
import css from "../../../styles/Menu/Main/Ethics.module.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { sendEthics } from "../../../ReduxStore/ToolsSlice";
import { useDispatch } from "react-redux";
import SearchCompany from "./SearchCompany";

const Ethics = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    company_id: "",
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
      company_id: "",
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

    const data = { ...formData };

    dispatch(sendEthics({ data, token }));
  };

  return (
    <div className={basic.basicFormLayout}>
      <form onSubmit={handleSubmit}>
        <div className={basic.basic}>
          <div className={basic.basic_links}>
            <ul>
            <li>
                <Link to={"/help"}>
                  <span>Help</span>
                </Link>
              </li>
              <li>
                <Link to={"/feedback"}>
                  <span>Contacts</span>
                </Link>
              </li>
              <li>
                <Link to={"/ethics"}>
                  <span>Ethics</span>
                </Link>
              </li>
              <Link to={"/sitemap"}>
              <li >
                <span>Site Map</span>
              </li>
              </Link>

              <li>
                <Link to={"/badges"}>
                <span>Badges</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className={basic.basic_form}>
            <div className={css.ethics_form}>
              <div className={css.ethics_form_header}>
                <h1>Submit an Ethics Complaint</h1>
                <div>
                  <p>
                    To ensure a streamlined and transparent process for you,
                    please review the following Qualifications required for
                    Ethics Committee review.
                  </p>
                  <p>
                    Please note that the Ethics Committee will only review
                    transactionally-based complaints. The company filing the
                    complaint must submit documentation which supports their
                    claim in order for our committee to review the situation.
                  </p>
                  <p>
                    **BrokerBin.com has a zero tolerance policy when it comes to
                    counterfeit. Send counterfeit product proof via Testing
                    House and/or Homeland Security. BrokerBin Ethics Committee
                    will remove the product immediately and determine
                    appropriate actions regarding membership.
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
                    <br />
                    <input
                      type="search"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </li>
                  <li>
                    <label htmlFor="date_of_transaction">
                      What was the date of transaction? *
                    </label>
                    <br />
                    <input
                      type="search"
                      name="date_of_transaction"
                      id="date_of_transaction"
                      value={formData.date_of_transaction}
                      onChange={handleInputChange}
                      placeholder="yyyy/mm/dd"
                      required
                    />
                  </li>
                  <li>
                    <label htmlFor="specific_complaint">
                      What is your specific complaint? *
                    </label>
                    <br />
                    <textarea
                      name="specific_complaint"
                      id="specific_complaint"
                      value={formData.specific_complaint}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </li>
                  <li>
                    <label>
                      Have you requested an RMA (Return Merchandise
                      Authorization)? *
                    </label>
                    <br />
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
                      them? *
                    </label>
                    <br />
                    <textarea
                      name="company_response"
                      id="company_response"
                      value={formData.company_response}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </li>
                  <li>
                    <label>
                      Have you or do you plan on contacting the authorities? *
                    </label>
                    <br />
                    <div>
                      <span>
                        <label htmlFor="contacting_authorities_yes">Yes</label>
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
                      Do you or will you have an attorney representing you? *
                    </label>
                    <br />
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
                      Please provide relevant documentation: * (At least one)
                    </label>
                    <br />
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
                    <br />
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
            <input type="submit" value="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Ethics;

import React, { useState, useEffect } from "react";
import css from "../../styles/LoginRegister/Register.module.css";
import brokerLogo from "../../imgs/logo/BrokerCell Logo.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { countriesList, statesList } from "@/data/services";

const Register = () => {

  const { register, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: {
      country: "USA", // Default to United States
      state: "", // Default state selection
    },
  });

  const [isLoading, setIsLoading] = useState(false); // 🔹 Loading state for button
  const [isPlainInput, setIsPlainInput] = useState(false);
  const [formPassword, setFormPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const selectedCountry = watch("country");
  const selectedState = watch("state");
  const [availableStates, setAvailableStates] = useState([]);

  // useEffect(() => {
  //   if (selectedCountry) {
  //     setAvailableStates(statesList[selectedCountry] || []);
  //     setValue("state", ""); // Reset state when country changes
  //   }
  // }, [selectedCountry, setValue]);

  useEffect(() => {
    if (selectedCountry === "USA") {
      setAvailableStates(statesList[selectedCountry] || []);
      setIsPlainInput(false);
      setValue("state", ""); // Reset state
    } else {
      setAvailableStates([]);
      setIsPlainInput(true);
      setValue("state", ""); // Reset state for input field
    }
  }, [selectedCountry, setValue]);


  useEffect(() => {
    if (selectedState) {
      const country = Object.keys(statesList).find((key) =>
        statesList[key].some((state) => state.value === selectedState)
      );
      if (country) setValue("country", country);
    }
  }, [selectedState, setValue]);

  const [responseOk, setResponseOk] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for modal
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // Toggle for password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormPassword({
      ...formPassword,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;
    const { password, confirmPassword } = getValues(); // Get values from React Hook Form

    const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`-]).{6,}$/;

    if (!password?.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      tempErrors.password = "Password must be at least 6 characters and include 1 special character";
      isValid = false;
    }

    if (!confirmPassword?.trim()) {
      tempErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (confirmPassword !== password) {
      tempErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleRegister = async (e) => {
    setShowModal(true);
    if (validate()) {
      const formDataObject = getValues();
      formDataObject.companyCategory = Array.isArray(formDataObject.companyCategory)
        ? formDataObject.companyCategory
        : [formDataObject.companyCategory];
      formDataObject.memberCheck = formDataObject.memberCheck === "yes" ? 1 : 0;
      formDataObject.termsOfService =
        formDataObject.termsOfService === "on" ? 1 : 0;
      setIsLoading(true); // 🔹 Disable button and show loading
      try {
        const response = await fetch(
          "https://backend.brokercell.com/api/user/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObject),
          }
        );
        const result = await response.json();
        if (response.ok) {
          console.log("Registration successful", result);
          setResponseOk(true);
          setTimeout(() => {
            setResponseOk(false);
            setShowModal(false);
            //  navigate("/");
          }, 3000);
          // Handle successful registration (e.g., redirect to another page, show success message, etc.)
        } else {
          console.error("Registration failed", result);
          setErrors({
            ...errors,
            form: result.message || "Registration failed, please try again.",
          });
        }
      } catch (error) {
        console.error("Error during registration", error);
        setErrors({
          ...errors,
          form: "An error occurred, please try again later.",
        });
      }
      finally {
        setIsLoading(false); // 🔹 Re-enable button after API response
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  }

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    setValue("country", countryCode); // Ensure country value updates in form state
    setAvailableStates(statesList[countryCode] || []);
    setValue("state", ""); // Reset state when country changes
  };

  const arrow = "<"

  return responseOk ? (
    <div>
      <div className={css.responseOk}>
        {/* Modal inside conditional statement */}
        {showModal && (
          <div className={css.modalOverlay}>
            <div className={css.modalContent}>
              <h2>Application Submitted!</h2>
              <p>We have received your application. You will be notified soon.</p>
              <button onClick={closeModal}>OK</button>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className={css.body}>
      <div className={css.layout}>
        <div className={css.layout_head}>

          <div className="flex justify-center flex-col items-center">
            <Link to={"https://brokercell.com/"} target="_blank" className="w-[69%] ml-[46%]">
              <img src={brokerLogo} alt="Broker-Logo" srcSet="" className="w-[35%] " />
            </Link>
            <h2 className="font-bold text-5xl text-[#2c83ec] text-center mt-14 ml-10">JOIN THE NETWORK</h2>
          </div>

          <h3 className="font-bold">FREE TRIAL (NEW COMPANY)</h3>
          <p>
            If you're a broker, reseller, wholesaler, or VAR, we invite you to experience a BrokerCell.com membership at no cost. Enjoy unlimited access, including searches, uploads, user management, listings, and analytical reports. Monitor who is viewing your inventory and track the most popular items. Select your preferred vendors easily.
          </p>
          <ul className="ml-7 text-[#444]" >
            <li>No Obligation Offer</li>
            <li>No Credit Card Required</li>
            <li>Completely Risk Free</li>
          </ul>
          <hr />
        </div>
        <form className={css.contact_form} onSubmit={handleSubmit(handleRegister)}>
          <div className={css.formLayout}>
            <div className={css.company}>
              <h2 className="font-bold text-[#2c83ec]">COMPANY</h2>
              <span className={css.contact_form_fields}>
                <label htmlFor="company name">Company Name <span style={{ color: "red" }}>*</span> </label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Enter your company name"
                  required
                  {...register("companyName")}
                />
              </span>
              <span className={css.contact_form_fields}>
                <label htmlFor="address">Address <span style={{ color: "red" }}>*</span> </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  required
                  {...register("address")}
                />
              </span>
              <span className={css.contact_form_fields}>
                <label htmlFor="city">City <span style={{ color: "red" }}>*</span> </label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter your city"
                  required
                  {...register("city")}
                />
              </span>
              <span
                className={`${css.contact_form_fields} ${css.contact_form_fields_row}`}
              >
                <span>
                  <label htmlFor="state">State <span style={{ color: "red" }}>*</span> </label>
                  {isPlainInput ? (
                    <input
                      type="text"
                      name="state"
                      {...register("state")}
                      placeholder="Enter your state"
                      required
                    />
                  ) : (
                    <select id="state" name="state" {...register("state")} required >
                      <option value="">Select a state</option>
                      {availableStates.map((state) => (
                        <option key={state.value} value={state.value}>
                          {state.label}
                        </option>
                      ))}
                    </select>
                  )}
                </span>
                <span>
                  <label htmlFor="zip code">Zip / Postal Code <span style={{ color: "red" }}>*</span> </label>
                  <input
                    type="text"
                    name="zipcode"
                    placeholder="Enter your zip code"
                    required
                    {...register("zipcode")}
                    className="w-96"
                  />
                </span>
              </span>
              <span className={css.contact_form_fields}>
                <label htmlFor="country">Country <span style={{ color: "red" }}>*</span> </label>
                <select
                  id="country"
                  name="country"
                  {...register("country")}
                  onChange={handleCountryChange}
                  required
                >
                  {countriesList.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>

              </span>
              <span className={css.contact_form_fields}>
                <label htmlFor="region">Region <span style={{ color: "red" }}>*</span> </label>
                <select id="region" {...register("region")} name="region" required>
                  <option value="North America">North America</option>
                  <option value="South America">South America</option>
                  <option value="Africa">Africa</option>
                  <option value="Middle East">Middle East</option>
                  <option value="Europe">Europe</option>
                  <option value="Oceania">Oceania</option>
                  <option value="Asia">Asia</option>
                </select>
              </span>
              <span
                className={`${css.contact_form_fields} ${css.contact_form_fields_row}`}
              >
                <span>
                  <label htmlFor="phone number">Phone Number <span style={{ color: "red" }}>*</span> </label>
                  <input type="text" {...register("phoneNumber")} name="phoneNumber" required className="w-96" />
                </span>
                <span>
                  <label htmlFor="fax number">Fax Number</label>
                  <input type="text" {...register("faxNumber")} name="faxNumber" className="w-96" />
                </span>
              </span>
              <span className={css.contact_form_fields}>
                <label htmlFor="website">Website</label>
                <input type="text" {...register("website")} name="website" />
              </span>
              <span
                className={`${css.contact_form_fields} ${css.contact_form_fields_question}`}
              >
                <span style={{ fontWeight: "600" }}>Have you ever been a member of Brokercell.com?<span style={{ color: "red" }}>*</span> </span>
                <span>
                  <span>
                    <input
                      type="radio"
                      name="memberCheck"
                      id="memberCheckYes"
                      value="yes"
                      required
                      {...register("memberCheck")}
                    />
                    <label htmlFor="yes" className="!font-semibold">Yes</label>
                  </span>
                  <span>
                    <input
                      type="radio"
                      name="memberCheck"
                      id="memberCheckNo"
                      value="no"
                      required
                      {...register("memberCheck")}
                    />
                    <label htmlFor="no" className="!font-semibold">No</label>
                  </span>
                </span>
              </span>
            </div>
            <div className={css.contact}>
              <h2 className="font-bold text-[#2c83ec]">CONTACT</h2>

              <span className={css.contact_form_fields}>
                <label htmlFor="first name">First Name <span style={{ color: "red" }}>*</span> </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  required
                  {...register("firstName")}
                />
              </span>
              <span className={css.contact_form_fields}>
                <label htmlFor="last name">Last Name <span style={{ color: "red" }}>*</span> </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  required
                  {...register("lastName")}
                />
              </span>

              <span className={css.contact_form_fields}>
                <label htmlFor="email">Email <span style={{ color: "red" }}>*</span> </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  {...register("email")}
                />
              </span>
              <span className={css.contact_form_fields}>
                <label htmlFor="Desired User Id">Desired User Id <span style={{ color: "red" }}>*</span> </label>
                <input
                  type="text"
                  name="userId"
                  placeholder="Enter your Desired User Id"
                  required
                  {...register("userId")}
                />
              </span>
              <span className={css.contact_form_fields}>
                <label htmlFor="password">Password <span style={{ color: "red" }}>*</span></label>
                <div className="flex items-center ">
                  <input
                    type={showPassword ? "text" : "password"} // Toggle input type
                    name="password"
                    // onChange={handleChange}
                    // required
                    {...register("password", { required: "Password is required" })}
                    className={`${css.passwordInput} w-[100%]`}
                  />
                  <span
                    className={css.eyeIcon}
                    onClick={() => setShowPassword(!showPassword)} // Toggle state
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
              </span>
              {/* Confirm Password Field */}
              <span className={css.contact_form_fields}>
                <label htmlFor="confirmPassword">Verify Password <span style={{ color: "red" }}>*</span></label>
                <div className="flex items-center ">
                  <input
                    type={showConfirmPassword ? "text" : "password"} // Toggle input type
                    name="confirmPassword"
                    // onChange={handleChange}
                    // required
                    {...register("confirmPassword", { required: "Password is required" })}
                    className={`${css.passwordInput} w-[100%]`}
                  />
                  <span
                    className={css.eyeIcon}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle state
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <p style={{ color: "red" }}>{errors.confirmPassword}</p>
                )}
              </span>
              <span className={css.contact_form_fields}>
                <label htmlFor="promotion">
                  PLEASE SELECT HOW YOU HEARD ABOUT US <span style={{ color: "red" }}>*</span>
                </label>
                <select id="promotion" {...register("heard")} name="heard" required>
                  <option value="">Select One</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Yahoo Search">Yahoo Search</option>
                  <option value="Other Web Search">
                    Other Web Search (specify below)
                  </option>
                  <option value="Magazine">Magazine (specify below)</option>
                  <option value="Sales Call">Sales Call (specify below)</option>
                  <option value="Direct Mail">
                    Direct Mail (specify below)
                  </option>
                  <option value="Other">Other (specify below)</option>
                </select>
              </span>
              <span className={css.contact_form_fields}>
                <label htmlFor="comments">Other Comments</label>
                <textarea
                  name="comments"
                  id="comments"
                  cols="30"
                  rows="10"
                  {...register("comments")}
                ></textarea>
              </span>
            </div>
          </div>
          <div className={css.contact_companyCategory}>
            <span className={css.contact_form_fields}>
              <h2 className="font-bold text-[#2c83ec]">COMPANY CATEGORY(S)</h2>

              <span className={css.contact_form_fields_companyCategory}>
                <input
                  type="checkbox"
                  name="companyCategory"
                  value="Reseller"
                  id="Reseller"
                  {...register("companyCategory")}
                />
                <label htmlFor="Reseller">Reseller</label>
              </span>
              <span className={css.contact_form_fields_companyCategory}>
                <input
                  type="checkbox"
                  name="companyCategory"
                  value="Broker"
                  id="Broker"
                  {...register("companyCategory")}

                />
                <label htmlFor="Broker">Broker</label>
              </span>
              <span className={css.contact_form_fields_companyCategory}>
                <input
                  type="checkbox"
                  name="companyCategory"
                  value="Dealer"
                  id="Dealer"
                  {...register("companyCategory")}

                />
                <label htmlFor="Dealer">Dealer</label>
              </span>
              <span className={css.contact_form_fields_companyCategory}>
                <input
                  type="checkbox"
                  name="companyCategory"
                  value="VAR"
                  id="VAR"
                  {...register("companyCategory")}

                />
                <label htmlFor="VAR">VAR</label>
              </span>
              <span className={css.contact_form_fields_companyCategory}>
                <input
                  type="checkbox"
                  name="companyCategory"
                  value="Distributor"
                  id="Distributor"
                  {...register("companyCategory")}
                />
                <label htmlFor="Distributor">Distributor</label>
              </span>
            </span>
            <span className={css.contact_form_fields}>
              <span className={css.contact_form_fields_companyCategory}>
                <input
                  type="checkbox"
                  name="companyCategory"
                  value="Service Center"
                  id="Service Center"
                  {...register("companyCategory")}
                />
                <label htmlFor="Service Center">Service Center</label>
              </span>
              <span className={css.contact_form_fields_companyCategory}>
                <input 
                type="checkbox" 
                name="companyCategory" 
                value="Mfg"
                id="Mfg" 
                {...register("companyCategory")}
                />
                <label htmlFor="Mfg">Mfg</label>
              </span>
              <span className={css.contact_form_fields_companyCategory}>
                <input
                  type="checkbox"
                  name="companyCategory"
                  value="Integrator"
                  id="Integrator"
                  {...register("companyCategory")}
                />
                <label htmlFor="Integrator">Integrator</label>
              </span>
              <span className={css.contact_form_fields_companyCategory}>
                <input
                  type="checkbox"
                  name="companyCategory"
                  value="Retail"
                  id="Retail"
                  {...register("companyCategory")}
                />
                <label htmlFor="Retail">Retail</label>
              </span>
            </span>
          </div>
          <div className={css.submitBtn}>
            <span>
              <input
                type="checkbox"
                name="termsOfService"
                id="termsOfService"
                {...register("termsOfService")}
                required
              />
              <label htmlFor="termsOfService">Agree to our</label>
              <a href="https://brokercell.com/legal/" target="_blank">Terms of Service</a>
            </span>
            {errors.form && <p style={{ color: "red", fontWeight: "bold", fontSize: "12px", marginTop: "8px" }}>{errors.form}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className={`py-3 px-6 text-white font-semibold rounded-lg transition duration-300 
                          ${isLoading ? "bg-gray-400 cursor-not-allowed opacity-60" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {isLoading ? "Submitting..." : "Submit Application"}
            </button>

            <div className="mt-5 text-[#444]">
              <Link to={"https://brokercell.com"} target="_blank">
                {arrow} Back to BrokerCell
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
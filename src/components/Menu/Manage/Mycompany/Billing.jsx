import React, { useEffect, useState } from "react";
import css from "../../../../styles/Menu/Manage/MyProfile.module.css";
import personalPhoto from "../../../../imgs/logo/shadow.png";
import LoadingState from "../../../../LoadingState";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserData,
  setFormData as updateFormData,
  setCustomSignature,
  setBlurWhileLoading,
  submitUserData,
  submitCompanyLogo,
  clearLogo,
} from "../../../../ReduxStore/ProfleSlice";
import ErrorStatus from "../../../Error/ErrorStatus";
import Cookies from "js-cookie";
import { Link, NavLink } from "react-router-dom";
import Footer from "../../../Footer/Footer";
import axios from "axios";
import { brokerAPI } from "../../../api/BrokerEndpoint";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Billing = () => {
  const token = Cookies.get("token");
  const user_id = Cookies.get("user_id");

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  const {
    user,
    // formData,
    initialData,
    blurWhileLoading,
    customSignature,
    error,
    companyLogo,
  } = useSelector((state) => state.profileStore);
  console.log("INITAL DATA", initialData);
  console.log("FORM DATA", formData);
  console.log("COMPANY LOGO", companyLogo);
  const image = formData.data?.company?.image;

  console.log("Company Image", image);

  console.log("User ", user);
  const id = user?.user?.id || user_id;

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(id);
    dispatch(fetchUserData({ id, token }));
  }, []);

  const companyId = initialData?.company?.id;
  console.log("Company ID", companyId);
  console.log("TOKEN", token);

  useEffect(() => {
    if (companyId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${brokerAPI}company/show/${companyId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setFormData(response.data); // API ka response direct set ho raha hai
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data", error);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [companyId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update Local State for Nested Structure
    setFormData((prevData) => {
      const updatedData = { ...prevData };

      if (!updatedData.data) updatedData.data = {};
      if (!updatedData.data.company) updatedData.data.company = {};
      if (!updatedData.data.company.primaryContact)
        updatedData.data.company.primaryContact = {};

      updatedData.data.company.primaryContact[name] = value; // Update the nested local state
      return updatedData;
    });

    // Update Redux State for Flat Structure
    dispatch(
      updateFormData({
        [name]: value, // Match the flat structure for Redux state
      })
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setBlurWhileLoading(false)); // Set blur loading state

    const formDataApi = new FormData(event.target);

    // Prepare payload
    const data = Object.fromEntries(
      Object.entries(Object.fromEntries(formDataApi.entries())).map(
        ([key, value]) => {
          if (key === "signature" || key === "customSignature") {
            value = value
              .split("\n")
              .filter(Boolean)
              .map((item) => item.replace(/\s+/g, " ").trim());
          } else if (typeof value === "string") {
            value = value.replace(/\s+/g, " ").trim();
          }
          return [key, value];
        }
      )
    );

    // Handle company logo upload separately
    const logoFile = formDataApi.get("image");
    if (logoFile && logoFile.size > 0) {
      dispatch(clearLogo());
      dispatch(submitCompanyLogo({ token, file: logoFile }));
    }

    // Direct API call to backend
    try {
      const response = await axios.post(
        `${brokerAPI}user/edit/${id}`,
        JSON.stringify(data),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API Response:", response.data);

      // If required, update Redux state here
      dispatch(updateFormData(data));
      // ✅ Show success toast with light blue color
      toast.info("Company Data Updated Successfully", {
        style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" }, //
      });
    } catch (error) {
      console.error(
        "Error updating Company Data:",
        error.response?.data || error.message
      );
      toast.error("Error Updating  Company Data", {
        style: { fontSize: "15px", marginTop: "-10px", fontWeight: "bold" }, //
      });
    } finally {
      console.log("Setting loading to false");
      dispatch(setBlurWhileLoading(true)); // Reset blur loading state
    }

    console.log("Payload Sent:", data);
  };

  const loggedInUserId = Number(Cookies.get("user_id"));
  const primaryContactId = formData.data?.company?.primaryContact?.id;

  console.log(loggedInUserId, primaryContactId);

  if (error) {
    return (
      <>
        <ErrorStatus error={error} />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <LoadingState />
      </>
    );
  }

  return (
    <>
      {!blurWhileLoading && <LoadingState />}
      {blurWhileLoading && (
        <div className={`${css.profileLayout} `}>
          <form onSubmit={handleSubmit}>
            <div className={`${css.profileInfo} !min-w-[54vw]`}>
              <div className={css.profileInfo_links}>
                <ul>
                  <li>
                    <NavLink
                      to="/mycompany"
                      end
                      className={({ isActive }) => (isActive ? css.active : "")}
                    >
                      <span>Primary Contact</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/companyContacts"
                      end
                      className={({ isActive }) => (isActive ? css.active : "")}
                    >
                      <span>Company Contacts</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/mycompany/CompanyInfo"
                      end
                      className={({ isActive }) => (isActive ? css.active : "")}
                    >
                      <span>Company Info</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/mycompany/SalesInfo"
                      className={({ isActive }) => (isActive ? css.active : "")}
                    >
                      <span>Sales Info</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/mycompany/Photos"
                      end
                      className={({ isActive }) =>
                        isActive ? css.active : ""
                      }
                    >
                      <span>Photos</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                        to="/mycompany/Billing+Info"
                        end
                        className={({ isActive }) =>
                            isActive ? css.active : ""
                        }
                    > 
                        <span>Billing</span>
                    </NavLink>
                    </li>
                </ul>
              </div>
              <div className={`${css.profileInfo_form} flex space-x-20`}>
              <div>Left</div>
              <div className={`rightdiv !space-y-6`}>
                <div>
                <h1>Invoice Email</h1>
                <input
                type="text"
                className="w-[30vw]"

                />
                <h1>Payment Info</h1>
                <select className="w-[30vw] border border-gray-300 rounded px-2 py-2 ">
                    <option>Wire Transfer</option>
                    <option>Card Payment</option>
                </select>
                <h1>Contact Us</h1>
                <a href="/feedback"> Questions? Concerns? Please contact us.</a>
                <p className="italic text-sm text-center ">
                    * To update your credit card or other billing information, please download and complete the appropriate billing form from above and return to BrokerCell.
                </p>
                <p className="italic text-sm text-left ">
                    * To request your invoice sent by US mail, please contact us at Help.
                </p>
                <p className="italic text-sm text-left ">
                    * Invoices are updated four days after your billing period
                </p>
                <h1> <a href="https://brokercell.com/membership/"> Membership Plans & Prices may be viewed here.</a></h1>
                </div>
              </div>
              </div>
              <div className="pt-2 flex justify-between">
                <button
                  className={
                    loggedInUserId != primaryContactId
                      ? "cursor-not-allowed !bg-[#2c83ec]  !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-6 disabled:first"
                      : "!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-6 "
                  }
                  type=""
                  disabled={loggedInUserId != primaryContactId}
                >
                  Reset
                </button>
                <button
                  className={
                    loggedInUserId != primaryContactId
                      ? "cursor-not-allowed !bg-[#2c83ec]  !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-6 disabled:first"
                      : "!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-6 "
                  }
                  type="submit"
                  disabled={loggedInUserId != primaryContactId}
                >
                  Submit Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default Billing;
import React, { useEffect, useState } from "react";
import css from "../../../../styles/Menu/Manage/MyProfile.module.css";
import LoadingState from "../../../../LoadingState";
import { useDispatch, useSelector } from "react-redux";
import { submitBillingInfo } from "../../../../ReduxStore/ProfleSlice";
import Cookies from "js-cookie";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Billing = () => {
  const token = Cookies.get("token");
  const [billingInfo, setBillingInfo] = useState({
    invoiceEmail: [],
    invoiceEmailText: "",
    paymentMethod: "Wire Transfer",
  });

  const companyId = Number(Cookies.get("companyId"));

  const {
    user,
    // formData,
    initialData,
    blurWhileLoading,
    customSignature,
    error,
    companyLogo,
  } = useSelector((state) => state.profileStore);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "invoiceEmail") {
      setBillingInfo((prev) => ({
        ...prev,
        invoiceEmailText: value, // store raw text
        invoiceEmail: value
          .split(",")
          .map((email) => email.trim())
          .filter((email) => email !== ""),
      }));
    } else {
      setBillingInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      invoice_emails: billingInfo.invoiceEmail,
      payment_method: billingInfo.paymentMethod,
      company_id: companyId,
    };

    try {
      const resultAction = await dispatch(
        submitBillingInfo({ data: payload, token })
      );

      if (resultAction?.payload?.status === true) {
        toast.info(
          resultAction?.payload?.message || "Billing info updated successfully.",
          { style: { fontSize: "12px", fontWeight: "bold" } }
        );
        setBillingInfo({
          invoiceEmail: [],
          invoiceEmailText: "",
          paymentMethod: "Wire Transfer",
        });
      } else {
        toast.error("Failed to update billing info.");
      }
    } catch (error) {
      toast.error("Something went wrong while submitting billing info.");
      console.error(error);
    }
  };

  const handleReset = () => {
    setBillingInfo({
      invoiceEmail: [],
      invoiceEmailText: "",
      paymentMethod: "Wire Transfer",
    });
  };

  return (
    <>
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
                    className={({ isActive }) => (isActive ? css.active : "")}
                  >
                    <span>Photos</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/mycompany/Billing+Info"
                    end
                    className={({ isActive }) => (isActive ? css.active : "")}
                  >
                    <span>Billing</span>
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className={`${css.profileInfo_form} flex space-x-20`}>
              <div>
                <div className="p-4 text-sm">
                  <p className="mb-1">
                    Past Due Balance:
                    <span className="font-semibold ml-2">$0.00</span>
                  </p>
                  <p className="mb-4">
                    Billing Cycle:
                    <span className="font-semibold ml-2">
                      15th of the month
                    </span>
                  </p>

                  <table className="table-auto border-collapse border border-gray-400">
                    <thead className="bg-[#44565b] text-white">
                      <tr>
                        <th className="px-3 py-1 border border-gray-400">
                          Invoice #
                        </th>
                        <th className="px-3 py-1 border border-gray-400">
                          Cycle Date
                        </th>
                        <th className="px-3 py-1 border border-gray-400"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { invoice: "1668273", date: "2025-06-22" },
                        { invoice: "1567924", date: "2024-08-22" },
                        { invoice: "1555943", date: "2024-07-22" },
                        { invoice: "1458000", date: "2023-08-22" },
                      ].map((row, i) => (
                        <tr key={i}>
                          <td className="px-3 py-1 border border-gray-400">
                            {row.invoice}
                          </td>
                          <td className="px-3 py-1 border border-gray-400">
                            {row.date}
                          </td>
                          <td className="px-3 py-1 border border-gray-400  underline cursor-pointer">
                            View
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className={`rightdiv !space-y-6`}>
                <div>
                  <div>
                    <h1>Invoice Email</h1>
                    <input
                      type="text"
                      name="invoiceEmail"
                      className="w-[30vw]"
                      value={billingInfo.invoiceEmailText}
                      onChange={handleChange}
                    />

                    <p className="italic text-base text-left ">
                      For multiple emails, separate with a comma.
                    </p>
                  </div>

                  <div className="mt-5">
                    <h1>Payment Info</h1>
                    <select
                      name="paymentMethod"
                      className="w-[30vw] border border-gray-300 rounded px-2 py-2"
                      value={billingInfo.paymentMethod}
                      onChange={handleChange}
                    >
                      <option>Wire Transfer</option>
                      <option>Card Payment</option>
                    </select>
                  </div>

                  <div className="mt-5">
                    <h1>Contact Us</h1>
                    <a href="/feedback" className="font-semibold ml-4">
                      Questions? Concerns? Please contact us.
                    </a>
                  </div>

                  <div className="mt-5">
                    <h1>Billing Forms</h1>
                    <div className="flex flex-col ml-4 ">
                      <a href="" className="font-semibold">
                        Credit Card Authorization Form
                      </a>
                      <a href="" className="font-semibold">
                        USA Domestic Wire Instructions
                      </a>
                      <a href="" className="font-semibold">
                        International Wire Instructions
                      </a>
                      <a href="" className="font-semibold">
                        ACH Authorization Form
                      </a>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="italic text-base   w-[50rem]">
                      * To update your credit card or other billing information,
                      please download and complete the appropriate billing form
                      from above and return to BrokerCell.
                    </p>
                    <p className="italic text-base text-left ">
                      * To request your invoice sent by US mail, please contact
                      us at Help.
                    </p>
                    <p className="italic text-base text-left ">
                      * Invoices are updated four days after your billing period
                    </p>
                  </div>
                  <div className="mt-5">
                    <h1 className="text-[#444] ">
                      <a
                        href="https://brokercell.com/membership/"
                        target="blank"
                        className="text-2xl font-semibold"
                      >
                        Membership Plans & Prices
                        <span className="ml-2">may be viewed here.</span>
                      </a>
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-between">
              <button
                className={
                  "!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-6 "
                }
                type="button"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                className={
                  "!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-6 "
                }
                type="submit"
              >
                Submit Changes
              </button>
            </div>
          </div>
        </form>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default Billing;

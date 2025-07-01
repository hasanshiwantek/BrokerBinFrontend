import React, { useEffect, useState } from "react";
import css from "../../../../../styles/Menu/Manage/MyProfile.module.css";
import LoadingState from "../../../../../LoadingState";
import { useDispatch, useSelector } from "react-redux";
import { setBlurWhileLoading } from "../../../../../ReduxStore/ProfleSlice";
import ErrorStatus from "../../../../Error/ErrorStatus";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Trading from "./Trading";
import Terms from "./Terms";
import Categories from "./Categories";
import Manufacturers from "./Manufacturer";
import ReturnPolicy from "./ReturnPolicy";
import { useForm, FormProvider } from "react-hook-form";
import {
  submitTradingData,
  submitCompanyTerms,
  submitCompanyCategories,
  submitCompanyManufacturers,
  submitCompanyreturnPolicy,
} from "../../../../../ReduxStore/ProfleSlice";

const SalesInfo = () => {
  // const methods = useForm();
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("trading"); // or 'bio', 'logo', etc.
  const [getTermsFormData, setTermsFormData] = useState({});

  const tabItems = [
    { key: "trading", label: "Trading" },
    { key: "terms", label: "Terms" },
    { key: "categories", label: "Categories" },
    { key: "manufacturers", label: "Manufacturers" },
    { key: "returnPolicy", label: "Return Policy" },
  ];

  const { blurWhileLoading, error } = useSelector(
    (state) => state.profileStore
  );

  const company_id = Number(Cookies.get("companyId"));
  console.log("Company ID...", company_id);
  console.log("TOKEN", token);

  const methods = useForm({
    defaultValues: {
      company_id: company_id,
      // you can set other default values here too if needed
    },
  });

  const { handleSubmit } = methods;

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      if (activeTab === "trading") {
  const {
    blind_shipping,
    lease_program,
    rental_program,
    trade_program,
    shipping_hour,
    shipping_ampm,
    trading_region,
    shipping_options,
    shippingOther,
  } = data;

  const payload = {
    blind_shipping: blind_shipping === "yes",
    lease_program,
    rental_program,
    trade_program,
    shipping_deadline: `${shipping_hour} ${shipping_ampm}`,
    trading_region,
    shipping_options,
    shippingOther,
    company_id
  };
        console.log("📦 Submitting Trading Data:", data);

        // data.blind_shipping = data.blind_shipping === "yes";
        // data.shipping_deadline = `${data.shipping_hour} ${data.shipping_ampm}`;
        const result = await dispatch(
          submitTradingData({
            data:payload,
            token,
          })
        ).unwrap();

        console.log("✅ Trading Response:", result);

        toast.info(result?.data?.message || "Trading info updated!", {
          style: { fontSize: "15px", marginTop: "-10px" },
        });
      }

      if (activeTab === "terms") {
        console.log("📦 Submitting Trading Data:", data);
        const formData = getTermsFormData();
        const result = await dispatch(
          submitCompanyTerms({ data: formData, token })
        ).unwrap();
        console.log("✅ Terms Response:", result);
        toast.info(result?.data?.message || "Terms info updated!", {
          style: { fontSize: "15px", marginTop: "-10px" },
        });
      }

      if (activeTab === "categories") {
        const categoryPayload = {
          companyId: company_id,
          companyCategories: data.companyCategories,
        };

        console.log("📦 Submitting Category Data:", categoryPayload);

        const result = await dispatch(
          submitCompanyCategories({
            data: categoryPayload,
            token,
          })
        ).unwrap();

        console.log("✅ Categories Response:", result);

        toast.info(result?.data?.message || "Company Categories updated!", {
          style: { fontSize: "15px", marginTop: "-10px" },
        });
      }

      if (activeTab === "manufacturers") {
        const mfgPayload = {
          companyId: company_id,
          manufacturer: data.manufacturers,
        };

        console.log("📦 Submitting Manufacturer Data:", mfgPayload);

        const result = await dispatch(
          submitCompanyManufacturers({
            data: mfgPayload,
            token,
          })
        ).unwrap();

        console.log("✅ Categories Response:", result);

        toast.info(result?.data?.message || "Company Manufacturers updated!", {
          style: { fontSize: "15px", marginTop: "-10px" },
        });
      }

      if (activeTab === "returnPolicy") {
        const returnPolicyPayload = {
          companyId: company_id,
          returnPolicy: data.returnPolicy,
        };

        console.log("📦 Submitting Manufacturer Data:", returnPolicyPayload);

        const result = await dispatch(
          submitCompanyreturnPolicy({
            data: returnPolicyPayload,
            token,
          })
        ).unwrap();

        console.log("✅ Return Policy Response:", result);

        toast.info(
          result?.data?.message || "Company Return Policy updated!",

          {
            style: { fontSize: "15px", marginTop: "-10px" },
          }
        );
      }
    } catch (err) {
      console.error("❌ Submission Error:", err);
      toast.error(
        err?.response?.data?.message ||
        err?.message ||
        "Update failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setBlurWhileLoading(true));
  }, []);

  if (error) {
    return (
      <>
        <ErrorStatus error={error} />
      </>
    );
  }

  return (
    <>
      {!blurWhileLoading && <LoadingState />}
      {blurWhileLoading && (
        <div className={`${css.profileLayout} `}>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className={`${css.profileInfo} !min-w-[60vw]`}>
                <div className={css.profileInfo_links}>
                  <ul>
                    <li>
                      <NavLink
                        to="/mycompany"
                        end
                        className={({ isActive }) =>
                          isActive ? css.active : ""
                        }
                      >
                        <span>Primary Contact</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/companyContacts"
                        end
                        className={({ isActive }) =>
                          isActive ? css.active : ""
                        }
                      >
                        <span>Company Contacts</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/mycompany/CompanyInfo"
                        end
                        className={({ isActive }) =>
                          isActive ? css.active : ""
                        }
                      >
                        <span>Company Info</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/mycompany/SalesInfo"
                        end
                        className={({ isActive }) =>
                          isActive ? css.active : ""
                        }
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
                <div
                  className={`${css.companyInfoTabs} border-gray-400 border-t-2`}
                >
                  <ul className="flex justify-start gap-5 items-center">
                    {tabItems.map((tab) => (
                      <li
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`${
                          activeTab === tab.key
                            ? "font-bold bg-white !p-4 "
                            : "cursor-pointer"
                        }`}
                      >
                        {tab.label}
                      </li>
                    ))}
                  </ul>
                </div>

                {activeTab === "trading" && (
                  <div className={`${css.profileInfo_form}`}>
                    <Trading />
                  </div>
                )}

                {activeTab === "terms" && (
                  <div className={`${css.profileInfo_form}`}>
                    <Terms setTermsFormData={setTermsFormData} />
                  </div>
                )}

                {activeTab === "categories" && (
                  <div className={`${css.profileInfo_form}`}>
                    <Categories />
                  </div>
                )}

                {activeTab === "manufacturers" && (
                  <div className={`${css.profileInfo_form}`}>
                    <Manufacturers />
                  </div>
                )}

                {activeTab === "returnPolicy" && (
                  <div className={`${css.profileInfo_form}`}>
                    <ReturnPolicy />
                  </div>
                )}

                <div className="pt-2 flex justify-between">
                  <button
                    className="!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-6"
                    onClick={() => window.location.reload()}
                  >
                    Reset
                  </button>
                  <button
                    className={`!bg-[#2c83ec] !h-[1.5vw] items-center flex justify-center !rounded-[.2vw] !px-4 !py-6 text-white font-semibold transition-all duration-150 ${
                      loading ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          ></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Submit Changes"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      )}

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default SalesInfo;

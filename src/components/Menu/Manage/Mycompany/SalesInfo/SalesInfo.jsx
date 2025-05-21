import React, { useEffect, useState } from "react";
import css from "../../../../../styles/Menu/Manage/MyProfile.module.css";
import LoadingState from "../../../../../LoadingState";
import { useDispatch, useSelector } from "react-redux";
import {
  setBlurWhileLoading,
} from "../../../../../ReduxStore/ProfleSlice";
import ErrorStatus from "../../../../Error/ErrorStatus";
import Cookies from "js-cookie";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { brokerAPI } from "../../../../api/BrokerEndpoint";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Trading from "./Trading";
import Terms from "./Terms";
import Categories from "./Categories";
import { useForm, FormProvider } from "react-hook-form";
import { submitTradingData,submitCompanyCategories } from "../../../../../ReduxStore/ProfleSlice";
const SalesInfo = () => {
  // const methods = useForm();
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("trading"); // or 'bio', 'logo', etc.

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
  console.log("Company ID", company_id);
  console.log("TOKEN", token);

  const methods = useForm({
    defaultValues: {
      company_id: company_id,
      // you can set other default values here too if needed
    },
  });

  const { handleSubmit } = methods;

  const handleFormSubmit = async (data) => {
  try {
    if (activeTab === "trading") {
      data.blind_shipping = data.blind_shipping === "yes";
      await dispatch(
        submitTradingData({
          data,
          token,
          company_id,
        })
      ).unwrap(); // use unwrap to catch errors in try/catch
      toast.success("Trading info updated!");
    }

    // Add other tab API calls similarly if needed
  } catch (err) {
    toast.error("Update failed. Please try again.");
    console.error(err);
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
                    <Terms />
                  </div>
                )}

                {activeTab === "categories" && (
                  <div className={`${css.profileInfo_form}`}>
                    <Categories formData={formData} setFormData={setFormData} />
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
                    className="!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-6"
                    type="submit"
                  >
                    Submit Changes
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

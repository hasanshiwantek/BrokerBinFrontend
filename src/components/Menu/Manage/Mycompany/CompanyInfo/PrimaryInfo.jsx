import React, { useEffect, useState } from "react";
import css from "../../../../../styles/Menu/Manage/MyProfile.module.css";
import LoadingState from "../../../../../LoadingState";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserData,
  setFormData as updateFormData,
  setCustomSignature,
  setBlurWhileLoading,
  submitUserData,
  submitCompanyLogo,
  clearLogo,
} from "../../../../../ReduxStore/ProfleSlice";
import ErrorStatus from "../../../../Error/ErrorStatus";
import Cookies from "js-cookie";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { brokerAPI } from "../../../../api/BrokerEndpoint";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CompanyBio from "./CompanyBio";
import {
  updateCompanyPrimaryInfo,
  updateCompanyBio,
} from "@/ReduxStore/SearchProductSlice";
import { useRef } from "react";

const CompanyPrimaryInfo = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  console.log("Form data: ", formData);

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("primary"); // or 'bio', 'logo', etc.
  const [bio, setBio] = useState("");
  console.log("BIO", bio)
  const bioRef = useRef("");
  const tabItems = [
    { key: "primary", label: "Primary Info" },
    { key: "bio", label: "Company Bio" },
    { key: "logo", label: "Logo" },
    { key: "credentials", label: "Credentials" },
    { key: "options", label: "Options" },
  ];

  const {
    // formData,
    initialData,
    blurWhileLoading,
    customSignature,
    error,
    companyLogo,
  } = useSelector((state) => state.profileStore);
  // console.log("INITAL DATA", initialData);
  // console.log("FORM DATA", formData);
  // console.log("COMPANY LOGO", companyLogo);
  // const image = formData.data?.company?.image;

  // console.log("Company Image", image);

  const companyId = Number(Cookies.get("companyId"));
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
          setFormData(response.data);
          setBio(response.data.data.company.description || "");
          dispatch(setBlurWhileLoading(true));
        } catch (err) {
          console.error("Error fetching data", err);
        }
      };
      fetchData();
    }
  }, [companyId, token, dispatch]);

  

  const states = [
    { value: "NY", label: "New York" },
    { value: "CA", label: "California" },
    // add more
  ];

  const countries = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    // add more
  ];

  const regions = countries; // Assuming regions are similar to countries

  const timeZones = [
    { value: "8", label: "(GMT -08:00) Pacific Time (US & Canada); Tijuana" },
    { value: "7", label: "(GMT -07:00) Mountain Time (US & Canada)" },
    { value: "6", label: "(GMT -06:00) Central Time (US & Canada)" },
    { value: "5", label: "(GMT -05:00) Eastern Time (US & Canada)" },
    { value: "4", label: "(GMT -04:00) Atlantic Time (Canada)" },
    { value: "", label: "----------------------------" },
    { value: "12", label: "(GMT -12:00) Eniwetok, Kwajalein" },
    { value: "11", label: "(GMT -11:00) Midway Island, Samoa" },
    { value: "10", label: "(GMT -10:00) Hawaii" },
    { value: "9", label: "(GMT -09:00) Alaska" },
    { value: "8", label: "(GMT -08:00) Pacific Time (US & Canada); Tijuana" },
    { value: "7", label: "(GMT -07:00) Mountain Time (US & Canada)" },
    {
      value: "6",
      label:
        "(GMT -06:00) Central Time, Mexico City, Tegucigalpa (US & Canada)",
    },
    {
      value: "5",
      label: "(GMT -05:00) Eastern Time, Bogota, Lima, Quito (US & Canada)",
    },
    {
      value: "4",
      label: "(GMT -04:00) Atlantic Time, Caracas, La Paz, Santiago (Canada)",
    },
    { value: "3.5", label: "(GMT -03:30) Newfoundland" },
    { value: "3", label: "(GMT -03:00) Brasilia, Buenos Aries, Georgetown" },
    { value: "2", label: "(GMT -02:00) Mid-Atlantic" },
    { value: "1", label: "(GMT -01:00) Azores, Cape Verde Is." },
    { value: "0", label: "(GMT) Casablanca, Monrovia" },
    { value: "0", label: "(GMT) Greenwich Mean Time: Dublin, Lisbon, London" },
    { value: "-1", label: "(GMT +01:00) Amsterdam, Berlin, Rome, Warsaw" },
    { value: "-2", label: "(GMT +02:00) Athens, Istanbul, Minsk, Cairo" },
    { value: "-3", label: "(GMT +03:00) Kuwait, Baghdad, Riyadh, Moscow" },
    { value: "-4", label: "(GMT +04:00) Abu Dhabi, Muscat, Baku, Tbilisi" },
    { value: "-5", label: "(GMT +05:00) Ekaterinburg, Islamabad, Tashkent" },
    {
      value: "-5.5",
      label: "(GMT +05:30) Bombay, Calcutta, Madras, New Delhi",
    },
    { value: "-6", label: "(GMT +06:00) Astana, Almaty, Dhaka, Colombo" },
    { value: "-7", label: "(GMT +07:00) Bangkok, Hanoi, Jakarta" },
    { value: "-8", label: "(GMT +08:00) Singapore, Perth, Beijing, Hong Kong" },
    { value: "-9", label: "(GMT +09:00) Seoul, Tokyo, Yakustk" },
    { value: "-9.5", label: "(GMT +09.30) Adelaide, Darwin" },
    { value: "-10", label: "(GMT +10:00) Brisbane, Sydney, Guam, Hobart" },
    { value: "-11", label: "(GMT +11:00) Magadan, Solomon Is., New Caledonia" },
    { value: "-12", label: "(GMT +12:00) Fiji, Kamchatka, Auckland" },
  ];

  const generalFields = [
    { label: "Address", name: "address", type: "text" },
    { label: "City", name: "city", type: "text" },
    { label: "Zip Code", name: "zipcode", type: "text" },
    { label: "State", name: "state", type: "select", options: states },
    { label: "Country", name: "country", type: "select", options: countries },
    { label: "Region", name: "region", type: "select", options: regions },
    { label: "Phone", name: "phone", type: "text" },
    { label: "Toll Free", name: "tollFree", type: "text" },
    { label: "Fax", name: "fax", type: "text" },
    { label: "EIN", name: "EIN", type: "text" },
    { label: "Website", name: "website", type: "text" },
    { label: "Locations", name: "locations", type: "text" },
    { label: "Warehouse", name: "warehouse", type: "text" },
    { label: "Office Size", name: "officeSize", type: "text" },
    { label: "Languages", name: "Languages", type: "text" },
    { label: "Employees", name: "Employees", type: "text" },
    { label: "Date", name: "date", type: "text" },
    { label: "Annual Sales", name: "annualSales", type: "text" },
  ];

  const hoursOfOperationFields = [
    { label: "Open", name: "open", type: "text" },
    { label: "Close", name: "close", type: "text" },
    { label: "Office Hours", name: "officeHours", type: "text" },
    {
      label: "Time Zone",
      name: "timeZone",
      type: "select",
      options: timeZones,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedCompany = { ...formData.data.company };

    // Special handling for open/close hour & AMPM
    if (name === "open_hour" || name === "open_ampm") {
      const hour =
        name === "open_hour" ? value : updatedCompany.open_hour || "";
      const ampm =
        name === "open_ampm" ? value : updatedCompany.open_ampm || "";
      updatedCompany.open_hour = hour;
      updatedCompany.open_ampm = ampm;
      updatedCompany.open_timing = `${hour}${ampm}`;
      console.log("Updated Open Timing:", updatedCompany.open_timing);
    } else if (name === "close_hour" || name === "close_ampm") {
      const hour =
        name === "close_hour" ? value : updatedCompany.close_hour || "";
      const ampm =
        name === "close_ampm" ? value : updatedCompany.close_ampm || "";
      updatedCompany.close_hour = hour;
      updatedCompany.close_ampm = ampm;
      updatedCompany.close = `${hour}${ampm}`;
      console.log("Updated Close Timing:", updatedCompany.close);
    } else {
      updatedCompany[name] = value;
    }

    setFormData((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        company: updatedCompany,
      },
    }));

    console.log(`Changed: ${name} = ${value}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (activeTab === "primary") {
        const payload = formData?.data?.company;
        console.log("🚀 Submitting Company Primary Info:", payload);

        const result = await dispatch(
          updateCompanyPrimaryInfo({ token, data: payload })
        );

        if (result?.payload?.status) {
          toast.success("✅ Company primary info updated successfully");
          console.log("✅ Success Response:", result.payload);
        } else {
          toast.error("❌ Failed to update company primary info");
          console.warn("❌ Failure Response:", result);
        }
      }

      if (activeTab === "bio") {
    

        console.log("🚀 Submitting Company Bio:", bio);
        // Remove outer <p> tags only
        let cleanedBio = bio.replace(/^<p>(.*?)<\/p>$/i, "$1");

        const result = await dispatch(
          updateCompanyBio({
            token,
            company_id: companyId,
            description: cleanedBio,
          })
        );

        if (result?.payload?.status) {
          toast.success("✅ Company bio updated successfully");
          console.log("✅ Bio Saved:", result.payload);
        } else {
          toast.error("❌ Failed to update company bio");
          console.warn("❌ Failure Response:", result);
        }
      }
    } catch (error) {
      console.error("❌ Error during form submission:", error);
      toast.error("❌ Something went wrong during submission");
    }
  };

  useEffect(() => {
    if (formData?.data?.company) {
      const company = { ...formData.data.company };

      if (company.open_timing) {
        const openMatch = company.open_timing.match(/^(\d+)(AM|PM)$/i);
        if (openMatch) {
          company.open_hour = openMatch[1];
          company.open_ampm = openMatch[2];
        }
      }

      if (company.close) {
        const closeMatch = company.close.match(/^(\d+)(AM|PM)$/i);
        if (closeMatch) {
          company.close_hour = closeMatch[1];
          company.close_ampm = closeMatch[2];
        }
      }

      setFormData((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          company,
        },
      }));
    }
  }, [formData?.data?.company?.open_timing, formData?.data?.company?.close]);

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
        <div className={css.profileLayout}>
          <form onSubmit={handleSubmit}>
            <div className={css.profileInfo}>
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
                        activeTab === tab.key ? "font-bold " : "cursor-pointer"
                      }`}
                    >
                      {tab.label}
                    </li>
                  ))}
                </ul>
              </div>

              {activeTab === "primary" && (
                <div className={`${css.profileInfo_form} `}>
                  <h1>Primary Info</h1>
                  <div className="flex">
                    <div className="flex flex-col gap-4 text-left">
                      {generalFields.map((field) => (
                        <span
                          key={field.name}
                          className="flex justify-between items-center gap-5 "
                        >
                          <label htmlFor={field.name}>{field.label}</label>
                          {field.type === "select" ? (
                            <select
                              id={field.name}
                              name={field.name}
                              onChange={handleChange}
                              value={
                                formData?.data?.company?.[field.name] || ""
                              }
                              className="border-2 p-2 "
                            >
                              <option value="">Select {field.label}</option>
                              {field.options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={field.type}
                              id={field.name}
                              name={field.name}
                              onChange={handleChange}
                              value={
                                formData?.data?.company?.[field.name] || ""
                              }
                              placeholder={field.label}
                            />
                          )}
                        </span>
                      ))}
                    </div>
                    <div className="map">
                      <h2 className="text-xl font-semibold">MAP Div</h2>
                    </div>
                  </div>

                  {/* Hours of Operation */}
                  <div className="flex flex-col gap-4 text-left mt-6">
                    <h2 className="text-md font-semibold">
                      Hours of Operation
                    </h2>

                    {hoursOfOperationFields.map((field) => {
                      if (field.name === "open" || field.name === "close") {
                        return (
                          <div
                            key={field.name}
                            className="flex items-center justify-between gap-4"
                          >
                            <label htmlFor={field.name} className="w-32">
                              {field.label}
                            </label>
                            <div className="flex gap-2 w-full">
                              {/* Hour Dropdown */}
                              <select
                                name={`${field.name}_hour`}
                                className="border border-gray-300 rounded px-2 py-1 "
                                onChange={handleChange}
                                value={
                                  formData?.data?.company?.[
                                    `${field.name}_hour`
                                  ] || ""
                                }
                              >
                                {[...Array(12)].map((_, i) => (
                                  <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                  </option>
                                ))}
                              </select>

                              {/* AM/PM Dropdown */}
                              <select
                                name={`${field.name}_ampm`}
                                className="border border-gray-300 rounded px-2 py-1 "
                                onChange={handleChange}
                                value={
                                  formData?.data?.company?.[
                                    `${field.name}_ampm`
                                  ] || ""
                                }
                              >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                              </select>
                            </div>
                          </div>
                        );
                      }

                      // Standard select or text fields (Office Hours, Time Zone)
                      return (
                        <div key={field.name} className="flex items-center  ">
                          <label htmlFor={field.name} className="w-32">
                            {field.label}
                          </label>

                          {field.type === "select" ? (
                            <select
                              id={field.name}
                              name={field.name}
                              onChange={handleChange}
                              value={
                                formData?.data?.company?.[field.name] || ""
                              }
                              className="border border-gray-300 rounded px-2 py-1 "
                            >
                              <option value="">Select {field.label}</option>
                              {field.options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="text"
                              id={field.name}
                              name={field.name}
                              onChange={handleChange}
                              value={
                                formData?.data?.company?.[field.name] || ""
                              }
                              placeholder={field.label}
                              className="border border-gray-300 rounded px-2 py-1 "
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {activeTab === "bio" && bio !== null && (
                <div className={`${css.profileInfo_form}`}>
                  <CompanyBio bio={bio} setBio={setBio}  />
                </div>
              )}

              <div className="pt-2">
                <button
                  className="!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-7"
                  type="submit"
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

export default CompanyPrimaryInfo;

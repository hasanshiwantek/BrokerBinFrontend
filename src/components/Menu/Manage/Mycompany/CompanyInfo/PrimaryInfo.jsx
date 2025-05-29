import React, { useEffect, useState } from "react";
import css from "../../../../../styles/Menu/Manage/MyProfile.module.css";
import LoadingState from "../../../../../LoadingState";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData as updateFormData,
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
import CompanyBio from "./CompanyBio";
import CompanyLogo from "./CompanyLogo";
import {
  updateCompanyPrimaryInfo,
  updateCompanyBio,
} from "@/ReduxStore/SearchProductSlice";
import { useRef } from "react";
import { statesList, countriesList, regionsList } from "@/data/services";
import { submitCompanyLogo } from "@/ReduxStore/ProfleSlice";
import CompanyInfoOptions from "./CompanyInfoOptions";
import MapComponent from "./CompanyMapComponent";
const CompanyPrimaryInfo = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  console.log("Form data: ", formData);

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("primary"); // or 'bio', 'logo', etc.
  const [bio, setBio] = useState("");
  const [logoPreview, setLogoPreview] = useState(""); // for preview
  const [selectedLogoFile, setSelectedLogoFile] = useState(null); // actual file for submission

  console.log("BIO", bio);

  const tabItems = [
    { key: "primary", label: "Primary Info" },
    { key: "bio", label: "Company Bio" },
    { key: "logo", label: "Logo" },
    { key: "options", label: "Options" },
  ];

  const {
    // formData,
    blurWhileLoading,
    error,
  } = useSelector((state) => state.profileStore);

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
          setLogoPreview(response.data.data.company.image || "");
          dispatch(setBlurWhileLoading(true));
        } catch (err) {
          console.error("Error fetching data", err);
        }
      };
      fetchData();
    }
  }, [companyId, token, dispatch]);

  const states = [
    { value: "", label: "N/A" },
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "DC", label: "District of Columbia" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "PR", label: "Puerto Rico" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
    { value: "AB", label: "Alberta" },
    { value: "BC", label: "British Columbia" },
    { value: "MB", label: "Manitoba" },
    { value: "NB", label: "New Brunswick" },
    { value: "NF", label: "Newfoundland" },
    { value: "NT", label: "Northwest Territories" },
    { value: "NS", label: "Nova Scotia" },
    { value: "NU", label: "Nunavut" },
    { value: "ON", label: "Ontario" },
    { value: "PE", label: "Prince Edward Island" },
    { value: "QC", label: "Quebec" },
    { value: "SK", label: "Saskatchewan" },
    { value: "YT", label: "Yukon Territory" },
  ];

  const countries = countriesList;

  const regions = regionsList;

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
    setLoading(true);
    try {
      if (activeTab === "primary") {
        const payload = formData?.data?.company;
        console.log("🚀 Submitting Company Primary Info:", payload);

        const result = await dispatch(
          updateCompanyPrimaryInfo({ token, data: payload, companyId })
        );

        console.log("result: ", result);

        if (result?.payload?.status) {
          toast.success(
            result?.payload?.message ||
              "✅ Company primary info updated successfully"
          );
          console.log("✅ Success Response:", result.payload);
        } else {
          toast.error(
            result?.payload?.message ||
              "❌ Failed to update company primary info"
          );
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
      if (activeTab === "logo") {
        if (selectedLogoFile instanceof File) {
          const result = await dispatch(
            submitCompanyLogo({ token, file: selectedLogoFile })
          );
          console.log("Image result", result);

          if (result?.payload?.status && result.payload.image) {
            toast.success("✅ Company logo uploaded successfully");

            // ✅ Instantly show the new image
            setLogoPreview(result.payload.image);
          } else {
            toast.error("❌ Failed to upload company logo");
          }
        } else {
          toast.info("ℹ️ Please select a logo file before submitting.");
        }
        //         setTimeout(() => {
        //  window.location.reload(5000)
        // })
      }
    } catch (error) {
      console.error("❌ Error during form submission:", error);
      toast.error("❌ Something went wrong during submission");
    } finally {
      setLoading(false);
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

  const company = formData.data?.company;
  console.log("Company: ", company);

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
        <div className={`${css.profileLayout}  `}>
          <form onSubmit={handleSubmit}>
            <div className={`${css.profileInfo} !min-w-[60vw]`}>
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
                      end
                      className={({ isActive }) => (isActive ? css.active : "")}
                    >
                      <span>Sales Info</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/mycompany/References"
                      end
                      className={({ isActive }) => (isActive ? css.active : "")}
                    >
                      <span>Ref</span>
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
                          ? "font-bold bg-white  !p-4 "
                          : "cursor-pointer "
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
                  <div className="flex justify-end ">
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
                              className="border-[1px] border-gray-300 p-2 w-[17.51rem] "
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
                    <div className="map  w-[35rem] ml-28">
                      <div className="">
                        <MapComponent company={company} />
                      </div>
                    </div>
                  </div>

                  {/* Hours of Operation */}
                  <div className="flex flex-col gap-4  text-left mt-6">
                    <h2 className="text-md font-semibold">
                      Hours of Operation
                    </h2>

                    {hoursOfOperationFields.map((field) => {
                      if (field.name === "open" || field.name === "close") {
                        return (
                          <div
                            key={field.name}
                            className="flex items-center justify-between gap-4  ml-[9rem]"
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
                        <div
                          key={field.name}
                          className="flex items-center ml-[9rem]  "
                        >
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
                              className="border border-gray-300 rounded px-2 py-1 w-96"
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
                  <CompanyBio bio={bio} setBio={setBio} />
                </div>
              )}

              {activeTab === "logo" && (
                <div className={`${css.profileInfo_form}`}>
                  <CompanyLogo
                    logoPreview={logoPreview}
                    setLogoPreview={setLogoPreview}
                    setSelectedLogoFile={setSelectedLogoFile}
                  />
                </div>
              )}

              {activeTab === "options" && (
                <div className={`${css.profileInfo_form}`}>
                  <CompanyInfoOptions
                    formData={formData}
                    setFormData={setFormData}
                  />
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
        </div>
      )}

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default CompanyPrimaryInfo;

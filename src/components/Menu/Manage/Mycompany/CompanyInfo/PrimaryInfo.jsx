import React, { useEffect, useState } from "react";
import css from "../../../../../styles/Menu/Manage/MyProfile.module.css";
// import personalPhoto from "../../../../imgs/logo/shadow.png";
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
import Footer from "../../../../Footer/Footer";
import axios from "axios";
import { brokerAPI } from "../../../../api/BrokerEndpoint";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const CompanyPrimaryInfo = () => {
    const token = Cookies.get("token");
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);

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

    const companyId = Cookies.get("companyId");
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
                    dispatch(setBlurWhileLoading(true));
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching data", error);
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [companyId, token]);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;

    //     // Update Local State for Nested Structure
    //     setFormData((prevData) => {
    //         const updatedData = { ...prevData };
    //         if (!updatedData.data) updatedData.data = {};
    //         if (!updatedData.data.company) updatedData.data.company = {};
    //         if (!updatedData.data.company.primaryContact)
    //             updatedData.data.company.primaryContact = {};

    //         updatedData.data.company.primaryContact[name] = value; // Update the nested local state
    //         return updatedData;
    //     });

    //     // Update Redux State for Flat Structure
    //     dispatch(
    //         updateFormData({
    //             [name]: value, // Match the flat structure for Redux state
    //         })
    //     );
    // };

    const handleChange = () => {
        console.log("Handle Change")
    }

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
        { value: "PST", label: "Pacific Standard Time" },
        { value: "EST", label: "Eastern Standard Time" },
        // add more
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
        { label: "Time Zone", name: "timeZone", type: "select", options: timeZones },
    ];

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
                    <form onSubmit={''}>
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

                            <div className={css.profileInfo_form}>

                                <div className="flex">
                                    <div className="flex flex-col gap-4 text-left">
                                        {generalFields.map((field) => (
                                            <span key={field.name}>
                                                <label htmlFor={field.name}>{field.label}</label>
                                                {field.type === "select" ? (
                                                    <select
                                                        id={field.name}
                                                        name={field.name}
                                                        onChange={handleChange}
                                                        value={formData?.data?.company?.[field.name] || ""}
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
                                                        value={formData?.data?.company?.[field.name] || ""}
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
                                <div className="pt-8">
                                    <h2 className="text-xl font-semibold">Hours of Operation</h2>
                                    <div className="flex flex-col gap-4 text-left pt-4">
                                        {hoursOfOperationFields.map((field) => (
                                            <span key={field.name}>
                                                <label htmlFor={field.name}>{field.label}</label>
                                                {field.type === "select" ? (
                                                    <select
                                                        id={field.name}
                                                        name={field.name}
                                                        onChange={handleChange}
                                                        value={formData?.data?.company?.[field.name] || ""}
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
                                                        value={formData?.data?.company?.[field.name] || ""}
                                                        placeholder={field.label}
                                                    />
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                            </div>
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
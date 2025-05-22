import React, { useEffect, useState } from "react";
import css from "../../../../styles/Menu/Manage/MyProfile.module.css";
import LoadingState from "../../../../LoadingState";
import { useDispatch, useSelector } from "react-redux";
import {
    setFormData as updateFormData,
    setBlurWhileLoading,
} from "../../../../ReduxStore/ProfleSlice";
import ErrorStatus from "../../../Error/ErrorStatus";
import Cookies from "js-cookie";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { brokerAPI } from "../../../api/BrokerEndpoint";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CompanyBio from "./CompanyInfo/CompanyBio";
import CompanyLogo from "./CompanyInfo/CompanyLogo";
import {
    updateCompanyPrimaryInfo,
    updateCompanyBio,
} from "@/ReduxStore/SearchProductSlice";
import { useRef } from "react";
import { statesList, countriesList, regionsList } from "@/data/services";
import { submitCompanyLogo } from "@/ReduxStore/ProfleSlice";
import CompanyInfoOptions from "./CompanyInfo/CompanyInfoOptions";
// import CompanyInfoOptions from "../CompanyInfo/CompanyInfoOptions"
import MapComponent from "@/components/MapComponent";


const CompanyPrimaryInfo = () => {
    const token = Cookies.get("token");
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    console.log("Form data: ", formData);

    const [loading, setLoading] = useState(true);
    const [logoPreview, setLogoPreview] = useState(""); // for preview
    const [selectedLogoFile, setSelectedLogoFile] = useState(null); // actual file for submission

    const {
        // formData,
        blurWhileLoading,
        error,
    } = useSelector((state) => state.profileStore);

    const companyId = Number(Cookies.get("companyId"));
    console.log("Company ID", companyId);
    console.log("TOKEN", token);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedLogoFile(file); // store file for backend
            setLogoPreview(URL.createObjectURL(file)); // live preview
        }
    };

    useEffect(() => {
        console.log("LOGO PREVIEW UPDATED:", logoPreview);
    }, [logoPreview]);

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
                    <form onSubmit={""}>
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
                                            className={({ isActive }) =>
                                                isActive ? css.active : ""
                                            }
                                        >
                                            <span>Ref</span>
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
                                </ul>
                            </div>

                            <div className={`${css.profileInfo_form}`}>
                                <div className="mb-20  min-w-[54vw]">
                                    <h2 className="text-md font-semibold mb-4">Upload Your Company Photos</h2>

                                    <div className="mb-3 flex items-center justify">
                                        <label htmlFor="image" className="block mb-1">
                                            Upload
                                        </label>
                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            className="border p-1"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </div>

                                    <div>
                                        <p className="text-[7.5pt]  mb-4 max-w-[500px] text-center">
                                            You can upload JPG, GIF or PNG files.
                                            <br />
                                            The file size limit is 2MB. If your upload does not work, try
                                            uploading a smaller picture.
                                            <br />
                                            <span className="text-red-600 text-sm font-semibold">
                                                *New upload will replace existing file.
                                            </span>
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-2 mb-4 mt-10 w-96  justify-center mx-auto my-auto">
                                        <input type="checkbox" id="terms" name="terms" onChange={""} />
                                        <label htmlFor="terms" className="!text-[8pt] text-gray-800">
                                            I certify that I have the right to distribute these photos and that
                                            they do not violate the{" "}
                                            <strong className="!text-[.7vw] !text-gray-800">
                                                Terms of Service
                                            </strong>
                                            .
                                        </label>
                                    </div>

                                    <div className="flex items-center gap-3 mb-6 justify-center mx-auto my-auto">
                                        <button type="button" className="bg-[#2c83ec] text-white rounded px-4 py-2 ">
                                            Upload Photos
                                        </button>
                                        <span className=" text-gray-500">or</span>
                                        <button type="button" className="bg-[#2c83ec] text-white rounded px-4 py-2 ">
                                            Cancel
                                        </button>
                                    </div>

                                    <div className="mt-10 flex items-center  justify-center mx-auto my-auto">
                                        {logoPreview && (
                                            <img
                                                src={logoPreview}
                                                alt="Company logo preview"
                                                className="max-w-[200px] h-auto"
                                                loading="lazy"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

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
                </div>
            )}

            <ToastContainer position="top-center" autoClose={2000} />
        </>
    );
};

export default CompanyPrimaryInfo;

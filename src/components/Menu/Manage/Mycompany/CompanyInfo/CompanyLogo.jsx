import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { brokerAPI } from "@/components/api/BrokerEndpoint";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const CompanyLogo = ({ setSelectedLogoFile }) => {


    return (
        <>
            <div className="mb-20  min-w-[52vw]">
                <h2 className="text-md font-semibold mb-4">Manage Your Company Logo</h2>

                <div className="mb-3 flex items-center">
                    <label htmlFor="image" className="block mb-1">Upload Logo</label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        className="border p-1"
                         onChange={(e) => setSelectedLogoFile(e.target.files[0])}
                    />
                </div>

                <p className="text-sm text-gray-700 mb-4 max-w-[500px]">
                    You can upload JPG, GIF or PNG files.<br />
                    The file size limit is 2MB. If your upload does not work, try uploading a smaller picture.<br />
                    <span className="text-red-600 text-sm font-semibold">*New upload will replace existing file.</span>
                </p>

                <div className="flex items-start gap-2 mb-4">
                    <input type="checkbox" id="terms" name="terms" onChange={''} />
                    <label htmlFor="terms" className="!text-[.7vw] text-gray-800">
                        I certify that I have the right to distribute these photos and that they do not violate the <strong className="!text-[.7vw] text-gray-800">Terms of Service</strong>.
                    </label>
                </div>

                <div className="flex items-center gap-3 mb-6">
                    <button className="bg-[#2c83ec] text-white rounded px-2 py-1 text-lg">Upload Photos</button>
                    <span className="text-sm text-gray-500">or</span>
                    <button className="bg-[#2c83ec] text-white rounded px-2 py-1 text-lg">Cancel</button>
                </div>

                <div className="mt-6">
                    <img
                        src={''}
                        alt="Company logo"
                        className=""
                        loading="lazy"
                    />
                </div>
            </div>

            <ToastContainer position="top-center" autoClose={2000} />
        </>
    );
};

export default CompanyLogo;
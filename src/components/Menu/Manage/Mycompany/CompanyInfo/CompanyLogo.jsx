import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { brokerAPI } from "@/components/api/BrokerEndpoint";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const CompanyLogo = ({ logoPreview, setLogoPreview, setSelectedLogoFile }) => {
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


  return (
    <>
      <div className="mb-20  min-w-[54vw]">
        <h2 className="text-md font-semibold mb-4">Manage Your Company Logo</h2>

        <div className="mb-3 flex items-center">
          <label htmlFor="image" className="block mb-1">
            Upload Logo
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

    </>
  );
};

export default CompanyLogo;

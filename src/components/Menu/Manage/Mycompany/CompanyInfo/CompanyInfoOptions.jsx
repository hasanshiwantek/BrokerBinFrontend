import React, { useState } from "react";
import css from "../../../../../styles/Menu/Manage/MyProfile.module.css";
import { countriesList, regionsList } from "@/data/services";
import { useForm } from "react-hook-form";

const companyInfoOptions = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  return (
    <div className="min-w-[54vw]">
      <div className={``}>
        <h1>Options</h1>
        {/* 1st section */}
        <div className="flex flex-col gap-4 text-left my-10 ml-28">
          <div className="flex flex-col">
            <div className="flex justify-start gap-5 items-center">
              <label htmlFor="listing" className=" mb-1 w-28">
                Listing
              </label>
              <input
                type="text"
                id="listing"
                name="listing"
                value={formData.listing || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 "
              />
            </div>
            <span className="text-base italic text-gray-500 mt-1">
              Estimated Number
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-start gap-5 items-center">
              <label htmlFor="locations" className="mb-1 w-28">
                Locations
              </label>
              <input
                type="text"
                id="locations"
                name="locations"
                value={formData.locations || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 "
              />
            </div>
            <span className="text-base italic text-gray-500 mt-1">
              Number of Locations
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-start gap-5 items-center">
              <label htmlFor="openInventory" className=" mb-1 w-28">
                Open Inventory
              </label>
              <input
                type="checkbox"
                id="openInventory"
                name="openInventory"
                checked={formData.openInventory || false}
                onChange={handleChange}
              />
            </div>
            <span className="text-base italic text-gray-500 mt-1">
              Allow others to view total Inventory
            </span>
          </div>
        </div>



        {/* 2nd Section */}
        <div className="flex flex-col gap-4 text-left ">
          <h2 className="text-md font-semibold">Inventory Alerts</h2>
          <div className=" flex flex-col gap-4 text-left my-10 ml-28">
          <div className="flex gap-5 items-center ">
            <label htmlFor="receiveAlerts" className="mb-1 w-28">
              Receive Alerts
            </label>
            <input
              type="checkbox"
              id="receiveAlerts"
              name="receiveAlerts"
              checked={formData.receiveAlerts || false}
              onChange={handleChange}
            />
          </div>

          {/* Days Input */}
          <div className="flex flex-col">
            <div className="flex justify-start gap-5 items-center">
              <label htmlFor="days" className=" mb-1 w-28">
                Days
              </label>
              <input
                type="text"
                id="days"
                name="days"
                value={formData.days || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 "
              />
            </div>
            <span className="text-base italic text-gray-500 mt-1">
              Send email if inventory has not been updated for this many days.
            </span>
          </div>
          </div>


        </div>




        {/* 3rd Section */}
        <div className="flex flex-col gap-4 text-left mt-6">
          <h2 className="text-md font-semibold">Receive invoice by...</h2>
          <div className=" flex flex-col gap-4 text-left my-10 ml-28">

          <div className="flex justify-start gap-5 items-center">
            <label htmlFor="mail" className="mb-1 w-28">
              Mail
            </label>
            <input
              type="checkbox"
              id="mail"
              name="mail"
              checked={formData.mail || false}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-start gap-5 items-center">
            <label htmlFor="email" className="mb-1 w-28">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1 "
            />
          </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default companyInfoOptions;

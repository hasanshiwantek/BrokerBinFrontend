import React from "react";
import { regionsList } from "@/data/services";
import css from "../../../../../styles/Menu/Manage/MyProfile.module.css";

const Terms = ({ formData, setFormData }) => {
  const regions = regionsList;

  const handleChange = () => {
    console.log("handleChange");
  };

  const options = [
    "Credit Card",
    "COD",
    "Wire Transfer",
    "Cash",
    "Call",
    "Net 5",
    "Net 10",
    "Net 30",
    "PayPal",
    "Other",
  ];

  return (
    <>
      <div className={``}>
        <h1>Legal</h1>
        <h1 className="ml-10">Warranty</h1>

        <div className="flex ml-52 ">
          <div className="flex flex-col justify-center   gap-4 flex-wrap ">
            <div className="flex justify-start gap-4 items-center">
              <label htmlFor="url" className="w-20">
                URL
              </label>
              <input type="text" />
            </div>
            <div className="flex justify-start gap-4 items-center">
              <label htmlFor="pdf/Doc" className="w-20">
                PDF/DOC
              </label>
              <input type="file" />
            </div>
            <div className="flex justify-start gap-4 items-center">
              <label htmlFor="warranty" className="w-20">
                Warranty
              </label>
              <input type="text" />
            </div>
          </div>
        </div>
      </div>

      <div className="my-10">
        <h1 className="ml-10">Banks and Trades</h1>

        <div className="flex ml-52 ">
          <div className="flex flex-col justify-center   gap-4 flex-wrap ">
            <div className="flex justify-start gap-4 items-center">
              <label htmlFor="url" className="w-20">
                URL
              </label>
              <input type="text" />
            </div>
            <div className="flex justify-start gap-4 items-center">
              <label htmlFor="pdf/Doc" className="w-20">
                PDF/DOC
              </label>
              <input type="file" />
            </div>
          </div>
        </div>
      </div>

      <div className="my-10">
        <h1 className="ml-10">Selling Terms</h1>

        <div className="flex ml-52 ">
          <div className="flex flex-col justify-center   gap-4 flex-wrap ">
            <div className="flex justify-start gap-4 items-center">
              <label htmlFor="minimumOrder" className="w-20">
                Minimum Order
              </label>
              <input type="text" />
            </div>
            <div className="flex justify-start gap-4 items-center">
              <label htmlFor="url" className="w-20">
                URL
              </label>
              <input type="text" />
            </div>
            <div className="flex justify-start gap-4 items-center">
              <label htmlFor="pdf/Doc" className="w-20">
                PDF/DOC
              </label>
              <input type="file" />
            </div>
          </div>
        </div>
      </div>

      <div className="my-10">
        <h1 className="ml-10">Buying Terms</h1>

        <div className="flex ml-52 ">
          <div className="flex flex-col justify-center   gap-4 flex-wrap ">
            <div className="flex justify-start gap-4 items-center">
              <label htmlFor="url" className="w-20">
                URL
              </label>
              <input type="text" />
            </div>
            <div className="flex justify-start gap-4 items-center">
              <label htmlFor="pdf/Doc" className="w-20">
                PDF/DOC
              </label>
              <input type="file" />
            </div>
          </div>
        </div>
      </div>

      <section>
        <h1>Options</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {options.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {/* Other Input */}
        <div className="mt-4">
          <label className="mr-2">Other</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-2 py-1 ml-2"
          />
        </div>
        <div className="text-sm text-blue-600 mt-2 underline cursor-pointer">
          <button
            type="button"
            onClick={() => console.log("Check all / Uncheck all logic")}
          >
            Check All / Uncheck All
          </button>
        </div>
      </section>
    </>
  );
};

export default Terms;

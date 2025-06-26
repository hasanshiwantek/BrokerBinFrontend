import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaUserPlus, FaEyeSlash, FaStar } from "react-icons/fa";

const EyeDropdown = ({ triggerElement, rowData }) => {
  const [show, setShow] = useState(false);


  const showFirstCount = rowData?.addedBy?.company?.show_first || 0;
  const neverShowCount = rowData?.addedBy?.company?.never_show || 0;
  const totalComments = 2;
  const newComments = 0;
  const rating = parseFloat(rowData?.addedBy?.company?.rating || 0);
  const ratingCount = rowData?.addedBy?.company?.ratingCount || 0;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {triggerElement}

      {show && (
        <div className="absolute left-0 top-full z-50 mt-2">
          {/* Dropdown Box */}
          <div className="-ml-[7rem] w-72 bg-white shadow-lg border rounded-md py-10 px-8 text-center ">
            {/* Show First */}
            <div className="flex flex-col items-center justify-center mb-2">
              <FaUserPlus className="mr-2 " size={25} />
              <span className="text-[8pt]">{showFirstCount} Show First</span>
            </div>

            {/* Never Show */}
            <div className="flex flex-col items-center justify-center mt-4 mb-2">
              <FaEyeSlash className="mr-2 " size={25} />
              <span className="text-[8pt]">{neverShowCount} Never Show</span>
            </div>
            {/* Star Rating */}
            <div className="flex items-center justify-center  my-2 mt-4">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  stroke="black"
                  strokeWidth={10}
                  key={i}
                  className={
                    i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
                  }
                  size={20}
                />
              ))}
              <span className="ml-2 mt-2 text-base">
                {Math.round((rating / 5) * 100)}%
              </span>
            </div>

            {/* Comments */}
            <div className="text-base mt-5">
              ({ratingCount}) Comments
              <span className="text-orange-600 text-base ml-2">
                ({newComments}) New
              </span>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default EyeDropdown;

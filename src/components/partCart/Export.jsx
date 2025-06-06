import { useState } from "react";
import { IoClose } from "react-icons/io5";

const ExportModal = ({ onClose, onSend }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user.user.email;
  console.log("User Email: ", userEmail);
  const [exportData, setExportData] = useState({
    fileType: "excel",
    sortBy: "cnt_DESC",
    sendCopyTo: userEmail,
    subject: "BrokerCell.com Part List – 2025",
  });

  const handleChange = (key, value) => {
    setExportData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-[400px] rounded-md shadow-lg flex flex-col gap-4 relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-3  font-bold   text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          <IoClose size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-[#2c83ec] mb-4">Export</h2>

        <div className="flex flex-col justify-center gap-10">
          <div>
            <h3 className=" font-semibold my-2">File Type</h3>
            <div className="flex flex-col gap-2">
              {["excel", "csv", "pdf"].map((type) => (
                <label key={type}>
                  <input
                    type="radio"
                    name="fileType"
                    value={type}
                    checked={exportData.fileType === type}
                    onChange={() => handleChange("fileType", type)}
                  />
                  <span className="ml-2 uppercase text-[8pt]">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort Settings */}
          <div>
            <h3 className="font-semibold my-2">Sort Settings</h3>
            <label className="text-sm">
              Sort By:
              <select
                className="ml-2 border px-2 py-1 text-[8pt]"
                value={exportData.sortBy}
                onChange={(e) => handleChange("sortBy", e.target.value)}
              >
                <option value="cnt_DESC">Max Parts</option>
                <option value="cnt_ASC">Min Parts</option>
                <option value="maxprice">Highest Price</option>
                <option value="lowestprice">Lowest Price</option>
              </select>
            </label>
          </div>

          {/* Email Info */}
          <div>
            <h3 className="font-semibold my-2">Email Information</h3>
            <div className="flex flex-col gap-8 text-[8pt]">
              <label>
                Send Copy To:
                <input
                  type="email"
                  value={exportData.sendCopyTo}
                  onChange={(e) => handleChange("sendCopyTo", e.target.value)}
                  className="w-full mt-1 border px-2 py-1"
                  placeholder="your@email.com"
                />
              </label>
              <label>
                Subject:
                <input
                  type="text"
                  value={exportData.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  className="w-full mt-1 border px-2 py-1"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            onClick={() => {
              onSend(exportData);
              onClose();
            }}
            className={`w-40  px-5 py-1.5 rounded text-white transition-all duration-150 bg-[#2c83ec] hover:bg-[#1c6dd0]`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
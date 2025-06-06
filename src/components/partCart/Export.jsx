import { useState } from "react";
import { IoClose } from "react-icons/io5";

const ExportModal = ({ onClose, onSend }) => {
  const [exportData, setExportData] = useState({
    fileType: "excel",
    sortBy: "cnt_DESC",
    sendCopyTo: "",
    subject: "Part List – 2025",
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
          className="absolute top-2 bg-red-500 right-2 text-xl"
          onClick={onClose}
        >
          <IoClose />
        </button>

        <h2 className="text-blue-600 text-sm font-medium">Export</h2>

        {/* File Type */}
        <div>
          <h3 className="font-semibold mb-1">File Type</h3>
          <div className="flex flex-col gap-2 text-sm">
            {["excel", "csv", "pdf"].map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  name="fileType"
                  value={type}
                  checked={exportData.fileType === type}
                  onChange={() => handleChange("fileType", type)}
                />
                <span className="ml-2 uppercase">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sort Settings */}
        <div>
          <h3 className="font-semibold mb-1">Sort Settings</h3>
          <label className="text-sm">
            Sort By:
            <select
              className="ml-2 border px-2 py-1 text-sm"
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
          <h3 className="font-semibold mb-1">Email Information</h3>
          <div className="flex flex-col gap-2 text-sm">
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

        {/* Submit Button */}
        <button
          onClick={() => {
            onSend(exportData);
            onClose();
          }}
          className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded text-sm self-end"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ExportModal;
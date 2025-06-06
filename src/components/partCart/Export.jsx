import { useState } from "react";
import { IoClose } from "react-icons/io5";

const ExportModal = ({ onClose, onSend }) => {
  const [fileType, setFileType] = useState("excel");
  const [sortBy, setSortBy] = useState("cnt_DESC");
  const [sendCopyTo, setSendCopyTo] = useState("");
  const [subject, setSubject] = useState("BrokerCell.com Part List – 2025");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-[400px] rounded-md shadow-lg flex flex-col gap-4 relative">
        <button
          className="absolute top-2 right-2 bg-red-500 text-xl"
          onClick={onClose}
        >
          <IoClose />
        </button>

        <h2 className="text-blue-600 text-sm font-medium">Export</h2>

        {/* File Type */}
        <div>
          <h3 className="font-semibold mb-1">File Type</h3>
          <div className="flex flex-col gap-2 text-sm">
            <label>
              <input
                type="radio"
                name="fileType"
                value="excel"
                checked={fileType === "excel"}
                onChange={() => setFileType("excel")}
              />
              <span className="ml-2">Excel</span>
            </label>
            <label>
              <input
                type="radio"
                name="fileType"
                value="csv"
                checked={fileType === "csv"}
                onChange={() => setFileType("csv")}
              />
              <span className="ml-2">CSV</span>
            </label>
            <label>
              <input
                type="radio"
                name="fileType"
                value="pdf"
                checked={fileType === "pdf"}
                onChange={() => setFileType("pdf")}
              />
              <span className="ml-2">PDF</span>
            </label>
          </div>
        </div>

        {/* Sort Settings */}
        <div>
          <h3 className="font-semibold mb-1">Sort Settings</h3>
          <label className="text-sm">
            Sort By:
            <select
              className="ml-2 border px-2 py-1 text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
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
                value={sendCopyTo}
                onChange={(e) => setSendCopyTo(e.target.value)}
                className="w-full mt-1 border px-2 py-1"
                placeholder="your@email.com"
              />
            </label>
            <label>
              Subject:
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full mt-1 border px-2 py-1"
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={() =>
            onSend({ fileType, sortBy, sendCopyTo, subject })
          }
          className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded text-sm self-end"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ExportModal;

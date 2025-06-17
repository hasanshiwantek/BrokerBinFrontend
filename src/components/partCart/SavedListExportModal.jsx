import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { exportPartcart } from "@/ReduxStore/SearchProductSlice";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { brokerAPI } from "../api/BrokerEndpoint";

const SavedListExport = ({ onClose, selectedRowId, savedLists }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user.user.email;
    const token = Cookies.get("token");
    console.log("User Email: ", userEmail);
    const [loading, setLoading] = useState(false);

    const [exportData, setExportData] = useState({
        format: "excel",
        sendCopyTo: userEmail,
        subject: "Brokercell.com Part List – 2025",
    });

    const handleChange = (key, value) => {
        setExportData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const payload = selectedRowId !== null
                ? { list_id: selectedRowId }
                : { data: savedLists };

            const response = await axios.post(`${brokerAPI}part-cart/export-saved-partlist`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log("Export response:", response.data);
            toast.success("Export request sent successfully!");
            setTimeout(() => onClose(), 2000);
        } catch (error) {
            console.error("Export error:", error);
            toast.error("Failed to export.");
        } finally {
            setLoading(false);
        }
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
                                        name="format"
                                        value={type}
                                        checked={exportData.format === type}
                                        onChange={() => handleChange("format", type)}
                                    />
                                    <span className="ml-2 uppercase text-[8pt]">{type}</span>
                                </label>
                            ))}
                        </div>
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
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-40 px-5 py-1.5 rounded text-white transition-all duration-150 bg-[#2c83ec] hover:bg-[#1c6dd0] disabled:opacity-60"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                Sending...
                            </span>
                        ) : (
                            "Send"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SavedListExport;
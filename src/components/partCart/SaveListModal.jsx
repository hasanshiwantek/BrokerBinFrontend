import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { brokerAPI } from "../api/BrokerEndpoint";

const SaveListModal = ({ onClose, selectedParts }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = Cookies.get("token")
    console.log("token frommodal", token)

    const [formData, setFormData] = useState({
        name: "",
        poInHand: false,
        oemQuote: false,
        dueDate: new Date().toISOString().slice(0, 10),
    });

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        const payload = {
            name: formData.name,
            poInHand: formData.poInHand,
            oemQuote: formData.oemQuote,
            dueDate: formData.dueDate,
            parts: selectedParts,
        };
        try {
            const response = await axios.post(`${brokerAPI}part-cart/saveList`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Mock response:", response.data);
            navigate("/bomarchive/list");
        } catch (error) {
            console.error("Mock submit failed:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded p-6 w-[400px] shadow-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-1 right-2 text-xl font-bold text-red-500"
                >
                    ×
                </button>

                <h2 className="text-lg font-semibold mb-4">Save List</h2>

                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm mb-1">Name for this list</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className="border w-full p-2 text-sm"
                        />
                    </div>

                    <div className="flex gap-6">
                        <label className="inline-flex items-center text-sm">
                            <input
                                type="checkbox"
                                checked={formData.poInHand}
                                onChange={(e) => handleChange("poInHand", e.target.checked)}
                                className="mr-2"
                            />
                            PO in Hand
                        </label>
                        <label className="inline-flex items-center text-sm">
                            <input
                                type="checkbox"
                                checked={formData.oemQuote}
                                onChange={(e) => handleChange("oemQuote", e.target.checked)}
                                className="mr-2"
                            />
                            OEM Quote
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Due Date</label>
                        <input
                            type="date"
                            value={formData.dueDate}
                            onChange={(e) => handleChange("dueDate", e.target.value)}
                            className="border w-full p-2 text-sm"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="bg-orange-500 text-white px-4 py-2 rounded self-start"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SaveListModal;
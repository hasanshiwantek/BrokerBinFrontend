import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { brokerAPI } from "../api/BrokerEndpoint";
import { toast } from "react-toastify";

const SaveListModal = ({ onClose, selectedParts }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  console.log("token frommodal", token);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    poInHand: false,
    oemQuote: false,
    dueDate: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  console.log("SelectedPARTs", selectedParts)
  const trimmedParts = selectedParts.map((p) => ({
    // id: p.id,
    partModel: p.inventory?.partModel,
    mfg: p.inventory?.mfg,
    cond: p.inventory?.cond,
    quantity: p.inventory?.quantity,
    price: p.inventory?.price,
    note: p.notes,
  }));

  const handleSubmit = async () => {
    const partCartId = selectedParts[0]?.id;
    const payload = {
      name: formData.name,
      poInHand: formData.poInHand,
      oemQuote: formData.oemQuote,
      dueDate: formData.dueDate,
      part_cart_id: partCartId,
      //   parts: selectedParts,
      parts: trimmedParts,
    };
    try {
      setLoading(true);
      const response = await axios.post(
        `${brokerAPI}part-cart/saveList`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.status) {
        navigate("/bomarchive/list");
        console.log("Mock response:", response?.data);
      } else {
        toast.info(
          response?.data?.message || "Failed Saving Parts.Please Try Again!",
          {
            style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" },
          }
        );
      }
    } catch (error) {
      console.error("Mock submit failed:", error);
      toast.error(error || "Failed Saving Parts.Please Try Again!", {
        style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-[30%]  relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-2 right-3 text-4xl font-bold   text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-[#2c83ec] mb-4">
          Save List
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex justify-start items-center gap-5">
            <label className="block w-44 text-sm mb-1">
              Name for this list
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="border w-72 p-2 text-[8pt]"
            />
          </div>

          <div className="flex flex-col gap-6 ml-[4.5rem] my-10">
            <div className="flex  items-center gap-4  ">
              <label className="flex items-center " htmlFor="poInHand">
                PO in Hand
              </label>
              <input
                id="poInHand"
                type="checkbox"
                checked={formData.poInHand}
                onChange={(e) => handleChange("poInHand", e.target.checked)}
                className="mr-2"
              />
            </div>

            <div className="flex  items-center gap-4 ">
              <label className="flex items-center" htmlFor="oemQuote">
                OEM Quote
              </label>
              <input
                id="oemQuote"
                type="checkbox"
                checked={formData.oemQuote}
                onChange={(e) => handleChange("oemQuote", e.target.checked)}
                className="mr-2"
              />
            </div>
          </div>

          <div className="flex justify-start items-center gap-5">
            <label className="text-sm w-44 mb-1">Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              className="border w-72 p-2 text-[8pt]"
            />
          </div>

          <div className="text-right">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`px-5 py-1.5 rounded text-white transition-all duration-150 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#2c83ec] hover:bg-[#1c6dd0]"
              }`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveListModal;
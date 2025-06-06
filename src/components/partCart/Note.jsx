import React, { useState, useMemo } from "react";
import { partCartNotes } from "@/ReduxStore/SearchProductSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Note = ({ selectedParts, onClose }) => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  console.log(token);
  const [loading, setLoading] = useState(false);
  console.log("Selected parts from Notes page: ", selectedParts);

  // Group by company name
  const grouped = useMemo(() => {
    const map = {};
    selectedParts.forEach((part) => {
      const companyName = part.inventory?.addedBy?.company?.name || "Unknown";
      if (!map[companyName]) map[companyName] = [];
      map[companyName].push(part);
    });
    return map;
  }, [selectedParts]);

  console.log(grouped);

  // State to track notes/qty by part id
  const [noteData, setNoteData] = useState(() => {
    const initial = {};
    selectedParts.forEach((part) => {
      const partId = part.id; // correct ID
      initial[partId] = {
        id: partId,
        quantity: 0,
        note:"",
      };
    });
    return initial;
  });

  const handleChange = (id, field, value) => {
    setNoteData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };
  const handleSave = async () => {
    const finalNotes = Object.values(noteData);
    

    if (finalNotes.length === 0) {
      toast.warning("No parts selected to save notes.", {
        style: { fontSize: "16px" },
      });
      return;
    }

    try {
      const payload = {
        token,
        notes: finalNotes, // Make sure backend expects an array
      };
      console.log("Payload: ",payload);
      
      setLoading(true);
      const result = await dispatch(partCartNotes(payload)).unwrap();
      console.log("Saved Notes to Backend:", result);

      toast.info(result?.message || "Notes saved successfully!", {
         style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" }, 
      });
      onClose();
      window.location.reload(500)
    } catch (error) {
      console.error("Note save error:", error);
      toast.error(error?.message || "Failed to save notes.", {
        style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-[90%] max-w-3xl relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          className="absolute top-2 right-3 text-4xl font-bold   text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-[#2c83ec] mb-4">Notes</h2>

        {/* Loop company-wise */}
        {Object.entries(grouped).map(([companyName, parts]) => {
          const company = parts[0]?.inventory?.addedBy || {};

          return (
            <div key={companyName} className="mb-6 border rounded">
              <div className="bg-gray-100 px-4 py-2">
                <h3 className="text-[10pt]  text-blue-700">{companyName}</h3>
                <p className="text-xs text-gray-600 mt-1">
                  <span className="font-medium">Ph:</span> {company.phoneNumber}{" "}
                  &nbsp;&nbsp;
                  <span className="font-medium">Fx:</span> {company.phoneNumber}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-[8pt] text-center">
                  <thead className="text-gray-200 bg-gray-600">
                    <tr>
                      <th className="border px-2 py-1">Parts</th>
                      <th className="border px-2 py-1">Req Qty</th>
                      <th className="border px-2 py-1">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parts.map((item) => (
                      <tr key={item.id}>
                        <td className="border px-2 py-1">
                          {item.inventory?.partModel}
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            type="number"
                            className="border px-2 py-1 w-16 text-[8pt] rounded"
                            value={noteData[item.id]?.quantity || 0}
                            onChange={(e) =>
                              handleChange(
                                item.id,
                                "quantity",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            type="text"
                            className="border px-2 py-3 w-full rounded text-[8pt]"
                            value={noteData[item.id]?.note}
                            onChange={(e) =>
                              handleChange(
                                item.id,
                                "note",
                                e.target.value
                              )
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {/* Save Button */}
        <div className="text-right">
          <button
            onClick={handleSave}
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
  );
};

export default Note;

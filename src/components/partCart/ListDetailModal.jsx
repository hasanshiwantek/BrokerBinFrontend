import React from "react";

const ListDetailModal = ({ list, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-[52vw] h-[70vh] rounded shadow-lg p-10 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-3 -right-0 text-[1.8vw] font-bold text-blue-500"
                >
                    ×
                </button>

                {/* Parts Table */}
                <div className="space-y-6">
                    {list.parts.map((part, index) => (
                        <div key={index} className="border-t pt-2">
                            <div className="grid grid-cols-6 gap-4 text-sm items-start">
                                <div>{part.part_model}</div>
                                <div>
                                    Mfg: {part.mfg}
                                    <div className="text-green-600 text-xs mt-1">
                                        {part.rfq_sent || ""}
                                    </div>
                                </div>
                                <div>Cond: {part.cond}</div>
                                <div>Req Qty: {part.req_quantity || 0}</div>
                                <div>Tot Qty: {part.quantity || 0}</div>
                                <div>Filtered Qty: {part.filtered_quantity || 0}</div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
};

export default ListDetailModal;
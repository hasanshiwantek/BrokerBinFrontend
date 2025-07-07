import React from "react";
import {
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
} from "lucide-react";
const PopupAlert = ({ show, type = "success", message, onClose }) => {
  if (!show) return null;

  const variants = {
    success: {
      styles: "bg-green-100 border-green-500 text-green-800",
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
    },
    error: {
      styles: "bg-red-100 border-red-500 text-red-800",
      icon: <AlertCircle className="w-6 h-6 text-red-600" />,
    },
    info: {
      styles: "bg-blue-100 border-blue-500 text-blue-800",
      icon: <Info className="w-6 h-6 text-blue-600" />,
    },
    warning: {
      styles: "bg-yellow-100 border-yellow-500 text-yellow-800",
      icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
    },
  };

  const variant = variants[type] || variants.success;

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={` whitespace-nowrap  w-fit border ${variant.styles} px-6 py-5 rounded-lg shadow-xl flex items-start gap-4 animate-fade-in`}
      >
        <div className="pt-1">{variant.icon}</div>

        <div className="flex-1 text-xl font-medium">{message}</div>

        <div
          onClick={onClose}
          className="text-2xl cursor-pointer font-bold text-gray-500 hover:text-gray-800 "
        >
          &times;
        </div>
      </div>
    </div>
  );
};

export default PopupAlert;

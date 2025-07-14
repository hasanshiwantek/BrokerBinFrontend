import React, { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

const PopupAlert = ({ show, type = "success", message, onClose }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 300); // match animation duration
    }
  }, [show]);

  const variants = {
    success: {
      styles: "bg-green-100 border-green-500 text-green-800 backdrop-blur-sm",
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
    },
    error: {
      styles: "bg-red-100 border-red-500 text-red-800 backdrop-blur-sm",
      icon: <AlertCircle className="w-6 h-6 text-red-600" />,
    },
    info: {
      styles: "bg-blue-100 border-blue-500 text-blue-800 backdrop-blur-sm",
      icon: <Info className="w-6 h-6 text-blue-600" />,
    },
    warning: {
      styles: "bg-yellow-100 border-yellow-500 text-yellow-800 backdrop-blur-sm",
      icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
    },
  };

  const variant = variants[type] || variants.success;

  if (!visible) return null;

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[2000] w-full px-4 flex justify-center">
      <div
        className={`w-fit sm:w-fit border ${variant.styles}
          px-6 py-5 rounded-xl shadow-2xl flex items-center gap-4
          animate-in fade-in slide-in-from-top-4 duration-300 ease-out
        `}
      >
        <div className="pt-1">{variant.icon}</div>

        <div className="flex-1 text-xl font-medium leading-tight">
          {message}
        </div>

        <div
          onClick={() => {
            setVisible(false);
            if (onClose) onClose();
          }}
          className="cursor-pointer text-xl ml-4 mt-0.5 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default PopupAlert;

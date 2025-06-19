import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { addMyVendors, showFirstVendor, neverShowVendor } from "./ReduxStore/ToolsSlice";
import { replace, useNavigate } from "react-router-dom";
import { getSupplyAndDemand } from "./ReduxStore/Reports";

const HoverDropdown = ({ type, id, triggerElement, partModel, company }) => {
  const [show, setShow] = useState(false);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  console.log();

  const dispatch = useDispatch();
  const token = Cookies.get("token")

  useEffect(() => {
    if (!type || !id) return;
    if (type === "company") {
      setOptions([
        { label: "Add My Vendors", key: "addToMyVendors" },
        { label: "Show First", key: "showFirst" },
        { label: "Show Never", key: "neverShow" },
      ]);
    } else if (type === "part") {
      setOptions([
        { label: "Part Number", key: "partModel" },
        { label: "Supply & demand", key: "supplyDemand" },
        { label: "Add to Hotlist", key: "addToHotlist" },
        { label: "Broadcast", key: "broadcast" },
      ]);
    }
  }, [type, id]);

  const handleAction = (actionKey) => {
    if (type === "company") {
      const payload = { company_id: id, token };

      if (actionKey === "addToMyVendors") {
        dispatch(addMyVendors({ companyId: { company_id: id }, token }));
        navigate("/myprofile/MyVendors", {replace: true})
      }
      if (actionKey === "showFirst") {
        dispatch(showFirstVendor({ ...payload, show_first: 1 }));
        navigate("/myprofile/MyVendors", {replace: true})
      }

      if (actionKey === "neverShow") {
        dispatch(neverShowVendor({ ...payload, never_show: 1 }));
        navigate("/myprofile/MyVendors", {replace: true})
      }
    }
    if (type === "part") {
      if (actionKey === "partModel") {
        navigate(`/inventory/search?partModel=${partModel}`, { replace: true });
      }
      if (actionKey === "supplyDemand") {
        navigate(`/reports/supplyanddemand?query=${partModel}`, { replace: true });
      }
      if (actionKey === "addToHotlist") dispatch();
      if (actionKey === "broadcast") dispatch();
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {triggerElement}

      {show && options.length > 0 && (
        <div className="absolute left-0 py-3 top-full w-44 bg-white shadow-lg border rounded-md z-50">
          {options.map((opt, i) => (
            <div
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                handleAction(opt.key);
                setShow(false);
              }}
              className="px-4 py-1 text-[10px] text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default HoverDropdown;

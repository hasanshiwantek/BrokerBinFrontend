import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  addMyVendors,
  showFirstVendor,
  neverShowVendor,
  addHotListItem,
} from "./ReduxStore/ToolsSlice";
import { replace, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const HoverDropdown = ({ type, id, triggerElement, company, rowData }) => {
  console.log("Rendered: hoverdropdown")
  const [show, setShow] = useState(false);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  console.log("Row Data: ",rowData);
  

  const dispatch = useDispatch();
  const token = Cookies.get("token");
  // console.log("Selected Row Data: ", rowData);

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
        const confirm = window.confirm("Update Vendor Status? ");
        if (!confirm) {
          return;
        } else {
          dispatch(addMyVendors({ companyId: { company_id: id }, token }));
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
      if (actionKey === "showFirst") {
        const confirm = window.confirm("Update Vendor Status? ");
        if (!confirm) {
          return;
        } else {
          dispatch(showFirstVendor({ ...payload, show_first: 1 }));
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
      if (actionKey === "neverShow") {
        const confirm = window.confirm("Update Vendor Status? ");
        if (!confirm) {
          return;
        } else {
          dispatch(neverShowVendor({ ...payload, never_show: 1 }));
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
    }

    if (type === "part") {
      if (actionKey === "partModel") {
        navigate(`/inventory/search?partModel=${rowData?.partModel}`, {
          replace: true,
        });
      }
      if (actionKey === "supplyDemand") {
        navigate(`/reports/supplyanddemand?query=${rowData?.partModel}`, {
          replace: true,
        });
      }
      if (actionKey === "addToHotlist") {
        const hotlistPayload = [
          {
            partModel: rowData?.partModel,
            cond: rowData?.cond,
            heciClei: rowData?.heciClei,
            productDescription: rowData?.productDescription,
            mfg: rowData?.mfg,
          },
        ];
        dispatch(addHotListItem({ hotlists: hotlistPayload, token }));
        setTimeout(() => navigate("/hotlist/view"), 1000);
      }
      if (actionKey === "broadcast") {
        const { partModel, mfg, cond, heciClei, price, quantity,description,productDescription } = rowData || {};
        const query = new URLSearchParams({
          type: "wtb",
          category: "single part / items",
          partModel,
          mfg,
          cond: cond?.toLowerCase(),
          heciClei,
          price: price?.toString().replace("$", ""),
          quantity,
          description: description || productDescription ,
        }).toString();
        navigate(`/sendbroad?${query}`);
      }
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
        <div className="absolute left-0 top-full z-50">
          {/* Arrow */}
          <div className="ml-6 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>

          {/* Dropdown Box */}
          <div className="w-48 bg-white shadow-lg border border-t-0 rounded-md py-3">
            {options.map((opt, i) => (
              <div
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction(opt.key);
                  setShow(false);
                }}
                className="px-2 py-2 text-[8pt] text-gray-700 italic hover:bg-gray-100 cursor-pointer"
              >
                {opt.label}
              </div>
            ))}
          </div>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};
export default HoverDropdown;
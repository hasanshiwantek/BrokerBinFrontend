import React, { useEffect, useState } from "react";

const HoverDropdown = ({ type, id, triggerElement }) => {
  const [show, setShow] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!type || !id) return;

    if (type === "company") {
      setOptions([
        { label: "Add My Vendors", action: () => openCompanyProfile(id) },
        { label: "Show First", action: () => openCompanyProfile(id) },
        { label: "Show Never", action: () => apiWatchCompany(id) },
      ]);
    } else if (type === "part") {
      setOptions([
        { label: "Part Number", action: () => apiAddVendors(id) },
        { label: "Supply & demand", action: () => apiShowFirst(id) },
        { label: "Add to Hotlist", action: () => apiWatchPart(id) },
        { label: "Broadcast", action: () => apiShowNever(id) },
      ]);
    }
  }, [type, id]);

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
                opt.action();
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

// Dummy API actions
const openCompanyProfile = (id) => alert(`Open profile of company ${id}`);
const apiWatchCompany = (id) => alert(`Watch company ${id}`);
const apiBlockCompany = (id) => alert(`Block company ${id}`);
const apiAddVendors = (id) => alert(`Add vendors for part ${id}`);
const apiShowFirst = (id) => alert(`Show part ${id} first`);
const apiWatchPart = (id) => alert(`Watch part ${id}`);
const apiShowNever = (id) => alert(`Show part ${id} never`);

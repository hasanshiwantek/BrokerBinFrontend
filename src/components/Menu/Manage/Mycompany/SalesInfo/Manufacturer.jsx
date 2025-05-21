import React, { useState, useEffect } from "react";
import { useFormContext, useController } from "react-hook-form";
import { initialMFGs } from "@/data/services";
import css from "@/styles/Menu/Manage/BroadcastFilters/BroadcastFilters.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getCompanyContact } from "@/ReduxStore/SearchProductSlice";
import Cookies from "js-cookie";

const MFGFilter = () => {
  const { control, setValue } = useFormContext();

  const {
    field: { value: selectedMFGs = [], onChange },
  } = useController({ name: "manufacturers", control });

  const [availableMFGs, setAvailableMFGs] = useState([]);
  const [selectedAvailable, setSelectedAvailable] = useState([]);
  const [selectedIncluded, setSelectedIncluded] = useState([]);

  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const companyId = Number(Cookies.get("companyId"));

  const { companyContactData } = useSelector(
    (state) => state.searchProductStore
  );
  const companyData = companyContactData?.data?.company;

  const sortMFGs = (list) =>
    list.sort((a, b) =>
      a === "-ALL MFG's-" ? -1 : b === "-ALL MFG's-" ? 1 : 0
    );

  const handlesSelectChange = (setSelected, e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelected(selectedOptions);
  };

  const moveToLeft = () => {
    const updatedIncluded = selectedMFGs.filter(
      (mfg) => !selectedIncluded.includes(mfg)
    );
    const updatedAvailable = [...availableMFGs, ...selectedIncluded];
    onChange(sortMFGs(updatedIncluded));
    setAvailableMFGs(sortMFGs(updatedAvailable));
    setSelectedIncluded([]);
  };

  const moveToRight = () => {
    const updatedAvailable = availableMFGs.filter(
      (mfg) => !selectedAvailable.includes(mfg)
    );
    const updatedIncluded = [...selectedMFGs, ...selectedAvailable];
    onChange(sortMFGs(updatedIncluded));
    setAvailableMFGs(sortMFGs(updatedAvailable));
    setSelectedAvailable([]);
  };

  const reset = () => {
    const resetMFGs = ["-ALL MFG's-"];
    onChange(resetMFGs);
    setAvailableMFGs(
      sortMFGs(initialMFGs.filter((mfg) => !resetMFGs.includes(mfg)))
    );
    setSelectedAvailable([]);
    setSelectedIncluded([]);
  };

  useEffect(() => {
    dispatch(getCompanyContact({ token, id: companyId }));
  }, []);

useEffect(() => {
  if (!companyData) return;

  try {
    const serverMFGs = JSON.parse(companyData.mfg || "null");
    const included =
      Array.isArray(serverMFGs) && serverMFGs.length > 0
        ? serverMFGs
        : ["-ALL MFG's-"];

    onChange(included); // updates the RHF field
    setAvailableMFGs(
      sortMFGs(initialMFGs.filter((mfg) => !included.includes(mfg)))
    );
  } catch (e) {
    console.warn("Invalid manufacturers format:", e);

    // 🛠️ Fix: explicitly show -ALL MFG's- when null or error
    onChange(["-ALL MFG's-"]);
    setAvailableMFGs(
      sortMFGs(initialMFGs.filter((mfg) => mfg !== "-ALL MFG's-"))
    );
  }
}, [companyData]);


  return (
    <div>
      <h1>Include These MFG's</h1>
      <div className={css.mfgcontainer}>
        {/* Included */}
        <div>
          <select
            multiple
            className={css.listBox}
            value={selectedIncluded}
            onChange={(e) => handlesSelectChange(setSelectedIncluded, e)}
          >
            {selectedMFGs.map((mfg, idx) => (
              <option key={idx}>{mfg}</option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className={css.mfgbuttons}>
          <p onClick={moveToLeft}>&gt;&gt;</p>
          <p onClick={moveToRight}>&lt;&lt;</p>
          <p onClick={reset}>Reset</p>
        </div>

        {/* Available */}
        <div>
          <select
            multiple
            className={css.listBox}
            value={selectedAvailable}
            onChange={(e) => handlesSelectChange(setSelectedAvailable, e)}
          >
            {availableMFGs.map((mfg, idx) => (
              <option key={idx}>{mfg}</option>
            ))}
          </select>
        </div>
      </div>
       <p className="italic mt-10 text-[8pt] text-center">Move MFGs to the left box to add them to your company mfg list.</p>
    </div>
  );
};

export default MFGFilter;

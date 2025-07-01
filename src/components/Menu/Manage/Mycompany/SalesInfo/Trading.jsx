import React, { useEffect, useState } from "react";
import { regionsList } from "@/data/services";
import css from "../../../../../styles/Menu/Manage/MyProfile.module.css";
import { useFormContext, Controller } from "react-hook-form";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { getCompanyContact } from "@/ReduxStore/SearchProductSlice";

const Trading = () => {
  const { register, setValue, getValues, reset, control } = useFormContext();

  const [selected, setSelected] = useState({
    regions: [],
    shipping: [],
  });

  const regions = [
    { label: "North America", value: "North America", id: "NorthAmerica" },
    { label: "Middle East", value: "Middle East", id: "MiddleEast" },
    { label: "South America", value: "South America", id: "SouthAmerica" },
    { label: "Europe", value: "Europe", id: "Europe" },
    { label: "Africa", value: "Africa", id: "Africa" },
    { label: "Oceania", value: "Oceania", id: "Oceania" },
    { label: "Asia", value: "Asia", id: "Asia" },
  ];

  const programOptions = [
    { name: "lease_program", label: "Lease Program" },
    { name: "rental_program", label: "Rental Program" },
    { name: "trade_program", label: "Trade-In Program" },
  ];

  const shippingOptions = [
    { name: "fedex", label: "FedEx" },
    { name: "dhl", label: "DHL" },
    { name: "ups", label: "UPS" },
    { name: "willShipOnOtherAcct", label: "Will Ship on Other Acct#s" },
    { name: "other", label: "Other" },
  ];

  const handleCheckAll = (type, check = true) => {
    if (type === "regions") {
      setSelected((prev) => ({
        ...prev,
        regions: check ? regions.map((r) => r.value) : [],
      }));
    } else if (type === "shipping") {
      setSelected((prev) => ({
        ...prev,
        shipping: check ? shippingOptions.map((s) => s.name) : [],
      }));
    } else if (type === "programs") {
      programOptions.forEach((item) => {
        setValue(item.name, check);
      });
    }
  };

  const companyId = Number(Cookies.get("companyId"));
  console.log("Company id: ", companyId);

  const token = Cookies.get("token");
  const { companyContactData } = useSelector(
    (state) => state.searchProductStore
  );
  const companyData = companyContactData?.data?.company;
  console.log("Company Data: ", companyData);

  const dispatch = useDispatch();

  useEffect(() => {
    // const fetchTradingData = async () => {
    //   const res = await axios.get("/your-trading-api-endpoint");
    //   reset(res.data); // populate form fields
    // };
    // fetchTradingData();
    // reset with existing data if needed
    // reset(res.data); ← skip if no GET

    // cleanup old fields
    reset(getValues());
  }, []);

  useEffect(() => {
    dispatch(getCompanyContact({ token, id: companyId }));
  }, [dispatch, token, companyId]);

  useEffect(() => {
    setValue("trading_region", selected.regions);
    setValue("shipping_options", selected.shipping); // <-- new array field
  }, [selected, setValue]);

  const handleRegionChange = (value) => {
    setSelected((prev) => ({
      ...prev,
      regions: prev.regions.includes(value)
        ? prev.regions.filter((v) => v !== value)
        : [...prev.regions, value],
    }));
  };

  // For shipping changes
  const handleShippingChange = (value) => {
    setSelected((prev) => ({
      ...prev,
      shipping: prev.shipping.includes(value)
        ? prev.shipping.filter((v) => v !== value)
        : [...prev.shipping, value],
    }));
  };

  useEffect(() => {
    if (!companyData) return;

    // 1. Simple fields
    const basicMap = {
      blind_shipping: companyData.blind_shipping === 1 ? "yes" : "no",
      lease_program: !!companyData.lease_program,
      rental_program: !!companyData.rental_program,
      trade_program: !!companyData.trade_program,
      shippingOther: companyData.shipping_other || "",
    };

    Object.entries(basicMap).forEach(([key, val]) => setValue(key, val));

    // 2. Trading Region
    const regions = companyData.trading_region || "[]";
    // setSelected(regions);
    setSelected((prev) => ({
      ...prev,
      regions: companyData.trading_region || "[]",
      shipping: companyData.shipping_options || "[]",
    }));
    setValue("trading_region", regions);

    // 3. Deadline (hour + AM/PM)
    if (companyData.shipping_deadline) {
      const [hour, ampm] = companyData.shipping_deadline.split(" ");
      setValue("shipping_hour", hour);
      setValue("shipping_ampm", ampm);
    }

    // 4. Shipping Options (FedEx, DHL, etc.)
    try {
      const opts = companyData.shipping_options || "[]";
      opts.forEach((label) => {
        const normalized = label
          .toLowerCase()
          .replace(/\s+/g, "")
          .replace(/[^a-z]/gi, "");
        setValue(normalized, true);
      });
    } catch (e) {
      console.warn("⚠️ Invalid shipping_options format:", e);
    }
  }, [companyData, setValue]);

  return (
    <>
      {/*Regions*/}
      <div className={css.profileInfo_form}>
        <h1>Trading Regions</h1>
        <Controller
          control={control}
          name="trading_region"
          defaultValue={[]}
          render={() => (
            <div className="grid grid-cols-5 gap-4 text-left">
              {regions.map((region) => (
                <label key={region.value} className="flex items-center gap-2">
                  <span>{region.label}</span>
                  <input
                    type="checkbox"
                    checked={selected.regions.includes(region.value)}
                    onChange={() => handleRegionChange(region.value)}
                  />
                </label>
              ))}
            </div>
          )}
        />
        <div className="flex justify-end gap-4 mt-6 font-bold cursor-pointer">
          <span onClick={() => handleCheckAll("regions", true)}>Check All</span>
          <span onClick={() => handleCheckAll("regions", false)}>
            Uncheck All
          </span>
        </div>
      </div>

      {/*Programs*/}
      <div className={css.profileInfo_form}>
        <h1>Programs</h1>
        <div className="flex flex-wrap gap-10 text-left">
          {programOptions.map((prog) => (
            <label
              key={prog.name}
              className="flex justify-between gap-2 items-center "
            >
              <span>{prog.label}</span>
              <input
                type="checkbox"
                {...register(prog.name)}
                className="w-4 h-4"
              />
            </label>
          ))}
        </div>
        <div className="flex justify-end gap-4 mt-6 font-bold cursor-pointer">
          <span onClick={() => handleCheckAll("programs", true)}>
            Check All
          </span>
          <span onClick={() => handleCheckAll("programs", false)}>
            Uncheck All
          </span>
        </div>
      </div>

      {/* Blind Shipping */}
      <div className={`${css.profileInfo_form}`}>
        <h1 className="text-md font-semibold">Blind Shipping</h1>

        {/* Radio Buttons */}
        <div className="flex gap-10 items-center">
          <label className="flex items-center gap-1">
            <input type="radio" value="yes" {...register("blind_shipping")} />
            Yes
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" value="no" {...register("blind_shipping")} />
            No
          </label>
        </div>

        {/* Time Select (Hour + AM/PM) */}
        <div className="flex gap-2 items-center">
          <span>Shipping Deadline</span>
          <select
            {...register("shipping_hour")}
            className="border border-gray-300 rounded px-2 py-1"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <select
            {...register("shipping_ampm")}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>

      {/*Shipping Options*/}
      <div className={css.profileInfo_form}>
        <h1>Shipping Options</h1>
        <Controller
          control={control}
          name="shipping_options"
          defaultValue={[]}
          render={() => (
            <div className="flex flex-wrap gap-10 text-left">
              {shippingOptions.map((opt) => (
                <label key={opt.name} className="flex items-center gap-2">
                  <span>{opt.label}</span>
                  <input
                    type="checkbox"
                    checked={selected.shipping.includes(opt.name)}
                    onChange={() => handleShippingChange(opt.name)}
                  />
                </label>
              ))}
            </div>
          )}
        />
        <div className="my-5">
          <label> Other</label>
          <input className="ml-5" type="text" {...register("shippingOther")} />
        </div>
        <div className="flex justify-end gap-4 mt-6 font-bold cursor-pointer">
          <span onClick={() => handleCheckAll("shipping", true)}>
            Check All
          </span>
          <span onClick={() => handleCheckAll("shipping", false)}>
            Uncheck All
          </span>
        </div>
      </div>
    </>
  );
};

export default Trading;
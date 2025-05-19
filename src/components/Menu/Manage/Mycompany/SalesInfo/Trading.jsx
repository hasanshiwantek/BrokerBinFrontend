import React, { useEffect } from "react";
import { regionsList } from "@/data/services";
import css from "../../../../../styles/Menu/Manage/MyProfile.module.css";
import { useFormContext } from "react-hook-form";


const Trading = () => {

    const { register, setValue, getValues, reset } = useFormContext();

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
        { name: "leaseProgram", label: "Lease Program" },
        { name: "rentalProgram", label: "Rental Program" },
        { name: "tradeInProgram", label: "Trade-In Program" },
    ];

    const shippingOptions = [
        { name: "fedex", label: "FedEx" },
        { name: "dhl", label: "DHL" },
        { name: "ups", label: "UPS" },
        { name: "willShipOnOtherAcct", label: "Will Ship on Other Acct#s" },
        { name: "other", label: "Other" },
    ];

    const handleCheckAll = (type, check = true) => {
        const items =
            type === "regions" ? regions :
                type === "programs" ? programOptions :
                    type === "shipping" ? shippingOptions : [];

        items.forEach((item) => {
            setValue(item.name || item.id, check);
        });
    };

    useEffect(() => {
        const fetchTradingData = async () => {
            const res = await axios.get("/your-trading-api-endpoint");
            reset(res.data); // populate form fields
        };
        fetchTradingData();
    }, []);

    return (
        <>
            {/*Regions*/}
            <div className={css.profileInfo_form}>
                <h1>Trading Regions</h1>
                <div className="flex flex-wrap gap-4 text-left">
                    {regions.map((region) => (
                        <label key={region.value} className="flex items-center gap-2 ">
                            <span>{region.label}</span>
                            <input type="checkbox" {...register(region.id)} className="w-4 h-4" />
                        </label>
                    ))}
                </div>
                <div className="flex justify-end gap-4 mt-6 font-bold cursor-pointer">
                    <span onClick={() => handleCheckAll("regions", true)}>Check All</span>
                    <span onClick={() => handleCheckAll("regions", false)}>Uncheck All</span>
                </div>
            </div>

            {/*Programs*/}
            <div className={css.profileInfo_form}>
                <h1>Programs</h1>
                <div className="flex flex-wrap gap-4 text-left">
                    {programOptions.map((prog) => (
                        <label key={prog.name} className="flex justify-between gap-2 items-center ">
                            <span>{prog.label}</span>
                            <input type="checkbox" {...register(prog.name)} className="w-4 h-4" />
                        </label>
                    ))}
                </div>
                <div className="flex justify-end gap-4 mt-6 font-bold cursor-pointer">
                    <span onClick={() => handleCheckAll("programs", true)}>Check All</span>
                    <span onClick={() => handleCheckAll("programs", false)}>Uncheck All</span>
                </div>
            </div>

            {/* Blind Shipping */}
            <div className={`${css.profileInfo_form}`}>
                <h1 className="text-md font-semibold">Blind Shipping</h1>

                {/* Radio Buttons */}
                <div className="flex gap-4 items-center">
                    <label className="flex items-center gap-1">
                        <input type="radio" value="yes" {...register("blindShipping")} />
                        Yes
                    </label>
                    <label className="flex items-center gap-1">
                        <input type="radio" value="no" {...register("blindShipping")} />
                        No
                    </label>
                </div>

                {/* Time Select (Hour + AM/PM) */}
                <div className="flex gap-2 items-center">
                    <span>Shipping Deadline</span>
                    <select
                        {...register("blindShipping_hour")}
                        className="border border-gray-300 rounded px-2 py-1"
                    >
                        {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>

                    <select
                        {...register("blindShipping_ampm")}
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
                <div className="flex flex-wrap gap-4 text-left">
                    {shippingOptions.map((opt) => (
                        <label key={opt.name} className="flex items-center gap-2 ">
                            <span>{opt.label} </span>
                            <input type="checkbox" {...register(opt.name)} className="w-4 h-4" />
                        </label>
                    ))}
                </div>
                <label>Other</label>
                <input type="text" />
                <div className="flex justify-end gap-4 mt-6 font-bold cursor-pointer">
                    <span onClick={() => handleCheckAll("shipping", true)}>Check All</span>
                    <span onClick={() => handleCheckAll("shipping", false)}>Uncheck All</span>
                </div>
            </div>
        </>
    );
}

export default Trading;
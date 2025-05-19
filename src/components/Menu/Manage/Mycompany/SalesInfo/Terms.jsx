import React from "react";
import { regionsList } from "@/data/services";
import css from "../../../../../styles/Menu/Manage/MyProfile.module.css";


const Terms = ({formData, setFormData}) => {

    const regions = regionsList;

    const handleChange=()=>{
        console.log("handleChange")
    }

    return (
        <>
            <div className={``}>
                <h1>Trading Regions</h1>
                <div className="flex">
                    <div className="flex  gap-4 flex-wrap text-left">
                        {regions.map((field) => (
                            <span
                                key={field.name}
                                className="flex justify-between items-center gap-5"
                            >
                                <label htmlFor={field.name}>{field.label}</label>
                                <input
                                    type="checkbox"
                                    id={field.name}
                                    name={field.name}
                                    checked={formData?.data?.company?.[field.name] || false}
                                    onChange={handleChange}
                                    className="w-4 h-4"
                                />
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className={`${css.profileInfo_form} `}>
                <h1>Trading Regions</h1>
                <div className="flex">
                    <div className="flex  gap-4 flex-wrap text-left">
                        {regions.map((field) => (
                            <span
                                key={field.name}
                                className="flex justify-between items-center gap-5"
                            >
                                <label htmlFor={field.name}>{field.label}</label>
                                <input
                                    type="checkbox"
                                    id={field.name}
                                    name={field.name}
                                    checked={formData?.data?.company?.[field.name] || false}
                                    onChange={handleChange}
                                    className="w-4 h-4"
                                />
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}


export default Terms;
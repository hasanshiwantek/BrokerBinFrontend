import React from "react";
import { GrCircleInformation } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { setPopupCompanyDetail, setTogglePopUp, setHoverCompanyDetail } from "../../ReduxStore/SearchProductSlice";


const CompanyListingTable = ({ entries }) => {

    const dispatch = useDispatch(); 

    const handleHoverCompanyDetail = (company) => {
        dispatch(setHoverCompanyDetail(company));
    };

    const handleShowPopupCompanyDetails = (company) => {
        dispatch(setPopupCompanyDetail([company])); 
        dispatch(setTogglePopUp()); 
    };

    const renderedCompanies = new Set(); // Track unique companies

        return (
            <div className="overflow-x-auto text-[5px]">
                <table className="max-w-full border text-xs cursor-pointer">
                    <thead className="bg-gray-200 text-left">
                        <tr>
                            <th className="p-2 border">Company</th>
                            <th className="p-2 border">Ctry</th>
                            <th className="p-2 border">St</th>
                            <th className="p-2 border">Hrs</th>
                            <th className="p-2 border">Ship By</th>
                            <th className="p-2 border">Phone</th>
                            <th className="p-2 border">Fax</th>
                            <th className="p-2 border">Details</th>
                            <th className="p-2 border">MyVen</th>
                        </tr>
                    </thead>
                    <tbody className="text-[5px]">
                        {entries.filter(([key]) => key !== "filters")
                            .flatMap(([partModel, details]) =>
                                (details.data || []).filter((row) => {
                                    const id = row.addedBy?.company?.id;
                                    if (!id || renderedCompanies.has(id)) return false;
                                    renderedCompanies.add(id);
                                    return true;
                                }).map((row, i) => (
                                    <tr key={`${row.addedBy?.company?.id}-${i}`} className="even:bg-gray-100 text-[5px]">
                                        <td className="p-2 border">
                                            <a onClick={() => handleShowPopupCompanyDetails(row.addedBy?.company)}
                                                onMouseEnter={() => handleHoverCompanyDetail(row.addedBy?.company)}
                                            >
                                                {row.addedBy?.company?.name}
                                            </a>
                                        </td>
                                        <td className="p-2 border">{row.addedBy?.company?.country}</td>
                                        <td className="p-2 border">{row.addedBy?.company?.state}</td>
                                        <td className="p-2 border">{row.addedBy?.company?.open_timing} - {row.addedBy?.company?.close}</td>
                                        <td className="p-2 border">{row.addedBy?.company?.shipping_deadline}</td>
                                        <td className="p-2 border">{row.addedBy?.company?.phone_num}</td>
                                        <td className="p-2 border">{row.addedBy?.company?.fax}</td>
                                        <td className="p-2 border">
                                            <a onClick={() => handleShowPopupCompanyDetails(row.addedBy?.company)}
                                                onMouseEnter={() => handleHoverCompanyDetail(row.addedBy?.company)}
                                            >
                                                <GrCircleInformation />
                                            </a>
                                        </td>
                                        <td className="p-2 border">👥 📧</td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
}

export default CompanyListingTable;

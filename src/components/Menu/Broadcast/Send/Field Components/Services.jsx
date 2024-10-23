import { React, useState } from "react";
import css from "../Send.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setServiceSelection } from "../../../../../ReduxStore/BroadCast";

const Services = ({handleServiceChange}) => {
    const [isExpanded, setIsExpanded] = useState(false); // State to track visibility

    const services = [
        "Asset Recovery",
        "Backup",
        "Call Center",
        "Cloud Assessment",
        "Cloud Migration",
        "Cloud Services",
        "Conferencing",
        "DaaS",
        "Data Destruction",
        "Data Recovery",
        "Deinstallation",
        "Delivery Duty Paid",
        "Disaster Recovery",
        "Engineering",
        "Fiber",
        "Hardware Audits",
        "Hosted Exchange",
        "Hosting",
        "IaaS",
        "Import/Export",
        "Import/Export of Record",
        "Installation",
        "Internet",
        "Inventory Management",
        "IT Management",
        "ITAD",
        "Leasing",
        "Logistics",
        "Maintenance",
        "Managed Services",
        "Network Management",
        "Networking",
        "Packaging",
        "Pay Per Click",
        "Recycling / Scrap",
        "Rental",
        "Repair",
        "SDN",
        "Security",
        "SEO",
        "Shipping",
        "Software",
        "Solutions",
        "Sort and Settle",
        "Storage",
        "Testing Facility",
        "VDI",
        "VoIP",
        "WAN / MPLS",
        "TEMs",
        "Web Services",
    ];

    const dispatch = useDispatch();
    const { serviceData } = useSelector((state) => state.broadcastStore);

    // Handle selection change for services
    const handleServiceSelection = (service) => {
        // Dispatch the service selection to Redux store
        dispatch(setServiceSelection(service));
    };

    const toggleExpandCollapse = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>


            <div className={css.toggleFieldsLayout}>

                <p onClick={toggleExpandCollapse}>
                    {isExpanded ? "Collapse Services" : "Expand Services"}
                </p>

                {isExpanded && (
                    <div  className={css.servicesGrid}>
                        {services.map((service) => (
                            <div className={css.serviceItem} key={service}>
                            <span key={service}>
                                <label htmlFor={service}>{service}</label>
                                <input
                                    type="checkbox"
                                    name={service}
                                    id={service}
                                    value={service}
                                    onChange={() => handleServiceSelection(service)} // Update selection
                                    checked={serviceData.includes(service)} 
                                />
                            </span>
                            </div>

                        ))}
                    </div>
                )}
            </div>
        </>

    );
};

export default Services;

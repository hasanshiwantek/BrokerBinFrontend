import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const MapComponent = ({ company }) => {

    const companiesArray = Array.isArray(company?.companies) ? company.companies : [company];
    console.log("CompaniesArray", companiesArray)

    if (companiesArray.length === 0) {
        return <p>Loading Map</p>
    }

    const [selectedCompany, setSelectedCompany] = useState(null);

    // Default Map Center (Can be dynamic)
    const defaultCenter = companiesArray.length > 0
        ? { lat: companiesArray[0].latitude, lng: companiesArray[0].longitude }
        : { lat: 34.0522, lng: -118.2437 }; // Fallback


    const containerStyle = {
        width: "100%",
        height: "500px"
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyBxPohwrm4YVcvGHwJLE2hoQ_ATCfodbzc">
            <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={10}>
                {companiesArray.map((company, index) => (
                    <div key={index}>
                    <Marker 
                        position={{ lat: company.latitude, lng: company.longitude }} 
                        onClick={() => setSelectedCompany(company)}
                    />

             
                        {selectedCompany === company && (
                            <InfoWindow
                                position={{ lat: company.latitude + 0.0500, lng: company.longitude }}
                                onCloseClick={() => setSelectedCompany(null)}
                            >
                                <div className="!overflow-hidden ">
                                    <img src={company.logo} alt="Company Logo" width="100" />
                                    <h3>{company.company}</h3>
                                    <p>{company.address}</p>
                                    <p><strong>Contact:</strong> {company.contactPerson}</p>
                                    <p><strong>Rating:</strong> {company.rating} ⭐⭐⭐⭐⭐</p>
                                </div>
                            </InfoWindow>
                        )}
                    </div>
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;

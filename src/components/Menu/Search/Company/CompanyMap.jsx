import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const MapComponent = ({ company }) => {
    const [selectedCompany, setSelectedCompany] = useState(null);

    // Default Map Center (Can be dynamic)
    const defaultCenter = {
        lat: company?.latitude || 34.0522,
        lng: company?.longitude || -118.2437
    };

    const containerStyle = {
        width: "100%",
        height: "500px"
    };

    return (
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={10}>
                {/* Red Marker */}
                <Marker 
                    position={{ lat: company.latitude, lng: company.longitude }} 
                    onClick={() => setSelectedCompany(company)}
                />

                {/* Info Window on Marker Click */}
                {selectedCompany && (
                    <InfoWindow 
                        position={{ lat: company.latitude, lng: company.longitude }} 
                        onCloseClick={() => setSelectedCompany(null)}
                    >
                        <div>
                            <img src={company.logo} alt="Company Logo" width="100" />
                            <h3>{company.companyName}</h3>
                            <p>{company.address}</p>
                            <p><strong>Contact:</strong> {company.contactPerson}</p>
                            <p><strong>Rating:</strong> ⭐⭐⭐⭐⭐</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;

import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
const MapComponent = ({ company }) => {
  const companiesArray = Array.isArray(company?.companies)
    ? company.companies
    : [company];
  console.log("CompaniesArray", companiesArray);

  if (companiesArray.length === 0) {
    return <p>No Data Found</p>;
  }

  const [selectedCompany, setSelectedCompany] = useState(null);
  const mapRef = useRef(null);

  // Default Map Center (Can be dynamic)
  const defaultCenter =
    companiesArray.length > 0
      ? { lat: companiesArray[0].latitude, lng: companiesArray[0].longitude }
      : { lat: 34.0522, lng: -118.2437 }; // Fallback

  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  useEffect(() => {
    if (mapRef.current && companiesArray.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      companiesArray.forEach((comp) => {
        bounds.extend({ lat: comp.latitude, lng: comp.longitude });
      });
      mapRef.current.fitBounds(bounds); // ✅ Automatically adjust zoom & position
    }
  }, [companiesArray]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBxPohwrm4YVcvGHwJLE2hoQ_ATCfodbzc">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        onLoad={(map) => (mapRef.current = map)}
        zoom={12}
      >
        {companiesArray.map((company, index) => (
          <div key={index}>
            <Marker
              position={{ lat: company.latitude, lng: company.longitude }}
              onClick={() => {
                // setSelectedCompany(prev => prev?.id === company.id ? null : company);
                setSelectedCompany(null);
                setTimeout(() => setSelectedCompany(company), 0);
                mapRef.current?.setZoom(18); // ✅ Zoom in
                mapRef.current?.panTo({
                  lat: company.latitude,
                  lng: company.longitude,
                }); // ✅ Center marker
              }}
            />

            {selectedCompany === company && (
              <InfoWindow
                position={{ lat: company.latitude, lng: company.longitude }}
                onCloseClick={() => setSelectedCompany(null)}
                options={{ pixelOffset: new window.google.maps.Size(0, -40) }}
              >
                <div className="p-2 max-w-[250px] font-sans text-gray-800 rounded-lg shadow-lg overflow-hidden bg-white">
                  <img
                    src={company.logo}
                    alt="Company Logo"
                    className="w-24 rounded-md mb-2"
                  />
                  <h3 className="text-lg font-semibold text-blue-600 mb-1">
                    {company.company}
                  </h3>
                  <p className="text-sm mb-1">{company.address}</p>
                  <p className="text-sm mb-1">
                    <strong>Contact:</strong> {company.contactPerson}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Rating:</strong> {company.rating} ⭐⭐⭐⭐⭐
                  </p>
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

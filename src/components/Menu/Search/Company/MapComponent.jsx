import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { setTogglePopUp } from "@/ReduxStore/SearchProductSlice";
import { setPopupCompanyDetail } from "@/ReduxStore/SearchProductSlice";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./CompanySearchResults.css";
import { FaInfoCircle } from "react-icons/fa";

const MapComponent = ({ company }) => {
  const companiesArray = Array.isArray(company?.companies)
    ? company.companies
    : [company];
  console.log("CompaniesArray", companiesArray);
  const dispatch = useDispatch();

  if (companiesArray.length === 0) {
    return (
      <div className="bg-blue-400 p-4">
        <p className="text-white !text-2xl m-4 font-semibold flex items-center justify-start gap-1">
          <FaInfoCircle className="text-3xl" />
          No companies found
          <span className="text-black text-2xl ml-4 font-semibold">
            Try another search
          </span>
        </p>
      </div>
    );
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
    height: "600px",
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

  const { togglePopUp, popupCompanyDetail } = useSelector(
    (state) => state.searchProductStore
  );
  // Company Modal Logic
  const openCompanyModal = (company) => {
    console.log("Opening Company Modal with Company:", company);
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUp()); // Show company modal
  };

  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "1.2rem", // Adjust font size
            width: "fitContent",
            textAlign: "center",
            whiteSpace: "nowrap",
            backgroundColor: "var(--primary-color)",
          },
          arrow: {
            color: "var(--primary-color)",
          },
        },
      },
    },
  });

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
                className="!overflow-hidden"
              >
                <ThemeProvider theme={theme}>
                  <Tooltip title="View Company Profile" arrow placement="top">
                    <div
                      className="p-4 max-w-[270px] font-sans text-gray-800 rounded-lg shadow-lg overflow-hidden bg-white text-center cursor-pointer"
                    
                    >
                      <img
                        src={company.logo}
                        alt="Company Logo"
                        className="w-40 rounded-md mb-2 m-auto"
                        onClick={() => openCompanyModal(company)}
                      />
                      <h3 className="text-2xl font-semibold text-black mb-1">
                        {company.company}
                      </h3>
                      <p className="!text-xl mb-1">{company.address}</p>
                      <p className="!text-xl mb-1">
                        <strong>Contact:</strong> {company.contactPerson}
                      </p>
                      <p className="!text-xl mb-1">
                        <strong className="!text-lg">Rating:</strong>{" "}
                        {company.rating} ⭐⭐⭐⭐⭐
                        <p className="!text-xl mb-1"></p>Comments:{" "}
                        {company.ratingCount}
                      </p>
                    </div>
                  </Tooltip>
                </ThemeProvider>
              </InfoWindow>
            )}
          </div>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;

import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { FaInfoCircle, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  setTogglePopUp,
  setPopupCompanyDetail,
} from "@/ReduxStore/SearchProductSlice";
import "../../../Search/Company/CompanySearchResults.css";

const MapComponent = ({ company }) => {
  const dispatch = useDispatch();

  console.log("Company From Map Component",company);
  
  // Normalize input
  const companiesArray = Array.isArray(company)
    ? company
    : company?.companies
    ? company.companies 
    : [company];

  const containerStyle = {
    width: "95%",
    height: "350px",
    border: "2px solid #ccc",
    borderRadius: "5px",
  };

  const defaultCenter =
    companiesArray?.length &&
    companiesArray[0]?.latitude &&
    companiesArray[0]?.longitude
      ? {
          lat: companiesArray[0]?.latitude,
          lng: companiesArray[0]?.longitude,
        }
      : { lat: 37.7749, lng: -122.4194 }; // fallback (San Francisco)

  const [selectedCompany, setSelectedCompany] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && companiesArray.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      companiesArray.forEach((comp) => {
        if (comp.latitude && comp.longitude) {
          bounds.extend({ lat: comp.latitude, lng: comp.longitude });
        }
      });
      mapRef.current.fitBounds(bounds);
    }
  }, [companiesArray]);

  const { togglePopUp, popupCompanyDetail } = useSelector(
    (state) => state.searchProductStore
  );

  const openCompanyModal = (company) => {
    dispatch(setPopupCompanyDetail([company]));
    dispatch(setTogglePopUp());
  };

  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "1.2rem",
            whiteSpace: "nowrap",
            backgroundColor: "#2c83ec",
          },
          arrow: {
            color: "#2c83ec",
          },
        },
      },
    },
  });

  if (!companiesArray.length || !companiesArray[0]?.latitude) {
    return (
      <div className="flex justify-center  items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        <span className="ml-4 text-blue-600 text-lg font-medium"></span>
      </div>
    );
  }

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyBxPohwrm4YVcvGHwJLE2hoQ_ATCfodbzc">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={12}
          onLoad={(map) => (mapRef.current = map)}
        >
          {companiesArray.map((comp, index) => (
            <Marker
              key={index}
              position={{ lat: comp.latitude, lng: comp.longitude }}
            />
          ))}

          {selectedCompany && (
            <InfoWindow
              position={{
                lat: selectedCompany.latitude,
                lng: selectedCompany.longitude,
              }}
              onCloseClick={() => setSelectedCompany(null)}
              options={{ pixelOffset: new window.google.maps.Size(0, -40) }}
            >
              <ThemeProvider theme={theme}>
                <Tooltip title="View Company Profile" arrow placement="top">
                </Tooltip>
              </ThemeProvider>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default MapComponent;

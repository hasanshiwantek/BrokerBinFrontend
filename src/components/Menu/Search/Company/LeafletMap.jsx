import React, {useState, useEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const LeafletMap = ({ company }) => {

  const companiesArray = Array.isArray(company?.companies) ? company.companies : [company];
  console.log("Companies Array: ",companiesArray)


  if (companiesArray.length === 0 || !companiesArray[0]?.latitude) {
    return <p>Loading map...</p>;
  }
 
  const position = [companiesArray[0].latitude, companiesArray[0].longitude];
  const [mapTheme, setMapTheme] = useState("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
  const redIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconSize: [32, 32],
  });


  const themes = [
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", // Default
    "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", // Dark Mode
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", // Night Mode
  ];

  const MapUpdater = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(position, 13); // ✅ Auto-center map on new location
    }, [position, map]);
    return null;
  };

  return (
    <MapContainer
    className="w-full h-[500px] relative z-0" 
    center={position} 
    zoom={13} 
    style={{ height: "500px", width: "100%" }} 
    // scrollWheelZoom={false}
    >
      <MapUpdater position={position} />
      <TileLayer url={mapTheme} />
      {companiesArray.map((comp, index) => (
        <Marker
          key={index}
          position={[comp.latitude, comp.longitude]}
          eventHandlers={{
            click: () => {
              const nextTheme = themes[(themes.indexOf(mapTheme) + 1) % themes.length]; // Cycle themes
              setMapTheme(nextTheme);
            }
          }}
        >
          <Popup>
            <img src={comp.logo} alt="Company Logo" width="100" />
            <h3>{comp.company}</h3>
            <p>{comp.address}</p>
            <p><strong>Contact:</strong> {comp.contactPerson}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;





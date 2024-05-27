import React, { useState } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/core";
import css from "../../styles/Map/Map.module.css";

const MyWorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountryClick = (e, countryCode) => {
    setSelectedCountry(countryCode);
  };

  return (
    <div style={{ width: 500, height: 500 }}>
      {!selectedCountry ? (
        <VectorMap
          map={worldMill}
          className={css.MyWorldMap}
          onRegionClick={handleCountryClick}
        />
      ) : (
        <MapContainer zoom={5} style={{ height: 500, width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* More map components based on selectedCountry */}
        </MapContainer>
      )}
    </div>
  );
};

export default MyWorldMap;

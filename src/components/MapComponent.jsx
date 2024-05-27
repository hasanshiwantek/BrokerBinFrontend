import React from 'react';
import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// Your region GeoJSON data
// import regionsData from './regions.json';

const MapComponent = () => {
  
    const regionsData = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
              "name": "Region 1",
              "members": 5000,
              "parts": 200000,
              "services": 150
            },
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [-0.135838, 51.521435],
                  [-0.109375, 51.522416],
                  [-0.109711, 51.501903],
                  [-0.135838, 51.501278],
                  [-0.135838, 51.521435]
                ]
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Region 2",
              "members": 7500,
              "parts": 150000,
              "services": 95
            },
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [-0.093994, 51.514480],
                  [-0.068857, 51.512891],
                  [-0.067154, 51.493776],
                  [-0.092291, 51.492187],
                  [-0.093994, 51.514480]
                ]
              ]
            }
          }
        ]
      }
      
  
    const regionStyle = {
    fillColor: 'blue',
    weight: 2,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.7
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={6} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={regionsData} style={regionStyle} />
      {/* You can add other layers such as markers or circles here */}
    </MapContainer>
  );
};

export default MapComponent;

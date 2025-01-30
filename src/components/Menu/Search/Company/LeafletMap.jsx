import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LeafletMap = ({ company }) => {
  const position = [company.latitude, company.longitude];

  return (
    <MapContainer center={position} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>
          <img src={company.logo} alt="Company Logo" width="100" />
          <h3>{company.companyName}</h3>
          <p>{company.address}</p>
          <p><strong>Contact:</strong> {company.contactPerson}</p>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;

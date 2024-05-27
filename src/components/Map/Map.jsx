import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import css from "../../styles/Map/Map.module.css";
import { FaStar } from "react-icons/fa";
import companyLogo from "../../imgs/logo/CompanyDetailsLogo.jpg";
import CompanyDetails from "../Popups/CompanyDetails/CompanyDetails";

const locations = [
  {
    id: 1,
    name: "Sameel Enterprises",
    address: "Landhi, Karachi",
    coords: [24.8451, 67.1916],
    img: companyLogo,
    des: "Sameel Enterprises specializes in manufacturing and exporting textile products, known for their quality and durability. Our commitment to excellence is evident in every piece we produce.",
    contactNo: "+92 300 1234567",
    email: "info@sameelenterprises.pk",
  },
  {
    id: 2,
    name: "Kaif Industries",
    address: "Korangi, Karachi",
    coords: [24.8221, 67.1435],
    img: companyLogo,
    des: "Kaif Industries leads the way in heavy machinery manufacturing, providing innovative solutions to the construction and mining industries across Pakistan and beyond.",
    contactNo: "+92 321 1234567",
    email: "contact@kaifindustries.com",
  },
  {
    id: 3,
    name: "Hassan Group",
    address: "Kharadar, Karachi",
    coords: [24.8634, 66.999],
    img: companyLogo,
    des: "At Hassan Group, we pride ourselves on our robust real estate development portfolio, creating sustainable and modern living spaces for a growing urban population.",
    contactNo: "+92 322 1234567",
    email: "hello@hassangroup.com",
  },
  {
    id: 4,
    name: "Zain Corp",
    address: "Liaquatabad, Karachi",
    coords: [24.9267, 67.0334],
    img: companyLogo,
    des: "Zain Corp is a leader in consumer electronics, pioneering new technologies that enhance everyday life with a range of products from smartphones to home appliances.",
    contactNo: "+92 333 1234567",
    email: "support@zaincorp.com",
  },
  {
    id: 5,
    name: "Kohli Ltd",
    address: "Malir, Karachi",
    coords: [24.9438, 67.2056],
    img: companyLogo,
    des: "Kohli Ltd specializes in agricultural advancements, providing innovative farming solutions to help increase crop yields and sustainability for farmers across the region.",
    contactNo: "+92 334 1234567",
    email: "inquiry@kohliltd.com",
  },
  {
    id: 6,
    name: "Imran Enterprises",
    address: "Gulshan-e-Iqbal, Karachi",
    coords: [24.9262, 67.0313],
    img: companyLogo,
    des: "Imran Enterprises focuses on the import and export of spices, offering a variety of authentic flavors that cater to both local and international markets.",
    contactNo: "+92 335 1234567",
    email: "sales@imranenterprises.com",
  },
  {
    id: 7,
    name: "Afridi Inc",
    address: "Gulistan-e-Jauhar, Karachi",
    coords: [24.9123, 67.1246],
    img: companyLogo,
    des: "Afridi Inc is known for its sporting goods, specializing in cricket equipment that combines quality, performance, and innovation to meet the needs of professional athletes.",
    contactNo: "+92 336 1234567",
    email: "info@afridiinc.com",
  },
  {
    id: 8,
    name: "Fawad Chemicals",
    address: "Nazimabad, Karachi",
    coords: [24.9158, 67.0317],
    img: companyLogo,
    des: "Fawad Chemicals produces high-quality industrial chemicals and solutions, serving a diverse range of sectors including pharmaceuticals, agriculture, and manufacturing.",
    contactNo: "+92 337 1234567",
    email: "contact@fawadchemicals.com",
  },
  {
    id: 9,
    name: "Wasim Textiles",
    address: "North Karachi",
    coords: [24.9535, 67.064],
    img: companyLogo,
    des: "Wasim Textiles offers a wide range of fabric products, known for their innovative designs and exceptional quality. Our textiles meet the high standards of the fashion industry.",
    contactNo: "+92 338 1234567",
    email: "support@wasimtextiles.com",
  },
];

const Map = () => {
  const mapRef = useRef(); // Use a ref to access the map instance
  const popupRefs = useRef({});
  const [togglePopUp, setTogglePopUp] = useState(false);
  const handleShowPopupCompanyDetails = (event) => {
    event.stopPropagation(); // Stop the click event from propagating to the document
    setTogglePopUp((prev) => !prev);
  };
  const handleListItemClick = (location) => {
    const map = mapRef.current;
    if (map) {
      map.flyTo(location.coords, 18); // Assuming zoom level 13 for closer view
    }
    if (popupRefs.current[location.id]) {
      popupRefs.current[location.id].openPopup();
    }
  };

  return (
    <div className={css.main}>
      <MapContainer
        center={locations[0].coords} // Initial center on first cord
        zoom={18} // Initial zoom level
        style={{ height: "100%", width: "70%" }}
        ref={mapRef} // Connect the ref to the MapContainer
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={location.coords}
            ref={(ref) => {
              popupRefs.current[location.id] = ref;
            }}
          >
            <Popup>
              <div className={css.popUp}>
                <span className={css.popUp_name}>
                  <p>{location.name}</p>
                  <p>{location.address}</p>
                </span>
                <span className={css.popUp_stars}>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className={css.companyList}>
        <ul className={css.companiesList}>
          {locations.map((location) => (
            <li key={location.id}>
              <img
                src={companyLogo}
                alt="company logo"
                onClick={handleShowPopupCompanyDetails}
              />
              <div className={css.companiesList_scroll}>
                <div onClick={() => handleListItemClick(location)}>
                  <h1>{location.name}:</h1>
                  <p>{location.des}</p>
                </div>
                <div>
                  <p>
                    contact:
                    <a href="tel:+">{location.contactNo}</a>
                  </p>
                  <p>
                    email:
                    <a href="mailto:">{location.email}</a>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {togglePopUp && <CompanyDetails setTogglePopUp={setTogglePopUp} />}
    </div>
  );
};

export default Map;

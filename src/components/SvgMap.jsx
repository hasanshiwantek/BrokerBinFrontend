import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip as ReactTooltip } from "react-tooltip";
import topoJson from "../countries.geo.json";
import "react-tooltip/dist/react-tooltip.css";

const SvgMap = () => {
  // State to track hovered country
  const [hoveredCountry, setHoveredCountry] = useState(null);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "400px",
        aspectRatio: "1/1",
      }}
    >
      <ComposableMap
        projection="geoEqualEarth"
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        <Geographies geography={topoJson}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.NAME;
              const isHovered = countryName === hoveredCountry;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isHovered ? "#1f77b4" : "#DDD"}
                  stroke="#FFF"
                  onMouseEnter={() => setHoveredCountry(countryName)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  data-tooltip-id="country-tooltip" // ID for tooltip
                  data-tooltip-content={countryName} // Content for tooltip
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      
      {/* Tooltip with a unique id */}
      <ReactTooltip id="country-tooltip" />
    </div>
  );
};

export default SvgMap;

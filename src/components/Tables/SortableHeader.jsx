import React from "react";

const SortableTableHeader = ({
  headers,
  sortBy,
  sortOrder,
  onSort,
  extraIcons = {},
  className = "",
}) => {
  return (
    <thead className={className}>
      <tr>
        {headers.map((header, index) => (
          <th
            key={index}
            onClick={header.sortable ? () => onSort(header.key) : undefined}
            style={{ cursor: header.sortable ? "pointer" : "default" }}
          >
            {extraIcons[header.key] ? (
              <img
                src={extraIcons[header.key]}
                alt=""
                style={{ width: "18px", fontWeight: "bold" }}
              />
            ) : (
              header.label
            )}
            {header.sortable && sortBy === header.key && (
              <span>{sortOrder === "asc" ? " ↑" : " ↓"}</span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default SortableTableHeader;

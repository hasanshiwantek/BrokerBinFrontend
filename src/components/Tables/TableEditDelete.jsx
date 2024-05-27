import React from "react";

const TableEditDelete = ({ inventoryEditDeleteTable,toggleHECICLEI }) => {
  // inventoryEditDeleteTable[0].th.filter((item) => item === "HECI / CLEI");
  return (
    <table>
      <thead>
        <tr>
          {/* {inventoryEditDeleteTable[0].th.map((item) => {
            return <th key={item}>{item}</th>;
          })} */}
          {inventoryEditDeleteTable[0].th
            .filter((item) => (toggleHECICLEI ? item : item !== "HECI / CLEI"))
            .map((item) => {
              return <th key={item}>{item}</th>;
            })}
        </tr>
      </thead>
      <tbody>
        {inventoryEditDeleteTable[1].td.length == 0 ? (
          <tr style={{ textAlign: "center", color: "red" }}>
            <td colSpan="10">No Parts Found.</td>
          </tr>
        ) : (
          inventoryEditDeleteTable[1].td.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.part}</td>
                {toggleHECICLEI && <td>HECI/CLEI</td>}
                <td>{item.mfg}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.status}</td>
                <td>{item.description}</td>
                <td>{item.cond}</td>
                <td>{item.special}</td>
                <td>{item.age}</td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default TableEditDelete;

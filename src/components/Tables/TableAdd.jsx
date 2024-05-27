import React from "react";

const TableAdd = ({ inventoryAddTable }) => {
  return (
    <table>
      <thead>
        <tr>
          {inventoryAddTable.map((item) => {
            return <th key={item}>{item}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {new Array(inventoryAddTable.length).fill(null).map((item, i) => {
          return (
            <tr key={i}>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
                <select>
                  <option value="2">Stock</option>
                  <option value="1">DIST</option>
                </select>
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
                <select>
                  <option> NEW</option>
                  <option> ASIS</option>
                  <option> EXC</option>
                  <option> F/S</option>
                  <option> NOB</option>
                  <option> REF</option>
                  <option> OEMREF</option>
                  <option> REP</option>
                  <option> USED</option>
                </select>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableAdd;

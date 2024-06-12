import React, { useState } from "react";

const TableAdd = ({ inventoryAddTable, setAddInventory }) => {
  const [data, setData] = useState([
    {
      partModel: "",
      heciClei: "",
      mfg: "",
      price: "",
      quantity: "",
      status: "stock",
      productDescription: "",
      cond: "new",
    },
    {
      partModel: "",
      heciClei: "",
      mfg: "",
      price: "",
      quantity: "",
      status: "stock",
      productDescription: "",
      cond: "new",
    },
    {
      partModel: "",
      heciClei: "",
      mfg: "",
      price: "",
      quantity: "",
      status: "stock",
      productDescription: "",
      cond: "new",
    },
    {
      partModel: "",
      heciClei: "",
      mfg: "",
      price: "",
      quantity: "",
      status: "stock",
      productDescription: "",
      cond: "new",
    },
    {
      partModel: "",
      heciClei: "",
      mfg: "",
      price: "",
      quantity: "",
      status: "stock",
      productDescription: "",
      cond: "new",
    },
    {
      partModel: "",
      heciClei: "",
      mfg: "",
      price: "",
      quantity: "",
      status: "stock",
      productDescription: "",
      cond: "new",
    },
    {
      partModel: "",
      heciClei: "",
      mfg: "",
      price: "",
      quantity: "",
      status: "stock",
      productDescription: "",
      cond: "new",
    },
    {
      partModel: "",
      heciClei: "",
      mfg: "",
      price: "",
      quantity: "",
      status: "stock",
      productDescription: "",
      cond: "new",
    },
  ]);

  const handleChange = (e, i) => {
    const updatedFiles = [...data];
    updatedFiles[i][e.target.name] = e.target.value;
    setData(updatedFiles);
    setAddInventory(updatedFiles);
  };

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
        {data.map((item, i) => {
          return (
            <tr key={i}>
              <td>
                <input
                  type="text"
                  name="partModel"
                  onChange={(e) => handleChange(e, i)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="heciClei"
                  onChange={(e) => handleChange(e, i)}
                />
              </td>

              <td>
                <input
                  type="text"
                  name="mfg"
                  onChange={(e) => handleChange(e, i)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="price"
                  onChange={(e) => handleChange(e, i)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="quantity"
                  onChange={(e) => handleChange(e, i)}
                />
              </td>
              <td>
                <select
                  name="status"
                  value={item.status}
                  onChange={(e) => handleChange(e, i)}
                >
                  <option value="stock">Stock</option>
                  <option value="dist">DIST</option>
                </select>
              </td>
              <td>
                <input
                  name="productDescription"
                  type="text"
                  onChange={(e) => handleChange(e, i)}
                />
              </td>
              <td>
                <select
                  name="cond"
                  value={item.cond}
                  onChange={(e) => handleChange(e, i)}
                >
                  <option value="new">NEW</option>
                  <option value="asis">ASIS</option>
                  <option value="exc">EXC</option>
                  <option value="f/s">F/S</option>
                  <option value="nob">NOB</option>
                  <option value="ref">REF</option>
                  <option value="oemref">OEMREF</option>
                  <option value="rep">REP</option>
                  <option value="used">USED</option>
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

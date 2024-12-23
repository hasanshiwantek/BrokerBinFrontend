import React from "react";
import { inventoryAddTable } from "../../data/tableData";
import { useDispatch, useSelector } from "react-redux";
import { setInventoryAddData } from "../../ReduxStore/InventorySlice";
import css from "../../styles/Menu/Manage/Inventory/Inventory.module.css";

const TableAdd = () => {
  const inventoryAddData = useSelector(
    (state) => state.inventoryStore.inventoryAddData
  );
  const dispatch = useDispatch();

  const handleChange = (e, i) => {
    // The error Cannot assign to read only property 'partModel' of object '#<Object>' occurs because the inventoryAddData state object is being directly mutated, which is not allowed in Redux. To solve this, we need to make a deep copy of the state object before modifying it.Here, I'll provide a solution using a deep copy with JavaScript's spread operator and the map method.
    const updatedFiles = inventoryAddData.map((item, index) => {
      if (index === i) {
        return {
          ...item,
          [e.target.name]: e.target.value,
        };
      }
      return item;
    });

    dispatch(setInventoryAddData(updatedFiles));
  };

  return (
    <table className={css.addInvenInputs}>
      <thead>
        <tr>
          {inventoryAddTable.map((item) => {
            return <th key={item}>{item}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {inventoryAddData.map((item, i) => {
          return (
            <tr key={i}>
              <td>
                <input
                  type="text"
                  name="partModel"
                  value={item.partModel}
                  onChange={(e) => handleChange(e, i)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="heciClei"
                  value={item.heciClei}
                  onChange={(e) => handleChange(e, i)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="mfg"
                  value={item.mfg}
                  onChange={(e) => handleChange(e, i)}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="price"
                  value={item.price}
                  onChange={(e) => handleChange(e, i)}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="quantity"
                  value={item.quantity}
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
                  value={item.productDescription}
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

import React, { memo, useState } from 'react';

const PartRow = ({ onRemove, partData, onChange }) => {
  return (
    <tr>
      <th>
        <button type="button" onClick={onRemove} title="Remove">
          <i className="fas fa-minus-circle"></i>
        </button>
      </th>
      <td>
        <input
          type="text"
          name="part"
          value={partData.part}
          onChange={onChange}
          autoComplete="off"
        />
      </td>
      <td>
        <input type="text" name="clei" value={partData.clei} onChange={onChange} />
      </td>
      <td>
        <select name="mfg" value={partData.mfg} onChange={onChange}>
          {/* Populate options dynamically based on available manufacturers */}
        </select>
      </td>
      <td>
        <select name="cond" value={partData.cond} onChange={onChange}>
          {/* Populate options dynamically based on available conditions */}
        </select>
      </td>
      <td>
        <input type="text" name="qty" value={partData.qty} onChange={onChange} />
      </td>
      <td>
        <input type="text" name="price" value={partData.price} onChange={onChange} />
      </td>
      <td>
        <input type="text" name="terms" value={partData.terms} onChange={onChange} />
      </td>
    </tr>
  );
};

const DynamicInput = () => {
  const [parts, setParts] = useState([]);

  const handlePartChange = (index, event) => {
    const newParts = [...parts];
    newParts[index] = { ...newParts[index], [event.target.name]: event.target.value };
    setParts(newParts);
  };

  const addPart = () => {
    setParts([...parts, { part: '', clei: '', mfg: '', cond: '', qty: '', price: '', terms: '' }]);
  };

  const removePart = (index) => {
    setParts(parts.filter((_, i) => i !== index));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Part# <span className="req">*</span></th>
          <th>HECI / CLEI</th>
          <th>Mfg</th>
          <th>Cond</th>
          <th>Qty <span className="req">*</span></th>
          <th>Target Price</th>
          <th>Terms</th>
        </tr>
      </thead>
      <tbody>
        {parts.map((part, index) => (
          <PartRow
            key={index}
            partData={part}
            onChange={(event) => handlePartChange(index, event)}
            onRemove={() => removePart(index)}
          />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="8">
            <button type="button" onClick={addPart}>
              Add Part
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default memo(DynamicInput);

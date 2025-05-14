import React from 'react';

const UploadsTable = ({ data }) => {
  if (!data) return <p>No Auto Uploads are currently scheduled for your user.</p>;

  return (
    <table className="border cursor-pointer">
      <thead className="bg-[#44565b] text-white text-left">
        <tr>
          <th className=" border">Uploader</th>
          <th className=" border">Time</th>
          <th className=" border">Download File</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-1 border">{data.uploader}</td>
          <td className="p-1 border">{data.time}</td>
          <td className="p-1 border">
            <a href={data.file_url} download target="_blank" rel="noopener noreferrer">
              Download
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default UploadsTable;

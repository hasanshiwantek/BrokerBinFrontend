import React from 'react';

const UploadsTable = ({ data }) => {
  if (!data) return <p>No Auto Uploads are currently scheduled for your user.</p>;

  console.log("UploadsTable data", data);

  const { data: uploads } = data;


  return (
    <table className="border cursor-pointer">
      <thead className="bg-[#44565b] text-white text-[.8vw] text-left">
        <tr className=''>
          <th className="px-2  border text-[.8vw] font-light">Uploader</th>
          <th className="px-2  border text-[.8vw] font-light">Time</th>
          <th className="px-2  border text-[.8vw] font-light">File</th>
        </tr>
      </thead>
      <tbody>
        {uploads.map(item => (
          <tr key={item.id}>
            <td className="p-1 border">{item.uploader}</td>
            <td className="p-1 border">
              {new Date(`1970-01-01T${item.time}`).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </td>
            <td className="p-1 border">
              <a href={item.file_url} download target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
                {item.file_url.split('/').pop()}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UploadsTable;

import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CompanyBio = ({ bio, setBio }) => {
  console.log("Bio: ", bio);

  const handleChange = (value) => {
    if (setBio) {
      setBio(value);
    } else {
      console.warn("setBio is not defined");
    }
  };
  const formats = ["bold", "italic", "underline", "link"];

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      ["link", "clean"],
    ],
    clipboard: {
      matchVisual: false, // optional: to avoid extra line breaks
    },
  };

  return (
    <>
      <div className=" min-w-[56vw]">
        <h2 className="text-md font-semibold mb-2">Company Bio</h2>
        <ReactQuill
          theme="snow"
          value={bio}
          onChange={handleChange}
          className="bg-white"
          style={{
            height: "10rem",
            width: "70rem",
            marginBottom: "5rem",
          }}
          modules={modules}
          formats={formats}
        />
      </div>
    </>
  );
};

export default CompanyBio;
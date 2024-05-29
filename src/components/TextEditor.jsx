import React, { useState } from "react";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6

const TextEditor = () => {
  const [value, setValue] = useState("");

  const modules = {
    toolbar: [
      ["bold", "italic"], // toggled buttons
      ["link"], // link
    ],
  };

  const formats = [
    "bold",
    "italic",
    "link", // formats corresponding to the modules
  ];

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default TextEditor;

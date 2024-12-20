import React, { useState } from "react";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6

const TextEditor = ({ comment, handleCommentChange }) => {
  const modules = {
    toolbar: [
      ["bold", "italic",],
      ["link"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <div>
      <ReactQuill
        // theme="snow"
        value={comment}
        onChange={handleCommentChange}
        modules={modules}
        formats={formats}
        style={{ height: "30vh",marginBottom:"40px",width:"40vw" }} 
      />
    </div>
  );
};

export default TextEditor;

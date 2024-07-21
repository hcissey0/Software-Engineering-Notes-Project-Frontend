import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import "./edit.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
  ],
};

function Edit() {
  const [value, setValue] = useState("");
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="editor">
            <ReactQuill
              theme="snow"
              value={value}
              onChange={() => setValue(e.target.value)}
              className="editor-input"
              modules={modules}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Edit;

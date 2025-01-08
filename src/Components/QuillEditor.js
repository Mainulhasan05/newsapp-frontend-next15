"use client";
import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export default function QuillEditor({ value, onChange }) {
  const { quill, quillRef } = useQuill();
  // {
  //   modules: {
  //     toolbar: [
  //       ['bold', 'italic', 'underline', 'strike'],
  //       [{ list: 'ordered' }, { list: 'bullet' }],
  //       [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //       ['link', 'image'],
  //       ['clean'],
  //     ],
  //   },
  //   formats: ['bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'header', 'link', 'image'],
  // }

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        onChange(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill]);

  return (
    <div className="bg-white border border-gray-300 rounded-md">
      <div ref={quillRef} style={{ height: "300px" }} className="h-64" />
    </div>
  );
}

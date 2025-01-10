"use client";
import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export default function QuillEditor({ value, onChange, isEdit = false }) {
  const { quill, quillRef } = useQuill();
  const [effectWorked, setEffectWorked] = useState(false);

  useEffect(() => {
    if (quill) {
      if (isEdit && value) {
        quill.root.innerHTML = value;
      }
      quill.on("text-change", (delta, oldDelta, source) => {
        onChange(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill]);
  // value
  useEffect(() => {
    if (quill) {
      if (isEdit && value && !effectWorked) {
        quill.root.innerHTML = value;
        setEffectWorked(true);
      }
    }
  }, [value]);

  return (
    <div className="bg-white border border-gray-300 rounded-md">
      <div ref={quillRef} style={{ height: "300px" }} className="h-64" />
    </div>
  );
}

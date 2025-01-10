// components/NewsTip.js
import React from "react";

const NewsTip = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-8 rounded-lg shadow-xl max-w-xl mx-auto border-4 border-blue-700">
      <p className="text-xl text-white font-bold">
        আপনার চারপাশে ঘটে যাওয়া খবর, খবরের পিছনের খবর সরাসরি সংবাদ যোগ'কে জানাতে
        ই-মেইল করুন নিচের ঠিকানায়-
      </p>
      <a
        href="mailto:songbadzog@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-yellow-300 font-bold underline mt-6 block text-2xl"
      >
        songbadzog@gmail.com
      </a>
      <p className="text-xl text-white mt-4">
        আপনার পাঠানো তথ্যের বস্তুনিষ্ঠতা যাচাই করে আমরা তা প্রকাশ করব।
      </p>
    </div>
  );
};

export default NewsTip;

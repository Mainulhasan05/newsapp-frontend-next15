"use client";
import React, { useEffect, useState } from "react";
import {
  Facebook,
  Linkedin,
  Twitter,
  Send,
  Clock,
  User,
  Tag,
  ChevronRight,
} from "lucide-react";

const ShareComponent = () => {
  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  //   const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  return (
    <div className="flex space-x-4 mb-8">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 transition-colors"
      >
        <Facebook size={24} />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-600 transition-colors"
      >
        <Twitter size={24} />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 hover:text-blue-900 transition-colors"
      >
        <Linkedin size={24} />
      </a>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(
          `Check out this article: ${shareUrl}`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-600 hover:text-green-800 transition-colors"
      >
        <Send size={24} />
      </a>
    </div>
  );
};

export default ShareComponent;

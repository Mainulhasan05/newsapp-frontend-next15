import Image from "next/image";
import React from "react";

const ImageComponent = ({ src, width, height, alt, className, ...props }) => {
  return (
    <Image
      src={src ? (src == "" ? "/images/default.png" : src) : "/images/logo.png"}
      width={width}
      height={height}
      alt={alt}
      className={className}
      {...props}
    />
  );
};

export default ImageComponent;

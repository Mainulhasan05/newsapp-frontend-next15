"use client";
import Image from "next/image";
import React, { useState } from "react";
import getTimeAgo from "@/utils/getTimeAgo";

const FeaturedArticle = ({ featuredArticle }) => {
  return (
    <div className="mb-12">
      <div className="relative aspect-[16/9] mb-4">
        <Image
          src={featuredArticle?.featuredImage}
          alt={featuredArticle?.title}
          fill
          className="object-cover rounded-lg"
        />
        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
          {getTimeAgo(featuredArticle?.createdAt)}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>{featuredArticle?.category?.name}</span>
          <span>
            {new Date(featuredArticle?.createdAt).toLocaleDateString("bn-BD", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <h1 className="text-3xl font-bold">{featuredArticle?.title}</h1>
      </div>
    </div>
  );
};

export default FeaturedArticle;

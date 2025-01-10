import ImageComponent from "@/Components/ImageComponent";
import getTimeAgo from "@/utils/getTimeAgo";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LatestNews = ({ latestNews }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {latestNews.map((news, index) => (
        <Link key={index} href={`/news/${news?.slug}`} passHref>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer">
            <div className="relative aspect-[4/3]">
              {/* <Image
                src={news?.featuredImage}
                alt={news?.title}
                fill
                className="object-cover"
              /> */}
              <ImageComponent
                src={news?.featuredImage}
                alt={news?.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                {getTimeAgo(news?.createdAt)}
              </div>
            </div>
            <div className="p-4">
              <span className="text-sm text-red-600">
                {news.category?.name}
              </span>
              <h2 className="text-xl font-semibold mt-2">{news?.title}</h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LatestNews;

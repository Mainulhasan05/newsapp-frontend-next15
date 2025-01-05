import Link from "next/link";
import Image from "next/image";

import Advertisement from "@/Components/Advertisement/Advertisement";

export default function Home() {
  const featuredNews = {
    title: "Breaking News: Major Development in Global Politics",
    image: "/placeholder.svg?height=400&width=600",
    category: "Politics",
    date: "January 4, 2024",
  };

  const latestNews = [
    {
      title: "Economic Growth Surpasses Expectations",
      category: "Business",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "New Technology Breakthrough Announced",
      category: "Technology",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Sports Team Wins Championship",
      category: "Sports",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  const sideNews = [
    {
      title: "Latest Updates on Local Politics",
      category: "Politics",
      time: "2 hours ago",
    },
    {
      title: "Weather Forecast for the Week",
      category: "Weather",
      time: "3 hours ago",
    },
    {
      title: "Entertainment Industry News",
      category: "Entertainment",
      time: "4 hours ago",
    },
  ];

  const bottomSections = [
    {
      title: "International",
      articles: [
        {
          title: "Global Summit Concludes with New Agreements",
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          title: "Climate Change Conference Highlights",
          image: "/placeholder.svg?height=150&width=200",
        },
      ],
    },
    {
      title: "Business",
      articles: [
        {
          title: "Stock Market Reaches New Heights",
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          title: "Tech Companies Report Strong Earnings",
          image: "/placeholder.svg?height=150&width=200",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Featured News */}
          <div className="mb-12">
            <div className="relative aspect-[16/9] mb-4">
              <Image
                src={featuredNews.image}
                alt={featuredNews.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>{featuredNews.category}</span>
                <span>{featuredNews.date}</span>
              </div>
              <h1 className="text-3xl font-bold">{featuredNews.title}</h1>
            </div>
          </div>

          {/* Latest News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {latestNews.map((news, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <span className="text-sm text-red-600">{news.category}</span>
                  <h2 className="text-xl font-semibold mt-2">{news.title}</h2>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bottomSections.map((section) => (
              <div key={section.title}>
                <h2 className="text-2xl font-bold mb-4 border-b-2 border-red-600 pb-2">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.articles.map((article, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="relative w-32 h-24">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <h3 className="flex-1 font-semibold">{article.title}</h3>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side News and Advertisements */}
        <div className="lg:w-1/4">
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-bold mb-4 border-b-2 border-red-600 pb-2">
              Latest Updates
            </h2>
            <div className="space-y-4">
              {sideNews.map((news, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                >
                  <span className="text-sm text-red-600 block">
                    {news.category}
                  </span>
                  <h3 className="font-semibold mb-1">{news.title}</h3>
                  <span className="text-sm text-gray-500">{news.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Advertisement Sections */}
          <Advertisement
            src="/placeholder.svg?height=250&width=300"
            alt="Advertisement 1"
            width={300}
            height={250}
          />
          <Advertisement
            src="/placeholder.svg?height=250&width=300"
            alt="Advertisement 2"
            width={300}
            height={250}
          />
          <Advertisement
            src="/placeholder.svg?height=250&width=300"
            alt="Advertisement 3"
            width={300}
            height={250}
          />
        </div>
      </div>
    </div>
  );
}

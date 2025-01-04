import Link from "next/link";
import Image from "next/image";

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

  return (
    <div className="container mx-auto px-4 py-8">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    </div>
  );
}

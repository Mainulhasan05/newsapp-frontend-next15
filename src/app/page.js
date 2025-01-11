import Image from "next/image";

import Advertisement from "@/Components/Advertisement/Advertisement";
import FeaturedArticle from "@/Components/Home/FeaturedArticle/FeaturedArticle";
import LatestNews from "@/Components/Home/LatestNews/LatestNews";
import ImageComponent from "@/Components/ImageComponent";
import getTimeAgo from "@/utils/getTimeAgo";
import Link from "next/link";

const getHomePageData = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/home`, {
      next: {
        revalidate: 1,
      },
    });
    return response.json().then((data) => data?.data);
  } catch (error) {
    console.error("Error fetching home page data:", error.message);
    return null;
  }
};

export default async function Home() {
  const homePageData = await getHomePageData();

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
          <FeaturedArticle featuredArticle={homePageData?.featuredArticle} />
          {/* Latest News Grid */}
          <LatestNews latestNews={homePageData?.latestArticles} />
          {/* Bottom Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {homePageData?.allArticles?.map((section, index) => (
              <div className="mb-6" key={index}>
                <h2 className="text-2xl font-bold mb-4 border-b-2 border-red-600 pb-2">
                  {section.category?.name}
                </h2>
                <div className="space-y-4">
                  {section?.articles?.map((article, index) => (
                    <Link
                      href={`/news/${article?.slug}`}
                      key={index}
                      className="flex gap-4"
                    >
                      <div className="relative w-32 h-24">
                        <ImageComponent
                          src={article.featuredImage}
                          alt={article.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <h3 className="flex-1 font-semibold">
                          {article.title}
                        </h3>
                        <span className="text-sm text-red-600 block">
                          {getTimeAgo(article.createdAt)}
                        </span>
                      </div>
                    </Link>
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
            src="/images/codesharer.webp"
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

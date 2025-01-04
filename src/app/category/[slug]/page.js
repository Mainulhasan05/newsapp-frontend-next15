import Image from "next/image";
import Link from "next/link";
import MoveToTop from "@/Components/moveToTop";

export default function CategoryPage({ params }) {
  // Sample data - replace with actual data fetching
  const categoryNews = [
    {
      id: 1,
      title: "Major Political Development Shapes Future Policy",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/placeholder.svg?height=200&width=300",
      date: "January 4, 2024",
      category: "Politics",
    },
    {
      id: 2,
      title: "Economic Reforms Lead to Market Growth",
      excerpt:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "/placeholder.svg?height=200&width=300",
      date: "January 4, 2024",
      category: "Politics",
    },
    {
      id: 3,
      title: "New Policy Implementation Begins",
      excerpt:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "/placeholder.svg?height=200&width=300",
      date: "January 4, 2024",
      category: "Politics",
    },
  ];

  const popularNews = [
    {
      title: "Important Development in Local Politics",
      date: "January 4, 2024",
    },
    {
      title: "Key Policy Changes Announced",
      date: "January 4, 2024",
    },
    {
      title: "Latest Political Survey Results",
      date: "January 4, 2024",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-3/4">
          <h1 className="text-3xl font-bold mb-8 border-b-2 border-red-600 pb-2">
            Politics
          </h1>

          <div className="space-y-8">
            {categoryNews.map((article) => (
              <article
                key={article.id}
                className="flex flex-col md:flex-row gap-6 pb-8 border-b border-gray-200"
              >
                <div className="md:w-1/3">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <span>{article.category}</span>
                    <span>{article.date}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <Link
                    href={`/article/${article.id}`}
                    className="text-red-600 hover:text-red-700"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center space-x-2 mt-8">
            <button className="px-4 py-2 border rounded hover:bg-gray-50">
              Previous
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              1
            </button>
            <button className="px-4 py-2 border rounded hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 border rounded hover:bg-gray-50">
              3
            </button>
            <button className="px-4 py-2 border rounded hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4 border-b-2 border-red-600 pb-2">
              Popular in Politics
            </h2>
            <div className="space-y-4">
              {popularNews.map((news, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                >
                  <h3 className="font-semibold mb-1">{news.title}</h3>
                  <span className="text-sm text-gray-500">{news.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <MoveToTop />
    </div>
  );
}

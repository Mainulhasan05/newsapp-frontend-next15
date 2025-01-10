import Image from "next/image";
import Link from "next/link";
import { Clock, User, Tag, ChevronRight } from "lucide-react";
import ShareComponent from "@/Components/News/ShareComponent";
import CommentSection from "@/Components/News/CommentSection";
export const revalidate = 60;
import axiosInstance from "@/utils/axiosInstance";
import parse from "html-react-parser";

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

const advertisements = [
  { id: 1, imageUrl: "/images/codesharer.webp", link: "#" },
  { id: 2, imageUrl: "/images/codesharer.webp", link: "#" },
];

const getArticle = async (slug) => {
  try {
    const response = await axiosInstance.get(`/api/home/news/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
};

export default async function ArticleDetail({ params }) {
  const resolvedParams = await params;
  const { data } = await getArticle(resolvedParams.slug);
  const { article, relatedArticles } = data;

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-gray-600 text-sm" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <ChevronRight size={16} />
          <li className="inline-flex items-center">
            <Link href="/news" className="hover:text-blue-600">
              News
            </Link>
          </li>
          <ChevronRight size={16} />
          <li className="inline-flex items-center">
            <span className="text-gray-400">{article?.title}</span>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{article?.title}</h1>
          <div className="flex items-center text-gray-600 mb-6">
            <User size={18} className="mr-2" />
            <span className="mr-4">{article?.author?.name}</span>
            <Clock size={18} className="mr-2" />
            <span>{formatDate(article?.createdAt)}</span>
          </div>
          <div className="mb-6">
            <Image
              src={article?.featuredImage}
              alt={article?.title}
              width={500}
              height={300}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="prose max-w-none mb-8">
            {parse(article?.content ? article?.content : "")}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {article?.tags?.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                <Tag size={14} className="inline mr-1" />
                {tag}
              </span>
            ))}
          </div>

          {/* Share Icons */}
          <ShareComponent />

          {/* Comments Section */}
          <CommentSection />
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3">
          {/* Related Articles */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
            <div className="space-y-4">
              {relatedArticles.map((article) => (
                <div key={article.id} className="flex items-center space-x-4">
                  <Image
                    src={article.featuredImage}
                    alt={article?.title}
                    width={80}
                    height={60}
                    className="rounded-md"
                  />
                  <Link
                    href={`/news/${article.slug}`}
                    className="text-blue-600 hover:underline flex-1"
                  >
                    {article.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Advertisements */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Advertisements</h2>
            {advertisements.map((ad) => (
              <div key={ad.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <a href={ad.link} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={ad.imageUrl}
                    alt="Advertisement"
                    width={300}
                    height={250}
                    className="w-full h-auto rounded-md"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

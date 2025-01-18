import Image from "next/image";
import Link from "next/link";
import { Clock, User, Tag, ChevronRight } from "lucide-react";
import ShareComponent from "@/Components/News/ShareComponent";
import CommentSection from "@/Components/News/CommentSection";
export const revalidate = 60;
import axiosInstance from "@/utils/axiosInstance";
import parse from "html-react-parser";
import NewsTip from "@/Components/News/NewsTip";
import Head from "next/head";
import ImageComponent from "@/Components/ImageComponent";

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
export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const { data } = await getArticle(slug);
  const article = data?.article;

  return {
    title: article?.title || "News Article",
    description: article?.summary || article?.content?.substring(0, 160),
    openGraph: {
      title: article?.title || "News Article",
      description: article?.summary || article?.content?.substring(0, 160),
      url: `https://songbadzog.com/news/${slug}`,
      images: [
        {
          url: article?.featuredImage || "/images/default.jpg",
          alt: article?.title || "News Article",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article?.title || "News Article",
      description: article?.summary || article?.content?.substring(0, 160),
      image: article?.featuredImage || "/images/default.jpg",
    },
  };
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
    return new Date(dateString).toLocaleDateString("bn-BD", options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{article?.title || "News Article"}</title>
        <meta
          name="description"
          content={article?.summary || article?.content?.substring(0, 160)}
        />
        <meta property="og:title" content={article?.title || "News Article"} />
        <meta
          property="og:description"
          content={article?.summary || article?.content?.substring(0, 160)}
        />
        <meta
          property="og:url"
          content={`https://songbadzog.com/news/${resolvedParams.slug}`}
        />
        <meta
          property="og:image"
          content={article?.featuredImage || "/images/default.jpg"}
        />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article?.title || "News Article"} />
        <meta
          name="twitter:description"
          content={article?.summary || article?.content?.substring(0, 160)}
        />
        <meta
          name="twitter:image"
          content={article?.featuredImage || "/images/default.jpg"}
        />
      </Head>

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
            <ImageComponent
              src={
                article?.featuredImage
                  ? article?.featuredImage == ""
                    ? "/images/default.jpg"
                    : article?.featuredImage
                  : "/images/default.jpg"
              }
              alt={article?.title}
              width={450}
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
          <NewsTip />
          <br />
          {/* Comments Section */}
          <CommentSection />
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3">
          {/* Related Articles */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
            <div className="space-y-4">
              {relatedArticles?.map((article, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <ImageComponent
                    src={article?.featuredImage}
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
            {advertisements?.map((ad, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
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

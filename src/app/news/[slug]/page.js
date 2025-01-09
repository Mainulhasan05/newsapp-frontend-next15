"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Clock, User, Tag, ChevronRight } from "lucide-react";
import ShareComponent from "@/Components/News/ShareComponent";

// Dummy data (replace with actual data fetching logic)
const article = {
  title: "Breaking News: Major Development in Global Politics",
  image: "/placeholder.svg",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  author: "John Doe",
  date: "2023-05-15T14:30:00Z",
  category: "Politics",
  tags: ["Global", "Politics", "Breaking News"],
};

const relatedArticles = [
  {
    id: 1,
    title: "Related Article 1",
    slug: "related-article-1",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Related Article 2",
    slug: "related-article-2",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Related Article 3",
    slug: "related-article-3",
    image: "/placeholder.svg",
  },
];

const advertisements = [
  { id: 1, imageUrl: "/placeholder.svg", link: "#" },
  { id: 2, imageUrl: "/placeholder.svg", link: "#" },
];

export default function ArticleDetail() {
  const { slug } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch article data based on slug
    // For now, we're using dummy data
  }, [slug]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          text: newComment,
          author: "Anonymous",
          date: new Date(),
        },
      ]);
      setNewComment("");
    }
  };

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
            <span className="text-gray-400">{article.title}</span>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center text-gray-600 mb-6">
            <User size={18} className="mr-2" />
            <span className="mr-4">{article.author}</span>
            <Clock size={18} className="mr-2" />
            <span>{formatDate(article.date)}</span>
          </div>
          <div className="mb-6">
            <Image
              src={article.image}
              alt={article.title}
              width={800}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="prose max-w-none mb-8">{article.content}</div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((tag, index) => (
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
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white p-4 rounded-lg shadow mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">{comment.author}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(comment.date)}
                  </p>
                </div>
                <p>{comment.text}</p>
              </div>
            ))}
            <form onSubmit={handleCommentSubmit} className="mt-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Post Comment
              </button>
            </form>
          </div>
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
                    src={article.image}
                    alt={article.title}
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

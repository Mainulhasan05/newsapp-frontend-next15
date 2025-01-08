"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  fetchArticles,
  deleteArticle,
} from "@/store/features/articles/articleSlice";
import ArticleList from "@/Components/Dashboard/Articles/ArticleList";
import Pagination from "@/Components/Pagination";
import SearchBar from "@/Components/SearchBar";

export default function ArticlesPage() {
  const dispatch = useDispatch();
  const { articles, totalPages, currentPage, loading, error } = useSelector(
    (state) => state.articles
  );
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   dispatch(fetchArticles({ page: 1, searchTerm }));
  // }, [dispatch, searchTerm]);

  const handlePageChange = (page) => {
    dispatch(fetchArticles({ page, searchTerm }));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleDelete = (articleId) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      dispatch(deleteArticle(articleId));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Link
          href="/dashboard/articles/new"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Article
        </Link>
      </div>
      <SearchBar onSearch={handleSearch} />
      <ArticleList articles={articles} onDelete={handleDelete} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

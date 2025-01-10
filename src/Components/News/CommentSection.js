"use client";
import React, { useState } from "react";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
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
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">{comment.author}</p>
            <p className="text-sm text-gray-500">{formatDate(comment.date)}</p>
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
  );
};

export default CommentSection;

import Link from "next/link";

export default function ArticleList({ articles, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Sl. No.
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Author
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Category
            </th>
            {/* isFeatured */}
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Featured
            </th>
            {/* createdAt */}
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr key={article._id}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {article?.title?.slice(0, 20)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {article?.author?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {article?.category?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {article?.isFeatured ? "Yes" : "No"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-blue-500">
                  {new Date(article?.createdAt).toLocaleTimeString()}
                </span>
                <span className="text-gray-500"> | </span>
                <span className="text-purple-500">
                  {new Date(article?.createdAt).toDateString()}
                </span>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                {/* set color and bold based on status */}
                {/* status could be published, archieve, draft */}
                <span
                  className={`${
                    article?.status === "published"
                      ? "text-green-500 font-bold"
                      : article?.status === "archived"
                      ? "text-red-500 font-bold"
                      : "text-gray-500"
                  }`}
                >
                  {article?.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link
                  href={`/dashboard/articles/edit/${article._id}`}
                  className="text-blue-600 hover:text-blue-900 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(article._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

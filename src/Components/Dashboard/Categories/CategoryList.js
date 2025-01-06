export default function CategoryList({ categories, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Slug
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
          {categories.map((category) => (
            <tr key={category._id}>
              <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{category.slug}</td>
              <td className="px-6 py-4 whitespace-nowrap">{category.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onEdit(category)}
                  className="text-blue-600 hover:text-blue-900 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(category._id)}
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

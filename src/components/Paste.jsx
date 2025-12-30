import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Edit, Eye, Trash2, Copy, Share } from "lucide-react";

const Paste = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes);
  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };
  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard");
  };

 const handleShare = (pasteId) => {
  const url = `${window.location.origin}/pastes/${pasteId}`;
  navigator.clipboard.writeText(url);
  toast.success("Link copied to clipboard");
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          My Pastes
        </h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search pastes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200"
          />
        </div>

        <div className="space-y-4">
          {filterData.length > 0 ? (
            filterData.map((paste) => (
              <div
                key={paste?._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 truncate">
                    {paste.title}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {new Date(paste.createAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 line-clamp-3 font-mono text-sm bg-gray-50 p-3 rounded-lg">
                    {paste.content.length > 200
                      ? `${paste.content.substring(0, 200)}...`
                      : paste.content}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Link
                    to={`/?pasteId=${paste?._id}`}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition duration-200"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </Link>
                  <Link
                    to={`/pastes/${paste._id}`}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition duration-200"
                    title="View"
                  >
                    <Eye size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(paste?._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-200"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    onClick={() => handleCopy(paste.content)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
                    title="Copy"
                  >
                    <Copy size={18} />
                  </button>
                  <button
                    onClick={() => handleShare(paste._id)}
                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition duration-200"
                    title="Share"
                  >
                    <Share size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No pastes found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;

import React from "react";
import {useSelector } from "react-redux";
import { useParams} from "react-router-dom";
const ViewPaste = () => {
    const {id} =useParams();
    const allPaste =useSelector((state)=>state.paste.pastes);
    const paste = allPaste.filter((p)=>p._id===id)[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={paste.title}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              value={paste.content}
              readOnly
              className="w-full h-60 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed outline-none resize-none font-mono text-sm overflow-y-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewPaste

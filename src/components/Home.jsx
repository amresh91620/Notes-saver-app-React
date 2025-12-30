import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchPrams, setSearchPrams] = useSearchParams();
  const pasteId = searchPrams.get("pasteId");
  const dispatch = useDispatch();

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createAt: new Date().toISOString(),
    };
    if (pasteId) {
      //update
      dispatch(updateToPastes(paste));
    } else {
      //create
      dispatch(addToPastes(paste));
    }
    //after creation or updation
    setTitle("");
    setValue("");
    setSearchPrams({});
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {pasteId ? "Edit Your Paste" : "Create New Paste"}
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter title here..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              value={value}
              placeholder="Enter content here..."
              onChange={(e) => setValue(e.target.value)}
              className="w-full h-60 px-4 py-3 border border-gray-300 rounded-lg 
             focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
             outline-none transition duration-200 resize-none 
             font-mono text-sm overflow-y-auto"
            />
          </div>

          <button
            onClick={createPaste}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 shadow-md"
          >
            {pasteId ? "Update My Paste" : "Create My Paste"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

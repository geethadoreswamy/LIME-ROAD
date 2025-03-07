import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("women"); // Default category
  const navigate = useNavigate();


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${searchInput}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-sm font-semibold mb-2">Q. What are you looking for?</h3>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter 3 or more characters"
            className="border border-gray-300 rounded-lg px-4 py-2 w-64 text-sm"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)} 
            className="ml-2 border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kids">Kids</option>
          </select>
          <button type="submit" className="ml-2 bg-blue-500 text-white rounded-lg px-4 py-2">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchPage;

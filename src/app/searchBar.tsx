"use client";
import React, { useState, useRef, useEffect } from "react";
import searchBarIcon from "../assets/images/search-icon.png";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState(""); 
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <button onClick={toggleSearch}>
        <img
          src={searchBarIcon.src}
          alt="Search Icon"
          className="h-5 ml-3"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white border rounded shadow-md p-2">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search Emails..."
            value={searchText} 
            onChange={(e) => setSearchText(e.target.value)} 
            className="border p-1 rounded"
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;

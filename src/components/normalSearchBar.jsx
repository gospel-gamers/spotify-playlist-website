import './NormalSearchBar.css';
import React, { useState } from 'react';

function NormalSearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search Spotify..." value={searchTerm} onChange={handleInputChange}/>
      <button onClick={handleSearch} className="search-button">Search</button>
    </div>
  );
}

export default NormalSearchBar;

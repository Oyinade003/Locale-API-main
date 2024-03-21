import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function SearchForm({ onSearch, searchTerm }) {
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.trim() === '') {
        setSearchResults([]);
        return;
      }

      const apiKey = 'your-api-key';
      const response = await axios.get(`/api/search?q=${searchTerm}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` },
      });
      setSearchResults(response.data);
    };
    fetchSearchResults();
  }, [searchTerm]);

  const handleSearchInputChange = (e) => {
    onSearch(e.target.value);
  };

  const handleResultClick = (result) => {
    const { type, id } = result;
    history.push(`/search/${type}/${id}`);
  };

  return (
    <div>
      <h2>Search</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchInputChange}
        placeholder="Search for regions, states, or LGAs"
      />
      <ul>
        {searchResults.map((result) => (
          <li key={result.id} onClick={() => handleResultClick(result)}>
            {result.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchForm;
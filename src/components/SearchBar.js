import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = props => {
  const [query, setQuery] = useState('');
  const [timer, setTimer] = useState(null);

  const inputChanged = e => {
    setQuery(e.target.value);

    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      props.handleQuery(query);
    }, 500);

    setTimer(newTimer);
  };

  return (
    <div className="search-bar">
      <label>Search Crypto</label>
      <input placeholder="Enter Cryptocurrency" onChange={inputChanged} />
    </div>
  );
};

export default SearchBar;

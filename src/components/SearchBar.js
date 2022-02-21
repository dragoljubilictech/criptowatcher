import React, { useRef, useState } from 'react';
import './SearchBar.css';

const SearchBar = props => {
  const [timer, setTimer] = useState(null);
  const inputValue = useRef();

  const inputChanged = e => {
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      props.handleQuery(inputValue.current.value);
    }, 500);

    setTimer(newTimer);
  };
  return (
    <div className="search-bar">
      <label>Search Crypto</label>
      <input
        type="search"
        placeholder="  Enter Cryptocurrency"
        onChange={inputChanged}
        ref={inputValue}
      />
    </div>
  );
};

export default SearchBar;

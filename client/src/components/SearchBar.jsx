import { useState } from "react";

const SearchBar = ({ onSearch, placeholder }) => {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={placeholder || "Search books by title, author or category..."}
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button type="submit">🔍 Search</button>
    </form>
  );
};

export default SearchBar;

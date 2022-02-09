import { useState } from "react";
import { BsSearch } from "react-icons/bs";

const SearchBar = ({ searchQuery }) => {
  const [query, setQuery] = useState("");

  function handleSearchClick() {
    searchQuery(query);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") searchQuery(query);
  }

  return (
    <div className="flex border-2 rounded-2xl h-12">
      <button
        onClick={handleSearchClick}
        className="flex items-center justify-center px-4 border-r"
      >
        <BsSearch />
      </button>

      <input
        type="text"
        placeholder="Search for products"
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => handleKeyDown(event)}
        value={query}
        className="px-4 py-2 w-80 rounded-2xl border-0"
      />
    </div>
  );
};

export default SearchBar;

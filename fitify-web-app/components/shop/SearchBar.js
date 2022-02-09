import { useState } from "react";
import { BsSearch } from "react-icons/bs";

const SearchBar = ({ searchQuery }) => {
  const [query, setQuery] = useState("");

  function handleSearchClick() {
    searchQuery(query);
  }

  return (
    <div className="border-black border-2 flex flex-row h-24">
      <button onClick={handleSearchClick}>
        <BsSearch />
      </button>

      <input
        type="text"
        placeholder="Search for products"
        onChange={(event) => setQuery(event.target.value)}
        value={query}
      />
    </div>
  );
};

export default SearchBar;

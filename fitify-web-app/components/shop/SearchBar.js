import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/router";

const SearchBar = ({ searchQuery }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  function handleSearchClick() {
    if (query != "") router.push(`/shop?search=${query}`);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && query != "")
      router.push(`/shop?search=${query}`);
  }

  return (
    <div className="flex border-2 rounded-2xl md:h-12 h-10 border-black self-end md:w-auto w-2/3">
      <button
        onClick={handleSearchClick}
        className="flex items-center justify-center px-4 border-r border-black"
      >
        <BsSearch />
      </button>

      <input
        type="text"
        placeholder="Search for products"
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => handleKeyDown(event)}
        value={query}
        className="px-4 py-2 md:w-80 w-full rounded-2xl rounded-l-none border-0"
      />
    </div>
  );
};

export default SearchBar;

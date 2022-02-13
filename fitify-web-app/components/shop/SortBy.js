import { sortingOptions } from "constants/filters";
import { useState } from "react";

const SortBy = ({ setSortingOption }) => {
  const [option, setOption] = useState("");

  const handleSetSortingOption = (value) => {
    // Lokalno postavlja opciju i salje je parentu
    setOption(value);
    setSortingOption(value);
  };

  return (
    <div className=" md:w-60 w-36 border-black border-2 md:h-auto h-9">
      <select
        name="sort"
        id="sort"
        className="w-full py-1"
        onChange={(e) => handleSetSortingOption(e.target.value)}
        value={option}
      >
        <option value={""} disabled hidden>
          Sort By
        </option>
        {sortingOptions.map((option) => (
          <option value={option.id} key={option.id}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortBy;

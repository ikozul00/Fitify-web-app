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
    <div className="mx-10 my-10 w-60 border-black border-2">
      <select
        name="sort"
        id="sort"
        className="w-full"
        onChange={(e) => handleSetSortingOption(e.target.value)}
        value={option}
      >
        <option value={""} selected disabled hidden>
          Sort By
        </option>
        {sortingOptions.map((option) => (
          <option value={option.id}>{option.title}</option>
        ))}
      </select>
    </div>
  );
};

export default SortBy;

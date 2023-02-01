import React from "react";

import { TbArrowsSort } from "react-icons/tb";

const SortByq = ({ sortByValue, setSortByValue, setSearchTerm }) => {
  const handleChange = e => {
    setSearchTerm({ sort_by: e.target.value });
    setSortByValue(e.target.value);
  };

  return (
    <div className="sort-container">
      <label className="query-options">
        <TbArrowsSort size={30} />
        <select
          className="order-btn"
          onChange={handleChange}
          value={sortByValue}
        >
          <option value="votes">Votes</option>
          <option value="created_at">Date</option>
          <option value="owner">Owner</option>
          <option value="title">Title</option>
        </select>
      </label>
    </div>
  );
};

export default SortByq;

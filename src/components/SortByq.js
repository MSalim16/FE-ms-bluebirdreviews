import React from "react";

const SortByq = ({ sortByValue, setSortByValue, setSearchTerm }) => {
  const handleChange = e => {
    setSearchTerm({ sort_by: e.target.value });
    setSortByValue(e.target.value);
  };

  return (
    <div>
      <label className="query-options">
        <h3 className="sort-by">sort by:</h3>
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

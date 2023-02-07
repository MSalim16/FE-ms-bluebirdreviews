import React from "react";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";

const OrderBy = ({ setOrderByValue, setSearchTerm, sortByValue }) => {
  const handleAscClick = e => {
    setSearchTerm({ sort_by: sortByValue, order: e.target.value });
    setOrderByValue(e.target.value);
  };

  const handleDescClick = e => {
    setSearchTerm({ sort_by: sortByValue, order: e.target.value });
    setOrderByValue(e.target.value);
  };

  return (
    <>
      <div className="orders">
        <button onClick={handleAscClick} value="asc" className="order-btn1">
          <BsFillArrowUpCircleFill className="uparrow" size={30} />
        </button>
        <button onClick={handleDescClick} value="desc" className="order-btn2">
          <BsFillArrowDownCircleFill className="downarrow" size={30} />
        </button>
      </div>
    </>
  );
};

export default OrderBy;

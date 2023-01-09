import React from "react";

const reviewCards = (review) => {
  console.log(review, "<< item from item card");

  return (
    <>
      <h2 className="item-name">{review.review.title}</h2>
    </>
  );
};

export default reviewCards;

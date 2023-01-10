import React from "react";

const ReviewCard = (review) => {
  return (
    <>
      <div className="item-card">
        <h2 className="item-name">{review.title}</h2>
        <img className="item-img" src={review.review_img_url}></img>
      </div>
    </>
  );
};

export default ReviewCard;

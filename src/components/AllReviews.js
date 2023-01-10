import React from "react";
import { fetchReviews } from "../api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReviewCard from "./ReviewCard";

const AllReviews = () => {
  const [reviews, setReviews] = useState([{}]);

  useEffect(() => {
    fetchReviews().then((reviewsFromApi) => {
      console.log(reviewsFromApi);
      setReviews(reviewsFromApi);
    });
  }, []);

  return (
    <div>
      <ul className="itemListWrapper">
        {reviews.map((review) => {
          return (
            <li className="list">
              <Link to={review}>
                <ReviewCard key={review.review_id} {...review} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AllReviews;

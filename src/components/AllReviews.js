import { getReviews } from "../api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReviewCard from "./ReviewCard";

const AllReviews = () => {
  const [reviews, setReviews] = useState([{}]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getReviews().then((reviewsFromApi) => {
      setIsLoading(false);
      setReviews(reviewsFromApi);
    });
  }, []);

  if (isLoading) {
    return <h1>...Page is Loading</h1>;
  }
  return (
    <div>
      <ul className="itemListWrapper">
        {reviews.map((review) => {
          return (
            <li className="list">
              <Link to={`${review.review_id}`}>
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

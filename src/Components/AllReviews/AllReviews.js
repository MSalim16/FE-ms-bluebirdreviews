import { fetchReviews } from "../../api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import reviewCards from "../ReviewCards";

const AllReviews = () => {
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    fetchReviews().then((reviewsFromapi) => {
      setReviews(reviewsFromapi);
    });
  }, []);

  return (
    <div>
      hello
      <ul className="itemListWrapper">
        {reviews.map((review) => console.log(review))}
      </ul>
    </div>
  );
};

export default AllReviews;

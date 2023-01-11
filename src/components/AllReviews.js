import { getReviews } from "../api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
            <li className="list" key={review.review_id}>
              <div className="item-card">
                <h2 className="item-name">{review.title}</h2>
                <img className="item-img" src={review.review_img_url}></img>

                <Link to={`/reviews/${review.review_id}`}>
                  <div className="read-more">
                    <em>...</em>
                    <strong>read more</strong>
                  </div>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AllReviews;

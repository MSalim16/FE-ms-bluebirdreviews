import { getReviews } from "../api";
import { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import SortandOrderReviews from "./SortandOrderReviews";

const AllReviews = () => {
  const [reviews, setReviews] = useState([{}]);

  const [isLoading, setIsLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    getReviews(category).then(reviewsFromApi => {
      setReviews(reviewsFromApi);
      setIsLoading(false);
    });
  }, [category]);

  if (isLoading) {
    return <h1>...All Reviews are Loading</h1>;
  }
  return (
    <div>
      <SortandOrderReviews setReviews={setReviews} />
      <ul className="itemListWrapper">
        {reviews.map(review => {
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

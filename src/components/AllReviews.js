/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import { getReviews } from "../api";
import userContext from "../contexts/User";
import { useState, useEffect, useContext } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import SortandOrderReviews from "./SortandOrderReviews";

import { FaRegComment, FaRegHeart } from "react-icons/fa";

const AllReviews = () => {
  const [reviews, setReviews] = useState([{}]);

  const [isLoading, setIsLoading] = useState(true);
  const { category } = useParams();

  const { user } = useContext(userContext);

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

      {reviews.map(review => {
        return (
          <li className="list" key={review.review_id}>
            <Link to={`/reviews/${review.review_id}`}>
              <div className="item-card">
                <div className="tweet">
                  <div className="twitter-handle">
                    {review.owner === "cooljmessy" && (
                      <img
                        className="avatar-img"
                        src="https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002"
                      ></img>
                    )}
                    {review.owner === "tickle122" && (
                      <img
                        className="avatar-img"
                        src="https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953"
                      ></img>
                    )}
                    {review.owner === "jessjelly" && (
                      <img
                        className="avatar-img"
                        src="https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141"
                      ></img>
                    )}
                    {review.owner === "weegembump" && (
                      <img
                        className="avatar-img"
                        src="https://vignette.wikia.nocookie.net/mrmen/images/7/7e/MrMen-Bump.png/revision/latest?cb=20180123225553"
                      ></img>
                    )}
                    {review.owner === "grumpy19" && (
                      <img
                        className="avatar-img"
                        src="https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013"
                      ></img>
                    )}
                    {review.owner === "happyamy2016" && (
                      <img
                        className="avatar-img"
                        src="https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729"
                      ></img>
                    )}
                    <h1 className="author"> @{review.owner}</h1>
                    {console.log(review)}
                    <h5 className="createdat">
                      {" "}
                      {new Date(review.created_at).toLocaleString()}{" "}
                    </h5>
                  </div>
                  <h3 className="item-name">{review.title}</h3>
                  <img className="item-img" src={review.review_img_url}></img>
                  <div className="like-comments">
                    <div className="comment">
                      <FaRegComment size={15} />
                      <span className="comment-text">
                        {review.comment_count}
                      </span>
                    </div>
                    <div className="like">
                      <FaRegHeart size={15} />
                      <span className="comment-text">{review.votes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </div>
  );
};

export default AllReviews;

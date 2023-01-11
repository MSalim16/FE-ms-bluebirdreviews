import React from "react";
import { getReviewbyId } from "../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";

const SingleReview = () => {
  const { review_id } = useParams();
  const [review, setReviewbyId] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    getReviewbyId(review_id).then((individualReviewFromapi) => {
      setIsLoading(false);
      setReviewbyId(individualReviewFromapi);
    });
  }, [review_id]);
  if (isLoading) {
    return <h1>...Page is Loading</h1>;
  }

  return (
    <>
      <div className="singlereview">
        <h2 className="item-name">{review.title}</h2>
        <p className="item-description">{review.review_body}</p>
        <h3 className="item-createdby">{review.owner}</h3>
        <h4 className="item-createdat">{review.created_at}</h4>
      </div>
      <Comments />
    </>
  );
};

export default SingleReview;

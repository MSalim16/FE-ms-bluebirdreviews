import React from "react";
import { fetchReviewbyId } from "../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleReview = () => {
  const { review_id } = useParams();
  const [review, setReviewbyId] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetchReviewbyId(review_id).then((individualReviewFromapi) => {
      setIsLoading(false);
      setReviewbyId(individualReviewFromapi);
    });
  }, []);
  if (isLoading) {
    return <h1>...Page is Loading</h1>;
  }

  return (
    <>
      <div className="singlereview">
        <h1 className="item-name">{review.title}</h1>
        <h2 className="item-description">{review.review_body}</h2>
        <h3 className="item-createdby">{review.owner}</h3>
        <h4 className="item-createdat">{review.created_at}</h4>
      </div>
    </>
  );
};

export default SingleReview;

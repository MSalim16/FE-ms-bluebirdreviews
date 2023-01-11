import React from "react";
import { getReviewbyId, patchReviewVotes } from "../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";

const SingleReview = () => {
  const { review_id } = useParams();
  const [review, setReviewbyId] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getReviewbyId(review_id).then((individualReviewFromapi) => {
      setIsLoading(false);
      setReviewbyId(individualReviewFromapi);
    });
  }, [review_id]);

  const handleUpVote = () => {
    setReviewbyId((currReview) => {
      return { ...currReview, votes: currReview.votes + 1 };
    });
    patchReviewVotes(review.review_id, 1).catch((err) => {
      setReviewbyId((currReview) => {
        return { ...currReview, votes: currReview.votes - 1 };
      });
      setErr("Something went wrong, please try again");
    });
  };

  const handleDownVote = () => {
    setReviewbyId((currReview) => {
      return { ...currReview, votes: currReview.votes - 1 };
    });
    patchReviewVotes(review.review_id, -1).catch((err) => {
      setReviewbyId((currReview) => {
        return { ...currReview, votes: currReview.votes + 1 };
      });
      setErr("Something went wrong, please try again");
    });
  };

  if (err) return <p>{err}</p>;

  if (isLoading) {
    return <h1>...Page is Loading</h1>;
  }

  return (
    <>
      <div className="singlereview">
        <h2 className="item-name">{review.title}</h2>
        <p className="item-description">{review.review_body}</p>

        <div className="votes-container">
          <p>votes: {review.votes}</p>
          <button onClick={handleUpVote}>☝️</button>
          <button onClick={handleDownVote}>👇</button>
        </div>
        <h4 className="item-createdby">Author: {review.owner}</h4>
        <h5 className="item-createdat">Time: {review.created_at}</h5>
      </div>
      <Comments />
    </>
  );
};

export default SingleReview;

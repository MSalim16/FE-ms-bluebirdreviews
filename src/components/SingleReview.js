import React from "react";
import {
  getReviewbyId,
  patchReviewVotes,
  getComments,
  postComment,
} from "../api";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { useContext } from "react";
import userContext from "../contexts/User";

const SingleReview = () => {
  const { user } = useContext(userContext);

  const { review_id } = useParams();

  const [review, setReviewbyId] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [userExists, setUserExists] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getReviewbyId(review_id).then(individualReviewFromapi => {
      setIsLoading(false);
      setReviewbyId(individualReviewFromapi);
    });
  }, [review_id]);

  useEffect(() => {
    getComments(review_id).then(commentsFromApi => {
      setIsLoading(false);
      setComments(commentsFromApi);
    });
  }, [review_id]);

  const handleUpVote = () => {
    setReviewbyId(currReview => {
      return { ...currReview, votes: currReview.votes + 1 };
    });
    patchReviewVotes(review.review_id, 1).catch(err => {
      setReviewbyId(currReview => {
        return { ...currReview, votes: currReview.votes - 1 };
      });
      setErr("Something went wrong, please try again");
    });
  };

  const handleDownVote = () => {
    setReviewbyId(currReview => {
      return { ...currReview, votes: currReview.votes - 1 };
    });
    patchReviewVotes(review.review_id, -1).catch(err => {
      setReviewbyId(currReview => {
        return { ...currReview, votes: currReview.votes + 1 };
      });
      setErr("Something went wrong, please try again");
    });
  };

  const handleCommentSubmit = event => {
    console.log(event);
    event.preventDefault();
    setIsDisabled(true);
    const commentBody = event.target["0"].value;
    postComment(user, review.review_id, commentBody)
      .then(newComment => {
        setComments(currComments => {
          const newComments = [...currComments];
          newComments.unshift(newComment);
          return newComments;
        });
        setIsSubmitted(true);
        setIsDisabled(false);
      })
      .catch(err => {
        if (err.response.data.msg === "User does not exist") {
          setUserExists(false);
        }
      });
  };

  const commentForm = (
    <div>
      <h3>Add new comment</h3>
      <form
        disabled={isDisabled}
        onSubmit={handleCommentSubmit}
        id="new-comment"
      >
        <textarea form="new-comment" placeholder="new comment..." required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );

  let commentContainer;

  isSubmitted
    ? (commentContainer = (
        <div>
          {commentForm}
          <p>comment added!</p>
        </div>
      ))
    : (commentContainer = commentForm);

  if (err) return <p>{err}</p>;

  if (isLoading) {
    return <h1>...Reviews are loading</h1>;
  }

  return (
    <>
      <div className="singlereview">
        <h2 className="item-name">{review.title}</h2>
        <p className="item-description">{review.review_body}</p>

        <div className="votes-container">
          <button onClick={handleUpVote}>❤️</button>
          <p>votes: {review.votes}</p>
          <button onClick={handleDownVote}>🖤</button>
        </div>

        <h4 className="item-createdby">Author: @{review.owner}</h4>
        <h5 className="item-createdat">Time: {review.created_at}</h5>
      </div>
      <div>
        <h3>Comments</h3>
        <ul>
          <div className="comments-container">
            {commentContainer}
            {user.username === "guest" && (
              <p>
                Please <Link to="/login-page"> log in </Link> before posting a
                comment
              </p>
            )}
          </div>

          {comments.map(comment => {
            return (
              <>
                <li key={comment.comment_id} className="comments-container">
                  <h4>{comment.author}</h4>
                  <p>{comment.body}</p>
                  <h5>{new Date(comment.created_at).toLocaleString()}</h5>
                  <h6>{comment.votes}</h6>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SingleReview;

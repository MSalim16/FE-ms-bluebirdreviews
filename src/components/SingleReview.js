import React from "react";
import {
  getReviewbyId,
  patchReviewVotes,
  getComments,
  postComment,
  deleteComment,
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
  const [isDeleted, setIsDeleted] = useState(false);
  const [disableLikeBtn, setDisableLikeBtn] = useState(false);
  const [disableDislikeBtn, setDisableDislikeBtn] = useState(false);

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
    setDisableLikeBtn(curr => !curr);
    setDisableDislikeBtn(false);
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
    setDisableDislikeBtn(curr => !curr);
    setDisableLikeBtn(false);
    console.log("shud be disabled");
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
    event.preventDefault();
    setIsDisabled(true);
    const commentBody = event.target["0"].value;
    postComment(user.username, review.review_id, commentBody)
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
    <div className="comment-form">
      <h3>Add new comment</h3>
      <form
        disabled={isDisabled}
        onSubmit={handleCommentSubmit}
        id="new-comment"
      >
        <textarea
          style={{ color: "black" }}
          form="new-comment"
          placeholder="new comment..."
          required
        />
        <button style={{ color: "black" }} type="submit">
          Submit
        </button>
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

  const handleDelete = event => {
    console.log(event.target.parentElement.id);
    event.preventDefault();
    const commentId = event.target.parentElement.id;
    deleteComment(commentId).then(() => {
      setComments(currComments => {
        const newComments = currComments.filter(comment => {
          return comment.comment_id !== commentId;
        });

        return newComments;
      });
      setIsDeleted(true);
    });
  };

  if (err) return <p>{err}</p>;

  if (isLoading) {
    return <h1>...Reviews are loading</h1>;
  }

  return (
    <>
      <div className="single-item-card">
        <div className="single-items">
          {console.log(review.owner)}
          <div className="twitter-handle1">
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
            <h5 className="createdat">
              {" "}
              {new Date(review.created_at).toLocaleString()}{" "}
            </h5>
          </div>
          <h3 className="item-name">{review.title}</h3>

          <p className="item-description">{review.review_body}</p>

          <div className="votes-container">
            <button
              className="heartred"
              disabled={disableLikeBtn}
              onClick={handleUpVote}
            >
              ❤️
            </button>
            <p>votes: {review.votes}</p>
            <button disabled={disableDislikeBtn} onClick={handleDownVote}>
              🖤
            </button>
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
              {isDeleted && <li>Comment deleted</li>}
            </div>

            {comments.map(comment => {
              return (
                <>
                  <li
                    key={comment.comment_id}
                    id={comment.comment_id}
                    className="comments-container"
                  >
                    <h4>{comment.author}</h4>
                    <p>{comment.body}</p>
                    <h5>{new Date(comment.created_at).toLocaleString()}</h5>
                    <h6>{comment.votes}</h6>
                    {comment.author === user.username && (
                      <button style={{ color: "black" }} onClick={handleDelete}>
                        delete
                      </button>
                    )}
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SingleReview;

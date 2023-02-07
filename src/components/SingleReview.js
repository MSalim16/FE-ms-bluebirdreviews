/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
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
import { FaRegComment, FaRegHeart, FaTrashAlt } from "react-icons/fa";

import { useContext } from "react";
import userContext from "../contexts/User";
import { fontFamily } from "styled-system";

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
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);

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
    setIsAlertVisible(true);
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
      <h5>How did you find the game?</h5>
      <form
        disabled={isDisabled}
        onSubmit={handleCommentSubmit}
        id="new-comment"
      >
        <div className="comment-form">
          <textarea
            className="textarea"
            rows="3"
            style={{ color: "black" }}
            form="new-comment"
            placeholder="Reply to this review"
            required
            spellCheck="false"
          />
          <button className="post-btn" type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  );

  let commentContainer;

  isSubmitted
    ? (commentContainer = (
        <div>
          {commentForm}
          <p>Your comment has been added!</p>
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
          <div className="tweet">
            <h3 className="item-name">{review.title}</h3>

            <p className="item-description">{review.review_body}</p>
            <img className="item-img" src={review.review_img_url}></img>
            <div className="like-comments">
              <div className="comment">
                <FaRegComment size={15} />
                <span className="comment-text">{review.comment_count}</span>
              </div>
              <div className="like">
                <FaRegHeart size={15} />
                <span className="comment-text">{review.votes}</span>
              </div>
            </div>
            <div className="votes-container">
              <button
                className="heartred"
                disabled={disableLikeBtn}
                onClick={handleUpVote}
              >
                ❤️
              </button>

              <button disabled={disableDislikeBtn} onClick={handleDownVote}>
                🖤
              </button>
            </div>
          </div>
        </div>
        <div>
          <ul>
            <div className="comments-container">
              <div>
                <h3>Comments</h3>

                {commentContainer}
                {user.username === "guest" && (
                  <p className="login-link">
                    Please <Link to="/login-page"> log in </Link> before posting
                    a comment
                  </p>
                )}
                {isDeleted && <li>Comment deleted</li>}
              </div>
            </div>

            {comments.map(comment => {
              return (
                <>
                  <li
                    className="comment-list"
                    key={comment.comment_id}
                    id={comment.comment_id}
                  >
                    <div className="twitter-handle1">
                      {comment.author === "cooljmessy" && (
                        <img
                          className="avatar-img"
                          src="https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002"
                        ></img>
                      )}
                      {comment.author === "tickle122" && (
                        <img
                          className="avatar-img"
                          src="https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953"
                        ></img>
                      )}
                      {comment.author === "jessjelly" && (
                        <img
                          className="avatar-img"
                          src="https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141"
                        ></img>
                      )}
                      {comment.author === "weegembump" && (
                        <img
                          className="avatar-img"
                          src="https://vignette.wikia.nocookie.net/mrmen/images/7/7e/MrMen-Bump.png/revision/latest?cb=20180123225553"
                        ></img>
                      )}
                      {comment.author === "grumpy19" && (
                        <img
                          className="avatar-img"
                          src="https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013"
                        ></img>
                      )}
                      {comment.author === "happyamy2016" && (
                        <img
                          className="avatar-img"
                          src="https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729"
                        ></img>
                      )}
                      <h1 className="author"> @{comment.author}</h1>
                      <h5 className="createdat">
                        {" "}
                        {new Date(review.created_at).toLocaleString()}{" "}
                      </h5>
                    </div>
                    <p className="comment-body">{comment.body}</p>
                    {comment.author === user.username && (
                      <button className="delete-button" onClick={handleDelete}>
                        <FaTrashAlt size={30} className="delete-icon" />
                      </button>
                    )}
                    <div className="like-comments">
                      <div className="like">
                        <FaRegHeart size={15} />
                        <span className="comment-text">{comment.votes}</span>
                      </div>
                    </div>
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

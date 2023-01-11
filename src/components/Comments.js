import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCommentsById } from "../api";
import { useParams } from "react-router-dom";

const Comments = () => {
  const { review_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCommentsById(review_id).then((commentsFromApi) => {
      setIsLoading(false);
      setComments(commentsFromApi);
    });
  }, [review_id]);

  if (isLoading) {
    return <h1>...Comments are Loading</h1>;
  }

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => {
          console.log(comment);
          return (
            <>
              <li key={comment.comment_id} className="comments-container">
                <h4>{comment.author}</h4>
                <p>{comment.body}</p>
                <h5>{comment.created_at.slice(0, 10)}</h5>
                <h6>{comment.created_at.slice(11, 16)}</h6>
                <h6>{comment.votes}</h6>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};
export default Comments;

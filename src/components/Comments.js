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
      console.log(commentsFromApi);
      setIsLoading(false);
      setComments(commentsFromApi);
    });
  }, [review_id]);

  if (isLoading) {
    return <h1>...Page is Loading</h1>;
  }

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => {
          console.log(comment);
          return (
            <>
              <li key={comment.comment_id} className="comments-container">
                <h4>{comment.author}</h4>
                <p>{comment.body}</p>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};
export default Comments;

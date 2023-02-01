import axios from "axios";

const gamesUrl = axios.create({
  baseURL: "https://mohamed-salims-games-api.onrender.com/api",
});

export const getReviews = category => {
  let params;
  category === "all-reviews"
    ? (params = undefined)
    : (params = { params: { category } });
  return gamesUrl.get("/reviews", params).then(reviews => {
    return reviews.data.reviews;
  });
};

export const getReviewbyId = review_id => {
  return gamesUrl.get(`/reviews/${review_id}`).then(review => {
    return review.data.review;
  });
};

export const patchReviewVotes = (review_id, increment) => {
  return gamesUrl.patch(`/reviews/${review_id}`, { inc_votes: increment });
};

export const getUsers = () => {
  return gamesUrl.get("/users").then(users => {
    return users.data.users;
  });
};

export const getComments = review_id => {
  return gamesUrl.get(`/reviews/${review_id}/comments`).then(review => {
    return review.data.comments;
  });
};

export const postComment = (user, review_id, commentBody) => {
  return gamesUrl
    .post(`/reviews/${review_id}/comments`, {
      username: user,
      body: commentBody,
    })
    .then(comment => {
      console.log(comment);
      return comment.data.comment;
    });
};

export const getCategories = () => {
  return gamesUrl.get("/categories").then(categories => {
    return categories.data.categories;
  });
};
export const getReviewsByQueries = (review, sort_by, order) => {
  return gamesUrl
    .get(`/reviews`, { params: { review, sort_by, order } })
    .then(({ data }) => {
      return data.reviews;
    });
};

export const deleteComment = commentId => {
  return gamesUrl.delete(`comments/${commentId}`);
};

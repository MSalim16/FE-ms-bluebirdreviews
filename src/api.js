import axios from "axios";

const gamesUrl = axios.create({
  baseURL: "https://mohamed-salims-games-api.onrender.com/api",
});

export const getReviews = () => {
  return gamesUrl.get("/reviews").then((reviews) => {
    return reviews.data.reviews;
  });
};

export const getReviewbyId = (review_id) => {
  return gamesUrl.get(`/reviews/${review_id}`).then((review) => {
    return review.data.review;
  });
};

export const getCommentsById = (review_id) => {
  return gamesUrl.get(`/reviews/${review_id}/comments`).then((review) => {
    return review.data.comments;
  });
};

export const patchReviewVotes = (review_id, increment) => {
  return gamesUrl.patch(`/reviews/${review_id}`, { inc_votes: increment });
};

export const getUsers = () => {
  return gamesUrl.get("/users").then((users) => {
    return users.data.users;
  });
};

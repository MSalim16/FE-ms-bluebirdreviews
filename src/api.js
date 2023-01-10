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
    console.log(review.data.comments);
    return review.data.comments;
  });
};

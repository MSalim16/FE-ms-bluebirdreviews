export const fetchReviews = () => {
  return fetch("https://mohamed-salims-games-api.onrender.com/api/reviews")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data.reviews;
    });
};

export const fetchReviewbyId = (reviewid) => {
  return fetch(
    `https://mohamed-salims-games-api.onrender.com/api/reviews/${reviewid}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data.review;
    });
};

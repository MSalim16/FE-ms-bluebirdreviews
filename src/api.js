export const fetchReviews = () => {
  return fetch("https://mohamed-salims-games-api.onrender.com/api/reviews")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data.reviews;
    });
};

// export const fetchReviewbyId = (reviewId) => {
//   return fetch(
//     `https://mohamed-salims-games-api.onrender.com/api/reviews/${review_id}`
//   )
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       return data.item;
//     });
// };

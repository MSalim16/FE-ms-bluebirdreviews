import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getReviewsByQueries } from "../api";
import SortBy from "./SortByq";

export const SortandOrderReviews = ({ setReviews }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sortByValue, setSortByValue] = useState("created_at");
  const [orderByValue, setOrderByValue] = useState("desc");
  const [searchTerm, setSearchTerm] = useSearchParams({
    sort_by: "",
    order: "",
  });
  const { review } = useParams();

  useEffect(() => {
    getReviewsByQueries(review, sortByValue, orderByValue).then(
      reviewsFromApi => {
        if (reviewsFromApi.length !== 0) {
          setReviews(reviewsFromApi);
          setIsLoading(false);
        }
      }
    );
  }, [review, sortByValue, orderByValue]);

  return (
    <>
      <SortBy
        sortByValue={sortByValue}
        setSortByValue={setSortByValue}
        setSearchTerm={setSearchTerm}
      />
    </>
  );
};

export default SortandOrderReviews;

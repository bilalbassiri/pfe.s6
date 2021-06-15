import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// Helper Functions
import { getReviewsFromDB } from "../../helpers/axios.helpers";
// Redux Actions
import {
  getReviews,
  setReviewsLoading,
} from "../../redux/actions/reviewActions";
// Components
import { CircularProgress } from "..";
import Review from "./Review";

export const AllReviews = () => {
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const {
    reviews: { all, loading },
  } = useSelector((state) => state);
  const [visibleReviews, setVisibleReviews] = useState(5);
  useEffect(() => {
    dispatch(setReviewsLoading());
    getReviewsFromDB(bookId).then((reviews) => {
      dispatch(getReviews(reviews));
    });
  }, [dispatch, bookId]);
  return (
    <>
      <div className="reviews-container">
        {!loading ? (
          all.map((reviewInfo, index) =>
            index < visibleReviews ? (
              <Review info={reviewInfo} key={reviewInfo._id} />
            ) : null
          )
        ) : (
          <CircularProgress plan={{ w: "100%", h: "100px" }} />
        )}
      </div>
      <div className="show-more-reviews">
        {all?.length > 5 && visibleReviews === 5 && !loading && (
          <button
            type="button"
            onClick={() => setVisibleReviews(visibleReviews === 5 ? 50 : 5)}
          >
            All reviews
          </button>
        )}
      </div>
    </>
  );
};
export default AllReviews;

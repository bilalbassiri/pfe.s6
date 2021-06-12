import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Review from "./Review";
import { getReviewsFromDB } from "../../helpers/axios.helpers";
import { getReviews } from "../../redux/actions/reviewActions";
import { CircularProgress } from "..";

export const AllReviews = () => {
  const [visibleReviews, setVisibleReviews] = useState(5);
  const dispatch = useDispatch();
  const {
    reviews: { all, loading },
    books: { currentBook },
  } = useSelector((state) => state);
  useEffect(() => {
    getReviewsFromDB(currentBook._id).then((reviews) => {
      dispatch(getReviews(reviews));
    });
  }, [dispatch, currentBook]);
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

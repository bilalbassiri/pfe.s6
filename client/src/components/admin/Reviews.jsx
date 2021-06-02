import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import CustomizedButton from "../ui/CustomizedButton";
import { adminDeleteAllReviews } from "../../helpers/axios.helpers";
import { deleteAllReviews } from "../../redux/actions/adminActions";

const Reviews = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    dashboard: { reviews },
    user: { accessToken },
  } = useSelector((state) => state);
  return (
    <div className="reviews">
      <div>
        <CustomizedButton
          onClick={() => {
            adminDeleteAllReviews(accessToken).then((res) => {
              if (res.ok) {
                dispatch(deleteAllReviews());
              }
            });
          }}
        >
          Delete All
        </CustomizedButton>
      </div>
      <div className="reviews-container">
        {reviews.map((review) =>
          review.owner ? (
            <div
              className="reviews-item"
              key={review.book_id}
              onClick={() => {
                history.push("/book/" + review.book_id);
              }}
            >
              <div>
                <h6>REVIEW ID: {review._id}</h6>
                <div>{new Date(review.createdAt).toDateString()}</div>
              </div>
              <div className="review-header">
                <Avatar src={review.owner.picture} alt={review.owner.picture}>
                  {review.owner.name[0]}
                </Avatar>
                <div>
                  <h3>{review.owner.name}</h3>
                  <h6>ID: {review.owner._id}</h6>
                  <h6>{review.owner.email}</h6>
                </div>
                <div>
                  <h6>
                    Joined {new Date(review.owner.createdAt).getFullYear()}
                  </h6>
                  <h6
                    style={{
                      backgroundColor: review.owner.active ? "green" : "red",
                    }}
                  >
                    Active
                  </h6>
                </div>
                <div>
                  <div>{review.upvotes.length}</div>
                  {review.content}
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};
export default Reviews;

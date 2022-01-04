import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Avatar, Divider } from "@material-ui/core";
import CustomizedButton from "../ui/CustomizedButton";
import { adminDeleteAllReviews } from "../../helpers/axios.helpers";
import { deleteAllReviews } from "../../redux/actions/adminActions";
import ScheduleIcon from "@material-ui/icons/Schedule";

const Reviews = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    dashboard: { reviews },
    user: { accessToken },
  } = useSelector((state) => state);
  useEffect(() => {
    document.title = "Reviews | Admin | Kafka";
  }, []);
  return (
    <div className="admin-reviews">
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
            <div className="reviews-item" key={review.book_id}>
              <div className="bar">
                <h6>REVIEW ID: {review._id}</h6>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: ".9rem",
                  }}
                >
                  <ScheduleIcon
                    style={{ fontSize: "1.2rem", marginRight: 5 }}
                  />
                  {new Date(review.createdAt).toDateString()}
                </div>
              </div>
              <div className="review-header">
                <div className="credentials">
                  <Avatar src={review.owner.picture} alt={review.owner.picture}>
                    {review.owner.name[0]}
                  </Avatar>
                  <div>
                    <h3
                      className="owner-name"
                      onClick={() => {
                        history.push("/readers/" + review.owner._id);
                      }}
                    >
                      {review.owner.name}
                    </h3>
                    <h6>ID: {review.owner._id}</h6>
                    <h6>{review.owner.email}</h6>
                  </div>
                </div>
                <div>
                  <h6>
                    Joined {new Date(review.owner.createdAt).getFullYear()}
                  </h6>
                  <h6
                    className="active"
                    style={{
                      backgroundColor: review.owner.active
                        ? "#1f776d"
                        : "#f50057red",
                    }}
                  >
                    Active
                  </h6>
                </div>
              </div>
              <div className="content">{review.content}</div>
              <Divider />
              <div className="review-footer">
                <div>BOOK ID: {review.book_id}</div>
                <div className="upvotes">Upvotes: {review.upvotes?.length}</div>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};
export default Reviews;

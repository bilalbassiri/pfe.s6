import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Rating, CustomizedButton } from "..";
import { setReview } from "../../redux/actions/reviewActions";
import { updateCurrentBook } from "../../redux/actions/bookActions";
import { addBookReview } from "../../helpers/axios.helpers";
import { Alert, AlertTitle } from "@material-ui/lab";
import LinearProgress from "@material-ui/core/LinearProgress";
import CloseIcon from "@material-ui/icons/Close";
import RefreshIcon from "@material-ui/icons/Refresh";

const styles = {
  post: {
    borderRadius: 25,
  },
  reset: {
    borderRadius: 25,
  },
  cancel: {
    borderRadius: 25,
  },
};
const AddReview = ({ setShowAddReview }) => {
  const { bookId: _id } = useParams();
  const dispatch = useDispatch();
  const {
    user: { credentials, accessToken },
    books: { currentBook },
  } = useSelector((state) => state);
  const [newReview, setNewReview] = useState({
    content: "",
    rating: 0,
    posting: false,
  });
  const addReview = async (d) => {
    try {
      const {
        populatedReview,
        updatedBook: { rating, rating_count },
      } = await addBookReview(d, accessToken);
      if (populatedReview) {
        setNewReview({ ...newReview, content: "", posting: false });
        dispatch(setReview(populatedReview));
        dispatch(updateCurrentBook({ rating, rating_count }));
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return accessToken ? (
    <div className="add-review-section">
      <div className="studio">
        <TextField
          id="outlined-multiline-static"
          label="Your review"
          multiline
          autoFocus
          value={newReview.content}
          variant="outlined"
          placeholder="Write your review here"
          fullWidth={true}
          onChange={(e) =>
            setNewReview((prev) => ({
              ...prev,
              content:
                prev.content?.length > 500
                  ? e.target.value.substring(0, 500)
                  : e.target.value,
            }))
          }
        />
        <div className="rate">
          <Rating
            value={newReview?.rating}
            onChange={(e, newValue) => {
              setNewReview((prev) => ({ ...prev, rating: newValue ?? 0 }));
            }}
          />
          <span>{500 - newReview.content?.length}</span>
        </div>
      </div>
      <div className="submit-review">
        <CustomizedButton
          color="primary"
          disabled={!newReview.content}
          disableElevation
          style={styles.post}
          onClick={() => {
            const data = {
              book_id: _id,
              owner: credentials._id,
              content: newReview.content,
              rating: newReview.rating,
              global_rating: currentBook.rating,
              rating_count: currentBook.rating_count,
            };
            setNewReview({ ...newReview, content: "", posting: true });
            addReview(data);
          }}
        >
          Post
        </CustomizedButton>
        <CustomizedButton
          style={styles.reset}
          variant="outlined"
          color="secondary"
          disabled={!newReview.content}
          onClick={() => setNewReview({ ...newReview, content: "" })}
        >
          <RefreshIcon className="icon" />
        </CustomizedButton>
        <CustomizedButton
          style={styles.cancel}
          variant="outlined"
          color="secondary"
          onClick={() => setShowAddReview(false)}
        >
          <CloseIcon className="icon" />
        </CustomizedButton>
      </div>
      {newReview.posting && <LinearProgress style={{ marginTop: 10 }} />}
    </div>
  ) : (
    <Alert severity="info">
      <AlertTitle>You are not logged in</AlertTitle>
      To be able to add a review you have to{" "}
      <strong>
        <Link to="/login" style={{ color: "inherit" }}>
          sign in{" "}
        </Link>
      </strong>
      first — if you are new here{" "}
      <strong>
        <Link to="/sign-up" style={{ color: "inherit" }}>
          sign up !
        </Link>
      </strong>
    </Alert>
  );
};
export default AddReview;

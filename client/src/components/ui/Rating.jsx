import React from "react";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
}));

export default function HalfRating({
  porpose,
  count,
  rating,
  value,
  onChange,
  notext,
}) {
  const classes = useStyles();
  const s = {
    color: "#1f776d",
  };
  return (
    <div className={classes.root}>
      <div className={"rating " + porpose}>
        {porpose === "global_read" ? (
          <>
            <Rating
              name="half-rating-read"
              defaultValue={rating}
              precision={0.1}
              readOnly
              style={s}
              className="stars"
            />
            {count ?? 0}
            <PersonOutlineOutlinedIcon style={{ fontSize: "1rem" }} />
          </>
        ) : porpose === "review_read" ? (
          <>
            <Rating
              name="half-rating"
              defaultValue={rating}
              precision={0.1}
              readOnly
              style={s}
              className="stars"
            />{" "}
            {notext && rating?.toFixed(1)}
          </>
        ) : porpose === "average_read" ? (
          <>
            <h2>{rating.toFixed(1)}</h2>
            <Rating
              name="half-rating"
              defaultValue={rating}
              precision={0.1}
              readOnly
              style={s}
              className="stars"
            />
            <p>based on {count} reviews</p>
          </>
        ) : (
          <Rating
            name="simple-controlled"
            value={value}
            onChange={onChange}
            style={{ color: "#ffb400" }}
            className="stars"
          />
        )}
      </div>
    </div>
  );
}

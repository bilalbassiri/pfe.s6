import React, { useState, useReducer } from "react";
import {
  upvoteReview,
  deleteBookReview,
  sendNotifications,
} from "../../helpers/axios.helpers";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { Rating } from "..";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { removeReview } from "../../redux/actions/reviewActions";
import { useParams } from "react-router-dom";
import { getPassedTime } from "../../helpers/global.helpers";

const Review = ({
  info: { _id, content, upvotes, owner, rating, createdAt },
}) => {
  const {
    user: { credentials, accessToken },
    books: {
      currentBook: { name },
    },
  } = useSelector((state) => state);
  const { bookId } = useParams();
  const reduxDispatch = useDispatch();
  const [readReview, setReadReview] = useState(false);
  const reducer = (state, action) => {
    switch (action.type) {
      case "UPVOTE":
        return {
          currentVotes: [...state.currentVotes, credentials._id],
          voted: true,
        };
      case "DONTVOTE":
        return {
          currentVotes: state.currentVotes?.filter(
            (item) => item !== credentials._id
          ),
          voted: false,
        };
      default:
        return state;
    }
  };

  const [{ currentVotes, voted }, dispatch] = useReducer(reducer, {
    currentVotes: upvotes ?? [],
    voted: upvotes?.includes(credentials?._id) ?? false,
  });
  const voteReview = () => {
    if (accessToken) {
      upvoteReview(
        _id,
        voted
          ? currentVotes.filter((item) => item !== credentials._id)
          : [...currentVotes, credentials._id]
      );
      dispatch({ type: voted ? "DONTVOTE" : "UPVOTE" });
    } else console.log("Not logged in !!!");
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="review">
      {accessToken && (
        <div className="options">
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {credentials?._id === owner?._id && (
              <MenuItem
                onClick={() => {
                  handleClose();
                  if (
                    !window.confirm(
                      "Hi " +
                        credentials.name.split(" ")[0] +
                        "👋, Are you sure you wanna delete this review ?"
                    )
                  )
                    return;
                  deleteBookReview(_id, accessToken);
                  reduxDispatch(removeReview({ _id }));
                }}
              >
                Delete
              </MenuItem>
            )}
            <MenuItem
              onClick={() => {
                reduxDispatch(removeReview({ _id }));
                handleClose();
              }}
            >
              Hide
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigator.clipboard.writeText(content);
              }}
            >
              Copy
            </MenuItem>
          </Menu>
        </div>
      )}
      <div className="review-bar">
        <div className="review-writer">
          <Avatar className="review-writer-pic" src={owner.picture ?? ""}>
            {owner.name[0]}
          </Avatar>
          <Link to={`/readers/${owner?._id}`} className="review-writer-name">
            <h4>{owner.name}</h4>
          </Link>
          <Rating porpose="review_read" rating={rating} notext={true} />
        </div>
        <div className="cheer-sec">
          <span>{currentVotes?.length !== 0 && currentVotes?.length}</span>
          <button
            type="click"
            onClick={() => {
              voteReview();
              if (voted || credentials?._id === owner?._id) return;
              sendNotifications(
                owner._id,
                {
                  content: `<span class='name'>${
                    credentials?.name
                  }</span> liked your review: <span class='rev'>${content.substring(
                    0,
                    50
                  )}...</span> about <b>${name}</b> book.`,
                  picture: credentials?.picture,
                  name: credentials?.name,
                  direction: "/book/" + bookId,
                  date: new Date(),
                },
                "send",
                accessToken
              );
            }}
          >
            {voted ? (
              <FavoriteIcon className="fav-i" />
            ) : (
              <FavoriteBorderIcon className="border-i" />
            )}
          </button>
        </div>
      </div>
      <article onClick={() => setReadReview(!readReview)}>
        {content.substring(0, readReview ? 1000 : 300) +
          (readReview || content.length <= 300 ? "" : "...")}
      </article>
      <h6>{getPassedTime(createdAt)}</h6>
    </div>
  );
};
export default Review;

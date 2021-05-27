import React, { useState, useReducer } from "react";
import {
  upvoteReview,
  deleteBookReview,
  sendNotifications
} from "../../helpers/axios.helpers";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Skeleton from "@material-ui/lab/Skeleton";
import { Rating } from "..";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { removeReview } from "../../redux/actions/reviewActions";

const Review = ({ info: { _id, content, upvotes, owner, rating } }) => {
  const { credentials, notifications, accessToken } = useSelector((state) => state.user);
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
            {credentials._id === owner._id && (
              <MenuItem
                onClick={() => {
                  handleClose();
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
          {owner && owner.name ? (
            <>
              <Avatar className="review-writer-pic" src={owner.picture ?? ""}>
                {owner.name[0]}
              </Avatar>
              <Link to={`/readers/${owner._id}`} className="review-writer-name">
                <h4>{owner.name}</h4>
              </Link>
              <Rating porpose="review_read" rating={rating} notext={true} />
            </>
          ) : (
            <>
              <Skeleton variant="circle" width={35} height={35} />
              <Skeleton variant="text" width={200} />
            </>
          )}
        </div>
        <div className="cheer-sec">
          <button
            type="click"
            onClick={() => {
              voteReview();
              if (voted) return;
              sendNotifications(owner._id, `<div class='pic'><img src='${credentials?.picture}' alt='${credentials?.name}'/></div><div class='content'><span class='name'>${credentials?.name}</span> liked your review: <span class='rev'>${content.substring(0, 50)}</span><div class='date'>${new Date().toDateString()}</div></div>`, accessToken);
            }}
          >
            {voted ? (
              <FavoriteIcon className="fav-i" />
            ) : (
              <FavoriteBorderIcon className="border-i" />
            )}
          </button>
          <span>{currentVotes?.length !== 0 && currentVotes?.length}</span>
        </div>
      </div>
      <article onClick={() => setReadReview(!readReview)}>
        {content.substring(0, readReview ? 500 : 300)}
      </article>
    </div>
  );
};
export default Review;

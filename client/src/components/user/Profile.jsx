import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  getUserProfile,
  sendNotifications,
  updateUserHighlights,
  updateUserInfo,
  uploadImage,
} from "../../helpers/axios.helpers";
import { getFormattedDate } from "../../helpers/global.helpers";
import Avatar from "@material-ui/core/Avatar";
import { CircularProgress, CustomizedButton, Rating, Reading } from "..";
import { Chip, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import {
  changeUserAvatar,
  updateUserCredentials,
} from "../../redux/actions/userActions";
import TextField from "@material-ui/core/TextField";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import BookmarkBorderRoundedIcon from "@material-ui/icons/BookmarkBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import ScheduleIcon from "@material-ui/icons/Schedule";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

const getCustomStyles = (permission) => ({
  backgroundColor: permission ? "white" : "#2a9d8f",
  padding: "8.5px 16px",
  borderRadius: 20,
  fontWeight: "600",
  width: "100%",
  color: permission ? "#2a9d8f" : "white",
  border: permission ? "1px solid #2a9d8f" : "",
  "&:hover": {
    backgroundColor: permission ? "white" : "#1f776d",
  },
});

const Profile = () => {
  const dispatch = useDispatch();
  const { user_id } = useParams();
  const { credentials, accessToken, highlights } = useSelector(
    (state) => state.user
  );
  const [isLoading, setIsLoading] = useState({
    profile: true,
    image: false,
    highlight: false,
  });
  const [showAll, setShowAll] = useState({
    reviews: false,
    highlighted: false,
  });
  const [{ info, reviews }, setProfile] = useState({
    info: {},
    reviews: [],
  });
  const [bioState, setBioState] = useState({
    edit: false,
    loading: false,
    content: "",
  });
  const [openPicture, setOpenPicture] = useState(false);
  const history = useHistory();
  const isMyProfile = () => {
    if (accessToken) {
      if (credentials?._id === user_id) return true;
      else return false;
    } else return false;
  };
  useEffect(() => {
    setIsLoading((prev) => ({ ...prev, profile: true }));
    getUserProfile(user_id).then(({ info, reviews }) => {
      setProfile({ info, reviews });
      setBioState((prev) => ({ ...prev, content: info.bio }));
      setIsLoading((prev) => ({ ...prev, profile: false }));
    });
  }, [user_id]);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [preview, setPreview] = useState("");
  let highlighted = info.highlights
    ?.map((reader) => reader._id)
    .includes(credentials?._id);
  const getReaderAnim = (arr, i, animation) => ({
    animation: `${animation} 500ms ${
      !showAll.highlighted
        ? i * 500 + (arr.length < 3 ? arr.length : 3) * 500
        : 0
    }ms ease forwards`,
  });

  const handleImageUpload = async (e) => {
    try {
      setIsLoading({ ...isLoading, image: true });
      e.preventDefault();
      const blob = e.target.files[0];
      if (/\.(jpe?g|png)$/i.test(blob.name)) {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => {
          setPreview(reader.result);
          uploadImage(reader.result, accessToken).then((url) => {
            dispatch(changeUserAvatar(url));
            setIsLoading({ ...isLoading, image: false });
            setPreview("");
          });
        };
        reader.onerror = () => {
          console.error("Sorry");
        };
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      {isLoading.profile ? (
        <CircularProgress plan={{ h: "calc(100vh - 84px)", w: "100%" }} />
      ) : (
        <Grid container justify="space-evenly" className="profile">
          {openPicture && (
            <div className="avatar-scope">
              <button type="button" onClick={() => setOpenPicture(false)}>
                <KeyboardBackspaceIcon className="arr" />
              </button>
              <a
                href={isMyProfile() ? credentials.picture : info.picture}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={isMyProfile() ? credentials.picture : info.picture}
                  alt={info.name}
                />
              </a>
            </div>
          )}
          <Grid item sm={2} xs={12} className="general-section">
            <div className="personal-info">
              <div className="photo">
                <Avatar
                  onClick={() => {
                    if (!info.picture) return;
                    setOpenPicture(true);
                  }}
                  style={info.picture ? { cursor: "pointer" } : {}}
                  src={
                    isMyProfile()
                      ? preview
                        ? preview
                        : credentials?.picture
                      : info.picture
                  }
                  className="avatar"
                >
                  {info.name[0].toUpperCase()}
                </Avatar>
                {isMyProfile() &&
                  (!isLoading.image ? (
                    <div className="change-photo">
                      <label htmlFor="select">
                        <PhotoCameraOutlinedIcon className="icon" />
                      </label>
                      <input
                        type="file"
                        name="image"
                        id="select"
                        className="select-input"
                        onChange={handleImageUpload}
                      />
                    </div>
                  ) : (
                    <div className="loading-image">
                      <CircularProgress
                        plan={{ h: 35, w: 35 }}
                        size={{ height: 35, width: 35 }}
                      />
                    </div>
                  ))}
              </div>
              <div className="inf">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <h1 className="name">{info.name}</h1>
                  {isMyProfile() && (
                    <button
                      type="button"
                      style={{ display: "grid", placeContent: "center" }}
                      onClick={() => history.push("/me/account")}
                    >
                      <SettingsOutlinedIcon
                        style={{ fontSize: "1.1rem", color: "#88908f" }}
                      />
                    </button>
                  )}
                </div>
                {isMyProfile() && <p className="email">{credentials.email}</p>}
              </div>
              <div className="highlight">
                {!isMyProfile() && (
                  <CustomizedButton
                    disableElevation
                    type="button"
                    style={getCustomStyles(highlighted)}
                    disabled={isLoading.highlight}
                    onClick={() => {
                      if (!accessToken) history.push("/login");
                      setIsLoading({ ...isLoading, highlight: true });
                      updateUserHighlights(
                        {
                          _id: info._id,
                          newHighlights: highlighted
                            ? info.highlights.filter(
                                (user) => user._id !== credentials?._id
                              )
                            : [credentials?._id, ...info.highlights],
                        },
                        accessToken
                      )
                        .then((data) => {
                          setIsLoading({ ...isLoading, highlight: false });
                          setProfile((prev) => ({
                            ...prev,
                            info: { ...prev.info, highlights: data.highlights },
                          }));
                        })
                        .then(() => {
                          if (highlighted) return;
                          sendNotifications(
                            user_id,
                            {
                              content: `<span class='name'>${credentials?.name}</span> highlighted you`,
                              picture: credentials?.picture,
                              name: credentials?.name,
                              direction: "/readers/" + credentials?._id,
                              date: new Date(),
                            },
                            "send",
                            accessToken
                          );
                        });
                    }}
                  >
                    Highlight
                    {highlighted ? (
                      <>
                        ed
                        <DoneRoundedIcon className="icon" />{" "}
                      </>
                    ) : (
                      <>
                        {!isMyProfile() &&
                          accessToken &&
                          highlights?.includes(user_id) &&
                          " Back"}
                        <BookmarkBorderRoundedIcon className="icon" />
                      </>
                    )}
                  </CustomizedButton>
                )}
              </div>
            </div>
            <div className="intersted-in">
              {info.genres.length > 0 && (
                <h2 className="headings">Interested in</h2>
              )}
              <div>
                {info.genres?.map((genre, i) => (
                  <Chip
                    variant="outlined"
                    size="small"
                    label={genre}
                    key={i}
                    onClick={() => history.push("/genres/" + genre)}
                  />
                ))}
              </div>
            </div>
            <div className="joined">
              <ScheduleIcon />
              <p>Joined {getFormattedDate(info.createdAt)}</p>
            </div>
          </Grid>
          <Grid item sm={5} xs={12} className="detail-section">
            <div className="bio">
              <h2 className="headings">
                Bio
                {isMyProfile() && (
                  <button
                    className="edit-btn-save"
                    onClick={() => {
                      if (bioState.edit) {
                        if (info.bio !== bioState.content) {
                          updateUserInfo(
                            { bio: bioState.content },
                            accessToken
                          ).then((data) => {
                            dispatch(updateUserCredentials(data));
                          });
                        }
                      }
                      setBioState({ ...bioState, edit: !bioState.edit });
                    }}
                  >
                    {bioState.edit ? "Done" : "Edit"}
                  </button>
                )}
              </h2>
              {bioState.edit && accessToken ? (
                <TextField
                  className="edit-bio"
                  id="outlined-multiline-static"
                  label=""
                  multiline
                  value={bioState.content}
                  variant="outlined"
                  placeholder="Say something about you here"
                  fullWidth={true}
                  onChange={(e) => {
                    setBioState({ ...bioState, content: e.target.value });
                  }}
                />
              ) : (
                <p>{bioState.content}</p>
              )}
            </div>
            <div className="_reviews">
              <h2 className="headings">
                Reviews <span>({reviews.length})</span>
              </h2>
              <div className="reviews-cont">
                {reviews.map((review, index) =>
                  index < (showAll.reviews ? reviews.length : 3) ? (
                    <div
                      className="review"
                      key={review._id}
                      style={{
                        animation: `fly 500ms ${
                          (!showAll.reviews ? index : index - 3) * 500
                        }ms ease forwards`,
                      }}
                      onClick={() =>
                        history.push(`/book/${review.book_id._id}`)
                      }
                    >
                      <div className="left">
                        <div className="cover">
                          <img
                            src={review.book_id.cover}
                            alt={review.book_id.name}
                          />
                        </div>
                        <div className="text">
                          <h3 className="name">{review.book_id.name}</h3>
                          <div className="content">
                            <Rating
                              porpose="review_read"
                              rating={review.rating}
                              className="rating"
                            />
                            <p>
                              {review.content.length > 100
                                ? review.content.substring(0, 50) + ".."
                                : review.content}
                            </p>
                            <p className="upvotes">
                              <FavoriteRoundedIcon className="icon" />{" "}
                              {review.upvotes.length}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="right-arrow">
                        <ChevronRightRoundedIcon />
                      </div>
                    </div>
                  ) : null
                )}
                <div className="show-more-reviews pro">
                  {reviews.length > 3 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setShowAll({ ...showAll, reviews: !showAll.reviews });
                      }}
                    >
                      Show{" "}
                      {showAll.reviews ? "Less" : `${reviews.length - 3} more`}
                    </button>
                  ) : reviews.length === 0 ? (
                    <h5 className="empty">
                      {isMyProfile() ? "You" : info.name} have no reviews yet.
                    </h5>
                  ) : null}
                </div>
              </div>
            </div>
          </Grid>
          <Grid item sm={4} xs={12} className="pages">
            <div className="reads">
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className="arrow" />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className="accordion-headings">
                    Read <span>({info.read.length})</span>
                  </Typography>
                </AccordionSummary>
                <Reading books={info.read} />
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className="arrow" />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <Typography className="accordion-headings">
                    Currently reading{" "}
                    <span>({info.currently_reading.length})</span>
                  </Typography>
                </AccordionSummary>
                <Reading books={info.currently_reading} />
              </Accordion>
              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className="arrow" />}
                  aria-controls="panel3h-content"
                  id="panel3bh-header"
                >
                  <Typography className="accordion-headings">
                    To read <span>({info.to_read.length})</span>
                  </Typography>
                </AccordionSummary>
                <Reading books={info.to_read} />
              </Accordion>
            </div>
            <div className="highlighted-readers">
              <h2 className="headings">
                Highlighted by <span>({info.highlights.length})</span>
              </h2>
              <div className="container">
                {info.highlights.map((reader, i) =>
                  i < (showAll.highlighted ? info.highlights.length : 3) ? (
                    <div
                      key={i}
                      className="reader"
                      style={getReaderAnim(reviews, i, "fly")}
                      onClick={() => history.push(`/readers/${reader._id}`)}
                    >
                      <div className="face">
                        <Avatar
                          className="avatar"
                          style={getReaderAnim(reviews, i, "slp")}
                          src={reader.picture}
                        >
                          {reader.name[0]}
                        </Avatar>
                        <h3 className="name">{reader.name}</h3>
                      </div>
                      <div className="right-arrow">
                        <ChevronRightRoundedIcon />
                      </div>
                    </div>
                  ) : null
                )}
                <div className="show-more-reviews pro">
                  {info.highlights.length > 3 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setShowAll({
                          ...showAll,
                          highlighted: !showAll.highlighted,
                        });
                      }}
                    >
                      Show{" "}
                      {showAll.highlighted
                        ? "less"
                        : `${info.highlights.length - 3} more`}
                    </button>
                  ) : info.highlights.length === 0 ? (
                    <h5 className="empty">
                      No one highlighted {isMyProfile() ? "you" : info.name}.
                    </h5>
                  ) : null}
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};
export default Profile;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Collection from "../collection/Collection";
import Category from "../collection/Category";
import Fab from "@material-ui/core/Fab";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "..";
import { getBooksFromDB } from "../../helpers/axios.helpers";
import { setBooks } from "../../redux/actions/bookActions";
import Avatar from "@material-ui/core/Avatar";

const Home = () => {
  const dispatch = useDispatch();
  const {
    books: { all, popular, most_rated },
    user: { genres, accessToken, isloading },
  } = useSelector((state) => state);
  const history = useHistory();
  const RandomCovers = () => {
    let i = Math.floor(Math.random() * all.length) - 5;
    i = i < 0 ? 0 : i;
    const books = all.slice(i, i + 5);
    if (!books) return;
    return (
      <>
        <div className="small-covers-cont">
          {books.slice(0, 4).map((book) => (
            <div
              key={book._id}
              style={{ backgroundImage: "url(" + book.cover + ")" }}
              onClick={() => history.push("/book/" + book._id)}
            ></div>
          ))}
        </div>
        <div className="big-cover">
          <img
            key={books[4]._id}
            src={books[4].cover}
            alt={books[4].name}
            onClick={() => history.push("/book/" + books[4]._id)}
          />
        </div>
      </>
    );
  };

  useEffect(() => {
    getBooksFromDB().then((books) => dispatch(setBooks(books)));
  }, [dispatch]);
  return all.length && !isloading ? (
    <div className="home">
      {!accessToken && (
        <div className="main-page">
          <div className="ads">
            <Avatar
              className="portrait"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F_bwAHfdJLOJg%2FTI3fyOVljCI%2FAAAAAAAABoI%2Fu7psd8E2YoY%2Fs400%2Fkafka.jpg&f=1&nofb=1"
              alt="franz kafka"
            />
            <p>
              “Many a book is like a key to unknown chambers within the castle
              of one’s own self.” ― Franz Kafka
            </p>
          </div>
          <div className="scroll-down">
            <p>Scroll Down</p>
            <div
              onClick={() => {
                window.scroll({
                  top: window.innerHeight - 84,
                  left: 0,
                  behavior: "smooth",
                });
              }}
            >
              <span></span>
            </div>
          </div>
          <div className="lr-container">
            <section className="left">
              <h3>Hi there 👋, KEEP READING</h3>
              <h1>
                we are believing that one book can <span>change</span> your life
              </h1>
              <h2>
                Here you can share the knowledge what you learned from books,
                make your own library, buy books that you've found interesting,
                highlight other readers and more.
              </h2>
              <div
                className="explore-btn"
                onClick={() => history.push("/sign-up")}
              >
                <span className="hash">Sign Up Now</span>
                <Fab color="secondary" aria-label="signup">
                  <ArrowForwardRoundedIcon />
                </Fab>
              </div>
              <div className="contact">
                Do you have a business and want to collaborate? don't hesitate{" "}
                <span onClick={() => history.push("/contact-us")}>
                  contacting us
                </span>
              </div>
            </section>
            <section className="right">
              <div className="images-container">
                <RandomCovers />
              </div>
            </section>
          </div>
        </div>
      )}
      <div className="home-body" id="content">
        <Collection title="Added Recently" books={all} />
        <Collection title="Popular" books={popular} />
        <Collection title="Most Rated" books={most_rated} />
        {accessToken &&
          genres?.map((genre) => <Category key={genre} genre={genre} />)}
      </div>
    </div>
  ) : (
    <CircularProgress plan={{ w: "100%", h: "calc(100vh - 84px)" }} />
  );
};
export default Home;

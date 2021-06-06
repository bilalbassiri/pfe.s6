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
const Home = () => {
  const dispatch = useDispatch();
  const {
    books: { all, popular, most_rated },
    user: { genres, accessToken, isloading },
  } = useSelector((state) => state);
  const history = useHistory();
  const RandomCovers = () => {
    let i = Math.floor(Math.random() * all.length) - 5;
    i = i < 0 ? i + 5 : i;
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
        <img
          key={books[4]._id}
          src={books[4].cover}
          alt={books[4].name}
          className="big-cover"
          onClick={() => history.push("/book/" + books[4]._id)}
        />
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
          <div className="scroll-down">Scroll Down</div>
          <section className="left">
            <h1>You're welcome</h1>
            <h2>
              Aliquip eu pariatur irure nulla sunt reprehenderit et est anim est
              nisi aliqua occaecat.
            </h2>
            <div
              className="sign-upbtn"
              onClick={() => history.push("/sign-up")}
            >
              <span className="hash">Explore Now</span>
              <Fab color="secondary" aria-label="signup">
                <ArrowForwardRoundedIcon />
              </Fab>
            </div>
          </section>
          <section className="right">
            <div className="images-container">
              <RandomCovers />
            </div>
          </section>
        </div>
      )}
      <div className="home-body">
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

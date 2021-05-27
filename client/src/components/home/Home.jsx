import React from "react";
import { useSelector } from "react-redux";
import Collection from "../collection/Collection";
import Category from "../collection/Category";
import Fab from "@material-ui/core/Fab";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "..";

const Home = () => {
  const {
    books: { all, popular, most_rated },
    user: { genres, notifications, accessToken },
  } = useSelector((state) => state);
  const history = useHistory();
  return all.length ? (
    <div className="home">
      {!accessToken && (
        <div className="main-page">
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
            {/* <div className="categories">
                        <h3> Explore </h3>
                        <div className='cont'>
                            {
                                ['Romance', 'Fantsy', 'Philosophy', 'History'].map((genre, i) => <Chip variant="outlined" size="small" label={genre} key={i} onClick={() => history.push('/genres/' + genre)} />)
                            }
                        </div>
                    </div> */}
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

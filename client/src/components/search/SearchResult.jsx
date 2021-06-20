import { Chip } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { Rating } from "..";

const SearchResult = ({ books }) => {
  const history = useHistory();
  const len = books.length;
  console.log(books);
  return (
    <>
      {len > 1 ? <h3>{len} results</h3> : null}
      <div className="search-result-container">
        {books.map((book) => (
          <div key={book._id} className="book-item-result">
            <div className="cover">
              <img src={book.cover} alt={book.name} />
            </div>
            <div className="detail">
              <div className="name">
                <h3>{book.name}</h3>
                <h5>{book.author}</h5>
              </div>
              <div className="des">{book.description.substring(0, 100)}...</div>
              <div className="genres">
                {book.genres.map((genre, index) => (
                  <Chip
                    key={index}
                    label={genre}
                    onClick={() => {
                      history.push("/genres/" + genre);
                    }}
                  />
                ))}
              </div>
              <div className="info">
                <Rating
                  rating={book.rating}
                  notext={false}
                  porpose="review_read"
                />
              </div>
              <h5>${book.price.toFixed(2)}</h5>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default SearchResult;

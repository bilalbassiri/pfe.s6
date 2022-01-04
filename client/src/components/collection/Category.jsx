import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { getCategory } from "../../helpers/axios.helpers";
import { CircularProgress, Scroller } from "..";

const Category = ({ genre }) => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategory(genre).then(setCategory);
  }, [genre]);
  return (
    <section className="books">
      <div className="genre-head">
        <h1 className="books-title">In {genre}</h1>
        <div className="bar"></div>
        <Scroller title={genre} />
      </div>
      <div className="books-container" id={"bc" + genre}>
        {category ? (
          category.map((book, index) => <BookCard item={book} key={index} />)
        ) : (
          <CircularProgress plan={{ h: "200px", w: "100%" }} />
        )}
      </div>
    </section>
  );
};
export default Category;

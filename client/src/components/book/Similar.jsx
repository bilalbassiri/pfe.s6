import React from "react";
import { useSelector } from "react-redux";
import MiniBookCard from "./MiniBookCard";

const Similar = () => {
  const {
    books: { all, currentBook: book },
  } = useSelector((state) => state);
  const getSimilaBooks = () =>
    all.filter((item) => {
      let isSimilar = false;
      for (let i = 0; i < item.genres.length; i++) {
        if (book.genres.includes(item.genres[i]) && book._id !== item._id) {
          isSimilar = true;
          break;
        }
      }
      return isSimilar;
    });
  return (
    getSimilaBooks().length > 0 && <MiniBookCard title='Similar' books={getSimilaBooks()} />
  );
};
export default Similar;

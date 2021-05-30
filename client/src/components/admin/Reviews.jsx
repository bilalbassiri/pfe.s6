import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Reviews = () => {
    const dispatch = useDispatch();
    const {
        dashboard: { books },
        user: { accessToken },
      } = useSelector((state) => state);
  return <div>reviews</div>;
};
export default Reviews;

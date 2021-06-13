import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Chip } from "@material-ui/core";

export const Description = ({ book: { description, genres } }) => {
  const [readMore, setReadMore] = useState(false);
  const history = useHistory();

  return (
    <div className="desc">
      <span
        dangerouslySetInnerHTML={{
          __html: description
            ?.substring(0, readMore ? 3000 : 600)
            .replaceAll("\n", "<br/>"),
        }}
      ></span>
      {description?.length > 600 && (
        <button
          type="button"
          className="more-btn"
          onClick={() => setReadMore(!readMore)}
        >
          {!readMore ? "...more" : "(less)"}
        </button>
      )}
      <span className="book-genres">
        {genres?.map((genre, i) => (
          <Chip
            variant="outlined"
            size="small"
            label={genre}
            key={i}
            onClick={() => history.push("/genres/" + genre)}
          />
        ))}
      </span>
    </div>
  );
};

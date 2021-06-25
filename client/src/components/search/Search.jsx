import React, { useState, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { CustomizedButton } from "..";
import { LinearProgress } from "@material-ui/core";
import { searchABook } from "../../helpers/axios.helpers";
import SearchResult from "./SearchResult";
import {
  setBooksStartLoading,
  setSearchResultBooks,
} from "../../redux/actions/bookActions";
import MiniBookCard from "../book/MiniBookCard";

const styles = {
  search: {
    backgroundColor: "#2a9d8f",
    padding: "8px",
    width: "100%",
    "&:hover": {
      backgroundColor: "#1f776d",
    },
  },
};

function valuetext(value) {
  return value;
}
const Search = () => {
  const dispatch = useDispatch();
  const { loading, searchResult, popular } = useSelector(
    (state) => state.books
  );
  const [values, setValues] = useState({
    name: "",
    genre: "",
    range: [0, 100],
  });
  const handleSelectChange = (event) => {
    setValues((prev) => ({ ...prev, genre: event.target.value }));
  };

  const handleRangeChange = (event, newValue) => {
    setValues({ ...values, range: newValue });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!values.name) return;
      dispatch(setBooksStartLoading());
      const result = await searchABook(values);
      dispatch(setSearchResultBooks(result));
    } catch (er) {
      console.log(er.message);
    }
  };
  useEffect(() => {
    document.title = "Search | Kafka";
  }, []);
  return (
    <>
      <div className="search-component">
        <div className="left-side">
          <form className="search-form" onSubmit={handleSubmit}>
            {loading ? (
              <LinearProgress color="primary" />
            ) : (
              <div style={{ height: "4px" }}></div>
            )}
            <input
              type="search"
              className="search-input"
              placeholder="Search a book"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Genre
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={values.genre}
                onChange={handleSelectChange}
                label="Genre"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Philosophy">Philosophy</MenuItem>
                <MenuItem value="Learning">Learning</MenuItem>
                <MenuItem value="Romance">Romance</MenuItem>
                <MenuItem value="Science">Science</MenuItem>
              </Select>
            </FormControl>
            <div>
              <Typography id="range-slider" gutterBottom>
                Price range
              </Typography>
              <Slider
                value={values.range}
                onChange={handleRangeChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
              />
            </div>
            <CustomizedButton
              style={styles.search}
              disableElevation
              type="submit"
            >
              Search
            </CustomizedButton>
          </form>
          <MiniBookCard title="Popular" books={popular} />
        </div>
        <div className="search-result">
          {searchResult ? (
            searchResult.length === 0 ? (
              <div style={{ textAlign: "center", marginTop: "40px" }}>
                <h2>No result found</h2>
                <p>We can't find any book match your search</p>
              </div>
            ) : (
              <SearchResult books={searchResult} />
            )
          ) : (
            <h2 style={{ textAlign: "center", marginTop: "40px" }}>
              Your search result will appear here
            </h2>
          )}
        </div>
      </div>
    </>
  );
};
export default Search;

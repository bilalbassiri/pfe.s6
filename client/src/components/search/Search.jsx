import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { CustomizedButton } from "..";
import { LinearProgress } from "@material-ui/core";
import { searchABook } from "../../helpers/axios.helpers";
import SearchResult from "./SearchResult";

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
  const [values, setValues] = useState({
    name: "",
    genre: "",
    range: [0, 100],
  });
  const [searchResult, setSearchResult] = useState({
    data: null,
    pending: false,
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
      setSearchResult((prev) => ({ ...prev, pending: true }));
      const result = await searchABook(values);
      setSearchResult((prev) => ({ data: result, pending: false }));
    } catch (er) {
      console.log(er.message);
    }
  };
  return (
    <div className="search-component">
      {searchResult.pending && <LinearProgress color="primary" />}
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="search"
          className="search-input"
          placeholder="Search a book"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">Genre</InputLabel>
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
            <MenuItem value="Romance">Science</MenuItem>
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
        <CustomizedButton style={styles.search} disableElevation type="submit">
          Search
        </CustomizedButton>
      </form>
      <div className="search-result">
        {searchResult.data ? (
          searchResult.data.length === 0 ? (
            <h1>No result</h1>
          ) : (
            <SearchResult books={searchResult.data} />
          )
        ) : (
          <h1>empty</h1>
        )}
      </div>
    </div>
  );
};
export default Search;

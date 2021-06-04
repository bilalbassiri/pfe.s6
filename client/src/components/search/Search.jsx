import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { CustomizedButton } from "..";
import { LinearProgress } from "@material-ui/core";

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
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    width: 300,
  },
}));
function valuetext(value) {
  return value;
}
const Search = () => {
  const classes = useStyles();
  const [genre, setGenre] = useState("");
  const handleSelectChange = (event) => {
    setGenre(event.target.value);
  };
  const [value, setValue] = useState([0, 100]);

  const handleRangeChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="search-component">
      <LinearProgress color="primary" />
      <form className="search-form">
        <input type="search" className="search-input" />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Genre</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={genre}
            onChange={handleSelectChange}
            label="Genre"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Philosophy">Philosophy</MenuItem>
            <MenuItem value="Learning">Learning</MenuItem>
            <MenuItem value="Romance">Romance</MenuItem>
          </Select>
        </FormControl>
        <div className={classes.root}>
          <Typography id="range-slider" gutterBottom>
            Price range
          </Typography>
          <Slider
            value={value}
            onChange={handleRangeChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
          />
        </div>
        <CustomizedButton style={styles.search} disableElevation>
          Search
        </CustomizedButton>
      </form>
      <div className="search-result"></div>
    </div>
  );
};
export default Search;

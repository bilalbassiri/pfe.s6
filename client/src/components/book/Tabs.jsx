import React, { useState } from "react";
//Material UI components
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Box } from "@material-ui/core";
// components
import { Rating, CustomizedButton } from "..";
import AddReview from "./AddReview";
import AllReviews from "./AllReviews";
//...
import PropTypes from "prop-types";

const styles = {
  show: {
    backgroundColor: "#8CBBBD",
    borderRadius: 20,
    "&:hover": {
      backgroundColor: "#83ADAF",
    },
  },
};

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const SimpleTabs = ({
  book: {
    author,
    rating,
    rating_count,
    release,
    createdAt,
    language,
    pages,
    genres,
    sales,
    quantity,
    price,
  },
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [showAddReview, setShowAddReview] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  release = new Date(release).getFullYear();
  createdAt = new Date(createdAt).getFullYear();

  return (
    <div className={classes.root + " tabs"}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          centered
        >
          <Tab label="Reviews" {...a11yProps(0)} />
          <Tab label="Detail" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className="panel reviews">
        <Rating porpose="average_read" rating={rating} count={rating_count} />
        {showAddReview ? (
          <AddReview setShowAddReview={setShowAddReview} />
        ) : (
          <div className="show-add-review-cont">
            <CustomizedButton
              color="primary"
              disableElevation
              style={styles.show}
              onClick={() => {
                setShowAddReview(true);
              }}
            >
              Add your review
            </CustomizedButton>
          </div>
        )}
        <AllReviews />
      </TabPanel>
      <TabPanel value={value} index={1} className="panel detail">
        <ul>
          <li>
            <b>Price:</b> {price.toFixed(2)} USD
          </li>
          <li>
            <b>Published:</b> {release}
          </li>
          <li>
            <b>Added:</b> {createdAt}
          </li>
          <li>
            <b>Language:</b> {language}
          </li>
          <li>
            <b>Pages:</b> {pages}
          </li>
          <li>
            <b>Author:</b> {author}
          </li>
          <li>
            <b>Genres:</b> {genres.join(", ")}
          </li>
          <li>
            <b>Sales:</b> {sales}
          </li>
          <li>
            <b>Quantity:</b> {quantity}
          </li>
        </ul>
      </TabPanel>
    </div>
  );
};
export default SimpleTabs;

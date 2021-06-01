import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import clsx from "clsx";

// Material UI components
import { makeStyles } from "@material-ui/core/styles";
import { Grid, FormControl } from "@material-ui/core";
// Components
import { CustomAlert, CustomizedButton, CustomizedInput } from "..";
// Helper functions
import { adminAddNewBook } from "../../helpers/axios.helpers";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { setNewBook } from "../../redux/actions/adminActions";

const useStyles = makeStyles(() => ({
  margin: {
    margin: `10px 0px`,
  },
  width: {
    width: "40ch",
  },
  semiWidth: {
    width: "19ch",
  },
}));

const styles = {
  btn: {
    margin: `10px 0px`,
    backgroundColor: "#2a9d8f",
    padding: "8px",
    borderRadius: 20,
    width: "130px",
    "&:hover": {
      backgroundColor: "#1f776d",
    },
  },
};
const AddNewBook = () => {
  const history = useHistory();
  const classes = useStyles();
  const { accessToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const getDefaultReleaseDate = () => {
    const d = new Date();
    return (
      d.getFullYear() +
      "-" +
      (d.getMonth() < 10 ? "0" : "") +
      (d.getMonth() + 1) +
      "-" +
      (d.getDate() < 10 ? "0" : "") +
      d.getDate()
    );
  };
  const defaultValues = {
    name: "",
    cover: "",
    author: "",
    release: getDefaultReleaseDate(),
    quantity: "",
    price: "",
    description: "",
    genres: [],
    change: true,
    disabled: true,
  };
  const [values, setValues] = useState(defaultValues);
  const defaultActionState = {
    loading: false,
    actionDone: false,
    openAlert: false,
    message: "",
  };
  const [actionState, setActionState] = useState(defaultActionState);
  const handleChange = (prop) => (event) => {
    setValues((prev) => ({
      ...prev,
      [prop]:
        prop === "genres"
          ? event.target.value.split(",").map((genre) => genre.trim())
          : event.target.value,
      disabled: false,
    }));
  };
  const handleActionEnd = (msg, added) => {
    setActionState((prev) => ({
      loading: false,
      actionDone: added,
      openAlert: true,
      message: msg,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setValues((prev) => ({ ...prev, disabled: true }));
    setActionState(defaultActionState);
    adminAddNewBook(values, accessToken).then(({ msg, added, result }) => {
      handleActionEnd(msg, added);
      if (added) {
        setValues(defaultValues);
        dispatch(setNewBook(result));
      } else {
        setValues((prev) => ({ ...prev, disabled: false }));
      }
    });
  };
  return (
    <div className="fly add-book">
      <button
        className="cls-scp"
        type="Button"
        onClick={() => history.goBack()}
      >
        <KeyboardBackspaceIcon className="arr" />
      </button>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container justify="space-between" wrap="wrap">
          <Grid item justify="center" alignItems="center" direction="column">
            <Grid>
              <FormControl
                className={clsx(classes.margin, classes.width)}
                variant="outlined"
              >
                <CustomizedInput
                  value={values.name}
                  label="Name"
                  variant="outlined"
                  type="text"
                  onChange={handleChange("name")}
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl
                className={clsx(classes.margin, classes.width)}
                variant="outlined"
              >
                <CustomizedInput
                  value={values.cover}
                  label="Cover"
                  variant="outlined"
                  type="url"
                  onChange={handleChange("cover")}
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl
                className={clsx(classes.margin, classes.width)}
                variant="outlined"
              >
                <CustomizedInput
                  value={values.author}
                  label="Author"
                  variant="outlined"
                  type="text"
                  onChange={handleChange("author")}
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl
                className={clsx(classes.margin, classes.width)}
                variant="outlined"
              >
                <CustomizedInput
                  value={values.description}
                  label="Description"
                  multiline
                  variant="outlined"
                  type="text"
                  onChange={handleChange("description")}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item justify="center" alignItems="center" direction="column">
            <Grid>
              <FormControl
                className={clsx(classes.margin, classes.width)}
                variant="outlined"
              >
                <CustomizedInput
                  value={values.genres}
                  label="Genres"
                  variant="outlined"
                  placeholder="Ex: Romance, Fantasy, History"
                  type="text"
                  onChange={handleChange("genres")}
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl
                className={clsx(classes.margin, classes.width)}
                variant="outlined"
              >
                <CustomizedInput
                  value={values.release}
                  label="Release date"
                  variant="outlined"
                  type="date"
                  onChange={handleChange("release")}
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl
                className={clsx(classes.margin, classes.width)}
                variant="outlined"
              >
                <CustomizedInput
                  value={values.price}
                  variant="outlined"
                  type="number"
                  label="Price"
                  inputProps={{ min: 0 }}
                  onChange={handleChange("price")}
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl
                className={clsx(classes.margin, classes.width)}
                variant="outlined"
              >
                <CustomizedInput
                  value={values.quantity}
                  type="number"
                  label="Quantity"
                  variant="outlined"
                  inputProps={{ min: 0 }}
                  onChange={handleChange("quantity")}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid
            container
            alignItems="center"
            justify="space-between"
            style={{ marginTop: "20px" }}
          >
            <CustomizedButton
              className={clsx(classes.margin)}
              type="button"
              style={styles.btn}
              onClick={() => setValues(defaultValues)}
              disabled={values.disabled}
            >
              Reset
            </CustomizedButton>
            <CustomizedButton
              disabled={values.disabled}
              className={clsx(classes.margin)}
              type="submit"
              style={styles.btn}
            >
              Add
            </CustomizedButton>
          </Grid>
        </Grid>
      </form>
      {actionState.openAlert && (
        <CustomAlert
          message={actionState.message}
          severity={actionState.actionDone ? "success" : "error"}
        />
      )}
    </div>
  );
};
export default AddNewBook;

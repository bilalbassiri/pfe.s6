import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import axios from "axios";

// Material UI components
import { makeStyles } from "@material-ui/core/styles";
import { Grid, FormControl } from "@material-ui/core";
// Components
import {
  CircularProgress,
  CustomizedButton,
  FormError,
  CustomizedInput,
} from "..";
// Helper functions
import { setFormErrors, isValidatedForm } from "../../helpers/account.helpers";
import { updateUserAccount, deleteAccount } from "../../helpers/axios.helpers";
import { userLogout } from "../../redux/actions/userActions";

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
  save: {
    margin: `10px 0px`,
    backgroundColor: "#2a9d8f",
    padding: "8px",
    borderRadius: 20,
    width: "130px",
    "&:hover": {
      backgroundColor: "#1f776d",
    },
  },
  delete: {
    margin: `10px 0px`,
    backgroundColor: "white",
    padding: "8px",
    fontSize: ".8rem",
    color: "#666",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "white",
      color: "#333",
    },
  },
};
const EditBook = () => {
  const { book_id } = useParams();
  const {
    dashboard: { books },
  } = useSelector((state) => state);
  const book = books.filter((book) => book._id === book_id);
  const classes = useStyles();
  const { credentials, accessToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    cover: "",
    author: "",
    release: "",
    quantity: "",
    price: "",
    genres: "",
    change: true,
    disabled: true,
  });
  const [errorMessages, setErrorMessages] = useState({});
  const history = useHistory();
  const handleChange = (prop) => (event) => {
    setValues((prev) => ({
      ...prev,
      [prop]: event.target.value,
      disabled: false,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setValues((prev) => ({ ...prev, disabled: true }));
    setFormErrors(values, setErrorMessages);
  };
  useEffect(() => {
    if (credentials && values.change) {
      setValues((prev) => ({
        ...prev,
        first_name: credentials.name.split(" ")[0],
        last_name: credentials.name.split(" ")[1],
        email: credentials.email,
        change: false,
      }));
    }
    if (isValidatedForm(errorMessages)) {
      updateUserAccount(values, accessToken).then((data) => {
        if (data.msg)
          setErrorMessages((prev) => ({
            ...prev,
            oldPasswordErr: data.msg,
          }));
      });
    }
  }, [credentials, errorMessages, accessToken, values]);
  return accessToken && credentials ? (
    <div>
      <form
        className="edit-book"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid style={{ marginBottom: "20px" }}>
            <h1>Update Book</h1>
          </Grid>
          <Grid style={{ marginTop: 30 }}>
            <div style={{ display: "flex", gap: "2ch" }}>
              <FormControl
                className={clsx(classes.margin, classes.semiWidth)}
                variant="outlined"
              >
                <CustomizedInput
                  label="Name"
                  variant="outlined"
                  value={values.name}
                  type="text"
                  onChange={handleChange("name")}
                />
                <FormError message={errorMessages.firstNameErr} />
              </FormControl>
              <FormControl
                className={clsx(classes.margin, classes.semiWidth)}
                variant="outlined"
              >
                <CustomizedInput
                  label="Author"
                  variant="outlined"
                  value={values.author}
                  type="text"
                  onChange={handleChange("author")}
                />
                <FormError message={errorMessages.lastNameErr} />
              </FormControl>
            </div>
            <Grid>
              <FormControl
                className={clsx(classes.margin, classes.width)}
                variant="outlined"
              >
                <CustomizedInput
                  label="Genres"
                  variant="outlined"
                  value={values.genres}
                  placeholder="Ex: Romance, Fantasy, History"
                  type="text"
                  onChange={handleChange("genres")}
                />
                <FormError message={errorMessages.emailErr} />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl
                className={clsx(classes.margin, classes.width)}
                variant="outlined"
              >
                <CustomizedInput
                  variant="outlined"
                  type="number"
                  label="Price"
                  onChange={handleChange("price")}
                />
                <FormError message={errorMessages.oldPasswordErr} />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl
                className={clsx(classes.margin, classes.width)}
                variant="outlined"
              >
                <CustomizedInput
                  type="number"
                  value={values.quantity}
                  label="Quantity"
                  variant="outlined"
                  onChange={handleChange("quantity")}
                />
                <FormError message={errorMessages.newPasswordErr} />
              </FormControl>
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
                style={styles.save}
                onClick={() =>
                  setValues((prev) => ({
                    ...prev,
                    change: true,
                    disabled: true,
                  }))
                }
              >
                Reset
              </CustomizedButton>
              <CustomizedButton
                disabled={values.disabled}
                className={clsx(classes.margin)}
                type="submit"
                style={styles.save}
              >
                Update
              </CustomizedButton>
            </Grid>
            <Grid style={{ textAlign: "center" }}>
              <CustomizedButton
                disableElevation
                onClick={() => {
                  const psw = prompt(
                    "Your account will be dispear forever, to valid this enter your password."
                  );
                  if (!psw) return;
                  deleteAccount(psw, accessToken).then((res) => {
                    if (res.deleted) {
                      axios.get("/user/logout");
                      dispatch(userLogout());
                      history.push("/");
                    }
                    console.log(res);
                  });
                }}
                className={clsx(classes.margin)}
                type="submit"
                style={styles.delete}
              >
                Delete
              </CustomizedButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  ) : (
    <CircularProgress plan={{ h: "calc(100vh - 84px)", w: "100%" }} />
  );
};
export default EditBook;

import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import clsx from "clsx";
// Material UI components
import { makeStyles } from "@material-ui/core/styles";
import { Grid, FormControl } from "@material-ui/core";
// Helper functions
import { startLoading } from "../../helpers/login.helpers";
import { setFormErrors, isValidatedForm } from "../../helpers/signup.helpers";
// Components
import {
  CircularProgress,
  CustomizedButton,
  FormError,
  CustomizedInput,
} from "..";
// Redux actions
import { userLogin, userSetAccessToken } from "../../redux/actions/userActions";

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
  signup: {
    margin: `10px 0px`,
    backgroundColor: "#7a87f2",
    padding: "8px",
    borderRadius: 20,
    width: "130px",
    "&:hover": {
      backgroundColor: "#616cce",
    },
  },
};
const SignUp = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isNewUser: true,
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(({ user }) => user);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setDisabled(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setDisabled(true);
    setFormErrors(values, setErrorMessages);
  };
  useEffect(() => {
    if (user.accessToken) history.push("/");
    const id = startLoading(setIsLoading);
    setIsSignedUp(isValidatedForm(errorMessages));
    if (isSignedUp) {
      axios({
        method: "post",
        url: "/user/register",
        data: values,
      }).then(({ data: user }) => {
        if (user.signed) {
          dispatch(userLogin(user.credentials));
          dispatch(userSetAccessToken(user.ACCESS_TOKEN));
        } else {
          setDisabled(false);
          setErrorMessages({ ...errorMessages, emailErr: user.msg });
        }
      });
    }
    return () => {
      clearTimeout(id);
    };
  }, [user, errorMessages, isSignedUp, history, dispatch, values]);
  return isLoading ? (
    <CircularProgress plan={{ h: "100vh", w: "100%" }} color="#7a87f2" />
  ) : (
    <form onSubmit={handleSubmit} className="sign-up-page">
      <Grid className="signing-side">
        <h6 className="logo" onClick={() => history.push("/")}>
          kafka
        </h6>
        <div>
          <h2 className="sgnup">So many books.. little time</h2>
          <h4>Let's find your favorite book to improve your knowledge</h4>
        </div>
        <div>
          <img
            src="https://cdn.dribbble.com/users/2417352/screenshots/14643918/media/faa887ce3580b522cc5a3324206e405b.png?compress=1&resize=1200x900"
            alt="reader"
          />
          <p>
            Art by{" "}
            <a
              href="https://dribbble.com/leila_divine"
              target="_blank"
              rel="noreferrer"
            >
              Leila Divine
            </a>
          </p>
        </div>
      </Grid>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        className="sign-up-page-form"
      >
        <Grid style={{ marginBottom: "20px" }}>
          <h1 className="signing-heading">Sign up</h1>
        </Grid>
        <Grid>
          <div style={{ display: "flex", gap: "2ch" }}>
            <FormControl
              className={clsx(classes.margin, classes.semiWidth)}
              variant="outlined"
            >
              <CustomizedInput
                label="First name"
                variant="outlined"
                type="text"
                onChange={handleChange("first_name")}
              />
              <FormError message={errorMessages.firstNameErr} />
            </FormControl>
            <FormControl
              className={clsx(classes.margin, classes.semiWidth)}
              variant="outlined"
            >
              <CustomizedInput
                label="Last name"
                variant="outlined"
                type="text"
                onChange={handleChange("last_name")}
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
                label="Email"
                variant="outlined"
                type="text"
                onChange={handleChange("email")}
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
                id="outlined-adornment-password"
                type="password"
                value={values.password}
                onChange={handleChange("password")}
                label="Password"
              />
              <FormError message={errorMessages.passwordErr} />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl
              className={clsx(classes.margin, classes.width)}
              variant="outlined"
            >
              <CustomizedInput
                id="outlined-confirm-password"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                label="Confirm password"
                variant="outlined"
              />
              <FormError message={errorMessages.confirmPasswordErr} />
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
              type="submit"
              disabled={disabled}
              style={styles.signup}
            >
              Sign up
            </CustomizedButton>
            <span className="sign-guide">
              Already have an account? <Link to="/login">Log in</Link>
            </span>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
export default SignUp;

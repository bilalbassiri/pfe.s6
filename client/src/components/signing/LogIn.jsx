import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Material UI components
import {
  Grid,
  TextField,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
} from "@material-ui/core";
// Material UI icons
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
// Components
import { CircularProgress, CustomizedButton, FormError } from "..";
// Helper functions
import { getLoginError, startLoading } from "../../helpers/login.helpers";
// Redux actions
import { userLogin, userSetAccessToken } from "../../redux/actions/userActions";
import { getDashboardData } from "../../helpers/axios.helpers";
import { setAdminDashboard } from "../../redux/actions/adminActions";

const styles = {
  login: {
    backgroundColor: "#ed9486",
    padding: "8px",
    borderRadius: 25,
    width: "100%",
    "&:hover": {
      backgroundColor: "#ee9a8d",
    },
  },
};
const LogIn = () => {
  const user = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [formErrors, setformErrors] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const handleChange = (prop) => (event) => {
    setFormValues({ ...formValues, [prop]: event.target.value });
  };
  const logInUser = async () => {
    const { email, password } = formValues;
    try {
      const { data: user } = await axios({
        method: "post",
        url: "/user/login",
        data: { email, password },
      });
      if (user.logged) {
        const { data } = await axios({
          method: "get",
          url: "/user/info",
          headers: {
            authorization: user.ACCESS_TOKEN,
          },
        });
        dispatch(userLogin(data));
        dispatch(userSetAccessToken(user.ACCESS_TOKEN));
        if (data.role === 1) {
          getDashboardData(user.ACCESS_TOKEN).then((appData) =>
            dispatch(setAdminDashboard(appData))
          );
        }
        history.push("/");
      } else {
        setDisabled(false);
        setformErrors(user.msg);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    if (getLoginError(formValues).noErrors) {
      logInUser();
    } else {
      setformErrors(getLoginError(formValues).message);
      setDisabled(false);
    }
  };

  const handleClickShowPassword = () => {
    /** handle password visibility */
    setFormValues({ ...formValues, showPassword: !formValues.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    if (user.accessToken) history.push("/"); // Redirect to the home page f the user is already logged in
    const id = startLoading(setIsLoading /**timer */); // Execute setIsLoading(false) after 2s delay
    return () => {
      clearTimeout(id);
    };
  }, [user, history]);
  return isLoading ? (
    <CircularProgress plan={{ h: "100vh", w: "100%" }} color="#ed9486" />
  ) : (
    <form onSubmit={handleSubmit} className="sign-in-page">
      <Grid className="signing-side">
        <h6 className="logo" onClick={() => history.push("/")}>
          kafka
        </h6>
        <div>
          <h2>Welcome Back</h2>
          <h4>Find your book & Lose yourself</h4>
        </div>
        <img
          src="https://cdn.dribbble.com/users/185738/screenshots/8170999/media/ef66849de15e9b9ae2b30c2840c6a8d6.png?compress=1&resize=1200x900"
          alt="reading"
        />
        <p>
          Art by{" "}
          <a
            href="https://dribbble.com/siegemedia"
            target="_blank"
            rel="noreferrer"
          >
            Seige Media
          </a>
        </p>
      </Grid>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        className="sign-in-page-form"
      >
        <Grid style={{ marginBottom: "20px" }}>
          <h1 className="signing-heading">Log in</h1>
        </Grid>
        <Grid>
          <FormControl className="fieldset" variant="outlined">
            <TextField
              autoFocus
              autoComplete
              label="Email"
              variant="outlined"
              type="email"
              value={formValues.email}
              onChange={handleChange("email")}
            />
          </FormControl>
        </Grid>
        <Grid>
          <FormControl className="fieldset" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={formValues.showPassword ? "text" : "password"}
              value={formValues.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {formValues.showPassword ? (
                      <VisibilityOutlinedIcon className="visibility-icon" />
                    ) : (
                      <VisibilityOffOutlinedIcon className="visibility-icon" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
            <div className="login-error">
              <FormError message={formErrors} />
            </div>
          </FormControl>
        </Grid>
        <Grid style={{ width: "30ch" }}>
          <CustomizedButton
            disabled={disabled}
            type="submit"
            style={styles.login}
          >
            Log in
          </CustomizedButton>
        </Grid>
        <Grid item className="sign-guide">
          <p>
            Not a member? <Link to="/sign-up">Sign up</Link>
          </p>
        </Grid>
      </Grid>
    </form>
  );
};
export default LogIn;

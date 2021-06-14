import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import GitHubIcon from "@material-ui/icons/GitHub";
import axios from "axios";
import { userLogout } from "../../redux/actions/userActions";

const Footer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.user);
  return (
    <div className="footer">
      <div>
        <ul>
          {accessToken ? (
            <li
              onClick={() => {
                axios.get("/user/logout");
                dispatch(userLogout());
                history.push("/login");
              }}
              style={{ color: "#1a535c", fontWeight: "bold" }}
            >
              Logout
            </li>
          ) : (
            <li
              onClick={() => history.push("/login")}
              style={{ color: "#1a535c", fontWeight: "bold" }}
            >
              Login
            </li>
          )}
          <li onClick={() => history.push("/")}>Home</li>
          <li onClick={() => history.push("/contact-us")}>Contact us</li>
          <li>About</li>
        </ul>
      </div>
      <a
        href="https://github.com/bilalbassiri/pfe.s6"
        target="_blank"
        rel="noreferrer"
      >
        <GitHubIcon className="icon" />
      </a>
    </div>
  );
};
export default Footer;

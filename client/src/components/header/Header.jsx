import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
// Material UI components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
  Tooltip,
  Avatar,
} from "@material-ui/core";
// Material UI icons
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import MoreIcon from "@material-ui/icons/MoreVert";
import ClearIcon from "@material-ui/icons/Clear";
//Components
import { CustomizedButton } from "..";
import LeftDrawer from "./LeftDrawer";
// Redux actions
import { readNotifications, userLogout } from "../../redux/actions/userActions";
import { sendNotifications } from "../../helpers/axios.helpers";
import { getPassedTime } from "../../helpers/global.helpers";

const styles = {
  signup: {
    color: "white",
    backgroundColor: "#2a9d8f",
    border: "1px solid #2a9d8f",
    fontSize: ".75rem",
    fontWeight: "bold",
    marginLeft: 3,
    width: "12ch",
    padding: "5px",
    "&:hover": {
      backgroundColor: "white",
      color: "#2a9d8f",
    },
  },
  login: {
    backgroundColor: "white",
    color: "#333",
    fontSize: ".75rem",
    fontWeight: "bold",
    padding: "5px",
    width: "12ch",
    "&:hover": {
      color: "black",
      backgroundColor: "white",
    },
  },
};
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -2,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: "#EF7C8E",
    fontWeight: "bold",
  },
}))(Badge);
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  inputRoot: {
    color: "black",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    user: {
      cart,
      favoris,
      notifications,
      new_notifications,
      credentials,
      accessToken,
      isLoading,
    },
  } = useSelector((state) => state);
  const history = useHistory();
  const [scrollDown, setScrollDown] = useState(false);
  // Handling Material UI components
  const [anchorEl, setAnchorEl] = useState(null);
  const [openNot, setOpenNot] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const count = {
    cart: cart?.length,
    favoris: favoris?.length,
    new_notifications: new_notifications?.length,
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to={`/readers/${credentials?.username}`} style={{ color: "black" }}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
      <Link to={`/me/account`}>
        <MenuItem onClick={handleMenuClose} style={{ color: "black" }}>
          My account
        </MenuItem>
      </Link>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          axios.get("https://powerful-cove-30608.herokuapp.com/user/logout");
          dispatch(userLogout());
          history.push("/login");
        }}
      >
        Log out
      </MenuItem>
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => history.push("/me/cart")}>
        <IconButton aria-label={`Show ${count.cart} books in the cart`}>
          <StyledBadge badgeContent={count.cart} color="secondary">
            <ShoppingCartOutlinedIcon />
          </StyledBadge>
        </IconButton>
        <p> Cart</p>
      </MenuItem>
      <MenuItem onClick={() => history.push("/me/favoris")}>
        <IconButton aria-label={`Show ${count.favoris} books in the favoris`}>
          <StyledBadge badgeContent={count.favoris} color="secondary">
            <FavoriteBorderOutlinedIcon />
          </StyledBadge>
        </IconButton>
        <p> Favoris</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          setNotificationsRead(true);
          setOpenNot(!openNot);
        }}
      >
        <IconButton
          aria-label={`Show ${count.new_notifications} new notifications`}
        >
          <StyledBadge badgeContent={count.new_notifications} color="secondary">
            <NotificationsOutlinedIcon />
          </StyledBadge>
        </IconButton>
        <p> Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
        >
          <AccountCircleOutlinedIcon />
        </IconButton>
        <p>Me</p>
      </MenuItem>
    </Menu>
  );
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollDown(window.scrollY > 20);
    });
  }, []);
  useEffect(() => {
    if (notificationsRead) {
      sendNotifications(credentials?._id, "", "read", accessToken);
    }
  }, [notificationsRead, credentials, accessToken]);
  const Notification = ({ cls, str }) => (
    <div
      className={"container " + cls}
      onClick={() => {
        setOpenNot(false);
        dispatch(readNotifications());
        if (str.direction === "/readers/me") {
          history.push("/readers/" + credentials?.username);
          return;
        }
        history.push(str.direction);
      }}
    >
      <Avatar className="avatar" src={str.picture} alt={str.name}>
        {str.name[0]}
      </Avatar>
      <div className="content">
        <div
          className="text"
          dangerouslySetInnerHTML={{ __html: str.content }}
        ></div>
        <div class="date">{getPassedTime(str.date)}</div>
      </div>
    </div>
  );
  return (
    <div className={classes.grow + " header"}>
      {openNot && (
        <div className="notifications-container">
          <div className="topMain">
            <h2>Notifications</h2>
            <button
              onClick={() => {
                setOpenNot(false);
                dispatch(readNotifications());
              }}
              type="button"
            >
              <ClearIcon className="icon" />
            </button>
          </div>
          <div className="notifications">
            {new_notifications?.map((str, i) => (
              <Notification key={i} cls="new_not" str={str} />
            ))}
            {notifications?.map((str, i) => (
              <Notification key={i} cls="old_not" str={str} />
            ))}
          </div>
        </div>
      )}
      <AppBar position="fixed">
        <Toolbar
          style={{ borderColor: scrollDown ? "#dfdfdf" : "transparent" }}
        >
          <LeftDrawer />
          <Typography
            className={classes.title + " logo"}
            onClick={() => history.push("/")}
            variant="h6"
            noWrap
          >
            kafka
          </Typography>
          <div className={classes.grow} />
          {!isLoading &&
            (accessToken ? (
              <div className={classes.sectionDesktop}>
                <Tooltip
                  title="Shopping card"
                  arrow
                  onClick={() => history.push("/me/cart")}
                >
                  <IconButton
                    aria-label={`Show ${count.cart} books in the cart`}
                  >
                    <StyledBadge badgeContent={count.cart} color="secondary">
                      <ShoppingCartOutlinedIcon />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="Favoris"
                  arrow
                  onClick={() => history.push("/me/favoris")}
                >
                  <IconButton
                    aria-label={`Show ${count.favoris} books in the favoris`}
                  >
                    <StyledBadge badgeContent={count.favoris} color="secondary">
                      <FavoriteBorderOutlinedIcon />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="Notifications"
                  arrow
                  onClick={() => {
                    setNotificationsRead(true);
                    setOpenNot(!openNot);
                  }}
                >
                  <IconButton
                    aria-label={`Show ${count.new_notifications} new notifications`}
                  >
                    <StyledBadge
                      badgeContent={count.new_notifications}
                      color="secondary"
                    >
                      <NotificationsOutlinedIcon />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Profile" arrow>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                  >
                    <Avatar
                      src={credentials?.picture}
                      style={{ height: 25, width: 25 }}
                    />
                  </IconButton>
                </Tooltip>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <CustomizedButton
                    type="button"
                    disableElevation
                    style={styles.login}
                  >
                    Log in
                  </CustomizedButton>
                </Link>
                <Link to="/sign-up">
                  <CustomizedButton
                    type="button"
                    disableElevation
                    style={styles.signup}
                  >
                    Sign up
                  </CustomizedButton>
                </Link>
              </>
            ))}
          {accessToken && (
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
              >
                <MoreIcon />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};
export default Header;

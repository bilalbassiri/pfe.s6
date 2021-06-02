import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
//Material UI components
import {
  Drawer,
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Badge,
} from "@material-ui/core";

//Material UI icons
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
import CardTravelOutlinedIcon from "@material-ui/icons/CardTravelOutlined";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const LeftDrawer = () => {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState(false);
  const {
    user: { credentials },
    dashboard: { orders },
  } = useSelector((state) => state);
  const getNewOrders = () =>
    orders.filter((order) => !order.delivered && !order.delivering).length;

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List className="list-1">
        <Typography
          variant="h6"
          style={{ textAlign: "center", padding: "15px 0px" }}
          className="logo"
          noWrap
          onClick={() => history.push("/")}
        >
          kafka
        </Typography>
        <ListItem button onClick={() => history.push("/")}>
          <ListItemIcon>
            <HomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => history.push("/search")}>
          <ListItemIcon>
            <SearchOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItem>
      </List>
      {credentials?.role === 1 && (
        <>
          <Divider />
          <h1 style={{ fontSize: "1rem", padding: 20 }}>Admin</h1>
          <List>
            <ListItem button onClick={() => history.push("/admin/dashboard")}>
              <ListItemIcon>
                <DashboardOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              button
              onClick={() => history.push("/admin/dashboard/users")}
            >
              <ListItemIcon>
                <PeopleAltOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem
              button
              onClick={() => history.push("/admin/dashboard/books")}
            >
              <ListItemIcon>
                <LibraryBooksOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Books" />
            </ListItem>
            <ListItem
              button
              onClick={() => history.push("/admin/dashboard/reviews")}
            >
              <ListItemIcon>
                <CreateOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Reviews" />
            </ListItem>
            <ListItem
              button
              onClick={() => history.push("/admin/dashboard/orders")}
            >
              <ListItemIcon>
                <Badge badgeContent={getNewOrders()} color="primary">
                  <CardTravelOutlinedIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem
              button
              onClick={() => history.push("/admin/dashboard/sales")}
            >
              <ListItemIcon>
                <LocalAtmIcon />
              </ListItemIcon>
              <ListItemText primary="Sales" />
            </ListItem>
            <ListItem
              button
              onClick={() => history.push("/admin/dashboard/messages")}
            >
              <ListItemIcon>
                <Badge badgeContent={orders.length} color="primary">
                  <EmailOutlinedIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Messages" />
            </ListItem>
          </List>
        </>
      )}
    </div>
  );

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};
export default LeftDrawer;

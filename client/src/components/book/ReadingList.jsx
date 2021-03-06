import React, { useState, useRef } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { useDispatch, useSelector } from "react-redux";
import { switchReadingList } from "../../redux/actions/userActions";
import { updateReadingList } from "../../helpers/axios.helpers";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import DoneAllRoundedIcon from "@material-ui/icons/DoneAllRounded";
import { useHistory } from "react-router-dom";
export default function ReadingList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    user: { accessToken, read, currently_reading, to_read },
    books: { currentBook },
  } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const handleToggle = () => {
    if (!accessToken) history.push("/login");
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  const addToReadingList = (section) => {
    const list = {
      read: read?.filter((id) => id !== currentBook?._id),
      to_read: to_read?.filter((id) => id !== currentBook?._id),
      currently_reading: currently_reading?.filter(
        (id) => id !== currentBook?._id
      ),
    };
    let newList = {};
    if (section === "read") {
      newList = {
        read: [...list.read, currentBook._id],
        to_read: list.to_read,
        currently_reading: list.currently_reading,
      };
    } else if (section === "to_read") {
      newList = {
        read: list.read,
        to_read: [...list.to_read, currentBook?._id],
        currently_reading: list.currently_reading,
      };
    } else if (section === "not-interested") {
      newList = list;
    } else {
      newList = {
        read: list.read,
        to_read: list.to_read,
        currently_reading: [...list.currently_reading, currentBook?._id],
      };
    }
    updateReadingList(newList, accessToken);
    dispatch(switchReadingList(newList));
  };
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <div className="reading-list">
      <button
        className="reading-button"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {read?.includes(currentBook?._id) ||
        to_read?.includes(currentBook?._id) ||
        currently_reading?.includes(currentBook?._id) ? (
          <DoneAllRoundedIcon />
        ) : (
          <AddRoundedIcon />
        )}
      </button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: 1 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    onClick={(e) => {
                      addToReadingList("read");
                      handleClose(e);
                    }}
                  >
                    I have read
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      addToReadingList("to_read");
                      handleClose(e);
                    }}
                  >
                    I want to read
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      addToReadingList("currently_reading");
                      handleClose(e);
                    }}
                  >
                    I'm currently reading
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      addToReadingList("not-interested");
                      handleClose(e);
                    }}
                  >
                    I'm not interested
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

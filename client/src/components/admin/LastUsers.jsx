import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// Material UI components
import { Avatar } from "@material-ui/core";

const LastUsers = () => {
  const history = useHistory();
  const { users } = useSelector((state) => state.dashboard);
  const getSignupDate = (dt) => {
    dt = new Date(dt);
    const year = dt.getFullYear();
    const month = dt.getMonth() + 1;
    const day = dt.getDate();
    return `${year}-${month}-${day} ${
      dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()
    }`;
  };
  return (
    <div className="last-users">
      <h5 className="head">Last joined users</h5>
      <div className="last-users-container">
        {users.slice(0, 3).map((user) => (
          <div
            className="last-users-item"
            onClick={() => history.push("/readers/" + user.username)}
          >
            <div key={user._id} className="user">
              <Avatar src={user.picture} alt={user.name}>
                {user.name[0]}
              </Avatar>
              <h5 className="name">{user.name}</h5>
            </div>
            <p className="email">{user.email}</p>
            <p className="joined">{getSignupDate(user.createdAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LastUsers;

import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { adminReadMessage } from "../../helpers/axios.helpers";
import { readMessage } from "../../redux/actions/adminActions";
const Messages = () => {
  const dispatch = useDispatch();
  const {
    dashboard: { mails },
    user: { accessToken },
  } = useSelector((state) => state);
  const [message, setMessage] = useState(null);
  console.log(message);
  return (
    <div className="mails">
      <div className="mails-container">
        {mails.map((mail) => (
          <div
            className={
              "mail-item " +
              (!mail.read ? "mail-item-read" : "") +
              (message?._id === mail._id ? " current-mail" : "")
            }
            key={mail._id}
            onClick={() => {
              setMessage(mail);
              dispatch(readMessage({ _id: mail._id }));
              adminReadMessage(mail._id, accessToken);
            }}
          >
            <div className="user">
              <div className="info">
                <Avatar src={mail.loggedIn && mail.user.picture} alt="sender">
                  {(mail.loggedIn ? mail.user.name : mail.fullName)[0]}
                </Avatar>
                <div className="name-email">
                  <h4>{mail.loggedIn ? mail.user.name : mail.fullName}</h4>
                  <h5>{mail.loggedIn ? mail.user.email : mail.email}</h5>
                </div>
              </div>
              <div className="date">
                {new Date(mail.createdAt).toDateString()}
              </div>
            </div>
            <div className="subject">
              {mail.subject.substring(0, 30) +
                (mail.subject.length > 30 ? "..." : "")}
            </div>
            <div className="message">
              {mail.message.substring(0, 100) +
                (mail.message.length > 100 ? "..." : "")}
            </div>
          </div>
        ))}
      </div>
      <div className="screen">
        {message && (
          <h2>{message.loggedIn ? message.user.name : message.fullName}</h2>
        )}
      </div>
    </div>
  );
};
export default Messages;

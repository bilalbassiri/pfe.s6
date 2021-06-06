import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { adminReadMessage } from "../../helpers/axios.helpers";
import { readMessage } from "../../redux/actions/adminActions";
import DraftsIcon from "@material-ui/icons/Drafts";
import MailIcon from "@material-ui/icons/Mail";
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
        {message ? (
          <div className="mail">
            <div className="header">
              <div className="user">
                <Avatar
                  src={message.loggedIn ? message.user.picture : ""}
                  alt="sender"
                >
                  {(message.loggedIn ? message.user.name : message.fullName)[0]}
                </Avatar>
                <div>
                  <h3>
                    {message.loggedIn ? message.user.name : message.fullName}
                  </h3>
                  {message.loggedIn && <h6>ID: {message.user._id} </h6>}
                </div>
              </div>
              <h6>{new Date(message.createdAt).toDateString()}</h6>
            </div>
            <div className="body">
              <h5>
                <MailIcon style={{ fontSize: "1.1rem", color: "#3f51b5" }} />
                {message.loggedIn ? message.user.email : message.email}
              </h5>
              <h3>
                <span>Subject: </span>
                {message.subject}
              </h3>
              <p>{message.message}</p>
            </div>
          </div>
        ) : (
          <h1 className="no-msg">
            <DraftsIcon />
            <br />
            Messages will be showen here
          </h1>
        )}
      </div>
    </div>
  );
};
export default Messages;

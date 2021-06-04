import React, { useState, useEffect } from "react";
import { FormControl } from "@material-ui/core";
import { useSelector } from "react-redux";
import { CustomizedButton, CustomizedInput } from "..";
import axios from "axios";
import Thanks from "./Thanks";

const styles = {
  send: {
    backgroundColor: "#2a9d8f",
    padding: "5px",
    borderRadius: 20,
    "&:hover": {
      backgroundColor: "#1f776d",
    },
  },
};
const ContactUs = () => {
  const {
    user: { accessToken, isLoading, credentials },
  } = useSelector((state) => state);
  const [values, setValues] = useState({});
  const [mailState, setMailState] = useState({
    sending: false,
    name: "",
    sent: false,
  });
  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setMailState((prev) => ({ ...prev, sending: true }));
    axios({
      method: "post",
      url: "/user/contact",
      data: {
        values,
      },
    }).then((res) => {
      if (res.data) {
        const name = accessToken ? credentials.name : res.data.fullName;
        setMailState((prev) => ({
          ...prev,
          name: name.split(" ")[0],
          sent: true,
        }));
      }
    });
  };
  useEffect(() => {
    if (!isLoading) {
      if (accessToken) {
        setValues({
          loggedIn: true,
          user: credentials._id,
          subject: "",
          message: "",
        });
      } else {
        setValues({
          loggedIn: false,
          fullName: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    }
  }, [isLoading, accessToken, credentials]);
  return (
    <div className="contact-us">
      <div className="pic-section">
        <img
          src="https://cdn.dribbble.com/users/879147/screenshots/9080731/media/63ec599c470296ae6d649195b9bad9ae.jpg"
          alt="meeting"
        />
      </div>
      <div className="form-section">
        {mailState.sent ? (
          <Thanks name={mailState.name} />
        ) : (
          <>
            <h3 className="wave">
              Hi,{" "}
              {!isLoading && accessToken
                ? credentials.name.split(" ")[0]
                : "Folk"}{" "}
              👋
            </h3>
            <h1 className="title">Get in touch</h1>
            <p className="info">
              Have an inquiry or some feedback for us?
              <br />
              Fill out the form below to contact our team.
            </p>
            <form
              nonValidate
              onSubmit={(e) => handleSubmit(e)}
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              {!isLoading && !accessToken && (
                <>
                  <FormControl variant="outlined">
                    <CustomizedInput
                      value={values.fullName}
                      label="Full Name"
                      type="text"
                      variant="outlined"
                      onChange={handleChange("fullName")}
                    />
                  </FormControl>
                  <FormControl variant="outlined">
                    <CustomizedInput
                      label="Email"
                      type="email"
                      variant="outlined"
                      value={values.email}
                      onChange={handleChange("email")}
                    />
                  </FormControl>
                </>
              )}
              <FormControl variant="outlined">
                <CustomizedInput
                  label="Subject"
                  type="text"
                  variant="outlined"
                  value={values.subject}
                  onChange={handleChange("subject")}
                />
              </FormControl>
              <FormControl variant="outlined">
                <CustomizedInput
                  label="Your Message"
                  multiline
                  type="text"
                  variant="outlined"
                  rows={4}
                  value={values.message}
                  onChange={handleChange("message")}
                />
              </FormControl>
              <CustomizedButton
                disabled={mailState.sending}
                type="submit"
                color="primary"
                disableElevation
                style={styles.send}
              >
                Send
              </CustomizedButton>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
export default ContactUs;

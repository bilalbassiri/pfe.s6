import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CustomizedButton, CustomizedInput } from "..";
import EmailSent from "./EmailSent";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { sendResetPasswordMail } from "../../helpers/axios.helpers";

const ResetPassword = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    sendResetPasswordMail(email).then(console.log);
  };
  return (
    <div className="reset-password">
      <div className="left">
        <h6 className="logo" onClick={() => history.push("/")}>
          kafka
        </h6>
        <img
          src="https://cdn.dribbble.com/users/362097/screenshots/9157889/media/50be80c8654b7e41198d40f03d32264f.jpg?compress=1&resize=1200x900"
          alt="reset password"
        />
      </div>
      <div className="right">
        {!false ? (
          <div className="container">
            <div>
              <h2>Forgot your password</h2>
              <p>
                We are here to help you to recover your password.
                <br />
                Enter the email address you used when you joined and we'll send
                you link to reset your password.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <CustomizedInput
                variant="outlined"
                label="Email Address"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%" }}
              />
              <div className="buttons">
                <CustomizedButton
                  type="button"
                  variant="secondary"
                  style={{ fontWeight: "bold" }}
                  onClick={() => history.goBack()}
                >
                  <NavigateBeforeIcon /> Back
                </CustomizedButton>
                <CustomizedButton
                  type="submit"
                  disableElevation
                  style={{
                    fontWeight: "600",
                    margin: `10px 0px`,
                    backgroundColor: "#2a9d8f",
                    padding: "8px 20px",
                    borderRadius: 5,
                    "&:hover": {
                      backgroundColor: "#1f776d",
                    },
                  }}
                >
                  SEND RESET LINK
                </CustomizedButton>
              </div>
            </form>
          </div>
        ) : (
          <EmailSent />
        )}
      </div>
    </div>
  );
};
export default ResetPassword;

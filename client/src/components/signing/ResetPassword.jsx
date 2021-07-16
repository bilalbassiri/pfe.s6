import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CircularProgress, CustomizedButton, CustomizedInput } from "..";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import DoneOutlineRoundedIcon from "@material-ui/icons/DoneOutlineRounded";
import { sendResetPasswordMail } from "../../helpers/axios.helpers";
import { FormError } from "..";

const ResetPassword = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [responseState, setResponseState] = useState({
    resolved: false,
    state: false,
    sending: false,
    message: "",
  });
  const sendMail = () => {
    setResponseState({ ...responseState, resolved: false, sending: true });
    sendResetPasswordMail(email).then((res) =>
      setResponseState({
        resolved: true,
        state: res.valid,
        message: res.msg,
        sending: false,
      })
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    sendMail();
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
        {!(responseState.resolved && responseState.state) ? (
          responseState.sending ? (
            <CircularProgress
              plan={{ h: "300px", w: "300px" }}
              size={{ width: "50px", height: "50px" }}
            />
          ) : (
            <div className="container">
              <div>
                <h2>Forgot your password</h2>
                <p className="des">
                  We are here to help you to recover your password.
                  <br />
                  Enter the email address you used when you joined and we'll
                  send you link to reset your password.
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
                {responseState.message && (
                  <FormError message={responseState.message} />
                )}
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
          )
        ) : (
          <div className="email-sent">
            <h2>Email has been sent!</h2>
            <p className="des">
              Please check your inbox and click in the recieved link to reset
              the password
            </p>
            <DoneOutlineRoundedIcon className="icon" />
            <h6>
              Didn't receive the link?{" "}
              <button
                className="resend"
                type="button"
                onClick={() => sendMail()}
              >
                Resend
              </button>
            </h6>
          </div>
        )}
      </div>
    </div>
  );
};
export default ResetPassword;

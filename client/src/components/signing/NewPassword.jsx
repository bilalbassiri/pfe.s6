import { FormControl } from "@material-ui/core";
import React, { useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { CustomizedInput, CustomizedButton } from "..";
import { changeOldPassword } from "../../helpers/axios.helpers";
import { FormError } from "..";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";

const NewPassword = () => {
  const { userId, token } = useParams();
  const history = useHistory();
  const [values, setValues] = useState({
    password: "",
    confirm: "",
    passwordErr: "",
    confirmErr: "",
    changed: false,
    pending: false,
    actionDone: false,
  });
  const getFormErrors = () => {
    const { password, confirm } = values;
    const err = {
      passwordErr:
        (!password && "Enter a password") ||
        (password.length < 8 && "Use 8 characters or more for your password"),
      confirmPasswordErr:
        (!confirm && "Confirm your password") ||
        (confirm &&
          password &&
          password !== confirm &&
          "Passwords didn’t match. Try again."),
    };
    return {
      password: err.passwordErr,
      confirm: err.confirmPasswordErr,
      valid: !err.passwordErr && !err.confirmPasswordErr,
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = getFormErrors();
    if (!errors.valid) {
      setValues({
        ...values,
        passwordErr: errors.password,
        confirmErr: errors.confirm,
      });
      return;
    }
    setValues({ ...values, pending: true });
    changeOldPassword(userId, token, values.password).then((res) =>
      setValues({
        ...values,
        changed: res.valid,
        actionDone: true,
        pending: false,
      })
    );
  };
  return (
    <div className="new-password">
      {values.changed ? (
        <div className="changed">
          <h4>Your password has been successfully changed</h4>
          <DoneRoundedIcon className="done-icon" />
          <CustomizedButton
            type="button"
            style={{
              fontWeight: "600",
              backgroundColor: "#2a9d8f",
              padding: "8px 30px",
              borderRadius: 20,
              "&:hover": {
                backgroundColor: "#1f776d",
              },
            }}
            onClick={() => history.push("/login")}
          >
            Sign in
          </CustomizedButton>
        </div>
      ) : (
        <div className="container">
          <div className="info">
            <h2>Create new password</h2>
            <p className="des">
              Your new password must be different from previous used passwords.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <FormControl variant="outlined">
              <CustomizedInput
                autoFocus
                label="New Password"
                variant="outlined"
                type="password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
              <FormError message={values.passwordErr ?? ""} />
            </FormControl>
            <FormControl variant="outlined">
              <CustomizedInput
                label="Confirm Password"
                variant="outlined"
                type="password"
                onChange={(e) =>
                  setValues({ ...values, confirm: e.target.value })
                }
              />
              <FormError message={values.confirmErr ?? ""} />
            </FormControl>
            <CustomizedButton
              type="submit"
              disabled={values.pending}
              style={{
                width: "100%",
                backgroundColor: "#2a9d8f",
                "&:hover": {
                  backgroundColor: "#1f776d",
                },
              }}
            >
              Reset Password
            </CustomizedButton>
          </form>
        </div>
      )}
    </div>
  );
};
export default NewPassword;

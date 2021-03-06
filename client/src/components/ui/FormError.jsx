import React from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const FormError = ({ message }) => (
  <div>
    {message && (
      <p className="form-error" style={{ color: "#f44336" }}>
        <ErrorOutlineIcon className="icon" />
        {message}
      </p>
    )}
  </div>
);

export default FormError;

import React from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const FormError = ({ message }) => (
  <>
    {message && (
      <p className="form-error">
        <ErrorOutlineIcon className="icon" />
        {message}
      </p>
    )}
  </>
);
export default FormError;

import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const FormError = ({ message }) => <>{message && <p className="form-error"><ErrorOutlineIcon />{message}</p>}</>
export default FormError;
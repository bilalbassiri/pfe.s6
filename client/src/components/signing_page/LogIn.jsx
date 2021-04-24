import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { CustomButton } from '../ui-components';
import { Grid } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import { Link } from 'react-router-dom';
import FormError from './FormError';

const LogIn = () => {
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        isNewUser: false,
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = e => {
        e.preventDefault()
    }
    return (
        <form onSubmit={handleSubmit}>
            <Grid container justify="center" alignItems="center" direction="column" className="sign-in-page">
                <Grid>
                    <FormControl className="fieldset" variant="outlined">
                        <TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            value={values.email}
                            onChange={handleChange('email')}
                        />
                    </FormControl>
                </Grid>
                <Grid>
                    <FormControl className="fieldset" variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOutlinedIcon className="visibility-icon" /> : <VisibilityOffOutlinedIcon className="visibility-icon" />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                        <div className="login-error">
                            <FormError message={""} />
                        </div>
                    </FormControl>
                </Grid>
                <Grid style={{width: '30ch'}}>
                    <CustomButton>
                        Sign in
                    </CustomButton>
                </Grid>
                <Grid item className="sign-guide">
                    <p>Not a member? <Link to="/sign-up">Sign up</Link></p>
                </Grid>
            </Grid>
        </form>
    )
}
export default LogIn;
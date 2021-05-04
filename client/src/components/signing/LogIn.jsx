import React, { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import { Link, useHistory } from 'react-router-dom';
import FormError from '../ui/FormError';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userSetAccessToken } from '../../redux/actions/userActions';
import axios from 'axios';
import { getLoginError, startLoading } from '../../helpers/login.helpers';
import { CircularProgress, CustomizedButton } from '..';

const styles = {
    login: {
        backgroundColor: '#EF7C8E',
        padding: '8px',
        width: '100%',
        '&:hover': {
            backgroundColor: '#DA7080',
        },
    }
}
const LogIn = () => {
    const user = useSelector(({ user }) => user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    });
    const [loginError, setLoginError] = useState('');
    const [isLoading, seTisLoading] = useState(true)
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const logInUser = async () => {
        const { email, password } = values;
        try {
            const { data: user } = await axios({
                method: 'post',
                url: '/user/login',
                data: { email, password },
            })
            if (user.logged) {
                const { data } = await axios({
                    method: 'get',
                    url: '/user/info',
                    headers: {
                        authorization: user.ACCESS_TOKEN,
                    }
                })
                dispatch(userLogin(data))
                dispatch(userSetAccessToken(user.ACCESS_TOKEN));
                history.push('/')
            }
            else
                setLoginError(user.msg)
        } catch (err) {
            console.log(err.message)
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        if (getLoginError(values).noErrors) {
            logInUser()
        }
        else setLoginError(getLoginError(values).message)
    }
    useEffect(() => {
        if (user.accessToken) history.push('/')
        const id = startLoading(seTisLoading)
        return () => {
            clearTimeout(id)
        }
    }, [user, history])
    return (
        isLoading ?
            <CircularProgress />
            : <form onSubmit={handleSubmit} className="sign-in-page">
                <Grid className="signing-side">
                    <h2>Welcome Back!</h2>
                    <h4>Dolore voluptate do aute dolor aliqua sit sunt irure do tempor ad voluptate.</h4>
                </Grid>
                <Grid container justify="center" alignItems="center" direction="column" className="sign-in-page-form">
                    <Grid style={{ marginBottom: '20px' }}>
                        <h1 className="signing-heading">Log In</h1>
                    </Grid>
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
                                <FormError message={loginError} />
                            </div>
                        </FormControl>
                    </Grid>
                    <Grid style={{ width: '30ch' }}>
                        <CustomizedButton type="submit" style={styles.login}>
                            Log in
                        </CustomizedButton>
                    </Grid>
                    <Grid item className="sign-guide">
                        <p>Not a member? <Link to="/sign-up">Sign up</Link></p>
                    </Grid>
                </Grid>
            </form>
    )
}
export default LogIn;
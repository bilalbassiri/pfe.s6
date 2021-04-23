import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { CustomButton } from '../ui-components';
import { Grid } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CustomizedInput from '../ui-components/CustomizedInput';
import { useDispatch } from 'react-redux';
import { userSignUp } from '../../redux/actions/visitorActions';
import { setFormErrors, isValidatedForm, isCorrectName } from '../../helpers/signup.helpers';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    margin: {
        margin: `10px 0px`,
    },
    width: {
        width: '40ch'
    },
    semiWidth: {
        width: '19ch',

    },
    error: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '.7rem',
        gap: 5,
        margin: '3px 0px 0px 0px',
        color: '#f44336',
        '&>*': {
            fontSize: '1rem'
        }

    },
    heading: {
        marginBottom: '20px',
    }
}));
const SignUp = () => {
    const classes = useStyles();
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errorMessages, setErrorMessages] = useState({})
    const [isSignedUp, setIsSignedUp] = useState(false)
    const dispatch = useDispatch();
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleSubmit = event => {
        event.preventDefault();
        setFormErrors(values, isCorrectName, setErrorMessages)
    }
    useEffect(() => {
        setIsSignedUp(isValidatedForm(errorMessages))
        if (isSignedUp) dispatch(userSignUp(values))
    }, [errorMessages, isSignedUp])
    const Error = ({ message }) => <>{message && <p className={classes.error}><ErrorOutlineIcon />{message}</p>}</>
    return (
        <form onSubmit={handleSubmit}>
            <Grid container justify="center" alignItems="center" direction="column" style={{ height: 'calc(100vh - 64px)' }}>
                <Grid style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h1 className={classes.heading}>Sign Up</h1>
                    <p>
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                </Grid>
                <Grid>
                    <div style={{ display: 'flex', gap: '2ch' }}>
                        <FormControl className={clsx(classes.margin, classes.semiWidth)} variant="outlined">
                            <CustomizedInput label="First name" variant="outlined" type="text" onChange={handleChange('firstName')} />
                            <Error message={errorMessages.firstNameErr} />

                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.semiWidth)} variant="outlined">
                            <CustomizedInput label="Last name" variant="outlined" type="text" onChange={handleChange('lastName')} />
                            <Error message={errorMessages.lastNameErr} />
                        </FormControl>
                    </div>
                    <Grid>
                        <FormControl className={clsx(classes.margin, classes.width)} variant="outlined">
                            <CustomizedInput label="Email" variant="outlined" type="text" onChange={handleChange('email')} />
                            <Error message={errorMessages.emailErr} />
                        </FormControl>
                    </Grid>
                    <Grid>
                        <FormControl className={clsx(classes.margin, classes.width)} variant="outlined">
                            <CustomizedInput
                                variant="outlined"
                                id="outlined-adornment-password"
                                type="password"
                                value={values.password}
                                onChange={handleChange('password')}
                                label="Password"
                            />
                            <Error message={errorMessages.passwordErr} />
                        </FormControl>
                    </Grid>
                    <Grid>
                        <FormControl className={clsx(classes.margin, classes.width)} variant="outlined">
                            <CustomizedInput
                                id="outlined-confirm-password"
                                type='password'
                                value={values.confirmPassword}
                                onChange={handleChange('confirmPassword')}
                                label="Confirm password"
                                variant="outlined"
                            />
                            <Error message={errorMessages.confirmPasswordErr} />
                        </FormControl>
                    </Grid>
                    <Grid style={{ marginTop: '20px' }}>
                        <CustomButton className={clsx(classes.margin)}>
                            Sign up
                        </CustomButton>

                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}
export default SignUp;
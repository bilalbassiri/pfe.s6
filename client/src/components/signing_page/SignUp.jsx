import React, { useState } from 'react';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { CustomButton } from '../custom_ui';
import { Grid } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CustomizedInput from '../custom_ui/CustomizedInput';

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
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const isCorrectName = name => {
        const letters = "abcdefghijklmnopqrstuvwyz";
        return Array.from(name).map(v => letters.includes(v)).indexOf(false) === -1
    }
    const setFormErrors = values => {
        let { firstName, lastName, email, password, confirmPassword } = values;
        const getSyntaxError = name => (name.length > 15 && 'Must be less than 15 letters') || (!isCorrectName(name.toLowerCase()) && 'Use only letters')
        const getEmailError = _email => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(_email)
        setErrorMessages({
            firstNameErr: (!firstName && 'Enter first name') || getSyntaxError(firstName),
            lastNameErr: (!lastName && 'Enter last name') || getSyntaxError(lastName),
            emailErr: (!email && 'Enter email address') || (!getEmailError(email) && 'Invalid email address'),
            passwordErr: (!password && 'Enter a password') || (password.length < 8 && 'Use 8 characters or more for your password'),
            confirmPasswordErr: (!confirmPassword && 'Confirm your password') || (confirmPassword && password && (password !== confirmPassword) && 'Passwords didn’t match. Try again.')

        })
    }
    const handleSubmit = event => {
        event.preventDefault();
        setFormErrors(values)

    }
    const Error = ({ message }) => <>{message && <p className={classes.error}><ErrorOutlineIcon />{message}</p>}</>
    return (
        <form onSubmit={handleSubmit}>
            <Grid container justify="center" alignItems="center" direction="column" style={{ height: 'calc(100vh - 64px)' }}>
                <Grid style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h1 className={classes.heading}>Sign Up</h1>
                    <p>
                        Already have an account? <a href="#">Log in</a>
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
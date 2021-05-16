import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
// Material UI components
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControl } from '@material-ui/core';
// Components
import { CircularProgress, CustomizedButton, FormError, CustomizedInput } from '..';
// Helper functions
import { setFormErrors, isValidatedForm } from '../../helpers/account.helpers';
import { updateUserAccount } from '../../helpers/axios.helpers';

const useStyles = makeStyles(() => ({
    margin: {
        margin: `10px 0px`,
    },
    width: {
        width: '40ch',
    },
    semiWidth: {
        width: '19ch',
    }
}));

const styles = {
    save: {
        margin: `10px 0px`,
        backgroundColor: '#4ecdc4',
        padding: '8px',
        borderRadius: 20,
        width: '130px',
        '&:hover': {
            backgroundColor: '#41aaa3',
        },
    }
}
const Account = () => {
    const classes = useStyles();
    const { credentials, accessToken } = useSelector(state => state.user)
    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        old_password: '',
        new_password: '',
        change: true,
        disabled: true
    });
    const [errorMessages, setErrorMessages] = useState({})
    const history = useHistory();
    const handleChange = (prop) => (event) => {
        setValues(prev => ({ ...prev, [prop]: event.target.value, disabled: false }));
    };
    const handleSubmit = event => {
        event.preventDefault();
        setValues(prev => ({ ...prev, disabled: true }))
        setFormErrors(values, setErrorMessages)
    }
    useEffect(() => {
        if (credentials && values.change) {
            setValues(prev => ({
                ...prev,
                first_name: credentials.name.split(' ')[0],
                last_name: credentials.name.split(' ')[1],
                email: credentials.email,
                change: false,
            }))
        }
        if (isValidatedForm(errorMessages)) {
            updateUserAccount(values, accessToken).then(data => {
                if (data.msg) setErrorMessages(prev => ({
                    ...prev,
                    oldPasswordErr: data.msg
                }))
            })
        }
    },
        [
            credentials,
            errorMessages,
            accessToken,
            values
        ]
    )
    return (
        accessToken && credentials ?
            <div>
                <form className="account" noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container justify="center" alignItems="center" direction="column">
                        <Grid style={{ marginBottom: '20px' }}>
                            <h1>Sign Up</h1>
                        </Grid>
                        <Grid>
                            <div style={{ display: 'flex', gap: '2ch' }}>
                                <FormControl className={clsx(classes.margin, classes.semiWidth)} variant="outlined">
                                    <CustomizedInput
                                        label="First name"
                                        variant="outlined"
                                        value={values.first_name}
                                        type="text"
                                        onChange={handleChange('first_name')} />
                                    <FormError message={errorMessages.firstNameErr} />
                                </FormControl>
                                <FormControl
                                    className={clsx(classes.margin, classes.semiWidth)}
                                    variant="outlined">
                                    <CustomizedInput
                                        label="Last name"
                                        variant="outlined"
                                        value={values.last_name}
                                        type="text"
                                        onChange={handleChange('last_name')} />
                                    <FormError message={errorMessages.lastNameErr} />
                                </FormControl>
                            </div>
                            <Grid>
                                <FormControl
                                    className={clsx(classes.margin, classes.width)}
                                    variant="outlined">
                                    <CustomizedInput
                                        label="Email"
                                        variant="outlined"
                                        value={values.email}
                                        type="text"
                                        onChange={handleChange('email')} />
                                    <FormError message={errorMessages.emailErr} />
                                </FormControl>
                            </Grid>
                            <Grid>
                                <FormControl
                                    className={clsx(classes.margin, classes.width)}
                                    variant="outlined">
                                    <CustomizedInput
                                        variant="outlined"
                                        type="password"
                                        label="Old password"
                                        onChange={handleChange('old_password')}
                                    />
                                    <FormError message={errorMessages.oldPasswordErr} />
                                </FormControl>
                            </Grid>
                            <Grid>
                                <FormControl className={clsx(classes.margin, classes.width)} variant="outlined">
                                    <CustomizedInput
                                        type='password'
                                        value={values.confirmPassword}
                                        label="New password"
                                        variant="outlined"
                                        onChange={handleChange('new_password')}
                                    />
                                    <FormError message={errorMessages.newPasswordErr} />
                                </FormControl>
                            </Grid>
                            <Grid container alignItems="center" justify="space-between" style={{ marginTop: '20px' }}>
                                <CustomizedButton
                                    className={clsx(classes.margin)}
                                    type="button"
                                    style={styles.save}
                                    onClick={() => setValues(prev => ({ ...prev, change: true, disabled: true }))}
                                >
                                    Discard
                                </CustomizedButton>
                                <CustomizedButton
                                    disabled={values.disabled}
                                    className={clsx(classes.margin)}
                                    type="submit"
                                    style={styles.save}
                                >
                                    Save
                            </CustomizedButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </div>
            :
            <p>Hi</p>
    )
}
export default Account;
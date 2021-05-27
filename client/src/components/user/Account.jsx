import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Material UI components
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControl } from '@material-ui/core';
// Components
import { CircularProgress, CustomizedButton, FormError, CustomizedInput } from '..';
// Helper functions
import { setFormErrors, isValidatedForm } from '../../helpers/account.helpers';
import { updateUserAccount, deleteAccount } from '../../helpers/axios.helpers';
import { userLogout } from '../../redux/actions/userActions';

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
    },
    delete: {
        margin: `10px 0px`,
        backgroundColor: '#e63946',
        padding: '8px',
        fontSize: '.8rem',
        borderRadius: 20,
        width: '130px',
        '&:hover': {
            backgroundColor: '#c7333e',
        },
    }
}
const Account = () => {
    const classes = useStyles();
    const { credentials, accessToken } = useSelector(state => state.user);
    const dispatch = useDispatch();
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
                            <h1>Account</h1>
                        </Grid>
                        <Grid style={{marginTop: 30}}>
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
                            <Grid style={{textAlign: 'center'}}>
                            <CustomizedButton
                                    onClick ={()=>{
                                       const psw = prompt('Your account will be dispear forever, to valid this enter your password.');
                                       if(!psw) return;
                                       deleteAccount(psw, accessToken).then(res => {
                                           if(res.deleted){
                                            axios.get('/user/logout');
                                            dispatch(userLogout());
                                            history.push('/');
                                           }
                                           console.log(res)
                                       })
                                    }}
                                    className={clsx(classes.margin)}
                                    type="submit"
                                    style={styles.delete}
                                >
                                    Delete Account
                            </CustomizedButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </div>
            :
            <CircularProgress plan={{h: 'calc(100vh - 84px)', w: '100%'}}/>
    )
}
export default Account;
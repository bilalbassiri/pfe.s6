import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    position: 'fixed',
    bottom: 10,
    left: '50%',
    transform: 'translateX(-50%)',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function MissionAlert({ severity, message }) {
  const classes = useStyles();
  const [show, setShow] = useState(true)
  useEffect(() => {
    const id = setTimeout(() => {
      setShow(false)
    }, 2000);
  }, [])
  return (
    show
    &&
    <div className={classes.root}>
      <Alert severity={severity}>{message}</Alert>
    </div>
  );
}
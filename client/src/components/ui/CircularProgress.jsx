import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    height: '100vh',
    width: '100%',
    placeContent: 'center',
    '& .MuiCircularProgress-colorSecondary': {
      color: '#EF7C8E'
    },
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" style={{ width: 30, height: 30 }} />
    </div>
  );
}
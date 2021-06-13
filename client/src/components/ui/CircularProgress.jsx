import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const CircularIndeterminate = ({ plan, size }) => {
  const useStyles = makeStyles(() => ({
    root: {
      display: 'grid',
      placeContent: 'center',
      height: plan.h,
      width: plan.w,
      '& .MuiCircularProgress-colorSecondary': {
        color: '#2a9d8f'
      },
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" style={size ?? { width: 30, height: 30 }} />
    </div>
  );
}
export default CircularIndeterminate
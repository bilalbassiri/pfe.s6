import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const CircularIndeterminate = ({ porpose, size }) => {
  const h = porpose === 'reviews' ? '100px' : porpose === 'favoris' ? '15px' : 'calc(100vh - 64px)';

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'grid',
      height: h,
      width: '100%',
      placeContent: 'center',
      '& .MuiCircularProgress-colorSecondary': {
        color: '#EF7C8E'
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
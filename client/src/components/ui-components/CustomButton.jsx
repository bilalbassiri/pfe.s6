import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#7B8CDE'),
    backgroundColor: '#7B8CDE',
    padding: '10px 0px',
    width: '100%',
    '&:hover': {
      backgroundColor: '#7B8CDE',
    },
  },
}))(Button);


function CustomButton( props ) {

  return (
    <div>
      <ColorButton variant="contained" color="primary" type="submit" {...props}>
        {props.children}
      </ColorButton>
    </div>
  );
}
export default CustomButton;
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#7B8CDE'),
    backgroundColor: '#EF7C8E',
    padding: '8px',
    width: '100%',
    '&:hover': {
      backgroundColor: '#DA7080',
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
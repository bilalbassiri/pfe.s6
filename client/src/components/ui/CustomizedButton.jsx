import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


function CustomizedButton(props) {
  const { style, ...other } = props;
  const ColorButton = withStyles(() => ({
    root: style
  }))(Button);


  return (
    <div>
      <ColorButton variant="contained" color="primary" {...other}>
        {props.children}
      </ColorButton>
    </div>
  );
}
export default CustomizedButton;
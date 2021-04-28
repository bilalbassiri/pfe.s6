import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const a = {
    root: {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#8FBDAE',
            borderWidth: '1px'
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#A6D6C6'
        },
        '& .MuiFormLabel-root.Mui-focused': {
            color: '#8FBDAE'
        }
    },
}

const CssTextField = withStyles(a)(TextField);
export {
    CssTextField,
}
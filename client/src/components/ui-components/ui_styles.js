import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const a = {
    root: {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#7B8CDE',
            borderWidth: '2px'
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#BEC6EF'
        },
    },
}
const b = {
    root: {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent !important',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#7B8CDE !important',
            borderWidth: '2px'
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#BEC6EF !important'
        },
    },
}
const CssTextField = withStyles(a)(TextField);
export {
    CssTextField,
}
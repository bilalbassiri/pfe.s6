import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

//Material UI components
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

const useStyles = makeStyles(theme => ({
    list: {
        width: 250,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

const LeftDrawer = () => {
    const history = useHistory();
    const classes = useStyles();
    const [state, setState] = React.useState(false);
    const toggleDrawer = open => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };

    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List className="list-1">
                <ListItem button onClick={() => history.push('/')}>
                    <ListItemIcon ><HomeOutlinedIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={() => history.push('/search')}>
                    <ListItemIcon ><SearchOutlinedIcon /></ListItemIcon>
                    <ListItemText primary="Search" />
                </ListItem>
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
            >
                <MenuIcon />
            </IconButton>
            <Drawer anchor={'left'} open={state} onClose={toggleDrawer(false)}>
                {list()}
            </Drawer>
        </div>
    );
}
export default LeftDrawer;
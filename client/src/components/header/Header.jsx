import React from 'react';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import MoreIcon from '@material-ui/icons/MoreVert';
import LeftDrawer from './LeftDrawer';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { userLogout } from '../../redux/actions/userActions';
import Tooltip from '@material-ui/core/Tooltip';

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -2,
        top: 0,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
        backgroundColor: '#EF7C8E'
    },
}))(Badge);
const CustomizedSignUpButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#7B8CDE'),
        backgroundColor: '#EF7C8E',
        border: '1px solid #EF7C8E',
        fontSize: '.7rem',
        marginLeft: 5,
        width: '12ch',
        padding: '5px',
        '&:hover': {
            backgroundColor: 'white',
            color: '#EF7C8E'
        },
    },
}))(Button);
const CustomizedLoignButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#7B8CDE'),
        backgroundColor: 'white',
        color: '#333',
        fontSize: '.7rem',
        padding: '5px',
        width: '12ch',
        '&:hover': {
            color: 'black',
            backgroundColor: 'white'
        },
    },
}))(Button);
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        color: '#ef798a',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    inputRoot: {
        color: 'black',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const authedUser = useSelector(({ user }) => user?.credentials)
    console.log(authedUser)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem
                onClick={() => {
                    handleMenuClose()
                    axios.get('/user/logout').then(console.log)
                    dispatch(userLogout());
                }}>Log out</MenuItem>
        </Menu>
    );
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails">
                    <StyledBadge badgeContent={4} color="secondary">
                        <ShoppingCartOutlinedIcon />
                    </StyledBadge>
                </IconButton>
                <p> Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications">
                    <StyledBadge badgeContent={2} color="secondary">
                        <FavoriteBorderOutlinedIcon />
                    </StyledBadge>
                </IconButton>
                <p>Wishlist</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications">
                    <StyledBadge badgeContent={11} color="secondary">
                        <NotificationsOutlinedIcon />
                    </StyledBadge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                >
                    <AccountCircleOutlinedIcon />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );
    return (
        <div className={classes.grow}>
            <AppBar position="static" style={{ boxShadow: 'none' }}>
                <Toolbar style={{ backgroundColor: '#FFFFFF', color: '#3e3e3e', boxShadow: '0px 0px 0px 0px black' }}>
                    <LeftDrawer />
                    <Typography className={classes.title} variant="h6" noWrap>
                        Kafka
          </Typography>
                    <div className={classes.grow} />
                    {
                        !Boolean(authedUser) ?
                            <div className={classes.sectionDesktop}>
                                <Tooltip title="Shopping card" arrow>
                                    <IconButton aria-label="show 4 new mails">
                                        <StyledBadge badgeContent={4} color="secondary">
                                            <ShoppingCartOutlinedIcon />
                                        </StyledBadge>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Wishlist" arrow>
                                    <IconButton aria-label="show 17 new notifications">
                                        <StyledBadge badgeContent={3} color="secondary">
                                            <FavoriteBorderOutlinedIcon />
                                        </StyledBadge>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Notifications" arrow>
                                    <IconButton aria-label="show 17 new notifications">
                                        <StyledBadge badgeContent={17} color="secondary">
                                            <NotificationsOutlinedIcon />
                                        </StyledBadge>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Profile" arrow>
                                    <IconButton
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                    >
                                        <AccountCircleOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            :
                            <>
                                <Link to="/login">
                                    <CustomizedLoignButton variant="contained" color="primary" type="button" disableElevation>
                                        Log in
                                    </CustomizedLoignButton>
                                </Link>
                                <Link to="/sign-up">
                                    <CustomizedSignUpButton variant="contained" color="primary" type="button" disableElevation>
                                        Sign up
                                    </CustomizedSignUpButton>
                                </Link>
                            </>
                    }
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}
export default Header;
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
// Material UI components
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Badge,
    MenuItem,
    Menu,
    Tooltip
} from '@material-ui/core';
// Material UI icons
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import MoreIcon from '@material-ui/icons/MoreVert';
//Components
import { CustomizedButton } from '..';
import LeftDrawer from './LeftDrawer';
// Redux actions
import { userLogout } from '../../redux/actions/userActions';

const styles = {
    signup: {
        color: 'white',
        backgroundColor: '#EF7C8E',
        border: '1px solid #EF7C8E',
        fontSize: '.75rem',
        fontWeight: 'bold',
        marginLeft: 3,
        width: '12ch',
        padding: '5px',
        '&:hover': {
            backgroundColor: 'white',
            color: '#EF7C8E'
        },
    },
    login: {
        backgroundColor: 'white',
        color: '#333',
        fontSize: '.75rem',
        fontWeight: 'bold',
        padding: '5px',
        width: '12ch',
        '&:hover': {
            color: 'black',
            backgroundColor: 'white'
        },
    }
}
const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -2,
        top: 0,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
        backgroundColor: '#EF7C8E',
        fontWeight: 'bold'
    },
}))(Badge);
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
    const { user: { cart, favoris, notifications, credentials, accessToken } } = useSelector(state => state);
    // Handling Material UI components
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const history = useHistory();
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const count = {
        cart: cart?.length,
        favoris: favoris?.length,
        notifications: notifications?.length,
    }
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
            <Link to={`/readers/${credentials?._id}`} style={{ color: 'black' }}><MenuItem onClick={handleMenuClose}>Profile</MenuItem></Link>
            <Link to={`/me/account`}><MenuItem onClick={handleMenuClose} style={{ color: 'black' }}>My account</MenuItem></Link>
            <MenuItem
                onClick={() => {
                    handleMenuClose()
                    axios.get('/user/logout')
                    dispatch(userLogout());
                    history.push('/')
                }}>Log out</MenuItem>
        </Menu >
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
            <MenuItem onClick={() => history.push('/me/cart')}>
                <IconButton aria-label={`Show ${count.cart} books in the cart`}>
                    <StyledBadge badgeContent={count.cart} color="secondary">
                        <ShoppingCartOutlinedIcon />
                    </StyledBadge>
                </IconButton>
                <p> Cart</p>
            </MenuItem>
            <MenuItem onClick={() => history.push('/me/favoris')}>
                <IconButton aria-label={`Show ${count.favoris} books in the favoris`}>
                    <StyledBadge badgeContent={count.favoris} color="secondary">
                        <FavoriteBorderOutlinedIcon />
                    </StyledBadge>
                </IconButton>
                <p> Favoris</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label={`Show ${count.notifications} new notifications`}>
                    <StyledBadge badgeContent={count.notifications} color="secondary">
                        <NotificationsOutlinedIcon />
                    </StyledBadge>
                </IconButton>
                <p> Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                >
                    <AccountCircleOutlinedIcon />
                </IconButton>
                <p>Me</p>
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
                        accessToken ?
                            <div className={classes.sectionDesktop}>
                                <Tooltip title="Shopping card" arrow onClick={() => history.push('/me/cart')}>
                                    <IconButton aria-label={`Show ${count.cart} books in the cart`}>
                                        <StyledBadge badgeContent={count.cart} color="secondary">
                                            <ShoppingCartOutlinedIcon />
                                        </StyledBadge>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Favoris" arrow onClick={() => history.push('/me/favoris')}>
                                    <IconButton aria-label={`Show ${count.favoris} books in the favoris`}>
                                        <StyledBadge badgeContent={count.favoris} color="secondary">
                                            <FavoriteBorderOutlinedIcon />
                                        </StyledBadge>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Notifications" arrow>
                                    <IconButton aria-label={`Show ${count.notifications} new notifications`}>
                                        <StyledBadge badgeContent={count.notifications} color="secondary">
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
                                    <CustomizedButton type="button" disableElevation style={styles.login}>
                                        Log in
                                    </CustomizedButton>
                                </Link>
                                <Link to="/sign-up">
                                    <CustomizedButton type="button" disableElevation style={styles.signup}>
                                        Sign up
                                    </CustomizedButton>
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
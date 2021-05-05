
import React, { useState } from 'react';

//Material UI components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';

// components
import { Rating, AddReview, AllReviews, CustomizedButton } from '..';

//...
import PropTypes from 'prop-types';

const styles = {
    show: {
        backgroundColor: '#8CBBBD',
        borderRadius: 20,
        '&:hover': {
            backgroundColor: '#83ADAF',
        },
    },
}

function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const SimpleTabs = ({
    book: {
        description,
        categories,
        rating,
        rating_count,
        release,
        createdAt,
        currently_reading,
        have_read, to_read } }) => {

    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [readMore, setReadMore] = useState(false);
    const [showAddReview, setShowAddReview] = useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    release = new Date(release).getFullYear();
    createdAt = new Date(createdAt).getFullYear();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                    <Tab label="Description" {...a11yProps(0)} />
                    <Tab label="Detail" {...a11yProps(1)} />
                    <Tab label="Reviews" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} className="panel desc">
                {description.substring(0, readMore ? 1000 : 500)}
                {
                    description.length > 500
                    &&
                    <button type='button' className="more-btn" onClick={() => setReadMore(!readMore)}>
                        {
                            !readMore ?
                                '...more'
                                :
                                '(less)'
                        }
                    </button>
                }
                <span className="book-genres">
                    {
                        categories?.map((genre, i) => <Chip variant="outlined" size="small" label={genre} key={i} />)
                    }
                </span>
            </TabPanel>
            <TabPanel value={value} index={1} className="panel detail">
                <ul>
                    <li>Published in {release}</li>
                    <li>Added at {createdAt}</li>
                    <li>{currently_reading ? currently_reading + ' are currently reading' : 'No one is currently reading'}</li>
                    <li>{have_read ? have_read + ' have read it' : 'No one have read yet'}</li>
                    <li>{to_read ? to_read + ' want to read it' : 'No one want to read yet'}</li>
                </ul>
            </TabPanel>
            <TabPanel value={value} index={2} className="panel reviews">
                <Rating porpose="average_read" rating={rating} count={rating_count} />
                {
                    showAddReview ?
                        <AddReview />
                        :
                        <div className="show-add-review-cont">
                            <CustomizedButton
                                color="primary"
                                disableElevation
                                style={styles.show}
                                onClick={() => {
                                    setShowAddReview(true)
                                }}
                            >
                                Add your review
                        </CustomizedButton>
                        </div>
                }
                <AllReviews />
            </TabPanel>
        </div >
    );
}
export default SimpleTabs;
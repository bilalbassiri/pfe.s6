
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//Material UI components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// components
import Review from './Review';
import { Rating, CustomizedButton } from '..';

//...
import PropTypes from 'prop-types';
import { getReviews, setReview } from '../../redux/actions/reviewActions';
import { updateCurrentBook } from '../../redux/actions/bookActions';
import { addBookReview, getReviewsFromDB } from '../../helpers/requests';

const styles = {
    post: {
        backgroundColor: '#8CBBBD',
        '&:hover': {
            backgroundColor: '#83ADAF',
        },
    },
    cancel: {
        display: 'grid',
        placeContent: 'center',
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
                    <Typography>{children}</Typography>
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

export default function SimpleTabs({ book: { _id, description, categories, rating, rating_count, release, createdAt, currently_reading, have_read, to_read } }) {
    const dispatch = useDispatch()
    const classes = useStyles();
    const { reviews, user: { credentials, accessToken } } = useSelector(state => state);
    const [value, setValue] = useState(0);
    const [index, setIndex] = useState(0);
    const [readMore, setReadMore] = useState(false);
    const [visibleReviews, setVisibleReviews] = useState(5);
    const [newReview, setNewReview] = useState({
        content: '',
        rating: 0,
        submit: false
    })
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const addReview = async d => {
        try {
            const { populatedReview, updatedBook: { rating, rating_count } } = await addBookReview(d, accessToken)
            dispatch(setReview(populatedReview))
            dispatch(updateCurrentBook({ rating, rating_count }))

        } catch (err) {
            console.log(err.message)
        }
    }
    release = new Date(release).getFullYear();
    createdAt = new Date(createdAt).getFullYear();
    useEffect(() => {
        if (index === 2) {
            getReviewsFromDB(_id).then(reviews => {
                dispatch(getReviews(reviews))
            })
        }
    }, [index, dispatch, _id])
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Description" {...a11yProps(0)} />
                    <Tab label="Detail" {...a11yProps(1)} />
                    <Tab label="Reviews" {...a11yProps(2)} onClick={() => setIndex(2)} />
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
                    <li>{currently_reading? currently_reading + ' are currently reading' : 'No one is currently reading'}</li>
                    <li>{have_read? have_read + ' have read it' : 'No one have read yet'}</li>
                    <li>{to_read? to_read + ' want to read it' : 'No one want to read yet'}</li>
                </ul>
            </TabPanel>
            <TabPanel value={value} index={2} className="panel reviews">
                <Rating porpose="average_read" rating={rating} count={rating_count} />
                {
                    accessToken ?
                        <div className="add-review-section">
                            <div className="studio">
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Your review"
                                    multiline
                                    value={newReview.content}
                                    variant="outlined"
                                    placeholder="Write your review here"
                                    fullWidth={true}
                                    onChange={e => setNewReview(prev => ({ ...prev, content: prev.content.length > 500 ? e.target.value.substring(0, 500) : e.target.value }))}
                                />
                                <div className="rate">
                                    <Rating
                                        value={newReview?.rating}
                                        onChange={(e, newValue) => {
                                            setNewReview(prev => ({ ...prev, rating: newValue ?? 0 }));
                                        }} />
                                    <span>
                                        {500 - newReview.content.length}
                                    </span>
                                </div>
                            </div>
                            <div className="submit-review">
                                <CustomizedButton
                                    color="primary"
                                    disabled={!newReview.content}
                                    disableElevation
                                    style={styles.post}
                                    onClick={() => {
                                        const data = {
                                            book_id: _id,
                                            owner: credentials._id,
                                            content: newReview.content,
                                            rating: newReview.rating,
                                            global_rating: rating,
                                            rating_count
                                        };
                                        setNewReview({ ...newReview, content: '' })
                                        addReview(data)
                                    }}>
                                    Post
                                </CustomizedButton>
                                <CustomizedButton
                                    style={styles.cancel}
                                    variant="outlined"
                                    disabled={!newReview.content}
                                    onClick={() => setNewReview({ ...newReview, content: '' })}>
                                    Cancel
                            </CustomizedButton>
                            </div>
                        </div>
                        :
                        <h1>
                            <Link to='/login'>Sign in</Link> and share your review
                        </h1>
                }

                <div className="reviews-container">
                    {
                        reviews ?
                            reviews.all?.map((reviewInfo, index) => index < visibleReviews ? <Review info={reviewInfo} key={reviewInfo._id} /> : null)
                            :
                            'loading...'
                    }
                </div>
                <div className="show-more-reviews">
                    {
                        reviews.all?.length > 5
                        &&
                        visibleReviews === 5
                        &&
                        <button
                            type='button'
                            onClick={() => setVisibleReviews(visibleReviews === 5 ? 50 : 5)}>
                            All reviews
                    </button>
                    }
                </div>
            </TabPanel>
        </div >
    );
}
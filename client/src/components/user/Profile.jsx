import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getUserProfile, updateUserHighlights, updateUserInfo, uploadImage } from '../../helpers/requests';
import Avatar from '@material-ui/core/Avatar';
import { CircularProgress, CustomizedButton, Rating, Reading } from '..';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import { changeUserAvatar, updateUserCredentials } from '../../redux/actions/userActions';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import FavoriteRounded from '@material-ui/icons/FavoriteRounded';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
const styles = {
    highlight: {
        backgroundColor: '#EF7C8E',
        padding: '8.5px 16px',
        borderRadius: 20,
        fontWeight: '600',
        width: '100%',
        '&:hover': {
            backgroundColor: '#DA7080',
        },
    },
}
const Profile = () => {
    const dispatch = useDispatch();
    const { user_id } = useParams();
    const { credentials, accessToken } = useSelector(state => state.user);
    const [isLoading, setIsLoading] = useState({
        profile: true,
        image: false,
        highlight: false
    });
    const [showAll, setShowAll] = useState({
        reviews: false
    })
    const [{ info, reviews }, setProfile] = useState({
        info: {},
        reviews: [],
    })
    const [bioState, setBioState] = useState({
        edit: false,
        loading: false,
        content: ''
    })
    const history = useHistory();
    const isMyProfile = () => {
        if (accessToken) {
            if (credentials?._id === user_id) return true
            else return false
        }
        else return false
    }
    useEffect(() => {
        setIsLoading(prev => ({ ...prev, profile: true }))
        getUserProfile(user_id).then(({ info, reviews }) => {
            setProfile({ info, reviews })
            setBioState(prev => ({ ...prev, content: info.bio }))
            setIsLoading(prev => ({ ...prev, profile: false }))
        })
    }, [user_id])
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const [preview, setPreview] = useState('');
    let highlited = info.highlights?.includes(user_id);
    const handleImageUpload = async e => {
        try {
            setIsLoading({ ...isLoading, image: true })
            e.preventDefault()
            const blob = e.target.files[0]
            if (/\.(jpe?g|png)$/i.test(blob.name)) {
                const reader = new FileReader();
                reader.readAsDataURL(blob)
                reader.onload = () => {
                    setPreview(reader.result);
                    uploadImage(reader.result, accessToken).then(url => {
                        dispatch(changeUserAvatar(url))
                        setIsLoading({ ...isLoading, image: false })
                        setPreview('')
                    })
                }
                reader.onerror = () => {
                    console.error('Sorry')
                }
            }
        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <>
            {
                isLoading.profile ?
                    <CircularProgress />
                    :
                    <Grid container justify="space-evenly" className="profile">
                        <Grid item sm={2} xs={12} className="general-section">
                            <div className="personal-info">
                                <div className="photo">
                                    <Avatar src={isMyProfile() ? (preview ? preview : credentials?.picture) : info.picture} className="avatar">
                                        {info.name[0]}
                                    </Avatar>
                                    {
                                        isMyProfile()
                                        &&
                                        (!isLoading.image ?
                                            <div className="change-photo">
                                                <label htmlFor="select"><PhotoCameraOutlinedIcon className="icon" /></label>
                                                <input type="file" name="image" id="select" className="select-input" onChange={handleImageUpload} />
                                            </div>
                                            :
                                            <div className="loading-image">
                                                <CircularProgress porpose="reviews" size={{ height: 35, width: 35 }} />
                                            </div>)
                                    }
                                </div>
                                <h1 className="name">
                                    {info.name}
                                </h1>
                                <div className="highlight">
                                    <p>
                                        {info.highlights.length} highlights
                                    </p>
                                    {
                                        !isMyProfile()
                                        &&
                                        accessToken
                                        &&
                                        <CustomizedButton
                                            disableElevation
                                            type="button"
                                            style={styles.highlight}
                                            disabled={isLoading.highlight}
                                            onClick={() => {
                                                setIsLoading({ ...isLoading, highlight: true })
                                                updateUserHighlights({ _id: info._id, newHighlights: highlited ? info.highlights.filter(user => user != user_id) : [...info.highlights, user_id] }, accessToken).then(data => {
                                                    setIsLoading({ ...isLoading, highlight: false })
                                                    setProfile(prev => ({ ...prev, info: { ...prev.info, highlights: data.highlights } }))
                                                })
                                            }}
                                        >
                                            Highlight
                                        {
                                                info.highlights.includes(user_id) ?
                                                    <>ed<DoneRoundedIcon className="icon" /> </>
                                                    :
                                                    <BookmarkBorderRoundedIcon className="icon" />
                                            }
                                        </CustomizedButton>
                                    }
                                </div>
                            </div>
                        </Grid>
                        <Grid item sm={5} xs={12} className="detail-section">
                            <div className="bio">
                                <h2 className="headings">
                                    Bio
                                {
                                        isMyProfile()
                                        &&
                                        (
                                            <button className="edit-btn-save" onClick={() => {
                                                if (bioState.edit) {
                                                    if (info.bio !== bioState.content) {
                                                        updateUserInfo({ bio: bioState.content }, accessToken).then(data => {
                                                            dispatch(updateUserCredentials(data))
                                                        })
                                                    }
                                                }
                                                setBioState({ ...bioState, edit: !bioState.edit })
                                            }}>
                                                { bioState.edit ? 'Save' : 'Edit'}
                                            </button>
                                        )
                                    }
                                </h2>
                                {
                                    bioState.edit && accessToken ?
                                        <TextField
                                            className="edit-bio"
                                            id="outlined-multiline-static"
                                            label=""
                                            multiline
                                            value={bioState.content}
                                            variant="outlined"
                                            placeholder="Say something about you here"
                                            fullWidth={true}
                                            onChange={e => {
                                                setBioState({ ...bioState, content: e.target.value })
                                            }}
                                        />
                                        :
                                        <p>
                                            {bioState.content}
                                        </p>
                                }
                            </div>
                            <div className="_reviews">
                                <h2 className="headings">
                                    Reviews <span>({reviews.length})</span>
                                </h2>
                                <div className="reviews-cont">
                                    {
                                        reviews.map((review, index) =>
                                            index < (showAll.reviews ? reviews.length : 3) ?
                                                <div className='review' key={review._id} onClick={() => history.push(`/book/${review.book_id._id}`)}>
                                                    <div className="left">
                                                        <div className="cover">
                                                            <img src={review.book_id.cover} alt={review.book_id.name} />
                                                        </div>
                                                        <div className="text">
                                                            <h3 className="name">{review.book_id.name}</h3>
                                                            <div className="content">
                                                                <Rating porpose="review_read" rating={review.rating} className="rating" />
                                                                <p>
                                                                    {review.content.length > 100 ? review.content.substring(0, 50) + '..' : review.content}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="right">
                                                        <ChevronRightRoundedIcon />
                                                    </div>

                                                </div>
                                                :
                                                null
                                        )
                                    }
                                    <div className="show-more-reviews pro">
                                        {
                                            reviews.length ?
                                                <button type="button" onClick={() => {
                                                    setShowAll({ ...showAll, reviews: !showAll.reviews })
                                                }}>
                                                    Show {showAll.reviews ? 'Less' : 'More'}
                                                </button>
                                                :
                                                <h5 className="empty-reviews">
                                                    {isMyProfile() ? 'YOU' : info.name} have no reviews yet
                                                </h5>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item sm={4} xs={12} className="pages">
                            <div className="reads">
                                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon className="arrow" />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography className="accordion-headings">Read <span>({info.read.length})</span></Typography>
                                    </AccordionSummary>
                                    <Reading books={info.read} />
                                </Accordion>
                                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon className="arrow" />}
                                        aria-controls="panel2bh-content"
                                        id="panel2bh-header"
                                    >
                                        <Typography className="accordion-headings">Currently reading <span>({info.currently_reading.length})</span></Typography>
                                    </AccordionSummary>
                                    <Reading books={info.currently_reading} />
                                </Accordion>
                                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon className="arrow" />}
                                        aria-controls="panel3h-content"
                                        id="panel3bh-header"
                                    >
                                        <Typography className="accordion-headings">To read <span>({info.to_read.length})</span></Typography>
                                    </AccordionSummary>
                                    <Reading books={info.to_read} />
                                </Accordion>
                            </div>

                        </Grid>
                    </Grid>
            }
        </>
    )
}
export default Profile;
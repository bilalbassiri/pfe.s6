import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getUserProfile, uploadImage } from '../../helpers/requests';
import Avatar from '@material-ui/core/Avatar';
import { CircularProgress, Rating } from '..';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import { changeUserAvatar } from '../../redux/actions/userActions';

const Profile = () => {
    const dispatch = useDispatch();
    const { user_id } = useParams();
    const { credentials, accessToken } = useSelector(state => state.user);
    const [isLoading, setIsLoading] = useState({
        profile: true,
        image: false
    });
    const [showAll, setShowAll] = useState({
        reviews: false
    })
    const [{ info, reviews }, setProfile] = useState({
        info: {},
        reviews: []
    })
    const history = useHistory();
    useEffect(() => {
        getUserProfile(user_id).then(({ info, reviews }) => {
            setProfile({ info, reviews })
            setIsLoading(prev => ({ ...prev, profile: false }))
        })
    }, [user_id])
    const handleImageUpload = async e => {
        try {
            setIsLoading({ ...isLoading, image: true })
            e.preventDefault()
            const blob = e.target.files[0]
            if (/\.(jpe?g|png)$/i.test(blob.name)) {
                const reader = new FileReader();
                reader.readAsDataURL(blob)
                reader.onload = () => {
                    uploadImage(reader.result, accessToken).then(url => {
                        dispatch(changeUserAvatar(url))
                        setIsLoading({ ...isLoading, image: false })
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
                        <Grid item sm={3} xs={12} className="general-section">
                            <div className="personal-info">
                                <div className="photo">
                                    <Avatar src={accessToken ? credentials?.picture : info.picture} className="avatar">
                                        {info.name[0]}
                                    </Avatar>
                                    {
                                        accessToken
                                            &&
                                            (!isLoading.image ?
                                            <div className="change-photo">
                                                <label htmlFor="select"><PhotoCameraOutlinedIcon className="icon" /></label>
                                                <input type="file" name="image" id="select" className="select-input" onChange={handleImageUpload} />
                                            </div>
                                            :
                                            <div className="loading-image">
                                                <CircularProgress porpose="reviews" size={{ height: 100, width: 100 }} />
                                            </div>)
                                    }
                                </div>
                                <h1 className="name">
                                    {info.name}
                                </h1>
                            </div>
                        </Grid>
                        <Grid item sm={5} xs={12} className="detail-section">
                            <h2 className="headings">
                                Bio
                            </h2>
                            <p>
                                {info.bio ?? 'Consequat deserunt velit consectetur adipisicing aute nisi ea dolore ipsum mollit culpa. Ut laborum pariatur Lorem id ad nisi deserunt proident amet. Id excepteur occaecat esse nostrud. Ad incididunt eiusmod reprehenderit mollit elit cillum in aute commodo sunt magna ad officia. Pariatur deserunt et incididunt duis ut laborum dolore do velit enim anim amet sint consectetur. Dolore consequat cupidatat consectetur culpa.'}

                            </p>

                            <h2 className="headings">
                                Reviews
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
                                                    <ArrowForwardIosRoundedIcon />
                                                </div>

                                            </div>
                                            :
                                            null
                                    )
                                }
                                <div className="show-more-reviews pro">
                                    <button type="button" onClick={() => {
                                        setShowAll({ ...showAll, reviews: !showAll.reviews })
                                    }}>
                                        Show {showAll.reviews ? 'Less' : 'More'}
                                    </button>
                                </div>
                            </div>
                        </Grid>
                        <Grid item sm={3} xs={12} className="pages">

                        </Grid>
                    </Grid>
            }
        </>
    )
}
export default Profile;
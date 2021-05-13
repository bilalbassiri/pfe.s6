import React, { useState, useReducer } from 'react'
import { upvoteReview } from '../../helpers/axios.helpers';
import { useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';
import { Rating } from '..';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const Review = ({ info: { _id, content, upvotes, owner, rating } }) => {
    const { credentials, accessToken } = useSelector(state => state.user)
    const [readReview, setReadReview] = useState(false);
    const reducer = (state, action) => {
        switch (action.type) {
            case 'UPVOTE':
                return {
                    currentVotes: [...state.currentVotes, credentials._id],
                    voted: true
                }
            case 'DONTVOTE':
                return {
                    currentVotes: state.currentVotes?.filter(item => item !== credentials._id),
                    voted: false
                }
            default:
                return state;
        }
    }

    const [{ currentVotes, voted }, dispatch] = useReducer(reducer, { currentVotes: upvotes ?? [], voted: upvotes?.includes(credentials?._id) ?? false })
    const voteReview = () => {
        if (accessToken) {
            upvoteReview(_id, voted ? currentVotes.filter(item => item !== credentials._id) : [...currentVotes, credentials._id]);
            dispatch({ type: voted ? 'DONTVOTE' : 'UPVOTE' });
        }
        else console.log('Not logged in !!!')
    }

    return (
        <div className="review">
            <div className="review-bar">
                <div className="review-writer">

                    {
                        owner && owner.name ?
                            <>
                                <Avatar className="review-writer-pic" src={owner.picture ?? ''}>{owner.name[0]}</Avatar>
                                <Link to={`/readers/${owner._id}`} className="review-writer-name"><h4>{owner.name}</h4></Link>
                                <Rating porpose="review_read" rating={rating} notext={true}/>
                            </>
                            :
                            <>
                                <Skeleton variant="circle" width={35} height={35} />
                                <Skeleton variant="text" width={200} />
                            </>
                    }
                </div>
                <div className="cheer-sec">
                    <button type='click' onClick={voteReview}>
                        {
                            voted ?
                                <FavoriteIcon className="fav-i" />
                                :
                                <FavoriteBorderIcon className="border-i" />
                        }
                    </button>
                    <span>
                        {currentVotes?.length !== 0 && currentVotes?.length}
                    </span>

                </div>
            </div>
            <article onClick={() => setReadReview(!readReview)}>
                {content.substring(0, readReview ? 500 : 300)}
            </article>
        </div>
    )
}
export default Review;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Review from './Review';
import { getReviewsFromDB } from '../../helpers/axios.helpers';
import { getReviews } from '../../redux/actions/reviewActions';
import { useParams } from 'react-router';
import { CircularProgress } from '..';

export const AllReviews = () => {
    const { bookId: _id } = useParams();
    const [visibleReviews, setVisibleReviews] = useState(5);
    const [start, setStart] = useState(false);
    const dispatch = useDispatch();
    const { reviews } = useSelector(state => state);
    useEffect(() => {
        getReviewsFromDB(_id).then(reviews => {
            dispatch(getReviews(reviews))
            setStart(true)
        })
    }, [dispatch, _id])
    return (
        <>
            <div className="reviews-container">
                {
                    reviews?.all && start ?
                        reviews.all.map((reviewInfo, index) => index < visibleReviews ? <Review info={reviewInfo} key={reviewInfo._id} /> : null)
                        :
                        <CircularProgress plan={{w: '100%', h: '100px'}} />
                }

            </div>
            <div className="show-more-reviews">
                {
                    reviews.all?.length > 5
                    &&
                    visibleReviews === 5
                    &&
                    start
                    &&
                    <button
                        type='button'
                        onClick={() => setVisibleReviews(visibleReviews === 5 ? 50 : 5)}>
                        All reviews
                    </button>
                }
            </div>
        </>
    )
}
export default AllReviews;
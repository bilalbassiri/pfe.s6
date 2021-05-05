import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Rating, CustomizedButton } from '..';
import { setReview } from '../../redux/actions/reviewActions';
import { updateCurrentBook } from '../../redux/actions/bookActions';
import { addBookReview } from '../../helpers/requests';
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
const AddReview = () => {
    const { bookId: _id } = useParams();
    const dispatch = useDispatch()
    const { user: { credentials, accessToken }, book: { currentBook } } = useSelector(state => state);
    const [newReview, setNewReview] = useState({
        content: '',
        rating: 0,
        submit: false
    })
    const addReview = async d => {
        try {
            const { populatedReview, updatedBook: { rating, rating_count } } = await addBookReview(d, accessToken)
            dispatch(setReview(populatedReview))
            dispatch(updateCurrentBook({ rating, rating_count }))

        } catch (err) {
            console.log(err.message)
        }
    }
    return (
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
                                global_rating: currentBook.rating,
                                rating_count: currentBook.rating_count
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
    )
}
export default AddReview;
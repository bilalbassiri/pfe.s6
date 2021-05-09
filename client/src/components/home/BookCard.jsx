import React from 'react'
import StarIcon from '@material-ui/icons/Star';
import { useHistory } from 'react-router-dom';

const BookCard = ({ item: { _id, author, name, cover, price, rating } }) => {
    const history = useHistory();
    return (
        <div className="item" onClick={() => history.push(`/book/${_id}`)}>
            <div className="cover">
                <div className='rating'>
                    <StarIcon className="star" /><span>{rating.toFixed(1)}</span>
                </div>
                <img src={cover} alt={name} />
            </div>
            <h2 className="name">
                {name}
            </h2>
            <h4 className="author">
                {author}
            </h4>
            <h4 className="price">
                {price.toFixed(2)}
            </h4>
        </div>
    )
}
export default BookCard
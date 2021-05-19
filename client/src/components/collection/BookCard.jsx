import React from 'react'
import { useHistory } from 'react-router-dom';
import { Rating } from '..';

const BookCard = ({ item: { _id, author, name, cover, price, rating } }) => {
    const history = useHistory();
    return (
        <div className="item" onClick={() => history.push(`/book/${_id}`)}>
            <div className="cover">
                <img src={cover} alt={name} />
            </div>
            <h2 className="name">
                {name}
            </h2>
            <h4 className="author">
                {author}
            </h4>
            <div className="nums">
                <h4 className="price">
                    {price.toFixed(2)}
                </h4>
                <Rating rating={rating} notext={false} porpose="review_read" />
            </div>

        </div>
    )
}
export default BookCard
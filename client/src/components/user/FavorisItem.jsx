import React from 'react'
import { useHistory } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';

const FavorisItem = ({ item: { _id, cover, name, price, rating, author, inCart, quantity } }) => {
    const history = useHistory();
    return (
        <div className="favoris-item" onClick={() => history.push(`/book/${_id}`)}>
            <div className="cover">
                <div className='rating'>
                    <StarIcon className="star"/><span>{rating.toFixed(1)}</span>
                </div>
                <img src={cover} alt={name} />
            </div>
            <h2 className="name">
                {name}
            </h2>
            <h4 className="author">
                {author}
            </h4>
        </div>
    )
}
export default FavorisItem;
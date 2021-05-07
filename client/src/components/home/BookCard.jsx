import React from 'react'
import StarIcon from '@material-ui/icons/Star';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Link } from 'react-router-dom';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const BookCard = ({book: { _id, name, cover, price, rating} }) => {
    const bookCover = {
        backgroundImage: `url(${cover})`,
        height: 250,
        width: 170,
        backgroundPosition: 'center',
        backgroundSize: '100% 100%'
    }
    return (
        <div className="book-card-container">
            <div className="cover" style={bookCover}>
                <div className="options-container">
                   <button type='button'>
                       <AddShoppingCartIcon/>
                   </button>
                   <button type="button">
                        <FavoriteBorderIcon/>
                   </button>
                   <button type='button' className="more-details">
                        <OpenInNewIcon/>
                   </button>
                </div>
            </div>
            <div className="digits">
                <div className="rating">
                    <StarIcon className="icon" /><span>{rating.toFixed(1)}</span>
                </div>
                <div className="price">
                    {price}$
                </div>

            </div>
            <h2 className="title"><Link to={`/book/${_id}`}>{name}</Link></h2>
        </div>
    )
}
export default BookCard
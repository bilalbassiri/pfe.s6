import React from 'react'
import { useHistory } from 'react-router-dom';

const FavorisItem = ({ item: { _id, cover, name, price, author, inCart, quantity } }) => {
    const history = useHistory();
    console.log('ed')
    return (
        <div className="favoris-item" onClick={() => history.push(`/book/${_id}`)}>
            <div className="cover">
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
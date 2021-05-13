import React from 'react'
import { useSelector } from 'react-redux';
import { BookCard } from '..';

const Favoris = () => {
    const { favoris } = useSelector(state => state.user)
    return (
        <div className="favoris">
            <h1>
                Favoris
            </h1>
            <div className="container">
                {
                    favoris.map(item => <BookCard key={item._id} item={item} favoris={true} />)
                }
            </div>
        </div>
    )
}
export default Favoris;